import type { ProjectId } from "@/data/projects";
import type { Member, Role } from "@/data/team";
import { cn, formatMonth } from "@/lib/utils";
import Avatar from "./Avatar";
import { ProjectTag } from "./ui";

export function tenure(role: Role) {
  if (!role.start) return role.status === "current" ? null : role.end ? `Until ${formatMonth(role.end)}` : null;
  const start = formatMonth(role.start);
  if (role.status === "current") return `${start} – Present`;
  if (!role.end || role.end === role.start) return start;
  return `${start} – ${formatMonth(role.end)}`;
}

/** A member card. `roles` are the roles to display (already filtered by project/status). */
export default function MemberCard({ member, roles, former = false }: { member: Member; roles: Role[]; former?: boolean }) {
  const projects = Array.from(new Set(member.roles.map((r) => r.project))) as ProjectId[];
  return (
    <article
      className={cn(
        "group flex h-full flex-col items-center rounded-2xl border p-6 text-center transition duration-300",
        former
          ? "border-dashed border-line bg-surface/50"
          : "border-line bg-surface hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(45,45,45,0.35)]",
      )}
    >
      <Avatar name={member.name} photo={member.photo} className={cn("w-28 sm:w-32", former && "opacity-80 grayscale")} />
      {former && (
        <span className="mt-4 rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Former member
        </span>
      )}
      <h3 className={cn("mt-4 text-base font-bold leading-snug", former && "text-ink/80")}>{member.name}</h3>
      <ul className="mt-1.5 space-y-0.5">
        {roles.map((r) => (
          <li key={r.project + r.position} className="text-sm font-medium text-orange-ink">
            {r.position}
            {projects.length > 1 && <span className="text-muted"> · {r.project === "sicat" ? "SICAT" : "Q-RIEnTe"}</span>}
          </li>
        ))}
      </ul>
      {member.credentials.length > 0 && (
        <p className="mt-3 text-sm leading-relaxed text-muted">{member.credentials.join(" · ")}</p>
      )}
      <div className="mt-auto flex w-full flex-col items-center gap-3 pt-4">
        {roles.map(tenure).filter(Boolean).map((t, i) => (
          <p key={i} className="text-xs font-medium tabular-nums text-muted">
            {t}
          </p>
        ))}
        <div className="flex flex-wrap justify-center gap-1.5">
          {projects.map((p) => (
            <ProjectTag key={p} project={p} />
          ))}
        </div>
      </div>
    </article>
  );
}
