"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Plus, 
  Trash2, 
  Save,
  BookOpen,
  FileDown
} from "lucide-react";
import { documentExportService } from "@/lib/stubs";
import { useToast } from "@/hooks/use-toast";

interface DocumentVariable {
  name: string;
  value: string;
  type: "text" | "date" | "number" | "select";
  options?: string[];
}

interface DocumentSection {
  id: string;
  title: string;
  content: string;
  variables: DocumentVariable[];
}

interface DocumentBuilderProps {
  onExportDocument: (format: "pdf" | "docx") => void;
}

export function DocumentBuilder({ onExportDocument }: DocumentBuilderProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("outline");
  const [documentTitle, setDocumentTitle] = useState("Contrato de Arrendamiento");
  const [sections, setSections] = useState<DocumentSection[]>([
    {
      id: "1",
      title: "Partes Contratantes",
      content: "Entre {{nombre_arrendador}} y {{nombre_arrendatario}}...",
      variables: [
        { name: "nombre_arrendador", value: "", type: "text" },
        { name: "nombre_arrendatario", value: "", type: "text" }
      ]
    },
    {
      id: "2", 
      title: "Objeto del Contrato",
      content: "El objeto del presente contrato es el arrendamiento del inmueble ubicado en {{direccion}}...",
      variables: [
        { name: "direccion", value: "", type: "text" },
        { name: "monto_alquiler", value: "", type: "number" }
      ]
    }
  ]);

  const [variables, setVariables] = useState<DocumentVariable[]>([
    { name: "nombre_arrendador", value: "Juan Pérez", type: "text" },
    { name: "nombre_arrendatario", value: "María García", type: "text" },
    { name: "direccion", value: "Av. Principal #123, Santa Cruz", type: "text" },
    { name: "monto_alquiler", value: "2500", type: "number" },
    { name: "fecha_inicio", value: "2024-01-01", type: "date" },
    { name: "duracion", value: "12", type: "number" }
  ]);

  const updateVariable = (name: string, value: string) => {
    setVariables(prev => 
      prev.map(v => v.name === name ? { ...v, value } : v)
    );
  };

  const addVariable = () => {
    const newVar: DocumentVariable = {
      name: `variable_${variables.length + 1}`,
      value: "",
      type: "text"
    };
    setVariables(prev => [...prev, newVar]);
  };

  const removeVariable = (name: string) => {
    setVariables(prev => prev.filter(v => v.name !== name));
  };

  const generatePreview = () => {
    let preview = `${documentTitle}\n\n`;
    
    sections.forEach(section => {
      preview += `${section.title.toUpperCase()}\n`;
      preview += "─".repeat(section.title.length) + "\n\n";
      
      let content = section.content;
      variables.forEach(variable => {
        const regex = new RegExp(`{{${variable.name}}}`, 'g');
        content = content.replace(regex, variable.value || `[${variable.name}]`);
      });
      
      preview += content + "\n\n";
    });
    
    return preview;
  };

  const handleExportDocument = async (format: "pdf" | "docx") => {
    const content = generatePreview();
    const variablesObj = Object.fromEntries(
      variables.map(v => [v.name, v.value])
    );

    toast({
      title: "Exportando Documento",
      description: `Tu documento se está exportando en formato ${format.toUpperCase()}.`,
    });

    try {
      const result = await documentExportService.exportDocument(
        content,
        format,
        variablesObj,
        documentTitle
      );

      if (result.success) {
        toast({
          title: "Documento Exportado",
          description: `Tu documento se ha exportado exitosamente en formato ${format.toUpperCase()}.`,
        });
        
        // Simulate download
        if (result.document?.downloadUrl) {
          const link = document.createElement('a');
          link.href = result.document.downloadUrl;
          link.download = `${documentTitle.replace(/\s+/g, '_')}.${format}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo exportar el documento.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al exportar el documento.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="h-full flex flex-col border-l rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Constructor de Documentos</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleExportDocument("pdf")}>
              <FileDown className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExportDocument("docx")}>
              <Download className="h-4 w-4 mr-2" />
              DOCX
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 m-3">
            <TabsTrigger value="outline" className="text-xs">
              <FileText className="h-4 w-4 mr-2" />
              Esquema
            </TabsTrigger>
            <TabsTrigger value="variables" className="text-xs">
              <Edit className="h-4 w-4 mr-2" />
              Variables
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-xs">
              <Eye className="h-4 w-4 mr-2" />
              Vista Previa
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="outline" className="flex-1 p-3">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="doc-title">Título del Documento</Label>
                  <Input
                    id="doc-title"
                    value={documentTitle}
                    onChange={(e) => setDocumentTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Secciones</h4>
                    <Button size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar
                    </Button>
                  </div>
                  
                  {sections.map((section) => (
                    <Card key={section.id} className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{section.title}</h5>
                        <div className="flex items-center space-x-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {section.content}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {section.variables.map((variable) => (
                          <Badge key={variable.name} variant="outline" className="text-xs">
                            {variable.name}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="variables" className="flex-1 p-3">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Variables del Documento</h4>
                  <Button size="sm" onClick={addVariable}>
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Variable
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {variables.map((variable) => (
                    <Card key={variable.name} className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium">{variable.name}</Label>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeVariable(variable.name)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <Input
                        value={variable.value}
                        onChange={(e) => updateVariable(variable.name, e.target.value)}
                        placeholder={`Valor para ${variable.name}`}
                        className="text-sm"
                      />
                      <Badge variant="outline" className="text-xs mt-2">
                        {variable.type}
                      </Badge>
                    </Card>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="preview" className="flex-1 p-3">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Vista Previa del Documento</h4>
                  <Button size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </Button>
                </div>
                
                <Card className="p-4">
                  <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                    {generatePreview()}
                  </pre>
                </Card>
                
                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-sm font-medium">Información del Documento</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Secciones:</span>
                      <span className="ml-2 font-medium">{sections.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Variables:</span>
                      <span className="ml-2 font-medium">{variables.length}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Completado:</span>
                      <span className="ml-2 font-medium">
                        {Math.round((variables.filter(v => v.value).length / variables.length) * 100)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Último guardado:</span>
                      <span className="ml-2 font-medium">Ahora</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}