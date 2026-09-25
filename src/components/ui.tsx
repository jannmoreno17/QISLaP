import Link from "next/link";
import type { ReactNode } from "react";
import type { ProjectId } from "@/data/projects";
import { projectName } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ArrowRight } from "./Icons";
import Reveal from "./Reveal";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Section label written as a quantum ket, e.g. |research⟩. */
export function Eyebrow({ children, className, dark = false }: { children: string; className?: string; dark?: boolean }) {
  const ket = children.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "_");
  return (
    <p className={cn("font-mono text-xs font-semibold tracking-wide sm:text-sm", dark ? "text-white/70" : "text-muted", className)} aria-label={children}>
      <span aria-hidden className={dark ? "text-accent" : "text-brand-gray"}>|</span>
      <span aria-hidden>{ket}</span>
      <span aria-hidden className={dark ? "text-accent" : "text-brand-gray"}>⟩</span>
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <Reveal className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
      {action}
    </Reveal>
  );
}

/** Top-of-page banner for inner pages: dark quantum surface with circuit wires. */
export function PageHero({ eyebrow, title, intro, aside }: { eyebrow: string; title: string; intro?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="bg-circuit-dark relative overflow-hidden text-white">
      <Container className="relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12">
        <Reveal className={aside ? "lg:col-span-7" : "lg:col-span-10"}>
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</p>}
        </Reveal>
        {aside && (
          <Reveal delay={150} className="hidden lg:col-span-5 lg:block">
            {aside}
          </Reveal>
        )}
      </Container>
      <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/40 to-transparent" aria-hidden />
    </section>
  );
}

export function ProjectTag({ project, className }: { project: ProjectId | "qislap"; className?: string }) {
  const styles = {
    "q-riente": "bg-accent-soft text-ink ring-accent/60",
    sicat: "bg-orange/10 text-orange-ink ring-orange/40",
    qislap: "bg-surface-2 text-ink ring-line",
  }[project];
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset", styles, className)}>
      {project === "qislap" ? "QISLaP" : projectName(project)}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost-light";
  className?: string;
}) {
  const styles = {
    primary: "bg-accent text-charcoal hover:bg-[#ffd95c] shadow-sm",
    secondary: "border border-line bg-surface text-ink hover:border-ink/40",
    "ghost-light": "border border-white/40 text-white hover:bg-white/10",
  }[variant];
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200",
        styles,
        className,
      )}
    >
      {children}
      <ArrowRight className="transition-transform group-hover:translate-x-0.5" width={16} height={16} />
    </Link>
  );
}
