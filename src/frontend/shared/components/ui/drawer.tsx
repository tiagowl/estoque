'use client';

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/shared/utils/cn"
import { Button } from "./button"

interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}

export function Drawer({ open, onOpenChange, children, side = 'right', className }: DrawerProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const sideClasses = {
    right: 'right-0 top-0 h-full',
    left: 'left-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => onOpenChange?.(false)}
      />
      <div
        className={cn(
          "fixed z-50 bg-background shadow-lg transition-transform",
          sideClasses[side],
          side === 'right' && 'animate-in slide-in-from-right',
          side === 'left' && 'animate-in slide-in-from-left',
          side === 'top' && 'animate-in slide-in-from-top',
          side === 'bottom' && 'animate-in slide-in-from-bottom',
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
}

interface DrawerTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <h2
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

interface DrawerDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

interface DrawerContentProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

export function DrawerContent({ className, children, onClose, ...props }: DrawerContentProps) {
  return (
    <div className={cn("flex flex-col h-full", className)} {...props}>
      {onClose && (
        <div className="flex items-center justify-end p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

interface DrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      className={cn("flex items-center justify-end space-x-2 p-6 border-t", className)}
      {...props}
    />
  );
}


