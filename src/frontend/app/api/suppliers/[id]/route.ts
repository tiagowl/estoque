import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/shared/utils/auth';
import { SupplierRepository } from '@/infrastructure/repositories/SupplierRepository';
import { Supplier } from '@/domain/entities/Supplier';
import { updateSupplierSchema } from '@/shared/utils/validation';
import { DomainError } from '@/domain/errors/DomainError';

const supplierRepository = new SupplierRepository();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supplier = await supplierRepository.findById(params.id, user.userId);
    if (!supplier) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    return NextResponse.json({ supplier: supplier.toJSON() });
  } catch (error) {
    console.error('Get supplier error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    const validation = updateSupplierSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.errors },
        { status: 400 }
      );
    }

    const existing = await supplierRepository.findById(params.id, user.userId);
    if (!existing) {
      return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    }

    const updated = Supplier.create({
      id: existing.id,
      userId: existing.userId,
      name: validation.data.name ?? existing.name,
      phone: validation.data.phone !== undefined ? validation.data.phone : existing.phone,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    });

    const saved = await supplierRepository.update(updated);

    return NextResponse.json({ supplier: saved.toJSON() });
  } catch (error) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    console.error('Update supplier error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await supplierRepository.delete(params.id, user.userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete supplier error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


