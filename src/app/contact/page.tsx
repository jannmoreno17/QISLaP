import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import { Container, PageHero } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with QISLaP at Room A301, Arlegui Building, T.I.P. Manila, 1338 Arlegui Street, Quiapo, Manila.",
};

export default function ContactPage() {
  const socials = site.socials.filter((s) => s.href);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk"
        intro="Questions about our research, partnership opportunities, or joining the lab? Send us a message."
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12">
          <Reveal className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-charcoal">
                  <MapPin />
                </span>
                <div>
                  <h2 className="font-bold">Visit</h2>
                  <address className="mt-1 not-italic leading-relaxed text-muted">
                    {site.address.room}
                    <br />
                    {site.address.campus}
                    <br />
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.country}
                  </address>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-6">
              <div className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-charcoal">
                  <Mail />
                </span>
                <div>
                  <h2 className="font-bold">Email</h2>
                  <a href={`mailto:${site.email}`} className="mt-1 inline-block break-all text-muted underline decoration-accent decoration-2 underline-offset-4 hover:text-ink">
                    {site.email}
                  </a>
                  {socials.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                      {socials.map((s) => (
                        <li key={s.label}>
                          <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-orange-ink">
                            {s.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
              <iframe
                title="Map showing T.I.P. Manila, 1338 Arlegui Street, Quiapo, Manila"
                src={site.mapEmbed}
                className="h-72 w-full border-0 dark:opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-7">
            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-10">
              <h2 className="text-2xl font-bold">Send a message</h2>
              <p className="mt-2 text-muted">Fields marked * are required.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
