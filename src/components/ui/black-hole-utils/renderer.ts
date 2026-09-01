// ponytail: canvas-2D approximation of a black hole. Real renderer (WebGL
// raycasting / accretion disc shaders) is ~1k lines and was not shipped with
// the task source; this is the visual that still reads as a black hole.
// Upgrade path: swap the draw loop body for OGL/WebGL when fidelity matters.

export type Renderer = {
  ready: Promise<void>;
  dispose: () => void;
};

export function createRenderer({
  canvas,
}: {
  canvas: HTMLCanvasElement;
}): Renderer {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { ready: Promise.reject(), dispose: () => {} };

  let raf = 0;
  let running = true;

  const computeSize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(canvas.clientWidth * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const draw = (t: number) => {
    if (!running) return;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    ctx.clearRect(0, 0, w, h);

    const cx = w / 2;
    const cy = h / 2;
    const maxRing = Math.min(w, h) * 0.9;

    // Photon rings: rotating concentric arcs that bend inward.
    for (let i = 0; i < 60; i++) {
      const p = i / 60;
      const r = maxRing * Math.pow(p, 3);
      const speed = 0.0013 + (1 - p) * 0.005;
      const offset = t * speed + p * 6;
      ctx.strokeStyle = `rgba(255, ${140 + p * 100}, ${40 + p * 60}, ${0.5 * (1 - p) + 0.05})`;
      ctx.lineWidth = 1 + p * 3;
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.7, 0, offset, offset + Math.PI * 0.8);
      ctx.stroke();
    }

    // Glow behind the hole, so the center stays black.
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRing * 0.5);
    glow.addColorStop(0, "rgba(0,0,0,1)");
    glow.addColorStop(0.18, "rgba(255,140,40,0.25)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, maxRing * 0.5, 0, Math.PI * 2);
    ctx.fill();

    // Infalling motes.
    for (let i = 0; i < 80; i++) {
      const seed = Math.sin(i * 127.1 + 311.7) * 0.5 + 0.5;
      const a = seed * Math.PI * 2 + t * 0.0004;
      const r = (0.15 + ((Math.sin(i * 269.5 + 183.3) * 0.5 + 0.5) % 0.85)) * maxRing * 0.45;
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a * 1.13) * r * 0.72;
      ctx.fillStyle = `rgba(255, 200, 120, ${0.6 - (r / (maxRing * 0.45)) * 0.5})`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    raf = requestAnimationFrame(draw);
  };

  computeSize();
  const ro = new ResizeObserver(computeSize);
  ro.observe(canvas);

  const ready = Promise.resolve().then(() => {
    raf = requestAnimationFrame(draw);
  });

  return {
    ready,
    dispose: () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
  };
}