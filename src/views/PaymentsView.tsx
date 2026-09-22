import React, { useState } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { mockPayments, mockCurrentUser } from '../data/mockData';
import type { PaymentItem } from '../types';
import { 
  CreditCard, 
  Download, 
  ShieldCheck,
  X
} from 'lucide-react';

export const PaymentsView: React.FC = () => {
  const [payments, setPayments] = useState<PaymentItem[]>(mockPayments);
  const [selectedPaymentForPay, setSelectedPaymentForPay] = useState<PaymentItem | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  /**
   * ============================================================================
   * BACKEND INTEGRATION POINT - FINANZAS / PAGOS
   * ============================================================================
   * 1. GET /api/v1/payments/student/{matricula}
   *    Retorna el estado de cuenta del alumno y los conceptos pendientes o saldados.
   * 2. POST /api/v1/payments/checkout
   *    Payload: { paymentId: string, paymentMethod: 'card' | 'spei' | 'oxxo' }
   *    Retorna url de pasarela (Stripe/Conekta/OpenPay) o confirmación directa.
   * 3. GET /api/v1/payments/{id}/receipt
   *    Descarga PDF del comprobante oficial sellado digitalmente.
   * ============================================================================
   */

  const handlePayConcept = (paymentId: string) => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPayments(prev => prev.map(p => 
        p.id === paymentId ? { ...p, estado: 'pagado', folioComprobante: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}` } : p
      ));
      setPaymentSuccess(false);
      setSelectedPaymentForPay(null);
    }, 1000);
  };

  const handleDownloadReceipt = (folio?: string) => {
    alert(`Descargando comprobante oficial ${folio || 'REC-PENDIENTE'}.pdf (Simulación)`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* =======================================================================
          1. FICHA DEL ALUMNO (Wireframe 06: Carolina Martinez, Matricula, Status, Grupo, Beca)
         ======================================================================= */}
      <Card className="p-6 mb-6 border-[#bcdee0]/60 bg-gradient-to-r from-white via-white to-[#f7fcfe]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#45aec4] bg-[#edf7f9] px-2.5 py-0.5 rounded-full border border-[#bcdee0]/50">
                Ficha Financiera del Alumno
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#22304a] tracking-tight">
              {mockCurrentUser.nombre}
            </h1>
            <p className="text-xs text-[#22304a]/70 font-medium mt-0.5">
              {mockCurrentUser.carrera} • {mockCurrentUser.cuatrimestre}
            </p>
          </div>

          {/* Cuatro cápsulas del wireframe: Matrícula, Status, Grupo, Beca */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
            
            <div className="p-3 rounded-2xl bg-[#edf7f9] border border-[#bcdee0]/60">
              <span className="text-[10px] font-bold text-[#22304a]/60 block uppercase">
                Matrícula
              </span>
              <span className="text-sm font-extrabold text-[#22304a]">
                {mockCurrentUser.matricula}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#eafaf1] border border-[#a2e5be]">
              <span className="text-[10px] font-bold text-[#1e7e4e]/80 block uppercase">
                Estatus
              </span>
              <span className="text-sm font-extrabold text-[#1e7e4e] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {mockCurrentUser.estatus}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#edf7f9] border border-[#bcdee0]/60">
              <span className="text-[10px] font-bold text-[#22304a]/60 block uppercase">
                Grupo
              </span>
              <span className="text-sm font-extrabold text-[#22304a]">
                {mockCurrentUser.grupo}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#fff8e7] border border-[#fec23d]/50">
              <span className="text-[10px] font-bold text-[#9c6a08] block uppercase">
                Beca
              </span>
              <span className="text-sm font-extrabold text-[#9c6a08]">
                {mockCurrentUser.beca}
              </span>
            </div>

          </div>

        </div>
      </Card>

      {/* =======================================================================
          2. TABLA DE ESTADO DE PAGOS (Wireframe 06)
         ======================================================================= */}
      <Card className="p-6 border-[#bcdee0]/60 overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#bcdee0]/40">
          <div>
            <h2 className="text-lg font-bold text-[#22304a]">
              Estado de Pagos y Colegiaturas
            </h2>
            <p className="text-xs text-[#22304a]/65">
              Consulta de fechas de vencimiento, montos aplicados y recibos fiscales
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-[#22304a]/60 font-medium">Ciclo Actual: </span>
            <span className="text-xs font-bold text-[#45aec4] bg-[#edf7f9] px-2.5 py-1 rounded-xl">
              Sep - Dic 2026
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#bcdee0]/50 text-[#22304a]/70 font-bold uppercase text-[11px] tracking-wider">
                <th className="pb-3 px-3">Concepto</th>
                <th className="pb-3 px-3">Periodo</th>
                <th className="pb-3 px-3">Fecha límite</th>
                <th className="pb-3 px-3">Monto Base</th>
                <th className="pb-3 px-3">Beca (50%)</th>
                <th className="pb-3 px-3">Total a Pagar</th>
                <th className="pb-3 px-3 text-center">Estado</th>
                <th className="pb-3 px-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bcdee0]/30">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-[#f6fafd] transition-colors">
                  <td className="py-4 px-3">
                    <div className="font-bold text-[#22304a]">{p.concepto}</div>
                    {p.folioComprobante && (
                      <span className="text-[10px] text-[#45aec4] font-medium block">
                        Folio: {p.folioComprobante}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-3 text-[#22304a]/80 font-medium">
                    {p.periodo}
                  </td>

                  <td className="py-4 px-3 font-semibold text-[#22304a]">
                    {p.fechaLimite}
                  </td>

                  <td className="py-4 px-3 text-[#22304a]/70 font-medium">
                    ${p.montoOriginal.toLocaleString('es-MX')} MXN
                  </td>

                  <td className="py-4 px-3 text-[#1e7e4e] font-semibold">
                    {p.descuentoBeca > 0 ? `-$${p.descuentoBeca.toLocaleString('es-MX')} MXN` : '$0 MXN'}
                  </td>

                  <td className="py-4 px-3 font-extrabold text-[#22304a]">
                    ${p.montoFinal.toLocaleString('es-MX')} MXN
                  </td>

                  <td className="py-4 px-3 text-center">
                    <Badge variant={p.estado}>
                      {p.estado}
                    </Badge>
                  </td>

                  <td className="py-4 px-3 text-right">
                    {p.estado === 'pagado' ? (
                      <button
                        onClick={() => handleDownloadReceipt(p.folioComprobante)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#edf7f9] text-[#45aec4] hover:bg-[#bcdee0]/50 font-bold text-xs transition-colors cursor-pointer"
                        title="Descargar Comprobante PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Recibo
                      </button>
                    ) : (
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => setSelectedPaymentForPay(p)}
                        className="text-xs font-bold"
                      >
                        Pagar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-[#edf7f9]/60 border border-[#bcdee0]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#22304a]/75">
            <CreditCard className="w-4 h-4 text-[#45aec4]" />
            <span>Métodos de pago aceptados: Tarjetas de crédito/débito, Transferencia SPEI, Tiendas OXXO.</span>
          </div>
          <span className="font-bold text-[#45aec4]">
            Dudas o aclaraciones: pagos@utech.edu.mx
          </span>
        </div>

      </Card>

      {/* Modal simulador de pago */}
      {selectedPaymentForPay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 border border-[#bcdee0] shadow-2xl relative">
            <button
              onClick={() => setSelectedPaymentForPay(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#edf7f9] text-[#22304a] hover:bg-[#bcdee0] flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-extrabold text-[#22304a] mb-1">
              Pasarela de Pago Simulada
            </h3>
            <p className="text-xs text-[#22304a]/70 mb-4">
              Realiza el pago del concepto de manera segura
            </p>

            <div className="p-4 rounded-2xl bg-[#f6fafd] border border-[#bcdee0]/60 mb-4 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#22304a]/70">Concepto:</span>
                <span className="font-bold text-[#22304a]">{selectedPaymentForPay.concepto}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#22304a]/70">Periodo:</span>
                <span className="font-semibold text-[#22304a]">{selectedPaymentForPay.periodo}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#bcdee0]/40 text-sm">
                <span className="font-bold text-[#22304a]">Monto con Beca aplicada:</span>
                <span className="font-extrabold text-[#45aec4]">${selectedPaymentForPay.montoFinal} MXN</span>
              </div>
            </div>

            {paymentSuccess ? (
              <div className="p-4 rounded-2xl bg-[#eafaf1] text-[#1e7e4e] text-center font-bold text-xs">
                ¡Pago procesado exitosamente! Generando comprobante...
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full font-bold"
                  onClick={() => handlePayConcept(selectedPaymentForPay.id)}
                >
                  Confirmar Pago Simulado ($ {selectedPaymentForPay.montoFinal} MXN)
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setSelectedPaymentForPay(null)}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

