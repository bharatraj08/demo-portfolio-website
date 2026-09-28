import Link from "next/link";
import { profile } from "@/content/site";
import { BrandMark } from "./BrandMark";
import { MobileMenu } from "./MobileMenu";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#experience", label: "Experience" },
  { href: "/#stack", label: "Stack" },
  { href: "/#about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link href="/" className="brand">
          <BrandMark />
          <span>{profile.name}</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <a className="button button-signal header-cta" href={`mailto:${profile.email}`}>
          Email me
        </a>
        <MobileMenu items={nav} email={profile.email} />
      </div>
    </header>
  );
}
