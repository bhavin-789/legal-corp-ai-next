"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, FileText, Sparkles, Zap } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string, tone: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const toneOptions = [
  { value: "formal", label: "Formal", description: "Lenguaje jurídico técnico" },
  { value: "plain", label: "Sencillo", description: "Lenguaje claro y accesible" },
  { value: "bilingual", label: "Bilingüe", description: "Español e inglés" },
];

export function ChatInput({
  onSendMessage,
  isLoading = false,
  placeholder = "Escribe tu mensaje..."
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("formal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim(), tone);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const selectedTone = toneOptions.find(option => option.value === tone);

  return (
    <Card className="border-t rounded-none">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tone Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Tono del mensaje:</span>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Seleccionar tono" />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="outline" className="text-xs">
                {selectedTone?.label}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isLoading}
              >
                <FileText className="h-4 w-4 mr-2" />
                Documento
              </Button>
            </div>
          </div>
          
          {/* Message Input */}
          <div className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="min-h-[100px] resize-none pr-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="sm"
              className="absolute bottom-3 right-3"
              disabled={!message.trim() || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-1">
                  <div className="h-2 w-2 bg-current rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="h-2 w-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <span>Presiona Enter para enviar, Shift+Enter para nueva línea</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                <Sparkles className="h-3 w-3 mr-1" />
                IA Activa
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Respuesta Rápida
              </Badge>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}