export type Currency = 'VES' | 'USD' | 'EUR';

export interface BankAccount {
  id: string;
  accountNumber: string; // 20 digits standard Venezuelan format e.g. 0102-0123-45-0001234567
  name: string;
  type: 'CORRIENTE' | 'AHORRO' | 'DIVISAS_USD' | 'DIVISAS_EUR';
  currency: Currency;
  balance: number;
  availableBalance: number;
  blockedBalance: number;
}

export interface BankCard {
  id: string;
  type: 'DEBIT_MASTERCARD_DIGITAL' | 'DEBIT_MAESTRO_PHYSICAL' | 'CREDIT_TITANIUM';
  title: string;
  lastFour: string;
  fullNumber: string;
  holderName: string;
  expiry: string;
  cvv: string;
  isActive: boolean;
  onlinePurchasesEnabled: boolean;
  biopagoEnabled: boolean;
  internationalEnabled: boolean;
  dailyPosLimit: number;
  dailyOnlineLimit: number;
}

export interface BankInstitution {
  code: string;
  name: string;
  shortName: string;
  logoColor: string;
}

export interface Transaction {
  id: string;
  reference: string;
  date: string;
  type: 'PAGO_MOVIL' | 'TRANSFERENCIA_BDV' | 'TRANSFERENCIA_INTERBANCARIA' | 'MESA_CAMBIO_COMPRA' | 'MESA_CAMBIO_VENTA' | 'PAGO_SERVICIO' | 'BIOPAGO';
  category: 'transfer' | 'exchange' | 'service' | 'pos' | 'mobile_payment';
  description: string;
  senderName: string;
  senderDoc: string;
  senderAccountOrPhone?: string;
  recipientName: string;
  recipientDoc: string;
  recipientBank: string;
  recipientBankCode: string;
  recipientAccountOrPhone: string;
  amount: number;
  currency: Currency;
  fee: number;
  exchangeRate?: number;
  status: 'EXITOSA' | 'PENDIENTE' | 'RECHAZADA';
  concept: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  category: 'TELECOM' | 'SERVICIOS_PUBLICOS' | 'TV' | 'IMPUESTOS';
  code: string;
  identifierLabel: string;
  placeholder: string;
  minAmount?: number;
  fixedPackages?: number[];
  icon: string;
}

export interface ContactFavorite {
  id: string;
  name: string;
  docType: 'V' | 'E' | 'J' | 'G' | 'P';
  docNumber: string;
  phone: string;
  bankCode: string;
  bankName: string;
  alias: string;
}

export interface ExchangeRates {
  usd: number;
  eur: number;
  cny: number;
  rub: number;
  lastUpdated: string;
}
