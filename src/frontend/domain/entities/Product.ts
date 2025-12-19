import { ValidationError } from '../errors/DomainError';

export class Product {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly costPrice: number,
    public readonly sellPrice: number,
    public readonly currentStock: number,
    public readonly minStock: number | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(data: {
    id: string;
    userId: string;
    name: string;
    costPrice: number;
    sellPrice: number;
    currentStock?: number;
    minStock?: number | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): Product {
    // Validações
    if (!data.name || data.name.trim().length < 3) {
      throw new ValidationError('Product name must be at least 3 characters');
    }

    if (data.name.length > 100) {
      throw new ValidationError('Product name must be at most 100 characters');
    }

    if (data.costPrice < 0) {
      throw new ValidationError('Cost price cannot be negative');
    }

    if (data.sellPrice < 0) {
      throw new ValidationError('Sell price cannot be negative');
    }

    const stock = data.currentStock ?? 0;
    if (stock < 0) {
      throw new ValidationError('Current stock cannot be negative');
    }

    if (data.minStock !== null && data.minStock !== undefined && data.minStock < 0) {
      throw new ValidationError('Min stock cannot be negative');
    }

    return new Product(
      data.id,
      data.userId,
      data.name.trim(),
      data.costPrice,
      data.sellPrice,
      stock,
      data.minStock ?? null,
      data.createdAt || new Date(),
      data.updatedAt || new Date()
    );
  }

  static fromPersistence(data: {
    id: string;
    user_id: string;
    name: string;
    cost_price: number;
    sell_price: number;
    current_stock: number;
    min_stock: number | null;
    created_at: Date;
    updated_at: Date;
  }): Product {
    return new Product(
      data.id,
      data.user_id,
      data.name,
      data.cost_price,
      data.sell_price,
      data.current_stock,
      data.min_stock,
      data.created_at,
      data.updated_at
    );
  }

  updateStock(newStock: number): Product {
    if (newStock < 0) {
      throw new ValidationError('Stock cannot be negative');
    }

    return new Product(
      this.id,
      this.userId,
      this.name,
      this.costPrice,
      this.sellPrice,
      newStock,
      this.minStock,
      this.createdAt,
      new Date()
    );
  }

  isLowStock(): boolean {
    if (this.minStock === null) return false;
    return this.currentStock <= this.minStock;
  }

  isOutOfStock(): boolean {
    return this.currentStock === 0;
  }

  calculateProfitMargin(): number {
    if (this.costPrice === 0) return 0;
    return ((this.sellPrice - this.costPrice) / this.costPrice) * 100;
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      costPrice: this.costPrice,
      sellPrice: this.sellPrice,
      currentStock: this.currentStock,
      minStock: this.minStock,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}


