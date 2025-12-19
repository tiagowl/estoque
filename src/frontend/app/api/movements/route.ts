import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/shared/utils/auth';
import { MovementRepository } from '@/infrastructure/repositories/MovementRepository';
import { DomainError } from '@/domain/errors/DomainError';

const movementRepository = new MovementRepository();

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') || undefined;
    const type = searchParams.get('type') as 'ENTRY' | 'EXIT' | undefined;
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined;
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await movementRepository.findByUserId(user.userId, {
      productId,
      type,
      startDate,
      endDate,
      page,
      limit,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('List movements error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


