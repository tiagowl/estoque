import { Product } from '@/domain/entities/Product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';
import { CreateProductDTO } from '@/shared/utils/validation';
import { generateUUID } from '@/shared/utils/uuid';

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(data: CreateProductDTO, userId: string): Promise<Product> {
    const product = Product.create({
      id: generateUUID(),
      userId,
      name: data.name,
      costPrice: data.costPrice,
      sellPrice: data.sellPrice,
      currentStock: 0,
      minStock: data.minStock ?? null,
    });

    return await this.productRepository.create(product);
  }
}

