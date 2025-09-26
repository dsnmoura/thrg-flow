import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Crown, Zap, Star, Settings as SettingsIcon, CreditCard, User } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  // Mock data - in real app this would come from user's subscription
  const currentPlan = {
    name: "Gratuito",
    icon: <Star className="h-5 w-5" />,
    postsUsed: 2,
    postsLimit: 3,
    features: ["Templates básicos", "3 posts/mês"]
  };

  const usagePercentage = (currentPlan.postsUsed / currentPlan.postsLimit) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie sua conta e plano de assinatura
        </p>
      </div>
      
      {/* Current Plan Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                {currentPlan.icon}
              </div>
              <div>
                <CardTitle className="text-xl">Plano {currentPlan.name}</CardTitle>
                <CardDescription>Seu plano atual</CardDescription>
              </div>
            </div>
            <Badge variant="secondary">Ativo</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Posts utilizados este mês</span>
              <span>{currentPlan.postsUsed} de {currentPlan.postsLimit}</span>
            </div>
            <Progress value={usagePercentage} className="h-2" />
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {currentPlan.postsLimit - currentPlan.postsUsed} posts restantes
              </p>
            </div>
            <Link to="/pricing">
              <Button variant="outline" size="sm">
                <Crown className="h-4 w-4 mr-2" />
                Fazer Upgrade
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Configurações da Conta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Nome de exibição</label>
              <p className="text-muted-foreground text-sm">Usuário</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-muted-foreground text-sm">usuario@email.com</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <SettingsIcon className="h-4 w-4 mr-2" />
            Editar Perfil
          </Button>
        </CardContent>
      </Card>

      {/* Billing Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Faturamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Gerencie seus métodos de pagamento e histórico de faturas
          </p>
          <div className="flex gap-2">
            <Link to="/pricing">
              <Button variant="outline" size="sm">
                Ver Planos
              </Button>
            </Link>
            <Button variant="outline" size="sm" disabled>
              Histórico de Faturas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;