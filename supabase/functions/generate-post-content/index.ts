import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};


serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      objective, 
      network, 
      template, 
      theme, 
      generateImages = true,
      generateCaption = true,
      generateHashtags = true
    } = await req.json();

    const model = 'gpt-4o-mini'; // Modelo fixo

    console.log('Generating post content:', { objective, network, template, theme, model });

    if (!openRouterApiKey) {
      throw new Error('OpenRouter API key not configured');
    }

    let systemPrompt = `Você é um especialista em marketing digital e criação de conteúdo para redes sociais. Sua especialidade é criar posts engajantes e persuasivos.

Você deve gerar conteúdo baseado nos seguintes parâmetros:
- Objetivo: ${objective}
- Rede Social: ${network}
- Template: ${template}
- Tema: ${theme}

Responda SEMPRE em JSON válido com as seguintes chaves:`;

    const requestedContent = [];
    
    if (generateImages) {
      requestedContent.push(`"carousel_prompts": [array de 3-5 prompts detalhados em inglês para geração de imagens do carrossel, cada prompt deve ser específico e visual]`);
    }
    
    if (generateCaption) {
      requestedContent.push(`"caption": "texto da legenda em português, engajante e persuasivo, adequado para ${network}"`);
    }
    
    if (generateHashtags) {
      requestedContent.push(`"hashtags": [array de 8-15 hashtags relevantes e otimizadas para ${network}]`);
    }

    systemPrompt += `
{
  ${requestedContent.join(',\n  ')}
}

Diretrizes importantes:
- Carousel prompts devem ser em inglês, detalhados e visuais
- Caption deve ser em português, envolvente e incluir CTA
- Hashtags devem ser uma mistura de populares e nicho
- Adapte o tom para a rede social escolhida
- Use emojis apropriados na caption
- Para ${network}, considere as melhores práticas da plataforma`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://postcraft.app',
        'X-Title': 'PostCraft - AI Content Generator',
      },
      body: JSON.stringify({
        model: `openai/${model}`,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Crie o conteúdo para: ${theme}` }
        ],
        max_tokens: 4000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content;

    console.log('Generated text:', generatedText);

    // Parse the JSON response
    let generatedContent;
    try {
      generatedContent = JSON.parse(generatedText);
    } catch (e) {
      console.error('Failed to parse JSON:', generatedText);
      throw new Error('AI generated invalid JSON response');
    }

    // Generate images using another AI model if carousel_prompts exist
    let generatedImages = [];
    if (generateImages && generatedContent.carousel_prompts) {
      console.log('Generating images for carousel...');
      
      // Use gpt-image-1 for image generation through OpenRouter
      for (const prompt of generatedContent.carousel_prompts.slice(0, 5)) {
        try {
          const imageResponse = await fetch('https://openrouter.ai/api/v1/images/generations', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${openRouterApiKey}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': 'https://postcraft.app',
              'X-Title': 'PostCraft - AI Image Generator',
            },
            body: JSON.stringify({
              model: 'openai/gpt-image-1',
              prompt: prompt,
              n: 1,
              size: '1080x1080',
              quality: 'high',
            }),
          });

          if (imageResponse.ok) {
            const imageData = await imageResponse.json();
            if (imageData.data && imageData.data[0]) {
              generatedImages.push({
                prompt: prompt,
                url: imageData.data[0].url,
                b64_json: imageData.data[0].b64_json
              });
            }
          } else {
            console.error('Failed to generate image for prompt:', prompt);
          }
        } catch (error) {
          console.error('Error generating image:', error);
        }
      }
    }

    const result = {
      ...generatedContent,
      generated_images: generatedImages,
      model_used: model,
      timestamp: new Date().toISOString()
    };

    console.log('Final result:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-post-content function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});