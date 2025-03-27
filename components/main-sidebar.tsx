"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Briefcase,
  Building,
  Calendar,
  ClipboardList,
  CreditCard,
  FileText,
  Home,
  PieChart,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Proyectos",
    href: "/projects",
    icon: Briefcase,
  },
  {
    title: "Clientes",
    href: "/clients",
    icon: Building,
  },
  {
    title: "Oportunidades",
    href: "/opportunities",
    icon: PieChart,
  },
  {
    title: "Profesionales",
    href: "/professionals",
    icon: Users,
  },
  {
    title: "Facturación",
    href: "/billing",
    icon: CreditCard,
  },
  {
    title: "Contratos",
    href: "/contracts",
    icon: FileText,
  },
  {
    title: "Calendario",
    href: "/calendar",
    icon: Calendar,
  },
  {
    title: "Reportes",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Administración",
    href: "/admin",
    icon: ClipboardList,
  },
]

export function MainSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-shrink-0 border-r md:block">
      <div className="flex h-full flex-col gap-2 p-2">
        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={cn("flex w-full justify-start", pathname === item.href && "bg-muted")}
            >
              <Link href={item.href} className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

