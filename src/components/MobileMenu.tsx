import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-6">
          <a 
            href="#templates" 
            className="text-foreground/80 hover:text-foreground transition-smooth py-3 border-b border-border/40"
            onClick={() => setIsOpen(false)}
          >
            Templates
          </a>
          <a 
            href="#features" 
            className="text-foreground/80 hover:text-foreground transition-smooth py-3 border-b border-border/40"
            onClick={() => setIsOpen(false)}
          >
            Recursos
          </a>
          <a 
            href="#pricing" 
            className="text-foreground/80 hover:text-foreground transition-smooth py-3 border-b border-border/40"
            onClick={() => setIsOpen(false)}
          >
            Preços
          </a>
          <div className="pt-4 space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <a href="/dashboard">Entrar</a>
            </Button>
            <Button variant="default" className="w-full gradient-primary">
              <a href="/dashboard">Dashboard</a>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;