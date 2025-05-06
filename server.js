const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Configurações SMTP (usando variáveis de ambiente ou valores padrão)
const SMTP_CONFIG = {
  EMAIL_FROM: process.env.EMAIL_FROM || "viva-sorte@checkout-final.shop",
  EMAIL_FROM_NAME: process.env.EMAIL_FROM_NAME || "Viva Sorte",
  SMTP_HOST: process.env.SMTP_HOST || "smtp.hostinger.com",
  SMTP_USER: process.env.SMTP_USER || "viva-sorte@checkout-final.shop",
  SMTP_PASS: process.env.SMTP_PASS || "Senhasegura12345@",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "465"),
};

// Middleware
app.use(express.json());
app.use(cors());

// Servir o arquivo index.html como página inicial
app.use(express.static("."));

// Configuração do transportador de email
const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.SMTP_HOST,
  port: SMTP_CONFIG.SMTP_PORT,
  secure: true, // true para porta 465
  auth: {
    user: SMTP_CONFIG.SMTP_USER,
    pass: SMTP_CONFIG.SMTP_PASS,
  },
});

// Rota para verificar se o servidor está funcionando
app.get("/api/status", (req, res) => {
  res.json({ status: "Servidor de email está funcionando!" });
});

// Rota para enviar email
app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    // Validações básicas
    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios: to, subject, e (text ou html)",
      });
    }

    // Configuração do email
    const mailOptions = {
      from: `"${SMTP_CONFIG.EMAIL_FROM_NAME}" <${SMTP_CONFIG.EMAIL_FROM}>`,
      to,
      subject,
      text,
      html,
    };

    // Envio do email
    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email enviado com sucesso",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao enviar email",
      error: error.message,
    });
  }
});

// Rota principal para servir a página HTML
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log("Configurações SMTP carregadas com sucesso.");
});
