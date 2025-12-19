import { Sale, SaleItem } from '../entities/Sale';

export interface ISaleRepository {
  create(sale: Sale): Promise<Sale>;
  createItems(items: SaleItem[]): Promise<SaleItem[]>;
  findById(id: string, userId: string): Promise<Sale | null>;
  findByUserId(userId: string, filters?: {
    startDate?: Date;
    endDate?: Date;
    page?: number;
    limit?: number;
  }): Promise<{ sales: Sale[]; total: number }>;
  findItemsBySaleId(saleId: string): Promise<SaleItem[]>;
}


