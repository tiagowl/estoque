import Link from 'next/link';
import { Button } from '@/shared/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Sistema de Controle de Estoque
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Gerencie seu estoque de forma simples e eficiente. 
          Controle produtos, movimentações e vendas em um só lugar.
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button size="lg">Entrar</Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="lg">Cadastrar</Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Controle Completo</h3>
            <p className="text-gray-600">
              Gerencie produtos, preços, estoque e movimentações em tempo real.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Notificações</h3>
            <p className="text-gray-600">
              Receba alertas quando o estoque estiver baixo.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Relatórios</h3>
            <p className="text-gray-600">
              Exporte dados para análises e relatórios externos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


