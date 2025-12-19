export class SaleItem {
  private constructor(
    public readonly id: string,
    public readonly saleId: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
    public readonly createdAt: Date
  ) {}

  static create(data: {
    id: string;
    saleId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    createdAt?: Date;
  }): SaleItem {
    if (data.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    if (data.unitPrice < 0) {
      throw new Error('Unit price cannot be negative');
    }

    return new SaleItem(
      data.id,
      data.saleId,
      data.productId,
      data.quantity,
      data.unitPrice,
      data.createdAt || new Date()
    );
  }

  static fromPersistence(data: {
    id: string;
    sale_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    created_at: Date;
  }): SaleItem {
    return new SaleItem(
      data.id,
      data.sale_id,
      data.product_id,
      data.quantity,
      data.unit_price,
      data.created_at
    );
  }

  getSubtotal(): number {
    return this.quantity * this.unitPrice;
  }

  toJSON() {
    return {
      id: this.id,
      saleId: this.saleId,
      productId: this.productId,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      subtotal: this.getSubtotal(),
      createdAt: this.createdAt,
    };
  }
}

export class Sale {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly total: number,
    public readonly createdAt: Date,
    public readonly items: SaleItem[] = []
  ) {}

  static create(data: {
    id: string;
    userId: string;
    total: number;
    items?: SaleItem[];
    createdAt?: Date;
  }): Sale {
    if (data.total < 0) {
      throw new Error('Total cannot be negative');
    }

    if (data.items && data.items.length === 0) {
      throw new Error('Sale must have at least one item');
    }

    return new Sale(
      data.id,
      data.userId,
      data.total,
      data.createdAt || new Date(),
      data.items || []
    );
  }

  static fromPersistence(data: {
    id: string;
    user_id: string;
    total: number;
    created_at: Date;
  }): Sale {
    return new Sale(data.id, data.user_id, data.total, data.created_at);
  }

  addItems(items: SaleItem[]): Sale {
    return new Sale(
      this.id,
      this.userId,
      this.total,
      this.createdAt,
      [...this.items, ...items]
    );
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      total: this.total,
      items: this.items.map(item => item.toJSON()),
      createdAt: this.createdAt,
    };
  }
}


