export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://qislap.com").replace(/\/$/, "");

/** Prefix a /public path with the deploy base path (needed for plain <img> on GitHub Pages). */
export const asset = (path: string) => `${basePath}${path}`;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2024-09" -> "Sept 2024", "2026" -> "2026". */
export function formatMonth(ym: string) {
  const [y, m] = ym.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
}

/** "2026-07-12" (+ optional end) -> "12 Jul 2026" or "12–16 Jul 2026". */
export function formatDateRange(start: string, end?: string) {
  const [y, m, d] = start.split("-").map(Number);
  if (!end) return `${d} ${MONTHS_LONG[m - 1]} ${y}`;
  const [y2, m2, d2] = end.split("-").map(Number);
  if (y === y2 && m === m2) return `${d}–${d2} ${MONTHS_LONG[m - 1]} ${y}`;
  if (y === y2) return `${d} ${MONTHS_LONG[m - 1]} – ${d2} ${MONTHS_LONG[m2 - 1]} ${y}`;
  return `${d} ${MONTHS_LONG[m - 1]} ${y} – ${d2} ${MONTHS_LONG[m2 - 1]} ${y2}`;
}

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
