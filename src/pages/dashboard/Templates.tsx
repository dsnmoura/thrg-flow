import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Eye, 
  Heart, 
  Download, 
  Plus, 
  Check, 
  Search,
  Filter,
  Star,
  Sparkles,
  Calendar,
  TrendingUp,
  Grid3X3,
  List
} from "lucide-react";
import { 
  monthlyTemplates, 
  templateCategories, 
  getTemplatesByCategory,
  getNewTemplates,
  getSeasonalTemplates,
  getTrendingTemplates,
  getTemplateStats,
  MonthlyTemplate
} from "@/data/templates";
import { useTemplate } from "@/contexts/TemplateContext";
import { useToast } from "@/hooks/use-toast";

const Templates = () => {
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate } = useTemplate();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [selectedPlatform, setSelectedPlatform] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState("todos");

  const stats = getTemplateStats();

  const handleTemplateSelect = (template: MonthlyTemplate) => {
    setSelectedTemplate(template);
    toast({
      title: "Template selecionado!",
      description: `${template.title} está pronto para personalização.`,
    });
  };

  const handleCustomize = (template: MonthlyTemplate) => {
    setSelectedTemplate(template);
    navigate('/dashboard/create');
  };

  const getFilteredTemplates = () => {
    let templates: MonthlyTemplate[] = [];
    
    switch (activeTab) {
      case "novos":
        templates = getNewTemplates();
        break;
      case "sazonais":
        templates = getSeasonalTemplates();
        break;
      case "trending":
        templates = getTrendingTemplates();
        break;
      default:
        templates = selectedCategory === "todos" 
          ? monthlyTemplates 
          : getTemplatesByCategory(selectedCategory);
    }

    // Filtrar por pesquisa
    if (searchTerm) {
      templates = templates.filter(template =>
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por plataforma
    if (selectedPlatform !== "Todos") {
      templates = templates.filter(template => template.platform === selectedPlatform);
    }

    return templates;
  };

  const filteredTemplates = getFilteredTemplates();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Banco de Templates</h1>
          <p className="text-muted-foreground">
            {stats.total} templates organizados em {stats.categoriesWithTemplates} categorias
          </p>
        </div>
        <Button onClick={() => navigate('/choose-template')}>
          <Plus className="mr-2 h-4 w-4" />
          Explorar Todos
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Novos Templates</p>
                <p className="text-2xl font-bold text-primary">{stats.newCount}</p>
              </div>
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sazonais Ativos</p>
                <p className="text-2xl font-bold text-orange-500">{stats.seasonalCount}</p>
              </div>
              <Calendar className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Alta</p>
                <p className="text-2xl font-bold text-green-500">{stats.trendingCount}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Grid3X3 className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
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
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{selectedTemplate.title}</h3>
                  {selectedTemplate.isNew && (
                    <Badge variant="secondary" className="text-xs">NOVO</Badge>
                  )}
                  {selectedTemplate.trending && (
                    <Badge variant="destructive" className="text-xs">🔥 TRENDING</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">{selectedTemplate.platform}</Badge>
                  <Badge variant="secondary">{selectedTemplate.type}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {templateCategories.find(cat => cat.id === selectedTemplate.category)?.name}
                  </Badge>
                </div>
              </div>
              <Button onClick={() => handleCustomize(selectedTemplate as any)} className="gradient-primary">
                Personalizar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Plataforma" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todas as Plataformas</SelectItem>
            <SelectItem value="Instagram">Instagram</SelectItem>
            <SelectItem value="LinkedIn">LinkedIn</SelectItem>
            <SelectItem value="TikTok">TikTok</SelectItem>
            <SelectItem value="Facebook">Facebook</SelectItem>
            <SelectItem value="Twitter">Twitter</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 lg:flex lg:w-auto">
          <TabsTrigger value="todos" className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4" />
            Todos
          </TabsTrigger>
          <TabsTrigger value="novos" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Novos
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Em Alta
          </TabsTrigger>
          <TabsTrigger value="sazonais" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Sazonais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="mt-6">
          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${selectedCategory === 'todos' ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedCategory('todos')}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">📋</div>
                <h3 className="font-medium text-sm">Todos</h3>
                <p className="text-xs text-muted-foreground">{monthlyTemplates.length} templates</p>
              </CardContent>
            </Card>
            
            {templateCategories.map((category) => {
              const templateCount = getTemplatesByCategory(category.id).length;
              return (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedCategory === category.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <h3 className="font-medium text-sm">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{templateCount} templates</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="novos" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Novos Templates</h2>
            <p className="text-muted-foreground">Adicionados nos últimos 30 dias</p>
          </div>
        </TabsContent>

        <TabsContent value="trending" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Templates em Alta</h2>
            <p className="text-muted-foreground">Mais populares da comunidade</p>
          </div>
        </TabsContent>

        <TabsContent value="sazonais" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Templates Sazonais</h2>
            <p className="text-muted-foreground">Perfeitos para a época atual</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Templates Grid/List */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
      }>
        {filteredTemplates.map((template) => {
          const isSelected = selectedTemplate?.id === template.id;
          const category = templateCategories.find(cat => cat.id === template.category);
          
          if (viewMode === "list") {
            return (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  isSelected ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={template.image}
                        alt={template.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      {isSelected && (
                        <div className="absolute top-1 left-1 bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{template.title}</h3>
                  {template.isNew && (
                    <Badge variant="secondary" className="text-xs">NOVO</Badge>
                  )}
                  {template.trending && (
                          <Badge variant="destructive" className="text-xs">🔥</Badge>
                        )}
                        {template.premium && (
                          <Badge className="gradient-accent text-white border-0 text-xs">PRO</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{template.platform}</Badge>
                        <Badge variant="secondary" className="text-xs">{template.type}</Badge>
                        <Badge variant="outline" className="text-xs">{category?.name}</Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Heart className="w-3 h-3" />
                          <span>{template.likes}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCustomize(template);
                      }}
                    >
                      <Palette className="w-4 h-4 mr-2" />
                      Personalizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          }
          
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
                      Usar
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {isSelected && (
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                  {template.isNew && (
                    <Badge variant="secondary" className="text-xs">NOVO</Badge>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex flex-col gap-1">
                  {template.trending && (
                    <Badge variant="destructive" className="text-xs">🔥 ALTA</Badge>
                  )}
                  {template.premium && (
                    <Badge className="gradient-accent text-white border-0 text-xs">PRO</Badge>
                  )}
                </div>

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
                    <Badge variant="outline" className="text-xs">{category?.name}</Badge>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{template.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum template encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou termos de busca
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("todos");
                setSelectedPlatform("Todos");
                setActiveTab("todos");
              }}
            >
              Limpar Filtros
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Load More Button */}
      {filteredTemplates.length > 0 && (
        <div className="flex justify-center pt-6">
          <Button variant="outline" onClick={() => navigate('/choose-template')}>
            Explorar Mais Templates
          </Button>
        </div>
      )}
    </div>
  );
};

export default Templates;