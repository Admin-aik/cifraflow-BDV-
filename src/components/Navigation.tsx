import React from 'react';
import {
  LayoutDashboard,
  Smartphone,
  ArrowLeftRight,
  Send,
  Zap,
  CreditCard,
  FileText,
  Gamepad2,
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'pagomovil'
  | 'mesacambio'
  | 'transferencias'
  | 'servicios'
  | 'tarjetas'
  | 'historial'
  | 'cifraflow';

interface NavigationProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onSelectTab }) => {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode; badge?: string; badgeColor?: string }[] = [
    { id: 'dashboard', label: 'Posición Global', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'cifraflow', label: 'CifraFlow Financiero', icon: <Gamepad2 className="w-4 h-4 text-[#ff007f]" />, badge: 'Juego BDV', badgeColor: 'bg-gradient-to-r from-[#00f3ff]/20 to-[#ff007f]/20 text-[#ff007f] border border-[#ff007f]/40 animate-pulse' },
    { id: 'pagomovil', label: 'PagomóvilBDV', icon: <Smartphone className="w-4 h-4" />, badge: 'Inmediato' },
    { id: 'mesacambio', label: 'Mesa de Cambio', icon: <ArrowLeftRight className="w-4 h-4" />, badge: 'BCV' },
    { id: 'transferencias', label: 'Transferencias', icon: <Send className="w-4 h-4" /> },
    { id: 'servicios', label: 'Pago de Servicios', icon: <Zap className="w-4 h-4" /> },
    { id: 'tarjetas', label: 'Tarjetas & Biopago', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'historial', label: 'Historial', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-[95px] z-30 shadow-xs overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 sm:gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 py-3.5 px-3 sm:px-4 text-xs font-bold transition-all relative whitespace-nowrap shrink-0 ${
                isActive
                  ? 'text-[#002855] border-b-2 border-[#C8102E]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className={isActive ? 'text-[#C8102E]' : 'text-slate-400'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${
                    tab.badgeColor
                      ? tab.badgeColor
                      : isActive
                      ? 'bg-red-100 text-red-700'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
