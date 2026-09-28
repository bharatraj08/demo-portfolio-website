import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <div className="wrap">
        <p className="nf-code">404</p>
        <h1 className="page-title">Page not found</h1>
        <p className="page-intro">The page you're looking for doesn't exist or has moved.</p>
        <div className="actions">
          <Link className="button button-signal" href="/">
            Go to the homepage
          </Link>
          <Link className="button button-line" href="/projects/">
            See projects
          </Link>
        </div>
      </div>
    </main>
  );
}
