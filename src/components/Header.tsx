import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PostCraft
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#templates" className="text-foreground/80 hover:text-foreground transition-smooth">
              Templates
            </a>
            <a href="#features" className="text-foreground/80 hover:text-foreground transition-smooth">
              Recursos
            </a>
            <Link to="/pricing" className="text-foreground/80 hover:text-foreground transition-smooth">
              Preços
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              <Link to="/dashboard">Entrar</Link>
            </Button>
            <Button variant="default" className="gradient-primary">
              <Link to="/dashboard">Dashboard</Link>
            </Button>
            
            {/* Mobile menu */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;