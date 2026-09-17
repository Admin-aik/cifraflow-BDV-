import React, { useState } from 'react';
import { CheckCircle2, Copy, Download, Printer, Share2, X, ShieldCheck } from 'lucide-react';
import { Transaction } from '../types';
import { BdvLogo } from './BdvLogo';

interface ReceiptModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ transaction, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!transaction) return null;

  const handleCopyText = () => {
    const text = `*COMPROBANTE DE OPERACIÓN BDV*
Institución: Banco de Venezuela
Referencia: ${transaction.reference}
Fecha: ${transaction.date}
Tipo: ${transaction.description}
Monto: ${transaction.currency === 'USD' ? '$' : transaction.currency === 'EUR' ? '€' : 'Bs. '} ${transaction.amount.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
Pagador: ${transaction.senderName} (${transaction.senderDoc})
Beneficiario: ${transaction.recipientName} (${transaction.recipientDoc})
Banco Receptor: ${transaction.recipientBank}
Tel/Cuenta: ${transaction.recipientAccountOrPhone}
Concepto: ${transaction.concept}
Estado: EXITOSA`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 animate-in fade-in zoom-in duration-200">
        {/* Top BDV decorative stripe */}
        <div className="h-2 bg-gradient-to-r from-[#C8102E] via-[#FFD100] to-[#002855]" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/70">
          <div>
            <BdvLogo size="sm" />
            <p className="text-xs text-slate-500 mt-1 font-medium">BDVenlínea • Comprobante de Operación</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
            title="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
          {/* Status badge */}
          <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200/80 rounded-xl">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Operación Exitosa
                </span>
                <span className="text-xs text-emerald-700 font-mono">
                  Aprobación bancaria SUD-0102
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verificado
            </div>
          </div>

          {/* Amount Display */}
          <div className="text-center py-2 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Monto de la Operación
            </span>
            <div className="text-3xl font-black text-[#002855] tracking-tight mt-1">
              {transaction.currency === 'USD' ? '$' : transaction.currency === 'EUR' ? '€' : 'Bs.'}{' '}
              {transaction.amount.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            {transaction.exchangeRate && (
              <span className="text-xs font-medium text-slate-500 mt-0.5 inline-block">
                Tasa de cambio BCV: Bs. {transaction.exchangeRate.toFixed(2)} por divisa
              </span>
            )}
            {transaction.fee > 0 && (
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Comisión bancaria: Bs. {transaction.fee.toFixed(2)}
              </span>
            )}
          </div>

          {/* Transaction Metadata Grid */}
          <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100 font-sans">
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Nro. de Referencia</span>
              <span className="font-mono font-bold text-[#002855] text-sm tracking-wide">
                {transaction.reference}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Fecha y Hora</span>
              <span className="font-semibold text-slate-700">{transaction.date}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Tipo de Operación</span>
              <span className="font-semibold text-slate-700">{transaction.description}</span>
            </div>

            {/* Sender */}
            <div className="py-1 border-b border-slate-200/60">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Pagador / Emisor</span>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-800">{transaction.senderName}</span>
                <span className="font-mono text-slate-600">{transaction.senderDoc}</span>
              </div>
            </div>

            {/* Recipient */}
            <div className="py-1 border-b border-slate-200/60">
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Beneficiario / Destino</span>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-800">{transaction.recipientName}</span>
                <span className="font-mono text-slate-600">{transaction.recipientDoc}</span>
              </div>
              <div className="flex justify-between text-slate-500 mt-1">
                <span>{transaction.recipientBank}</span>
                <span className="font-mono">{transaction.recipientAccountOrPhone}</span>
              </div>
            </div>

            <div className="flex justify-between items-start py-1">
              <span className="text-slate-500 font-medium">Concepto</span>
              <span className="font-semibold text-slate-800 text-right max-w-[240px]">
                {transaction.concept || 'No especificado'}
              </span>
            </div>
          </div>

          {/* Institutional note */}
          <div className="text-[11px] text-slate-400 text-center leading-relaxed">
            Banco de Venezuela, S.A. Banco Universal • RIF: G-20009997-6<br />
            Comprobante electrónico emitido por BDVenlínea oficial. Válido a efectos legales y bancarios.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
          <button
            onClick={handleCopyText}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors shadow-sm"
          >
            <Copy className="w-4 h-4 text-slate-500" />
            {copied ? '¡Copiado!' : 'Copiar Texto'}
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-300 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            Imprimir
          </button>

          <button
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center py-2.5 px-4 bg-[#002855] hover:bg-[#001e42] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
