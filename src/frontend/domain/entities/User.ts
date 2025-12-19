export class User {
  private constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(data: {
    id: string;
    email: string;
    passwordHash: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): User {
    return new User(
      data.id,
      data.email,
      data.passwordHash,
      data.createdAt || new Date(),
      data.updatedAt || new Date()
    );
  }

  static fromPersistence(data: {
    id: string;
    email: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
  }): User {
    return new User(
      data.id,
      data.email,
      data.password_hash,
      data.created_at,
      data.updated_at
    );
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}


