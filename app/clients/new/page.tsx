"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormDescription, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function NewClientPage() {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Aquí iría la lógica para guardar el cliente
    console.log("Cliente guardado")
    // Redireccionar a la lista de clientes
    router.push("/clients")
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Crear Nuevo Cliente</h1>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Información del Cliente</CardTitle>
            <CardDescription>Ingrese los detalles del nuevo cliente.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <FormLabel htmlFor="client-name">Nombre del Cliente</FormLabel>
                <Input id="client-name" placeholder="Ej: Banco Nacional" required />
                <FormDescription>Nombre completo de la empresa cliente</FormDescription>
              </div>

              <div className="space-y-2">
                <FormLabel>Sector</FormLabel>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banking">Banca y Finanzas</SelectItem>
                    <SelectItem value="insurance">Seguros</SelectItem>
                    <SelectItem value="retail">Comercio</SelectItem>
                    <SelectItem value="manufacturing">Manufactura</SelectItem>
                    <SelectItem value="technology">Tecnología</SelectItem>
                    <SelectItem value="healthcare">Salud</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Industria o sector al que pertenece el cliente</FormDescription>
              </div>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="address">Dirección</FormLabel>
              <Input id="address" placeholder="Ej: Av. Principal 123, Ciudad" />
              <FormDescription>Dirección física de la empresa</FormDescription>
            </div>

            <div className="space-y-2">
              <FormLabel htmlFor="description">Descripción</FormLabel>
              <Textarea
                id="description"
                placeholder="Breve descripción del cliente y su negocio"
                className="min-h-[100px]"
              />
              <FormDescription>Información adicional relevante sobre el cliente</FormDescription>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Contacto Principal</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <FormLabel htmlFor="contact-name">Nombre del Contacto</FormLabel>
                  <Input id="contact-name" placeholder="Ej: Juan Pérez" required />
                  <FormDescription>Nombre completo de la persona de contacto</FormDescription>
                </div>

                <div className="space-y-2">
                  <FormLabel htmlFor="contact-position">Cargo</FormLabel>
                  <Input id="contact-position" placeholder="Ej: Gerente de Riesgos" />
                  <FormDescription>Posición que ocupa en la empresa</FormDescription>
                </div>

                <div className="space-y-2">
                  <FormLabel htmlFor="contact-email">Correo Electrónico</FormLabel>
                  <Input id="contact-email" type="email" placeholder="Ej: jperez@empresa.com" required />
                  <FormDescription>Correo electrónico de contacto</FormDescription>
                </div>

                <div className="space-y-2">
                  <FormLabel htmlFor="contact-phone">Teléfono</FormLabel>
                  <Input id="contact-phone" placeholder="Ej: +1 (555) 123-4567" />
                  <FormDescription>Número telefónico de contacto</FormDescription>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/clients")}>
              Cancelar
            </Button>
            <Button type="submit">Crear Cliente</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

