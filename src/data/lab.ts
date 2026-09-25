// Lab profile content, from the QISLaP Laboratory Brochure (Appendix E) and publication material.

export const lab = {
  intro:
    "QISLaP is a trailblazing research facility, the first of its kind in the Philippines, focused on applying hybrid quantum computing to real-world power engineering problems. It is a cross-disciplinary research hub that blends classical computing with quantum approaches, AI, optimization and emerging digital technologies.",

  mission: {
    statement:
      "To develop hybrid quantum computing solutions that enhance energy production, distribution and consumption, addressing the challenges of power and energy through:",
    pillars: [
      { ket: "hybrid", title: "Hybrid quantum computing", text: "Leveraging machine learning and optimization techniques to address complex challenges in power and energy." },
      { ket: "classical", title: "Classical computing", text: "Machine learning, artificial intelligence and optimization." },
      { ket: "emerging", title: "Other technologies", text: "Edge and cloud computing, real-time simulation, blockchain and more." },
    ],
  },

  vision: [
    "Bridge the gap between classical and quantum computing in solving power and energy engineering problems.",
    "Be a national center of excellence in quantum computing applied research for power and energy.",
    "Inspire curriculum modernization, faculty development and student training in quantum and intelligent systems.",
    "Lay the groundwork for future smart grid solutions powered by next-generation computing.",
  ],

  /** The hybrid quantum-classical loop, shown as a 3-step pipeline. */
  workflow: [
    {
      step: "01",
      label: "Classical pre-processing",
      title: "Data & formulation",
      text: "Grid data are cleaned and features engineered; optimization problems such as unit commitment are reformulated (e.g. MILP → QUBO) for quantum hardware.",
    },
    {
      step: "02",
      label: "Quantum processing",
      title: "Parameterized circuits",
      text: "Quantum circuits and solvers tackle the hard sub-problems (optimization and pattern recognition) on simulators and real quantum devices.",
    },
    {
      step: "03",
      label: "Classical post-processing",
      title: "Decisions for the grid",
      text: "Measurements are decoded and validated, feeding forecasts and decision support for utilities like BATELEC I.",
    },
  ],

  whyItMatters: {
    text: "The energy sector is evolving fast. Renewables, electric vehicles and smart infrastructure add scale, uncertainty and interconnectedness that are pushing traditional computational tools to their limits. Quantum computing offers a paradigm shift for problems that are intractable today:",
    problems: ["Unit commitment with renewables", "Real-time power flow optimization", "Security-constrained economic dispatch", "Predictive maintenance scheduling"],
  },

  roadmap: [
    {
      period: "2024 – 2027",
      title: "Hybrid intelligence foundations",
      text: "Classical AI/ML, optimization and multi-criteria decision-making, augmented by hybrid quantum models. Cloud computing and IoT integration enable early AIoT deployment across the energy value chain.",
    },
    {
      period: "2027 – 2032",
      title: "Real-time, distributed control",
      text: "SaaS frameworks for power system operations, hybrid quantum decision support systems (HQ-DSS) coupled with real-time simulation, edge computing and digital twins, generative AI, and quantum-secure blockchain.",
    },
    {
      period: "2030 onwards",
      title: "Smart decision support systems",
      text: "Adaptive, predictive and self-optimizing systems orchestrating smart grids, microgrids and networked microgrids, underpinned by quantum-enhanced analytics.",
    },
  ],

  infrastructure: [
    { value: "9", label: "Workstations & servers", detail: "Lenovo ThinkStation and Dell Precision machines" },
    { value: "RTX A4000", label: "NVIDIA GPUs", detail: "For deep learning and GPU-accelerated quantum simulation" },
    { value: "Hybrid", label: "Quantum access", detail: "Quantum simulators today; power-system testbed integration planned" },
  ],
} as const;
