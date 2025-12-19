import { Product } from '../entities/Product';

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string, userId: string): Promise<Product | null>;
  findAll(userId: string): Promise<Product[]>;
  findByUserId(userId: string, filters?: {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<{ products: Product[]; total: number }>;
  update(product: Product): Promise<Product>;
  delete(id: string, userId: string): Promise<void>;
  findLowStock(userId: string): Promise<Product[]>;
  findOutOfStock(userId: string): Promise<Product[]>;
  count(userId: string): Promise<number>;
}


