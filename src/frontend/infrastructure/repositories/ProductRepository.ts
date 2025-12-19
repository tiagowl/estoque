import { Product } from '@/domain/entities/Product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';
import { sql } from '../database/neon-client';

export class ProductRepository implements IProductRepository {
  async create(product: Product): Promise<Product> {
    const result = await sql`
      INSERT INTO products (id, user_id, name, cost_price, sell_price, current_stock, min_stock, created_at, updated_at)
      VALUES (
        ${product.id},
        ${product.userId},
        ${product.name},
        ${product.costPrice},
        ${product.sellPrice},
        ${product.currentStock},
        ${product.minStock},
        ${product.createdAt},
        ${product.updatedAt}
      )
      RETURNING *
    `;

    return Product.fromPersistence(result[0] as any);
  }

  async findById(id: string, userId: string): Promise<Product | null> {
    const result = await sql`
      SELECT * FROM products 
      WHERE id = ${id} AND user_id = ${userId} 
      LIMIT 1
    `;

    if (result.length === 0) return null;

    return Product.fromPersistence(result[0] as any);
  }

  async findAll(userId: string): Promise<Product[]> {
    const result = await sql`
      SELECT * FROM products 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    return result.map((row: any) => Product.fromPersistence(row));
  }

  async findByUserId(
    userId: string,
    filters?: {
      search?: string;
      page?: number;
      limit?: number;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<{ products: Product[]; total: number }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const offset = (page - 1) * limit;
    const search = filters?.search;

    // Query base com busca
    let products: any[];
    let countResult: any[];

    if (search) {
      const searchTerm = `%${search}%`;
      [products, countResult] = await Promise.all([
        sql`
          SELECT * FROM products 
          WHERE user_id = ${userId} AND name ILIKE ${searchTerm}
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM products 
          WHERE user_id = ${userId} AND name ILIKE ${searchTerm}
        `,
      ]);
    } else {
      [products, countResult] = await Promise.all([
        sql`
          SELECT * FROM products 
          WHERE user_id = ${userId}
          ORDER BY created_at DESC
          LIMIT ${limit} OFFSET ${offset}
        `,
        sql`
          SELECT COUNT(*) as total FROM products 
          WHERE user_id = ${userId}
        `,
      ]);
    }

    const total = Number(countResult[0]?.total || 0);

    return {
      products: products.map((row: any) => Product.fromPersistence(row)),
      total,
    };
  }

  async update(product: Product): Promise<Product> {
    const result = await sql`
      UPDATE products 
      SET 
        name = ${product.name},
        cost_price = ${product.costPrice},
        sell_price = ${product.sellPrice},
        current_stock = ${product.currentStock},
        min_stock = ${product.minStock},
        updated_at = ${product.updatedAt}
      WHERE id = ${product.id} AND user_id = ${product.userId}
      RETURNING *
    `;

    return Product.fromPersistence(result[0] as any);
  }

  async delete(id: string, userId: string): Promise<void> {
    await sql`
      DELETE FROM products 
      WHERE id = ${id} AND user_id = ${userId}
    `;
  }

  async findLowStock(userId: string): Promise<Product[]> {
    const result = await sql`
      SELECT * FROM products 
      WHERE user_id = ${userId} 
        AND min_stock IS NOT NULL 
        AND current_stock > 0
        AND current_stock <= min_stock
      ORDER BY current_stock ASC
    `;

    return result.map((row: any) => Product.fromPersistence(row));
  }

  async findOutOfStock(userId: string): Promise<Product[]> {
    const result = await sql`
      SELECT * FROM products 
      WHERE user_id = ${userId} AND current_stock = 0
      ORDER BY name ASC
    `;

    return result.map((row: any) => Product.fromPersistence(row));
  }

  async count(userId: string): Promise<number> {
    const result = await sql`
      SELECT COUNT(*) as total FROM products WHERE user_id = ${userId}
    `;

    return Number(result[0]?.total || 0);
  }
}

