import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Palette, Eye, Heart, Download, Plus, Check } from "lucide-react";
import { templates } from "@/data/templates";
import { useTemplate } from "@/contexts/TemplateContext";
import { useToast } from "@/hooks/use-toast";

const Templates = () => {
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate } = useTemplate();
  const { toast } = useToast();

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    toast({
      title: "Template selecionado!",
      description: `${template.title} está pronto para personalização.`,
    });
  };

  const handleCustomize = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    navigate('/dashboard/create');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <p className="text-muted-foreground">
            Gerencie e personalize seus templates de posts
          </p>
        </div>
        <Button onClick={() => navigate('/choose-template')}>
          <Plus className="mr-2 h-4 w-4" />
          Escolher Template
        </Button>
      </div>

      {/* Selected Template Info */}
      {selectedTemplate && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-primary" />
              Template Selecionado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <img 
                src={selectedTemplate.image} 
                alt={selectedTemplate.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{selectedTemplate.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{selectedTemplate.platform}</Badge>
                  <Badge variant="secondary">{selectedTemplate.type}</Badge>
                </div>
              </div>
              <Button onClick={() => handleCustomize(selectedTemplate)} className="gradient-primary">
                Personalizar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.slice(0, 12).map((template) => {
          const isSelected = selectedTemplate?.id === template.id;
          
          return (
            <Card 
              key={template.id} 
              className={`group overflow-hidden hover:shadow-elegant transition-all cursor-pointer ${
                isSelected ? 'ring-2 ring-primary shadow-glow' : ''
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="bg-background/80 backdrop-blur"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: Add preview modal
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default"
                      className="gradient-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCustomize(template);
                      }}
                    >
                      <Palette className="w-4 h-4 mr-2" />
                      Personalizar
                    </Button>
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-full p-1">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                {template.premium && (
                  <Badge className="absolute top-3 right-3 gradient-accent text-white border-0">
                    PRO
                  </Badge>
                )}

                {/* Platform Badge */}
                <Badge variant="outline" className="absolute bottom-3 left-3 bg-background/80 backdrop-blur text-xs">
                  {template.platform}
                </Badge>
              </div>

              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg truncate">{template.title}</h3>
                    <Badge variant="secondary" className="text-xs shrink-0 ml-2">{template.type}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2">{template.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline">{template.category}</Badge>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{template.likes}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Add download functionality
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center pt-6">
        <Button variant="outline" onClick={() => navigate('/choose-template')}>
          Ver Todos os Templates
        </Button>
      </div>
    </div>
  );
};

export default Templates;