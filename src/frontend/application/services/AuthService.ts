import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { ConflictError, UnauthorizedError } from '@/domain/errors/DomainError';
import { generateUUID } from '@/shared/utils/uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface AuthTokens {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export class AuthService {
  constructor(private userRepository: IUserRepository) {}

  async register(email: string, password: string): Promise<void> {
    // Verificar se email já existe
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictError('Email já está em uso');
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = User.create({
      id: generateUUID(),
      email: email.toLowerCase().trim(),
      passwordHash,
    });

    await this.userRepository.create(user);
  }

  async login(email: string, password: string): Promise<AuthTokens> {
    // Buscar usuário
    const user = await this.userRepository.findByEmail(email.toLowerCase().trim());
    if (!user) {
      throw new UnauthorizedError();
    }

    // Verificar senha
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedError();
    }

    // Gerar token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  verifyToken(token: string): { userId: string; email: string } {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
      return payload;
    } catch (error) {
      throw new UnauthorizedError();
    }
  }
}

