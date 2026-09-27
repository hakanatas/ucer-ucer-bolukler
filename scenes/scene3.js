/* SAHNE 3 — MİLYONLAR (26–46 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 3, start: 26, end: 46, name: 'Millions', nameTr: 'Milyonlar', concept: 'The pattern repeats: yüz, on, bir', conceptTr: 'Örüntü tekrar eder: yüz, on, bir', render });
})(window.LI = window.LI || {});
