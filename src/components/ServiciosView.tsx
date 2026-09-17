import React, { useState } from 'react';
import {
  Zap,
  PhoneCall,
  Smartphone,
  Radio,
  Tv,
  FileText,
  Shield,
  Search,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { BankAccount, ServiceProvider, Transaction } from '../types';
import { SERVICE_PROVIDERS } from '../data/bdvData';

interface ServiciosViewProps {
  accounts: BankAccount[];
  onExecuteServicePayment: (tx: Transaction) => void;
  onOpenAmiVen: () => void;
}

export const ServiciosView: React.FC<ServiciosViewProps> = ({
  accounts,
  onExecuteServicePayment,
  onOpenAmiVen,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider>(SERVICE_PROVIDERS[0]);
  const [identifierInput, setIdentifierInput] = useState('02125551234');
  const [amountInput, setAmountInput] = useState('460.00');
  const [tokenInput, setTokenInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vesAccount = accounts.find((a) => a.currency === 'VES') || accounts[0];
  const numAmount = parseFloat(amountInput.replace(',', '.')) || 0;

  const handleSelectProvider = (prov: ServiceProvider) => {
    setSelectedProvider(prov);
    setIdentifierInput(prov.placeholder);
    if (prov.fixedPackages && prov.fixedPackages.length > 0) {
      setAmountInput(prov.fixedPackages[0].toString());
    } else if (prov.minAmount) {
      setAmountInput(prov.minAmount.toString());
    }
    setError(null);
  };

  const getProviderIcon = (iconName: string) => {
    switch (iconName) {
      case 'PhoneCall':
        return <PhoneCall className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5" />;
      case 'Radio':
        return <Radio className="w-5 h-5" />;
      case 'Tv':
        return <Tv className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifierInput.trim()) {
      setError('Por favor ingrese el número o contrato correspondiente.');
      return;
    }

    if (numAmount <= 0) {
      setError('Por favor ingrese un monto de pago válido.');
      return;
    }

    if (numAmount > vesAccount.availableBalance) {
      setError('Saldo insuficiente en su cuenta corriente en bolívares.');
      return;
    }

    if (!tokenInput.trim() || tokenInput.length < 6) {
      setError('Debe ingresar la Clave Dinámica Ami Ven de 6 dígitos.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const refNum = `0102${Math.floor(10000000 + Math.random() * 90000000)}`;

      const newTx: Transaction = {
        id: `tx-${Date.now()}`,
        reference: refNum,
        date: new Date().toLocaleString('es-VE', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        type: 'PAGO_SERVICIO',
        category: 'service',
        description: `Pago de Servicio ${selectedProvider.name}`,
        senderName: 'CARLOS ENRIQUE PEREZ',
        senderDoc: 'V-24891302',
        senderAccountOrPhone: vesAccount.accountNumber,
        recipientName: selectedProvider.name,
        recipientDoc: 'G-200000010',
        recipientBank: 'Banco de Venezuela',
        recipientBankCode: '0102',
        recipientAccountOrPhone: identifierInput,
        amount: numAmount,
        currency: 'VES',
        fee: 0.0,
        status: 'EXITOSA',
        concept: `Abono de factura / Recarga ${identifierInput}`,
      };

      setIsSubmitting(false);
      onExecuteServicePayment(newTx);
    }, 750);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#002855] via-[#003875] to-[#C8102E] rounded-3xl p-6 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Zap className="w-6 h-6 text-[#FFD100]" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              Multipagos BDV
              <span className="bg-[#FFD100] text-[#002855] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Servicios y Recargas
              </span>
            </h1>
            <p className="text-xs text-blue-100">
              Pago de electricidad, telefonía, internet, televisión por suscripción e impuestos nacionales.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAmiVen}
          className="flex items-center gap-2 px-3.5 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold border border-white/20 transition-all text-white"
        >
          <Shield className="w-4 h-4 text-[#FFD100]" />
          <span>Clave Ami Ven</span>
        </button>
      </div>

      {/* Service Providers Grid */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
          Seleccione la Empresa o Servicio
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {SERVICE_PROVIDERS.map((prov) => {
            const isSelected = prov.id === selectedProvider.id;
            return (
              <button
                key={prov.id}
                type="button"
                onClick={() => handleSelectProvider(prov)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-[#002855] bg-blue-50/60 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#002855] text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {getProviderIcon(prov.icon)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                    {prov.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {prov.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center font-bold">
            {getProviderIcon(selectedProvider.icon)}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">{selectedProvider.name}</h3>
            <p className="text-xs text-slate-400">Canal oficial de recaudación Banco de Venezuela</p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Input Identifier */}
        <div>
          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">
            {selectedProvider.identifierLabel}
          </label>
          <input
            type="text"
            value={identifierInput}
            onChange={(e) => setIdentifierInput(e.target.value)}
            placeholder={selectedProvider.placeholder}
            className="w-full bg-slate-50 border border-slate-300 text-xs font-mono font-bold text-slate-800 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#002855]"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">
            Monto a Pagar / Recargar (Bs.)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 font-bold text-slate-400 text-xs">
              Bs.
            </span>
            <input
              type="number"
              step="any"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="0,00"
              className="w-full bg-slate-50 border border-slate-300 text-sm font-mono font-black text-[#002855] rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
            />
          </div>

          {/* Quick preset package buttons for telco */}
          {selectedProvider.fixedPackages && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-[11px] text-slate-400 self-center">Paquetes frecuentes:</span>
              {selectedProvider.fixedPackages.map((pkg) => (
                <button
                  key={pkg}
                  type="button"
                  onClick={() => setAmountInput(pkg.toString())}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors font-mono"
                >
                  Bs. {pkg}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clave Ami Ven */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#002855] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#C8102E]" />
              Autorización con Clave Dinámica Ami Ven
            </label>
            <button
              type="button"
              onClick={onOpenAmiVen}
              className="text-[11px] font-bold text-[#C8102E] hover:underline"
            >
              Abrir Ami Ven
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              maxLength={6}
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="Código de 6 dígitos"
              className="w-full sm:max-w-xs bg-white border border-slate-300 text-center text-base tracking-widest font-mono font-black text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-[#002855]"
            />
            <button
              type="button"
              onClick={() => setTokenInput('839214')}
              className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
            >
              Autocompletar
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-[#002855] hover:bg-[#001e42] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-blue-950/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Procesando pago de servicio...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Confirmar Pago de {selectedProvider.name}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
