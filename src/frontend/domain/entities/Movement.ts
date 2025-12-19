export type MovementType = 'ENTRY' | 'EXIT';

export class Movement {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly productId: string | null,
    public readonly type: MovementType,
    public readonly quantity: number,
    public readonly observation: string | null,
    public readonly createdAt: Date
  ) {}

  static create(data: {
    id: string;
    userId: string;
    productId: string | null;
    type: MovementType;
    quantity: number;
    observation?: string | null;
    createdAt?: Date;
  }): Movement {
    if (data.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    if (!['ENTRY', 'EXIT'].includes(data.type)) {
      throw new Error('Movement type must be ENTRY or EXIT');
    }

    return new Movement(
      data.id,
      data.userId,
      data.productId,
      data.type,
      data.quantity,
      data.observation ?? null,
      data.createdAt || new Date()
    );
  }

  static fromPersistence(data: {
    id: string;
    user_id: string;
    product_id: string | null;
    type: string;
    quantity: number;
    observation: string | null;
    created_at: Date;
  }): Movement {
    return new Movement(
      data.id,
      data.user_id,
      data.product_id,
      data.type as MovementType,
      data.quantity,
      data.observation,
      data.created_at
    );
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      productId: this.productId,
      type: this.type,
      quantity: this.quantity,
      observation: this.observation,
      createdAt: this.createdAt,
    };
  }
}


