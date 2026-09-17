// Speech Synthesis Engine for CifraFlow Financiero in Sweet, Gentle Neutral Latin-American Female Voice

class SpeechManager {
  private isSupported: boolean;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  public enabled: boolean = true;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
    if (this.isSupported) {
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices() {
    if (!this.isSupported) return;
    try {
      this.voices = window.speechSynthesis.getVoices() || [];
    } catch {
      this.voices = [];
    }
  }

  /**
   * Selects the highest quality, sweetest, warm and melodic Latin-American female voice available.
   * Prioritizes sweet natural voices like Paola (Venezuela), Dalia (México), Soledad, Paulina,
   * Sabina, Salomé, Paloma, and Google español neutral female.
   */
  private getBestFeminineLatinVoice(): SpeechSynthesisVoice | null {
    if (!this.voices.length) {
      this.loadVoices();
    }
    const voices = this.voices;
    if (!voices || !voices.length) return null;

    // Sweetest female voice names in Spanish
    const topSweetFemaleNames = [
      'paola', // Venezuelan sweet voice
      'dalia', // Soft, melodic Mexican voice
      'soledad', // Warm and gentle Colombian voice
      'paulina', // Gentle Mexican / iOS voice
      'sabina', // Melodic Mexican voice
      'salome', 'salomé',
      'paloma',
      'laura',
      'sofia', 'sofía',
      'mia',
      'camila',
      'valeria',
      'margarita',
      'marisol',
      'lucia', 'lucía',
      'monica', 'mónica',
      'elena',
      'elvira',
      'andrea'
    ];

    const generalFemaleKeywords = [
      'female', 'femenin', 'mujer', 'chica', 'girl', 'zira', 'helena', 'conchita'
    ];

    const maleKeywords = [
      'jorge', 'diego', 'carlos', 'raul', 'raúl', 'miguel', 'alvaro', 'álvaro',
      'pablo', 'enrique', 'gonzalo', 'julio', 'david', 'male', 'hombre', 'varon', 'varón'
    ];

    const latinLocales = ['es-ve', 'es-419', 'es-mx', 'es-co', 'es-us', 'es-cl', 'es-ar', 'es-pe'];

    // 1. Top Tier: Natural / Neural sweet female voice in Latin American locale (e.g. Paola, Dalia, Soledad, Paulina)
    for (const sweetName of topSweetFemaleNames) {
      for (const v of voices) {
        const vName = v.name.toLowerCase();
        const vLang = v.lang.toLowerCase();
        const isLatin = latinLocales.some((l) => vLang.includes(l));
        const isMale = maleKeywords.some((k) => vName.includes(k));

        if (!isMale && isLatin && vName.includes(sweetName)) {
          return v;
        }
      }
    }

    // 2. Second Tier: Any Natural / Online female Spanish voice
    for (const v of voices) {
      const vName = v.name.toLowerCase();
      const vLang = v.lang.toLowerCase();
      const isNatural = vName.includes('natural') || vName.includes('online') || vName.includes('neural');
      const isFemale = topSweetFemaleNames.some((k) => vName.includes(k)) || generalFemaleKeywords.some((k) => vName.includes(k));
      const isMale = maleKeywords.some((k) => vName.includes(k));

      if (vLang.startsWith('es') && isNatural && isFemale && !isMale) {
        return v;
      }
    }

    // 3. Third Tier: Google español (neutral, pleasant female)
    for (const v of voices) {
      const vName = v.name.toLowerCase();
      if (vName.includes('google') && v.lang.startsWith('es') && !maleKeywords.some((k) => vName.includes(k))) {
        return v;
      }
    }

    // 4. Fourth Tier: Any Latin American voice that is female or not male
    for (const v of voices) {
      const vName = v.name.toLowerCase();
      const vLang = v.lang.toLowerCase();
      const isLatin = latinLocales.some((l) => vLang.includes(l));
      const isFemale = topSweetFemaleNames.some((k) => vName.includes(k)) || generalFemaleKeywords.some((k) => vName.includes(k));
      const isMale = maleKeywords.some((k) => vName.includes(k));

      if (isLatin && isFemale && !isMale) {
        return v;
      }
    }

    for (const v of voices) {
      const vName = v.name.toLowerCase();
      const vLang = v.lang.toLowerCase();
      const isLatin = latinLocales.some((l) => vLang.includes(l));
      const isMale = maleKeywords.some((k) => vName.includes(k));

      if (isLatin && !isMale) {
        return v;
      }
    }

    // 5. Fifth Tier: Any female Spanish voice
    for (const v of voices) {
      const vName = v.name.toLowerCase();
      const isFemale = topSweetFemaleNames.some((k) => vName.includes(k)) || generalFemaleKeywords.some((k) => vName.includes(k));
      const isMale = maleKeywords.some((k) => vName.includes(k));
      if (v.lang.startsWith('es') && isFemale && !isMale) {
        return v;
      }
    }

    // 6. Fallback: Any Spanish voice
    return voices.find((v) => v.lang.startsWith('es')) || null;
  }

  public speak(text: string, onEnd?: () => void) {
    if (!this.isSupported || !this.enabled) {
      if (onEnd) onEnd();
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      // Gentle, friendly and melodic pacing: 0.94 provides a sweet, calm and articulate tone
      utterance.rate = 0.94;
      // Sweet feminine pitch calibration: 1.22 gives a warm, luminous and sweet female timbre
      utterance.pitch = 1.22;
      utterance.volume = 1.0;
      utterance.lang = 'es-419';

      const voice = this.getBestFeminineLatinVoice();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  public stop() {
    if (this.isSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.currentUtterance = null;
  }
}

export const speechEngine = new SpeechManager();

export const speakWelcomePrompt = () => {
  speechEngine.speak(
    '¡Hola! Te doy una cálida bienvenida a CifraFlow Financiero y Banco de Venezuela. Ingresa tu nombre, cédula de identidad e institución educativa para inicializar tu sesión de entrenamiento y descubrir a tu cadete favorito.'
  );
};

export const speakGameOverTransition = (onDone?: () => void) => {
  speechEngine.speak(
    'GAME OVER. Fin de este reto, ¡lo hiciste con mucho entusiasmo! Vamos al siguiente.',
    onDone
  );
};
