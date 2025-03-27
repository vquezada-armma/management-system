"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for demonstration purposes
const invoicesData = [
  {
    id: "INV-001",
    project: "Evaluación de riesgos operativos",
    client: "Banco Nacional",
    amount: "$15,000",
    issueDate: "15/04/2023",
    dueDate: "15/05/2023",
    status: "Pagada",
    paymentDate: "10/05/2023",
  },
  {
    id: "INV-002",
    project: "Implementación de controles",
    client: "Seguros del Sur",
    amount: "$8,500",
    issueDate: "01/05/2023",
    dueDate: "01/06/2023",
    status: "Pendiente",
    paymentDate: "",
  },
  {
    id: "INV-003",
    project: "Evaluación de riesgos tecnológicos",
    client: "TechSolutions",
    amount: "$12,350",
    issueDate: "10/03/2023",
    dueDate: "10/04/2023",
    status: "Vencida",
    paymentDate: "",
  },
  {
    id: "INV-004",
    project: "Plan de continuidad de negocio",
    client: "Farmacéutica Global",
    amount: "$18,900",
    issueDate: "05/04/2023",
    dueDate: "05/05/2023",
    status: "Pagada",
    paymentDate: "30/04/2023",
  },
  {
    id: "INV-005",
    project: "Auditoría de cumplimiento",
    client: "Comercial Textil",
    amount: "$9,750",
    issueDate: "20/04/2023",
    dueDate: "20/05/2023",
    status: "Pendiente",
    paymentDate: "",
  },
]

export function InvoicesList() {
  const [invoices, setInvoices] = useState(invoicesData)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Factura</TableHead>
            <TableHead>Proyecto</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead>Fechas</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">
                <Link href={`/billing/${invoice.id}`} className="hover:underline">
                  {invoice.id}
                </Link>
              </TableCell>
              <TableCell>{invoice.project}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell className="text-right">{invoice.amount}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-xs">Emisión: {invoice.issueDate}</span>
                  <span className="text-xs">Vencimiento: {invoice.dueDate}</span>
                  {invoice.paymentDate && <span className="text-xs">Pago: {invoice.paymentDate}</span>}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    invoice.status === "Pagada"
                      ? "default"
                      : invoice.status === "Pendiente"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menú</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    <DropdownMenuItem>Descargar PDF</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Registrar pago</DropdownMenuItem>
                    <DropdownMenuItem>Marcar como vencida</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">Anular factura</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

