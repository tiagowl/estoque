'use client';

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuHeader,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { Badge } from '@/shared/components/ui/badge';
import Link from 'next/link';
import { cn } from '@/shared/utils/cn';

interface Notification {
  id: string;
  type: 'low_stock' | 'out_of_stock';
  message: string;
  productId: string;
  productName: string;
  severity: 'low' | 'medium' | 'high';
  currentStock?: number;
  minStock?: number | null;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
    // Atualizar notificações a cada 30 segundos
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const notificationCount = notifications.length;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {notificationCount > 9 ? '9+' : notificationCount}
            </Badge>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuHeader>
          <DropdownMenuLabel>
            Notificações
            {notificationCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {notificationCount}
              </Badge>
            )}
          </DropdownMenuLabel>
        </DropdownMenuHeader>
        <DropdownMenuSeparator />
        {loading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Carregando...
          </div>
        ) : notificationCount === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            Nenhuma notificação no momento
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.map((notification) => (
              <Link
                key={notification.id}
                href="/products"
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-4 py-3 hover:bg-accent transition-colors border-b last:border-b-0",
                  notification.severity === 'high' && "bg-destructive/5"
                )}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                      notification.severity === 'high' && "bg-destructive",
                      notification.severity === 'medium' && "bg-yellow-500",
                      notification.severity === 'low' && "bg-blue-500"
                    )}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notification.productName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {notification.message}
                    </p>
                    {notification.type === 'low_stock' && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Estoque: {notification.currentStock} / Mínimo: {notification.minStock}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        {notificationCount > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="text-sm text-primary hover:underline text-center block"
              >
                Ver todos os produtos
              </Link>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


