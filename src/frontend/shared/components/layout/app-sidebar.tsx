"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Package,
  ArrowUpDown,
  ShoppingCart,
  Users,
  Store,
} from "lucide-react"

import { NavMain } from "@/shared/components/layout/nav-main"
import { NavUser } from "@/shared/components/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/components/ui/sidebar"

// Menu items do sistema
const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Produtos",
    url: "/products",
    icon: Package,
  },
  {
    title: "Movimentações",
    url: "/movements",
    icon: ArrowUpDown,
  },
  {
    title: "Vendas",
    url: "/sales",
    icon: ShoppingCart,
  },
  {
    title: "Fornecedores",
    url: "/suppliers",
    icon: Users,
  },
]

// Mock user data - em produção, buscar do contexto/auth
const user = {
  name: "Usuário",
  email: "usuario@example.com",
  avatar: undefined,
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Store className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate font-semibold">Sistema Estoque</span>
            <span className="truncate text-xs">Controle de Estoque</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


