import React, { useState } from 'react';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Smartphone,
  ArrowLeftRight,
  Zap,
  CreditCard,
  Copy,
  Check,
  Eye,
  EyeOff,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Building,
  Gamepad2,
  Sparkles,
} from 'lucide-react';
import { BankAccount, BankCard, ExchangeRates, Transaction } from '../types';
import { NavTab } from './Navigation';

interface DashboardViewProps {
  accounts: BankAccount[];
  cards: BankCard[];
  rates: ExchangeRates;
  recentTransactions: Transaction[];
  onSelectTab: (tab: NavTab) => void;
  onOpenReceipt: (tx: Transaction) => void;
  onOpenAmiVen: () => void;
  onPlayCifraflow?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  accounts,
  cards,
  rates,
  recentTransactions,
  onSelectTab,
  onOpenReceipt,
  onOpenAmiVen,
  onPlayCifraflow,
}) => {
  const [showBalances, setShowBalances] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const vesAccount = accounts.find((a) => a.currency === 'VES');
  const usdAccount = accounts.find((a) => a.currency === 'USD');
  const eurAccount = accounts.find((a) => a.currency === 'EUR');

  // Total in VES (including converted foreign currency)
  const totalInVes =
    (vesAccount?.balance || 0) +
    (usdAccount?.balance || 0) * rates.usd +
    (eurAccount?.balance || 0) * rates.eur;

  const totalInUsd = totalInVes / rates.usd;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/[^0-9]/g, ''));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const primaryCard = cards[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner: Posición Consolidada */}
      <div className="bg-gradient-to-br from-[#002855] via-[#003875] to-[#001938] rounded-3xl p-6 text-white shadow-xl border border-blue-900/40 relative overflow-hidden">
        {/* Background decorative watermark */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Building className="w-32 h-32" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-200/80">
                Posición Consolidada Global
              </span>
              <button
                onClick={() => setShowBalances(!showBalances)}
                className="p-1 text-blue-200 hover:text-white transition-colors"
                title={showBalances ? 'Ocultar saldos' : 'Mostrar saldos'}
              >
                {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cliente BDV Verificado</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <p className="text-xs text-blue-200/70 mb-1">Total disponible estimado en Bolívares</p>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white font-mono">
                {showBalances
                  ? `Bs. ${totalInVes.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  : '••••••••••••'}
              </div>
            </div>

            <div className="md:text-right bg-white/5 md:bg-transparent p-3 md:p-0 rounded-2xl border border-white/10 md:border-0">
              <p className="text-xs text-blue-200/70 mb-1">Equivalente según tasa oficial BCV</p>
              <div className="text-xl sm:text-2xl font-bold text-amber-300 font-mono">
                {showBalances ? `$ ${totalInUsd.toFixed(2)} USD` : '••••••'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <button
          onClick={() => onSelectTab('pagomovil')}
          className="flex flex-col items-center justify-center p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 group text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#C8102E] flex items-center justify-center mb-2.5 group-hover:bg-[#C8102E] group-hover:text-white transition-colors shadow-xs">
            <Smartphone className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">PagomóvilBDV</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Envío instantáneo</span>
        </button>

        <button
          onClick={() => onSelectTab('mesacambio')}
          className="flex flex-col items-center justify-center p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 group text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2.5 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-xs">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Mesa de Cambio</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Comprar / Vender Divisas</span>
        </button>

        <button
          onClick={() => onSelectTab('servicios')}
          className="flex flex-col items-center justify-center p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 group text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#002855] flex items-center justify-center mb-2.5 group-hover:bg-[#002855] group-hover:text-white transition-colors shadow-xs">
            <Zap className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Pago de Servicios</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Cantv, Corpoelec, Móviles</span>
        </button>

        <button
          onClick={onOpenAmiVen}
          className="flex flex-col items-center justify-center p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 group text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold text-slate-800">Clave Dinámica</span>
          <span className="text-[10px] text-slate-400 mt-0.5">Token Ami Ven 60s</span>
        </button>
      </div>

      {/* CIFRAFLOW FINANCIERO EDUCATIVO BANNER */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-cyan-500/50 bg-gradient-to-r from-[#050f24] via-[#091838] to-[#15061c] p-5 sm:p-6 text-white shadow-xl shadow-cyan-950/30">
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-[#ff007f]/10 via-[#00f3ff]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00f3ff] via-[#b026ff] to-[#ff007f] p-0.5 shadow-[0_0_20px_rgba(0,243,255,0.4)] shrink-0 hidden sm:flex items-center justify-center">
              <div className="w-full h-full bg-[#060e22] rounded-[14px] flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-[#00f3ff] animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="bg-[#ff007f] text-white text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md tracking-wider">
                  ¡NUEVO JUEGO EDTECH BDV!
                </span>
                <span className="text-xs font-mono text-cyan-300 font-bold">
                  SISTEMA INTERACTIVO CIFRAFLOW
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                CifraFlow Financiero — Desafío de Adivinanzas, Trivias & Acertijos BDV
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                Aprende y pon a prueba tus habilidades en <span className="text-[#00f3ff] font-bold">PagomóvilBDV</span>, <span className="text-[#FFD100] font-bold">Ami Ven</span>, <span className="text-[#34d399] font-bold">Bolsa BVC</span> y ciberseguridad con los 4 cadetes adolescentes Jorge, Ircar, Iván y Carlos.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onPlayCifraflow) {
                onPlayCifraflow();
              } else {
                onSelectTab('cifraflow');
              }
            }}
            className="w-full md:w-auto shrink-0 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#00f3ff] via-[#0088ff] to-[#ff007f] hover:from-[#00f3ff] hover:to-[#ff007f] text-slate-950 font-black text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(0,243,255,0.5)] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current text-slate-950" />
            <span>JUGAR CIFRAFLOW AHORA</span>
          </button>
        </div>
      </div>

      {/* Accounts & Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Accounts List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#002855] flex items-center gap-2">
              <Wallet className="w-4 h-4 text-[#C8102E]" />
              Mis Cuentas Banco de Venezuela
            </h2>
            <span className="text-xs text-slate-500 font-medium">3 Cuentas Activas</span>
          </div>

          <div className="space-y-3">
            {accounts.map((acc) => {
              const isVes = acc.currency === 'VES';
              const isUsd = acc.currency === 'USD';
              return (
                <div
                  key={acc.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${
                            isVes ? 'bg-[#C8102E]' : isUsd ? 'bg-emerald-500' : 'bg-blue-600'
                          }`}
                        />
                        <h3 className="text-sm font-bold text-slate-800">{acc.name}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-xs font-mono text-slate-500">{acc.accountNumber}</span>
                        <button
                          onClick={() => handleCopy(acc.accountNumber, acc.id)}
                          className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                          title="Copiar número de cuenta completo de 20 dígitos"
                        >
                          {copiedId === acc.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Saldo Disponible
                      </span>
                      <span className="text-xl font-black font-mono text-[#002855]">
                        {showBalances ? (
                          <>
                            {acc.currency === 'USD' ? '$ ' : acc.currency === 'EUR' ? '€ ' : 'Bs. '}
                            {acc.availableBalance.toLocaleString('es-VE', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </>
                        ) : (
                          '••••••••'
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="text-slate-500 flex items-center gap-2">
                      <span>Tipo: {acc.type}</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-semibold">Operativa</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isVes ? (
                        <button
                          onClick={() => onSelectTab('pagomovil')}
                          className="text-[#C8102E] hover:text-red-700 font-bold hover:underline inline-flex items-center gap-0.5"
                        >
                          Pagar <ChevronRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          onClick={() => onSelectTab('mesacambio')}
                          className="text-amber-600 hover:text-amber-700 font-bold hover:underline inline-flex items-center gap-0.5"
                        >
                          Operar en Mesa <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Tarjeta Débito Digital & Limits */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#002855] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#C8102E]" />
              Tarjeta Débito Digital
            </h2>
            <button
              onClick={() => onSelectTab('tarjetas')}
              className="text-xs text-[#002855] font-bold hover:underline"
            >
              Ver todas
            </button>
          </div>

          {/* BDV Mastercard Débito Digital Card Graphic */}
          <div className="bg-gradient-to-tr from-[#001938] via-[#002855] to-[#0a3871] text-white p-5 rounded-3xl shadow-lg border border-blue-900/60 relative overflow-hidden space-y-4">
            {/* Holographic chip and contactless */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-7 bg-amber-200/90 rounded-md border border-amber-300 flex items-center justify-center shadow-inner">
                  <div className="w-6 h-5 border border-amber-500/50 rounded-xs" />
                </div>
                <span className="text-[10px] tracking-widest text-blue-200/80 font-bold uppercase">
                  BDV DIGITAL
                </span>
              </div>
              <span className="text-xs font-black tracking-widest text-white italic">
                Mastercard
              </span>
            </div>

            {/* Masked number */}
            <div className="py-2">
              <span className="text-[10px] text-blue-200/60 uppercase block">Número de Tarjeta</span>
              <span className="text-base font-mono font-bold tracking-widest text-white">
                {primaryCard?.fullNumber || '5424 •••• •••• 7419'}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/10">
              <div>
                <span className="text-[9px] text-blue-200/60 uppercase block">Titular</span>
                <span className="font-semibold tracking-wider text-[11px]">CARLOS E. PEREZ</span>
              </div>
              <div>
                <span className="text-[9px] text-blue-200/60 uppercase block">Vence</span>
                <span className="font-mono font-semibold text-[11px]">{primaryCard?.expiry}</span>
              </div>
              <div>
                <span className="text-[9px] text-blue-200/60 uppercase block">CVV Dinámico</span>
                <span className="font-mono font-bold text-amber-300 text-[11px]">
                  {primaryCard?.cvv}
                </span>
              </div>
            </div>
          </div>

          {/* Quick toggle info */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Compras por Internet</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                Activas
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">BiopagoBDV Huella</span>
              <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                Afiliado
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Límite Diario Puntos</span>
              <span className="font-mono font-bold text-[#002855]">Bs. 120.000,00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Movements with Receipt Access */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-[#002855]">
              Últimos Movimientos en BDVenlínea
            </h2>
            <p className="text-xs text-slate-500">Haz clic en cualquier operación para ver su comprobante oficial</p>
          </div>
          <button
            onClick={() => onSelectTab('historial')}
            className="text-xs text-[#002855] font-bold hover:underline inline-flex items-center gap-1"
          >
            Ver Historial Completo <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentTransactions.slice(0, 5).map((tx) => {
            const isPositive = tx.recipientName.includes('CARLOS') || tx.description.includes('recibido');
            return (
              <div
                key={tx.id}
                onClick={() => onOpenReceipt(tx)}
                className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/80 rounded-xl px-2 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      tx.type === 'PAGO_MOVIL'
                        ? 'bg-red-50 text-[#C8102E]'
                        : tx.type === 'MESA_CAMBIO_COMPRA'
                        ? 'bg-amber-50 text-amber-600'
                        : tx.type === 'BIOPAGO'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-blue-50 text-[#002855]'
                    }`}
                  >
                    {isPositive ? (
                      <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#002855] transition-colors">
                      {tx.description}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <span>Ref: {tx.reference}</span>
                      <span>•</span>
                      <span>{tx.date}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div
                    className={`text-xs font-bold font-mono ${
                      isPositive ? 'text-emerald-600' : 'text-slate-800'
                    }`}
                  >
                    {isPositive ? '+' : '-'} {tx.currency === 'USD' ? '$' : tx.currency === 'EUR' ? '€' : 'Bs.'}{' '}
                    {tx.amount.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-[#C8102E] font-medium transition-colors">
                    Ver recibo BDV
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
