import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/shared/utils/auth';
import { SupplierRepository } from '@/infrastructure/repositories/SupplierRepository';
import { Supplier } from '@/domain/entities/Supplier';
import { createSupplierSchema } from '@/shared/utils/validation';
import { DomainError } from '@/domain/errors/DomainError';
import { generateUUID } from '@/shared/utils/uuid';

const supplierRepository = new SupplierRepository();

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const suppliers = await supplierRepository.findByUserId(user.userId);

    return NextResponse.json({ suppliers: suppliers.map(s => s.toJSON()) });
  } catch (error) {
    console.error('List suppliers error:', error);
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
    
    const validation = createSupplierSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.errors },
        { status: 400 }
      );
    }

    const supplier = Supplier.create({
      id: generateUUID(),
      userId: user.userId,
      name: validation.data.name,
      phone: validation.data.phone,
    });

    const created = await supplierRepository.create(supplier);

    return NextResponse.json({ supplier: created.toJSON() }, { status: 201 });
  } catch (error) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    console.error('Create supplier error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


