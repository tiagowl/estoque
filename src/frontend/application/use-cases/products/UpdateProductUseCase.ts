import { Product } from '@/domain/entities/Product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';
import { UpdateProductDTO } from '@/shared/utils/validation';
import { NotFoundError, ForbiddenError } from '@/domain/errors/DomainError';

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(
    id: string,
    data: UpdateProductDTO,
    userId: string
  ): Promise<Product> {
    const existingProduct = await this.productRepository.findById(id, userId);
    if (!existingProduct) {
      throw new NotFoundError('Product');
    }

    if (existingProduct.userId !== userId) {
      throw new ForbiddenError();
    }

    const updatedProduct = Product.create({
      id: existingProduct.id,
      userId: existingProduct.userId,
      name: data.name ?? existingProduct.name,
      costPrice: data.costPrice ?? existingProduct.costPrice,
      sellPrice: data.sellPrice ?? existingProduct.sellPrice,
      currentStock: existingProduct.currentStock,
      minStock: data.minStock !== undefined ? data.minStock : existingProduct.minStock,
      createdAt: existingProduct.createdAt,
      updatedAt: new Date(),
    });

    return await this.productRepository.update(updatedProduct);
  }
}


