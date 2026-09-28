import Link from "next/link";
import { CopyEmail } from "@/components/CopyEmail";
import { ProjectFeature } from "@/components/ProjectFeature";
import { ServiceIcon } from "@/components/ServiceIcon";
import { SystemDiagram } from "@/components/SystemDiagram";
import { projects } from "@/content/projects";
import {
  about,
  education,
  experience,
  glance,
  heroDiagram,
  howIWork,
  profile,
  services,
  stack,
} from "@/content/site";

export default function Home() {
  return (
    <main id="main">
      {/* ---------- Hero ---------- */}
      <section className="hero" aria-labelledby="hero-name">
        <div className="wrap">
          <h1 id="hero-name" className="hero-name">
            <span className="hero-name-text">{profile.name}</span>
            <span className="dimension" aria-hidden="true">
              <span className="dim-line" />
              <span className="dim-label">Software developer in {profile.location}</span>
              <span className="dim-line" />
            </span>
          </h1>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="hero-headline">{profile.headline}</p>
              <p className="hero-intro">{profile.intro}</p>
              <div className="actions">
                <a className="button button-signal" href={`mailto:${profile.email}`}>
                  Email me
                </a>
                <Link className="button button-line" href="/#work">
                  See my work
                </Link>
              </div>
              <p className="availability">
                <span className="signal-mark" aria-hidden="true" />
                {profile.availability}
              </p>
            </div>

            <figure className="hero-figure panel">
              <SystemDiagram diagram={heroDiagram} variant="wide" delay={1.4} fontScale={1.22} className="only-wide" />
              <SystemDiagram diagram={heroDiagram} variant="compact" delay={1.4} className="only-compact" />
              <figcaption>
                <span>How a question moves through an AI feature I build.</span>
                <span className="legend">
                  <span className="legend-solid" aria-hidden="true" /> Your system
                  <span className="legend-dashed" aria-hidden="true" /> Third-party API
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ---------- Selected work ---------- */}
      <section id="work" className="section" aria-labelledby="work-title">
        <div className="wrap">
          <header className="section-head">
            <h2 id="work-title">Selected work</h2>
            <p>Three products I built end to end. Each case study shows what the product does and the architecture behind it.</p>
          </header>
          <div className="work-list">
            {projects.map((project, i) => (
              <ProjectFeature key={project.slug} project={project} flipped={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section id="services" className="section" aria-labelledby="services-title">
        <div className="wrap">
          <header className="section-head">
            <h2 id="services-title">What I can build for you</h2>
            <p>For startups and teams that need AI features, a backend that scales, or a complete product shipped to the cloud.</p>
          </header>
          <div className="services">
            {services.map((s) => (
              <div className="service" key={s.title}>
                <ServiceIcon kind={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <p className="tools">{s.tools.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section id="process" className="section" aria-labelledby="process-title">
        <div className="wrap">
          <header className="section-head">
            <h2 id="process-title">How I work</h2>
            <p>You stay in the loop from the first call to launch, with a plan you approve before any code is written.</p>
          </header>
          <ol className="process">
            {howIWork.map((step, i) => (
              <li key={step.title}>
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section id="experience" className="section" aria-labelledby="experience-title">
        <div className="wrap">
          <header className="section-head">
            <h2 id="experience-title">Experience</h2>
            <p>Building production software since {profile.since}, from real-time backends to GenAI products.</p>
          </header>
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.company} className={`job${job.current ? " is-current" : ""}`}>
                <div className="job-meta">
                  <p className="job-dates">
                    {job.start} – {job.end}
                  </p>
                  <p className="job-place">{job.location}</p>
                </div>
                <div className="job-body">
                  <h3>
                    {job.role}
                    <span className="job-company">{job.company}</span>
                  </h3>
                  <p className="job-summary">{job.summary}</p>
                  <ul className="dash-list">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li className="job is-education">
              <div className="job-meta">
                <p className="job-dates">
                  {education.start} – {education.end}
                </p>
                <p className="job-place">{education.location}</p>
              </div>
              <div className="job-body">
                <h3>
                  {education.degree}
                  <span className="job-company">{education.school}</span>
                </h3>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ---------- Stack ---------- */}
      <section id="stack" className="section" aria-labelledby="stack-title">
        <div className="wrap">
          <header className="section-head">
            <h2 id="stack-title">Stack</h2>
            <p>The tools I reach for and what I use each one for.</p>
          </header>
          <div className="bom">
            {stack.map((group) => (
              <div className="bom-group" key={group.group}>
                <h3>{group.group}</h3>
                <dl>
                  {group.items.map(([tool, use]) => (
                    <div key={tool}>
                      <dt>{tool}</dt>
                      <dd>{use}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" className="section" aria-labelledby="about-title">
        <div className="wrap">
          <header className="section-head">
            <h2 id="about-title">About</h2>
          </header>
          <div className="about">
            <div className="about-copy">
              {about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <aside className="title-block" aria-labelledby="glance-title">
              <h3 id="glance-title">At a glance</h3>
              <dl>
                {glance.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="section contact" aria-labelledby="contact-title">
        <div className="wrap">
          <h2 id="contact-title" className="contact-title">
            Have a product to build or a role to fill?
          </h2>
          <p className="contact-intro">Tell me what you're working on. Email is the fastest way to reach me.</p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="actions">
            <a className="button button-signal" href={`mailto:${profile.email}`}>
              Email me
            </a>
            <CopyEmail email={profile.email} />
            <a className="button button-line" href={profile.linkedin}>
              LinkedIn
            </a>
            <a className="button button-line" href={profile.github}>
              GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
