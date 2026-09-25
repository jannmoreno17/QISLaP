import type { Metadata } from "next";
import EventTimeline from "@/components/EventTimeline";
import { Container, PageHero } from "@/components/ui";
import { sortedEvents } from "@/data/events";

export const metadata: Metadata = {
  title: "Engagements & Events",
  description: "Workshops, benchmarking visits, industry meetings and milestones from QISLaP, Q-RIEnTe and SICAT.",
};

export default function EngagementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Engagements & events"
        title="Workshops, visits and milestones"
        intro="From our inauguration to international workshops and industry benchmarking, newest first. Select any photo to enlarge it."
      />
      <section className="py-16 sm:py-24">
        <Container className="max-w-5xl">
          <EventTimeline events={sortedEvents} />
        </Container>
      </section>
    </>
  );
}
