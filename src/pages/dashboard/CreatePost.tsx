import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Wand2, 
  Download, 
  Share2, 
  Calendar, 
  Eye,
  Settings,
  Smartphone,
  Monitor
} from "lucide-react";
import TemplateCustomizer from "@/components/TemplateCustomizer";
import DragDropEditor from "@/components/DragDropEditor";
import { useTemplate } from "@/contexts/TemplateContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

const CreatePost = () => {
  const { selectedTemplate } = useTemplate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("customize");
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  if (!selectedTemplate) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center space-y-4">
          <Wand2 className="h-16 w-16 text-muted-foreground mx-auto" />
          <h2 className="text-2xl font-bold">Nenhum template selecionado</h2>
          <p className="text-muted-foreground max-w-md">
            Escolha um template na página inicial para começar a personalizar seu post.
          </p>
          <Button variant="default" className="gradient-primary">
            <a href="/">Escolher Template</a>
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = (settings: any) => {
    console.log('Settings saved:', settings);
    toast.success("Personalização salva!");
  };

  const handleExport = () => {
    toast.success("Post exportado com sucesso!");
  };

  const handleSchedule = () => {
    toast.success("Post agendado!");
  };

  return (
    <div className={`space-y-6 ${isMobile ? 'pb-20' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Criar Post</h1>
          <p className="text-muted-foreground">
            Personalize seu template selecionado
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{selectedTemplate.platform}</Badge>
          <Badge variant="secondary">{selectedTemplate.type}</Badge>
        </div>
      </div>

      {/* Template Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <img
              src={selectedTemplate.image}
              alt={selectedTemplate.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{selectedTemplate.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
            </div>
            {!isMobile && (
              <div className="flex items-center gap-2">
                <Button
                  variant={previewMode === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('desktop')}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('mobile')}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Editor Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
          <TabsTrigger value="customize" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            {!isMobile && "Personalizar"}
          </TabsTrigger>
          <TabsTrigger value="drag-drop" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {!isMobile && "Arrastar & Soltar"}
          </TabsTrigger>
          {!isMobile && (
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="customize" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalização Avançada</CardTitle>
              <CardDescription>
                Ajuste cores, fontes, logotipos e outros elementos visuais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TemplateCustomizer 
                templateData={selectedTemplate} 
                onSave={handleSave}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drag-drop" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Editor Drag & Drop</CardTitle>
              <CardDescription>
                Arraste e solte elementos para personalizar seu template de forma intuitiva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DragDropEditor 
                templateData={selectedTemplate} 
                onSave={handleSave}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {!isMobile && (
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview do Post
                </CardTitle>
                <CardDescription>
                  Visualize como seu post ficará na plataforma selecionada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`mx-auto bg-muted/30 rounded-lg p-8 ${
                  previewMode === 'mobile' ? 'max-w-sm' : 'max-w-2xl'
                }`}>
                  <div className="aspect-square bg-gradient-to-br from-background to-muted rounded-lg overflow-hidden shadow-card">
                    <img
                      src={selectedTemplate.image}
                      alt="Post Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      {/* Action Buttons */}
      <div className={`${isMobile ? 'fixed bottom-4 left-4 right-4 z-50' : 'flex justify-end gap-4'}`}>
        {isMobile ? (
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleSchedule}>
              <Calendar className="h-4 w-4" />
            </Button>
            <Button className="gradient-primary">
              <Share2 className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </div>
        ) : (
          <>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" onClick={handleSchedule}>
              <Calendar className="h-4 w-4 mr-2" />
              Agendar
            </Button>
            <Button className="gradient-primary">
              <Share2 className="h-4 w-4 mr-2" />
              Publicar Post
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreatePost;