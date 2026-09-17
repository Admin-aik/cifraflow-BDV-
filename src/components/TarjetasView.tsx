import React, { useState } from 'react';
import {
  CreditCard,
  Eye,
  EyeOff,
  RefreshCw,
  ShieldCheck,
  Fingerprint,
  Globe,
  Lock,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { BankCard } from '../types';

interface TarjetasViewProps {
  cards: BankCard[];
  onUpdateCardSettings: (cardId: string, updates: Partial<BankCard>) => void;
}

export const TarjetasView: React.FC<TarjetasViewProps> = ({
  cards,
  onUpdateCardSettings,
}) => {
  const [selectedCardId, setSelectedCardId] = useState(cards[0].id);
  const [showFullNumber, setShowFullNumber] = useState(false);
  const [dynamicCvv, setDynamicCvv] = useState(cards[0].cvv);
  const [cvvTimer, setCvvTimer] = useState(300); // 5 min CVV validity
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  const handleGenerateNewCvv = () => {
    const newCode = Math.floor(100 + Math.random() * 900).toString();
    setDynamicCvv(newCode);
    setCvvTimer(300);
    onUpdateCardSettings(selectedCard.id, { cvv: newCode });
  };

  const handleToggleOnline = () => {
    onUpdateCardSettings(selectedCard.id, {
      onlinePurchasesEnabled: !selectedCard.onlinePurchasesEnabled,
    });
    triggerSuccess();
  };

  const handleToggleBiopago = () => {
    onUpdateCardSettings(selectedCard.id, {
      biopagoEnabled: !selectedCard.biopagoEnabled,
    });
    triggerSuccess();
  };

  const handleToggleInternational = () => {
    onUpdateCardSettings(selectedCard.id, {
      internationalEnabled: !selectedCard.internationalEnabled,
    });
    triggerSuccess();
  };

  const triggerSuccess = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#002855] via-[#003875] to-[#001938] rounded-3xl p-6 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <CreditCard className="w-6 h-6 text-[#FFD100]" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              Tarjetas & BiopagoBDV
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Débito Digital
              </span>
            </h1>
            <p className="text-xs text-blue-100">
              Control total de tus tarjetas de débito, crédito y autenticación biométrica BiopagoBDV.
            </p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800 font-semibold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Configuración de tarjeta actualizada con éxito en BDVenlínea.</span>
        </div>
      )}

      {/* Cards Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {cards.map((c) => {
          const isSelected = c.id === selectedCardId;
          return (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCardId(c.id);
                setDynamicCvv(c.cvv);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-[#002855] bg-white shadow-md'
                  : 'border-slate-200 bg-slate-50 hover:bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-slate-800 line-clamp-1">{c.title}</span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                  *{c.lastFour}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Titular: {c.holderName}</p>
            </button>
          );
        })}
      </div>

      {/* Interactive Card Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Visual Card Display */}
        <div className="space-y-3">
          <div className="relative aspect-[1.586/1] w-full max-w-md mx-auto bg-gradient-to-tr from-[#001938] via-[#002855] to-[#0d4a8e] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-blue-900/60 overflow-hidden flex flex-col justify-between">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />

            {/* Top row */}
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-8 bg-amber-200 rounded-md border border-amber-300 flex items-center justify-center shadow-inner">
                  <div className="w-7 h-5 border border-amber-600/40 rounded-xs" />
                </div>
                <span className="text-xs tracking-wider uppercase font-black text-white">
                  Banco de Venezuela
                </span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-600/90 text-white uppercase text-[10px] tracking-wider">
                {selectedCard.type.includes('DIGITAL') ? 'Digital' : 'Física'}
              </span>
            </div>

            {/* Middle: Card number */}
            <div className="py-3 relative z-10">
              <div className="text-lg sm:text-xl font-mono font-bold tracking-widest text-white drop-shadow-md">
                {showFullNumber
                  ? selectedCard.type.includes('MASTERCARD')
                    ? '5424 8190 2847 7419'
                    : '5018 9012 3456 3092'
                  : selectedCard.fullNumber}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setShowFullNumber(!showFullNumber)}
                  className="text-[11px] text-blue-200 hover:text-white flex items-center gap-1 transition-colors"
                >
                  {showFullNumber ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showFullNumber ? 'Ocultar número' : 'Ver número completo'}
                </button>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-end justify-between relative z-10 text-xs border-t border-white/15 pt-3">
              <div>
                <span className="text-[9px] text-blue-200 uppercase tracking-wider block">
                  Titular de la Cuenta
                </span>
                <span className="font-bold tracking-wide">{selectedCard.holderName}</span>
              </div>
              <div>
                <span className="text-[9px] text-blue-200 uppercase tracking-wider block">Vence</span>
                <span className="font-mono font-bold">{selectedCard.expiry}</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-amber-300 uppercase tracking-wider block font-bold">
                  CVV Dinámico
                </span>
                <span className="font-mono font-black text-amber-300 text-sm">
                  {dynamicCvv}
                </span>
              </div>
            </div>
          </div>

          {/* Dynamic CVV Refresh Box */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-800 block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Código de Seguridad Dinámico (CVV)
              </span>
              <p className="text-[11px] text-slate-400">
                Genera un código temporal para tus compras por internet seguras.
              </p>
            </div>
            <button
              onClick={handleGenerateNewCvv}
              className="px-3 py-2 bg-[#002855] hover:bg-[#001e42] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Generar Nuevo CVV
            </button>
          </div>
        </div>

        {/* Security & Switches Panel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#002855] flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C8102E]" />
            Configuración y Seguridad de la Tarjeta
          </h3>

          <div className="space-y-4 divide-y divide-slate-100">
            {/* Online purchases */}
            <div className="flex items-center justify-between pt-2">
              <div className="pr-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-600" />
                  <span className="text-xs font-bold text-slate-800">Compras por Internet</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Permite compras en comercios electrónicos nacionales con CVV dinámico.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleOnline}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  selectedCard.onlinePurchasesEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    selectedCard.onlinePurchasesEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* BiopagoBDV */}
            <div className="flex items-center justify-between pt-3">
              <div className="pr-4">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-[#C8102E]" />
                  <span className="text-xs font-bold text-slate-800">BiopagoBDV Huella Dactilar</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Pagar en supermercados y farmacias directamente con tu huella digital.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleBiopago}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  selectedCard.biopagoEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    selectedCard.biopagoEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* International */}
            <div className="flex items-center justify-between pt-3">
              <div className="pr-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-700" />
                  <span className="text-xs font-bold text-slate-800">Comercio Exterior / Divisas</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Permite pagos internacionales con cargo a tu Cuenta Moneda Extranjera BDV.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleInternational}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  selectedCard.internationalEnabled ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    selectedCard.internationalEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Limits section */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Límites Transaccionales Diarios
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Puntos de Venta (POS):</span>
                <span className="font-mono font-bold text-[#002855]">
                  Bs. {selectedCard.dailyPosLimit.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Compras por Internet:</span>
                <span className="font-mono font-bold text-[#002855]">
                  Bs. {selectedCard.dailyOnlineLimit.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
