import { Product } from '@/domain/entities/Product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';

export interface ListProductsFilters {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ListProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(userId: string, filters?: ListProductsFilters): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;

    const result = await this.productRepository.findByUserId(userId, filters);

    return {
      products: result.products,
      total: result.total,
      page,
      totalPages: Math.ceil(result.total / limit),
    };
  }
}


