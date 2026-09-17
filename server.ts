import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", bank: "Banco de Venezuela BDV", service: "BDVenlínea API" });
  });

  // Official BDV & BCV exchange rates simulation / proxy
  app.get("/api/rates", (_req, res) => {
    res.json({
      usd: 846.51,
      eur: 977.88,
      cny: 119.34,
      rub: 9.35,
      lastUpdated: new Date().toISOString(),
      source: "Banco Central de Venezuela (BCV) / Mesa de Cambio BDV Oficial Hoy",
    });
  });

  // Eva Virtual Assistant for Banco de Venezuela
  app.post("/api/eva-bdv", async (req, res) => {
    const { prompt, history } = req.body;
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      const ai = getAI();
      if (!ai) {
        // High quality fallback responses tailored to BDV
        const q = prompt.toLowerCase();
        let answer = "";
        if (q.includes("pago móvil") || q.includes("pagomovil") || q.includes("límite")) {
          answer = "En Banco de Venezuela, PagomóvilBDV permite transacciones inmediatas las 24 horas hacia BDV y cualquier banco nacional. Puedes personalizar tus límites diarios en la sección de 'Seguridad > Límites' o validar transferencias con la Clave Dinámica Ami Ven.";
        } else if (q.includes("divisa") || q.includes("dolar") || q.includes("mesa de cambio") || q.includes("euro")) {
          answer = "A través de la Mesa de Cambio BDV puedes realizar compra y venta de divisas (USD/EUR) a tasa oficial BCV de forma inmediata con liquidación directa en tu Cuenta Moneda Extranjera BDV de libre convertibilidad.";
        } else if (q.includes("tarjeta") || q.includes("debito") || q.includes("credito") || q.includes("cvv")) {
          answer = "Tu Tarjeta de Débito Digital BDV Mastercard te permite comprar en línea nacional e internacionalmente, habilitar o pausar compras digitales y generar el CVV dinámico desde tu sesión de BDVenlínea.";
        } else if (q.includes("ami ven") || q.includes("clave dinámica") || q.includes("token")) {
          answer = "La Clave Dinámica Ami Ven es el factor de autenticación de 6 dígitos que se actualiza cada 60 segundos para autorizar tus operaciones bancarias con máxima seguridad.";
        } else {
          answer = `¡Hola! Soy Eva, tu Asistente Virtual del Banco de Venezuela (BDV). Puedo orientarte sobre Pago Móvil BDV, Mesa de Cambio, transferencias interbancarias, pago de servicios (Cantv, Corpoelec, Movistar, Digitel) y gestión de tus cuentas en Bs. y divisas. ¿En qué puedo apoyarte hoy?`;
        }
        return res.json({ reply: answer, source: "knowledge_base" });
      }

      const systemInstruction = `Eres 'Eva', la asistente virtual inteligente oficial del Banco de Venezuela (BDV) en su portal BDVenlínea.
Tu rol es orientar a los clientes del Banco de Venezuela de forma cordial, profesional, clara y precisa en idioma español venezolano.
Conoces todo sobre:
1. PagomóvilBDV (envío a P2P con cédula, teléfono y banco destino, P2C a comercios, cobro por QR, verificación por referencia).
2. Cuentas: Cuenta Corriente Digital en Bolívares (VES) y Cuenta en Moneda Extranjera (USD/EUR) de libre convertibilidad.
3. Mesa de Cambio BDV / Menudeo cambiario (compra y venta oficial según la tasa del Banco Central de Venezuela BCV).
4. Tarjeta de Débito Digital BDV Mastercard y Maestro, Tarjetas de Crédito BDV, CVV dinámico, BiopagoBDV.
5. Pago de servicios: Recargas móviles (Digitel, Movistar, Movilnet), Cantv/Aba, Corpoelec (Plan Borrón y Cuenta Nueva), Hidrocapital, SimpleTV, Seniat.
6. Seguridad: Clave Dinámica Ami Ven (token de 6 dígitos), configuración de límites transaccionales y bloqueo preventivo.
Responde de manera concisa, útil y con el tono institucional y amable característico del Banco de Venezuela ("El mayor banco del país").`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\nConsulta del cliente BDV:\n${prompt}` }] }
        ],
      });

      const reply = response.text || "Disculpe, no pude procesar su consulta en este momento. Por favor intente nuevamente o consulte los menús de BDVenlínea.";
      return res.json({ reply, source: "gemini" });
    } catch (err: any) {
      console.error("Eva BDV Assistant error:", err);
      return res.json({
        reply: "Estimado cliente BDV, en este momento el asistente virtual está operando en modo local. Puedes gestionar tus operaciones de Pago Móvil, Mesa de Cambio y Transferencias directamente desde el menú principal.",
        source: "fallback",
      });
    }
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BDVenlínea Banco de Venezuela Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
