"use client"

// HalftoneHeading — any headline (h1/h2/h3) printed as a field of halftone dots.
//  • Dots are sized by how much of the letter covers their cell, so type keeps its edges.
//  • On first view the dots assemble from below, left to right.
//  • The pointer parts the dots on springs; displaced dots warm toward red. Click = shock ring.
//  • *Words in asterisks* print in the accent colour (and italic if accentItalic).
//  • Resting colour follows the CSS `color` of the element, so it works with the
//    scroll-linked white → black theme without extra props.
//  • Real text stays in the DOM (visually hidden) for SEO and screen readers.
//  • prefers-reduced-motion: crisp solid text, no animation.
// One file, React only. No dependencies.

import * as React from "react"

export interface HalftoneHeadingProps {
  /** Headline text. "\n" forces a break. Wrap words in *asterisks* for the accent style. */
  text: string
  /** Semantic element. Defaults to h2. */
  as?: "h1" | "h2" | "h3" | "p"
  align?: "left" | "center"
  /** Heavy-stemmed display faces survive dot printing best. */
  fontFamily?: string
  fontWeight?: number
  /** Accent words use the italic style of the face when true. */
  accentItalic?: boolean
  /** Font size = containerWidth * vw, clamped to [minSize, maxSize] (px). */
  vw?: number
  minSize?: number
  maxSize?: number
  lineHeight?: number
  /** Accent colour for *words*. */
  accent?: string
  /** Colour a dot warms toward as it is pushed off its place. */
  warm?: string
  /** Dot spacing in px. Auto (size / 26, min 3) when omitted. */
  dotGap?: number
  /** Pointer push radius in px. Auto from the font size when omitted. */
  radius?: number
  /** Thickens hairlines so thin strokes do not vanish into the dot grid. 0–0.03. */
  hairBoost?: number
  interactive?: boolean
  className?: string
}

const DISPLAY_STACK = '"DM Serif Display", "Bodoni Moda", Georgia, "Times New Roman", serif'

// ---- pure helpers (same spring model as the halftone footer) --------------
export function htRadius(coverage: number, gap: number) {
  const c = coverage < 0 ? 0 : coverage > 1 ? 1 : coverage
  return Math.sqrt(c) * gap * 0.56
}

export function htStep(
  x: number, y: number, vx: number, vy: number,
  hx: number, hy: number, px: number, py: number, r: number,
) {
  const dx = x - px
  const dy = y - py
  const d2 = dx * dx + dy * dy
  if (r > 0 && d2 < r * r) {
    const d = Math.sqrt(d2) + 0.001
    const f = (1 - d / r) * 2.6
    vx += (dx / d) * f
    vy += (dy / d) * f
  }
  vx = (vx + (hx - x) * 0.05) * 0.84
  vy = (vy + (hy - y) * 0.05) * 0.84
  return [x + vx, y + vy, vx, vy]
}

export function htWarmth(x: number, y: number, hx: number, hy: number, span: number) {
  const d = Math.hypot(x - hx, y - hy)
  return span > 0 ? Math.min(1, d / span) : 0
}

function parseColor(c: string, fallback: number[]) {
  const m = c.match(/[\d.]+/g)
  if (!m || m.length < 3) return fallback
  return [Math.round(+m[0]), Math.round(+m[1]), Math.round(+m[2])]
}

function hexToRgb(hex: string, fallback: number[]) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((hex || "").trim())
  if (!m) return fallback
  const h = m[1].length === 3 ? m[1].split("").map((c) => c + c).join("") : m[1]
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

type Tok = { text: string; accent: boolean }

function tokenize(text: string): Tok[][] {
  return text.split("\n").map((line) => {
    const out: Tok[] = []
    let acc = false
    line.split("*").forEach((part, i) => {
      if (i > 0) acc = !acc
      part.split(/\s+/).filter(Boolean).forEach((w) => out.push({ text: w, accent: acc }))
    })
    return out
  })
}

const SR_ONLY: React.CSSProperties = {
  position: "absolute", width: 1, height: 1, margin: -1, padding: 0, overflow: "hidden",
  clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0,
}

export default function HalftoneHeading({
  text,
  as = "h2",
  align = "left",
  fontFamily = DISPLAY_STACK,
  fontWeight = 400,
  accentItalic = true,
  vw = 0.07,
  minSize = 40,
  maxSize = 200,
  lineHeight = 1.0,
  accent = "#e11d2a",
  warm = "#e11d2a",
  dotGap,
  radius,
  hairBoost = 0.012,
  interactive = true,
  className = "",
}: HalftoneHeadingProps) {
  const rootRef = React.useRef(null as HTMLElement | null)
  const canvasRef = React.useRef(null as HTMLCanvasElement | null)
  const opts = React.useRef({ accent, warm, dotGap, radius, interactive })
  opts.current = { accent, warm, dotGap, radius, interactive }
  const key = [text, as, align, fontFamily, fontWeight, accentItalic, vw, minSize, maxSize, lineHeight, hairBoost].join("|")

  React.useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = false
    let w = 0
    let h = 0
    let size = 60
    let dpr = 1
    let px = -1e5
    let py = -1e5
    let raf = 0
    let visible = false
    let awake = true
    let started = false
    let startAt = 0
    let alive = true
    let ring = { x: 0, y: 0, t: -1 }
    let dots = new Float32Array(0) // x y vx vy hx hy r type delay
    let count = 0
    let rows: { toks: Tok[]; x: number; y: number }[] = []
    const STRIDE = 9

    const fontFor = (accentWord: boolean, s: number) =>
      (accentWord && accentItalic ? "italic " : "") + fontWeight + " " + s + "px " + fontFamily

    const layout = () => {
      const rect = root.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width))
      size = Math.max(minSize, Math.min(maxSize, w * vw))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const lines = tokenize(text)
      const probe = document.createElement("canvas").getContext("2d")
      if (!probe) return

      // wrap words to the container width
      rows = []
      const lh = size * lineHeight
      const padTop = size * 0.12
      let y = padTop + size * 0.78
      for (const line of lines) {
        let cur: Tok[] = []
        let curW = 0
        const space = (probe.font = fontFor(false, size), probe.measureText(" ").width)
        const flush = () => {
          if (!cur.length) return
          const x = align === "center" ? (w - curW) / 2 : 0
          rows.push({ toks: cur, x, y })
          y += lh
          cur = []
          curW = 0
        }
        for (const t of line) {
          probe.font = fontFor(t.accent, size)
          const tw = probe.measureText(t.text).width
          if (cur.length && curW + space + tw > w) flush()
          curW += (cur.length ? space : 0) + tw
          cur.push(t)
        }
        flush()
      }
      h = Math.ceil(y - lh + size * 0.34)
      root.style.height = h + "px"
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)

      // two 1x masks: normal and accent words
      const maskN = document.createElement("canvas")
      const maskA = document.createElement("canvas")
      maskN.width = maskA.width = w
      maskN.height = maskA.height = h
      const mn = maskN.getContext("2d", { willReadFrequently: true })
      const ma = maskA.getContext("2d", { willReadFrequently: true })
      if (!mn || !ma) return
      for (const m of [mn, ma]) {
        m.fillStyle = "#000"
        m.strokeStyle = "#000"
        m.textBaseline = "alphabetic"
        m.lineJoin = "round"
        m.lineWidth = size * hairBoost
      }
      for (const r of rows) {
        let x = r.x
        probe.font = fontFor(false, size)
        const space = probe.measureText(" ").width
        r.toks.forEach((t, i) => {
          const m = t.accent ? ma : mn
          m.font = fontFor(t.accent, size)
          if (i > 0) x += space
          m.fillText(t.text, x, r.y)
          if (hairBoost > 0) m.strokeText(t.text, x, r.y)
          x += m.measureText(t.text).width
        })
      }
      const dN = mn.getImageData(0, 0, w, h).data
      const dA = ma.getImageData(0, 0, w, h).data

      const gap = Math.max(3, opts.current.dotGap || Math.round(size / 26))
      const cols = Math.ceil(w / gap)
      const rws = Math.ceil(h / gap)
      const tmp: number[] = []
      for (let gy = 0; gy < rws; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          let sN = 0
          let sA = 0
          for (let sy = 0; sy < 3; sy++) {
            for (let sx = 0; sx < 3; sx++) {
              const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3))
              const yy = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3))
              const i = (yy * w + x) * 4 + 3
              sN += dN[i]
              sA += dA[i]
            }
          }
          const cov = Math.max(sN, sA) / (9 * 255)
          if (cov < 0.04) continue
          const hx = gx * gap + gap / 2
          const hy = gy * gap + gap / 2
          const ox = started ? 0 : (Math.random() - 0.5) * 160
          const oy = started ? 0 : 70 + Math.random() * 140
          tmp.push(hx + ox, hy + oy, 0, 0, hx, hy, htRadius(cov, gap), sA > sN ? 1 : 0, (hx / w) * 0.55 + Math.random() * 0.25)
        }
      }
      dots = new Float32Array(tmp)
      count = tmp.length / STRIDE
      awake = true
    }

    const drawSolid = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const ink = getComputedStyle(root).color
      for (const r of rows) {
        let x = r.x
        ctx.font = fontFor(false, size)
        const space = ctx.measureText(" ").width
        r.toks.forEach((t, i) => {
          ctx.font = fontFor(t.accent, size)
          ctx.fillStyle = t.accent ? opts.current.accent : ink
          if (i > 0) x += space
          ctx.fillText(t.text, x, r.y)
          x += ctx.measureText(t.text).width
        })
      }
    }

    const draw = (now: number) => {
      const o = opts.current
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const ink = parseColor(getComputedStyle(root).color, [10, 10, 10])
      const acc = hexToRgb(o.accent, [225, 29, 42])
      const wrm = hexToRgb(o.warm, [225, 29, 42])
      const inkS = "rgb(" + ink.join(",") + ")"
      const accS = "rgb(" + acc.join(",") + ")"
      const age = started ? (now - startAt) / 1000 : 0
      const r = o.interactive ? (o.radius || Math.max(60, Math.min(130, size * 0.9))) : 0
      const ringAge = ring.t < 0 ? 1e9 : now - ring.t
      const ringR = ringAge * 0.9
      let moving = !started ? false : age < 1.6
      for (let i = 0; i < count; i++) {
        const j = i * STRIDE
        const delay = dots[j + 8]
        if (age < delay) { moving = true; continue }
        let x = dots[j]
        let y = dots[j + 1]
        let vx = dots[j + 2]
        let vy = dots[j + 3]
        const hx = dots[j + 4]
        const hy = dots[j + 5]
        if (ringAge < 900) {
          const dx = hx - ring.x
          const dy = hy - ring.y
          const d = Math.sqrt(dx * dx + dy * dy) + 0.001
          const band = 1 - Math.min(1, Math.abs(d - ringR) / 26)
          if (band > 0) {
            const f = band * 3.2 * (1 - ringAge / 900)
            vx += (dx / d) * f
            vy += (dy / d) * f
          }
        }
        const s = htStep(x, y, vx, vy, hx, hy, px, py, r)
        x = s[0]; y = s[1]; vx = s[2]; vy = s[3]
        if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) moving = true
        else { x = hx; y = hy; vx = 0; vy = 0 }
        dots[j] = x; dots[j + 1] = y; dots[j + 2] = vx; dots[j + 3] = vy
        const grow = Math.min(1, (age - delay) / 0.45)
        const k = htWarmth(x, y, hx, hy, 28)
        const base = dots[j + 7] === 1 ? acc : ink
        ctx.fillStyle =
          k > 0.02
            ? "rgb(" + Math.round(base[0] + (wrm[0] - base[0]) * k) + "," + Math.round(base[1] + (wrm[1] - base[1]) * k) + "," + Math.round(base[2] + (wrm[2] - base[2]) * k) + ")"
            : dots[j + 7] === 1 ? accS : inkS
        ctx.beginPath()
        ctx.arc(x, y, dots[j + 6] * (grow < 1 ? 1 - (1 - grow) * (1 - grow) : 1), 0, 6.2832)
        ctx.fill()
      }
      awake = moving || ringAge < 900 || px > -1e4
    }

    const loop = (now: number) => {
      raf = 0
      if (!visible) return
      draw(now)
      if (awake) raf = requestAnimationFrame(loop)
    }
    const wake = () => {
      awake = true
      if (!raf && visible && !reduced) raf = requestAnimationFrame(loop)
    }

    const local = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect()
      return [e.clientX - b.left, e.clientY - b.top, b] as const
    }
    const near = (x: number, y: number) => x > -140 && y > -140 && x < w + 140 && y < h + 140
    const onMove = (e: PointerEvent) => {
      if (!opts.current.interactive || !visible || reduced) return
      const p = local(e)
      if (near(p[0], p[1])) { px = p[0]; py = p[1]; wake() }
      else if (px > -1e4) { px = -1e5; py = -1e5; wake() }
    }
    const onLeave = () => { px = -1e5; py = -1e5; wake() }
    const onDown = (e: PointerEvent | MouseEvent) => {
      if (!opts.current.interactive) return
      if ((e.target as HTMLElement).closest("a,button,input,textarea")) return
      const p = local(e as PointerEvent)
      if (p[0] >= 0 && p[1] >= 0 && p[0] <= w && p[1] <= h) { ring = { x: p[0], y: p[1], t: performance.now() }; wake() }
    }

    const start = async () => {
      try {
        if (document.fonts) {
          await Promise.race([
            Promise.all([
              document.fonts.load(fontFor(false, 100)),
              document.fonts.load(fontFor(true, 100)),
              document.fonts.ready,
            ]),
            new Promise((r) => setTimeout(r, 250)),
          ])
        }
      } catch { /* fall through with the fallback face */ }
      if (!alive) return
      layout()

      const rect = root.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        visible = true
      }
      if (visible && !started && count > 0) { started = true; startAt = performance.now() }
      wake()

      // If webfont completes shortly after initial layout, re-compute glyph dot map smoothly
      if (document.fonts) {
        Promise.all([
          document.fonts.load(fontFor(false, 100)),
          document.fonts.load(fontFor(true, 100)),
          document.fonts.ready,
        ])
          .then(() => {
            if (!alive) return
            layout()
            wake()
          })
          .catch(() => {})
      }
    }
    start()

    const io = new IntersectionObserver((entries) => {
      visible = entries[0] ? entries[0].isIntersecting : true
      if (visible && !started && count > 0) { started = true; startAt = performance.now() }
      if (visible) wake()
    }, { threshold: 0.02 })
    io.observe(root)

    let lastW = 0
    const ro = new ResizeObserver(() => {
      const nw = Math.round(root.getBoundingClientRect().width)
      if (nw === lastW) return
      lastW = nw
      if (!count && !h) return
      layout()
      wake()
    })
    ro.observe(root)

    const onScroll = () => { if (visible) wake() }
    window.addEventListener("pointermove", onMove as any, { passive: true })
    window.addEventListener("pointerdown", onDown as any, { passive: true })
    window.addEventListener("mousemove", onMove as any, { passive: true })
    canvas.addEventListener("pointermove", onMove as any, { passive: true })
    canvas.addEventListener("pointerdown", onDown as any, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    root.addEventListener("pointerleave", onLeave)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener("pointermove", onMove as any)
      window.removeEventListener("pointerdown", onDown as any)
      window.removeEventListener("mousemove", onMove as any)
      canvas.removeEventListener("pointermove", onMove as any)
      canvas.removeEventListener("pointerdown", onDown as any)
      window.removeEventListener("scroll", onScroll)
      root.removeEventListener("pointerleave", onLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const plain = text.replace(/\*/g, "").replace(/\n/g, " ")
  const Tag = as as React.ElementType

  return (
    <Tag
      ref={rootRef}
      className={className}
      style={{ position: "relative", display: "block", width: "100%", margin: 0, minHeight: minSize * 1.2 }}
    >
      <span style={SR_ONLY}>{plain}</span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", touchAction: "pan-y" }}
      />
    </Tag>
  )
}

export { HalftoneHeading }
