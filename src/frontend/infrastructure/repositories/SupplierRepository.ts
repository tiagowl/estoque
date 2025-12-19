import { Supplier } from '@/domain/entities/Supplier';
import { ISupplierRepository } from '@/domain/repositories/ISupplierRepository';
import { sql } from '../database/neon-client';

export class SupplierRepository implements ISupplierRepository {
  async create(supplier: Supplier): Promise<Supplier> {
    const result = await sql`
      INSERT INTO suppliers (id, user_id, name, phone, created_at, updated_at)
      VALUES (${supplier.id}, ${supplier.userId}, ${supplier.name}, ${supplier.phone}, ${supplier.createdAt}, ${supplier.updatedAt})
      RETURNING *
    `;

    return Supplier.fromPersistence(result[0] as any);
  }

  async findById(id: string, userId: string): Promise<Supplier | null> {
    const result = await sql`
      SELECT * FROM suppliers 
      WHERE id = ${id} AND user_id = ${userId} 
      LIMIT 1
    `;

    if (result.length === 0) return null;

    return Supplier.fromPersistence(result[0] as any);
  }

  async findByUserId(userId: string): Promise<Supplier[]> {
    const result = await sql`
      SELECT * FROM suppliers 
      WHERE user_id = ${userId}
      ORDER BY name ASC
    `;

    return result.map((row: any) => Supplier.fromPersistence(row));
  }

  async update(supplier: Supplier): Promise<Supplier> {
    const result = await sql`
      UPDATE suppliers 
      SET 
        name = ${supplier.name},
        phone = ${supplier.phone},
        updated_at = ${supplier.updatedAt}
      WHERE id = ${supplier.id} AND user_id = ${supplier.userId}
      RETURNING *
    `;

    return Supplier.fromPersistence(result[0] as any);
  }

  async delete(id: string, userId: string): Promise<void> {
    await sql`
      DELETE FROM suppliers 
      WHERE id = ${id} AND user_id = ${userId}
    `;
  }
}


