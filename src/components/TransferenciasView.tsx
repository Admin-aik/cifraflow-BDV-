import React, { useState } from 'react';
import { Send, Building, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BankAccount, Transaction } from '../types';
import { VENEZUELAN_BANKS } from '../data/bdvData';

interface TransferenciasViewProps {
  accounts: BankAccount[];
  onExecuteTransfer: (tx: Transaction) => void;
  onOpenAmiVen: () => void;
}

export const TransferenciasView: React.FC<TransferenciasViewProps> = ({
  accounts,
  onExecuteTransfer,
  onOpenAmiVen,
}) => {
  const [transferType, setTransferType] = useState<'MISMO_BANCO' | 'OTROS_BANCOS'>('MISMO_BANCO');
  const [targetBankCode, setTargetBankCode] = useState('0102');
  const [accountNumber, setAccountNumber] = useState('01020199820001928471');
  const [beneficiaryName, setBeneficiaryName] = useState('Elena Rodríguez');
  const [docType, setDocType] = useState<'V' | 'E' | 'J' | 'G'>('V');
  const [docNumber, setDocNumber] = useState('21492814');
  const [amount, setAmount] = useState('');
  const [concept, setConcept] = useState('Transferencia de fondos');
  const [tokenInput, setTokenInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const vesAccount = accounts.find((a) => a.currency === 'VES') || accounts[0];
  const numAmount = parseFloat(amount.replace(',', '.')) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanAcc = accountNumber.replace(/[^0-9]/g, '');
    if (cleanAcc.length !== 20) {
      setError('El número de cuenta bancaria debe tener exactamente 20 dígitos.');
      return;
    }

    if (!docNumber.trim()) {
      setError('Por favor ingrese la cédula o RIF del beneficiario.');
      return;
    }

    if (numAmount <= 0) {
      setError('Por favor ingrese un monto superior a Bs. 0,00.');
      return;
    }

    if (numAmount > vesAccount.availableBalance) {
      setError('Saldo disponible insuficiente en su cuenta corriente en bolívares.');
      return;
    }

    if (!tokenInput.trim() || tokenInput.length < 6) {
      setError('Debe ingresar la Clave Dinámica Ami Ven de 6 dígitos.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const bank = VENEZUELAN_BANKS.find(
        (b) => b.code === (transferType === 'MISMO_BANCO' ? '0102' : targetBankCode)
      );
      const isInternal = transferType === 'MISMO_BANCO' || targetBankCode === '0102';
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
        type: isInternal ? 'TRANSFERENCIA_BDV' : 'TRANSFERENCIA_INTERBANCARIA',
        category: 'transfer',
        description: isInternal
          ? `Transferencia a Terceros BDV`
          : `Transferencia Inmediata a ${bank?.shortName}`,
        senderName: 'CARLOS ENRIQUE PEREZ',
        senderDoc: 'V-24891302',
        senderAccountOrPhone: vesAccount.accountNumber,
        recipientName: beneficiaryName || `Beneficiario ${docType}-${docNumber}`,
        recipientDoc: `${docType}-${docNumber}`,
        recipientBank: isInternal ? 'Banco de Venezuela' : (bank?.name || 'Otro Banco'),
        recipientBankCode: isInternal ? '0102' : targetBankCode,
        recipientAccountOrPhone: cleanAcc,
        amount: numAmount,
        currency: 'VES',
        fee: 0.0,
        status: 'EXITOSA',
        concept: concept || 'Transferencia electrónica',
      };

      setIsSubmitting(false);
      onExecuteTransfer(newTx);
    }, 750);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#002855] via-[#003875] to-[#001938] rounded-3xl p-6 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Send className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              Transferencias Bancarias
              <span className="bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Liquidación Inmediata
              </span>
            </h1>
            <p className="text-xs text-blue-100">
              Transferencias a cuentas Banco de Venezuela y a otros bancos nacionales en tiempo real.
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

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        {/* Type Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setTransferType('MISMO_BANCO');
              setTargetBankCode('0102');
            }}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
              transferType === 'MISMO_BANCO'
                ? 'bg-[#002855] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mismo Banco (Cuentas BDV)
          </button>
          <button
            type="button"
            onClick={() => {
              setTransferType('OTROS_BANCOS');
              setTargetBankCode('0134');
            }}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-xl transition-all ${
              transferType === 'OTROS_BANCOS'
                ? 'bg-[#002855] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Otros Bancos (Inmediatas BCV)
          </button>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Origin account summary */}
        <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cuenta a Debitar</span>
            <span className="font-bold text-slate-800">{vesAccount.name}</span>
            <span className="text-slate-500 font-mono block">{vesAccount.accountNumber}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Saldo Disponible</span>
            <span className="text-base font-black font-mono text-[#002855]">
              Bs. {vesAccount.availableBalance.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* Target Bank if Otros Bancos */}
        {transferType === 'OTROS_BANCOS' && (
          <div>
            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">
              Banco Destino
            </label>
            <select
              value={targetBankCode}
              onChange={(e) => setTargetBankCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#002855]"
            >
              {VENEZUELAN_BANKS.filter((b) => b.code !== '0102').map((bank) => (
                <option key={bank.code} value={bank.code}>
                  {bank.code} - {bank.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* 20 Digit Account Number */}
        <div>
          <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">
            Número de Cuenta Destino (20 dígitos)
          </label>
          <input
            type="text"
            maxLength={20}
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="01020000000000000000"
            className="w-full bg-slate-50 border border-slate-300 text-sm font-mono font-bold text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
          />
        </div>

        {/* Beneficiary Name & Doc */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">
              Nombre o Razón Social
            </label>
            <input
              type="text"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              placeholder="Nombre del beneficiario"
              className="w-full bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
            />
          </div>

          <div>
            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">
              Cédula / RIF del Beneficiario
            </label>
            <div className="flex gap-2">
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#002855]"
              >
                <option value="V">V</option>
                <option value="E">E</option>
                <option value="J">J</option>
                <option value="G">G</option>
              </select>
              <input
                type="text"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="21492814"
                className="flex-1 bg-slate-50 border border-slate-300 text-xs font-mono font-bold text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
              />
            </div>
          </div>
        </div>

        {/* Amount & Concept */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">
              Monto a Transferir (Bs.)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 font-bold text-slate-400 text-xs">
                Bs.
              </span>
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="w-full bg-slate-50 border border-slate-300 text-sm font-mono font-black text-[#002855] rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-600 font-bold uppercase tracking-wider mb-1 block">
              Concepto
            </label>
            <input
              type="text"
              maxLength={45}
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="Ej. Alquiler, honorarios..."
              className="w-full bg-slate-50 border border-slate-300 text-xs font-medium text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
            />
          </div>
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
              <span>Procesando Transferencia...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Transferir Fondos</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
