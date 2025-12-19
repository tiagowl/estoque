import { NextRequest } from 'next/server';
import { AuthService } from '@/application/services/AuthService';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { UnauthorizedError } from '@/domain/errors/DomainError';

export function extractToken(request: NextRequest): string | null {
  // Tentar do header Authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Tentar do cookie
  const token = request.cookies.get('auth-token')?.value;
  if (token) {
    return token;
  }

  return null;
}

export async function authenticateRequest(request: NextRequest): Promise<{
  userId: string;
  email: string;
} | null> {
  const token = extractToken(request);
  if (!token) {
    return null;
  }

  try {
    const authService = new AuthService(new UserRepository());
    const payload = authService.verifyToken(token);
    return payload;
  } catch (error) {
    return null;
  }
}


