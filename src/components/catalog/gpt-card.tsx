"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useIntl } from "react-intl";

interface GPTCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  isPro?: boolean;
  isPopular?: boolean;
}

const categoryColors = {
  "Civil": "bg-blue-100 text-blue-800",
  "Penal": "bg-red-100 text-red-800",
  "Laboral": "bg-green-100 text-green-800",
  "Tributario": "bg-purple-100 text-purple-800",
  "Constitucional": "bg-orange-100 text-orange-800",
  "Comercial": "bg-indigo-100 text-indigo-800",
  "Familiar": "bg-pink-100 text-pink-800",
  "Administrativo": "bg-yellow-100 text-yellow-800",
};

export function GPTCard({
  id,
  name,
  description,
  category,
  tags,
  isPro = false,
  isPopular = false
}: GPTCardProps) {
  const intl = useIntl();
  return (
    <Card className="h-full border-border/50 hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg leading-tight">{name}</CardTitle>
              <Badge 
                variant="secondary" 
                className={`text-xs ${categoryColors[category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800'}`}
              >
                {category}
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-col space-y-1">
            {isPopular && (
              <Badge variant="default" className="text-xs">
                Popular
              </Badge>
            )}
            {isPro && (
              <Badge variant="outline" className="text-xs">
                Pro
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full">
        <CardDescription className="text-sm mb-4 flex-1">
          {description}
        </CardDescription>
        
        <div className="space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
          
          {/* CTA Button */}
          <Button 
            className="w-full group-hover:bg-primary/90 transition-colors"
            size="sm"
            asChild
          >
            <Link href={`/chat/${id}`}>
              <MessageSquare className="h-4 w-4 mr-2" />
              {intl.formatMessage({ id: "catalog.gptsSection.chatButton" })}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}