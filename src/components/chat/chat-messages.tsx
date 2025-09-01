"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Copy, CheckCircle, BookOpen, Download } from "lucide-react";
import { useIntl } from "react-intl";

interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  citations?: string[];
  documentVariables?: { name: string; value: string }[];
}

interface ChatMessagesProps {
  messages: ChatMessage[];
  onAddToDocument: (messageId: string) => void;
  onShowCitations: (messageId: string) => void;
  isLoading?: boolean;
}

export function ChatMessages({
  messages,
  onAddToDocument,
  onShowCitations,
  isLoading = false
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const intl = useIntl();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('es-BO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const copyToClipboard = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(messageId);
      setTimeout(() => setCopiedMessageId(null), 2000);
    } catch (error) {
      console.error('Failed to copy text: ', error);
    }
  };

  const renderMessageContent = (message: ChatMessage) => {
    if (message.role === "assistant") {
      return (
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none">
            {message.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Document Variables */}
          {message.documentVariables && message.documentVariables.length > 0 && (
            <div className="bg-muted/30 rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Variables del Documento
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {message.documentVariables.map((variable, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="font-medium">{variable.name}:</span>
                    <span className="text-muted-foreground">{variable.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddToDocument(message.id)}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" />
              Agregar al Documento
            </Button>
            {message.citations && message.citations.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onShowCitations(message.id)}
                className="text-xs"
              >
                <BookOpen className="h-3 w-3 mr-1" />
                Ver Citaciones ({message.citations.length})
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(message.content, message.id)}
              className="text-xs"
            >
              {copiedMessageId === message.id ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <Copy className="h-3 w-3 mr-1" />
              )}
              {copiedMessageId === message.id ? "Copiado" : "Copiar"}
            </Button>
          </div>
        </div>
      );
    }
    
    return (
      <div className="prose prose-sm max-w-none">
        {message.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-3 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col rounded-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
        {intl.formatMessage({ id: "chat.conversationBox.conversation" })}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full" ref={scrollRef}>
          <div className="space-y-4 p-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Bot className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">
        {intl.formatMessage({ id: "chat.conversationBox.startaConversation" })}

                </h3>
                <p>
                {intl.formatMessage({ id: "chat.conversationBox.sendAMessageToStart" })}
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <Avatar className={`h-8 w-8 flex-shrink-0 ${
                    message.role === "user" ? "bg-primary" : "bg-muted"
                  }`}>
                    <AvatarFallback className="text-xs">
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`max-w-[70%] ${
                    message.role === "user" ? "text-right" : ""
                  }`}>
                    <div className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}>
                      {renderMessageContent(message)}
                    </div>
                    
                    <div className={`flex items-center space-x-2 mt-1 text-xs text-muted-foreground ${
                      message.role === "user" ? "justify-end" : ""
                    }`}>
                      <span>{formatTimestamp(message.timestamp)}</span>
                      {message.role === "assistant" && (
                        <Badge variant="outline" className="text-xs">
                          IA
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8 flex-shrink-0 bg-muted">
                  <AvatarFallback className="text-xs">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-sm text-muted-foreground">Escribiendo...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}