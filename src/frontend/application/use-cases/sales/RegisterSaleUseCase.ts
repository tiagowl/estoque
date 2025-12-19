import { Sale, SaleItem } from '@/domain/entities/Sale';
import { Product } from '@/domain/entities/Product';
import { IProductRepository } from '@/domain/repositories/IProductRepository';
import { ISaleRepository } from '@/domain/repositories/ISaleRepository';
import { IMovementRepository } from '@/domain/repositories/IMovementRepository';
import { Movement } from '@/domain/entities/Movement';
import { RegisterSaleDTO } from '@/shared/utils/validation';
import { NotFoundError, ValidationError } from '@/domain/errors/DomainError';
import { generateUUID } from '@/shared/utils/uuid';

export class RegisterSaleUseCase {
  constructor(
    private productRepository: IProductRepository,
    private saleRepository: ISaleRepository,
    private movementRepository: IMovementRepository
  ) {}

  async execute(
    data: RegisterSaleDTO,
    userId: string
  ): Promise<{ sale: Sale; items: SaleItem[] }> {
    // Validar produtos e estoque
    const products: Product[] = [];
    for (const item of data.items) {
      const product = await this.productRepository.findById(item.productId, userId);
      if (!product) {
        throw new NotFoundError(`Product ${item.productId}`);
      }

      if (product.currentStock < item.quantity) {
        throw new ValidationError(
          `Estoque insuficiente para produto ${product.name}`
        );
      }

      products.push(product);
    }

    // Criar venda
    const saleId = generateUUID();
    let total = 0;

    // Criar itens e calcular total
    const saleItems: SaleItem[] = [];
    for (let i = 0; i < data.items.length; i++) {
      const item = data.items[i];
      const product = products[i];
      const unitPrice = product.sellPrice;
      const subtotal = unitPrice * item.quantity;
      total += subtotal;

      saleItems.push(
        SaleItem.create({
          id: generateUUID(),
          saleId,
          productId: product.id,
          quantity: item.quantity,
          unitPrice,
        })
      );
    }

    const sale = Sale.create({
      id: saleId,
      userId,
      total,
      items: saleItems,
    });

    // Salvar venda e itens
    const savedSale = await this.saleRepository.create(sale);
    const savedItems = await this.saleRepository.createItems(saleItems);

    // Atualizar estoque e criar movimentações
    const updates: Promise<any>[] = [];
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const item = data.items[i];
      const updatedProduct = product.updateStock(product.currentStock - item.quantity);

      updates.push(this.productRepository.update(updatedProduct));

      // Criar movimentação de saída
      const movement = Movement.create({
        id: generateUUID(),
        userId,
        productId: product.id,
        type: 'EXIT',
        quantity: item.quantity,
        observation: `Venda ${saleId}`,
      });

      updates.push(this.movementRepository.create(movement));
    }

    await Promise.all(updates);

    return {
      sale: savedSale.addItems(savedItems),
      items: savedItems,
    };
  }
}

