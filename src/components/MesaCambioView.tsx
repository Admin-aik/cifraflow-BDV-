import React, { useState } from 'react';
import {
  ArrowLeftRight,
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  Euro,
  Info,
  Building2,
  Lock,
} from 'lucide-react';
import { BankAccount, ExchangeRates, Transaction } from '../types';

interface MesaCambioViewProps {
  accounts: BankAccount[];
  rates: ExchangeRates;
  onExecuteExchange: (
    type: 'COMPRA' | 'VENTA',
    foreignCurrency: 'USD' | 'EUR',
    foreignAmount: number,
    vesAmount: number,
    fee: number,
    rate: number,
    tx: Transaction
  ) => void;
  onOpenAmiVen: () => void;
}

export const MesaCambioView: React.FC<MesaCambioViewProps> = ({
  accounts,
  rates,
  onExecuteExchange,
  onOpenAmiVen,
}) => {
  const [operationType, setOperationType] = useState<'COMPRA' | 'VENTA'>('COMPRA');
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'EUR'>('USD');
  const [foreignAmountInput, setForeignAmountInput] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [purpose, setPurpose] = useState('Ahorro personal / Reserva de valor');
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vesAccount = accounts.find((a) => a.currency === 'VES') || accounts[0];
  const usdAccount = accounts.find((a) => a.currency === 'USD') || accounts[1];
  const eurAccount = accounts.find((a) => a.currency === 'EUR') || accounts[2];

  const currentRate = selectedCurrency === 'USD' ? rates.usd : rates.eur;
  const foreignAccount = selectedCurrency === 'USD' ? usdAccount : eurAccount;

  const parsedForeignAmount = parseFloat(foreignAmountInput.replace(',', '.')) || 0;
  const grossVesAmount = parsedForeignAmount * currentRate;
  // Official commission 0.25%
  const commissionVes = +(grossVesAmount * 0.0025).toFixed(2);
  const totalVesToDebitOrCredit =
    operationType === 'COMPRA'
      ? grossVesAmount + commissionVes
      : grossVesAmount - commissionVes;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (parsedForeignAmount < 1) {
      setError('El monto mínimo para operar en la Mesa de Cambio es 1.00 de la divisa seleccionada.');
      return;
    }

    if (operationType === 'COMPRA') {
      if (totalVesToDebitOrCredit > vesAccount.availableBalance) {
        setError(
          `Saldo insuficiente en Bolívares. Necesita Bs. ${totalVesToDebitOrCredit.toLocaleString(
            'es-VE',
            { minimumFractionDigits: 2 }
          )} y dispone de Bs. ${vesAccount.availableBalance.toLocaleString('es-VE', {
            minimumFractionDigits: 2,
          })}.`
        );
        return;
      }
    } else {
      // Venta: checking foreign balance
      if (parsedForeignAmount > foreignAccount.availableBalance) {
        setError(
          `Saldo insuficiente en divisa. Dispone de ${
            selectedCurrency === 'USD' ? '$' : '€'
          } ${foreignAccount.availableBalance.toFixed(2)}.`
        );
        return;
      }
    }

    if (!acceptTerms) {
      setError('Debe declarar el origen de fondos y aceptar la normativa del Banco Central de Venezuela.');
      return;
    }

    if (!tokenInput.trim() || tokenInput.length < 6) {
      setError('Debe ingresar la Clave Dinámica Ami Ven de 6 dígitos.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const refNum = `0102${Math.floor(10000000 + Math.random() * 90000000)}`;
      const isCompra = operationType === 'COMPRA';

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
        type: isCompra ? 'MESA_CAMBIO_COMPRA' : 'MESA_CAMBIO_VENTA',
        category: 'exchange',
        description: isCompra
          ? `Compra Mesa de Cambio (${selectedCurrency})`
          : `Venta Mesa de Cambio (${selectedCurrency})`,
        senderName: 'CARLOS ENRIQUE PEREZ',
        senderDoc: 'V-24891302',
        senderAccountOrPhone: isCompra ? vesAccount.accountNumber : foreignAccount.accountNumber,
        recipientName: 'Mesa de Cambio Banco de Venezuela',
        recipientDoc: 'G-20009997-6',
        recipientBank: 'Banco de Venezuela',
        recipientBankCode: '0102',
        recipientAccountOrPhone: isCompra ? foreignAccount.accountNumber : vesAccount.accountNumber,
        amount: parsedForeignAmount,
        currency: selectedCurrency,
        exchangeRate: currentRate,
        fee: commissionVes,
        status: 'EXITOSA',
        concept: `Intervención Cambiaria Oficial BCV / ${purpose}`,
      };

      setIsSubmitting(false);
      onExecuteExchange(
        operationType,
        selectedCurrency,
        parsedForeignAmount,
        totalVesToDebitOrCredit,
        commissionVes,
        currentRate,
        newTx
      );
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#002855] via-[#003366] to-[#C8102E] rounded-3xl p-6 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <ArrowLeftRight className="w-6 h-6 text-[#FFD100]" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              Mesa de Cambio BDV
              <span className="bg-[#FFD100] text-[#002855] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Tasa BCV Oficial
              </span>
            </h1>
            <p className="text-xs text-blue-100">
              Compra y venta de divisas en tiempo real con abono inmediato a tus cuentas de libre convertibilidad.
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

      {/* Official Ticker Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* USD Card */}
        <div
          onClick={() => setSelectedCurrency('USD')}
          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedCurrency === 'USD'
              ? 'border-[#002855] bg-white shadow-md'
              : 'border-slate-200 bg-slate-50 hover:bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
                $
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Dólar Oficial BCV</span>
                <span className="text-[10px] text-slate-400">USD / VES</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black font-mono text-[#002855]">
                Bs. {rates.usd.toFixed(2)}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold block flex items-center gap-0.5 justify-end">
                <TrendingUp className="w-3 h-3" /> Cotización Oficial
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500">
            <span>Tu saldo disponible:</span>
            <span className="font-mono font-bold text-slate-800">
              ${usdAccount.availableBalance.toFixed(2)} USD
            </span>
          </div>
        </div>

        {/* EUR Card */}
        <div
          onClick={() => setSelectedCurrency('EUR')}
          className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
            selectedCurrency === 'EUR'
              ? 'border-[#002855] bg-white shadow-md'
              : 'border-slate-200 bg-slate-50 hover:bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-base">
                €
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Euro Oficial BCV</span>
                <span className="text-[10px] text-slate-400">EUR / VES</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black font-mono text-[#002855]">
                Bs. {rates.eur.toFixed(2)}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold block flex items-center gap-0.5 justify-end">
                <TrendingUp className="w-3 h-3" /> Cotización Oficial
              </span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex justify-between text-xs text-slate-500">
            <span>Tu saldo disponible:</span>
            <span className="font-mono font-bold text-slate-800">
              €{eurAccount.availableBalance.toFixed(2)} EUR
            </span>
          </div>
        </div>
      </div>

      {/* Operation Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        {/* Toggle between Compra and Venta */}
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => setOperationType('COMPRA')}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
              operationType === 'COMPRA'
                ? 'bg-[#002855] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Comprar Divisas (Cargo en Bs.)
          </button>
          <button
            type="button"
            onClick={() => setOperationType('VENTA')}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
              operationType === 'VENTA'
                ? 'bg-[#C8102E] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Vender Divisas (Abono en Bs.)
          </button>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Input amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">
              Monto a {operationType === 'COMPRA' ? 'Comprar' : 'Vender'} ({selectedCurrency})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 font-bold text-slate-400 text-xs">
                {selectedCurrency === 'USD' ? '$' : '€'}
              </span>
              <input
                type="number"
                step="any"
                value={foreignAmountInput}
                onChange={(e) => setForeignAmountInput(e.target.value)}
                placeholder="0.00"
                className="w-full bg-slate-50 border border-slate-300 text-base font-mono font-black text-[#002855] rounded-xl pl-8 pr-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[20, 50, 100, 250, 500].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForeignAmountInput(val.toString())}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg transition-colors"
                >
                  +{val}
                </button>
              ))}
            </div>
          </div>

          {/* Breakdown summary */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500">
              <span>Tasa BCV Aplicable:</span>
              <span className="font-mono font-semibold text-slate-800">
                Bs. {currentRate.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Comisión de Intervención (0.25%):</span>
              <span className="font-mono font-semibold text-slate-800">
                Bs. {commissionVes.toFixed(2)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-800">
                {operationType === 'COMPRA' ? 'Total en Bs. a Debitar:' : 'Total en Bs. a Recibir:'}
              </span>
              <span className="text-base font-black font-mono text-[#002855]">
                Bs. {totalVesToDebitOrCredit.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Declaration and Regulatory compliance */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider block">
            Declaración de Origen y Destino de Fondos
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
          >
            <option value="Ahorro personal / Reserva de valor">Ahorro personal / Reserva de valor</option>
            <option value="Gastos médicos y farmacéuticos">Gastos médicos y farmacéuticos</option>
            <option value="Educación y capacitación">Educación y capacitación</option>
            <option value="Gastos de viaje y hospedaje">Gastos de viaje y hospedaje</option>
            <option value="Comercio exterior y adquisición de bienes">Comercio exterior y adquisición de bienes</option>
          </select>

          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-[#C8102E] rounded border-slate-300 focus:ring-[#C8102E]"
            />
            <span>
              Declaro que los fondos son de procedencia legítima y acepto los términos de la Resolución de Mesa de Cambio del Banco Central de Venezuela (BCV).
            </span>
          </label>
        </div>

        {/* Clave Dinámica Ami Ven */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#002855] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#C8102E]" />
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

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60 ${
            operationType === 'COMPRA'
              ? 'bg-[#002855] hover:bg-[#001e42] shadow-blue-950/20'
              : 'bg-[#C8102E] hover:bg-[#b00f21] shadow-red-950/20'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Procesando en Mesa de Cambio...</span>
            </>
          ) : (
            <>
              <ArrowLeftRight className="w-4 h-4" />
              <span>
                {operationType === 'COMPRA'
                  ? `Comprar ${parsedForeignAmount > 0 ? parsedForeignAmount.toFixed(2) : ''} ${selectedCurrency}`
                  : `Vender ${parsedForeignAmount > 0 ? parsedForeignAmount.toFixed(2) : ''} ${selectedCurrency}`}
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
