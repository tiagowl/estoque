import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { sql } from '../database/neon-client';

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const result = await sql`
      INSERT INTO users (id, email, password_hash, created_at, updated_at)
      VALUES (${user.id}, ${user.email}, ${user.passwordHash}, ${user.createdAt}, ${user.updatedAt})
      RETURNING *
    `;

    return User.fromPersistence(result[0] as any);
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await sql`
      SELECT * FROM users WHERE email = ${email} LIMIT 1
    `;

    if (result.length === 0) return null;

    return User.fromPersistence(result[0] as any);
  }

  async findById(id: string): Promise<User | null> {
    const result = await sql`
      SELECT * FROM users WHERE id = ${id} LIMIT 1
    `;

    if (result.length === 0) return null;

    return User.fromPersistence(result[0] as any);
  }
}


