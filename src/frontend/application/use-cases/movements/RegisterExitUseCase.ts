import { Movement } from '@/domain/entities/Movement';
import { Product } from '@/domain/entities/Product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';
import { IMovementRepository } from '@/domain/repositories/IMovementRepository';
import { RegisterExitDTO } from '@/shared/utils/validation';
import { NotFoundError, ValidationError } from '@/domain/errors/DomainError';
import { generateUUID } from '@/shared/utils/uuid';

export class RegisterExitUseCase {
  constructor(
    private productRepository: IProductRepository,
    private movementRepository: IMovementRepository
  ) {}

  async execute(
    data: RegisterExitDTO,
    userId: string
  ): Promise<{ movement: Movement; product: Product }> {
    // Buscar produto
    const product = await this.productRepository.findById(data.productId, userId);
    if (!product) {
      throw new NotFoundError('Product');
    }

    if (product.userId !== userId) {
      throw new ValidationError('Product does not belong to user');
    }

    // Validar estoque suficiente
    if (product.currentStock < data.quantity) {
      throw new ValidationError('Estoque insuficiente');
    }

    // Criar movimentação
    const movement = Movement.create({
      id: generateUUID(),
      userId,
      productId: product.id,
      type: 'EXIT',
      quantity: data.quantity,
      observation: data.observation,
    });

    // Atualizar estoque
    const updatedProduct = product.updateStock(
      product.currentStock - data.quantity
    );

    // Salvar
    const [savedMovement, savedProduct] = await Promise.all([
      this.movementRepository.create(movement),
      this.productRepository.update(updatedProduct),
    ]);

    return {
      movement: savedMovement,
      product: savedProduct,
    };
  }
}

