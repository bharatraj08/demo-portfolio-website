// Draws a system architecture diagram from a small grid-based description.
// Nodes sit on a grid; edges are routed with right-angle lines; small "packets"
// travel along the edges in order, like a request moving through the system.

export type Side = "left" | "right" | "top" | "bottom";
export type NodeKind = "client" | "service" | "store" | "queue";

export type DiagramNode = {
  id: string;
  label: string;
  sub?: string | string[];
  col: number;
  row: number;
  kind: NodeKind;
  /** Third-party service outside your own system (drawn dashed). */
  external?: boolean;
  rowSpan?: number;
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  fromSide?: Side;
  toSide?: Side;
  /** Seconds into the loop when a packet starts moving along this edge. */
  at?: number;
};

export type Diagram = {
  id: string;
  title: string;
  description: string;
  cols: number;
  rows: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

type Layout = { col: number; row: number; w: number; h: number; pad: number; label: number; sub: number };
type Box = { x: number; y: number; w: number; h: number };
type Pt = [number, number];

const LAYOUTS: Record<"wide" | "compact", Layout> = {
  wide: { col: 206, row: 100, w: 156, h: 60, pad: 30, label: 13, sub: 11 },
  compact: { col: 150, row: 100, w: 128, h: 62, pad: 26, label: 15.5, sub: 12.5 },
};

const TRAVEL = 0.9; // seconds a packet spends on one edge
const PAUSE = 1.4; // quiet time before the loop repeats

const TRANSPOSED_SIDE: Record<Side, Side> = { left: "top", right: "bottom", top: "left", bottom: "right" };
const r = (n: number) => Math.round(n * 100) / 100;

function boxOf(n: DiagramNode, L: Layout, transpose: boolean): Box {
  const col = transpose ? n.row : n.col;
  const row = transpose ? n.col : n.row;
  const span = n.rowSpan ?? 1;
  const x = L.pad + col * L.col;
  const y = L.pad + row * L.row;
  return transpose
    ? { x, y, w: L.w + (span - 1) * L.col, h: L.h }
    : { x, y, w: L.w, h: L.h + (span - 1) * L.row };
}

const center = (b: Box): Pt => [b.x + b.w / 2, b.y + b.h / 2];

function defaultSides(a: Box, b: Box): [Side, Side] {
  const [ax, ay] = center(a);
  const [bx, by] = center(b);
  const dx = bx - ax;
  const dy = by - ay;
  const overlapY = (by > a.y && by < a.y + a.h) || (ay > b.y && ay < b.y + b.h);
  const overlapX = (bx > a.x && bx < a.x + a.w) || (ax > b.x && ax < b.x + b.w);
  if (overlapY) return dx > 0 ? ["right", "left"] : ["left", "right"];
  if (overlapX) return dy > 0 ? ["bottom", "top"] : ["top", "bottom"];
  if (Math.abs(dx) >= Math.abs(dy)) return [dx > 0 ? "right" : "left", dy > 0 ? "top" : "bottom"];
  return [dy > 0 ? "bottom" : "top", dx > 0 ? "left" : "right"];
}

function port(b: Box, side: Side, toward: Pt): Pt {
  const [cx, cy] = center(b);
  const inset = 16;
  const tallY = b.h > 90 ? Math.min(Math.max(toward[1], b.y + inset), b.y + b.h - inset) : cy;
  const wideX = b.w > 200 ? Math.min(Math.max(toward[0], b.x + inset), b.x + b.w - inset) : cx;
  if (side === "left") return [b.x, tallY];
  if (side === "right") return [b.x + b.w, tallY];
  if (side === "top") return [wideX, b.y];
  return [wideX, b.y + b.h];
}

function route(p0: Pt, s0: Side, p3: Pt, s3: Side): Pt[] {
  const h0 = s0 === "left" || s0 === "right";
  const h3 = s3 === "left" || s3 === "right";
  if (h0 && h3) {
    if (Math.abs(p0[1] - p3[1]) < 0.5) return [p0, p3];
    const mx = (p0[0] + p3[0]) / 2;
    return [p0, [mx, p0[1]], [mx, p3[1]], p3];
  }
  if (!h0 && !h3) {
    if (Math.abs(p0[0] - p3[0]) < 0.5) return [p0, p3];
    const my = (p0[1] + p3[1]) / 2;
    return [p0, [p0[0], my], [p3[0], my], p3];
  }
  return h0 ? [p0, [p3[0], p0[1]], p3] : [p0, [p0[0], p3[1]], p3];
}

function labelSpot(pts: Pt[]): { x: number; y: number; anchor: "middle" | "start" } {
  let best = 0;
  let bestLen = -1;
  for (let i = 0; i < pts.length - 1; i++) {
    const len = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]);
    if (len > bestLen) {
      bestLen = len;
      best = i;
    }
  }
  const [a, b] = [pts[best], pts[best + 1]];
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const horizontal = Math.abs(a[1] - b[1]) < 0.5;
  return horizontal ? { x: mx, y: my - 7, anchor: "middle" } : { x: mx + 8, y: my + 4, anchor: "start" };
}

function NodeShape({ n, b }: { n: DiagramNode; b: Box }) {
  const cls = `node node-${n.kind}${n.external ? " is-external" : ""}`;
  if (n.kind === "client") {
    return <rect className={cls} x={b.x} y={b.y} width={b.w} height={b.h} rx={Math.min(b.w, b.h) / 2} />;
  }
  if (n.kind === "store") {
    const ry = 7;
    const body = `M ${b.x} ${b.y + ry} A ${b.w / 2} ${ry} 0 0 1 ${b.x + b.w} ${b.y + ry} V ${b.y + b.h - ry} A ${b.w / 2} ${ry} 0 0 1 ${b.x} ${b.y + b.h - ry} Z`;
    const rim = `M ${b.x} ${b.y + ry} A ${b.w / 2} ${ry} 0 0 0 ${b.x + b.w} ${b.y + ry}`;
    return (
      <g className={cls}>
        <path d={body} />
        <path d={rim} className="rim" />
      </g>
    );
  }
  if (n.kind === "queue") {
    return (
      <g className={cls}>
        <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={3} />
        {[20, 14, 8].map((o) => (
          <line key={o} className="slot" x1={b.x + b.w - o} x2={b.x + b.w - o} y1={b.y + 12} y2={b.y + b.h - 12} />
        ))}
      </g>
    );
  }
  return <rect className={cls} x={b.x} y={b.y} width={b.w} height={b.h} rx={3} />;
}

export function SystemDiagram({
  diagram,
  variant = "wide",
  motion = "always",
  delay = 0.4,
  labels = true,
  fontScale = 1,
  className = "",
}: {
  diagram: Diagram;
  variant?: "wide" | "compact";
  /** "always" loops packets, "hover" shows them while the figure is hovered, "none" draws a still diagram. */
  motion?: "always" | "hover" | "none";
  delay?: number;
  labels?: boolean;
  /** Enlarges text when the diagram is shown small. */
  fontScale?: number;
  className?: string;
}) {
  const base = LAYOUTS[variant];
  const L = { ...base, label: base.label * fontScale, sub: base.sub * fontScale };
  const edgeLabelSize = base.sub * Math.min(fontScale, 1.05);
  const transpose = variant === "compact";
  const uid = `${diagram.id}-${variant}`;
  const cols = transpose ? diagram.rows : diagram.cols;
  const rows = transpose ? diagram.cols : diagram.rows;
  const W = L.pad * 2 + (cols - 1) * L.col + L.w;
  const H = L.pad * 2 + (rows - 1) * L.row + L.h;

  const boxes = new Map(diagram.nodes.map((n) => [n.id, boxOf(n, L, transpose)]));

  const edges = diagram.edges.map((e, i) => {
    const a = boxes.get(e.from);
    const b = boxes.get(e.to);
    if (!a || !b) throw new Error(`Diagram "${diagram.id}": unknown node in edge ${e.from} -> ${e.to}`);
    const fix = (s?: Side) => (s && transpose ? TRANSPOSED_SIDE[s] : s);
    const [ds0, ds3] = defaultSides(a, b);
    const s0 = fix(e.fromSide) ?? ds0;
    const s3 = fix(e.toSide) ?? ds3;
    const p0 = port(a, s0, center(b));
    const p3 = port(b, s3, p0);
    const pts = route(p0, s0, p3, s3);
    const d = `M ${pts.map(([x, y]) => `${r(x)} ${r(y)}`).join(" L ")}`;
    return { key: `${e.from}-${e.to}-${i}`, d, pts, label: e.label, at: e.at ?? i * TRAVEL };
  });

  const cycle = Math.max(...edges.map((e) => e.at)) + TRAVEL + PAUSE;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={`diagram diagram-${variant} ${className}`.trim()}
      data-motion={motion}
      role="img"
      aria-labelledby={`${uid}-title ${uid}-desc`}
    >
      <title id={`${uid}-title`}>{diagram.title}</title>
      <desc id={`${uid}-desc`}>{diagram.description}</desc>
      <defs>
        <marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path className="arrowhead" d="M 1.5 1.5 L 9 5 L 1.5 8.5" />
        </marker>
        <filter id={`${uid}-glow`} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="edges">
        {edges.map((e) => (
          <path key={e.key} className="edge" d={e.d} markerEnd={`url(#${uid}-arrow)`} />
        ))}
      </g>

      <g className="nodes">
        {diagram.nodes.map((n) => {
          const b = boxes.get(n.id)!;
          const subs = n.sub ? (Array.isArray(n.sub) ? n.sub : [n.sub]) : [];
          const cx = b.x + b.w / 2 - (n.kind === "queue" ? 8 : 0);
          const cy = b.y + b.h / 2 + (n.kind === "store" ? 3 : 0);
          const gap = L.sub + 3.5;
          const first = cy - (subs.length * gap) / 2 + L.label * 0.36;
          return (
            <g key={n.id}>
              <NodeShape n={n} b={b} />
              <text className="node-label" x={r(cx)} y={r(first)} fontSize={L.label} textAnchor="middle">
                {n.label}
              </text>
              {subs.map((s, i) => (
                <text key={s} className="node-sub" x={r(cx)} y={r(first + (i + 1) * gap + 1)} fontSize={L.sub} textAnchor="middle">
                  {s}
                </text>
              ))}
            </g>
          );
        })}
      </g>

      {labels && (
        <g className="edge-labels" aria-hidden="true">
          {edges
            .filter((e) => e.label)
            .map((e) => {
              const spot = labelSpot(e.pts);
              return (
                <text key={`l-${e.key}`} className="edge-label" x={r(spot.x)} y={r(spot.y)} textAnchor={spot.anchor} fontSize={edgeLabelSize}>
                  {e.label}
                </text>
              );
            })}
        </g>
      )}

      {motion !== "none" && (
        <g className="packets" filter={`url(#${uid}-glow)`} aria-hidden="true">
          {edges.map((e) => {
            const a = r((e.at + 0.05) / cycle);
            const b = r(Math.min((e.at + 0.05 + TRAVEL) / cycle, 0.999));
            return (
              <circle key={`p-${e.key}`} className="packet" r={3.4} opacity={0}>
                <animateMotion
                  path={e.d}
                  dur={`${r(cycle)}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                  calcMode="linear"
                  keyPoints="0;0;1;1"
                  keyTimes={`0;${a};${b};1`}
                />
                <animate
                  attributeName="opacity"
                  dur={`${r(cycle)}s`}
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                  calcMode="discrete"
                  values="0;1;0"
                  keyTimes={`0;${a};${b}`}
                />
              </circle>
            );
          })}
        </g>
      )}
    </svg>
  );
}
