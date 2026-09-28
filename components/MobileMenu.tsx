"use client";

import Link from "next/link";
import { useRef } from "react";

export function MobileMenu({ items, email }: { items: { href: string; label: string }[]; email: string }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (menu.current) menu.current.open = false;
  };

  return (
    <details className="menu" ref={menu}>
      <summary>Menu</summary>
      <nav aria-label="Main">
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={close}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={`mailto:${email}`} onClick={close}>
              Email me
            </a>
          </li>
        </ul>
      </nav>
    </details>
  );
}
