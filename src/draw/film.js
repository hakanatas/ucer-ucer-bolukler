/* ─────────────────────────────────────────────────────────────
   The film's continuous state as pure functions of time.
   A place-value table that grows to the left in groups of three
   (birler, binler, milyonlar, milyarlar). Every group is read the same
   way, then its name is said; a group of 000 is not read.
   ───────────────────────────────────────────────────────────── */
(function (LI) {
  'use strict';
  const { seg, clamp, lerp, outBack, outCubic, hump } = LI.E;
  const A = LI.Ang, KD = LI.KD, Ink = LI.Ink;

  /** the numbers on the place-value table over time */
  const STATES = [
    { t0: 10.6, n: '384400', cx: 'Ay’a uzaklık: yaklaşık 384 400 km' },
    { t0: 26.4, n: '150000000', cx: 'Güneş’e uzaklık: yaklaşık 150 000 000 km' },
    { t0: 46.4, n: '3241123', cx: 'Bir sayı: 3 241 123' },
    { t0: 56.2, n: '3000085', cx: 'Bir sayı daha: 3 000 085' },
    { t0: 64.4, n: '8000000000', cx: 'Dünya’da 8 milyardan fazla insan yaşıyor' },
  ];
  const stateAt = (t) => { let k = 0; STATES.forEach((s, i) => { if (t >= s.t0) k = i; }); return k; };
  const BOLUK = ['birler', 'binler', 'milyonlar', 'milyarlar'];
  const NAME = ['', 'bin', 'milyon', 'milyar'];
  const PLACE = ['yüz', 'on', 'bir'];
  const ONES = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
  const TENS = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
  /** read a number 0..999 in Turkish ("" for 0) */
  function read3(v) {
    const h = Math.floor(v / 100), t = Math.floor(v / 10) % 10, o = v % 10, w = [];
    if (h) w.push(h === 1 ? 'yüz' : ONES[h] + ' yüz');
    if (t) w.push(TENS[t]);
    if (o) w.push(ONES[o]);
    return w.join(' ');
  }
  /** split a digit string into groups of three from the right: [birler, binler, ...] */
  const groups = (n) => { const g = []; for (let i = n.length; i > 0; i -= 3) g.push(n.slice(Math.max(0, i - 3), i)); return g; };
  /** reading of group k (with its name), '' if it is 000 */
  function readGroup(n, k) {
    const v = +groups(n)[k]; if (!v) return '';
    if (k === 1 && v === 1) return 'bin';
    return (read3(v) + ' ' + NAME[k]).trim();
  }
  const readTR = (n) => groups(n).map((_, k) => readGroup(n, k)).reverse().filter(Boolean).join(' ') || 'sıfır';
  const T = (ctx, s, x, y, o = {}) => A.text(ctx, s, x, y, Object.assign({ size: 48 }, o));
  const AMB = { color: A.amber };


  /** a sack at (x, y) with scale s holding 4 balls (n amber); k: 0..1 appear; balls(i) → 0..1 */
  function bag(ctx, x, y, s, n, a, k, balls, m = 4) {
    if (a <= 0 || k <= 0) return;
    const w = (m === 6 ? 190 : 150) * s, h = 150 * s, top = y - h * 0.55;
    const P = [[x - w * 0.34, top], [x - w * 0.52, y + h * 0.05], [x - w * 0.46, y + h * 0.42], [x, y + h * 0.5], [x + w * 0.46, y + h * 0.42], [x + w * 0.52, y + h * 0.05], [x + w * 0.34, top]];
    ctx.fillStyle = `rgba(${LI.PAPER_RGB},${0.9 * a})`;
    ctx.beginPath(); P.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill();
    Ink.path(ctx, P, { w: 6 * Math.max(0.5, s), p: k, alpha: a, seed: 210, taper: [0.2, 0.2], wob: 0.15 });
    Ink.path(ctx, [[x - w * 0.36, top - 4], [x + w * 0.36, top - 4]], { w: 5 * Math.max(0.5, s), p: k, alpha: a, seed: 211, taper: [0.1, 0.1] });
    const r = (m === 6 ? 20 : 22) * s;
    const grid = m === 6 ? [[-1, -0.5], [0, -0.5], [1, -0.5], [-1, 0.5], [0, 0.5], [1, 0.5]].map(([a, b]) => [a * 0.9, b]) : [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]];
    grid.forEach(([dx, dy], i) => {
      const g = balls ? balls(i) : 1; if (g <= 0) return;
      const cx = x + dx * r * 2.3, cy = y + h * 0.12 + dy * r * 2.3, rr = r * outBack(clamp(g));
      ctx.fillStyle = i < n ? `rgba(${LI.AMBER_RGB},${0.95 * a})` : `rgba(${LI.INK_RGB},${0.85 * a})`;
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(${LI.INK_RGB},${0.8 * a})`; ctx.lineWidth = 2.5 * Math.max(0.5, s); ctx.stroke();
    });
  }

  /** a hand-drawn check mark at (x, y) */
  function tick(ctx, x, y, p, a = 1) {
    if (p <= 0 || a <= 0) return;
    Ink.path(ctx, [[x, y], [x + 12, y + 14], [x + 38, y - 20]], { w: 7, p, alpha: a, color: LI.AMBER_RGB, seed: 401, taper: [0.05, 0.3] });
  }
  /** text width in the brush font */
  function width(ctx, s, size) { ctx.save(); ctx.font = `${size}px "LI Brush", "Comic Sans MS", cursive`; const w = ctx.measureText(s).width; ctx.restore(); return w; }

  /** Nokta, as a function of time */
  function nokta(t, env) {
    const L = KD.L(env);
    const p = { x: L.nx, y: L.gy, s: L.s, mouth: 0.4, brow: 0.1 };
    const g = outCubic(seg(t, 1.3, 2.3));
    p.born = { body: lerp(0.3, 1, g), legs: outCubic(seg(t, 2.0, 2.6)), arms: outCubic(seg(t, 2.3, 2.8)), tuft: outBack(seg(t, 2.5, 2.9)) };
    if (t < 3.0) { p.sq = lerp(0.4, 1, clamp(LI.E.spring(seg(t, 1.3, 3.0) * 2, 8, 3.4), 0, 1.3)); p.drop = 1 - g; p.wobble = 1 - seg(t, 1.3, 2.8); }
    p.eyeOpen = outCubic(seg(t, 2.8, 3.1));
    KD.look(p, [L.TB.cx, L.TB.y]);
    if (t > 20.8 && t < 24 || t > 40 && t < 44 || t > 50 && t < 53 || t > 59 && t < 62 || t > 70 && t < 74) KD.look(p, [L.FULL.x, L.FULL.y]);
    if (t > 2.9 && t < 5.6) { p.hold = 'brush'; p.brushAng = -0.8 + 0.3 * Math.sin(t * 9); p.hands = { R: [1.35, -0.2 + 0.15 * Math.sin(t * 9)] }; }
    const pointing = (a, b) => { if (t > a && t < b) { p.point = 'R'; p.hands = { L: [-1.2, 0.55], R: [1.5, -0.35] }; } };
    pointing(15.8, 18.4); pointing(30.4, 33.4); pointing(57.8, 60.0); pointing(72.4, 75.4);
    const think = seg(t, 11.0, 11.4) * (1 - seg(t, 13.4, 13.7)) + seg(t, 26.8, 27.2) * (1 - seg(t, 29.4, 29.7)) + seg(t, 64.8, 65.2) * (1 - seg(t, 67.4, 67.7));
    if (think > 0) { p.hands = { L: [-1.2, 0.55], R: [0.75, -1.05 + 0.08 * Math.sin(t * 14)] }; p.brow = -0.5 * think; p.mouth = 0; p.lookY -= 0.3; }
    if (t > 56.4 && t < 57.8) { p.mouthOpen = 0.55; p.eyeScale = 1.1; }
    const joy = (a, b) => { if (t > a && t < b) { p.squint = 1; p.mouth = 1; p.sq = 1 + 0.1 * hump(t, a, a + 0.6); p.y -= 26 * hump(t, a, a + 0.6); p.hands = { L: [-1.3, -0.35], R: [1.3, -0.35] }; } };
    joy(23.0, 24.6); joy(42.2, 43.8); joy(76.4, 78.0);
    if (t > 84.0) {
      const j = (t - 84.0) % 1.4;
      p.squint = 1; p.mouth = 1; p.turn = 0.15; p.lookX = 0.3; p.lookY = 0;
      p.sq = 1 + 0.1 * Math.sin(Math.PI * clamp(j / 0.6)); p.y -= 40 * Math.sin(Math.PI * clamp(j / 0.6));
      p.hands = { L: [-1.35, -0.6 - 0.2 * Math.sin(t * 6)], R: [1.35, -0.6 + 0.2 * Math.sin(t * 6)] };
      if (t > 89.2) { p.squint = 0; p.lookX = 0; p.lookY = 0.2; p.turn = 0; p.y = L.gy; p.sq = 1; p.hands = { L: [-1.2, 0.55], R: [1.2, -1.0 + 0.25 * Math.sin(t * 10)] }; }
    }
    p.blink = Math.max(hump(t, 5.8, 5.95), hump(t, 21.0, 21.15), hump(t, 34.0, 34.15), hump(t, 47.0, 47.15), hump(t, 58.0, 58.15), hump(t, 70.0, 70.15));
    return p;
  }

  function base(ctx, env, t, cam, drawBefore) {
    const L = KD.L(env);
    LI.Ambient.specks(ctx, env, cam, t, { alpha: 0.22, n: 18, depth: 0.4, seed: 21 });
    LI.Camera.apply(ctx, env, cam);
    KD.ground(ctx, env, L.nx, L.gy);
    if (drawBefore) drawBefore();
    LI.Nokta.draw(ctx, LI.Nokta.follow((tt) => nokta(tt, env), t), t);
    if (t < 1.35 && t > 0.3) { const f = seg(t, 0.3, 1.3); Ink.dot(ctx, L.nx, lerp(-700, L.gy - 14, f * f), 15, { seed: 2, bleed: 0 }); }
    if (t > 1.3) Ink.drops(ctx, L.nx, L.gy - 4, t - 1.3, { n: 9, seed: 5, ground: L.gy + 4, scale: 0.8, alpha: 1 - seg(t, 4, 8) * 0.6 });
    return L;
  }

  LI.Film = { STATES, stateAt, BOLUK, NAME, PLACE, read3, groups, readGroup, readTR, T, AMB, tick, width, nokta, base };
})(window.LI = window.LI || {});
