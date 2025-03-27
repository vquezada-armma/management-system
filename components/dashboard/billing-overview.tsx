import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function BillingOverview() {
  const invoices = [
    {
      id: "INV-001",
      project: "Evaluación de riesgos operativos",
      client: "Banco Nacional",
      amount: "$15,000",
      status: "Pagada",
      date: "15/04/2023",
    },
    {
      id: "INV-002",
      project: "Implementación de controles",
      client: "Seguros del Sur",
      amount: "$8,500",
      status: "Pendiente",
      date: "01/05/2023",
    },
    {
      id: "INV-003",
      project: "Evaluación de riesgos tecnológicos",
      client: "TechSolutions",
      amount: "$12,350",
      status: "Vencida",
      date: "10/03/2023",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de Facturación</CardTitle>
        <CardDescription>Facturas recientes y su estado de pago</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium truncate max-w-[160px]">{invoice.project}</p>
              <Badge
                variant={
                  invoice.status === "Pagada" ? "default" : invoice.status === "Pendiente" ? "secondary" : "destructive"
                }
              >
                {invoice.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{invoice.client}</span>
              <span>{invoice.amount}</span>
            </div>
            <p className="text-xs text-muted-foreground">Fecha: {invoice.date}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full">
          <Link href="/billing" className="flex items-center justify-center gap-1">
            Ver toda la facturación
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

