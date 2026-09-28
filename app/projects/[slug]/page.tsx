import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyEmail } from "@/components/CopyEmail";
import { SystemDiagram } from "@/components/SystemDiagram";
import { getProject, projects } from "@/content/projects";
import { profile } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} case study`,
    description: project.tagline,
    openGraph: { title: `${project.name} case study | ${profile.name}`, description: project.tagline },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const keyTech = project.stack.flatMap((g) => g.items).slice(0, 5).join(", ");

  return (
    <main id="main">
      <article>
        <header className="case-hero">
          <div className="wrap">
            <p className="crumbs">
              <Link href="/projects/">Projects</Link>
              <span aria-hidden="true">/</span>
              <span>{project.name}</span>
            </p>
            <h1 className="case-title">{project.name}</h1>
            <p className="case-tagline">{project.tagline}</p>
            <dl className="case-meta">
              <div>
                <dt>Domain</dt>
                <dd>{project.category}</dd>
              </div>
              <div>
                <dt>My role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Key tech</dt>
                <dd>{keyTech}</dd>
              </div>
              <div>
                <dt>Runs on</dt>
                <dd>{project.infrastructure}</dd>
              </div>
            </dl>
          </div>
        </header>

        <section className="case-figure-section" aria-label="Architecture">
          <div className="wrap">
            <figure className="panel case-figure">
              <div className="diagram-scroll">
                <SystemDiagram diagram={project.diagram} delay={0.6} />
              </div>
              <p className="scroll-hint">Swipe sideways to see the whole diagram.</p>
              <figcaption>
                <span>{project.caption}</span>
                <span className="legend">
                  <span className="legend-solid" aria-hidden="true" /> Built and run by the team
                  <span className="legend-dashed" aria-hidden="true" /> Third-party API
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="section case-body" aria-label="Case study">
          <div className="wrap case-grid">
            <h2>Overview</h2>
            <div className="case-overview">
              {project.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <h2>What I built</h2>
            <div className="features">
              {project.features.map((f) => (
                <div className="feature" key={f.title}>
                  <h3>{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>

            <h2>Tech stack</h2>
            <dl className="case-stack">
              {project.stack.map((g) => (
                <div key={g.group}>
                  <dt>{g.group}</dt>
                  <dd>{g.items.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <nav className="section case-next" aria-label="Next project">
          <div className="wrap">
            <p className="case-next-label">Next project</p>
            <Link className="case-next-link" href={`/projects/${next.slug}/`}>
              {next.name}
            </Link>
            <p className="case-next-tagline">{next.tagline}</p>
          </div>
        </nav>

        <section className="section contact contact-compact" aria-labelledby="case-contact-title">
          <div className="wrap">
            <h2 id="case-contact-title" className="contact-title">
              Need something like {project.name}?
            </h2>
            <p className="contact-intro">Tell me about your product. Email is the fastest way to reach me.</p>
            <div className="actions">
              <a className="button button-signal" href={`mailto:${profile.email}`}>
                Email me
              </a>
              <CopyEmail email={profile.email} />
              <Link className="button button-line" href="/projects/">
                All projects
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
