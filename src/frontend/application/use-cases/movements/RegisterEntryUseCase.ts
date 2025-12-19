import { Movement } from '@/domain/entities/Movement';
import { Product } from '@/domain/entities/Product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';
import { IMovementRepository } from '@/domain/repositories/IMovementRepository';
import { RegisterEntryDTO } from '@/shared/utils/validation';
import { NotFoundError, ValidationError } from '@/domain/errors/DomainError';
import { generateUUID } from '@/shared/utils/uuid';

export class RegisterEntryUseCase {
  constructor(
    private productRepository: IProductRepository,
    private movementRepository: IMovementRepository
  ) {}

  async execute(
    data: RegisterEntryDTO,
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

    // Criar movimentação
    const movement = Movement.create({
      id: generateUUID(),
      userId,
      productId: product.id,
      type: 'ENTRY',
      quantity: data.quantity,
      observation: data.observation,
    });

    // Atualizar estoque
    const updatedProduct = product.updateStock(
      product.currentStock + data.quantity
    );

    // Salvar em transação (simulado - Neon não suporta transações diretamente no client)
    // Em produção, usar transação real
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

