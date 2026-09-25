// Global site settings. Replace the TODO values before going live.
export const site = {
  name: "QISLaP",
  fullName: "Quantum and Intelligent Systems Laboratory for Power Engineering",
  tagline: "Making hybrid quantum computing practical for the Philippine energy sector",
  description:
    "QISLaP is a DOST-PCIEERD funded research laboratory at the Technological Institute of the Philippines developing hybrid quantum-classical computing for power and energy systems.",
  inaugurated: "2025-03-21",
  host: {
    institution: "Technological Institute of the Philippines (T.I.P.)",
    unit: "TechnoCoRe (Technopreneurship and Collaborative Applied Research)",
    url: "https://www.tip.edu.ph",
  },
  funder: {
    name: "DOST-PCIEERD",
    fullName:
      "Department of Science and Technology – Philippine Council for Industry, Energy and Emerging Technology Research and Development",
    url: "https://pcieerd.dost.gov.ph",
  },
  address: {
    room: "Room A301, Arlegui Building",
    campus: "T.I.P. Manila",
    street: "1338 Arlegui Street, Quiapo",
    city: "Manila 1001",
    country: "Philippines",
  },
  // Uses the exact Google listing name for the Arlegui Campus (14.596151, 120.990562).
  // A generic "T.I.P. Manila" search can land on the P. Casal or Cubao campus instead.
  mapEmbed:
    "https://maps.google.com/maps?q=Technological+Institute+of+the+Philippines+Arlegui+Campus,+Arlegui+St,+Quiapo,+Manila&z=17&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=Technological+Institute+of+the+Philippines+Arlegui+Campus%2C+Arlegui+St%2C+Quiapo%2C+Manila",
  email: "gfrancesco.apolinario@qislap.com",
  // Optional: a Formspree (or similar) endpoint, e.g. "https://formspree.io/f/xxxxxxx".
  // When empty, the contact form opens the visitor's email app with the message pre-filled.
  formEndpoint: "",
  // TODO: replace with the lab's real social links. Entries with an empty href are hidden.
  socials: [
    { label: "Facebook", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "YouTube", href: "" },
  ],
} as const;

export const nav = [
  { href: "/about/", label: "About" },
  { href: "/projects/", label: "Projects" },
  { href: "/team/", label: "Team" },
  { href: "/engagements/", label: "Engagements" },
  { href: "/partners/", label: "Partners" },
  { href: "/contact/", label: "Contact" },
] as const;
