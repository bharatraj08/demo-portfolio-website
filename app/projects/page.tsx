import type { Metadata } from "next";
import { ProjectFeature } from "@/components/ProjectFeature";
import { projects } from "@/content/projects";
import { profile } from "@/content/site";

export const metadata: Metadata = {
  title: "Projects",
  description: `Case studies of AI-powered products built by ${profile.name}, each with the architecture behind it.`,
};

export default function ProjectsPage() {
  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <h1 className="page-title">Projects</h1>
          <p className="page-intro">
            Case studies of products I built end to end: what each one does, what I built, and the architecture behind it.
          </p>
        </div>
      </section>
      <section className="section section-flush" aria-label="All projects">
        <div className="wrap">
          <div className="work-list">
            {projects.map((project, i) => (
              <ProjectFeature key={project.slug} project={project} flipped={i % 2 === 1} />
            ))}
          </div>
          <p className="more-code">
            More of my code is on <a href={profile.github}>GitHub</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
