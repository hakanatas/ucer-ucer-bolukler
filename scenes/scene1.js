/* SAHNE 1 — BÜYÜK SAYILAR (0–10 s)  Big numbers are all around us.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, outBack } = LI.E;
  const KD = LI.KD, F = () => LI.Film, Ink = LI.Ink, A = LI.Ang;
  const END = (t) => 1 - seg(t, 90.4, 91.4);
  const RD = [7.4, 8.6, 1.6, 1.6, 3.2];    // when the group readings start (after the state appears)
  const FL = [10.8, 13.6, 4.4, 4.2, 6.2];  // when the full reading starts

  /** write text, shrinking it to fit width w */
  function fit(ctx, s, x, y, size, w, o = {}) {
    const f = F(), m = f.width(ctx, s, size);
    f.T(ctx, s, x, y, Object.assign({ size: m > w ? size * w / m : size }, o));
  }
  /** table geometry for n digits: cell size c and right edge xr */
  function geo(TB, n) {
    const ng = Math.ceil(n / 3), c = Math.min(TB.cmax, (TB.W - (ng - 1) * TB.g) / n), w = n * c + (ng - 1) * TB.g;
    return { c, xr: TB.cx + w / 2 };
  }
  const cellX = (G, TB, j) => G.xr - (j + 0.5) * G.c - Math.floor(j / 3) * TB.g;

  function intro(ctx, env, t) {
    const L = KD.L(env), f = F(), i = seg(t, 3.6, 4.4) * (1 - seg(t, 9.8, 10.4)); if (i <= 0) return;
    ['1 000', '1 000 000', '1 000 000 000'].forEach((s, k) => {
      const a = seg(t, 4.0 + k * 1.2, 4.6 + k * 1.2) * i;
      if (a > 0) f.T(ctx, s, L.CX.x, (env.V ? -560 : -260) + k * (env.V ? 110 : 120), Object.assign({ size: (env.V ? 60 : 72) * (0.7 + 0.3 * outBack(seg(t, 4.0 + k * 1.2, 4.6 + k * 1.2))), alpha: a }, k === 2 ? f.AMB : {}));
    });
  }

  /** the place-value table: cells grow to the left in groups of three */
  function table(ctx, env, t) {
    const L = KD.L(env), TB = L.TB, f = F(), a = seg(t, 11.6, 12.2) * END(t); if (a <= 0) return;
    const k = f.stateAt(t), S = f.STATES[k], P = k ? f.STATES[k - 1] : null;
    const cur = S.n, prev = P ? P.n : '', len = Math.max(cur.length, prev.length);
    const g0 = geo(TB, (prev || cur).length), g1 = geo(TB, cur.length), mm = k === 0 ? 1 : LI.E.inOut(seg(t, S.t0, S.t0 + 0.8));
    const G = { c: lerp(g0.c, g1.c, mm), xr: lerp(g0.xr, g1.xr, mm) }, c = G.c;
    const Y = { top: TB.y, py: TB.y - 0.3 * c, hy: TB.y - 0.66 * c, by: TB.y + c + 20, ry: TB.y + c + 20 + 0.36 * c, ny: TB.y + c + 20 + 0.76 * c };
    const cy = TB.y + c / 2;
    const pat = seg(t, 30.4, 31.0) * (1 - seg(t, 33.4, 34.0));
    for (let j = 0; j < len; j++) {
      const dc = cur[cur.length - 1 - j], dp = prev[prev.length - 1 - j];
      const m = k === 0 ? seg(t, 12.0 + j * 0.15, 12.4 + j * 0.15) : seg(t, S.t0 + 0.05 * j, S.t0 + 0.5 + 0.05 * j);
      const ca = (dc !== undefined ? m : 0) + (dp !== undefined ? 1 - m : 0);
      if (ca <= 0.01) continue;
      const x = cellX(G, TB, j), grp = Math.floor(j / 3);
      Ink.path(ctx, [[x - c / 2, TB.y], [x + c / 2, TB.y], [x + c / 2, TB.y + c], [x - c / 2, TB.y + c], [x - c / 2, TB.y]], { w: 5, alpha: a * ca, seed: 300 + j, taper: [0, 0], wob: 0.15 });
      if (dp !== undefined && m < 1) f.T(ctx, dp, x, cy + 4, { size: c * 0.66, alpha: a * (1 - m) });
      if (dc !== undefined && m > 0) f.T(ctx, dc, x, cy + 4 - 20 * (1 - outBack(m)), { size: c * 0.66, alpha: a * m });
      // place names: yüz, on, bir, repeating in every group
      const pl = seg(t, 14.4 + j * 0.08, 14.9 + j * 0.08) * a * ca;
      if (pl > 0) f.T(ctx, f.PLACE[2 - (j % 3)], x, Y.py, Object.assign({ size: c * 0.26 * (1 + 0.25 * pat), alpha: pl }, pat > 0 ? f.AMB : {}));
    }
    // group headers and brackets
    const ng = Math.ceil(len / 3), ngc = Math.ceil(cur.length / 3);
    for (let g = 0; g < ng; g++) {
      const has = g < ngc ? (k === 0 ? 1 : seg(t, S.t0 + 0.3, S.t0 + 0.9)) : 1 - seg(t, S.t0, S.t0 + 0.5);
      const w0 = Math.min(3, cur.length - g * 3);
      const n = Math.max(1, g < ngc ? w0 : 3);
      const xl = cellX(G, TB, g * 3 + n - 1) - c / 2, xr2 = cellX(G, TB, g * 3) + c / 2, xm = (xl + xr2) / 2;
      const ga = seg(t, 15.8 + g * 0.4, 16.4 + g * 0.4) * a * has; if (ga <= 0) continue;
      f.T(ctx, f.BOLUK[g], xm, Y.hy, { size: c * 0.3, alpha: ga });
      Ink.path(ctx, [[xl + 4, Y.by - 14], [xl + 4, Y.by], [xr2 - 4, Y.by], [xr2 - 4, Y.by - 14]], { w: 5, alpha: ga, color: LI.AMBER_RGB, p: seg(t, 15.8 + g * 0.4, 16.8 + g * 0.4), seed: 320 + g, taper: [0, 0] });
      // reading of the group (for the current number only)
      if (g >= ngc) continue;
      const order = ngc - 1 - g, tr = S.t0 + RD[k] + order * 1.0;
      const ra = seg(t, tr, tr + 0.5) * a * (1 - seg(t, 80.0, 80.6));
      if (ra <= 0) continue;
      const v = +f.groups(cur)[g];
      if (v === 0 && ngc > 1) {
        fit(ctx, 'okunmaz', xm, Y.ry, c * 0.3, n * c, Object.assign({ alpha: ra }, f.AMB));
      } else {
        fit(ctx, f.read3(v) || 'sıfır', xm, Y.ry, c * 0.3, n * c + 10, { alpha: ra });
        if (f.NAME[g]) f.T(ctx, (g === 1 && v === 1) ? 'bin' : f.NAME[g], xm, Y.ny, Object.assign({ size: c * 0.34, alpha: ra }, f.AMB));
      }
    }
  }

  /** context line, full reading, pattern line, rule */
  function words(ctx, env, t) {
    const L = KD.L(env), f = F(), k = f.stateAt(t), S = f.STATES[k], a = END(t);
    if (t > 10.6) {
      const nx = f.STATES[k + 1], ca = seg(t, S.t0 + 0.2, S.t0 + 0.8) * (nx ? 1 : 1) * a * (1 - seg(t, 79.6, 80.2));
      if (ca > 0) fit(ctx, S.cx, L.CX.x, L.CX.y, L.CX.s, L.CX.w, { alpha: ca, halo: true, p: seg(t, S.t0 + 0.2, S.t0 + 1.4) });
      const tf = S.t0 + FL[k], fa = seg(t, tf, tf + 0.3) * a * (1 - seg(t, 80.0, 80.6));
      if (fa > 0) fit(ctx, f.readTR(S.n), L.FULL.x, L.FULL.y, L.FULL.s, L.FULL.w, Object.assign({ alpha: fa, halo: true, p: seg(t, tf, tf + 1.6) }, f.AMB));
    }
    const pa = seg(t, 72.4, 73.0) * (1 - seg(t, 80.0, 80.6));
    if (pa > 0) fit(ctx, 'her 3 basamakta yeni bölük: birler · binler · milyonlar · milyarlar', L.PAT.x, L.PAT.y, L.PAT.s, L.PAT.w, { alpha: pa, halo: true, p: seg(t, 72.4, 74.6) });
    if (t > 80.4) ['sağdan üçer üçer ayır,', 'her bölüğü üç basamaklı sayı gibi oku,', 'sonra bölüğün adını söyle'].forEach((s, i) =>
      fit(ctx, s, L.RULE.x, L.RULE.y[i], L.RULE.s, L.FULL.w, Object.assign({ alpha: a, halo: true, p: seg(t, 80.6 + i * 1.3, 82.0 + i * 1.3) }, i === 2 ? f.AMB : {})));
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { intro(ctx, env, t); table(ctx, env, t); words(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Big numbers', nameTr: 'Büyük sayılar', concept: 'Thousand, million, billion', conceptTr: 'Bin, milyon, milyar', render });
})(window.LI = window.LI || {});
