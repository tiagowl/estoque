import { Supplier } from '../entities/Supplier';

export interface ISupplierRepository {
  create(supplier: Supplier): Promise<Supplier>;
  findById(id: string, userId: string): Promise<Supplier | null>;
  findByUserId(userId: string): Promise<Supplier[]>;
  update(supplier: Supplier): Promise<Supplier>;
  delete(id: string, userId: string): Promise<void>;
}


