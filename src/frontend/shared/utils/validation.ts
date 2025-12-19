import { z } from 'zod';

// Auth Schemas
export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

export type RegisterDTO = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export type LoginDTO = z.infer<typeof loginSchema>;

// Product Schemas
export const createProductSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(100, 'Nome deve ter no máximo 100 caracteres'),
  costPrice: z.number().positive('Preço de custo deve ser positivo'),
  sellPrice: z.number().positive('Preço de venda deve ser positivo'),
  minStock: z.number().int().nonnegative('Estoque mínimo deve ser um número positivo').nullable().optional(),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.partial();

export type UpdateProductDTO = z.infer<typeof updateProductSchema>;

// Movement Schemas
export const registerEntrySchema = z.object({
  productId: z.string().uuid('ID do produto inválido'),
  quantity: z.number().int().positive('Quantidade deve ser um número positivo'),
  observation: z.string().max(500, 'Observação deve ter no máximo 500 caracteres').optional().nullable(),
});

export type RegisterEntryDTO = z.infer<typeof registerEntrySchema>;

export const registerExitSchema = registerEntrySchema;

export type RegisterExitDTO = z.infer<typeof registerExitSchema>;

// Sale Schemas
export const saleItemSchema = z.object({
  productId: z.string().uuid('ID do produto inválido'),
  quantity: z.number().int().positive('Quantidade deve ser um número positivo'),
});

export const registerSaleSchema = z.object({
  items: z.array(saleItemSchema).min(1, 'Venda deve ter pelo menos um item'),
});

export type RegisterSaleDTO = z.infer<typeof registerSaleSchema>;

// Supplier Schemas
export const createSupplierSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(255, 'Nome deve ter no máximo 255 caracteres'),
  phone: z.string().max(20, 'Telefone deve ter no máximo 20 caracteres').optional().nullable(),
});

export type CreateSupplierDTO = z.infer<typeof createSupplierSchema>;

export const updateSupplierSchema = createSupplierSchema.partial();

export type UpdateSupplierDTO = z.infer<typeof updateSupplierSchema>;
