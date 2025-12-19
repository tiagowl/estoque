import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/shared/utils/auth';
import { MovementRepository } from '@/infrastructure/repositories/MovementRepository';
import { ProductRepository } from '@/infrastructure/repositories/ProductRepository';
import { formatDate } from '@/shared/utils/format';

const movementRepository = new MovementRepository();
const productRepository = new ProductRepository();

// Função para escapar células CSV corretamente
function escapeCSVCell(value: string | number): string {
  const stringValue = String(value);
  // Se contém vírgula, aspas ou quebra de linha, precisa ser envolvido em aspas
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId') || undefined;
    const type = searchParams.get('type') as 'ENTRY' | 'EXIT' | undefined;

    const result = await movementRepository.findByUserId(user.userId, {
      productId,
      type,
      page: 1,
      limit: 10000, // Limite alto para exportação
    });

    // Buscar nomes dos produtos
    const productIds = [...new Set(result.movements.map(m => m.productId).filter(Boolean))];
    const productsMap = new Map();
    for (const id of productIds) {
      if (id) {
        const product = await productRepository.findById(id, user.userId);
        if (product) {
          productsMap.set(id, product.name);
        }
      }
    }

    // Gerar CSV com formatação melhorada
    const headers = ['Data e Hora', 'Produto', 'Tipo de Movimentação', 'Quantidade', 'Observações'];
    const rows = result.movements.map(m => [
      formatDate(m.createdAt),
      m.productId ? (productsMap.get(m.productId) || 'Produto removido') : 'N/A',
      m.type === 'ENTRY' ? 'Entrada' : 'Saída',
      m.quantity.toString(),
      m.observation || 'Sem observações',
    ]);

    const csv = [
      headers.join(';'), // Usa ponto e vírgula para melhor compatibilidade com Excel brasileiro
      ...rows.map(row => row.map(cell => escapeCSVCell(cell)).join(';'))
    ].join('\n');

    // Adiciona BOM UTF-8 para garantir que Excel abra corretamente com acentuação
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csv;

    return new Response(csvWithBOM, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="movimentacoes-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export movements error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


