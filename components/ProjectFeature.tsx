import Link from "next/link";
import type { Project } from "@/content/projects";
import { SystemDiagram } from "./SystemDiagram";

export function ProjectFeature({ project, flipped = false }: { project: Project; flipped?: boolean }) {
  const href = `/projects/${project.slug}/`;
  const tech = project.stack.flatMap((g) => g.items).slice(0, 6);

  return (
    <article className={`project-feature${flipped ? " is-flipped" : ""}`}>
      <div className="project-figure panel">
        <SystemDiagram diagram={project.diagram} motion="hover" labels={false} delay={0} fontScale={1.15} />
      </div>
      <div className="project-copy">
        <h3 className="project-name">
          <Link href={href}>{project.name}</Link>
        </h3>
        <p className="project-category">{project.category}</p>
        <p className="project-summary">{project.summary}</p>
        <ul className="dash-list project-highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="project-stack">{tech.join(", ")}</p>
        <Link className="text-link project-link" href={href}>
          Read the case study
        </Link>
      </div>
    </article>
  );
}
