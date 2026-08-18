const nodemailer = require("nodemailer");
const { buildWhatsappLink } = require("../utils/whatsapp");

function isEmailEnabled() {
  if (process.env.RESEND_API_KEY && process.env.MAIL_FROM && process.env.LEAD_NOTIFICATION_EMAIL) {
    return true;
  }

  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.MAIL_FROM &&
      process.env.LEAD_NOTIFICATION_EMAIL
  );
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

async function sendWithResend(email) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.MAIL_FROM,
      to: [process.env.LEAD_NOTIFICATION_EMAIL],
      subject: email.subject,
      text: email.text,
      html: email.html
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || "Falha ao enviar email via Resend.");
  }

  return data;
}

async function sendWithSmtp(email) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.LEAD_NOTIFICATION_EMAIL,
    subject: email.subject,
    text: email.text,
    html: email.html
  });
}

function buildLeadEmail(lead) {
  const whatsappLink = buildWhatsappLink(lead.phone, lead.name, lead.serviceType);
  const subject = `Novo lead: ${lead.name} - ${lead.serviceType}`;
  const lines = [
    "Novo lead recebido pelo site da JCA Climatização.",
    "",
    `Nome: ${lead.name}`,
    `WhatsApp: ${lead.phone}`,
    `Serviço: ${lead.serviceType}`,
    `Cidade: ${lead.city || "Não informada"}`,
    `Bairro: ${lead.neighborhood || "Não informado"}`,
    `Email: ${lead.email || "Não informado"}`,
    `Equipamento: ${lead.equipmentType || "Não informado"}`,
    `Marca: ${lead.brand || "Não informada"}`,
    `BTUs: ${lead.btus || "Não informado"}`,
    `Quantidade: ${lead.quantity}`,
    "",
    `Descrição: ${lead.description || "Sem descrição."}`,
    "",
    `WhatsApp: ${whatsappLink}`
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; color: #102033; line-height: 1.5;">
      <h2 style="margin: 0 0 12px; color: #061432;">Novo lead recebido</h2>
      <p>Um cliente pediu atendimento pelo site da <strong>JCA Climatização</strong>.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 620px;">
        ${[
          ["Nome", lead.name],
          ["WhatsApp", lead.phone],
          ["Serviço", lead.serviceType],
          ["Cidade", lead.city || "Não informada"],
          ["Bairro", lead.neighborhood || "Não informado"],
          ["Email", lead.email || "Não informado"],
          ["Equipamento", lead.equipmentType || "Não informado"],
          ["Marca", lead.brand || "Não informada"],
          ["BTUs", lead.btus || "Não informado"],
          ["Quantidade", lead.quantity],
          ["Descrição", lead.description || "Sem descrição."]
        ]
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding: 8px; border: 1px solid #dce5ef; font-weight: 700;">${escapeHtml(label)}</td>
                <td style="padding: 8px; border: 1px solid #dce5ef;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <p style="margin-top: 18px;">
        <a href="${escapeHtml(whatsappLink)}" style="display: inline-block; padding: 12px 16px; background: #1097ff; color: #ffffff; text-decoration: none; border-radius: 999px; font-weight: 700;">
          Conversar pelo WhatsApp
        </a>
      </p>
    </div>
  `;

  return {
    subject,
    text: lines.join("\n"),
    html
  };
}

async function notifyNewLead(lead) {
  if (!isEmailEnabled()) {
    return { skipped: true };
  }

  const email = buildLeadEmail(lead);

  if (process.env.RESEND_API_KEY) {
    await sendWithResend(email);
    return { sent: true, provider: "resend" };
  }

  await sendWithSmtp(email);

  return { sent: true, provider: "smtp" };
}

module.exports = {
  buildLeadEmail,
  isEmailEnabled,
  notifyNewLead
};
