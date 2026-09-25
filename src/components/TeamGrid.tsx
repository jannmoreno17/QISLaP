"use client";

import { useMemo, useState } from "react";
import type { ProjectId } from "@/data/projects";
import { projects } from "@/data/projects";
import type { Member } from "@/data/team";
import { cn } from "@/lib/utils";
import MemberCard from "./MemberCard";

type ProjectFilter = "all" | ProjectId;

function split(team: Member[], filter: ProjectFilter) {
  const current: { member: Member; roles: Member["roles"] }[] = [];
  const former: typeof current = [];
  for (const m of team) {
    const roles = m.roles.filter((r) => filter === "all" || r.project === filter);
    const cur = roles.filter((r) => r.status === "current");
    if (cur.length) current.push({ member: m, roles: cur });
    else if (roles.length) former.push({ member: m, roles });
  }
  return { current, former };
}

const pill = (active: boolean) =>
  cn(
    "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
    active ? "bg-charcoal text-offwhite dark:bg-accent dark:text-charcoal" : "text-muted hover:text-ink hover:bg-surface-2",
  );

export default function TeamGrid({ team, initialProject = "all", showFilters = true }: { team: Member[]; initialProject?: ProjectFilter; showFilters?: boolean }) {
  const [project, setProject] = useState<ProjectFilter>(initialProject);
  const [showCurrent, setShowCurrent] = useState(true);
  const [showFormer, setShowFormer] = useState(true);
  const { current, former } = useMemo(() => split(team, project), [team, project]);

  const options: { id: ProjectFilter; label: string }[] = [{ id: "all", label: "All" }, ...projects.map((p) => ({ id: p.id, label: p.name }))];

  return (
    <div>
      {showFilters && (
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label="Filter by project" className="inline-flex w-fit flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
            {options.map((o) => (
              <button key={o.id} type="button" aria-pressed={project === o.id} className={pill(project === o.id)} onClick={() => setProject(o.id)}>
                {o.label}
              </button>
            ))}
          </div>
          <div role="group" aria-label="Filter by membership" className="inline-flex w-fit flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
            <button type="button" aria-pressed={showCurrent} className={pill(showCurrent)} onClick={() => setShowCurrent((v) => !v || !showFormer)}>
              Current members
            </button>
            <button type="button" aria-pressed={showFormer} className={pill(showFormer)} onClick={() => setShowFormer((v) => !v || !showCurrent)}>
              Former members
            </button>
          </div>
        </div>
      )}

      <p className="sr-only" aria-live="polite">
        Showing {showCurrent ? current.length : 0} current and {showFormer ? former.length : 0} former members.
      </p>

      {showCurrent && (
        <section aria-labelledby="current-team">
          <h2 id="current-team" className="sr-only">
            Current team
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {current.map(({ member, roles }) => (
              <li key={member.id}>
                <MemberCard member={member} roles={roles} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {showFormer && former.length > 0 && (
        <section aria-labelledby="past-members" className={cn(showCurrent && "mt-20 border-t border-line pt-14")}>
          <h2 id="past-members" className="text-2xl font-bold text-ink/85">
            Past Members
          </h2>
          <p className="mt-2 max-w-xl text-muted">With thanks to the researchers and staff who helped build QISLaP&apos;s projects.</p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {former.map(({ member, roles }) => (
              <li key={member.id}>
                <MemberCard member={member} roles={roles} former />
              </li>
            ))}
          </ul>
        </section>
      )}

      {showFormer && !showCurrent && former.length === 0 && <p className="text-muted">No former members for this project.</p>}
    </div>
  );
}
