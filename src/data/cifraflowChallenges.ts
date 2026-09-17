import { TeenAvatar, CifraChallenge, ChallengeCategory } from '../types/cifraflow';

export const CIFRAFLOW_PANORAMIC_BANNER = '/src/assets/images/cifraflow_panoramic_cover_1789574657992.jpg';

export const TEEN_AVATARS: TeenAvatar[] = [
  {
    id: 'jorge',
    name: 'Jorge',
    role: 'Operador Táctico',
    roleSubtitle: 'Operador Táctico de Accesos & Nómina',
    imageUrl: '/src/assets/images/avatar_jorge_tactico_1789574684831.jpg',
    colorName: 'Cian',
    neonColor: '#00f3ff',
    glowClass: 'shadow-[0_0_25px_rgba(0,243,255,0.45)] border-[#00f3ff]',
    appearance: 'Joven estudiante adolescente con cabello castaño oscuro, pulsera holográfica táctica y chaqueta cyber-cadete con líneas luminosas.',
    perk: '+15% Efectividad Finanzas & Blindaje FIDO2',
    perkBonusCategory: 'BANCA_FINTECH_BDV',
    perkPointsBonus: 25,
    quote: 'Ningún acceso no autorizado penetrará nuestro nodo bancario BDV.',
    badgeLabel: 'Cian #00f3ff',
    stats: { fintech: 95, security: 90, contracts: 80, trading: 75 },
  },
  {
    id: 'ircar',
    name: 'Ircar',
    role: 'Especialista Cloud',
    roleSubtitle: 'Especialista Cloud & Optimización Financiera',
    imageUrl: '/src/assets/images/avatar_ircar_cloud_1789574700241.jpg',
    colorName: 'Rosa / Fucsia',
    neonColor: '#ff007f',
    glowClass: 'shadow-[0_0_25px_rgba(255,0,127,0.45)] border-[#ff007f]',
    appearance: 'Joven estudiante adolescente con lentes en la cabeza glamorosa, sudadera tecnológica de cyber-cadete y visor holográfico.',
    perk: 'Radar Anti-Gastos & Escudo Cloud',
    perkBonusCategory: 'EMPRENDIMIENTO',
    perkPointsBonus: 25,
    quote: 'Cada céntimo cuenta cuando optimizamos los flujos en la nube financiera.',
    badgeLabel: 'Rosa #ff007f',
    stats: { fintech: 88, security: 85, contracts: 82, trading: 94 },
  },
  {
    id: 'ivan',
    name: 'Iván',
    role: 'Auditor Forense',
    roleSubtitle: 'Auditor Forense Digital & Detective de Contratos',
    imageUrl: '/src/assets/images/avatar_ivan_forense_1789574717941.jpg',
    colorName: 'Verde Esmeralda',
    neonColor: '#34d399',
    glowClass: 'shadow-[0_0_25px_rgba(52,211,153,0.45)] border-[#34d399]',
    appearance: 'Joven estudiante adolescente con visor de realidad virtual y monóculo scanner de código inteligente para auditar términos y condiciones.',
    perk: 'Monóculo Scanner de Cláusulas Abusivas',
    perkBonusCategory: 'LECTURA_CONTRATOS',
    perkPointsBonus: 25,
    quote: 'Las letras pequeñas de los contratos bancarios revelan siempre la verdad.',
    badgeLabel: 'Verde #34d399',
    stats: { fintech: 82, security: 96, contracts: 98, trading: 78 },
  },
  {
    id: 'carlos',
    name: 'Carlos',
    role: 'Estratega Mercados',
    roleSubtitle: 'Estratega Presupuestario & Emprendimiento',
    imageUrl: '/src/assets/images/avatar_carlos_male_1789575447569.jpg',
    colorName: 'Dorado / Ámbar',
    neonColor: '#fbbf24',
    glowClass: 'shadow-[0_0_25px_rgba(251,191,36,0.45)] border-[#fbbf24]',
    appearance: 'Joven estudiante adolescente varón con chaqueta táctica índigo y dorado, cyber-lentes con proyección de gráficos bursátiles e insignia V.',
    perk: 'Reactor 50/30/20 & Portafolios de Inversión',
    perkBonusCategory: 'BOLSA_BVC',
    perkPointsBonus: 25,
    quote: 'El modelo 50/30/20 y la Bolsa de Valores multiplican el valor de cualquier iniciativa.',
    badgeLabel: 'Dorado #fbbf24',
    stats: { fintech: 89, security: 80, contracts: 85, trading: 97 },
  },
];

export const CATEGORY_INFO: Record<
  ChallengeCategory,
  { label: string; icon: string; neonColor: string; description: string }
> = {
  LECTURA_CONTRATOS: {
    label: 'Lectura & Contratos',
    icon: 'BookOpen',
    neonColor: '#a78bfa',
    description: 'Análisis de contratos bancarios, garantías FOGADE, comisiones y cláusulas oficiales.',
  },
  BANCA_FINTECH_BDV: {
    label: 'Banca Fintech BDV',
    icon: 'Landmark',
    neonColor: '#00f3ff',
    description: 'Ecosistema Banco de Venezuela, PagomóvilBDV, BiopagoBDV, cuentas en Bolívares y Divisas.',
  },
  EMPRENDIMIENTO: {
    label: 'Emprendimiento',
    icon: 'TrendingUp',
    neonColor: '#34d399',
    description: 'Estructura de costos, regla 50/30/20, flujos de caja y facturación con medios digitales.',
  },
  BOLSA_BVC: {
    label: 'Bolsa BVC',
    icon: 'BarChart3',
    neonColor: '#fbbf24',
    description: 'Bolsa de Valores de Caracas, renta variable, acciones, títulos valores e inversión inteligente.',
  },
  CIBERSEGURIDAD: {
    label: 'Ciberseguridad Real',
    icon: 'ShieldAlert',
    neonColor: '#ff007f',
    description: 'Defensa contra Phishing bancario, Clave Dinámica Ami Ven, autenticación FIDO2 y privacidad.',
  },
};

export const CIFRAFLOW_CHALLENGES: CifraChallenge[] = [
  // 1. ADIVINANZA - BANCA FINTECH BDV (PagomóvilBDV)
  {
    id: 'ch-01',
    type: 'ADIVINANZA',
    category: 'BANCA_FINTECH_BDV',
    title: 'Adivinanza Bancaria: El Viajero Instantáneo',
    clueOrRiddle:
      '«En tu teléfono resido sin importar la hora ni el día. Con solo tu cédula, número celular y el código de tu banco, envío el dinero de un extremo a otro del país en apenas un parpadeo, sin esperar al lunes. ¿Qué servicio estrella del Banco de Venezuela soy?»',
    contextInfo: 'Pista Fintech: Funciona 24 horas al día los 365 días del año mediante la red interbancaria nacional.',
    options: [
      { id: 'opt-a', text: 'Un cheque de gerencia depositado en taquilla física' },
      { id: 'opt-b', text: 'PagomóvilBDV (Pago Móvil Interbancario)' },
      { id: 'opt-c', text: 'Un giro postal tradicional enviado por correo terrestre' },
      { id: 'opt-d', text: 'Una orden de retiro por taquilla bancaria' },
    ],
    correctOptionId: 'opt-b',
    basePoints: 120,
    penaltyPoints: 30,
    didacticExplanation:
      '¡Correcto! PagomóvilBDV es el canal digital de pagos en tiempo real del Banco de Venezuela que permite enviar y recibir bolívares al instante entre cualquier banco venezolano utilizando únicamente cédula, teléfono y banco destino.',
    bdvFeatureTag: 'PagomóvilBDV P2P / P2C',
  },

  // 2. ADIVINANZA - CIBERSEGURIDAD (Ami Ven)
  {
    id: 'ch-02',
    type: 'ADIVINANZA',
    category: 'CIBERSEGURIDAD',
    title: 'Adivinanza de Seguridad: El Escudo de los 60 Segundos',
    clueOrRiddle:
      '«Cada sesenta segundos cambio por completo de piel. Compuesta por seis números secretos, viajo en una app propia sin consumir tus datos telefónicos. Sin mí, ningún intruso puede transferir tus fondos en BDVenlínea. ¿Qué guardián criptográfico soy?»',
    contextInfo: 'Pista Ciberseguridad: Es el segundo factor de autenticación dinámico del Banco de Venezuela.',
    options: [
      { id: 'opt-a', text: 'El número de tarjeta impreso en el plástico' },
      { id: 'opt-b', text: 'La Clave Dinámica de la aplicación Ami Ven BDV' },
      { id: 'opt-c', text: 'El código postal de tu ciudad de residencia' },
      { id: 'opt-d', text: 'La fecha de vencimiento de tu cédula' },
    ],
    correctOptionId: 'opt-b',
    basePoints: 125,
    penaltyPoints: 35,
    didacticExplanation:
      '¡Exacto! Ami Ven es la aplicación oficial de autenticación del Banco de Venezuela que genera Claves Dinámicas TOTP de 6 dígitos que expiran cada minuto, protegiendo al usuario incluso si un atacante conoce su contraseña estática.',
    bdvFeatureTag: 'App Ami Ven BDV (Clave Dinámica)',
  },

  // 3. ADIVINANZA - BANCA FINTECH BDV (BiopagoBDV)
  {
    id: 'ch-03',
    type: 'ADIVINANZA',
    category: 'BANCA_FINTECH_BDV',
    title: 'Adivinanza Fintech: El Toque Digital Único',
    clueOrRiddle:
      '«No requiero tarjeta de plástico en tu bolsillo ni que memorices claves numéricas complejas. En abastos, farmacias y supermercados, basta con posar la yema de tu dedo índice sobre mi sensor para autorizar compras con cargo a tu cuenta BDV. ¿Qué tecnología biométrica soy?»',
    contextInfo: 'Pista Innovación: Es el sistema pionero en América Latina para pago sin instrumentos físicos.',
    options: [
      { id: 'opt-a', text: 'Firma manual sobre papel carbón' },
      { id: 'opt-b', text: 'BiopagoBDV (Autenticación Biométrica Dactilar)' },
      { id: 'opt-c', text: 'Lectura de código de barras impreso' },
      { id: 'opt-d', text: 'Cupón prepagado de papel' },
    ],
    correctOptionId: 'opt-b',
    basePoints: 120,
    penaltyPoints: 30,
    didacticExplanation:
      '¡Muy bien! BiopagoBDV es el sistema biométrico del Banco de Venezuela que permite cancelar compras en comercios afiliados únicamente colocando la huella dactilar, conectando la identidad con la cuenta bancaria del usuario.',
    bdvFeatureTag: 'BiopagoBDV Huella Dactilar',
  },

  // 4. TRIVIA - LECTURA & CONTRATOS (Estructura de la Cuenta Bancaria SUDEBAN)
  {
    id: 'ch-04',
    type: 'TRIVIA',
    category: 'LECTURA_CONTRATOS',
    title: 'Trivia de Contratos: La Cifra de 20 Dígitos',
    clueOrRiddle:
      'Al abrir tu primera cuenta bancaria en el Banco de Venezuela, recibes un código único estandarizado por la Superintendencia de las Instituciones del Sector Bancario (SUDEBAN). ¿Cuántos dígitos componen exactamente este número y con qué código de 4 dígitos inicia el Banco de Venezuela?',
    contextInfo: 'Pista Regulatoria: Los primeros 4 dígitos identifican la institución bancaria dentro del sistema compensador.',
    options: [
      { id: 'opt-a', text: '16 dígitos en total, iniciando con el código 0100' },
      { id: 'opt-b', text: '20 dígitos en total, iniciando obligatoriamente con el código 0102' },
      { id: 'opt-c', text: '10 dígitos en total, iniciando con el año 1890' },
      { id: 'opt-d', text: '24 dígitos en total, iniciando con las letras VEN' },
    ],
    correctOptionId: 'opt-b',
    basePoints: 130,
    penaltyPoints: 35,
    didacticExplanation:
      '¡Correcto! En Venezuela, todas las cuentas bancarias tienen exactamente 20 dígitos numéricos estandarizados por SUDEBAN: los 4 primeros corresponden al código del banco (0102 para el Banco de Venezuela), seguidos de 4 de agencia, 2 de control y 10 dígitos de cuenta.',
    bdvFeatureTag: 'Código Institucional 0102 SUDEBAN',
  },

  // 5. TRIVIA - BANCA FINTECH BDV (Mesa de Cambio & Tasa Oficial BCV)
  {
    id: 'ch-05',
    type: 'TRIVIA',
    category: 'BANCA_FINTECH_BDV',
    title: 'Trivia Cambiaria: La Mesa de Cambio y la Tasa BCV',
    clueOrRiddle:
      'Cuando un ciudadano o joven emprendedor utiliza la Mesa de Cambio en BDVenlínea para comprar o vender divisas (USD o EUR) de libre convertibilidad con cargo a su cuenta, ¿bajo qué cotización oficial y ente regulador se ejecutan las operaciones?',
    contextInfo: 'Pista Económica: Es la tasa legal calculada a partir del promedio ponderado de las operaciones interbancarias.',
    options: [
      { id: 'opt-a', text: 'Bajo la cotización arbitraria fijada en foros no oficiales de redes sociales' },
      { id: 'opt-b', text: 'Bajo la Tasa Oficial publicada por el Banco Central de Venezuela (BCV)' },
      { id: 'opt-c', text: 'Bajo la tasa de cambio de la Reserva Federal de los Estados Unidos' },
      { id: 'opt-d', text: 'Bajo el precio de cierre de la bolsa de Tokio' },
    ],
    correctOptionId: 'opt-b',
    basePoints: 135,
    penaltyPoints: 40,
    didacticExplanation:
      '¡Exacto! El Banco de Venezuela ejecuta sus operaciones de menudeo cambiario y Mesa de Cambio estrictamente a la Tasa Oficial del Banco Central de Venezuela (BCV), garantizando transparencia, legalidad y seguridad financiera.',
    bdvFeatureTag: 'Mesa de Cambio BDV / Tasa Oficial BCV',
  },

  // 6. ACERTIJO - CIBERSEGURIDAD (Defensa contra Phishing Bancario)
  {
    id: 'ch-06',
    type: 'ACERTIJO',
    category: 'CIBERSEGURIDAD',
    title: 'Acertijo Forense: El Enlace Trampa del SMS',
    clueOrRiddle:
      'Recibes en tu celular el siguiente mensaje urgente: «ALERTA BDV: Su cuenta ha sido bloqueada por intento sospechoso. Ingrese INMEDIATAMENTE en http://bdv-seguridad-reactiva.xyz/login e introduzca su clave y código Ami Ven para desbloquear». Aplicando el Monóculo de Auditoría de Iván, ¿cuál es la acción correcta y por qué?',
    contextInfo: 'Pista Ciberdefensa: Observa detenidamente el protocolo, el dominio web y la regla de no solicitar claves.',
    options: [
      { id: 'opt-a', text: 'Ingresar de inmediato los datos para no perder el acceso a la cuenta bancaria' },
      { id: 'opt-b', text: 'Reenviar el mensaje a todos tus contactos para alertarlos' },
      { id: 'opt-c', text: 'Phishing detectado: El BDV NUNCA solicita contraseñas ni Ami Ven por enlaces SMS; no hacer clic, borrar y reportar' },
      { id: 'opt-d', text: 'Responder al SMS solicitando que le llamen por teléfono' },
    ],
    correctOptionId: 'opt-c',
    basePoints: 150,
    penaltyPoints: 50,
    didacticExplanation:
      '¡Brillante análisis forense! Es un típico ataque de Phishing o Smishing con un dominio falso (.xyz). El Banco de Venezuela nunca solicita contraseñas, datos personales ni códigos Ami Ven a través de enlaces en mensajes de texto o correos.',
    bdvFeatureTag: 'Ciberseguridad y Prevención Phishing',
  },

  // 7. ACERTIJO - EMPRENDIMIENTO (La Regla 50/30/20 de Carlos)
  {
    id: 'ch-07',
    type: 'ACERTIJO',
    category: 'EMPRENDIMIENTO',
    title: 'Acertijo Presupuestario: El Reactor 50/30/20',
    clueOrRiddle:
      'Un grupo de estudiantes de bachillerato inicia un emprendimiento escolar de diseño gráfico y obtiene 2.000 Bolívares de ganancia neta en su primer mes depositados en su cuenta BDV. Si Carlos aplica la regla financiera clásica 50/30/20, ¿cuánto dinero deben destinar a Necesidades Operativas (50%), Deseos/Reinversión (30%) y Ahorro/Fondo de Emergencia (20%)?',
    contextInfo: 'Pista Matemática: Calcula el 50%, 30% y 20% de 2.000 Bs.',
    options: [
      { id: 'opt-a', text: 'Bs. 500 para necesidades, Bs. 1.000 para deseos y Bs. 500 para ahorro' },
      { id: 'opt-b', text: 'Bs. 1.000 para necesidades básicas, Bs. 600 para deseos/mejora y Bs. 400 para ahorro' },
      { id: 'opt-c', text: 'Gastar los Bs. 2.000 completos de inmediato para celebrar las ventas' },
      { id: 'opt-d', text: 'Bs. 1.800 para deseos y Bs. 200 para necesidades' },
    ],
    correctOptionId: 'opt-b',
    basePoints: 140,
    penaltyPoints: 40,
    didacticExplanation:
      '¡Matemática financiera impecable! El 50% de 2.000 Bs equivale a 1.000 Bs (gastos esenciales operativos), el 30% es 600 Bs (reinversión y mejoras) y el 20% son 400 Bs que deben resguardarse intactos en el fondo de ahorro e imprevistos.',
    bdvFeatureTag: 'Presupuesto de Emprendimiento 50/30/20',
  },

  // 8. ACERTIJO - BOLSA BVC (Inversión en la Bolsa de Valores de Caracas)
  {
    id: 'ch-08',
    type: 'ACERTIJO',
    category: 'BOLSA_BVC',
    title: 'Acertijo Bursátil: ¿Qué es una Acción en la BVC?',
    clueOrRiddle:
      'Al estudiar la Bolsa de Valores de Caracas (BVC), un inversionista decide adquirir un lote de 100 títulos de renta variable emitidos por una empresa productiva venezolana cotizada en pizarra. ¿Qué derecho real adquiere el inversionista al poseer esas acciones?',
    contextInfo: 'Pista de Mercado: Diferencia entre prestar dinero (bono) y ser propietario de una fracción.',
    options: [
      { id: 'opt-a', text: 'Se convierte en dueño total y absoluto de toda la empresa sin importar los otros socios' },
      { id: 'opt-b', text: 'Se convierte en copropietario de una parte alícuota del capital social con derecho a dividendos' },
      { id: 'opt-c', text: 'Otorga un préstamo al banco que no genera rendimientos económicos' },
      { id: 'opt-d', text: 'Compra una mercancía que debe almacenar en su casa físicamente' },
    ],
    correctOptionId: 'opt-b',
    basePoints: 145,
    penaltyPoints: 40,
    didacticExplanation:
      '¡Excelente conocimiento bursátil! Una acción de la Bolsa de Valores de Caracas (BVC) representa una fracción del capital social de una empresa. Su tenedor pasa a ser accionista (copropietario) con derecho a percibir dividendos de las utilidades.',
    bdvFeatureTag: 'Bolsa de Valores de Caracas (BVC)',
  },

  // 9. TRIVIA - LECTURA & CONTRATOS (Garantía de Depósitos FOGADE)
  {
    id: 'ch-09',
    type: 'TRIVIA',
    category: 'LECTURA_CONTRATOS',
    title: 'Trivia Legal: El Escudo de FOGADE',
    clueOrRiddle:
      'En el contrato de apertura de tu cuenta en el Banco de Venezuela se señala que los depósitos bancarios están garantizados por ley. ¿Qué institución pública venezolana ampara estos ahorros mediante el Fondo de Protección Social?',
    contextInfo: 'Pista Jurídica: Fue creado para garantizar los depósitos del público en el sistema bancario nacional.',
    options: [
      { id: 'opt-a', text: 'FOGADE (Fondo de Protección Social de los Depósitos Bancarios)' },
      { id: 'opt-b', text: 'Una aseguradora privada internacional sin registro en el país' },
      { id: 'opt-c', text: 'Una cooperativa vecinal no regulada' },
      { id: 'opt-d', text: 'Un fondo de inversión especulativo de criptoactivos' },
    ],
    correctOptionId: 'opt-a',
    basePoints: 130,
    penaltyPoints: 35,
    didacticExplanation:
      '¡Totalmente correcto! FOGADE garantiza y protege los ahorros de los depositantes del sistema bancario nacional venezolano, respaldando la confianza y estabilidad del ahorro de las familias y estudiantes.',
    bdvFeatureTag: 'Garantía FOGADE / Ley de Bancos',
  },

  // 10. ADIVINANZA - BANCA FINTECH BDV (Tarjeta de Débito Digital Mastercard BDV)
  {
    id: 'ch-10',
    type: 'ADIVINANZA',
    category: 'BANCA_FINTECH_BDV',
    title: 'Adivinanza Fintech: La Llave de Compras en Línea',
    clueOrRiddle:
      '«Vivo en tu pantalla dentro de BDVenlínea sin que nadie pueda extraviarme. Tengo 16 dígitos, fecha de vencimiento y un código CVV dinámico que cambia cuando tú lo ordenas. Conmigo compras en sitios web de Venezuela y del mundo con cargo a tus bolívares o divisas. ¿Qué producto soy?»',
    contextInfo: 'Pista Banco de Venezuela: No requiere plástico físico y se emite de forma instantánea.',
    options: [
      { id: 'opt-a', text: 'Una libreta de ahorros tradicional en papel sellado' },
      { id: 'opt-b', text: 'La Tarjeta de Débito Digital BDV Mastercard' },
      { id: 'opt-c', text: 'Un cheque devuelto sin fondos' },
      { id: 'opt-d', text: 'Un pagaré manuscrito firmado a lápiz' },
    ],
    correctOptionId: 'opt-b',
    basePoints: 125,
    penaltyPoints: 30,
    didacticExplanation:
      '¡Magnífico! La Tarjeta de Débito Digital BDV Mastercard es la solución electrónica del Banco de Venezuela que se gestiona 100% en línea, permitiendo compras en comercios electrónicos con la máxima seguridad del CVV dinámico.',
    bdvFeatureTag: 'Débito Digital BDV Mastercard',
  },
];
