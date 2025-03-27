"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, FileText, Download, Users, Edit, Save, X, PieChart, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import LocalStorageService, { type Project, type Opportunity, type Document } from "@/lib/local-storage-service"

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [relatedOpportunity, setRelatedOpportunity] = useState<Opportunity | null>(null)
  const [editingProgress, setEditingProgress] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showAddDocumentDialog, setShowAddDocumentDialog] = useState(false)
  const [newDocument, setNewDocument] = useState({
    name: "",
    type: "Contrato",
    size: "1.0 MB",
    url: "#",
  })

  useEffect(() => {
    async function fetchProject() {
      const response = await fetch("/public/data/projects.json") // Ajustar la ruta al archivo JSON
      const projects = await response.json()
      const currentProject = projects.find((p) => p.id === params.id)
      setProject(currentProject)
    }
    fetchProject()
  }, [params.id])

  const handleEditProgress = () => {
    setEditingProgress(true)
  }

  const handleSaveProgress = () => {
    if (!project) return

    try {
      const storageService = LocalStorageService.getInstance()
      const updatedProject = { ...project, progress: progressValue }
      storageService.updateProject(updatedProject)

      setProject(updatedProject)
      setEditingProgress(false)

      toast({
        title: "Progreso actualizado",
        description: "El progreso del proyecto ha sido actualizado exitosamente",
      })
    } catch (error) {
      console.error("Error al actualizar el progreso:", error)
      toast({
        title: "Error",
        description: "No se pudo actualizar el progreso del proyecto",
        variant: "destructive",
      })
    }
  }

  const handleCancelEdit = () => {
    setProgressValue(project?.progress || 0)
    setEditingProgress(false)
  }

  const handleAddDocument = () => {
    if (!project) return

    try {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: newDocument.name,
        type: newDocument.type,
        url: newDocument.url,
        uploadDate: new Date().toLocaleDateString(),
        size: newDocument.size,
      }

      const updatedDocuments = [...(project.documents || []), newDoc]
      const updatedProject = { ...project, documents: updatedDocuments }

      const storageService = LocalStorageService.getInstance()
      storageService.updateProject(updatedProject)

      setProject(updatedProject)
      setShowAddDocumentDialog(false)
      setNewDocument({
        name: "",
        type: "Contrato",
        size: "1.0 MB",
        url: "#",
      })

      toast({
        title: "Documento añadido",
        description: "El documento ha sido añadido exitosamente",
      })
    } catch (error) {
      console.error("Error al añadir documento:", error)
      toast({
        title: "Error",
        description: "No se pudo añadir el documento",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/projects")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Cargando proyecto...</h1>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/projects")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Proyecto no encontrado</h1>
        </div>
        <p>El proyecto solicitado no existe o ha sido eliminado.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => router.push("/projects")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">{project.name}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Información General</CardTitle>
              <CardDescription>Detalles principales del proyecto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
                  <p className="text-lg font-medium">{project.client}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contraparte</h3>
                  <p className="text-lg font-medium">{project.clientContact}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Responsable</h3>
                  <p className="text-lg font-medium">{project.manager}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
                  <Badge
                    variant={
                      project.status === "En ejecución"
                        ? "default"
                        : project.status === "En preparación"
                          ? "secondary"
                          : project.status === "Finalizado"
                            ? "success"
                            : "outline"
                    }
                    className="mt-1"
                  >
                    {project.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Fecha de Inicio</h3>
                  <p className="text-lg font-medium">{project.startDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Fecha de Entrega</h3>
                  <p className="text-lg font-medium">{project.endDate}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Descripción</h3>
                <p className="mt-1">{project.description}</p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">Progreso</h3>
                  {editingProgress ? (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={handleSaveProgress}>
                        <Save className="mr-1 h-4 w-4" />
                        Guardar
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                        <X className="mr-1 h-4 w-4" />
                        Cancelar
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" onClick={handleEditProgress}>
                      <Edit className="mr-1 h-4 w-4" />
                      Editar
                    </Button>
                  )}
                </div>
                {editingProgress ? (
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={[progressValue]}
                      min={0}
                      max={100}
                      step={5}
                      onValueChange={(value) => setProgressValue(value[0])}
                    />
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">0%</span>
                      <span className="text-sm font-medium">{progressValue}%</span>
                      <span className="text-sm text-muted-foreground">100%</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2">
                    <Progress value={project.progress} className="h-2" />
                    <div className="mt-1 text-right text-sm font-medium">{project.progress}%</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Equipo del Proyecto</CardTitle>
              <CardDescription>Profesionales asignados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.professionals.map((professional) => (
                  <div key={professional.id} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={professional.avatar} alt={professional.name} />
                      <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{professional.name}</p>
                      <p className="text-sm text-muted-foreground">{professional.role}</p>
                    </div>
                  </div>
                ))}
                {project.professionals.length === 0 && (
                  <p className="text-sm text-muted-foreground">No hay profesionales asignados a este proyecto.</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Gestionar Equipo
              </Button>
            </CardFooter>
          </Card>

          {relatedOpportunity && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Oportunidad Relacionada</CardTitle>
                <CardDescription>Origen del proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Nombre</h3>
                    <p className="font-medium">{relatedOpportunity.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
                    <p>{relatedOpportunity.client}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Valor</h3>
                    <p>{relatedOpportunity.value}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Estado</h3>
                    <Badge
                      variant={
                        relatedOpportunity.stage === "Cierre"
                          ? "default"
                          : relatedOpportunity.stage === "Negociación"
                            ? "secondary"
                            : relatedOpportunity.stage === "Propuesta Enviada"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {relatedOpportunity.stage}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push(`/opportunities/${relatedOpportunity.id}`)}
                >
                  <PieChart className="mr-2 h-4 w-4" />
                  Ver Oportunidad
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>

      <Tabs defaultValue="documents">
        <TabsList>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="timeline">Línea de Tiempo</TabsTrigger>
        </TabsList>
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Documentos del Proyecto</CardTitle>
                  <CardDescription>Contratos, propuestas y archivos relevantes</CardDescription>
                </div>
                <Button onClick={() => setShowAddDocumentDialog(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Subir Documento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {project.documents && project.documents.length > 0 ? (
                <div className="space-y-4">
                  {project.documents.map((document) => (
                    <div key={document.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline">{document.type}</Badge>
                            <span>{document.uploadDate}</span>
                            <span>{document.size}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <FileText className="mb-2 h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No hay documentos</h3>
                  <p className="text-sm text-muted-foreground">No se han subido documentos para este proyecto.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Línea de Tiempo del Proyecto</CardTitle>
              <CardDescription>Eventos importantes y actividades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1 h-full w-px bg-muted-foreground/20" />
                  <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">Inicio del Proyecto</h3>
                      <Badge variant="outline" className="text-xs">
                        {project.startDate}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Se inició el proyecto con el cliente {project.client}.
                    </p>
                  </div>
                </div>

                {project.documents &&
                  project.documents.map((document, index) => (
                    <div key={document.id} className="relative pl-8">
                      <div className="absolute left-0 top-1 h-full w-px bg-muted-foreground/20" />
                      <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-primary" />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Documento: {document.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {document.uploadDate}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Se subió el documento de tipo {document.type}.</p>
                      </div>
                    </div>
                  ))}

                {project.status === "Finalizado" && (
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-1 h-full w-px bg-muted-foreground/20" />
                    <div className="absolute left-[-4px] top-1 h-2 w-2 rounded-full bg-green-500" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Finalización del Proyecto</h3>
                        <Badge variant="outline" className="text-xs">
                          {project.endDate}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">El proyecto fue completado exitosamente.</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showAddDocumentDialog} onOpenChange={setShowAddDocumentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Añadir Nuevo Documento</DialogTitle>
            <DialogDescription>Sube un nuevo documento al proyecto</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre del Documento</label>
              <Input
                value={newDocument.name}
                onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                placeholder="Ej: Contrato de Servicios.pdf"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Documento</label>
              <Select
                value={newDocument.type}
                onValueChange={(value) => setNewDocument({ ...newDocument, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Contrato">Contrato</SelectItem>
                  <SelectItem value="Propuesta">Propuesta</SelectItem>
                  <SelectItem value="Informe">Informe</SelectItem>
                  <SelectItem value="Acta">Acta</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Archivo</label>
              <Input type="file" />
              <p className="text-xs text-muted-foreground">Seleccione un archivo PDF, Word, Excel o imagen.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDocumentDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAddDocument}>Guardar Documento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}

