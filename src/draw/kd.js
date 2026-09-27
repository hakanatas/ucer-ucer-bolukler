/* Shared layout + Nokta helpers for "Üçer Üçer Bölükler". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? {
          TB: { cx: 0, W: 960, cmax: 130, y: -360, g: 16 },
          CX: { x: 0, y: -590, s: 42, w: 900 },
          FULL: { x: 0, y: 30, s: 50, w: 940 },
          PAT: { x: 0, y: 115, s: 36, w: 940 },
          RULE: { x: 0, y: [20, 100, 180], s: 48 },
          nx: -360, gy: 560, s: 1.15 }
        : {
          TB: { cx: 80, W: 1320, cmax: 130, y: -175, g: 30 },
          CX: { x: 80, y: -400, s: 50, w: 1200 },
          FULL: { x: 80, y: 175, s: 54, w: 1250 },
          PAT: { x: 80, y: 255, s: 42, w: 1250 },
          RULE: { x: 80, y: [160, 235, 310], s: 54 },
          nx: -800, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
