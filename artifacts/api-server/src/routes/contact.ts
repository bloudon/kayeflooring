import { Router } from "express";
import nodemailer from "nodemailer";
import { logger } from "../lib/logger";

const router = Router();

router.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, service, message, source } = req.body;

  if (!firstName || !lastName || !email || !phone) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  const smtpHost = process.env["SMTP_HOST"];
  const smtpPort = Number(process.env["SMTP_PORT"] ?? 587);
  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];
  const smtpFrom = process.env["SMTP_FROM"] ?? smtpUser;
  const smtpTo   = process.env["SMTP_TO"];

  if (!smtpHost || !smtpUser || !smtpPass || !smtpTo) {
    logger.error("SMTP environment variables not configured");
    res.status(500).json({ error: "Email service not configured." });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,   // true for 465 (SSL), false for 587 (STARTTLS)
    requireTLS: smtpPort !== 465, // SMTP2GO: enforce STARTTLS on 587/2525
    auth: { user: smtpUser, pass: smtpPass },
  });

  const serviceLabels: Record<string, string> = {
    stairs:     "Custom Stairs",
    solid:      "Solid Hardwood",
    engineered: "Engineered Hardwood",
    lvp:        "Luxury Vinyl Plank",
    repair:     "Repair / Refinishing",
    other:      "Other / Not Sure",
  };

  const serviceLabel = serviceLabels[service] ?? service ?? "Not specified";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="background: #2c1810; padding: 24px; border-radius: 4px 4px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 22px;">New Quote Request — Kaye Flooring</h1>
      </div>
      <div style="background: #f9f7f5; padding: 24px; border: 1px solid #e5e0db; border-top: none; border-radius: 0 0 4px 4px;">
        ${source ? `<p style="background:#fff3e0;border-left:4px solid #c8956c;padding:10px 14px;margin-bottom:20px;font-size:13px;"><strong>Lead source:</strong> ${source}</p>` : ""}
        <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
          <tr><td style="padding:8px 0; font-weight:bold; width:140px; color:#666; font-size:13px;">Name</td><td style="padding:8px 0;">${firstName} ${lastName}</td></tr>
          <tr style="background:#fff;"><td style="padding:8px 0; font-weight:bold; color:#666; font-size:13px;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}" style="color:#c8956c;">${email}</a></td></tr>
          <tr><td style="padding:8px 0; font-weight:bold; color:#666; font-size:13px;">Phone</td><td style="padding:8px 0;"><a href="tel:${phone}" style="color:#c8956c;">${phone}</a></td></tr>
          <tr style="background:#fff;"><td style="padding:8px 0; font-weight:bold; color:#666; font-size:13px;">Service</td><td style="padding:8px 0;">${serviceLabel}</td></tr>
        </table>
        ${message ? `<div style="background:#fff;border:1px solid #e5e0db;padding:16px;border-radius:4px;"><p style="margin:0 0 6px;font-weight:bold;color:#666;font-size:13px;">Project Details</p><p style="margin:0;white-space:pre-wrap;">${message}</p></div>` : ""}
        <p style="margin-top:24px;font-size:12px;color:#999;">Submitted from kayeflooring.com</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Kaye Flooring Website" <${smtpFrom}>`,
      to: smtpTo,
      cc: "bloudon@permitsmanager.com",
      replyTo: email,
      subject: `New Quote Request: ${firstName} ${lastName} — ${serviceLabel}`,
      html,
    });

    logger.info({ email, source, service }, "Contact form email sent");
    res.json({ success: true });
  } catch (err) {
    logger.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

export default router;
