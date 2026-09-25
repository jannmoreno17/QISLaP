import type { ProjectId } from "./projects";

/**
 * Engagements & events. Order doesn't matter; pages sort newest first.
 * Photos live in public/images/events/<folder>/photoN.webp (+ photoN-sm.webp thumbnail).
 * `projects: []` marks a lab-wide (QISLaP) engagement.
 */
export type EventPhoto = { folder: string; n: number; alt: string };

export type LabEvent = {
  id: string;
  date: string; // YYYY-MM-DD
  endDate?: string;
  title: string;
  subtitle?: string;
  location?: string;
  kind: "workshop" | "visit" | "meeting" | "milestone" | "conference";
  projects: ProjectId[];
  summary?: string;
  photos: EventPhoto[];
};

/** `count` photos from one folder; `offset` continues the alt-text numbering across folders. */
const photos = (folder: string, count: number, alt: string, offset = 0): EventPhoto[] =>
  Array.from({ length: count }, (_, i) => ({ folder, n: i + 1, alt: `${alt} (photo ${i + 1 + offset})` }));

export const events: LabEvent[] = [
  {
    id: "rnd-workshop-2026",
    date: "2026-08-28",
    title: "QISLaP 1st R&D Workshop on Quantum Computing for Intelligent Power and Energy Systems",
    location: "T.I.P. Manila",
    kind: "workshop",
    projects: ["q-riente"],
    summary:
      "The lab's first research and development workshop, bringing together academic and industry collaborators on quantum computing for power and energy systems.",
    photos: photos("2026-08-28-qislap-1st-rnd-workshop-quantum-computing-tip-manila", 3, "QISLaP 1st R&D Workshop at T.I.P. Manila"),
  },
  {
    id: "student-workshop-day2",
    date: "2026-08-27",
    title: "QISLaP Student Workshop — Day 2",
    subtitle: "Quantum Launchpad: From Qubits to Qiskit",
    location: "T.I.P. Manila",
    kind: "workshop",
    projects: ["q-riente"],
    photos: photos("2026-08-27-qislap-student-workshop-day2-tip-manila", 4, "Quantum Launchpad student workshop day 2 at T.I.P. Manila"),
  },
  {
    id: "student-workshop-day1",
    date: "2026-08-26",
    title: "QISLaP Student Workshop — Day 1",
    subtitle: "Quantum Launchpad: From Qubits to Qiskit",
    location: "T.I.P. Quezon City",
    kind: "workshop",
    projects: ["q-riente"],
    photos: photos(
      "2026-08-26-qislap-student-workshop-day1-tip-quezon-city",
      4,
      "Quantum Launchpad student workshop day 1 at T.I.P. Quezon City",
    ),
  },
  {
    id: "taiwan-quantum-workshop",
    date: "2026-07-26",
    endDate: "2026-07-31",
    title: "Taiwan Quantum Workshop",
    location: "Chung Yuan Christian University, Taiwan",
    kind: "workshop",
    projects: ["q-riente"],
    photos: photos("2026-07-26-taiwan-quantum-workshop", 4, "Taiwan Quantum Workshop at Chung Yuan Christian University"),
  },
  {
    id: "sicat-thailand-benchmarking",
    date: "2026-07-12",
    endDate: "2026-07-16",
    title: "SICAT Thailand Technical Benchmarking Visit",
    subtitle: "CSSC-KMUTT, PTEC-NSTDA, PEA and IIEC",
    location: "Thailand",
    kind: "visit",
    projects: ["sicat"],
    summary: "Benchmarking of Thailand's solar PV systems testing laboratories and standards bodies.",
    photos: [
      ...photos("2026-07-12-sicat-thailand-solar-pv-benchmarking", 4, "SICAT benchmarking of Thailand solar PV testing laboratories"),
      { folder: "2026-07-13-thailand-benchmarking-cssc-kmutt", n: 1, alt: "Technical benchmarking visit at CSSC-KMUTT" },
      { folder: "2026-07-14-thailand-benchmarking-ptec-nstda", n: 1, alt: "Technical benchmarking visit at PTEC-NSTDA" },
      { folder: "2026-07-14-thailand-benchmarking-pea", n: 1, alt: "Technical benchmarking visit at the Provincial Electricity Authority (PEA)" },
      { folder: "2026-07-15-thailand-benchmarking-iiec", n: 1, alt: "Technical benchmarking visit at IIEC" },
    ],
  },
  {
    id: "qccl-2026",
    date: "2026-07-01",
    endDate: "2026-07-03",
    title: "IEEE qCCL 2026: GPU-Based Hybrid Quantum Computing for EV Charging Station Decision Planning",
    subtitle: "IEEE International Conference on Quantum Control, Computing and Learning",
    location: "Aalborg, Denmark",
    kind: "conference",
    projects: ["q-riente"],
    summary:
      "Dr. Dylan Lopez, Q-RIEnTe Project Consultant, presented research applying GPU-based hybrid quantum computing to decision planning for electric vehicle charging stations.",
    photos: [],
  },
  {
    id: "meralco-mspectrum-inception",
    date: "2026-07-06",
    title: "MERALCO & MSpectrum Inception Meeting",
    location: "Lopez Building, Meralco Compound, Pasig City",
    kind: "meeting",
    projects: ["sicat"],
    summary: "Industry engagement milestone with Manila Electric Company and MSpectrum.",
    photos: [
      ...photos("2026-07-06-meralco-mspectrum-inception-meeting", 3, "MERALCO and MSpectrum inception meeting"),
      ...photos("2026-07-06-industry-engagement-meralco-mspectrum-inception-meeting", 2, "Industry engagement with MERALCO and MSpectrum", 3),
    ],
  },
  {
    id: "flaretech",
    date: "2026-06-24",
    title: "Flaretech Technologies",
    kind: "visit",
    projects: ["sicat"],
    photos: photos("2026-06-24-flaretech-technologies-visit", 1, "Visit with Flaretech Technologies"),
  },
  {
    id: "iiec-director",
    date: "2026-06-11",
    title: "IIEC Asia-Pacific Director Visit",
    kind: "visit",
    projects: ["sicat"],
    photos: photos("2026-06-11-iiec-asia-pacific-director-visit", 3, "IIEC Asia-Pacific Director visit to QISLaP"),
  },
  {
    id: "trademaster",
    date: "2026-06-02",
    title: "Trademaster Corporation",
    kind: "visit",
    projects: ["sicat"],
    photos: photos("2026-06-02-trademaster-corporation-visit", 1, "Visit with Trademaster Corporation"),
  },
  {
    id: "solarized",
    date: "2026-05-06",
    title: "Solarized Inc. Visit",
    kind: "visit",
    projects: ["sicat"],
    photos: photos("2026-05-06-solarized-inc-visit", 1, "Visit with Solarized Inc."),
  },
  {
    id: "doe-usec-guevara",
    date: "2026-01-13",
    title: "Meeting with DOE Undersecretary Dr. Rowena Cristina L. Guevara",
    kind: "meeting",
    projects: [],
    photos: photos("2026-01-13-meeting-with-doe-undersecretary-guevara", 1, "QISLaP meeting with DOE Undersecretary Dr. Rowena Cristina L. Guevara"),
  },
  {
    id: "asean-quantum-summit-2025",
    date: "2025-12-10",
    endDate: "2025-12-12",
    title: "Q-RIEnTe on the ASEAN Quantum Map",
    subtitle: "ASEAN Quantum Summit 2025",
    location: "Malaysia",
    kind: "conference",
    projects: ["q-riente"],
    summary:
      "Q-RIEnTe was included on the ASEAN quantum map as part of the Philippine country report, and cited by ASEAN Secretary-General Dr. Kao Kim Hourn as a notable initiative exploring quantum-based approaches to optimizing power grid efficiency.",
    photos: [],
  },
  {
    id: "inauguration",
    date: "2025-03-21",
    title: "DOST–QISLaP Projects Grand MOU Signing and QISLaP Inauguration",
    subtitle: "With DOST-PCIEERD, Department of Energy, PBI, BATELEC I and the Quantum Computing Society of the Philippines",
    location: "T.I.P. Manila",
    kind: "milestone",
    projects: [],
    summary: "QISLaP is formally inaugurated and the partnership agreements for its projects are signed.",
    photos: photos("2025-03-21-dost-qislap-grand-mou-signing-and-inauguration", 5, "DOST–QISLaP Grand MOU Signing and Inauguration"),
  },
];

export const sortedEvents = [...events].sort((a, b) => b.date.localeCompare(a.date));
export const eventsFor = (project: ProjectId) =>
  sortedEvents.filter((e) => e.projects.length === 0 || e.projects.includes(project));

export const photoSrc = (p: EventPhoto, size: "sm" | "lg" = "lg") =>
  `/images/events/${p.folder}/photo${p.n}${size === "sm" ? "-sm" : ""}.webp`;
