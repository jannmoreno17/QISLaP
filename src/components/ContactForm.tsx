"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Static-site friendly contact form.
 * - If `site.formEndpoint` is set (e.g. Formspree), submissions are POSTed there.
 * - Otherwise the visitor's email app opens with the message pre-filled.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("company")) return; // honeypot

    if (!site.formEndpoint) {
      const subject = `[QISLaP website] ${data.get("subject") || "Inquiry"}`;
      const body = `${data.get("message")}\n\n— ${data.get("name")}${data.get("organization") ? `, ${data.get("organization")}` : ""}\n${data.get("email")}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name <span className="text-orange-ink">*</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-medium">
          Email <span className="text-orange-ink">*</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Organization
          <input name="organization" autoComplete="organization" className={field} />
        </label>
        <label className="block text-sm font-medium">
          Subject
          <select name="subject" className={field} defaultValue="General inquiry">
            <option>General inquiry</option>
            <option>Research collaboration</option>
            <option>Industry partnership</option>
            <option>Student / researcher opportunities</option>
            <option>Media</option>
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium">
        Message <span className="text-orange-ink">*</span>
        <textarea name="message" required rows={6} className={field} />
      </label>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-charcoal shadow-sm transition hover:bg-[#ffd95c] disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p role="status" className="text-sm text-muted">
          {status === "sent" && (site.formEndpoint ? "Thank you — we'll get back to you soon." : "Your email app should open with the message ready to send.")}
          {status === "error" && `Something went wrong. Please email us directly at ${site.email}.`}
        </p>
      </div>
    </form>
  );
}
