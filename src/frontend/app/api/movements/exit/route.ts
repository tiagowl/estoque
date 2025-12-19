import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/shared/utils/auth';
import { RegisterExitUseCase } from '@/application/use-cases/movements/RegisterExitUseCase';
import { ProductRepository } from '@/infrastructure/repositories/ProductRepository';
import { MovementRepository } from '@/infrastructure/repositories/MovementRepository';
import { registerExitSchema } from '@/shared/utils/validation';
import { DomainError } from '@/domain/errors/DomainError';

const productRepository = new ProductRepository();
const movementRepository = new MovementRepository();

export async function POST(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    const validation = registerExitSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.errors },
        { status: 400 }
      );
    }

    const useCase = new RegisterExitUseCase(productRepository, movementRepository);
    const result = await useCase.execute(validation.data, user.userId);

    return NextResponse.json({
      movement: result.movement.toJSON(),
      product: result.product.toJSON(),
    }, { status: 201 });
  } catch (error) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    console.error('Register exit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


