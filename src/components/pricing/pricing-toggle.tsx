"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PricingToggleProps {
  onToggle: (isYearly: boolean) => void;
}

export function PricingToggle({ onToggle }: PricingToggleProps) {
  const [isYearly, setIsYearly] = useState(false);

  const handleToggle = (yearly: boolean) => {
    setIsYearly(yearly);
    onToggle(yearly);
  };

  return (
    <Card className="inline-flex p-1 bg-muted">
      <CardContent className="p-0">
        <div className="flex items-center space-x-1">
          <Button
            variant={isYearly ? "ghost" : "default"}
            size="sm"
            onClick={() => handleToggle(false)}
            className="text-sm"
          >
            Mensual
          </Button>
          <Button
            variant={isYearly ? "default" : "ghost"}
            size="sm"
            onClick={() => handleToggle(true)}
            className="text-sm"
          >
            Anual
            <span className="ml-1 text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">
              Ahorra 20%
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}