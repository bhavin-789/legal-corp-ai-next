"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Download, 
  FileText, 
  Calendar, 
  CreditCard,
  Eye,
  MoreHorizontal
} from "lucide-react";

interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: string;
  status: "paid" | "pending" | "overdue";
  plan: string;
  downloadUrl: string;
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    number: "INV-2024-001",
    date: "2024-01-15",
    amount: "$29.00",
    status: "paid",
    plan: "Pro",
    downloadUrl: "#"
  },
  {
    id: "2", 
    number: "INV-2024-002",
    date: "2024-02-15",
    amount: "$29.00",
    status: "paid",
    plan: "Pro",
    downloadUrl: "#"
  },
  {
    id: "3",
    number: "INV-2024-003", 
    date: "2024-03-15",
    amount: "$29.00",
    status: "pending",
    plan: "Pro",
    downloadUrl: "#"
  }
];

const statusConfig = {
  paid: {
    label: "Pagado",
    variant: "default" as const,
    className: "bg-green-100 text-green-800"
  },
  pending: {
    label: "Pendiente", 
    variant: "secondary" as const,
    className: "bg-yellow-100 text-yellow-800"
  },
  overdue: {
    label: "Vencido",
    variant: "destructive" as const,
    className: "bg-red-100 text-red-800"
  }
};

export function InvoiceList() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-BO', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  const handleDownload = (invoiceId: string) => {
    // Simulate download
    console.log(`Downloading invoice ${invoiceId}`);
  };

  const handleView = (invoiceId: string) => {
    // Simulate view
    console.log(`Viewing invoice ${invoiceId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Facturas</span>
        </CardTitle>
        <CardDescription>
          Historial de facturas y comprobantes de pago
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoices.map((invoice) => {
                const status = statusConfig[invoice.status];
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.number}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDate(invoice.date)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {invoice.plan}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {invoice.amount}
                    </TableCell>
                    <TableCell>
                      <Badge className={status.className}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(invoice.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(invoice.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
        
        {mockInvoices.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No hay facturas</h3>
            <p>Tus facturas aparecerán aquí cuando se generen pagos</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}