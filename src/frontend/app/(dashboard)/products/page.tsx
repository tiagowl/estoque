'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/shared/components/ui/drawer';
import { Label } from '@/shared/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { formatMoney } from '@/shared/utils/format';
import { Plus, Pencil, Trash2, Download, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  costPrice: number;
  sellPrice: number;
  currentStock: number;
  minStock: number | null;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    costPrice: '',
    sellPrice: '',
    minStock: '',
  });

  useEffect(() => {
    loadProducts();
  }, [search]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const url = search
        ? `/api/products?search=${encodeURIComponent(search)}`
        : '/api/products';
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setFormData({ name: '', costPrice: '', sellPrice: '', minStock: '' });
    setDrawerOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      costPrice: product.costPrice.toString(),
      sellPrice: product.sellPrice.toString(),
      minStock: product.minStock?.toString() || '',
    });
    setDrawerOpen(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: formData.name,
        costPrice: parseFloat(formData.costPrice),
        sellPrice: parseFloat(formData.sellPrice),
        minStock: formData.minStock ? parseInt(formData.minStock) : null,
      };

      const url = selectedProduct ? `/api/products/${selectedProduct.id}` : '/api/products';
      const method = selectedProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Erro ao salvar produto');
        return;
      }

      setDrawerOpen(false);
      loadProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Erro ao salvar produto');
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`/api/products/${selectedProduct.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        alert('Erro ao excluir produto');
        return;
      }

      setDeleteDialogOpen(false);
      setSelectedProduct(null);
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Erro ao excluir produto');
    }
  };

  const handleExport = () => {
    window.open('/api/products/export', '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço de Custo</TableHead>
              <TableHead>Preço de Venda</TableHead>
              <TableHead>Estoque Atual</TableHead>
              <TableHead>Estoque Mínimo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">Nenhum produto encontrado</TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{formatMoney(product.costPrice)}</TableCell>
                  <TableCell>{formatMoney(product.sellPrice)}</TableCell>
                  <TableCell>
                    <span className={product.currentStock === 0 ? 'text-red-600 font-semibold' : ''}>
                      {product.currentStock}
                    </span>
                  </TableCell>
                  <TableCell>{product.minStock ?? '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedProduct(product);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Drawer de criação/edição */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side="right">
        <DrawerContent onClose={() => setDrawerOpen(false)} className="w-full sm:w-[500px]">
          <DrawerHeader>
            <DrawerTitle>
              {selectedProduct ? 'Editar Produto' : 'Novo Produto'}
            </DrawerTitle>
          </DrawerHeader>

          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nome do produto"
              />
            </div>

            <div>
              <Label htmlFor="costPrice">Preço de Custo</Label>
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="sellPrice">Preço de Venda</Label>
              <Input
                id="sellPrice"
                type="number"
                step="0.01"
                value={formData.sellPrice}
                onChange={(e) => setFormData({ ...formData, sellPrice: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div>
              <Label htmlFor="minStock">Estoque Mínimo (opcional)</Label>
              <Input
                id="minStock"
                type="number"
                value={formData.minStock}
                onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <DrawerFooter>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Produto</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o produto "{selectedProduct?.name}"? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


