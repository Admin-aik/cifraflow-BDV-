import React, { useState } from 'react';
import {
  Smartphone,
  Send,
  Shield,
  Star,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
} from 'lucide-react';
import {
  BankAccount,
  BankInstitution,
  ContactFavorite,
  ExchangeRates,
  Transaction,
} from '../types';
import { VENEZUELAN_BANKS, INITIAL_FAVORITES } from '../data/bdvData';

interface PagoMovilViewProps {
  accounts: BankAccount[];
  rates: ExchangeRates;
  onExecutePagoMovil: (tx: Transaction) => void;
  onOpenAmiVen: () => void;
}

export const PagoMovilView: React.FC<PagoMovilViewProps> = ({
  accounts,
  rates,
  onExecutePagoMovil,
  onOpenAmiVen,
}) => {
  const [docType, setDocType] = useState<'V' | 'E' | 'J' | 'G' | 'P'>('V');
  const [docNumber, setDocNumber] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('0412');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedBankCode, setSelectedBankCode] = useState('0102');
  const [amountBs, setAmountBs] = useState('');
  const [concept, setConcept] = useState('');
  const [tokenInput, setTokenInput] = useState('');
  const [sourceAccountId, setSourceAccountId] = useState(
    accounts.find((a) => a.currency === 'VES')?.id || accounts[0].id
  );
  const [saveToFavorites, setSaveToFavorites] = useState(false);
  const [alias, setAlias] = useState('');
  const [bankSearch, setBankSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [favorites, setFavorites] = useState<ContactFavorite[]>(INITIAL_FAVORITES);

  const selectedAccount = accounts.find((a) => a.id === sourceAccountId) || accounts[0];
  const isForeignSource = selectedAccount.currency !== 'VES';

  const numericAmount = parseFloat(amountBs.replace(',', '.')) || 0;
  // Calculate equivalent in USD if paying with foreign account
  const debitAmountForeign = isForeignSource ? numericAmount / rates.usd : 0;

  // Filter banks
  const filteredBanks = VENEZUELAN_BANKS.filter(
    (b) =>
      b.name.toLowerCase().includes(bankSearch.toLowerCase()) ||
      b.shortName.toLowerCase().includes(bankSearch.toLowerCase()) ||
      b.code.includes(bankSearch)
  );

  const handleSelectFavorite = (fav: ContactFavorite) => {
    setDocType(fav.docType);
    setDocNumber(fav.docNumber);
    if (fav.phone.length >= 10) {
      setPhonePrefix(fav.phone.slice(0, 4));
      setPhoneNumber(fav.phone.slice(4));
    }
    setSelectedBankCode(fav.bankCode);
    setConcept(`Pago a ${fav.name}`);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!docNumber.trim() || docNumber.length < 5) {
      setError('Por favor ingrese un número de cédula o RIF válido.');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length !== 7) {
      setError('Por favor complete los 7 dígitos del número de teléfono celular.');
      return;
    }
    if (numericAmount <= 0) {
      setError('Por favor ingrese un monto superior a Bs. 0,00.');
      return;
    }
    if (isForeignSource) {
      if (debitAmountForeign > selectedAccount.availableBalance) {
        setError(`Saldo insuficiente en cuenta en divisas. Disponible: $${selectedAccount.availableBalance.toFixed(2)} USD.`);
        return;
      }
    } else {
      if (numericAmount > selectedAccount.availableBalance) {
        setError(`Saldo insuficiente en bolívares. Disponible: Bs. ${selectedAccount.availableBalance.toLocaleString('es-VE', { minimumFractionDigits: 2 })}.`);
        return;
      }
    }

    if (!tokenInput.trim() || tokenInput.length < 6) {
      setError('Debe ingresar la Clave Dinámica Ami Ven de 6 dígitos para autorizar.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const recipientBankObj = VENEZUELAN_BANKS.find((b) => b.code === selectedBankCode);
      const isInternal = selectedBankCode === '0102';
      const fee = isInternal ? 0.0 : +(numericAmount * 0.003).toFixed(2); // 0.3% interbank fee
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
        type: 'PAGO_MOVIL',
        category: 'mobile_payment',
        description: `PagomóvilBDV a ${docType}-${docNumber}`,
        senderName: 'CARLOS ENRIQUE PEREZ',
        senderDoc: 'V-24891302',
        senderAccountOrPhone: '04129988776',
        recipientName: alias.trim() || `Beneficiario ${docType}-${docNumber}`,
        recipientDoc: `${docType}-${docNumber}`,
        recipientBank: recipientBankObj?.shortName || 'Banco Nacional',
        recipientBankCode: selectedBankCode,
        recipientAccountOrPhone: `${phonePrefix}${phoneNumber}`,
        amount: numericAmount,
        currency: 'VES',
        fee: fee,
        status: 'EXITOSA',
        concept: concept.trim() || 'Pago móvil personal',
      };

      if (saveToFavorites && !favorites.some((f) => f.phone === `${phonePrefix}${phoneNumber}`)) {
        const newFav: ContactFavorite = {
          id: `fav-${Date.now()}`,
          name: alias || `Contacto ${docNumber}`,
          docType,
          docNumber,
          phone: `${phonePrefix}${phoneNumber}`,
          bankCode: selectedBankCode,
          bankName: recipientBankObj?.shortName || '',
          alias: alias || `Contacto ${docNumber}`,
        };
        setFavorites((prev) => [newFav, ...prev]);
      }

      setIsSubmitting(false);
      onExecutePagoMovil(newTx);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header card */}
      <div className="bg-gradient-to-r from-[#002855] via-[#003875] to-[#C8102E] rounded-3xl p-6 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              PagomóvilBDV
              <span className="bg-[#FFD100] text-[#002855] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Instantáneo 24/7
              </span>
            </h1>
            <p className="text-xs text-blue-100">
              Pagos móviles a clientes Banco de Venezuela y a cualquier banco del país en segundos.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAmiVen}
          className="flex items-center gap-2 px-3.5 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-xs font-bold border border-white/20 transition-all text-white"
        >
          <Shield className="w-4 h-4 text-[#FFD100]" />
          <span>Obtener Clave Ami Ven</span>
        </button>
      </div>

      {/* Frequent Contacts Directory Ribbon */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Contactos Frecuentes Guardados
          </span>
          <span className="text-[11px] text-slate-400">Selecciona para autocompletar datos</span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {favorites.map((fav) => (
            <button
              key={fav.id}
              onClick={() => handleSelectFavorite(fav)}
              className="shrink-0 p-2.5 bg-slate-50 hover:bg-red-50/50 border border-slate-200 hover:border-red-200 rounded-xl text-left transition-all group"
            >
              <div className="text-xs font-bold text-slate-800 group-hover:text-[#C8102E] truncate max-w-[140px]">
                {fav.name}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                {fav.phone} • {fav.bankName}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Payment Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-700 font-medium">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* 1. Account Source */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            1. Cuenta Origen a Debitar
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {accounts.slice(0, 2).map((acc) => {
              const isSelected = acc.id === sourceAccountId;
              return (
                <div
                  key={acc.id}
                  onClick={() => setSourceAccountId(acc.id)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#002855] bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-800">{acc.name}</span>
                    <span
                      className={`font-mono font-bold ${
                        isSelected ? 'text-[#002855]' : 'text-slate-600'
                      }`}
                    >
                      {acc.currency === 'USD' ? '$' : 'Bs.'}{' '}
                      {acc.availableBalance.toLocaleString('es-VE', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">{acc.accountNumber}</p>
                </div>
              );
            })}
          </div>
          {isForeignSource && (
            <div className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                Pagarás en Bolívares debitando tu cuenta en USD a la tasa oficial BCV de{' '}
                <strong>Bs. {rates.usd.toFixed(2)}</strong>.
              </span>
            </div>
          )}
        </div>

        {/* 2. Beneficiary details */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            2. Datos del Beneficiario
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Document type + Document Number */}
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1 block">
                Cédula o RIF del Beneficiario
              </label>
              <div className="flex gap-2">
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as any)}
                  className="bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#002855]"
                >
                  <option value="V">V - Venezolano</option>
                  <option value="E">E - Extranjero</option>
                  <option value="J">J - Jurídico</option>
                  <option value="G">G - Gubernamental</option>
                  <option value="P">P - Pasaporte</option>
                </select>

                <input
                  type="text"
                  value={docNumber}
                  onChange={(e) => setDocNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Ej. 24891302"
                  className="flex-1 bg-slate-50 border border-slate-300 text-xs font-mono font-semibold text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
                />
              </div>
            </div>

            {/* Phone prefix + Phone Number */}
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1 block">
                Teléfono Celular Afiliado
              </label>
              <div className="flex gap-2">
                <select
                  value={phonePrefix}
                  onChange={(e) => setPhonePrefix(e.target.value)}
                  className="bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#002855]"
                >
                  <option value="0412">0412 (Digitel)</option>
                  <option value="0414">0414 (Movistar)</option>
                  <option value="0424">0424 (Movistar)</option>
                  <option value="0416">0416 (Movilnet)</option>
                  <option value="0426">0426 (Movilnet)</option>
                </select>

                <input
                  type="text"
                  maxLength={7}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="7 dígitos (ej. 3456789)"
                  className="flex-1 bg-slate-50 border border-slate-300 text-xs font-mono font-semibold text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
                />
              </div>
            </div>
          </div>

          {/* Receiving Bank Selector */}
          <div>
            <label className="text-xs text-slate-500 font-semibold mb-1 block">
              Banco Receptor
            </label>
            <select
              value={selectedBankCode}
              onChange={(e) => setSelectedBankCode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#002855]"
            >
              {filteredBanks.map((bank) => (
                <option key={bank.code} value={bank.code}>
                  {bank.code} - {bank.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Amount and Concept */}
        <div className="space-y-4 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            3. Monto y Concepto
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1 block">
                Monto en Bolívares (VES)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 font-bold text-slate-400 text-xs">
                  Bs.
                </span>
                <input
                  type="number"
                  step="any"
                  value={amountBs}
                  onChange={(e) => setAmountBs(e.target.value)}
                  placeholder="0,00"
                  className="w-full bg-slate-50 border border-slate-300 text-sm font-mono font-black text-[#002855] rounded-xl pl-10 pr-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
                />
              </div>
              {isForeignSource && numericAmount > 0 && (
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Equivalente a debitar: <strong>${debitAmountForeign.toFixed(2)} USD</strong>
                </span>
              )}
            </div>

            <div>
              <label className="text-xs text-slate-500 font-semibold mb-1 block">
                Concepto (opcional)
              </label>
              <input
                type="text"
                maxLength={40}
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="Ej. Pago almuerzo, farmacia..."
                className="w-full bg-slate-50 border border-slate-300 text-xs font-medium text-slate-800 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#002855]"
              />
            </div>
          </div>

          {/* Favorite save toggle */}
          <div className="flex items-center gap-3 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={saveToFavorites}
                onChange={(e) => setSaveToFavorites(e.target.checked)}
                className="w-4 h-4 text-[#C8102E] rounded border-slate-300 focus:ring-[#C8102E]"
              />
              <span>Guardar en mis contactos frecuentes</span>
            </label>
            {saveToFavorites && (
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Alias o nombre (ej. Mamá, Abasto)"
                className="bg-slate-50 border border-slate-300 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#002855]"
              />
            )}
          </div>
        </div>

        {/* 4. Security & Ami Ven Token */}
        <div className="space-y-2 pt-2 border-t border-slate-100 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#002855] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#C8102E]" />
              4. Autorización con Clave Dinámica Ami Ven
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
              placeholder="Ingrese código de 6 dígitos"
              className="w-full sm:max-w-xs bg-white border border-slate-300 text-center text-base tracking-widest font-mono font-black text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-[#002855]"
            />
            <button
              type="button"
              onClick={() => setTokenInput('839214')}
              className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
              title="Pegar clave activa de Ami Ven de prueba"
            >
              Autocompletar Token
            </button>
          </div>
          <span className="text-[10px] text-slate-500 block">
            Código temporal de seguridad emitido por la aplicación móvil Ami Ven BDV.
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#002855] via-[#003875] to-[#C8102E] hover:from-[#001e42] hover:to-[#B30006] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-blue-950/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Procesando PagomóvilBDV...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Pagar con PagomóvilBDV</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
