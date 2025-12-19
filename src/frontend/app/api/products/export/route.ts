import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/shared/utils/auth';
import { ProductRepository } from '@/infrastructure/repositories/ProductRepository';

const productRepository = new ProductRepository();

// Função para formatar número como string CSV (usa vírgula como separador decimal)
function formatNumberForCSV(value: number | string | null | undefined): string {
  // Garante que o valor seja convertido para número
  const numValue = typeof value === 'string' ? parseFloat(value) : (value || 0);
  
  // Verifica se é um número válido
  if (isNaN(numValue)) {
    return '0,00';
  }
  
  return numValue.toFixed(2).replace('.', ',');
}

// Função para formatar data para CSV (usa formato que Excel não tenta interpretar como data)
function formatDateForCSV(date: Date | string): string {
  try {
    // Converte para Date se for string
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    // Verifica se a data é válida
    if (!dateObj || isNaN(dateObj.getTime())) {
      return 'Data inválida';
    }
    
    // Formata no padrão brasileiro DD/MM/AAAA
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    
    // Usa formato DD/MM/AAAA - será envolvido em aspas para forçar Excel a tratar como texto
    return `${day}/${month}/${year}`;
  } catch (error) {
    return 'Data inválida';
  }
}

// Função específica para escapar células de data (sempre força como texto)
function escapeDateCell(value: string): string {
  // Sempre envolve datas em aspas duplas para forçar Excel a tratar como texto
  // O Excel reconhece células entre aspas como texto e não tenta interpretar como data
  return `"${value}"`;
}

// Função para escapar células CSV corretamente
function escapeCSVCell(value: string | number): string {
  const stringValue = String(value);
  // Sempre envolve em aspas se contém vírgula, ponto e vírgula, aspas ou quebra de linha
  if (
    stringValue.includes(',') || 
    stringValue.includes(';') || 
    stringValue.includes('"') || 
    stringValue.includes('\n')
  ) {
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

    const products = await productRepository.findAll(user.userId);

    // Gerar CSV com formatação melhorada
    const headers = ['Nome', 'Preço de Custo (R$)', 'Preço de Venda (R$)', 'Estoque Atual', 'Estoque Mínimo', 'Data de Cadastro'];
    const rows = products.map(p => {
      const formattedDate = formatDateForCSV(p.createdAt);
      
      return [
        p.name,
        formatNumberForCSV(p.costPrice),
        formatNumberForCSV(p.sellPrice),
        p.currentStock.toString(),
        p.minStock?.toString() || 'N/A',
        escapeDateCell(formattedDate), // Data com escape especial para forçar como texto
      ];
    });

    const csv = [
      headers.join(';'), // Usa ponto e vírgula para melhor compatibilidade com Excel brasileiro
      ...rows.map((row, rowIndex) => {
        return row.map((cell, cellIndex) => {
          // Para a coluna de data (índice 5), já está escapada, então retorna direto
          if (cellIndex === 5) {
            return cell;
          }
          return escapeCSVCell(cell);
        }).join(';');
      })
    ].join('\n');

    // Adiciona BOM UTF-8 para garantir que Excel abra corretamente com acentuação
    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csv;

    return new Response(csvWithBOM, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="produtos-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('Export products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


