import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/shared/utils/auth';
import { CreateProductUseCase } from '@/application/use-cases/products/CreateProductUseCase';
import { ListProductsUseCase } from '@/application/use-cases/products/ListProductsUseCase';
import { ProductRepository } from '@/infrastructure/repositories/ProductRepository';
import { createProductSchema } from '@/shared/utils/validation';
import { DomainError } from '@/domain/errors/DomainError';

const productRepository = new ProductRepository();

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || undefined;
    const sortOrder = (searchParams.get('sortOrder') || 'desc') as 'asc' | 'desc';

    const useCase = new ListProductsUseCase(productRepository);
    const result = await useCase.execute(user.userId, {
      search,
      page,
      limit,
      sortBy,
      sortOrder,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('List products error:', error);
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
    
    const validation = createProductSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.errors },
        { status: 400 }
      );
    }

    const useCase = new CreateProductUseCase(productRepository);
    const product = await useCase.execute(validation.data, user.userId);

    return NextResponse.json({ product: product.toJSON() }, { status: 201 });
  } catch (error) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


