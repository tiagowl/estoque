import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/application/services/AuthService';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { registerSchema } from '@/shared/utils/validation';
import { DomainError } from '@/domain/errors/DomainError';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validation = registerSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const authService = new AuthService(new UserRepository());
    await authService.register(email, password);

    return NextResponse.json(
      { success: true, message: 'Usuário cadastrado com sucesso' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.statusCode }
      );
    }

    console.error('Register error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


