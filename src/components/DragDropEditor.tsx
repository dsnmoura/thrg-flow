import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  GripVertical, 
  Type, 
  Image as ImageIcon, 
  Palette, 
  Square, 
  Circle,
  Plus,
  Trash2,
  Eye
} from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface TemplateElement {
  id: string;
  type: 'text' | 'image' | 'shape' | 'logo';
  content: string;
  style: {
    color: string;
    fontSize: number;
    fontFamily: string;
    backgroundColor?: string;
    borderRadius?: number;
    padding?: number;
  };
  position: {
    x: number;
    y: number;
  };
}

interface DragDropEditorProps {
  templateData?: any;
  onSave: (elements: TemplateElement[]) => void;
}

function SortableItem({ element, onUpdate, onDelete }: { 
  element: TemplateElement, 
  onUpdate: (id: string, updates: Partial<TemplateElement>) => void,
  onDelete: (id: string) => void 
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type className="h-4 w-4" />;
      case 'image': return <ImageIcon className="h-4 w-4" />;
      case 'shape': return <Square className="h-4 w-4" />;
      case 'logo': return <Circle className="h-4 w-4" />;
      default: return <Square className="h-4 w-4" />;
    }
  };

  return (
    <Card ref={setNodeRef} style={style} className="mb-4 shadow-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-4 w-4" />
            </Button>
            {getElementIcon(element.type)}
            <Badge variant="outline" className="text-xs">
              {element.type}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(element.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {element.type === 'text' && (
          <div className="space-y-2">
            <Textarea
              value={element.content}
              onChange={(e) => onUpdate(element.id, { content: e.target.value })}
              placeholder="Digite o texto..."
              className="resize-none"
              rows={2}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="color"
                value={element.style.color}
                onChange={(e) => onUpdate(element.id, { 
                  style: { ...element.style, color: e.target.value } 
                })}
                className="w-full h-9"
              />
              <Input
                type="number"
                value={element.style.fontSize}
                onChange={(e) => onUpdate(element.id, { 
                  style: { ...element.style, fontSize: parseInt(e.target.value) } 
                })}
                placeholder="Tamanho"
                min="8"
                max="72"
              />
            </div>
          </div>
        )}

        {element.type === 'image' && (
          <div className="space-y-2">
            <Input
              value={element.content}
              onChange={(e) => onUpdate(element.id, { content: e.target.value })}
              placeholder="URL da imagem..."
            />
            {element.content && (
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted">
                <img 
                  src={element.content} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
          </div>
        )}

        {element.type === 'shape' && (
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="color"
              value={element.style.backgroundColor}
              onChange={(e) => onUpdate(element.id, { 
                style: { ...element.style, backgroundColor: e.target.value } 
              })}
              className="w-full h-9"
            />
            <Input
              type="number"
              value={element.style.borderRadius}
              onChange={(e) => onUpdate(element.id, { 
                style: { ...element.style, borderRadius: parseInt(e.target.value) } 
              })}
              placeholder="Borda"
              min="0"
              max="50"
            />
          </div>
        )}

        {/* Preview do elemento */}
        <div className="p-3 border rounded-lg bg-muted/30 min-h-[60px] flex items-center justify-center">
          {element.type === 'text' && (
            <p 
              style={{ 
                color: element.style.color,
                fontSize: `${Math.min(element.style.fontSize, 16)}px`,
                fontFamily: element.style.fontFamily
              }}
              className="text-center"
            >
              {element.content || 'Texto de exemplo'}
            </p>
          )}
          
          {element.type === 'image' && (
            <div className="w-full h-16 rounded overflow-hidden bg-muted">
              {element.content ? (
                <img 
                  src={element.content} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          )}
          
          {element.type === 'shape' && (
            <div 
              className="w-16 h-16"
              style={{ 
                backgroundColor: element.style.backgroundColor,
                borderRadius: `${element.style.borderRadius}px`
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const DragDropEditor: React.FC<DragDropEditorProps> = ({ templateData, onSave }) => {
  const isMobile = useIsMobile();
  const [elements, setElements] = useState<TemplateElement[]>([
    {
      id: '1',
      type: 'text',
      content: 'Título Principal',
      style: {
        color: '#1f2937',
        fontSize: 24,
        fontFamily: 'Inter',
      },
      position: { x: 50, y: 50 }
    },
    {
      id: '2',
      type: 'text',
      content: 'Subtítulo ou descrição',
      style: {
        color: '#6b7280',
        fontSize: 16,
        fontFamily: 'Inter',
      },
      position: { x: 50, y: 100 }
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const updateElement = (id: string, updates: Partial<TemplateElement>) => {
    setElements(prev => 
      prev.map(el => el.id === id ? { ...el, ...updates } : el)
    );
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    toast.success("Elemento removido!");
  };

  const addElement = (type: TemplateElement['type']) => {
    const newElement: TemplateElement = {
      id: `element-${Date.now()}`,
      type,
      content: type === 'text' ? 'Novo texto' : type === 'image' ? '' : 'Elemento',
      style: {
        color: '#1f2937',
        fontSize: 16,
        fontFamily: 'Inter',
        backgroundColor: type === 'shape' ? '#3b82f6' : undefined,
        borderRadius: type === 'shape' ? 8 : undefined,
      },
      position: { x: 50, y: 50 + (elements.length * 60) }
    };
    
    setElements(prev => [...prev, newElement]);
    toast.success(`${type === 'text' ? 'Texto' : type === 'image' ? 'Imagem' : 'Forma'} adicionado!`);
  };

  const handleSave = () => {
    onSave(elements);
    toast.success("Personalização salva com sucesso!");
  };

  return (
    <div className={`space-y-6 ${isMobile ? 'px-4' : ''}`}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Editor Drag & Drop
          </CardTitle>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addElement('text')}
              className="flex items-center gap-2"
            >
              <Type className="h-4 w-4" />
              Adicionar Texto
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addElement('image')}
              className="flex items-center gap-2"
            >
              <ImageIcon className="h-4 w-4" />
              Adicionar Imagem
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addElement('shape')}
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Adicionar Forma
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
        {/* Editor Panel */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Elementos do Template</h3>
            <Badge variant="outline">{elements.length} elementos</Badge>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={elements.map(el => el.id)} strategy={verticalListSortingStrategy}>
              {elements.map((element) => (
                <SortableItem
                  key={element.id}
                  element={element}
                  onUpdate={updateElement}
                  onDelete={deleteElement}
                />
              ))}
            </SortableContext>
          </DndContext>

          {elements.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center">
                  Nenhum elemento adicionado. Clique nos botões acima para começar.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview Panel */}
        {!isMobile && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Preview do Template</h3>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
            </div>

            <Card className="aspect-square bg-gradient-to-br from-background to-muted/50">
              <CardContent className="p-6 h-full relative overflow-hidden">
                {elements.map((element) => (
                  <div
                    key={element.id}
                    className="absolute"
                    style={{
                      left: `${element.position.x}px`,
                      top: `${element.position.y}px`,
                    }}
                  >
                    {element.type === 'text' && (
                      <p
                        style={{
                          color: element.style.color,
                          fontSize: `${Math.min(element.style.fontSize * 0.7, 24)}px`,
                          fontFamily: element.style.fontFamily
                        }}
                      >
                        {element.content}
                      </p>
                    )}
                    
                    {element.type === 'image' && element.content && (
                      <img
                        src={element.content}
                        alt="Element"
                        className="max-w-[120px] max-h-[120px] object-cover rounded"
                      />
                    )}
                    
                    {element.type === 'shape' && (
                      <div
                        className="w-16 h-16"
                        style={{
                          backgroundColor: element.style.backgroundColor,
                          borderRadius: `${element.style.borderRadius}px`
                        }}
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button onClick={handleSave} className="w-full gradient-primary">
              Salvar Personalização
            </Button>
          </div>
        )}
      </div>

      {/* Mobile Save Button */}
      {isMobile && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <Button onClick={handleSave} className="w-full gradient-primary shadow-elegant">
            Salvar Personalização
          </Button>
        </div>
      )}
    </div>
  );
};

export default DragDropEditor;