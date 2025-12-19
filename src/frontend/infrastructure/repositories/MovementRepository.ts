import { Movement } from '@/domain/entities/Movement';
import { IMovementRepository } from '@/domain/repositories/IMovementRepository';
import { sql } from '../database/neon-client';

export class MovementRepository implements IMovementRepository {
  async create(movement: Movement): Promise<Movement> {
    const result = await sql`
      INSERT INTO movements (id, user_id, product_id, type, quantity, observation, created_at)
      VALUES (
        ${movement.id},
        ${movement.userId},
        ${movement.productId},
        ${movement.type},
        ${movement.quantity},
        ${movement.observation},
        ${movement.createdAt}
      )
      RETURNING *
    `;

    return Movement.fromPersistence(result[0] as any);
  }

  async findById(id: string, userId: string): Promise<Movement | null> {
    const result = await sql`
      SELECT * FROM movements 
      WHERE id = ${id} AND user_id = ${userId} 
      LIMIT 1
    `;

    if (result.length === 0) return null;

    return Movement.fromPersistence(result[0] as any);
  }

  async findByUserId(
    userId: string,
    filters?: {
      productId?: string;
      type?: 'ENTRY' | 'EXIT';
      startDate?: Date;
      endDate?: Date;
      page?: number;
      limit?: number;
    }
  ): Promise<{ movements: Movement[]; total: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;

    // Build queries conditionally like ProductRepository
    let movementsResult: any[];
    let countResult: any[];

    const hasProductId = !!filters?.productId;
    const hasType = !!filters?.type;
    const hasStartDate = !!filters?.startDate;
    const hasEndDate = !!filters?.endDate;

    if (hasProductId && hasType && hasStartDate && hasEndDate) {
      // All filters
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND type = ${filters!.type}
            AND created_at >= ${filters!.startDate}
            AND created_at <= ${filters!.endDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND type = ${filters!.type}
            AND created_at >= ${filters!.startDate}
            AND created_at <= ${filters!.endDate}
        `,
      ]);
    } else if (hasProductId && hasType && hasStartDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND type = ${filters!.type}
            AND created_at >= ${filters!.startDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND type = ${filters!.type}
            AND created_at >= ${filters!.startDate}
        `,
      ]);
    } else if (hasProductId && hasType && hasEndDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND type = ${filters!.type}
            AND created_at <= ${filters!.endDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND type = ${filters!.type}
            AND created_at <= ${filters!.endDate}
        `,
      ]);
    } else if (hasProductId && hasStartDate && hasEndDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND created_at >= ${filters!.startDate}
            AND created_at <= ${filters!.endDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND created_at >= ${filters!.startDate}
            AND created_at <= ${filters!.endDate}
        `,
      ]);
    } else if (hasType && hasStartDate && hasEndDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND type = ${filters!.type}
            AND created_at >= ${filters!.startDate}
            AND created_at <= ${filters!.endDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND type = ${filters!.type}
            AND created_at >= ${filters!.startDate}
            AND created_at <= ${filters!.endDate}
        `,
      ]);
    } else if (hasProductId && hasType) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND type = ${filters!.type}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND type = ${filters!.type}
        `,
      ]);
    } else if (hasProductId && hasStartDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND created_at >= ${filters!.startDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND created_at >= ${filters!.startDate}
        `,
      ]);
    } else if (hasProductId && hasEndDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND created_at <= ${filters!.endDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
            AND created_at <= ${filters!.endDate}
        `,
      ]);
    } else if (hasType && hasStartDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND type = ${filters!.type}
            AND created_at >= ${filters!.startDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND type = ${filters!.type}
            AND created_at >= ${filters!.startDate}
        `,
      ]);
    } else if (hasType && hasEndDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND type = ${filters!.type}
            AND created_at <= ${filters!.endDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND type = ${filters!.type}
            AND created_at <= ${filters!.endDate}
        `,
      ]);
    } else if (hasStartDate && hasEndDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND created_at >= ${filters!.startDate}
            AND created_at <= ${filters!.endDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND created_at >= ${filters!.startDate}
            AND created_at <= ${filters!.endDate}
        `,
      ]);
    } else if (hasProductId) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND product_id = ${filters!.productId}
        `,
      ]);
    } else if (hasType) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND type = ${filters!.type}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND type = ${filters!.type}
        `,
      ]);
    } else if (hasStartDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND created_at >= ${filters!.startDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND created_at >= ${filters!.startDate}
        `,
      ]);
    } else if (hasEndDate) {
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId} 
            AND created_at <= ${filters!.endDate}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId} 
            AND created_at <= ${filters!.endDate}
        `,
      ]);
    } else {
      // No filters
      [movementsResult, countResult] = await Promise.all([
        sql`
          SELECT * FROM movements 
          WHERE user_id = ${userId}
          ORDER BY created_at DESC 
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM movements 
          WHERE user_id = ${userId}
        `,
      ]);
    }

    const total = Number(countResult[0]?.total || 0);

    return {
      movements: movementsResult.map((row: any) => Movement.fromPersistence(row)),
      total,
    };
  }

  async findByProductId(productId: string, userId: string): Promise<Movement[]> {
    const result = await sql`
      SELECT * FROM movements 
      WHERE product_id = ${productId} AND user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return result.map((row: any) => Movement.fromPersistence(row));
  }
}

