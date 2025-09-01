// Stub implementations for various functionalities
// These are mock implementations that simulate real backend services

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_transfer';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  amount: number;
  currency: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled';
  plan: string;
  pdfUrl?: string;
}

export interface DocumentExport {
  id: string;
  title: string;
  format: 'pdf' | 'docx';
  content: string;
  variables: Record<string, string>;
  createdAt: string;
  downloadUrl?: string;
}

// Payment Stub
export class PaymentService {
  private static instance: PaymentService;

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  async processPayment(amount: number, paymentMethodId: string): Promise<{ success: boolean; transactionId?: string; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate random success/failure
    if (Math.random() > 0.1) { // 90% success rate
      return {
        success: true,
        transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`
      };
    } else {
      return {
        success: false,
        error: "El pago fue rechazado. Por favor, verifica tu información de pago."
      };
    }
  }

  async createPaymentMethod(cardData: {
    number: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
    name: string;
  }): Promise<{ success: boolean; paymentMethod?: PaymentMethod; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Validate card number (simple validation)
    if (cardData.number.replace(/\s/g, '').length < 13) {
      return {
        success: false,
        error: "Número de tarjeta inválido"
      };
    }

    // Check expiry date
    const now = new Date();
    const expiry = new Date(cardData.expiryYear, cardData.expiryMonth - 1);
    if (expiry < now) {
      return {
        success: false,
        error: "La tarjeta ha expirado"
      };
    }

    const paymentMethod: PaymentMethod = {
      id: `pm_${Math.random().toString(36).substr(2, 9)}`,
      type: 'card',
      last4: cardData.number.slice(-4),
      brand: this.getCardBrand(cardData.number),
      expiryMonth: cardData.expiryMonth,
      expiryYear: cardData.expiryYear
    };

    return {
      success: true,
      paymentMethod
    };
  }

  async getPaymentMethods(): Promise<PaymentMethod[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
      {
        id: "pm_123456",
        type: 'card',
        last4: "4242",
        brand: "visa",
        expiryMonth: 12,
        expiryYear: 2025
      }
    ];
  }

  async cancelSubscription(subscriptionId: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true
    };
  }

  private getCardBrand(cardNumber: string): string {
    const number = cardNumber.replace(/\s/g, '');
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'unknown';
  }
}

// Document Export Stub
export class DocumentExportService {
  private static instance: DocumentExportService;

  static getInstance(): DocumentExportService {
    if (!DocumentExportService.instance) {
      DocumentExportService.instance = new DocumentExportService();
    }
    return DocumentExportService.instance;
  }

  async exportDocument(
    content: string,
    format: 'pdf' | 'docx',
    variables: Record<string, string> = {},
    title: string = 'Documento Legal'
  ): Promise<{ success: boolean; document?: DocumentExport; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Replace variables in content
    let processedContent = content;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedContent = processedContent.replace(regex, value);
    });

    const document: DocumentExport = {
      id: `doc_${Math.random().toString(36).substr(2, 9)}`,
      title,
      format,
      content: processedContent,
      variables,
      createdAt: new Date().toISOString(),
      downloadUrl: this.generateDownloadUrl(format)
    };

    return {
      success: true,
      document
    };
  }

  async getExportHistory(): Promise<DocumentExport[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    return [
      {
        id: "doc_123",
        title: "Contrato de Arrendamiento",
        format: "pdf",
        content: "Contrato de arrendamiento entre {{arrendador}} y {{arrendatario}}...",
        variables: {
          arrendador: "Juan Pérez",
          arrendatario: "María García"
        },
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        downloadUrl: this.generateDownloadUrl('pdf')
      },
      {
        id: "doc_124",
        title: "Poder General",
        format: "docx",
        content: "Poder general y suficiente que confiere {{poderdante}} a {{apoderado}}...",
        variables: {
          poderdante: "Carlos López",
          apoderado: "Ana Martínez"
        },
        createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        downloadUrl: this.generateDownloadUrl('docx')
      }
    ];
  }

  private generateDownloadUrl(format: 'pdf' | 'docx'): string {
    return `https://legalcorpai.bo/download/${Math.random().toString(36).substr(2, 9)}.${format}`;
  }
}

// Invoice Service Stub
export class InvoiceService {
  private static instance: InvoiceService;

  static getInstance(): InvoiceService {
    if (!InvoiceService.instance) {
      InvoiceService.instance = new InvoiceService();
    }
    return InvoiceService.instance;
  }

  async getInvoices(): Promise<Invoice[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const invoices: Invoice[] = [];
    const now = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 15);
      const dueDate = new Date(date.getFullYear(), date.getMonth() + 1, 15);
      
      invoices.push({
        id: `inv_${i + 1}`,
        number: `INV-2024-${String(i + 1).padStart(3, '0')}`,
        date: date.toISOString(),
        dueDate: dueDate.toISOString(),
        amount: 29.00,
        currency: 'USD',
        status: i < 2 ? 'pending' : 'paid',
        plan: i < 6 ? 'Pro' : 'Gratis',
        pdfUrl: this.generatePdfUrl(i + 1)
      });
    }

    return invoices.reverse();
  }

  async downloadInvoice(invoiceId: string): Promise<{ success: boolean; downloadUrl?: string; error?: string }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      success: true,
      downloadUrl: this.generatePdfUrl(parseInt(invoiceId.split('_')[1]))
    };
  }

  private generatePdfUrl(invoiceNumber: number): string {
    return `https://legalcorpai.bo/invoices/INV-2024-${String(invoiceNumber).padStart(3, '0')}.pdf`;
  }
}

// AI Service Stub (enhanced chat functionality)
export class AIService {
  private static instance: AIService;

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async generateLegalResponse(
    prompt: string,
    gptType: string,
    tone: 'formal' | 'plain' | 'bilingual' = 'formal'
  ): Promise<{ content: string; citations?: string[]; variables?: Record<string, string> }> {
    // Simulate API call with variable delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 3000));

    const responses = this.getResponsesForGPT(gptType);
    const baseResponse = responses[Math.floor(Math.random() * responses.length)];

    // Apply tone modifications
    let content = baseResponse;
    if (tone === 'bilingual') {
      content += "\n\nEnglish: " + this.translateToEnglish(baseResponse);
    } else if (tone === 'plain') {
      content = this.simplifyLanguage(baseResponse);
    }

    // Generate citations for legal responses
    const citations = this.generateCitations(gptType);
    
    // Extract variables from prompt
    const variables = this.extractVariables(prompt);

    return {
      content,
      citations: citations.length > 0 ? citations : undefined,
      variables
    };
  }

  private getResponsesForGPT(gptType: string): string[] {
    const responseMap: Record<string, string[]> = {
      'civil-contracts': [
        "Basado en el Código Civil boliviano, te puedo ayudar a redactar un contrato completo que incluya todas las cláusulas necesarias para proteger los intereses de ambas partes.",
        "Para un contrato válido en Bolivia, debemos considerar los elementos esenciales: consentimiento válido, objeto lícito, causa lícita y forma prescrita por ley.",
        "Te recomiendo incluir cláusulas específicas sobre resolución de conflictos, penalidades por incumplimiento y condiciones de terminación anticipada."
      ],
      'penal-defense': [
        "En derecho penal boliviano, toda persona tiene derecho a la defensa y a la presunción de inocencia hasta que se demuestre su culpabilidad.",
        "Para una defensa efectiva, debemos analizar los elementos constitutivos del tipo penal y verificar si existen causales de atipicidad, justificación o inculpación.",
        "La carga de la prueba corresponde al Ministerio Público, quien debe demostrar la responsabilidad penal más allá de toda duda razonable."
      ],
      'labor-contracts': [
        "La Ley General del Trabajo boliviana establece los derechos fundamentales de los trabajadores, incluyendo salario digno, estabilidad laboral y seguridad social.",
        "Para un contrato de trabajo válido, es necesario especificar claramente las funciones, salario, jornada laboral y lugar de trabajo.",
        "El desahucio debe seguir el procedimiento establecido en la ley, incluyendo preaviso y pago de todos los beneficios sociales correspondientes."
      ],
      'default': [
        "Como asistente legal especializado en derecho boliviano, puedo proporcionarte información precisa y actualizada sobre tu consulta.",
        "Basado en la legislación vigente, te ofrezco una respuesta fundamentada que considera los aspectos relevantes de tu situación.",
        "Para darte una orientación completa, necesito conocer más detalles específicos sobre tu caso o consulta legal."
      ]
    };

    return responseMap[gptType] || responseMap.default;
  }

  private translateToEnglish(text: string): string {
    // Simple translation simulation
    const translations: Record<string, string> = {
      "Código Civil boliviano": "Bolivian Civil Code",
      "contrato": "contract",
      "cláusulas": "clauses",
      "derecho penal": "criminal law",
      "defensa": "defense",
      "Ley General del Trabajo": "General Labor Law",
      "trabajadores": "workers",
      "salario": "salary"
    };

    let translated = text;
    Object.entries(translations).forEach(([spanish, english]) => {
      translated = translated.replace(new RegExp(spanish, 'gi'), english);
    });

    return `Based on Bolivian law, I can provide you with accurate legal guidance on this matter.`;
  }

  private simplifyLanguage(text: string): string {
    // Simplify legal jargon
    return text
      .replace(/basado en el código civil boliviano/gi, "según la ley boliviana")
      .replace(/elementos esenciales/gi, "partes importantes")
      .replace(/causales de atipicidad/gi, "razones para considerar que no hay delito")
      .replace(/beneficios sociales/gi, "derechos laborales");
  }

  private generateCitations(gptType: string): string[] {
    const citationMap: Record<string, string[]> = {
      'civil-contracts': [
        "Código Civil Boliviano, Artículo 519 - De las obligaciones de dar",
        "Código Civil Boliviano, Artículo 450 - Requisitos del contrato",
        "Constitución Política del Estado, Artículo 60 - Derechos contractuales"
      ],
      'penal-defense': [
        "Código Penal, Artículo 16 - Principio de legalidad",
        "Constitución Política del Estado, Artículo 115 - Derecho a la defensa",
        "Código de Procedimiento Penal, Artículo 5 - Presunción de inocencia"
      ],
      'labor-contracts': [
        "Ley General del Trabajo, Artículo 16 - Salario mínimo",
        "Ley General del Trabajo, Artículo 44 - Estabilidad laboral",
        "Constitución Política del Estado, Artículo 48 - Derechos laborales"
      ]
    };

    const citations = citationMap[gptType] || [];
    return Math.random() > 0.5 ? citations.slice(0, Math.floor(Math.random() * 3) + 1) : [];
  }

  private extractVariables(prompt: string): Record<string, string> {
    const variables: Record<string, string> = {};
    
    // Extract common variables from legal prompts
    if (prompt.toLowerCase().includes('contrato')) {
      variables.fecha_contrato = new Date().toLocaleDateString('es-BO');
      variables.lugar = "La Paz, Bolivia";
    }
    
    if (prompt.toLowerCase().includes('arrendamiento')) {
      variables.monto_alquiler = "2500";
      variables.duracion = "12 meses";
    }
    
    if (prompt.toLowerCase().includes('poder')) {
      variables.poderdante = "Nombre del Poderdante";
      variables.apoderado = "Nombre del Apoderado";
    }

    return variables;
  }
}

// Export instances for easy use
export const paymentService = PaymentService.getInstance();
export const documentExportService = DocumentExportService.getInstance();
export const invoiceService = InvoiceService.getInstance();
export const aiService = AIService.getInstance();