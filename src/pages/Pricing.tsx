import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Crown, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Ideal para começar",
      icon: <Star className="h-6 w-6" />,
      features: [
        "3 posts por mês",
        "Templates básicos",
        "Recursos essenciais",
        "Suporte por email"
      ],
      limitations: [
        "Templates limitados",
        "Sem análises detalhadas",
        "Marca d'água nos posts"
      ],
      popular: false,
      ctaText: "Começar Grátis"
    },
    {
      name: "Básico",
      price: "R$ 30",
      period: "/mês",
      description: "Para criadores ativos",
      icon: <Zap className="h-6 w-6" />,
      features: [
        "20 posts por mês",
        "Todos os templates",
        "Exportação para todas as redes",
        "Agendamento de posts",
        "Suporte prioritário"
      ],
      limitations: [],
      popular: true,
      ctaText: "Começar Teste Grátis"
    },
    {
      name: "Profissional",
      price: "R$ 80",
      period: "/mês",
      description: "Para profissionais e agências",
      icon: <Crown className="h-6 w-6" />,
      features: [
        "Posts ilimitados",
        "Templates exclusivos",
        "Análises detalhadas de desempenho",
        "Branding personalizado",
        "API de integração",
        "Suporte dedicado"
      ],
      limitations: [],
      popular: false,
      ctaText: "Começar Teste Grátis"
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Escolha o Plano Ideal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crie conteúdo profissional para suas redes sociais com nossos planos flexíveis
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  Mais Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    {plan.icon}
                  </div>
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Recursos inclusos:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-muted-foreground mb-3">Limitações:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <li key={limitationIndex} className="flex items-center text-sm text-muted-foreground">
                          <span className="h-4 w-4 mr-2 flex-shrink-0">•</span>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.ctaText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Teste qualquer plano por 7 dias grátis. Cancele quando quiser.
          </p>
          <p className="text-sm text-muted-foreground">
            Todos os planos incluem suporte técnico e atualizações gratuitas
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;