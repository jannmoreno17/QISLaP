import { asset, cn } from "@/lib/utils";

/** Official QISLaP mark (public/brand) with the wordmark. `light` is for dark backgrounds. */
export default function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      {/* Gray strokes become white on dark surfaces; the light file is used in dark mode too. */}
      <img
        src={asset(light ? "/brand/qislap-logo-light.svg" : "/brand/qislap-logo.svg")}
        alt=""
        width={36}
        height={38}
        className={cn("h-9 w-auto shrink-0", !light && "dark:hidden")}
      />
      {!light && <img src={asset("/brand/qislap-logo-light.svg")} alt="" width={36} height={38} className="hidden h-9 w-auto shrink-0 dark:block" />}
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-lg font-bold tracking-tight", light ? "text-offwhite" : "text-ink")}>
          QISLaP
        </span>
        <span className={cn("mt-1 hidden font-mono text-[10px] sm:block", light ? "text-offwhite/60" : "text-muted")}>
          |quantum⟩ ⊗ |power⟩
        </span>
      </span>
    </span>
  );
}
