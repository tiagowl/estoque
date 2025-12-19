import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/application/services/AuthService';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { loginSchema } from '@/shared/utils/validation';
import { DomainError } from '@/domain/errors/DomainError';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation error', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const authService = new AuthService(new UserRepository());
    const result = await authService.login(email, password);

    const response = NextResponse.json(result);
    
    // Set cookie
    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    if (error instanceof DomainError) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: error.statusCode }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


