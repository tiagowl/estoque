'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/shared/components/ui/drawer';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { formatDate } from '@/shared/utils/format';
import { Plus, Download, Search, ArrowUp, ArrowDown } from 'lucide-react';

interface Movement {
  id: string;
  productId: string | null;
  type: 'ENTRY' | 'EXIT';
  quantity: number;
  observation: string | null;
  createdAt: Date;
  productName?: string;
}

interface Product {
  id: string;
  name: string;
  currentStock: number;
}

export default function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [movementType, setMovementType] = useState<'ENTRY' | 'EXIT'>('ENTRY');
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    observation: '',
  });

  useEffect(() => {
    const init = async () => {
      await loadProducts();
      await loadMovements();
    };
    init();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      loadMovements();
    }
  }, [products]);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadMovements = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/movements');
      const data = await response.json();
      
      // Enriquecer com nomes de produtos (só funciona se products já estiver carregado)
      const currentProducts = products.length > 0 ? products : [];
      const movementsWithProducts = (data.movements || []).map((movement: Movement) => {
        if (movement.productId && currentProducts.length > 0) {
          const product = currentProducts.find(p => p.id === movement.productId);
          return { ...movement, productName: product?.name || 'Produto removido' };
        }
        return { ...movement, productName: movement.productId ? 'Carregando...' : '-' };
      });
      
      setMovements(movementsWithProducts);
    } catch (error) {
      console.error('Error loading movements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = (type: 'ENTRY' | 'EXIT') => {
    setMovementType(type);
    setFormData({ productId: '', quantity: '', observation: '' });
    setDrawerOpen(true);
  };

  const handleSave = async () => {
    try {
      const url = movementType === 'ENTRY' ? '/api/movements/entry' : '/api/movements/exit';
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: formData.productId,
          quantity: parseInt(formData.quantity),
          observation: formData.observation || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Erro ao registrar movimentação');
        return;
      }

      setDrawerOpen(false);
      loadMovements();
      loadProducts(); // Atualizar estoques
    } catch (error) {
      console.error('Error saving movement:', error);
      alert('Erro ao registrar movimentação');
    }
  };

  const handleExport = () => {
    window.open('/api/movements/export', '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Movimentações</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={() => handleCreate('ENTRY')} className="bg-green-600 hover:bg-green-700">
            <ArrowUp className="h-4 w-4 mr-2" />
            Entrada
          </Button>
          <Button onClick={() => handleCreate('EXIT')} variant="destructive">
            <ArrowDown className="h-4 w-4 mr-2" />
            Saída
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Observação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : movements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Nenhuma movimentação encontrada</TableCell>
              </TableRow>
            ) : (
              movements.map((movement) => (
                <TableRow key={movement.id}>
                  <TableCell>{formatDate(movement.createdAt)}</TableCell>
                  <TableCell>{movement.productName || '-'}</TableCell>
                  <TableCell>
                    <span className={movement.type === 'ENTRY' ? 'text-green-600' : 'text-red-600'}>
                      {movement.type === 'ENTRY' ? 'Entrada' : 'Saída'}
                    </span>
                  </TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell>{movement.observation || '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Drawer de criação */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side="right">
        <DrawerContent onClose={() => setDrawerOpen(false)} className="w-full sm:w-[500px]">
          <DrawerHeader>
            <DrawerTitle>
              {movementType === 'ENTRY' ? 'Registrar Entrada' : 'Registrar Saída'}
            </DrawerTitle>
          </DrawerHeader>

          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="productId">Produto</Label>
              <Select value={formData.productId} onValueChange={(value) => setFormData({ ...formData, productId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} (Estoque: {product.currentStock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Quantidade</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="0"
              />
            </div>

            <div>
              <Label htmlFor="observation">Observação (opcional)</Label>
              <Input
                id="observation"
                value={formData.observation}
                onChange={(e) => setFormData({ ...formData, observation: e.target.value })}
                placeholder="Observação..."
              />
            </div>
          </div>

          <DrawerFooter>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

