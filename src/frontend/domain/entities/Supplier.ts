export class Supplier {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly name: string,
    public readonly phone: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(data: {
    id: string;
    userId: string;
    name: string;
    phone?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
  }): Supplier {
    if (!data.name || data.name.trim().length < 3) {
      throw new Error('Supplier name must be at least 3 characters');
    }

    return new Supplier(
      data.id,
      data.userId,
      data.name.trim(),
      data.phone || null,
      data.createdAt || new Date(),
      data.updatedAt || new Date()
    );
  }

  static fromPersistence(data: {
    id: string;
    user_id: string;
    name: string;
    phone: string | null;
    created_at: Date;
    updated_at: Date;
  }): Supplier {
    return new Supplier(
      data.id,
      data.user_id,
      data.name,
      data.phone,
      data.created_at,
      data.updated_at
    );
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      name: this.name,
      phone: this.phone,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}


