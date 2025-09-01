import { gpts } from "@/data/gpts";
import { aiService } from "@/lib/stubs";

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: string;
  citations?: string[];
  documentVariables?: { name: string; value: string }[];
}

export interface ChatSession {
  id: string;
  title: string;
  gptId: string;
  gptName: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export class ChatManager {
  private static instance: ChatManager;
  private sessions: ChatSession[] = [];
  private activeSessionId: string | null = null;

  private constructor() {
    this.loadFromStorage();
  }

  static getInstance(): ChatManager {
    if (!ChatManager.instance) {
      ChatManager.instance = new ChatManager();
    }
    return ChatManager.instance;
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('legalcorp_chat_sessions');
      if (saved) {
        try {
          this.sessions = JSON.parse(saved);
        } catch (error) {
          console.error('Error loading chat sessions:', error);
          this.sessions = [];
        }
      }
    }
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('legalcorp_chat_sessions', JSON.stringify(this.sessions));
    }
  }

  createSession(gptId: string): ChatSession {
    const gpt = gpts.find(g => g.id === gptId);
    if (!gpt) {
      throw new Error('GPT not found');
    }

    const session: ChatSession = {
      id: Math.random().toString(36).substr(2, 9),
      title: `Nueva conversación - ${gpt.name}`,
      gptId,
      gptName: gpt.name,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.sessions.push(session);
    this.activeSessionId = session.id;
    this.saveToStorage();

    return session;
  }

  getSession(sessionId: string): ChatSession | undefined {
    return this.sessions.find(s => s.id === sessionId);
  }

  getSessions(): ChatSession[] {
    return this.sessions.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  deleteSession(sessionId: string): void {
    this.sessions = this.sessions.filter(s => s.id !== sessionId);
    if (this.activeSessionId === sessionId) {
      this.activeSessionId = this.sessions.length > 0 ? this.sessions[0].id : null;
    }
    this.saveToStorage();
  }

  async sendMessage(sessionId: string, content: string, tone: string = "formal"): Promise<ChatMessage> {
    const session = this.getSession(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      role: "user",
      timestamp: new Date().toISOString()
    };

    session.messages.push(userMessage);

    // Generate AI response using the enhanced AI service
    const aiResponse = await aiService.generateLegalResponse(
      content, 
      session.gptId, 
      tone as 'formal' | 'plain' | 'bilingual'
    );
    
    const aiMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      content: aiResponse.content,
      role: "assistant",
      timestamp: new Date().toISOString(),
      citations: aiResponse.citations,
      documentVariables: Object.entries(aiResponse.variables || {}).map(([name, value]) => ({
        name,
        value: String(value)
      }))
    };

    session.messages.push(aiMessage);
    session.updatedAt = new Date().toISOString();
    
    // Update session title based on first message
    if (session.messages.length === 2) {
      session.title = content.length > 50 ? content.substring(0, 50) + "..." : content;
    }

    this.saveToStorage();
    return aiMessage;
  }

  getActiveSession(): ChatSession | null {
    if (!this.activeSessionId) return null;
    const session = this.getSession(this.activeSessionId);
    return session || null;
  }

  setActiveSession(sessionId: string): void {
    this.activeSessionId = sessionId;
  }
}

export const chatManager = ChatManager.getInstance();