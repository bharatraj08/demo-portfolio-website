export function ServiceIcon({ kind }: { kind: "ai" | "backend" | "cloud" }) {
  return (
    <svg className="service-icon" viewBox="0 0 44 44" aria-hidden="true">
      {kind === "ai" && (
        <>
          <circle cx="22" cy="22" r="6.5" />
          <circle cx="8" cy="9" r="3" />
          <circle cx="36" cy="9" r="3" />
          <circle cx="8" cy="35" r="3" />
          <circle cx="36" cy="35" r="3" />
          <path d="M10.4 11 L17.2 17.4 M33.6 11 L26.8 17.4 M10.4 33 L17.2 26.6 M33.6 33 L26.8 26.6" />
          <circle className="accent" cx="22" cy="22" r="2.2" />
        </>
      )}
      {kind === "backend" && (
        <>
          <rect x="6" y="6" width="32" height="9" rx="1.5" />
          <rect x="6" y="17.5" width="32" height="9" rx="1.5" />
          <rect x="6" y="29" width="32" height="9" rx="1.5" />
          <path d="M26 10.5 H33 M26 22 H33 M26 33.5 H33" />
          <circle className="accent" cx="11" cy="22" r="1.8" />
        </>
      )}
      {kind === "cloud" && (
        <>
          <rect className="dashed" x="4" y="4" width="36" height="36" rx="2" />
          <rect x="12" y="24" width="20" height="11" rx="1.5" />
          <path d="M22 21 V10 M17.5 14.5 L22 10 L26.5 14.5" />
          <circle className="accent" cx="22" cy="29.5" r="1.8" />
        </>
      )}
    </svg>
  );
}
