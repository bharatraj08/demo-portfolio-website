// Small logo: two nodes joined by a line, with an amber packet on it
export function BrandMark({ size = 28 }: { size?: number }) {
  return (
    <svg className="brand-mark" width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect className="bm-frame" x="0.75" y="0.75" width="26.5" height="26.5" rx="5" />
      <rect className="bm-node" x="5.5" y="6" width="7" height="7" rx="1.2" />
      <rect className="bm-node" x="15.5" y="15" width="7" height="7" rx="1.2" />
      <path className="bm-edge" d="M 12.5 9.5 H 19 V 15" />
      <circle className="bm-packet" cx="19" cy="9.5" r="2" />
    </svg>
  );
}
