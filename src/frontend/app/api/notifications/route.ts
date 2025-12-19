import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/shared/utils/auth';
import { ProductRepository } from '@/infrastructure/repositories/ProductRepository';

const productRepository = new ProductRepository();

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Buscar produtos com estoque baixo (estoque <= mínimo, mas > 0)
    const lowStockProducts = await productRepository.findLowStock(user.userId);
    
    // Buscar produtos sem estoque (estoque = 0)
    const outOfStockProducts = await productRepository.findOutOfStock(user.userId);

    // Criar notificações
    const notifications = [
      ...outOfStockProducts.map(product => ({
        id: product.id,
        type: 'out_of_stock' as const,
        message: `${product.name} está sem estoque`,
        productId: product.id,
        productName: product.name,
        severity: 'high' as const,
      })),
      ...lowStockProducts.map(product => ({
        id: product.id,
        type: 'low_stock' as const,
        message: `${product.name} está com estoque baixo (${product.currentStock}/${product.minStock})`,
        productId: product.id,
        productName: product.name,
        currentStock: product.currentStock,
        minStock: product.minStock,
        severity: 'medium' as const,
      })),
    ];

    return NextResponse.json({
      notifications,
      count: notifications.length,
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


