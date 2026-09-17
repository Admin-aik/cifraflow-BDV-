import React, { useState, useEffect } from 'react';
import {
  INITIAL_ACCOUNTS,
  INITIAL_CARDS,
  INITIAL_RATES,
  INITIAL_TRANSACTIONS,
} from './data/bdvData';
import { BankAccount, BankCard, ExchangeRates, Transaction } from './types';
import { Header } from './components/Header';
import { Navigation, NavTab } from './components/Navigation';
import { DashboardView } from './components/DashboardView';
import { PagoMovilView } from './components/PagoMovilView';
import { MesaCambioView } from './components/MesaCambioView';
import { TransferenciasView } from './components/TransferenciasView';
import { ServiciosView } from './components/ServiciosView';
import { TarjetasView } from './components/TarjetasView';
import { HistorialView } from './components/HistorialView';
import { CifraflowGameApp } from './components/CifraflowGameApp';
import { CifraPhase } from './types/cifraflow';
import { ReceiptModal } from './components/ReceiptModal';
import { AmiVenModal } from './components/AmiVenModal';
import { EvaAssistantModal } from './components/EvaAssistantModal';
import { Bot, Shield, Phone, ExternalLink, ArrowLeft } from 'lucide-react';
import { BdvLogo } from './components/BdvLogo';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('cifraflow');
  const [cifraflowPhase, setCifraflowPhase] = useState<CifraPhase>('FASE_0_LOGIN');
  const [accounts, setAccounts] = useState<BankAccount[]>(INITIAL_ACCOUNTS);
  const [cards, setCards] = useState<BankCard[]>(INITIAL_CARDS);
  const [rates, setRates] = useState<ExchangeRates>(INITIAL_RATES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // Return to game menu (FASE_2_MODULES) rather than login
  const handleReturnToCifraflowMenu = () => {
    setCifraflowPhase('FASE_2_MODULES');
    setActiveTab('cifraflow');
  };

  // Modals
  const [activeReceipt, setActiveReceipt] = useState<Transaction | null>(null);
  const [isAmiVenOpen, setIsAmiVenOpen] = useState(false);
  const [isEvaOpen, setIsEvaOpen] = useState(false);

  // Fetch rates if available from backend
  const refreshRates = () => {
    fetch('/api/rates')
      .then((res) => res.json())
      .then((data) => {
        if (data.usd && data.eur) {
          setRates((prev) => ({
            ...prev,
            usd: data.usd,
            eur: data.eur,
            lastUpdated: new Date().toLocaleTimeString('es-VE', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          }));
        }
      })
      .catch(() => {
        // Fallback already in place
      });
  };

  useEffect(() => {
    refreshRates();
  }, []);

  // Handle Pago Movil execution
  const handleExecutePagoMovil = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);

    // Deduct from account
    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.currency === 'VES') {
          return {
            ...acc,
            balance: acc.balance - newTx.amount - (newTx.fee || 0),
            availableBalance: acc.availableBalance - newTx.amount - (newTx.fee || 0),
          };
        }
        return acc;
      })
    );

    setActiveReceipt(newTx);
  };

  // Handle Mesa de Cambio execution
  const handleExecuteExchange = (
    type: 'COMPRA' | 'VENTA',
    foreignCurrency: 'USD' | 'EUR',
    foreignAmount: number,
    vesAmount: number,
    fee: number,
    _rate: number,
    newTx: Transaction
  ) => {
    setTransactions((prev) => [newTx, ...prev]);

    setAccounts((prev) =>
      prev.map((acc) => {
        // Bolívares account
        if (acc.currency === 'VES') {
          const newVesBal =
            type === 'COMPRA'
              ? acc.balance - vesAmount
              : acc.balance + vesAmount;
          return {
            ...acc,
            balance: newVesBal,
            availableBalance: newVesBal,
          };
        }

        // Foreign currency account
        if (acc.currency === foreignCurrency) {
          const newForeignBal =
            type === 'COMPRA'
              ? acc.balance + foreignAmount
              : acc.balance - foreignAmount;
          return {
            ...acc,
            balance: newForeignBal,
            availableBalance: newForeignBal,
          };
        }

        return acc;
      })
    );

    setActiveReceipt(newTx);
  };

  // Handle Transfer
  const handleExecuteTransfer = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);

    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.currency === 'VES') {
          return {
            ...acc,
            balance: acc.balance - newTx.amount,
            availableBalance: acc.availableBalance - newTx.amount,
          };
        }
        return acc;
      })
    );

    setActiveReceipt(newTx);
  };

  // Handle Service Payment
  const handleExecuteServicePayment = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);

    setAccounts((prev) =>
      prev.map((acc) => {
        if (acc.currency === 'VES') {
          return {
            ...acc,
            balance: acc.balance - newTx.amount,
            availableBalance: acc.availableBalance - newTx.amount,
          };
        }
        return acc;
      })
    );

    setActiveReceipt(newTx);
  };

  // Update card settings
  const handleUpdateCardSettings = (cardId: string, updates: Partial<BankCard>) => {
    setCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, ...updates } : c))
    );
  };

  // If user selected CifraFlow Financiero game
  if (activeTab === 'cifraflow') {
    return (
      <CifraflowGameApp
        rates={rates}
        onRefreshRates={refreshRates}
        initialPhase={cifraflowPhase}
        onExitToBanking={() => {
          setCifraflowPhase('FASE_2_MODULES');
          setActiveTab('dashboard');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] text-slate-900 flex flex-col font-sans">
      {/* Top Banner: Modo Simulador de Cuenta BDV (Educación Financiera Juvenil) */}
      <div className="bg-[#002855] text-white border-b-2 border-[#FFD100] py-2 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C8102E] text-white font-mono text-[10px] font-black uppercase tracking-wider shadow-xs">
              SIMULADOR DE CUENTA BDV
            </span>
            <span className="text-slate-100 font-medium">
              Plataforma Educativa Oficial Banco de Venezuela · Modo Entrenamiento Práctico
            </span>
          </div>

          <button
            type="button"
            onClick={handleReturnToCifraflowMenu}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#00f3ff] via-[#00c8ff] to-[#00f3ff] hover:brightness-110 text-slate-950 font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.4)] flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Volver a Menú de Retos CifraFlow BDV</span>
          </button>
        </div>
      </div>

      {/* Top Header */}
      <Header
        rates={rates}
        onOpenAmiVen={() => setIsAmiVenOpen(true)}
        onOpenEva={() => setIsEvaOpen(true)}
        onQuickTransfer={() => setActiveTab('pagomovil')}
        onOpenCifraflow={handleReturnToCifraflowMenu}
      />

      {/* Navigation Tabs */}
      <Navigation
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'cifraflow') {
            handleReturnToCifraflowMenu();
          } else {
            setActiveTab(tab);
          }
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <DashboardView
            accounts={accounts}
            cards={cards}
            rates={rates}
            recentTransactions={transactions}
            onSelectTab={setActiveTab}
            onOpenReceipt={setActiveReceipt}
            onOpenAmiVen={() => setIsAmiVenOpen(true)}
            onPlayCifraflow={handleReturnToCifraflowMenu}
          />
        )}

        {activeTab === 'pagomovil' && (
          <PagoMovilView
            accounts={accounts}
            rates={rates}
            onExecutePagoMovil={handleExecutePagoMovil}
            onOpenAmiVen={() => setIsAmiVenOpen(true)}
          />
        )}

        {activeTab === 'mesacambio' && (
          <MesaCambioView
            accounts={accounts}
            rates={rates}
            onExecuteExchange={handleExecuteExchange}
            onOpenAmiVen={() => setIsAmiVenOpen(true)}
          />
        )}

        {activeTab === 'transferencias' && (
          <TransferenciasView
            accounts={accounts}
            onExecuteTransfer={handleExecuteTransfer}
            onOpenAmiVen={() => setIsAmiVenOpen(true)}
          />
        )}

        {activeTab === 'servicios' && (
          <ServiciosView
            accounts={accounts}
            onExecuteServicePayment={handleExecuteServicePayment}
            onOpenAmiVen={() => setIsAmiVenOpen(true)}
          />
        )}

        {activeTab === 'tarjetas' && (
          <TarjetasView
            cards={cards}
            onUpdateCardSettings={handleUpdateCardSettings}
          />
        )}

        {activeTab === 'historial' && (
          <HistorialView
            transactions={transactions}
            onOpenReceipt={setActiveReceipt}
          />
        )}
      </main>

      {/* Floating Eva Button for quick support */}
      <button
        onClick={() => setIsEvaOpen(true)}
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#002855] to-[#001e42] hover:from-[#003875] hover:to-[#002855] text-white rounded-full shadow-2xl border-2 border-[#FFD100]/40 transition-transform hover:scale-105 active:scale-95 group"
        title="Consultar a Eva, Asistente BDV"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#C8102E] to-[#FFD100] flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-[#002855] rounded-full" />
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-xs font-bold block leading-none">Eva Asistente</span>
          <span className="text-[10px] text-blue-200 leading-none">Ayuda BDV 24/7</span>
        </div>
      </button>

      {/* Modals */}
      <ReceiptModal
        transaction={activeReceipt}
        onClose={() => setActiveReceipt(null)}
      />

      <AmiVenModal
        isOpen={isAmiVenOpen}
        onClose={() => setIsAmiVenOpen(false)}
      />

      <EvaAssistantModal
        isOpen={isEvaOpen}
        onClose={() => setIsEvaOpen(false)}
        onNavigateToTab={(tab) => {
          setActiveTab(tab as NavTab);
          setIsEvaOpen(false);
        }}
      />

      {/* Institutional Footer */}
      <footer className="bg-[#001938] text-slate-400 text-xs py-8 border-t-4 border-[#C8102E] mt-auto">
        <div className="max-w-7xl mx-auto px-4 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <BdvLogo variant="white" size="md" />

            <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" />
                Certificado SSL 256-bit
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-[#FFD100]" />
                Atención Telefónica: 0500-MICLAVE (6425283)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px] leading-relaxed text-slate-400">
            <div>
              <p className="font-bold text-slate-300 mb-1">Banco de Venezuela, S.A. Banco Universal</p>
              <p>RIF: G-20009997-6 • Capital suscrito y pagado. Supervisado por la Superintendencia de las Instituciones del Sector Bancario (SUDEBAN).</p>
            </div>
            <div>
              <p className="font-bold text-slate-300 mb-1">Protección y Garantías</p>
              <p>Depósitos amparados por el Fondo de Protección Social de los Depósitos Bancarios (FOGADE) conforme a la legislación vigente.</p>
            </div>
            <div>
              <p className="font-bold text-slate-300 mb-1">Seguridad Bancaria</p>
              <p>El Banco de Venezuela nunca le solicitará sus contraseñas ni códigos de su Clave Dinámica Ami Ven por correo electrónico o llamada telefónica.</p>
            </div>
          </div>

          <div className="text-center pt-4 border-t border-white/5 text-[10px] text-slate-500">
            © {new Date().getFullYear()} Banco de Venezuela, S.A. Todos los derechos reservados. BDVenlínea oficial.
          </div>
        </div>
      </footer>
    </div>
  );
}
