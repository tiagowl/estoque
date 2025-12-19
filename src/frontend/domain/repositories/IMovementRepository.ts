import { Movement } from '../entities/Movement';

export interface IMovementRepository {
  create(movement: Movement): Promise<Movement>;
  findById(id: string, userId: string): Promise<Movement | null>;
  findByUserId(userId: string, filters?: {
    productId?: string;
    type?: 'ENTRY' | 'EXIT';
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<{ movements: Movement[]; total: number }>;
  findByProductId(productId: string, userId: string): Promise<Movement[]>;
}


