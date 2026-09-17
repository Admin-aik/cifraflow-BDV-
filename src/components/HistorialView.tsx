import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  ArrowDownLeft,
  ArrowUpRight,
  Printer,
  ChevronRight,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { Transaction } from '../types';

interface HistorialViewProps {
  transactions: Transaction[];
  onOpenReceipt: (tx: Transaction) => void;
}

export const HistorialView: React.FC<HistorialViewProps> = ({
  transactions,
  onOpenReceipt,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [currencyFilter, setCurrencyFilter] = useState<string>('all');

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.reference.includes(searchTerm) ||
      tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.concept.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || tx.category === categoryFilter;

    const matchesCurrency =
      currencyFilter === 'all' || tx.currency === currencyFilter;

    return matchesSearch && matchesCategory && matchesCurrency;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#002855] via-[#003875] to-[#001938] rounded-3xl p-6 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <FileText className="w-6 h-6 text-[#FFD100]" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              Historial de Movimientos y Comprobantes
            </h1>
            <p className="text-xs text-blue-100">
              Consulta, descarga e imprime los comprobantes electrónicos de tus operaciones en BDVenlínea.
            </p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-3.5 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold border border-white/20 transition-all text-white"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir Reporte</span>
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search input */}
          <div className="relative sm:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por referencia, nombre o concepto..."
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#002855]"
            />
          </div>

          {/* Category filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#002855]"
            >
              <option value="all">Todas las Categorías</option>
              <option value="mobile_payment">PagomóvilBDV</option>
              <option value="exchange">Mesa de Cambio</option>
              <option value="transfer">Transferencias</option>
              <option value="service">Pago de Servicios</option>
              <option value="pos">Biopago / Puntos</option>
            </select>
          </div>

          {/* Currency filter */}
          <div>
            <select
              value={currencyFilter}
              onChange={(e) => setCurrencyFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#002855]"
            >
              <option value="all">Todas las Monedas</option>
              <option value="VES">Bolívares (VES)</option>
              <option value="USD">Dólares (USD)</option>
              <option value="EUR">Euros (EUR)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>{filteredTransactions.length} operaciones registradas</span>
          <span>BDVenlínea Oficial</span>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">
            No se encontraron movimientos con los filtros especificados.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTransactions.map((tx) => {
              const isPositive =
                tx.recipientName.includes('CARLOS') || tx.description.includes('recibido');

              return (
                <div
                  key={tx.id}
                  onClick={() => onOpenReceipt(tx)}
                  className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        tx.category === 'mobile_payment'
                          ? 'bg-red-50 text-[#C8102E]'
                          : tx.category === 'exchange'
                          ? 'bg-amber-50 text-amber-600'
                          : tx.category === 'service'
                          ? 'bg-blue-50 text-[#002855]'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isPositive ? (
                        <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-[#002855] transition-colors">
                          {tx.description}
                        </h4>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full uppercase">
                          {tx.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-sans">
                        <span className="font-mono font-semibold text-slate-600">
                          Ref: {tx.reference}
                        </span>
                        <span>•</span>
                        <span>{tx.date}</span>
                        {tx.concept && (
                          <>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline italic text-slate-500 truncate max-w-[200px]">
                              {tx.concept}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`text-sm font-black font-mono ${
                        isPositive ? 'text-emerald-600' : 'text-slate-800'
                      }`}
                    >
                      {isPositive ? '+' : '-'} {tx.currency === 'USD' ? '$' : tx.currency === 'EUR' ? '€' : 'Bs.'}{' '}
                      {tx.amount.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                    </div>
                    <span className="text-[10px] text-[#C8102E] font-bold group-hover:underline inline-flex items-center gap-0.5">
                      Ver Comprobante <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
