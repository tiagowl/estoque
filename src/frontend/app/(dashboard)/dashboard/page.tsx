'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import Link from 'next/link';
import { formatMoney } from '@/shared/utils/format';

interface DashboardStats {
  totalProducts: number;
  lowStockCount: number;
  outOfStockCount: number;
  lowStockProducts: Array<{
    id: string;
    name: string;
    currentStock: number;
    minStock: number;
  }>;
  outOfStockProducts: Array<{
    id: string;
    name: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [productsRes, lowStockRes, outOfStockRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/products?page=1&limit=1000'),
        fetch('/api/products?page=1&limit=1000'),
      ]);

      const productsData = await productsRes.json();
      const allProducts = productsData.products || [];

      const lowStockProducts = allProducts.filter((p: any) => 
        p.minStock !== null && p.currentStock <= p.minStock && p.currentStock > 0
      );
      const outOfStockProducts = allProducts.filter((p: any) => p.currentStock === 0);

      setStats({
        totalProducts: productsData.total || 0,
        lowStockCount: lowStockProducts.length,
        outOfStockCount: outOfStockProducts.length,
        lowStockProducts,
        outOfStockProducts,
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Carregando...</div>;
  }

  if (!stats) {
    return <div className="text-center p-8">Erro ao carregar dashboard</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total de Produtos</CardTitle>
            <CardDescription>Produtos cadastrados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{stats.totalProducts}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estoque Baixo</CardTitle>
            <CardDescription>Produtos com estoque baixo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-yellow-600">{stats.lowStockCount}</p>
            <Link href="/products" className="text-sm text-muted-foreground hover:underline mt-2 inline-block">
              Ver produtos
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sem Estoque</CardTitle>
            <CardDescription>Produtos sem estoque</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-red-600">{stats.outOfStockCount}</p>
            <Link href="/products" className="text-sm text-muted-foreground hover:underline mt-2 inline-block">
              Ver produtos
            </Link>
          </CardContent>
        </Card>
      </div>

      {stats.lowStockProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Produtos com Estoque Baixo</CardTitle>
            <CardDescription>Atenção: Estes produtos precisam de reposição</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Estoque Atual</TableHead>
                  <TableHead>Estoque Mínimo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.lowStockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-yellow-600 font-semibold">{product.currentStock}</TableCell>
                    <TableCell>{product.minStock}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {stats.outOfStockProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Produtos Sem Estoque</CardTitle>
            <CardDescription>Produtos que estão completamente sem estoque</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.outOfStockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium text-red-600">{product.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

