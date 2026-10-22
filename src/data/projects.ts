export type ProjectId = "q-riente" | "sicat";

export type Milestone = { date: string; title: string; description?: string; upcoming?: boolean };

export type Project = {
  id: ProjectId;
  name: string;
  expansion: string;
  fullTitle: string;
  duration?: string;
  summary: string;
  overview: string[];
  objectives: string[];
  cooperatingAgency?: string;
  collaborators?: string[];
  sdgs?: { goal: number; label: string }[];
  milestones: Milestone[];
  cover: string; // /public path
  logo?: string; // /public path to the project logo (optional)
  accent: "yellow" | "orange";
};

export const projects: Project[] = [
  {
    id: "q-riente",
    name: "Q-RIEnTe",
    expansion: "Quantum Research for Industrial Energy Technology",
    fullTitle: "Q-RIEnTe Project: Quantum Computing-based Forecasting and Optimization Applied to Electric Power Grid",
    duration: "36 months · September 2024 – August 2027",
    summary:
      "Hybrid quantum-classical forecasting and optimization for the power sector, tested on the real operating needs of Batangas I Electric Cooperative (BATELEC I).",
    overview: [
      "Q-RIEnTe develops hybrid quantum-classical computing models for the power sector, tested on real operating needs at Batangas I Electric Cooperative (BATELEC I).",
      "The models forecast electricity demand, wind speed, solar irradiance and electricity prices, and support unit commitment and economic dispatch optimization.",
      "The tools are packaged as a software-as-a-service proof of concept on a hybrid cloud.",
    ],
    objectives: [
      "Develop predictive models using hybrid quantum algorithms for renewable energy, electricity price and demand.",
      "Develop a decision support system for BATELEC I using quantum-inspired optimization.",
      "Simulate a robust optimizer that accounts for forecast errors and price uncertainty, using real quantum solvers.",
      "Draft a position paper and socio-economic study on quantum computing for the Philippine energy sector.",
    ],
    cooperatingAgency: "Batangas I Electric Cooperative (BATELEC I)",
    collaborators: [
      "Chung Yuan Christian University (Taiwan)",
      "Batangas State University – The National Engineering University",
      "Department of Energy",
    ],
    sdgs: [
      { goal: 7, label: "Affordable and Clean Energy" },
      { goal: 9, label: "Industry, Innovation and Infrastructure" },
    ],
    milestones: [
      { date: "2024-09", title: "Project start", description: "Q-RIEnTe begins its 36-month program under DOST-PCIEERD." },
      { date: "2025-03", title: "Grand MOU signing & QISLaP inauguration", description: "Partnership agreements signed, including with BATELEC I." },
      { date: "2025-12", title: "On the ASEAN quantum map", description: "Q-RIEnTe featured in the Philippine country report at the ASEAN Quantum Summit 2025." },
      { date: "2026-01", title: "Meeting with DOE Undersecretary", description: "Engagement with the Department of Energy on quantum computing for the energy sector." },
      { date: "2026-07", title: "IEEE qCCL 2026 paper", description: "GPU-based hybrid quantum computing for EV charging station decision planning, presented in Aalborg, Denmark." },
      { date: "2026-07", title: "Taiwan Quantum Workshop", description: "Collaboration with the Quantum Information Center, Chung Yuan Christian University." },
      { date: "2026-08", title: "Quantum Launchpad & 1st R&D Workshop", description: "Student workshops at T.I.P. Quezon City and Manila, followed by the lab's first R&D workshop." },
      { date: "2027-08", title: "Project completion", description: "SaaS proof of concept, decision support system and position paper delivered.", upcoming: true },
    ],
    cover: "/images/events/2026-08-27-qislap-student-workshop-day2-tip-manila/photo4.webp",
    logo: "/brand/qriente-logo.svg",
    accent: "yellow",
  },
  {
    id: "sicat",
    name: "SICAT",
    // TODO: replace with the official acronym expansion and full project title.
    expansion: "Solar PV Systems Testing, Standards and International Cooperation",
    fullTitle: "SICAT Project — full title to be announced",
    // TODO: add project duration, e.g. "24 months · January 2026 – December 2027"
    summary:
      "Strengthening solar PV systems testing and standards in the Philippines through industry engagement and international cooperation.",
    // TODO: replace with the official project description.
    overview: [
      "SICAT focuses on solar photovoltaic (PV) systems testing, standards and international cooperation.",
      "The project works with government, the power distribution sector and local solar industry players, and benchmarks against established PV testing laboratories in the region, to support quality and reliability of solar PV installations in the Philippines.",
    ],
    // TODO: replace with the official project objectives.
    objectives: [
      "Benchmark regional solar PV systems testing laboratories and standards practices.",
      "Engage government, utility and industry partners on PV testing and standards needs.",
      "Build international cooperation for solar PV testing capability in the Philippines.",
    ],
    collaborators: ["Department of Energy", "MERALCO", "IIEC Asia-Pacific", "Trademaster Resources Corporation", "Flaretech Solar Energy", "Solarized Incorporated"],
    // TODO: add SDGs if applicable, e.g. sdgs: [{ goal: 7, label: "Affordable and Clean Energy" }],
    milestones: [
      { date: "2026-05", title: "Industry engagements begin", description: "Visits with Solarized Inc., Trademaster Corporation and Flaretech Technologies." },
      { date: "2026-06", title: "IIEC Asia-Pacific Director visit" },
      { date: "2026-07", title: "MERALCO & MSpectrum inception meeting", description: "Industry engagement milestone with the country's largest distribution utility." },
      { date: "2026-07", title: "Thailand technical benchmarking", description: "Visits to CSSC-KMUTT, PTEC-NSTDA, PEA and IIEC." },
    ],
    cover: "/images/events/2026-07-12-sicat-thailand-solar-pv-benchmarking/photo2.webp",
    logo: "/brand/sicat-logo.svg",
    accent: "orange",
  },
];

export const getProject = (id: string) => projects.find((p) => p.id === id);
export const projectName = (id: ProjectId) => getProject(id)!.name;
