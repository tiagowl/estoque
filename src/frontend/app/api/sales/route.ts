import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/shared/utils/auth';
import { RegisterSaleUseCase } from '@/application/use-cases/sales/RegisterSaleUseCase';
import { ProductRepository } from '@/infrastructure/repositories/ProductRepository';
import { SaleRepository } from '@/infrastructure/repositories/SaleRepository';
import { MovementRepository } from '@/infrastructure/repositories/MovementRepository';
import { registerSaleSchema } from '@/shared/utils/validation';
import { DomainError } from '@/domain/errors/DomainError';

const productRepository = new ProductRepository();
const saleRepository = new SaleRepository();
const movementRepository = new MovementRepository();

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await saleRepository.findByUserId(user.userId, {
      startDate,
      endDate,
      page,
      limit,
    });

    // Buscar items para cada venda
    const salesWithItems = await Promise.all(
      result.sales.map(async (sale) => {
        const items = await saleRepository.findItemsBySaleId(sale.id);
        return sale.addItems(items);
      })
    );

    return NextResponse.json({
      sales: salesWithItems.map(s => s.toJSON()),
      total: result.total,
      page,
      totalPages: Math.ceil(result.total / limit),
    });
  } catch (error) {
    console.error('List sales error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    const validation = registerSaleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.errors },
        { status: 400 }
      );
    }

    const useCase = new RegisterSaleUseCase(
      productRepository,
      saleRepository,
      movementRepository
    );
    const result = await useCase.execute(validation.data, user.userId);

    return NextResponse.json({
      sale: result.sale.toJSON(),
      items: result.items.map(i => i.toJSON()),
    }, { status: 201 });
  } catch (error) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    console.error('Register sale error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


