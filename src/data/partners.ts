import type { ProjectId } from "./projects";

/**
 * Partners and collaborators. `logo` is a file in public/images/partners.
 * A partner shared by several projects is listed once with multiple `projects`.
 */
export type Partner = {
  id: string;
  name: string;
  short: string;
  logo?: string;
  url?: string;
  projects: ProjectId[];
};

export const partners: Partner[] = [
  { id: "doe", name: "Department of Energy", short: "DOE", logo: "doe.webp", url: "https://doe.gov.ph", projects: ["q-riente", "sicat"] },
  {
    id: "batelec1",
    name: "Batangas I Electric Cooperative",
    short: "BATELEC I",
    logo: "batangas-i-electric-cooperative-batelec-i.webp",
    projects: ["q-riente"],
  },
  {
    id: "batstateu",
    name: "Batangas State University – The National Engineering University",
    short: "BatStateU",
    logo: "batangas-state-university.webp",
    url: "https://batstate-u.edu.ph",
    projects: ["q-riente"],
  },
  { id: "qcsp", name: "Quantum Computing Society of the Philippines", short: "QCSP", logo: "qcsp.webp", projects: ["q-riente"] },
  {
    id: "qic-cycu",
    name: "Quantum Information Center – Chung Yuan Christian University",
    short: "QIC – CYCU",
    logo: "qic-chung-yuan-christian-university.webp",
    projects: ["q-riente"],
  },
  {
    id: "adric",
    name: "Advanced Research Institute for Informatics, Computing and Networking (AdRIC) – De La Salle University",
    short: "AdRIC – DLSU",
    logo: "adric-de-la-salle-university.webp",
    projects: ["q-riente"],
  },
  {
    id: "starlab",
    name: "Space Technologies & Applications Research Laboratory (StarLab) – Adamson University",
    short: "StarLab – AdU",
    logo: "starlab-adamson-university.webp",
    projects: ["q-riente"],
  },
  {
    id: "minerva",
    name: "Machine Intelligence on Emerging Research for Vision & Automation (MINERVA Lab) – Adamson University",
    short: "MINERVA Lab – AdU",
    logo: "minerva-lab-adamson-university.webp",
    projects: ["q-riente"],
  },
  // { id: "meralco", name: "Manila Electric Company", short: "MERALCO", logo: "meralco.webp", url: "https://company.meralco.com.ph", projects: ["sicat"] },
  {
    id: "iiec",
    name: "International Institute for Energy Conservation – Asia-Pacific",
    short: "IIEC Asia-Pacific",
    logo: "iiec-asia-pacific.webp",
    url: "https://www.iiec.org",
    projects: ["sicat"],
  },
  {
    id: "trademaster",
    name: "Trademaster Resources Corporation",
    short: "Trademaster",
    logo: "trademaster-resources-corporation.webp",
    projects: ["sicat"],
  },
  { id: "flaretech", name: "Flaretech Solar Energy", short: "Flaretech", logo: "flaretech-solar-energy.webp", projects: ["sicat"] },
  { id: "solarized", name: "Solarized Incorporated", short: "Solarized", logo: "solarized-incorporated.webp", projects: ["sicat"] },
];

export const partnersFor = (project: ProjectId) => partners.filter((p) => p.projects.includes(project));
