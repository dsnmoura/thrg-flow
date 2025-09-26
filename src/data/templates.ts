import { Template } from '@/contexts/TemplateContext';

export const templates: Template[] = [
  // Instagram Templates
  {
    id: "1",
    title: "Post Motivacional",
    category: "Inspiração",
    platform: "Instagram",
    type: "post",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop",
    premium: false,
    likes: 245,
    description: "Template perfeito para compartilhar frases motivacionais e inspiradoras",
    contentStructure: {
      elements: [
        { type: 'text', placeholder: 'Sua frase motivacional aqui...' },
        { type: 'image', placeholder: 'Imagem de fundo inspiradora' }
      ]
    }
  },
  {
    id: "2",
    title: "Carrossel de Produto",
    category: "Marketing",
    platform: "Instagram",
    type: "carousel",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    premium: true,
    likes: 189,
    description: "Carrossel interativo para mostrar produtos de múltiplos ângulos",
    contentStructure: {
      elements: [
        { type: 'image', placeholder: 'Imagem principal do produto' },
        { type: 'image', placeholder: 'Imagem secundária' },
        { type: 'image', placeholder: 'Imagem de detalhes' },
        { type: 'text', placeholder: 'Descrição do produto' }
      ]
    }
  },
  {
    id: "3",
    title: "Stories Promocional",
    category: "Promoção",
    platform: "Instagram",
    type: "story",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=400&fit=crop",
    premium: true,
    likes: 324,
    description: "Template vertical otimizado para stories com call-to-action",
    contentStructure: {
      elements: [
        { type: 'image', placeholder: 'Imagem de fundo' },
        { type: 'text', placeholder: 'Título da promoção' },
        { type: 'text', placeholder: 'Detalhes da oferta' }
      ]
    }
  },

  // LinkedIn Templates  
  {
    id: "4",
    title: "Anúncio Corporativo",
    category: "Empresa",
    platform: "LinkedIn",
    type: "post",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
    premium: false,
    likes: 156,
    description: "Template profissional para comunicados empresariais",
    contentStructure: {
      elements: [
        { type: 'text', placeholder: 'Título do anúncio' },
        { type: 'text', placeholder: 'Conteúdo principal' },
        { type: 'image', placeholder: 'Logo ou imagem corporativa' }
      ]
    }
  },
  {
    id: "5",
    title: "Artigo Profissional",
    category: "Educativo",
    platform: "LinkedIn",
    type: "article",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop",
    premium: true,
    likes: 432,
    description: "Template para artigos longos com estrutura profissional",
    contentStructure: {
      elements: [
        { type: 'text', placeholder: 'Título do artigo' },
        { type: 'text', placeholder: 'Introdução' },
        { type: 'text', placeholder: 'Desenvolvimento' },
        { type: 'text', placeholder: 'Conclusão' },
        { type: 'image', placeholder: 'Imagem ilustrativa' }
      ]
    }
  },

  // TikTok Templates
  {
    id: "6",
    title: "Vídeo Curto Viral",
    category: "Entretenimento",
    platform: "TikTok",
    type: "video",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
    premium: false,
    likes: 1250,
    description: "Template para vídeos curtos e envolventes no TikTok",
    contentStructure: {
      elements: [
        { type: 'video', placeholder: 'Vídeo principal (9:16)' },
        { type: 'text', placeholder: 'Texto sobreposto' },
        { type: 'text', placeholder: 'Hashtags relevantes' }
      ]
    }
  },
  {
    id: "7",
    title: "Tutorial Rápido",
    category: "Educativo",
    platform: "TikTok",
    type: "video",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    premium: true,
    likes: 867,
    description: "Template para tutoriais step-by-step no formato TikTok",
    contentStructure: {
      elements: [
        { type: 'video', placeholder: 'Vídeo tutorial' },
        { type: 'text', placeholder: 'Passo 1' },
        { type: 'text', placeholder: 'Passo 2' },
        { type: 'text', placeholder: 'Passo 3' }
      ]
    }
  },

  // Facebook Templates
  {
    id: "8",
    title: "Post Promocional",
    category: "Marketing",
    platform: "Facebook",
    type: "post",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    premium: false,
    likes: 298,
    description: "Template otimizado para promoções no Facebook",
    contentStructure: {
      elements: [
        { type: 'image', placeholder: 'Imagem promocional' },
        { type: 'text', placeholder: 'Texto da promoção' },
        { type: 'text', placeholder: 'Call-to-action' }
      ]
    }
  },
  {
    id: "9",
    title: "Evento Facebook",
    category: "Eventos",
    platform: "Facebook",
    type: "post",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=400&fit=crop",
    premium: false,
    likes: 198,
    description: "Template para divulgar eventos no Facebook",
    contentStructure: {
      elements: [
        { type: 'image', placeholder: 'Imagem do evento' },
        { type: 'text', placeholder: 'Nome do evento' },
        { type: 'text', placeholder: 'Data e local' },
        { type: 'text', placeholder: 'Descrição' }
      ]
    }
  },

  // Twitter Templates
  {
    id: "10",
    title: "Thread Educativo",
    category: "Educativo",
    platform: "Twitter",
    type: "post",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop",
    premium: true,
    likes: 543,
    description: "Template para threads educativas no Twitter",
    contentStructure: {
      elements: [
        { type: 'text', placeholder: 'Tweet inicial (gancho)' },
        { type: 'text', placeholder: 'Tweet 2' },
        { type: 'text', placeholder: 'Tweet 3' },
        { type: 'text', placeholder: 'Tweet final (CTA)' }
      ]
    }
  },
  {
    id: "11",
    title: "Notícia Rápida",
    category: "Notícias",
    platform: "Twitter",
    type: "post",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=400&fit=crop",
    premium: false,
    likes: 376,
    description: "Template para compartilhar notícias de forma concisa",
    contentStructure: {
      elements: [
        { type: 'text', placeholder: 'Título da notícia' },
        { type: 'text', placeholder: 'Resumo em 280 caracteres' },
        { type: 'text', placeholder: 'Link para fonte' }
      ]
    }
  },

  // YouTube Templates
  {
    id: "12",
    title: "Thumbnail Chamativo",
    category: "YouTube",
    platform: "YouTube",
    type: "post",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
    premium: true,
    likes: 721,
    description: "Template para thumbnails que atraem cliques",
    contentStructure: {
      elements: [
        { type: 'image', placeholder: 'Imagem de fundo (16:9)' },
        { type: 'text', placeholder: 'Título grande e chamativo' },
        { type: 'image', placeholder: 'Foto do criador' }
      ]
    }
  }
];

export const categories = ["Todos", "Inspiração", "Marketing", "Empresa", "Educativo", "Entretenimento", "Promoção", "Eventos", "Notícias", "YouTube"];

export const platforms = ["Todos", "Instagram", "LinkedIn", "TikTok", "Facebook", "Twitter", "YouTube"];