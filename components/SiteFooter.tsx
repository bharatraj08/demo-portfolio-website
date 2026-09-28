import { profile } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="footer-links">
          <li>
            <a href={`mailto:${profile.email}`}>Email</a>
          </li>
          <li>
            <a href={profile.linkedin}>LinkedIn</a>
          </li>
          <li>
            <a href={profile.github}>GitHub</a>
          </li>
        </ul>
        <p className="footer-note">
          Built with Next.js. <a href="https://github.com/bharatraj08/demo-portfolio-website">View the source</a>.
        </p>
      </div>
    </footer>
  );
}
