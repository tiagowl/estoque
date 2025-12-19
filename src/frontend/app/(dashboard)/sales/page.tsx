'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/shared/components/ui/drawer';
import { Label } from '@/shared/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { formatMoney, formatDate } from '@/shared/utils/format';
import { Plus, ShoppingCart, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sellPrice: number;
  currentStock: number;
}

interface SaleItem {
  productId: string;
  quantity: number;
  productName?: string;
  unitPrice?: number;
  subtotal?: number;
}

interface Sale {
  id: string;
  total: number;
  createdAt: Date;
  items: Array<{
    productId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    productName?: string;
  }>;
}

export default function SalesPage() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState('');

  useEffect(() => {
    const init = async () => {
      await loadProducts();
      await loadSales();
    };
    init();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      loadSales();
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

  const loadSales = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/sales');
      const data = await response.json();
      
      // Enriquecer com nomes de produtos (só funciona se products já estiver carregado)
      const currentProducts = products.length > 0 ? products : [];
      const salesWithProducts = (data.sales || []).map((sale: Sale) => ({
        ...sale,
        items: sale.items.map((item) => {
          if (currentProducts.length > 0) {
            const product = currentProducts.find(p => p.id === item.productId);
            return { ...item, productName: product?.name || 'Produto removido' };
          }
          return { ...item, productName: 'Carregando...' };
        }),
      }));
      
      setSales(salesWithProducts);
    } catch (error) {
      console.error('Error loading sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    if (!selectedProductId || !selectedQuantity) return;

    const product = products.find(p => p.id === selectedProductId);
    if (!product) return;

    const quantity = parseInt(selectedQuantity);
    if (quantity <= 0) return;

    if (product.currentStock < quantity) {
      alert('Estoque insuficiente');
      return;
    }

    // Verificar se já existe no carrinho
    const existingIndex = saleItems.findIndex(item => item.productId === selectedProductId);
    if (existingIndex >= 0) {
      const updated = [...saleItems];
      updated[existingIndex].quantity += quantity;
      setSaleItems(updated);
    } else {
      setSaleItems([...saleItems, {
        productId: selectedProductId,
        quantity,
        productName: product.name,
        unitPrice: product.sellPrice,
        subtotal: product.sellPrice * quantity,
      }]);
    }

    setSelectedProductId('');
    setSelectedQuantity('');
  };

  const handleRemoveItem = (index: number) => {
    setSaleItems(saleItems.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return saleItems.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + (product ? product.sellPrice * item.quantity : 0);
    }, 0);
  };

  const handleSave = async () => {
    if (saleItems.length === 0) {
      alert('Adicione pelo menos um produto');
      return;
    }

    try {
      const response = await fetch('/api/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: saleItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Erro ao registrar venda');
        return;
      }

      setDrawerOpen(false);
      setSaleItems([]);
      loadSales();
      loadProducts(); // Atualizar estoques
    } catch (error) {
      console.error('Error saving sale:', error);
      alert('Erro ao registrar venda');
    }
  };

  const handleCreate = () => {
    setSaleItems([]);
    setSelectedProductId('');
    setSelectedQuantity('');
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Vendas</h1>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Venda
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Itens</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">Carregando...</TableCell>
              </TableRow>
            ) : sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">Nenhuma venda encontrada</TableCell>
              </TableRow>
            ) : (
              sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{formatDate(sale.createdAt)}</TableCell>
                  <TableCell className="font-semibold">{formatMoney(sale.total)}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside">
                      {sale.items.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          {item.productName}: {item.quantity}x {formatMoney(item.unitPrice)} = {formatMoney(item.subtotal)}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
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
            <DrawerTitle>Nova Venda</DrawerTitle>
          </DrawerHeader>

          <div className="p-6 space-y-4">
            <div>
              <Label htmlFor="productId">Produto</Label>
              <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um produto" />
                </SelectTrigger>
                <SelectContent>
                  {products.filter(p => p.currentStock > 0).map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - {formatMoney(product.sellPrice)} (Estoque: {product.currentStock})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(e.target.value)}
                  placeholder="0"
                />
              </div>
              <Button onClick={handleAddItem} className="mt-8">
                Adicionar
              </Button>
            </div>

            {saleItems.length > 0 && (
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-semibold">Itens da Venda</h3>
                {saleItems.map((item, index) => {
                  const product = products.find(p => p.id === item.productId);
                  if (!product) return null;
                  const subtotal = product.sellPrice * item.quantity;
                  return (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity}x {formatMoney(product.sellPrice)} = {formatMoney(subtotal)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  );
                })}
                <div className="pt-2 border-t">
                  <p className="text-lg font-bold">Total: {formatMoney(calculateTotal())}</p>
                </div>
              </div>
            )}
          </div>

          <DrawerFooter>
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saleItems.length === 0}>
              Finalizar Venda
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

