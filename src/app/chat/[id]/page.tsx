"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatSidebar } from "@/components/chat/chat-sidebar";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { DocumentBuilder } from "@/components/chat/document-builder";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { chatManager, ChatMessage } from "@/lib/chat";
import { authManager } from "@/lib/auth";
import { gpts } from "@/data/gpts";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Download } from "lucide-react";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const gptId = params.id as string;

  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState(chatManager.getSessions());
  const [activeSession, setActiveSession] = useState(
    chatManager.getActiveSession()
  );
  const [showCitations, setShowCitations] = useState<{
    messageId: string;
    citations: string[];
  } | null>(null);

  const gpt = gpts.find((g) => g.id === gptId);
  const { isAuthenticated, user } = authManager.getState();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Check if user can access this GPT
    if (user?.plan === "free" && gpt?.isPro) {
      toast({
        title: "Acceso Restringido",
        description:
          "Este GPT está disponible solo para planes Pro y Firm. Actualiza tu plan para acceder.",
        variant: "destructive",
      });
      router.push("/catalog");
      return;
    }

    // Create or load session
    if (!activeSession || activeSession.gptId !== gptId) {
      const session = chatManager.createSession(gptId);
      setActiveSession(session);
      setSessions(chatManager.getSessions());
    }
  }, [gptId, isAuthenticated, user, router, toast, activeSession]);

  const handleSendMessage = async (message: string, tone: string) => {
    if (!activeSession) return;

    setIsLoading(true);
    try {
      await chatManager.sendMessage(activeSession.id, message, tone);
      setActiveSession(chatManager.getActiveSession());
      setSessions(chatManager.getSessions());
    } catch (error) {
      toast({
        title: "Error",
        description:
          "No se pudo enviar el mensaje. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSessionSelect = (sessionId: string) => {
    chatManager.setActiveSession(sessionId);
    setActiveSession(chatManager.getActiveSession());
    setSessions(chatManager.getSessions());
  };

  const handleNewSession = () => {
    const session = chatManager.createSession(gptId);
    setActiveSession(session);
    setSessions(chatManager.getSessions());
  };

  const handleDeleteSession = (sessionId: string) => {
    chatManager.deleteSession(sessionId);
    setActiveSession(chatManager.getActiveSession());
    setSessions(chatManager.getSessions());
  };

  const handleAddToDocument = (messageId: string) => {
    const message = activeSession?.messages.find((m) => m.id === messageId);
    if (message) {
      toast({
        title: "Agregado al Documento",
        description:
          "El contenido se ha agregado al constructor de documentos.",
      });
    }
  };

  const handleShowCitations = (messageId: string) => {
    const message = activeSession?.messages.find((m) => m.id === messageId);
    if (message && message.citations) {
      setShowCitations({ messageId, citations: message.citations });
    }
  };

  const handleExportDocument = (format: "pdf" | "docx") => {
    toast({
      title: "Exportando Documento",
      description: `Tu documento se está exportando en formato ${format.toUpperCase()}.`,
    });

    // Simulate download
    setTimeout(() => {
      toast({
        title: "Documento Exportado",
        description: "El documento ha sido descargado exitosamente.",
      });
    }, 2000);
  };

  if (!isAuthenticated || !gpt) {
    return null;
  }

  return (
    <>
      <div className="flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Sidebar */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <ChatSidebar
              sessions={sessions.map((session) => ({
                id: session.id,
                title: session.title,
                gptName: session.gptName,
                lastMessage:
                  session.messages[session.messages.length - 1]?.content ||
                  "Nueva conversación",
                timestamp: session.updatedAt,
                unread: false,
              }))}
              activeSessionId={activeSession?.id}
              onSessionSelect={handleSessionSelect}
              onNewSession={handleNewSession}
              onDeleteSession={handleDeleteSession}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Main Chat Area */}
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full flex flex-col">
              <ChatMessages
                messages={activeSession?.messages || []}
                onAddToDocument={handleAddToDocument}
                onShowCitations={handleShowCitations}
                isLoading={isLoading}
              />

              <ChatInput
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                placeholder={`Escribe tu mensaje para ${gpt.name}...`}
              />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Document Builder */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <DocumentBuilder onExportDocument={handleExportDocument} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Citations Dialog */}
      <Dialog
        open={!!showCitations}
        onOpenChange={() => setShowCitations(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Citaciones Legales</span>
            </DialogTitle>
          </DialogHeader>

          {showCitations && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Las siguientes fuentes legales bolivianas sustentan esta
                respuesta:
              </p>

              <div className="space-y-2">
                {showCitations.citations.map((citation, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{citation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCitations(null)}
                >
                  Cerrar
                </Button>
                <Button>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Citaciones
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
