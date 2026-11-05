import nodemailer from "nodemailer";
import { site } from "@/data/site";

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: silently accept bot submissions.
  if (clean(body.website)) return Response.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 60);
  const company = clean(body.company, 160);
  const budget = clean(body.budget, 60);
  const message = clean(body.message, 5000);
  const extra: [string, string][] =
    body.extra && typeof body.extra === "object"
      ? Object.entries(body.extra as Record<string, unknown>)
          .slice(0, 12)
          .map(([k, v]) => [clean(k, 40), clean(v, 300)] as [string, string])
          .filter(([k, v]) => k && v)
      : [];
  const source = clean(body.source, 40);
  const services = Array.isArray(body.services) ? body.services.map((s) => clean(s, 80)).filter(Boolean).slice(0, 12) : [];

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please add your name, a valid email and a short message." }, { status: 422 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP is not configured; set SMTP_HOST, SMTP_USER and SMTP_PASS.");
    return Response.json({ error: "Our form is temporarily unavailable." }, { status: 503 });
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Company", company],
    ["Services", services.join(", ")],
    ["Budget", budget],
    ...extra,
  ];
  const text = rows.map(([k, v]) => `${k}: ${v || "-"}`).join("\n") + `\n\n${message}`;
  const html =
    `<table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v || "-")}</td></tr>`).join("")}</table>` +
    `<p style="white-space:pre-wrap">${esc(message)}</p>`;

  try {
    await transporter.sendMail({
      from: `"${site.name} Website" <${SMTP_USER}>`,
      to: CONTACT_TO || site.email,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `${source === "government" ? "Government inquiry" : "New project inquiry"} — ${name}${company ? ` (${company})` : ""}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return Response.json({ error: "We couldn’t send your message right now." }, { status: 502 });
  }
}
