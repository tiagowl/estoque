import { Sale, SaleItem } from '@/domain/entities/Sale';
import { ISaleRepository } from '@/domain/repositories/ISaleRepository';
import { sql } from '../database/neon-client';

export class SaleRepository implements ISaleRepository {
  async create(sale: Sale): Promise<Sale> {
    const result = await sql`
      INSERT INTO sales (id, user_id, total, created_at)
      VALUES (${sale.id}, ${sale.userId}, ${sale.total}, ${sale.createdAt})
      RETURNING *
    `;

    return Sale.fromPersistence(result[0] as any);
  }

  async createItems(items: SaleItem[]): Promise<SaleItem[]> {
    if (items.length === 0) return [];

    // Insert items one by one to avoid SQL syntax issues with multiple VALUES
    const results: SaleItem[] = [];
    
    for (const item of items) {
      const result = await sql`
        INSERT INTO sale_items (id, sale_id, product_id, quantity, unit_price, created_at)
        VALUES (${item.id}, ${item.saleId}, ${item.productId}, ${item.quantity}, ${item.unitPrice}, ${item.createdAt})
        RETURNING *
      `;
      
      if (result[0]) {
        results.push(SaleItem.fromPersistence(result[0] as any));
      }
    }

    return results;
  }

  async findById(id: string, userId: string): Promise<Sale | null> {
    const result = await sql`
      SELECT * FROM sales 
      WHERE id = ${id} AND user_id = ${userId} 
      LIMIT 1
    `;

    if (result.length === 0) return null;

    return Sale.fromPersistence(result[0] as any);
  }

  async findByUserId(
    userId: string,
    filters?: {
      startDate?: Date;
      endDate?: Date;
      page?: number;
      limit?: number;
    }
  ): Promise<{ sales: Sale[]; total: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;

    let salesResult: any[];
    let countResult: any[];

    const hasStartDate = !!filters?.startDate;
    const hasEndDate = !!filters?.endDate;

    if (hasStartDate && hasEndDate) {
      // Both filters
      [salesResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM sales 
          WHERE user_id = ${userId} 
            AND created_at >= ${filters!.startDate}
            AND created_at <= ${filters!.endDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM sales 
          WHERE user_id = ${userId} 
            AND created_at >= ${filters!.startDate}
            AND created_at <= ${filters!.endDate}
        `,
      ]);
    } else if (hasStartDate) {
      // Only startDate
      [salesResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM sales 
          WHERE user_id = ${userId} 
            AND created_at >= ${filters!.startDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM sales 
          WHERE user_id = ${userId} 
            AND created_at >= ${filters!.startDate}
        `,
      ]);
    } else if (hasEndDate) {
      // Only endDate
      [salesResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM sales 
          WHERE user_id = ${userId} 
            AND created_at <= ${filters!.endDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM sales 
          WHERE user_id = ${userId} 
            AND created_at <= ${filters!.endDate}
        `,
      ]);
    } else {
      // No filters
      [salesResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM sales 
          WHERE user_id = ${userId}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM sales 
          WHERE user_id = ${userId}
        `,
      ]);
    }

    const total = Number(countResult[0]?.total || 0);

    return {
      sales: salesResult.map((row: any) => Sale.fromPersistence(row)),
      total,
    };
  }

  async findItemsBySaleId(saleId: string): Promise<SaleItem[]> {
    const result = await sql`
      SELECT * FROM sale_items 
      WHERE sale_id = ${saleId}
      ORDER BY created_at ASC
    `;

    return result.map((row: any) => SaleItem.fromPersistence(row));
  }
}

