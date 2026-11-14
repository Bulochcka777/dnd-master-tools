/**
 * DnD Master Tools — Зеркало миров (World Mirror)
 * Интерактивный боевой стол: тактическая сетка, живые карты (видео/gif/изображения),
 * библиотека интерактивных объектов (костры, факелы, вода, лужи, лава, порталы и др.),
 * погодные эффекты и многослойный туман войны.
 */
(function() {
  'use strict';

  // --- Коллекция векторных SVG-иконок для интерактивных объектов ---
  const PROP_ICONS_SVG = {
    torch: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M8.5 21.5l3.2-7.5" stroke="#a07d3b" stroke-width="2.2" stroke-linecap="round"/><path d="M10 21.5l1.5-3" stroke="#5c4318" stroke-width="2.5" stroke-linecap="round"/><path d="M8.5 13.5h7l-1 3.5h-5z" fill="#3e3831" stroke="#c9a84c" stroke-width="1.3" stroke-linejoin="round"/><path d="M12 2c2 3.5 4 5.2 4 8a4 4 0 0 1-8 0c0-2.8 2-4.5 4-8z" fill="#f59e0b" stroke="#fef08a" stroke-width="1.2"/><path d="M12 5.5c1 1.6 2 2.5 2 4.2a2 2 0 0 1-4 0c0-1.7 1-2.6 2-4.2z" fill="#fef08a"/></svg>`,
    campfire: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><ellipse cx="12" cy="19.5" rx="9" ry="2.5" stroke="#64748b" stroke-width="1.2" stroke-dasharray="2 3"/><path d="M4 19l16-3M20 19L4 16" stroke="#78350f" stroke-width="2.2" stroke-linecap="round"/><path d="M12 4c2.5 3 4.5 5.5 4.5 8.5a4.5 4.5 0 0 1-9 0c0-2.5 2-4.5 4.5-8.5z" fill="#ea580c" stroke="#f59e0b" stroke-width="1.3"/><path d="M12 7.5c1.5 2 2.5 3.5 2.5 5.5a2.5 2.5 0 0 1-5 0c0-1.5 1-2.8 2.5-5.5z" fill="#fef08a"/></svg>`,
    crystal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M12 2l7 7-7 13-7-13 7-7z" fill="rgba(192, 132, 252, 0.4)" stroke="#c084fc" stroke-width="1.6"/><path d="M12 2v20M5 9h14M12 2l3.5 7L12 22l-3.5-13L12 2z" stroke="#e9d5ff" stroke-width="1.2"/><path d="M19 4l.7 1.5 1.5.7-1.5.7-.7 1.5-.7-1.5-1.5-.7 1.5-.7.7-1.5z" fill="#7dd3fc"/></svg>`,
    candles: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><rect x="4" y="11" width="4" height="10" rx="1" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/><path d="M6 11v-2" stroke="#78350f" stroke-width="1.2" stroke-linecap="round"/><path d="M6 5.5c.8 1 1.2 1.8 1.2 2.5a1.2 1.2 0 0 1-2.4 0c0-.7.4-1.5 1.2-2.5z" fill="#f59e0b"/><rect x="10" y="8" width="4" height="13" rx="1" fill="#fffbeb" stroke="#d97706" stroke-width="1.2"/><path d="M12 8v-2" stroke="#78350f" stroke-width="1.2" stroke-linecap="round"/><path d="M12 2.5c.9 1.1 1.4 2 1.4 2.8a1.4 1.4 0 0 1-2.8 0c0-.8.5-1.7 1.4-2.8z" fill="#fef08a"/><rect x="16" y="14" width="4" height="7" rx="1" fill="#fef3c7" stroke="#d97706" stroke-width="1.2"/><path d="M18 14v-2" stroke="#78350f" stroke-width="1.2" stroke-linecap="round"/><path d="M18 8.5c.7.9 1.1 1.5 1.1 2.2a1.1 1.1 0 0 1-2.2 0c0-.7.4-1.3 1.1-2.2z" fill="#f59e0b"/></svg>`,
    water: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M2 13c3-1.5 6-1.5 9 0s6 1.5 9 0" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/><path d="M3 17c2.5-1.2 5-1.2 7.5 0s5 1.2 7.5 0" stroke="#0ea5e9" stroke-width="1.6" stroke-linecap="round"/><path d="M12 3c-1.5 2-3 4-3 6a3 3 0 0 0 6 0c0-2-1.5-4-3-6z" fill="#38bdf8" stroke="#bae6fd" stroke-width="1.2"/><ellipse cx="12" cy="18" rx="8" ry="3" stroke="#7dd3fc" stroke-width="1.2" stroke-dasharray="3 3"/></svg>`,
    puddle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M4 14c-1 3 2 6 7 6s9-1.5 9-4.5c0-2.5-3-4-6-4.5-2-.3-3.5-1.5-5.5-1-2.5.6-3.5 2-4.5 4z" fill="rgba(56, 189, 248, 0.3)" stroke="#38bdf8" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 16c1.5 1 4 1.5 7 1" stroke="#e0f2fe" stroke-width="1.4" stroke-linecap="round"/><path d="M12 4c-.8 1.2-1.5 2.2-1.5 3.2a1.5 1.5 0 0 0 3 0c0-1-.7-2-1.5-3.2z" fill="#38bdf8"/></svg>`,
    acid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M10 2h4M11 2v4.5L6.5 16A4 4 0 0 0 10 22h4a4 4 0 0 0 3.5-6L13 6.5V2" stroke="#4ade80" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.8 14h8.4" stroke="#86efac" stroke-width="1.4"/><path d="M8.5 17.5c1.5.5 5.5.5 7 0" stroke="#22c55e" stroke-width="1.4" stroke-linecap="round"/><circle cx="10" cy="18" r="1.2" fill="#bbf7d0"/><circle cx="13.5" cy="16" r="0.9" fill="#bbf7d0"/><circle cx="12" cy="12" r="1" fill="#4ade80"/></svg>`,
    blood: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M12 2.5C10 6 7 9.5 7 13.5a5 5 0 0 0 10 0c0-4-3-7.5-5-11z" fill="#991b1b" stroke="#e11d48" stroke-width="1.5"/><path d="M10 12c-1.5 2 0 4 2 4" stroke="#fecdd3" stroke-width="1.2" stroke-linecap="round"/><circle cx="4" cy="18" r="1.6" fill="#be123c"/><circle cx="19.5" cy="17" r="1.8" fill="#be123c"/><circle cx="17.5" cy="10" r="1.2" fill="#be123c"/></svg>`,
    lava: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M3 20l4-6 5 2 3-5 6 9H3z" fill="rgba(239, 68, 68, 0.3)" stroke="#78350f" stroke-width="1.5" stroke-linejoin="round"/><path d="M4 18l4-4 3 2 4-5 5 7" stroke="#f97316" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 14l2 3 3-2" stroke="#fef08a" stroke-width="1.4" stroke-linecap="round"/><path d="M15 11l2 4" stroke="#fef08a" stroke-width="1.4" stroke-linecap="round"/></svg>`,
    portal: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><circle cx="12" cy="12" r="9" stroke="#8b5cf6" stroke-width="2"/><circle cx="12" cy="12" r="6" stroke="#c084fc" stroke-width="1.5" stroke-dasharray="3 2"/><path d="M12 7a5 5 0 0 1 5 5c0 2.5-2.5 4-4 4s-3-1.5-3-3 1-2 2-2 1 .5 1 1" stroke="#67e8f9" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="12" r="1.5" fill="#f5f3ff"/></svg>`,
    smoke: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M7 19c-2.5 0-4-1.8-4-4 0-1.8 1.2-3.3 2.8-3.8C6.3 8.5 8.7 7 11.5 7c3.3 0 6 2.2 6.5 5.2 1.8.4 3 2 3 3.8 0 2.2-1.8 4-4 4H7z" fill="rgba(148, 163, 184, 0.3)" stroke="#94a3b8" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 15c1-1.5 3-2 5-1.5" stroke="#cbd5e1" stroke-width="1.4" stroke-linecap="round"/><path d="M10 5c-.5-1 .5-2 1.5-2s1.5.5 2 1.5" stroke="#64748b" stroke-width="1.2" stroke-linecap="round"/></svg>`,
    web: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"><path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke="#94a3b8" stroke-width="1.2"/><path d="M12 6l4.2 1.8L18 12l-1.8 4.2L12 18l-4.2-1.8L6 12l1.8-4.2L12 6z" stroke="#e2e8f0" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 9l2.1.9L15 12l-.9 2.1L12 15l-2.1-.9L9 12l.9-2.1L12 9z" stroke="#f8fafc" stroke-width="1.2" stroke-linejoin="round"/></svg>`
  };

  const propIconImages = {};
  function initPropIconImages() {
    for (const [key, svg] of Object.entries(PROP_ICONS_SVG)) {
      const img = new Image();
      img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
      propIconImages[key] = img;
    }
  }
  initPropIconImages();

  // --- Вспомогательные функции для полигональных контуров (Лассо) ---
  function tracePolygonPath(ctx, points) {
    if (!points || points.length === 0) return;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.closePath();
  }

  function isPointInPolygon(px, py, points) {
    if (!points || points.length < 3) return false;
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].x, yi = points[i].y;
      const xj = points[j].x, yj = points[j].y;
      const intersect = ((yi > py) !== (yj > py)) &&
        (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function computePolygonCentroid(points) {
    if (!points || points.length === 0) return { x: 0, y: 0, radius: 50 };
    let sumX = 0, sumY = 0;
    for (const p of points) {
      sumX += p.x;
      sumY += p.y;
    }
    const cx = Math.round(sumX / points.length);
    const cy = Math.round(sumY / points.length);
    let maxDist = 0;
    for (const p of points) {
      const d = Math.hypot(p.x - cx, p.y - cy);
      if (d > maxDist) maxDist = d;
    }
    return { x: cx, y: cy, radius: Math.max(30, Math.round(maxDist)) };
  }

  // --- Реестр типов интерактивных объектов ---
  const OBJECT_TYPES = {
    torch: {
      name: 'Факел',
      icon: '🔥',
      svg: PROP_ICONS_SVG.torch,
      isLight: true,
      defaultRadius: 120,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        const flicker = (Math.sin(phase * 4 + obj.id) * 0.08 + (Math.random() - 0.5) * 0.03) * animSpeed;
        const curR = obj.radius * (1 + flicker);

        const grad = ctx.createRadialGradient(obj.x, obj.y, curR * 0.08, obj.x, obj.y, curR);
        grad.addColorStop(0, 'rgba(255, 245, 210, 0.9)');
        grad.addColorStop(0.25, 'rgba(245, 158, 11, 0.55)');
        grad.addColorStop(0.65, 'rgba(217, 119, 6, 0.18)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, curR, 0, Math.PI * 2);
        ctx.fill();

        // Сердцевина пламени (статична, не мигает)
        ctx.fillStyle = 'rgba(254, 243, 199, 0.95)';
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    campfire: {
      name: 'Костёр',
      icon: '🪵',
      svg: PROP_ICONS_SVG.campfire,
      isLight: true,
      defaultRadius: 180,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        const flicker = (Math.sin(phase * 3.5 + obj.id) * 0.09 + (Math.random() - 0.5) * 0.04) * animSpeed;
        const curR = obj.radius * (1 + flicker);

        // Внешнее тепловое свечение
        const grad = ctx.createRadialGradient(obj.x, obj.y, curR * 0.12, obj.x, obj.y, curR);
        grad.addColorStop(0, 'rgba(255, 250, 220, 0.95)');
        grad.addColorStop(0.2, 'rgba(249, 115, 22, 0.65)');
        grad.addColorStop(0.5, 'rgba(220, 38, 38, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, curR, 0, Math.PI * 2);
        ctx.fill();

        // Поленья костра (крест-накрест, статичны)
        ctx.save();
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(obj.x - 14, obj.y - 8);
        ctx.lineTo(obj.x + 14, obj.y + 8);
        ctx.moveTo(obj.x - 14, obj.y + 8);
        ctx.lineTo(obj.x + 14, obj.y - 8);
        ctx.stroke();
        ctx.restore();

        // Очаг пламени (статичен)
        ctx.fillStyle = 'rgba(251, 191, 36, 0.9)';
        ctx.beginPath();
        ctx.arc(obj.x, obj.y - 2, 9, 0, Math.PI * 2);
        ctx.fill();

        // Взлетающие горящие искры
        for (let i = 0; i < 5; i++) {
          const sparkAge = (phase * 0.8 + i * 0.2) % 1.0;
          const sparkX = obj.x + Math.sin(phase * 2 + i * 1.5) * (12 + sparkAge * 14);
          const sparkY = obj.y - sparkAge * (obj.radius * 0.45);
          const sparkAlpha = (1.0 - sparkAge) * Math.min(1.0, animSpeed + 0.2);

          ctx.fillStyle = `rgba(254, 215, 170, ${sparkAlpha})`;
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 1.5 + (1 - sparkAge) * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    },
    crystal: {
      name: 'Кристалл',
      icon: '🔮',
      svg: PROP_ICONS_SVG.crystal,
      isLight: true,
      defaultRadius: 150,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        const pulse = Math.sin(phase * 2 + obj.id) * 0.08 * animSpeed;
        const curR = obj.radius * (1 + pulse);

        // Мистическое фиолетово-лазурное свечение (пульсирует только ореол)
        const grad = ctx.createRadialGradient(obj.x, obj.y, curR * 0.08, obj.x, obj.y, curR);
        grad.addColorStop(0, 'rgba(245, 208, 254, 0.95)');
        grad.addColorStop(0.25, 'rgba(192, 132, 252, 0.6)');
        grad.addColorStop(0.65, 'rgba(56, 189, 248, 0.18)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, curR, 0, Math.PI * 2);
        ctx.fill();

        // Ограненный ромб кристалла в центре (статичен, не крутится)
        ctx.save();
        ctx.translate(obj.x, obj.y);

        ctx.fillStyle = 'rgba(216, 180, 254, 0.9)';
        ctx.strokeStyle = '#e9d5ff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(9, 0);
        ctx.lineTo(0, 14);
        ctx.lineTo(-9, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Орбитальные магические искры
        for (let i = 0; i < 3; i++) {
          const ang = phase * 1.5 + (i * Math.PI * 2 / 3);
          const ox = Math.cos(ang) * (obj.radius * 0.32);
          const oy = Math.sin(ang) * (obj.radius * 0.32);
          ctx.fillStyle = 'rgba(125, 211, 252, 0.9)';
          ctx.beginPath();
          ctx.arc(ox, oy, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    },
    candles: {
      name: 'Свечи',
      icon: '🕯️',
      svg: PROP_ICONS_SVG.candles,
      isLight: true,
      defaultRadius: 90,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        const curR = obj.radius * (1 + Math.sin(phase * 4) * 0.05 * animSpeed);

        const grad = ctx.createRadialGradient(obj.x, obj.y, 4, obj.x, obj.y, curR);
        grad.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
        grad.addColorStop(0.3, 'rgba(245, 158, 11, 0.4)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, curR, 0, Math.PI * 2);
        ctx.fill();

        // 3 маленьких огонька свечей в группе (статичны по положению)
        const candleOffsets = [[-6, -2], [5, -4], [0, 5]];
        candleOffsets.forEach((pos) => {
          const cx = obj.x + pos[0];
          const cy = obj.y + pos[1];

          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.ellipse(cx, cy, 2.5, 4, 0, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    },
    water: {
      name: 'Вода/Рябь',
      icon: '🌊',
      svg: PROP_ICONS_SVG.water,
      isLight: false,
      defaultRadius: 180,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
          ctx.save();
          const grad = ctx.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
          grad.addColorStop(0, 'rgba(6, 182, 212, 0.5)');
          grad.addColorStop(0.7, 'rgba(14, 116, 144, 0.4)');
          grad.addColorStop(1, 'rgba(8, 47, 73, 0.25)');
          tracePolygonPath(ctx, obj.points);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.clip();
          for (let i = 0; i < 3; i++) {
            const waveProgress = (phase * 0.4 + i * 0.33) % 1.0;
            const r = obj.radius * waveProgress;
            const alpha = (1.0 - waveProgress) * 0.65 * Math.min(1.0, 0.2 + animSpeed * 0.8);
            ctx.strokeStyle = `rgba(165, 243, 252, ${alpha})`;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.ellipse(obj.x, obj.y, r, r * 0.82, Math.sin(phase * 0.2) * 0.1 * animSpeed, 0, Math.PI * 2);
            ctx.stroke();
          }

          const glintX = obj.x + Math.sin(phase * 0.7) * (obj.radius * 0.25);
          const glintY = obj.y + Math.cos(phase * 0.5) * (obj.radius * 0.2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.beginPath();
          ctx.ellipse(glintX, glintY, obj.radius * 0.25, obj.radius * 0.1, -0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          ctx.save();
          tracePolygonPath(ctx, obj.points);
          ctx.strokeStyle = 'rgba(165, 243, 252, 0.65)';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
          return;
        }

        // Базовый полупрозрачный аквамариновый диск воды
        const grad = ctx.createRadialGradient(obj.x, obj.y, obj.radius * 0.2, obj.x, obj.y, obj.radius);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
        grad.addColorStop(0.7, 'rgba(14, 116, 144, 0.35)');
        grad.addColorStop(1, 'rgba(8, 47, 73, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
        ctx.fill();

        // Расходящиеся круги ряби
        ctx.save();
        for (let i = 0; i < 3; i++) {
          const waveProgress = (phase * 0.4 + i * 0.33) % 1.0;
          const r = obj.radius * waveProgress;
          const alpha = (1.0 - waveProgress) * 0.65 * Math.min(1.0, 0.2 + animSpeed * 0.8);

          ctx.strokeStyle = `rgba(165, 243, 252, ${alpha})`;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.ellipse(obj.x, obj.y, r, r * 0.82, Math.sin(phase * 0.2) * 0.1 * animSpeed, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Блик света на воде
        const glintX = obj.x + Math.sin(phase * 0.7) * (obj.radius * 0.25);
        const glintY = obj.y + Math.cos(phase * 0.5) * (obj.radius * 0.2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.beginPath();
        ctx.ellipse(glintX, glintY, obj.radius * 0.22, obj.radius * 0.08, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },
    puddle: {
      name: 'Лужа',
      icon: '💧',
      svg: PROP_ICONS_SVG.puddle,
      isLight: false,
      defaultRadius: 100,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
          ctx.save();
          tracePolygonPath(ctx, obj.points);
          const grad = ctx.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
          grad.addColorStop(0, 'rgba(30, 41, 59, 0.7)');
          grad.addColorStop(0.8, 'rgba(51, 65, 85, 0.5)');
          grad.addColorStop(1, 'rgba(15, 23, 42, 0.3)');
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.clip();
          const waveProgress = (phase * 0.35) % 1.0;
          const r = (obj.radius * 0.6) * waveProgress;
          ctx.strokeStyle = `rgba(203, 213, 225, ${(1 - waveProgress) * 0.5 * Math.min(1.0, 0.2 + animSpeed * 0.8)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(obj.x, obj.y, r, r * 0.65, 0.25, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          ctx.save();
          tracePolygonPath(ctx, obj.points);
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
          return;
        }

        // Органическая влажная форма
        ctx.save();
        const grad = ctx.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
        grad.addColorStop(0, 'rgba(30, 41, 59, 0.65)');
        grad.addColorStop(0.75, 'rgba(51, 65, 85, 0.45)');
        grad.addColorStop(0.95, 'rgba(148, 163, 184, 0.3)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(obj.x, obj.y, obj.radius, obj.radius * 0.65, 0.25, 0, Math.PI * 2);
        ctx.fill();

        // Тонкая рябь в центре
        const waveProgress = (phase * 0.35) % 1.0;
        const r = (obj.radius * 0.6) * waveProgress;
        ctx.strokeStyle = `rgba(203, 213, 225, ${(1 - waveProgress) * 0.5 * Math.min(1.0, 0.2 + animSpeed * 0.8)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(obj.x, obj.y, r, r * 0.65, 0.25, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    },
    acid: {
      name: 'Кислота',
      icon: '🧪',
      svg: PROP_ICONS_SVG.acid,
      isLight: false,
      defaultRadius: 130,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
          ctx.save();
          tracePolygonPath(ctx, obj.points);
          const grad = ctx.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
          grad.addColorStop(0, 'rgba(74, 222, 128, 0.75)');
          grad.addColorStop(0.65, 'rgba(22, 163, 74, 0.55)');
          grad.addColorStop(1, 'rgba(5, 46, 22, 0.35)');
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.clip();
          for (let i = 0; i < 6; i++) {
            const bubbleAge = (phase * 0.9 + i * 0.2) % 1.0;
            const ang = i * 1.1 + 0.3;
            const dist = (obj.radius * 0.4) * Math.sin(phase * 0.5 + i);
            const bx = obj.x + Math.cos(ang) * dist;
            const by = obj.y + Math.sin(ang) * dist;
            const bRadius = 3 + bubbleAge * 5 * Math.min(1.0, animSpeed + 0.1);
            ctx.strokeStyle = `rgba(220, 252, 231, ${1 - bubbleAge * 0.6})`;
            ctx.fillStyle = `rgba(34, 197, 94, ${0.8 - bubbleAge * 0.5})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(bx, by, bRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }
          ctx.restore();

          ctx.save();
          tracePolygonPath(ctx, obj.points);
          ctx.strokeStyle = 'rgba(134, 239, 172, 0.65)';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
          return;
        }

        // Едкая неоново-зеленая жидкость
        const grad = ctx.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
        grad.addColorStop(0, 'rgba(74, 222, 128, 0.7)');
        grad.addColorStop(0.6, 'rgba(22, 163, 74, 0.5)');
        grad.addColorStop(0.9, 'rgba(21, 128, 61, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(obj.x, obj.y, obj.radius, obj.radius * 0.85, 0.1, 0, Math.PI * 2);
        ctx.fill();

        // Всплывающие и лопающиеся пузыри кислоты
        ctx.save();
        for (let i = 0; i < 4; i++) {
          const bubbleAge = (phase * 0.9 + i * 0.25) % 1.0;
          const ang = i * (Math.PI / 2) + 0.3;
          const dist = (obj.radius * 0.45) * Math.sin(phase * 0.5 + i);
          const bx = obj.x + Math.cos(ang) * dist;
          const by = obj.y + Math.sin(ang) * dist;
          const bRadius = (3 + bubbleAge * 5 * Math.min(1.0, animSpeed + 0.1));

          ctx.strokeStyle = `rgba(220, 252, 231, ${1 - bubbleAge * 0.6})`;
          ctx.fillStyle = `rgba(34, 197, 94, ${0.8 - bubbleAge * 0.5})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(bx, by, bRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      }
    },
    blood: {
      name: 'Кровь',
      icon: '🩸',
      svg: PROP_ICONS_SVG.blood,
      isLight: false,
      defaultRadius: 110,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
          ctx.save();
          tracePolygonPath(ctx, obj.points);
          const grad = ctx.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
          grad.addColorStop(0, 'rgba(136, 19, 55, 0.88)');
          grad.addColorStop(0.7, 'rgba(159, 18, 57, 0.7)');
          grad.addColorStop(1, 'rgba(76, 5, 25, 0.45)');
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.clip();
          const glintAlpha = 0.35 + Math.sin(phase * 1.5) * 0.15 * animSpeed;
          ctx.fillStyle = `rgba(254, 205, 211, ${glintAlpha})`;
          ctx.beginPath();
          ctx.ellipse(obj.x - obj.radius * 0.15, obj.y - obj.radius * 0.1, obj.radius * 0.2, obj.radius * 0.08, -0.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          ctx.save();
          tracePolygonPath(ctx, obj.points);
          ctx.strokeStyle = 'rgba(225, 29, 72, 0.6)';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
          return;
        }

        // Густая багровая лужа
        ctx.save();
        const grad = ctx.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
        grad.addColorStop(0, 'rgba(136, 19, 55, 0.85)');
        grad.addColorStop(0.6, 'rgba(159, 18, 57, 0.65)');
        grad.addColorStop(0.85, 'rgba(76, 5, 25, 0.4)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(obj.x, obj.y, obj.radius, obj.radius * 0.75, -0.3, 0, Math.PI * 2);
        ctx.fill();

        // Блики влажной запекшейся крови
        const glintAlpha = 0.35 + Math.sin(phase * 1.5) * 0.15 * animSpeed;
        ctx.fillStyle = `rgba(254, 205, 211, ${glintAlpha})`;
        ctx.beginPath();
        ctx.ellipse(obj.x - obj.radius * 0.2, obj.y - obj.radius * 0.15, obj.radius * 0.18, obj.radius * 0.07, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },
    lava: {
      name: 'Лава',
      icon: '🌋',
      svg: PROP_ICONS_SVG.lava,
      isLight: true,
      defaultRadius: 160,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
          // Наружное зарево вокруг разлома лавы
          ctx.save();
          tracePolygonPath(ctx, obj.points);
          ctx.shadowColor = 'rgba(249, 115, 22, 0.85)';
          ctx.shadowBlur = 25 * (1 + Math.sin(phase * 2.5 + obj.id) * 0.08 * animSpeed);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
          ctx.fill();
          ctx.restore();

          // Внутренняя магма
          ctx.save();
          tracePolygonPath(ctx, obj.points);
          const grad = ctx.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
          grad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
          grad.addColorStop(0.35, 'rgba(249, 115, 22, 0.85)');
          grad.addColorStop(0.75, 'rgba(185, 28, 28, 0.6)');
          grad.addColorStop(1, 'rgba(69, 10, 10, 0.4)');
          ctx.fillStyle = grad;
          ctx.fill();

          // Клип для базальтовых островков внутри
          ctx.clip();
          for (let i = 0; i < 6; i++) {
            const ang = phase * 0.15 + (i * Math.PI / 3);
            const dist = (obj.radius * 0.35) * (0.6 + Math.sin(phase * 0.4 + i) * 0.3);
            const cx = obj.x + Math.cos(ang) * dist;
            const cy = obj.y + Math.sin(ang) * dist;
            ctx.fillStyle = 'rgba(28, 10, 5, 0.88)';
            ctx.beginPath();
            ctx.arc(cx, cy, 10 + (i % 3) * 3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();

          // Огненная раскаленная кромка
          ctx.save();
          tracePolygonPath(ctx, obj.points);
          ctx.strokeStyle = 'rgba(254, 215, 170, 0.75)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
          ctx.restore();
          return;
        }

        const pulse = Math.sin(phase * 2.5 + obj.id) * 0.07 * animSpeed;
        const curR = obj.radius * (1 + pulse);

        // Раскаленное зарево
        const grad = ctx.createRadialGradient(obj.x, obj.y, curR * 0.15, obj.x, obj.y, curR);
        grad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
        grad.addColorStop(0.25, 'rgba(249, 115, 22, 0.7)');
        grad.addColorStop(0.6, 'rgba(185, 28, 28, 0.35)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, curR, 0, Math.PI * 2);
        ctx.fill();

        // Темные плавающие островки базальтовой корки (статичный размер)
        ctx.save();
        for (let i = 0; i < 4; i++) {
          const ang = phase * 0.2 + (i * Math.PI / 2);
          const cx = obj.x + Math.cos(ang) * (obj.radius * 0.32);
          const cy = obj.y + Math.sin(ang) * (obj.radius * 0.32);
          ctx.fillStyle = 'rgba(28, 10, 5, 0.85)';
          ctx.beginPath();
          ctx.arc(cx, cy, 9, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    },
    portal: {
      name: 'Портал',
      icon: '🌀',
      svg: PROP_ICONS_SVG.portal,
      isLight: true,
      defaultRadius: 150,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        const curR = obj.radius;

        // Внешнее эфирное свечение
        const grad = ctx.createRadialGradient(obj.x, obj.y, curR * 0.1, obj.x, obj.y, curR);
        grad.addColorStop(0, 'rgba(245, 243, 255, 0.95)');
        grad.addColorStop(0.3, 'rgba(139, 92, 246, 0.6)');
        grad.addColorStop(0.7, 'rgba(6, 182, 212, 0.2)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, curR, 0, Math.PI * 2);
        ctx.fill();

        // Спиральные рукава портала
        ctx.save();
        ctx.translate(obj.x, obj.y);
        ctx.rotate(phase * 1.8);

        for (let arm = 0; arm < 3; arm++) {
          ctx.rotate((Math.PI * 2) / 3);
          ctx.strokeStyle = arm % 2 === 0 ? 'rgba(192, 132, 252, 0.8)' : 'rgba(103, 232, 249, 0.8)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let theta = 0; theta < Math.PI * 2; theta += 0.15) {
            const r = (theta / (Math.PI * 2)) * (obj.radius * 0.65);
            const px = r * Math.cos(theta);
            const py = r * Math.sin(theta);
            if (theta === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }

        // Черная сингулярность в центре
        ctx.fillStyle = '#090514';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    },
    smoke: {
      name: 'Дым/Газ',
      icon: '🌫️',
      svg: PROP_ICONS_SVG.smoke,
      isLight: false,
      defaultRadius: 160,
      draw(ctx, obj, phase, animSpeed = 1.0) {
        if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
          ctx.save();
          tracePolygonPath(ctx, obj.points);
          ctx.fillStyle = 'rgba(71, 85, 105, 0.25)';
          ctx.fill();
          ctx.clip();
          for (let i = 0; i < 6; i++) {
            const ang = phase * 0.25 + (i * Math.PI / 3);
            const dist = (obj.radius * 0.35) * Math.sin(phase * 0.3 + i);
            const cx = obj.x + Math.cos(ang) * dist;
            const cy = obj.y + Math.sin(ang) * dist;
            const puffR = obj.radius * (0.55 + Math.sin(phase * 0.8 + i) * 0.1 * animSpeed);
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, puffR);
            grad.addColorStop(0, 'rgba(148, 163, 184, 0.45)');
            grad.addColorStop(0.6, 'rgba(71, 85, 105, 0.25)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, puffR, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
          return;
        }

        // Клубящиеся круги дыма
        ctx.save();
        for (let i = 0; i < 4; i++) {
          const ang = phase * 0.25 + (i * Math.PI / 2);
          const cx = obj.x + Math.cos(ang) * (obj.radius * 0.28);
          const cy = obj.y + Math.sin(ang) * (obj.radius * 0.28);
          const puffR = obj.radius * (0.65 + Math.sin(phase * 0.8 + i) * 0.1 * animSpeed);

          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, puffR);
          grad.addColorStop(0, 'rgba(100, 116, 139, 0.45)');
          grad.addColorStop(0.6, 'rgba(71, 85, 105, 0.25)');
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, puffR, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    },
    web: {
      name: 'Паутина',
      icon: '🕸️',
      svg: PROP_ICONS_SVG.web,
      isLight: false,
      defaultRadius: 120,
      draw(ctx, obj) {
        if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
          ctx.save();
          tracePolygonPath(ctx, obj.points);
          ctx.clip();
          ctx.strokeStyle = 'rgba(241, 245, 249, 0.55)';
          ctx.lineWidth = 1.2;
          const rays = 12;
          for (let i = 0; i < rays; i++) {
            const ang = (i * Math.PI * 2) / rays;
            ctx.beginPath();
            ctx.moveTo(obj.x, obj.y);
            ctx.lineTo(obj.x + Math.cos(ang) * obj.radius, obj.y + Math.sin(ang) * obj.radius);
            ctx.stroke();
          }
          for (let rIdx = 1; rIdx <= 5; rIdx++) {
            const r = (obj.radius / 5) * rIdx;
            ctx.beginPath();
            for (let i = 0; i <= rays; i++) {
              const ang = (i * Math.PI * 2) / rays;
              const px = obj.x + Math.cos(ang) * r;
              const py = obj.y + Math.sin(ang) * r;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.stroke();
          }
          ctx.restore();
          ctx.save();
          tracePolygonPath(ctx, obj.points);
          ctx.strokeStyle = 'rgba(241, 245, 249, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
          return;
        }

        // Радиальные и спиральные нити паутины
        ctx.save();
        ctx.strokeStyle = 'rgba(241, 245, 249, 0.55)';
        ctx.lineWidth = 1.2;

        const rays = 8;
        // Лучи
        for (let i = 0; i < rays; i++) {
          const ang = (i * Math.PI * 2) / rays;
          ctx.beginPath();
          ctx.moveTo(obj.x, obj.y);
          ctx.lineTo(obj.x + Math.cos(ang) * obj.radius, obj.y + Math.sin(ang) * obj.radius);
          ctx.stroke();
        }

        // Поперечные кольца
        const rings = 4;
        for (let rIdx = 1; rIdx <= rings; rIdx++) {
          const r = (obj.radius / rings) * rIdx;
          ctx.beginPath();
          for (let i = 0; i <= rays; i++) {
            const ang = (i * Math.PI * 2) / rays;
            const px = obj.x + Math.cos(ang) * r;
            const py = obj.y + Math.sin(ang) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  };

  // --- Отрисовка стабильного DM-токена со статичной векторной иконкой ---
  function drawTokenBadge(ctx, obj, isSelected) {
    const tokenRadius = 14;
    ctx.save();

    // 1. Тень токена
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;

    // 2. Темная основа токена
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, tokenRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0f111a';
    ctx.fill();

    // 3. Металлическая золотая кайма
    ctx.shadowBlur = 0;
    ctx.lineWidth = isSelected ? 2.5 : 1.5;
    ctx.strokeStyle = isSelected ? '#f5c842' : '#c9a84c';
    ctx.stroke();

    // 4. Если токен выделен — наружное кольцо подсветки
    if (isSelected) {
      ctx.beginPath();
      ctx.arc(obj.x, obj.y, tokenRadius + 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(245, 200, 66, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 5. Статичная векторная иконка в центре токена (никогда не мигает)
    const iconImg = propIconImages[obj.type];
    if (iconImg && iconImg.complete && iconImg.naturalWidth > 0) {
      const iconSize = 18;
      ctx.drawImage(iconImg, obj.x - iconSize / 2, obj.y - iconSize / 2, iconSize, iconSize);
    }

    ctx.restore();
  }

  // --- Основное состояние приложения ---
  const state = {
    // Медиа
    mediaType: null,
    mediaElement: null,
    mediaFileName: 'battlemap',
    origWidth: 0,
    origHeight: 0,
    mediaDataUrl: null,

    // Сетка
    grid: {
      type: 'square',
      cols: 10,
      rows: 10,
      squareCells: false,
      color: '#c9a84c',
      thickness: 2,
      opacity: 80,
      showLabels: false,
      showDiagonals: false,
      dragMode: false,
      isDragging: false,
      offsetX: 0,
      offsetY: 0,
      dragStartX: 0,
      dragStartY: 0,
      initialOffsetX: 0,
      initialOffsetY: 0
    },

    // Туман войны
    fog: {
      enabled: false,
      mode: 'reveal',
      brushSize: 60,
      feather: 0.5,
      dmOpacity: 0.35,
      canvas: null,
      ctx: null,
      isDrawing: false,
      lastX: null,
      lastY: null
    },

    // Интерактивные объекты (костры, вода, факелы и т.д.)
    objects: [],
    activePlacementType: null, // e.g. 'campfire'
    placementShapeMode: 'point', // 'point' | 'lasso'
    isLassoDrawing: false,
    lassoPoints: [],
    selectedObjectId: null,
    contextMenuObjId: null,
    isDraggingObject: false,
    draggedObject: null,
    dragObjOffsetX: 0,
    dragObjOffsetY: 0,
    propSize: 100,
    animSpeed: 1.0,
    lightsRevealFog: true,

    // Погода и частицы
    weather: 'none',
    particles: [],

    // Навигация (Zoom & Pan)
    viewport: {
      zoom: 1.0,
      panX: 0,
      panY: 0,
      isPanning: false,
      spacePressed: false,
      startX: 0,
      startY: 0
    },

    isPlayerView: false,
    mouseCanvasX: null,
    mouseCanvasY: null,
    isMouseOverCanvas: false,
    globalPhase: 0
  };

  // --- Элементы DOM ---
  const elements = {
    tabBtns: document.querySelectorAll('.wm-tab-btn'),
    tabContents: document.querySelectorAll('.wm-tab-content'),

    playerViewBtn: document.getElementById('playerViewBtn'),
    exitPlayerViewBtn: document.getElementById('exitPlayerViewBtn'),

    fileInput: document.getElementById('fileInput'),
    dropzone: document.getElementById('dropzone'),
    fileInfo: document.getElementById('fileInfo'),
    fileName: document.getElementById('fileName'),
    fileSize: document.getElementById('fileSize'),
    placeholder: document.getElementById('placeholder'),
    placeholderUploadBtn: document.getElementById('placeholderUploadBtn'),
    bgVideo: document.getElementById('bgVideo'),

    canvasWrapper: document.getElementById('canvasWrapper'),
    mainCanvas: document.getElementById('mainCanvas'),
    hud: document.getElementById('hud'),
    hudZoom: document.getElementById('hudZoom'),
    zoomInBtn: document.getElementById('zoomInBtn'),
    zoomOutBtn: document.getElementById('zoomOutBtn'),
    zoomFitBtn: document.getElementById('zoomFitBtn'),

    // Сетка
    gridTypeRadios: document.querySelectorAll('input[name="gridType"]'),
    colsInput: document.getElementById('colsInput'),
    rowsInput: document.getElementById('rowsInput'),
    rowsLabel: document.getElementById('rowsLabel'),
    squareToggle: document.getElementById('squareToggle'),
    squareToggleLabel: document.getElementById('squareToggleLabel'),
    colorPicker: document.getElementById('colorPicker'),
    thicknessInput: document.getElementById('thicknessInput'),
    thicknessValue: document.getElementById('thicknessValue'),
    opacityInput: document.getElementById('opacityInput'),
    opacityValue: document.getElementById('opacityValue'),
    labelsToggle: document.getElementById('labelsToggle'),
    diagonalToggle: document.getElementById('diagonalToggle'),
    diagonalToggleLabel: document.getElementById('diagonalToggleLabel'),
    dragToggle: document.getElementById('dragToggle'),
    resetPosition: document.getElementById('resetPosition'),

    // Туман
    fogToggle: document.getElementById('fogToggle'),
    fogControls: document.getElementById('fogControls'),
    brushRevealBtn: document.getElementById('brushRevealBtn'),
    brushHideBtn: document.getElementById('brushHideBtn'),
    brushSizeInput: document.getElementById('brushSizeInput'),
    brushSizeVal: document.getElementById('brushSizeVal'),
    brushFeatherInput: document.getElementById('brushFeatherInput'),
    brushFeatherVal: document.getElementById('brushFeatherVal'),
    dmOpacityInput: document.getElementById('dmOpacityInput'),
    dmOpacityVal: document.getElementById('dmOpacityVal'),
    coverAllFogBtn: document.getElementById('coverAllFogBtn'),
    clearAllFogBtn: document.getElementById('clearAllFogBtn'),

    // Интерактивные объекты
    propBtns: document.querySelectorAll('.wm-prop-btn'),
    activeObjectBadge: document.getElementById('activeObjectBadge'),
    activeObjectBar: document.getElementById('activeObjectBar'),
    activeObjectDesc: document.getElementById('activeObjectDesc'),
    cancelPlacementBtn: document.getElementById('cancelPlacementBtn'),
    propSizeInput: document.getElementById('propSizeInput'),
    propSizeVal: document.getElementById('propSizeVal'),
    animSpeedInput: document.getElementById('animSpeedInput'),
    animSpeedVal: document.getElementById('animSpeedVal'),
    lightsRevealFogToggle: document.getElementById('lightsRevealFogToggle'),
    lightsList: document.getElementById('lightsList'),
    objectsCount: document.getElementById('objectsCount'),
    clearLightsBtn: document.getElementById('clearLightsBtn'),

    // Контекстное меню ПКМ
    propContextMenu: document.getElementById('propContextMenu'),
    ctxIcon: document.getElementById('ctxIcon'),
    ctxTitle: document.getElementById('ctxTitle'),
    ctxCloseBtn: document.getElementById('ctxCloseBtn'),
    ctxRadiusRow: document.getElementById('ctxRadiusRow'),
    ctxRadiusInput: document.getElementById('ctxRadiusInput'),
    ctxRadiusVal: document.getElementById('ctxRadiusVal'),
    ctxSpeedInput: document.getElementById('ctxSpeedInput'),
    ctxSpeedVal: document.getElementById('ctxSpeedVal'),
    ctxRevealFogRow: document.getElementById('ctxRevealFogRow'),
    ctxRevealFogInput: document.getElementById('ctxRevealFogInput'),
    ctxDuplicateBtn: document.getElementById('ctxDuplicateBtn'),
    ctxDeleteBtn: document.getElementById('ctxDeleteBtn'),

    // Режим формы размещения (Точка / Лассо)
    shapeModeSwitch: document.getElementById('shapeModeSwitch'),
    shapePointBtn: document.getElementById('shapePointBtn'),
    shapeLassoBtn: document.getElementById('shapeLassoBtn'),

    // Погода
    weatherSelect: document.getElementById('weatherSelect'),

    // Сохранение и проект
    mapNameInput: document.getElementById('mapNameInput'),
    saveProjectBtn: document.getElementById('saveProjectBtn'),
    projectFileInput: document.getElementById('projectFileInput'),
    projectDropzone: document.getElementById('projectDropzone'),
    formatSelect: document.getElementById('formatSelect'),
    downloadBtn: document.getElementById('downloadBtn'),
    exportHtmlBtn: document.getElementById('exportHtmlBtn'),
    resetBtn: document.getElementById('resetBtn')
  };

  const mainCtx = elements.mainCanvas.getContext('2d');
  let animationFrameId = null;

  // ==============================================================
  // 1. ИНИЦИАЛИЗАЦИЯ
  // ==============================================================
  function init() {
    setupTabs();
    setupFileInputs();
    setupGridControls();
    setupFogControls();
    setupInteractiveProps();
    setupContextMenu();
    setupProjectSaveLoad();
    setupViewportControls();
    setupPlayerView();
    setupKeyboardShortcuts();

    initParticles();
    requestAnimationFrame(renderLoop);
  }

  // ==============================================================
  // 2. ВКЛАДКИ БОКОВОЙ ПАНЕЛИ
  // ==============================================================
  function setupTabs() {
    elements.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        elements.tabBtns.forEach(b => b.classList.remove('active'));
        elements.tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const content = document.getElementById(`tab-${targetTab}`);
        if (content) content.classList.add('active');
      });
    });
  }

  // ==============================================================
  // 3. ЗАГРУЗКА МЕДИА (Изображения & Видео)
  // ==============================================================
  function setupFileInputs() {
    elements.placeholderUploadBtn.addEventListener('click', () => elements.fileInput.click());

    elements.fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        loadMediaFile(e.target.files[0]);
      }
    });

    setupDropzoneListeners(elements.dropzone, (file) => loadMediaFile(file));
  }

  function setupDropzoneListeners(zone, onFileDrop) {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('wm-dropzone--active');
    });
    zone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      zone.classList.remove('wm-dropzone--active');
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('wm-dropzone--active');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        onFileDrop(e.dataTransfer.files[0]);
      }
    });
  }

  function loadMediaFile(file) {
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isVideo && !isImage) {
      alert('Пожалуйста, загрузите файл изображения (PNG, JPG, WEBP, GIF) или видео (MP4, WebM).');
      return;
    }

    state.mediaFileName = file.name.replace(/\.[^/.]+$/, '');
    elements.mapNameInput.value = state.mediaFileName;

    if (isVideo) {
      loadVideo(file);
    } else {
      loadImage(file);
    }
  }

  function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        state.mediaType = 'image';
        state.mediaElement = img;
        state.mediaDataUrl = dataUrl;
        state.origWidth = img.naturalWidth;
        state.origHeight = img.naturalHeight;

        onMediaLoaded(file.name, `${img.naturalWidth}×${img.naturalHeight}`, file.size);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  function loadVideo(file) {
    const videoUrl = URL.createObjectURL(file);
    const video = elements.bgVideo;
    video.src = videoUrl;
    video.onloadedmetadata = () => {
      video.play().catch(() => {});
      state.mediaType = 'video';
      state.mediaElement = video;
      state.mediaDataUrl = null;
      state.origWidth = video.videoWidth || 1920;
      state.origHeight = video.videoHeight || 1080;

      onMediaLoaded(file.name, `${state.origWidth}×${state.origHeight} (Видео)`, file.size);
    };
  }

  function onMediaLoaded(name, dims, size) {
    elements.fileName.textContent = name;
    elements.fileSize.textContent = `${dims} (${formatBytes(size)})`;
    elements.fileInfo.hidden = false;
    elements.placeholder.hidden = true;
    elements.placeholder.style.display = 'none';
    elements.canvasWrapper.hidden = false;
    elements.canvasWrapper.style.display = 'flex';
    elements.hud.hidden = false;
    elements.downloadBtn.disabled = false;

    setupCanvasDimensions();
    initFogCanvas();
  }

  function setupCanvasDimensions() {
    if (!state.origWidth || !state.origHeight) return;

    elements.mainCanvas.width = state.origWidth;
    elements.mainCanvas.height = state.origHeight;

    fitToScreen();
  }

  function fitToScreen() {
    if (!state.origWidth || !state.origHeight) return;

    const area = elements.canvasWrapper.parentElement;
    const availW = (area && area.clientWidth > 100) ? area.clientWidth : (window.innerWidth - 360);
    const availH = (area && area.clientHeight > 100) ? area.clientHeight : (window.innerHeight - 80);

    const maxW = Math.max(300, availW - 40);
    const maxH = Math.max(300, availH - 60);

    const scale = Math.min(maxW / state.origWidth, maxH / state.origHeight, 1.0);
    state.viewport.zoom = Math.max(0.05, scale);
    state.viewport.panX = 0;
    state.viewport.panY = 0;
    applyViewportTransform();
  }

  function applyViewportTransform() {
    elements.canvasWrapper.style.transform = `translate(${state.viewport.panX}px, ${state.viewport.panY}px) scale(${state.viewport.zoom})`;
    elements.hudZoom.textContent = `${Math.round(state.viewport.zoom * 100)}%`;
  }

  // ==============================================================
  // 4. ТУМАН ВОЙНЫ (FOG OF WAR ENGINE)
  // ==============================================================
  function initFogCanvas() {
    if (!state.origWidth || !state.origHeight) return;

    if (!state.fog.canvas) {
      state.fog.canvas = document.createElement('canvas');
      state.fog.ctx = state.fog.canvas.getContext('2d');
    }

    state.fog.canvas.width = state.origWidth;
    state.fog.canvas.height = state.origHeight;

    coverAllFog();
  }

  function setupFogControls() {
    elements.fogToggle.addEventListener('change', (e) => {
      state.fog.enabled = e.target.checked;
      elements.fogControls.hidden = !state.fog.enabled;
      if (state.fog.enabled && state.lightsRevealFog) {
        revealFogFromAllLights();
      }
    });

    elements.brushRevealBtn.addEventListener('click', () => {
      state.fog.mode = 'reveal';
      elements.brushRevealBtn.classList.add('active');
      elements.brushHideBtn.classList.remove('active');
    });

    elements.brushHideBtn.addEventListener('click', () => {
      state.fog.mode = 'hide';
      elements.brushHideBtn.classList.add('active');
      elements.brushRevealBtn.classList.remove('active');
    });

    elements.brushSizeInput.addEventListener('input', (e) => {
      state.fog.brushSize = parseInt(e.target.value, 10);
      elements.brushSizeVal.textContent = state.fog.brushSize;
    });

    elements.brushFeatherInput.addEventListener('input', (e) => {
      state.fog.feather = parseInt(e.target.value, 10) / 100;
      elements.brushFeatherVal.textContent = e.target.value;
    });

    elements.dmOpacityInput.addEventListener('input', (e) => {
      state.fog.dmOpacity = parseInt(e.target.value, 10) / 100;
      elements.dmOpacityVal.textContent = e.target.value;
    });

    elements.coverAllFogBtn.addEventListener('click', coverAllFog);
    elements.clearAllFogBtn.addEventListener('click', clearAllFog);

    elements.mainCanvas.addEventListener('mousedown', onCanvasMouseDown);
    window.addEventListener('mousemove', onCanvasMouseMove);
    window.addEventListener('mouseup', onCanvasMouseUp);
    elements.mainCanvas.addEventListener('contextmenu', onCanvasContextMenu);

    elements.mainCanvas.addEventListener('mouseenter', () => { state.isMouseOverCanvas = true; });
    elements.mainCanvas.addEventListener('mouseleave', () => { state.isMouseOverCanvas = false; });
  }

  function coverAllFog() {
    if (!state.fog.ctx) return;
    const ctx = state.fog.ctx;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#0b0c14';
    ctx.fillRect(0, 0, state.origWidth, state.origHeight);

    // Даже при всей заливке все источники света всё равно развеивают туман
    if (state.lightsRevealFog) {
      revealFogFromAllLights();
    }
  }

  function revealFogFromAllLights() {
    if (!state.fog.ctx) return;
    for (let obj of state.objects) {
      const def = OBJECT_TYPES[obj.type];
      const shouldReveal = (obj.revealFog !== undefined ? obj.revealFog : (def && def.isLight)) && state.lightsRevealFog;
      if (shouldReveal) {
        if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
          applyFogPolygon(obj.points, 0.45, true);
        } else {
          applyFogStamp(obj.x, obj.y, obj.radius, 0.45, true);
        }
      }
    }
  }

  function clearAllFog() {
    if (!state.fog.ctx) return;
    const ctx = state.fog.ctx;
    ctx.clearRect(0, 0, state.origWidth, state.origHeight);
  }

  function applyFogStamp(x, y, radius, feather, isReveal) {
    if (!state.fog.ctx) return;
    const ctx = state.fog.ctx;
    ctx.save();

    if (isReveal) {
      ctx.globalCompositeOperation = 'destination-out';
      const grad = ctx.createRadialGradient(x, y, Math.max(0, radius * (1 - feather)), x, y, radius);
      grad.addColorStop(0, 'rgba(0,0,0,1)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      const grad = ctx.createRadialGradient(x, y, Math.max(0, radius * (1 - feather)), x, y, radius);
      grad.addColorStop(0, 'rgba(11, 12, 20, 1)');
      grad.addColorStop(1, 'rgba(11, 12, 20, 0)');
      ctx.fillStyle = grad;
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function applyFogLine(x0, y0, x1, y1, radius, feather, isReveal) {
    const dist = Math.hypot(x1 - x0, y1 - y0);
    const step = Math.max(4, radius * 0.25);
    const count = Math.ceil(dist / step);

    for (let i = 0; i <= count; i++) {
      const t = count === 0 ? 0 : i / count;
      const x = x0 + (x1 - x0) * t;
      const y = y0 + (y1 - y0) * t;
      applyFogStamp(x, y, radius, feather, isReveal);
    }
  }

  function applyFogPolygon(points, feather, isReveal) {
    if (!state.fog.ctx || !points || points.length < 3) return;
    const ctx = state.fog.ctx;
    ctx.save();
    if (isReveal) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(11, 12, 20, 1)';
    }
    tracePolygonPath(ctx, points);
    ctx.fill();

    if (feather > 0) {
      ctx.lineWidth = 14 * feather;
      ctx.strokeStyle = isReveal ? 'rgba(0, 0, 0, 0.6)' : 'rgba(11, 12, 20, 0.6)';
      ctx.stroke();
    }
    ctx.restore();
  }

  // ==============================================================
  // 5. ИНТЕРАКТИВНЫЕ ОБЪЕКТЫ И ОКРУЖЕНИЕ
  // ==============================================================
  function setupInteractiveProps() {
    // Клики по кнопкам в палитре объектов
    elements.propBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        if (state.activePlacementType === type) {
          // Повторный клик отменяет выбор
          cancelPlacementMode();
        } else {
          activatePlacementMode(type);
        }
      });
    });

    elements.cancelPlacementBtn.addEventListener('click', cancelPlacementMode);

    // Переключатель режима формы (Точка / Лассо)
    if (elements.shapePointBtn && elements.shapeLassoBtn) {
      elements.shapePointBtn.addEventListener('click', () => {
        state.placementShapeMode = 'point';
        elements.shapePointBtn.classList.add('active');
        elements.shapeLassoBtn.classList.remove('active');
        updatePlacementDesc();
      });

      elements.shapeLassoBtn.addEventListener('click', () => {
        state.placementShapeMode = 'lasso';
        elements.shapeLassoBtn.classList.add('active');
        elements.shapePointBtn.classList.remove('active');
        updatePlacementDesc();
      });
    }

    // Слайдер размера объекта
    elements.propSizeInput.addEventListener('input', (e) => {
      state.propSize = parseInt(e.target.value, 10);
      elements.propSizeVal.textContent = state.propSize;

      // Если выбран существующий объект на карте — меняем его размер
      if (state.selectedObjectId) {
        const selObj = state.objects.find(o => o.id === state.selectedObjectId);
        if (selObj) {
          const oldRadius = selObj.radius || 1;
          selObj.radius = state.propSize;
          if (selObj.shape === 'polygon' && selObj.points && oldRadius > 0) {
            const scale = state.propSize / oldRadius;
            selObj.points = selObj.points.map(p => ({
              x: Math.round(selObj.x + (p.x - selObj.x) * scale),
              y: Math.round(selObj.y + (p.y - selObj.y) * scale)
            }));
          }
          renderObjectsList();
        }
      }
    });

    // Слайдер интенсивности анимации и мигания огней/луж
    if (elements.animSpeedInput) {
      elements.animSpeedInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (elements.animSpeedVal) {
          elements.animSpeedVal.textContent = val;
        }
        // Если выбран конкретный объект на карте — меняем ЕГО индивидуальную интенсивность
        if (state.selectedObjectId) {
          const selObj = state.objects.find(o => o.id === state.selectedObjectId);
          if (selObj) {
            selObj.animSpeed = val / 100;
          }
        } else {
          state.animSpeed = val / 100;
        }
      });
    }

    elements.clearLightsBtn.addEventListener('click', () => {
      if (state.objects.length === 0) return;
      if (confirm('Удалить все интерактивные объекты с карты?')) {
        state.objects = [];
        state.selectedObjectId = null;
        closeContextMenu();
        renderObjectsList();
      }
    });

    elements.lightsRevealFogToggle.addEventListener('change', (e) => {
      state.lightsRevealFog = e.target.checked;
      if (state.lightsRevealFog && state.fog.canvas) {
        revealFogFromAllLights();
      }
    });

    elements.weatherSelect.addEventListener('change', (e) => {
      state.weather = e.target.value;
      initParticles();
    });
  }

  function updatePlacementDesc() {
    if (!state.activePlacementType) return;
    const def = OBJECT_TYPES[state.activePlacementType];
    const name = def ? def.name : 'объект';
    if (state.placementShapeMode === 'lasso') {
      elements.activeObjectDesc.textContent = `✏️ Зажмите ЛКМ и нарисуйте контур на карте для: ${name}`;
    } else {
      elements.activeObjectDesc.textContent = `📍 Кликните на карту, чтобы поставить: ${name}`;
    }
  }

  function activatePlacementMode(type) {
    state.activePlacementType = type;
    const def = OBJECT_TYPES[type];
    if (!def) return;

    elements.propBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-type') === type);
    });

    elements.activeObjectBadge.innerHTML = `${def.svg || ''} <span>${def.name}</span>`;
    elements.activeObjectBar.hidden = false;
    updatePlacementDesc();

    // Рекомендованный радиус объекта
    state.propSize = def.defaultRadius;
    elements.propSizeInput.value = state.propSize;
    elements.propSizeVal.textContent = state.propSize;
  }

  function cancelPlacementMode() {
    state.activePlacementType = null;
    state.isLassoDrawing = false;
    state.lassoPoints = [];
    elements.propBtns.forEach(b => b.classList.remove('active'));
    elements.activeObjectBadge.textContent = 'Выберите объект';
    elements.activeObjectBar.hidden = true;
  }

  function addObjectAt(type, x, y) {
    const def = OBJECT_TYPES[type];
    if (!def) return;

    const newObj = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      type: type,
      shape: 'point',
      x: Math.round(x),
      y: Math.round(y),
      radius: state.propSize,
      animSpeed: state.animSpeed !== undefined ? state.animSpeed : 1.0,
      phase: Math.random() * 10,
      revealFog: def.isLight && state.lightsRevealFog
    };

    state.objects.push(newObj);
    state.selectedObjectId = newObj.id;

    if (elements.animSpeedInput && elements.animSpeedVal) {
      elements.animSpeedInput.value = Math.round(newObj.animSpeed * 100);
      elements.animSpeedVal.textContent = elements.animSpeedInput.value;
    }

    renderObjectsList();

    if (newObj.revealFog && state.fog.canvas) {
      applyFogStamp(newObj.x, newObj.y, newObj.radius, 0.45, true);
    }

    // Сразу сбрасываем режим размещения, чтобы курсор стал чистым и можно было взаимодействовать с объектами через ПКМ/ЛКМ
    cancelPlacementMode();
  }

  function addPolygonObjectAt(type, points) {
    const def = OBJECT_TYPES[type];
    if (!def || !points || points.length < 3) return;

    const centroid = computePolygonCentroid(points);
    const newObj = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      type: type,
      shape: 'polygon',
      points: points,
      x: centroid.x,
      y: centroid.y,
      radius: centroid.radius,
      animSpeed: state.animSpeed !== undefined ? state.animSpeed : 1.0,
      phase: Math.random() * 10,
      revealFog: def.isLight && state.lightsRevealFog
    };

    state.objects.push(newObj);
    state.selectedObjectId = newObj.id;

    if (elements.animSpeedInput && elements.animSpeedVal) {
      elements.animSpeedInput.value = Math.round(newObj.animSpeed * 100);
      elements.animSpeedVal.textContent = elements.animSpeedInput.value;
    }

    renderObjectsList();

    if (newObj.revealFog && state.fog.canvas) {
      applyFogPolygon(newObj.points, 0.45, true);
    }

    // Очищаем курсор после завершения контура лассо
    cancelPlacementMode();
  }

  // --- Контекстное меню ПКМ для интерактивных объектов ---
  function setupContextMenu() {
    if (!elements.propContextMenu) return;

    if (elements.ctxCloseBtn) {
      elements.ctxCloseBtn.addEventListener('click', closeContextMenu);
    }

    if (elements.ctxRadiusInput) {
      elements.ctxRadiusInput.addEventListener('input', (e) => {
        const newRadius = parseInt(e.target.value, 10);
        if (elements.ctxRadiusVal) elements.ctxRadiusVal.textContent = newRadius;
        if (state.contextMenuObjId) {
          const obj = state.objects.find(o => o.id === state.contextMenuObjId);
          if (obj) {
            const oldRadius = obj.radius || 1;
            obj.radius = newRadius;
            if (obj.shape === 'polygon' && obj.points && oldRadius > 0) {
              const scale = newRadius / oldRadius;
              obj.points = obj.points.map(p => ({
                x: Math.round(obj.x + (p.x - obj.x) * scale),
                y: Math.round(obj.y + (p.y - obj.y) * scale)
              }));
            }
            if (state.selectedObjectId === obj.id) {
              elements.propSizeInput.value = newRadius;
              elements.propSizeVal.textContent = newRadius;
            }
            renderObjectsList();
          }
        }
      });
    }

    if (elements.ctxSpeedInput) {
      elements.ctxSpeedInput.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (elements.ctxSpeedVal) elements.ctxSpeedVal.textContent = val;
        if (state.contextMenuObjId) {
          const obj = state.objects.find(o => o.id === state.contextMenuObjId);
          if (obj) {
            obj.animSpeed = val / 100;
            // Синхронизируем также слайдер в боковой панели, если этот объект сейчас выбран
            if (state.selectedObjectId === obj.id && elements.animSpeedInput) {
              elements.animSpeedInput.value = val;
              if (elements.animSpeedVal) elements.animSpeedVal.textContent = val;
            }
          }
        }
      });
    }

    if (elements.ctxRevealFogInput) {
      elements.ctxRevealFogInput.addEventListener('change', (e) => {
        if (state.contextMenuObjId) {
          const obj = state.objects.find(o => o.id === state.contextMenuObjId);
          if (obj) {
            obj.revealFog = e.target.checked;
            if (obj.revealFog && state.fog.canvas) {
              if (obj.shape === 'polygon' && obj.points) {
                applyFogPolygon(obj.points, 0.45, true);
              } else {
                applyFogStamp(obj.x, obj.y, obj.radius, 0.45, true);
              }
            }
          }
        }
      });
    }

    if (elements.ctxDuplicateBtn) {
      elements.ctxDuplicateBtn.addEventListener('click', () => {
        if (!state.contextMenuObjId) return;
        const obj = state.objects.find(o => o.id === state.contextMenuObjId);
        if (!obj) return;

        const offset = 35;
        const cloned = {
          ...obj,
          id: Date.now() + Math.floor(Math.random() * 1000),
          x: obj.x + offset,
          y: obj.y + offset,
          phase: Math.random() * 10
        };
        if (obj.shape === 'polygon' && obj.points) {
          cloned.points = obj.points.map(p => ({ x: p.x + offset, y: p.y + offset }));
        }
        state.objects.push(cloned);
        state.selectedObjectId = cloned.id;
        renderObjectsList();
        if (cloned.revealFog && state.fog.canvas) {
          if (cloned.shape === 'polygon' && cloned.points) {
            applyFogPolygon(cloned.points, 0.45, true);
          } else {
            applyFogStamp(cloned.x, cloned.y, cloned.radius, 0.45, true);
          }
        }
        closeContextMenu();
      });
    }

    if (elements.ctxDeleteBtn) {
      elements.ctxDeleteBtn.addEventListener('click', () => {
        if (!state.contextMenuObjId) return;
        state.objects = state.objects.filter(o => o.id !== state.contextMenuObjId);
        if (state.selectedObjectId === state.contextMenuObjId) {
          state.selectedObjectId = null;
        }
        renderObjectsList();
        closeContextMenu();
      });
    }

    // Закрытие при клике мимо меню
    window.addEventListener('click', (e) => {
      if (elements.propContextMenu && elements.propContextMenu.style.display !== 'none' && !elements.propContextMenu.hidden) {
        if (!elements.propContextMenu.contains(e.target)) {
          closeContextMenu();
        }
      }
    });
  }

  function openContextMenuForObject(obj, clientX, clientY) {
    if (!elements.propContextMenu) return;
    state.contextMenuObjId = obj.id;

    const def = OBJECT_TYPES[obj.type] || { name: 'Объект', svg: '' };
    if (elements.ctxIcon) elements.ctxIcon.innerHTML = def.svg || '';
    if (elements.ctxTitle) elements.ctxTitle.textContent = def.name;

    if (elements.ctxRadiusInput) {
      elements.ctxRadiusInput.value = obj.radius;
    }
    if (elements.ctxRadiusVal) {
      elements.ctxRadiusVal.textContent = obj.radius;
    }

    const curSpeed = obj.animSpeed !== undefined ? obj.animSpeed : 1.0;
    const curSpeedPercent = Math.round(curSpeed * 100);
    if (elements.ctxSpeedInput) {
      elements.ctxSpeedInput.value = curSpeedPercent;
    }
    if (elements.ctxSpeedVal) {
      elements.ctxSpeedVal.textContent = curSpeedPercent;
    }

    if (elements.ctxRevealFogRow && elements.ctxRevealFogInput) {
      if (def.isLight || obj.revealFog !== undefined) {
        elements.ctxRevealFogRow.style.display = 'flex';
        elements.ctxRevealFogInput.checked = obj.revealFog !== undefined ? obj.revealFog : (def.isLight && state.lightsRevealFog);
      } else {
        elements.ctxRevealFogRow.style.display = 'none';
      }
    }

    // Ограничение по границам окна
    const menuW = 230;
    const menuH = 260;
    let posX = clientX + 8;
    let posY = clientY + 8;
    if (posX + menuW > window.innerWidth) posX = window.innerWidth - menuW - 14;
    if (posY + menuH > window.innerHeight) posY = window.innerHeight - menuH - 14;

    elements.propContextMenu.style.left = `${Math.max(10, posX)}px`;
    elements.propContextMenu.style.top = `${Math.max(10, posY)}px`;
    elements.propContextMenu.style.display = 'block';
    elements.propContextMenu.hidden = false;
  }

  function closeContextMenu() {
    if (elements.propContextMenu) {
      elements.propContextMenu.style.display = 'none';
      elements.propContextMenu.hidden = true;
    }
    state.contextMenuObjId = null;
  }

  function renderObjectsList() {
    const list = elements.lightsList;
    list.innerHTML = '';
    elements.objectsCount.textContent = state.objects.length;

    state.objects.forEach((obj, idx) => {
      const def = OBJECT_TYPES[obj.type] || { svg: '', name: 'Объект' };
      const isSelected = obj.id === state.selectedObjectId;

      const item = document.createElement('div');
      item.className = `wm-light-item ${isSelected ? 'selected' : ''}`;
      const shapeBadge = obj.shape === 'polygon' ? ' ✏️' : '';
      item.innerHTML = `
        <div class="wm-light-item-info">
          <span class="wm-light-item-icon">${def.svg || ''}</span>
          <strong>${def.name}${shapeBadge} #${idx + 1}</strong>
          <span class="wm-light-item-badge">${obj.radius}px</span>
        </div>
        <button class="wm-light-item-del" data-id="${obj.id}" title="Удалить">✕</button>
      `;

      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('wm-light-item-del')) return;
        state.selectedObjectId = obj.id;
        state.propSize = obj.radius;
        elements.propSizeInput.value = obj.radius;
        elements.propSizeVal.textContent = obj.radius;
        if (elements.animSpeedInput && elements.animSpeedVal) {
          const curSpeed = obj.animSpeed !== undefined ? obj.animSpeed : 1.0;
          elements.animSpeedInput.value = Math.round(curSpeed * 100);
          elements.animSpeedVal.textContent = elements.animSpeedInput.value;
        }
        renderObjectsList();
      });

      // ПКМ по элементу в списке слева
      item.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        state.selectedObjectId = obj.id;
        state.propSize = obj.radius;
        elements.propSizeInput.value = obj.radius;
        elements.propSizeVal.textContent = obj.radius;
        if (elements.animSpeedInput && elements.animSpeedVal) {
          const curSpeed = obj.animSpeed !== undefined ? obj.animSpeed : 1.0;
          elements.animSpeedInput.value = Math.round(curSpeed * 100);
          elements.animSpeedVal.textContent = elements.animSpeedInput.value;
        }
        renderObjectsList();
        openContextMenuForObject(obj, e.clientX, e.clientY);
      });

      item.querySelector('.wm-light-item-del').addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(e.target.getAttribute('data-id'), 10);
        state.objects = state.objects.filter(o => o.id !== id);
        if (state.selectedObjectId === id) state.selectedObjectId = null;
        if (state.contextMenuObjId === id) closeContextMenu();
        renderObjectsList();
      });

      list.appendChild(item);
    });
  }

  // ==============================================================
  // 6. ИНТЕРАКТИВНЫЕ СОБЫТИЯ ХОЛСТА (Объекты, Туман, Сетка, Pan)
  // ==============================================================
  function getCanvasCoords(e) {
    const rect = elements.mainCanvas.getBoundingClientRect();
    const scaleX = elements.mainCanvas.width / rect.width;
    const scaleY = elements.mainCanvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  function findObjectAtCoords(x, y, isFogActive = false) {
    // Ищем от последнего к первому (верхние объекты приоритетнее)
    for (let i = state.objects.length - 1; i >= 0; i--) {
      const obj = state.objects[i];
      const dist = Math.hypot(x - obj.x, y - obj.y);

      // 1. Прямой клик по токену/бейджу объекта (радиус бейджа 14px, удобная область захвата 26px)
      if (dist <= 26) {
        return obj;
      }

      // 2. Если включен туман войны:
      // Приоритет отдаётся кисти тумана на пустом пространстве карты.
      // Но если клик по уже выделенному объекту или в компактной зоне его центра (~32px) — выбираем объект
      if (isFogActive) {
        if (obj.id === state.selectedObjectId) {
          if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
            if (isPointInPolygon(x, y, obj.points)) return obj;
          } else {
            if (dist <= Math.max(30, obj.radius * 0.75)) return obj;
          }
        }
        if (dist <= 32) {
          return obj;
        }
        continue;
      }

      // 3. Если туман отключен — стандартный поиск по всему телу / радиусу объекта
      if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
        if (isPointInPolygon(x, y, obj.points)) {
          return obj;
        }
      } else {
        if (dist <= Math.max(30, obj.radius * 0.85)) {
          return obj;
        }
      }
    }
    return null;
  }

  function onCanvasMouseDown(e) {
    closeContextMenu();

    // 1. Панорамирование (Пробел или СКМ)
    if (state.viewport.spacePressed || e.button === 1) {
      state.viewport.isPanning = true;
      state.viewport.startX = e.clientX - state.viewport.panX;
      state.viewport.startY = e.clientY - state.viewport.panY;
      e.preventDefault();
      return;
    }

    if (e.button !== 0) return; // Только ЛКМ дальше

    const coords = getCanvasCoords(e);

    // 2. Размещение выбранного интерактивного объекта
    if (state.activePlacementType) {
      if (state.placementShapeMode === 'lasso') {
        state.isLassoDrawing = true;
        state.lassoPoints = [{ x: Math.round(coords.x), y: Math.round(coords.y) }];
        return;
      } else {
        addObjectAt(state.activePlacementType, coords.x, coords.y);
        return;
      }
    }

    // 3. Выбор и перетаскивание существующего объекта
    if (!state.grid.dragMode) {
      const hitObj = findObjectAtCoords(coords.x, coords.y, state.fog.enabled);
      if (hitObj) {
        state.selectedObjectId = hitObj.id;
        state.isDraggingObject = true;
        state.draggedObject = hitObj;
        state.dragObjOffsetX = coords.x - hitObj.x;
        state.dragObjOffsetY = coords.y - hitObj.y;
        state.propSize = hitObj.radius;
        elements.propSizeInput.value = hitObj.radius;
        elements.propSizeVal.textContent = hitObj.radius;
        if (elements.animSpeedInput && elements.animSpeedVal) {
          const curSpeed = hitObj.animSpeed !== undefined ? hitObj.animSpeed : 1.0;
          elements.animSpeedInput.value = Math.round(curSpeed * 100);
          elements.animSpeedVal.textContent = elements.animSpeedInput.value;
        }
        elements.mainCanvas.style.cursor = 'grabbing';
        renderObjectsList();
        return;
      }
    }

    // 4. Перемещение сетки
    if (state.grid.dragMode) {
      state.grid.isDragging = true;
      state.grid.dragStartX = coords.x;
      state.grid.dragStartY = coords.y;
      state.grid.initialOffsetX = state.grid.offsetX;
      state.grid.initialOffsetY = state.grid.offsetY;
      return;
    }

    // 5. Кисть тумана войны
    if (state.fog.enabled) {
      state.fog.isDrawing = true;
      state.fog.lastX = coords.x;
      state.fog.lastY = coords.y;

      const isReveal = (state.fog.mode === 'reveal') ^ e.shiftKey;
      applyFogStamp(coords.x, coords.y, state.fog.brushSize, state.fog.feather, isReveal);
    }
  }

  function onCanvasMouseMove(e) {
    // Панорамирование
    if (state.viewport.isPanning) {
      state.viewport.panX = e.clientX - state.viewport.startX;
      state.viewport.panY = e.clientY - state.viewport.startY;
      applyViewportTransform();
      return;
    }

    const coords = getCanvasCoords(e);
    state.mouseCanvasX = coords.x;
    state.mouseCanvasY = coords.y;

    // Рисование контура лассо
    if (state.isLassoDrawing) {
      const lastPt = state.lassoPoints[state.lassoPoints.length - 1];
      if (!lastPt || Math.hypot(coords.x - lastPt.x, coords.y - lastPt.y) >= 5) {
        state.lassoPoints.push({ x: Math.round(coords.x), y: Math.round(coords.y) });
      }
      return;
    }

    // Перетаскивание интерактивного объекта
    if (state.isDraggingObject && state.draggedObject) {
      const newX = Math.round(coords.x - state.dragObjOffsetX);
      const newY = Math.round(coords.y - state.dragObjOffsetY);
      const dx = newX - state.draggedObject.x;
      const dy = newY - state.draggedObject.y;

      state.draggedObject.x = newX;
      state.draggedObject.y = newY;

      if (state.draggedObject.shape === 'polygon' && state.draggedObject.points) {
        state.draggedObject.points.forEach(p => {
          p.x += dx;
          p.y += dy;
        });
      }

      const shouldReveal = (state.draggedObject.revealFog !== undefined ? state.draggedObject.revealFog : (OBJECT_TYPES[state.draggedObject.type] && OBJECT_TYPES[state.draggedObject.type].isLight)) && state.lightsRevealFog;
      if (shouldReveal && state.fog.canvas) {
        if (state.draggedObject.shape === 'polygon' && state.draggedObject.points) {
          applyFogPolygon(state.draggedObject.points, 0.45, true);
        } else {
          applyFogStamp(state.draggedObject.x, state.draggedObject.y, state.draggedObject.radius, 0.45, true);
        }
      }
      return;
    }

    // Перемещение сетки
    if (state.grid.isDragging) {
      const dx = coords.x - state.grid.dragStartX;
      const dy = coords.y - state.grid.dragStartY;
      state.grid.offsetX = state.grid.initialOffsetX + dx;
      state.grid.offsetY = state.grid.initialOffsetY + dy;
      return;
    }

    // Кисть тумана войны
    if (state.fog.isDrawing && state.fog.enabled) {
      const isReveal = (state.fog.mode === 'reveal') ^ e.shiftKey;
      applyFogLine(state.fog.lastX, state.fog.lastY, coords.x, coords.y, state.fog.brushSize, state.fog.feather, isReveal);
      state.fog.lastX = coords.x;
      state.fog.lastY = coords.y;
    }

    // Динамический курсор при наведении (hover)
    if (!state.isDraggingObject && !state.grid.isDragging && !state.fog.isDrawing && !state.isLassoDrawing && !state.viewport.isPanning) {
      if (state.viewport.spacePressed || state.grid.dragMode) {
        elements.mainCanvas.style.cursor = 'grab';
      } else if (state.activePlacementType) {
        elements.mainCanvas.style.cursor = 'crosshair';
      } else {
        const hoverObj = findObjectAtCoords(coords.x, coords.y, state.fog.enabled);
        if (hoverObj) {
          elements.mainCanvas.style.cursor = 'grab';
        } else {
          elements.mainCanvas.style.cursor = state.fog.enabled ? 'crosshair' : 'default';
        }
      }
    }
  }

  function onCanvasMouseUp() {
    state.viewport.isPanning = false;
    state.grid.isDragging = false;
    state.fog.isDrawing = false;

    if (state.isLassoDrawing) {
      state.isLassoDrawing = false;
      if (state.lassoPoints.length >= 4) {
        addPolygonObjectAt(state.activePlacementType, state.lassoPoints);
      }
      state.lassoPoints = [];
    }

    if (state.isDraggingObject) {
      state.isDraggingObject = false;
      state.draggedObject = null;
      elements.mainCanvas.style.cursor = state.fog.enabled ? 'crosshair' : 'default';
      renderObjectsList();
    }
  }

  function onCanvasContextMenu(e) {
    e.preventDefault();
    const coords = getCanvasCoords(e);
    const hitObj = findObjectAtCoords(coords.x, coords.y);
    if (hitObj) {
      state.selectedObjectId = hitObj.id;
      state.propSize = hitObj.radius;
      elements.propSizeInput.value = hitObj.radius;
      elements.propSizeVal.textContent = hitObj.radius;
      if (elements.animSpeedInput && elements.animSpeedVal) {
        const curSpeed = hitObj.animSpeed !== undefined ? hitObj.animSpeed : 1.0;
        elements.animSpeedInput.value = Math.round(curSpeed * 100);
        elements.animSpeedVal.textContent = elements.animSpeedInput.value;
      }
      renderObjectsList();
      openContextMenuForObject(hitObj, e.clientX, e.clientY);
    } else {
      closeContextMenu();
    }
  }

  // ==============================================================
  // 7. НАСТРОЙКИ СЕТКИ (GRID SUBSYSTEM)
  // ==============================================================
  function setupGridControls() {
    elements.gridTypeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.grid.type = e.target.value;
        const isHex = state.grid.type === 'hex';
        elements.diagonalToggleLabel.style.display = isHex ? 'none' : 'inline-flex';
        elements.squareToggleLabel.style.display = isHex ? 'none' : 'inline-flex';
        elements.rowsInput.disabled = isHex || state.grid.squareCells;
        elements.rowsLabel.style.opacity = (isHex || state.grid.squareCells) ? '0.4' : '1';
      });
    });

    elements.colsInput.addEventListener('input', (e) => {
      state.grid.cols = Math.max(1, parseInt(e.target.value, 10) || 1);
    });

    elements.rowsInput.addEventListener('input', (e) => {
      state.grid.rows = Math.max(1, parseInt(e.target.value, 10) || 1);
    });

    elements.squareToggle.addEventListener('change', (e) => {
      state.grid.squareCells = e.target.checked;
      elements.rowsInput.disabled = state.grid.squareCells;
      elements.rowsLabel.style.opacity = state.grid.squareCells ? '0.4' : '1';
    });

    elements.colorPicker.addEventListener('input', (e) => {
      state.grid.color = e.target.value;
    });

    elements.thicknessInput.addEventListener('input', (e) => {
      state.grid.thickness = parseInt(e.target.value, 10) || 1;
      elements.thicknessValue.textContent = state.grid.thickness;
    });

    elements.opacityInput.addEventListener('input', (e) => {
      state.grid.opacity = parseInt(e.target.value, 10) || 80;
      elements.opacityValue.textContent = state.grid.opacity;
    });

    elements.labelsToggle.addEventListener('change', (e) => {
      state.grid.showLabels = e.target.checked;
    });

    elements.diagonalToggle.addEventListener('change', (e) => {
      state.grid.showDiagonals = e.target.checked;
    });

    elements.dragToggle.addEventListener('click', () => {
      state.grid.dragMode = !state.grid.dragMode;
      if (state.grid.dragMode) {
        elements.dragToggle.classList.add('wm-btn-tool', 'active');
        elements.dragToggle.textContent = '✓ Перетаскивание активно';
        elements.resetPosition.hidden = false;
        elements.mainCanvas.style.cursor = 'grab';
      } else {
        elements.dragToggle.classList.remove('wm-btn-tool', 'active');
        elements.dragToggle.textContent = 'Перетащить сетку';
        elements.resetPosition.hidden = true;
        elements.mainCanvas.style.cursor = 'crosshair';
      }
    });

    elements.resetPosition.addEventListener('click', () => {
      state.grid.offsetX = 0;
      state.grid.offsetY = 0;
    });
  }

  function drawSquareGrid(ctx, w, h) {
    const cols = state.grid.cols;
    let rows = state.grid.rows;
    const cellW = w / cols;
    let cellH = state.grid.squareCells ? cellW : (h / rows);

    if (state.grid.squareCells) {
      rows = Math.ceil(h / cellH);
    }

    const strokeColor = hexToRgba(state.grid.color, state.grid.opacity / 100);
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(1, state.grid.thickness);

    const offX = state.grid.offsetX % cellW;
    const offY = state.grid.offsetY % cellH;

    ctx.beginPath();
    const startCol = Math.floor(-offX / cellW) - 1;
    const endCol = Math.ceil((w - offX) / cellW) + 1;
    for (let i = startCol; i <= endCol; i++) {
      const x = Math.round(i * cellW + offX);
      if (x >= 0 && x <= w) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
    }

    const startRow = Math.floor(-offY / cellH) - 1;
    const endRow = Math.ceil((h - offY) / cellH) + 1;
    for (let j = startRow; j <= endRow; j++) {
      const y = Math.round(j * cellH + offY);
      if (y >= 0 && y <= h) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
    }

    if (state.grid.showDiagonals) {
      for (let i = startCol; i <= endCol; i++) {
        for (let j = startRow; j <= endRow; j++) {
          const x1 = i * cellW + offX;
          const y1 = j * cellH + offY;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 + cellW, y1 + cellH);
          ctx.moveTo(x1 + cellW, y1);
          ctx.lineTo(x1, y1 + cellH);
        }
      }
    }
    ctx.stroke();

    if (state.grid.showLabels) {
      const fontSize = Math.max(10, Math.min(cellW, cellH) * 0.26);
      ctx.font = `bold ${Math.round(fontSize)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = strokeColor;

      for (let i = 0; i < cols; i++) {
        const x = i * cellW + offX + cellW / 2;
        if (x > 0 && x < w) {
          ctx.fillText(colToLetter(i), x, 14);
        }
      }
      for (let j = 0; j < rows; j++) {
        const y = j * cellH + offY + cellH / 2;
        if (y > 0 && y < h) {
          ctx.fillText(String(j + 1), 14, y);
        }
      }
    }
    ctx.restore();
  }

  function drawHexGrid(ctx, w, h) {
    const cols = state.grid.cols;
    const r = (w / cols) / (Math.sqrt(3));
    const hexH = 2 * r;
    const hexW = Math.sqrt(3) * r;
    const vertDist = hexH * 0.75;

    const strokeColor = hexToRgba(state.grid.color, state.grid.opacity / 100);
    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(1, state.grid.thickness);

    const offX = state.grid.offsetX % hexW;
    const offY = state.grid.offsetY % (vertDist * 2);

    const totalRows = Math.ceil(h / vertDist) + 2;
    const totalCols = Math.ceil(w / hexW) + 2;

    ctx.beginPath();
    for (let row = -1; row <= totalRows; row++) {
      for (let col = -1; col <= totalCols; col++) {
        const cx = col * hexW + ((row & 1) ? hexW / 2 : 0) + offX;
        const cy = row * vertDist + offY;
        if (cx + r >= 0 && cx - r <= w && cy + r >= 0 && cy - r <= h) {
          for (let k = 0; k < 6; k++) {
            const angle = (Math.PI / 180) * (60 * k - 30);
            const px = cx + r * Math.cos(angle);
            const py = cy + r * Math.sin(angle);
            if (k === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        }
      }
    }
    ctx.stroke();
    ctx.restore();
  }

  // ==============================================================
  // 8. ЧАСТИЦЫ И ПОГОДА (WEATHER ENGINE)
  // ==============================================================
  function initParticles() {
    state.particles = [];
    const count = 90;
    for (let i = 0; i < count; i++) {
      state.particles.push({
        x: Math.random() * (state.origWidth || 1000),
        y: Math.random() * (state.origHeight || 800),
        vx: (Math.random() - 0.5) * 1.5,
        vy: Math.random() * 3 + 2,
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.7 + 0.3,
        life: Math.random()
      });
    }
  }

  function updateAndDrawParticles(ctx, w, h) {
    if (state.weather === 'none') return;

    ctx.save();
    for (let p of state.particles) {
      if (state.weather === 'rain') {
        p.vy = 12;
        p.vx = -2.5;
        p.y += p.vy;
        p.x += p.vx;
        ctx.strokeStyle = `rgba(180, 210, 255, ${p.alpha * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.vx * 1.8, p.y + p.vy * 1.8);
        ctx.stroke();
      } else if (state.weather === 'snow') {
        p.vy = 1.8;
        p.vx = Math.sin(p.y * 0.02) * 1.2;
        p.y += p.vy;
        p.x += p.vx;
        ctx.fillStyle = `rgba(240, 245, 255, ${p.alpha * 0.85})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.3, 0, Math.PI * 2);
        ctx.fill();
      } else if (state.weather === 'embers') {
        p.vy = -(Math.random() * 2 + 1.2);
        p.vx = (Math.random() - 0.5) * 1.5;
        p.y += p.vy;
        p.x += p.vx;
        ctx.fillStyle = `rgba(255, ${Math.floor(100 + Math.random() * 100)}, 20, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
        ctx.fill();
      } else if (state.weather === 'magic') {
        p.vy = Math.sin(p.x * 0.03) * 1.5;
        p.vx = Math.cos(p.y * 0.03) * 1.5;
        p.y += p.vy;
        p.x += p.vx;
        ctx.fillStyle = `rgba(200, 140, 255, ${p.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      if (p.y > h) { p.y = -10; p.x = Math.random() * w; }
      if (p.y < -10) { p.y = h; p.x = Math.random() * w; }
      if (p.x > w) p.x = 0;
      if (p.x < 0) p.x = w;
    }
    ctx.restore();
  }

  // ==============================================================
  // 9. ГЛАВНЫЙ ЦИКЛ РЕНДЕРИНГА (MAIN RENDER LOOP)
  // ==============================================================
  function renderLoop(timestamp) {
    state.globalPhase += 0.035 * state.animSpeed;

    if (state.origWidth > 0 && state.origHeight > 0) {
      const ctx = mainCtx;
      const w = elements.mainCanvas.width;
      const h = elements.mainCanvas.height;

      ctx.clearRect(0, 0, w, h);

      // 1. Фон карты (Изображение или Видео)
      if (state.mediaType === 'video' && state.mediaElement && state.mediaElement.readyState >= 2) {
        ctx.drawImage(state.mediaElement, 0, 0, w, h);
      } else if (state.mediaType === 'image' && state.mediaElement) {
        ctx.drawImage(state.mediaElement, 0, 0, w, h);
      }

      // 2. Интерактивные объекты (вода, костры, лава, порталы и т.д.)
      if (state.objects.length > 0) {
        for (let obj of state.objects) {
          const def = OBJECT_TYPES[obj.type];
          if (def && def.draw) {
            const objSpeed = (obj.animSpeed !== undefined ? obj.animSpeed : 1.0);
            if (obj.phase === undefined) obj.phase = Math.random() * 10;
            obj.phase += 0.035 * objSpeed;
            def.draw(ctx, obj, obj.phase, objSpeed);
          }
        }
      }

      // 3. Тактическая сетка
      if (state.grid.type === 'square') {
        drawSquareGrid(ctx, w, h);
      } else {
        drawHexGrid(ctx, w, h);
      }

      // 4. Туман войны
      if (state.fog.enabled && state.fog.canvas) {
        ctx.save();
        const fogAlpha = state.isPlayerView ? 1.0 : state.fog.dmOpacity;
        ctx.globalAlpha = fogAlpha;
        ctx.drawImage(state.fog.canvas, 0, 0, w, h);
        ctx.restore();
      }

      // 5. Погодные частицы
      updateAndDrawParticles(ctx, w, h);

      // 6. UI маркеры (только для Мастера)
      if (!state.isPlayerView) {
        // Стабильные токен-маркеры и выделения объектов
        ctx.save();
        for (let obj of state.objects) {
          const isSelected = obj.id === state.selectedObjectId;

          // Рамка контура / радиуса при выделении
          if (isSelected) {
            ctx.save();
            ctx.beginPath();
            if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
              tracePolygonPath(ctx, obj.points);
            } else {
              ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
            }
            ctx.strokeStyle = '#f5c842';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.restore();
          }

          // Статичный красивый DM-токен объекта (не мигает)
          drawTokenBadge(ctx, obj, isSelected);
        }
        ctx.restore();

        // Предпросмотр кисти тумана (скрывается при перетаскивании объекта)
        if (state.fog.enabled && state.isMouseOverCanvas && state.mouseCanvasX !== null && !state.activePlacementType && !state.isDraggingObject) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(state.mouseCanvasX, state.mouseCanvasY, state.fog.brushSize, 0, Math.PI * 2);
          ctx.strokeStyle = state.fog.mode === 'reveal' ? 'rgba(245, 200, 66, 0.85)' : 'rgba(255, 100, 100, 0.85)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.restore();
        }

        // Живой контур лассо при рисовании
        if (state.isLassoDrawing && state.lassoPoints.length > 1) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(state.lassoPoints[0].x, state.lassoPoints[0].y);
          for (let i = 1; i < state.lassoPoints.length; i++) {
            ctx.lineTo(state.lassoPoints[i].x, state.lassoPoints[i].y);
          }
          ctx.strokeStyle = '#f5c842';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([6, 4]);
          ctx.stroke();
          ctx.fillStyle = 'rgba(245, 200, 66, 0.15)';
          ctx.fill();
          ctx.restore();
        }

        // Предпросмотр размещения точечного объекта
        if (state.activePlacementType && state.placementShapeMode !== 'lasso' && state.isMouseOverCanvas && state.mouseCanvasX !== null) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(state.mouseCanvasX, state.mouseCanvasY, state.propSize, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(245, 200, 66, 0.9)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();

          // Статичный превью-токен под курсором мыши
          drawTokenBadge(ctx, { type: state.activePlacementType, x: state.mouseCanvasX, y: state.mouseCanvasY }, true);
          ctx.restore();
        }
      }
    }

    animationFrameId = requestAnimationFrame(renderLoop);
  }

  // ==============================================================
  // 10. РЕЖИМ ВИДА ИГРОКОВ (PLAYER VIEW)
  // ==============================================================
  function setupPlayerView() {
    elements.playerViewBtn.addEventListener('click', togglePlayerView);
    elements.exitPlayerViewBtn.addEventListener('click', togglePlayerView);
  }

  function togglePlayerView() {
    state.isPlayerView = !state.isPlayerView;
    if (state.isPlayerView) {
      document.body.classList.add('player-view-active');
      elements.exitPlayerViewBtn.hidden = false;
      fitToScreen();
    } else {
      document.body.classList.remove('player-view-active');
      elements.exitPlayerViewBtn.hidden = true;
      fitToScreen();
    }
  }

  // ==============================================================
  // 11. НАВИГАЦИЯ, ZOOM & PAN
  // ==============================================================
  function setupViewportControls() {
    elements.zoomInBtn.addEventListener('click', () => {
      state.viewport.zoom = Math.min(4.0, state.viewport.zoom * 1.25);
      applyViewportTransform();
    });

    elements.zoomOutBtn.addEventListener('click', () => {
      state.viewport.zoom = Math.max(0.15, state.viewport.zoom / 1.25);
      applyViewportTransform();
    });

    elements.zoomFitBtn.addEventListener('click', fitToScreen);

    const canvasArea = elements.canvasWrapper ? elements.canvasWrapper.parentElement : null;
    if (canvasArea) {
      canvasArea.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        state.viewport.zoom = Math.min(4.0, Math.max(0.15, state.viewport.zoom * delta));
        applyViewportTransform();
      }, { passive: false });
    }
  }

  function setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        state.viewport.spacePressed = true;
        elements.mainCanvas.style.cursor = 'grab';
      }
      if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') {
        if (state.fog.enabled) elements.brushRevealBtn.click();
      }
      if (e.key === 'h' || e.key === 'H' || e.key === 'р' || e.key === 'Р') {
        if (state.fog.enabled) elements.brushHideBtn.click();
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (state.selectedObjectId && !elements.mapNameInput.matches(':focus')) {
          state.objects = state.objects.filter(o => o.id !== state.selectedObjectId);
          state.selectedObjectId = null;
          renderObjectsList();
        }
      }
      if (e.key === 'Escape') {
        if (state.activePlacementType) {
          cancelPlacementMode();
        } else if (state.selectedObjectId) {
          state.selectedObjectId = null;
          renderObjectsList();
        } else if (state.isPlayerView) {
          togglePlayerView();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        state.viewport.spacePressed = false;
        elements.mainCanvas.style.cursor = state.grid.dragMode ? 'grab' : 'crosshair';
      }
    });

    window.addEventListener('resize', () => {
      if (state.origWidth > 0) fitToScreen();
    });
  }

  // ==============================================================
  // 12. СОХРАНЕНИЕ И ЗАГРУЗКА ПРОЕКТА (.DNDMAP)
  // ==============================================================
  function setupProjectSaveLoad() {
    elements.saveProjectBtn.addEventListener('click', saveProject);
    elements.exportHtmlBtn.addEventListener('click', exportStandaloneHtml);

    elements.projectFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        loadProjectFile(e.target.files[0]);
      }
    });

    setupDropzoneListeners(elements.projectDropzone, (file) => loadProjectFile(file));
    elements.downloadBtn.addEventListener('click', exportImage);
    elements.resetBtn.addEventListener('click', resetAll);
  }

  function saveProject() {
    if (!state.origWidth) {
      alert('Сначала загрузите карту!');
      return;
    }

    const mapName = (elements.mapNameInput.value || 'map').trim();

    let fogMaskData = null;
    if (state.fog.canvas) {
      fogMaskData = state.fog.canvas.toDataURL('image/png');
    }

    const projectData = {
      version: '1.2',
      tool: 'world-mirror',
      name: mapName,
      created: new Date().toISOString(),
      mediaType: state.mediaType,
      mediaFileName: state.mediaFileName,
      mediaDataUrl: state.mediaDataUrl,
      grid: {
        type: state.grid.type,
        cols: state.grid.cols,
        rows: state.grid.rows,
        squareCells: state.grid.squareCells,
        color: state.grid.color,
        thickness: state.grid.thickness,
        opacity: state.grid.opacity,
        showLabels: state.grid.showLabels,
        showDiagonals: state.grid.showDiagonals,
        offsetX: state.grid.offsetX,
        offsetY: state.grid.offsetY
      },
      fog: {
        enabled: state.fog.enabled,
        brushSize: state.fog.brushSize,
        feather: state.fog.feather,
        dmOpacity: state.fog.dmOpacity,
        maskData: fogMaskData
      },
      objects: state.objects,
      lights: state.objects, // Алиас для совместимости
      lightsRevealFog: state.lightsRevealFog,
      animSpeed: state.animSpeed !== undefined ? state.animSpeed : 1.0,
      weather: state.weather
    };

    const blob = new Blob([JSON.stringify(projectData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${mapName}.dndmap`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function loadProjectFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const project = JSON.parse(e.target.result);
        restoreProject(project);
      } catch (err) {
        alert('Ошибка при чтении файла проекта .dndmap: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  function restoreProject(proj) {
    if (!proj.grid) {
      alert('Неверный формат файла .dndmap');
      return;
    }

    state.grid.type = proj.grid.type || 'square';
    state.grid.cols = proj.grid.cols || 10;
    state.grid.rows = proj.grid.rows || 10;
    state.grid.squareCells = !!proj.grid.squareCells;
    state.grid.color = proj.grid.color || '#c9a84c';
    state.grid.thickness = proj.grid.thickness || 2;
    state.grid.opacity = proj.grid.opacity || 80;
    state.grid.showLabels = !!proj.grid.showLabels;
    state.grid.showDiagonals = !!proj.grid.showDiagonals;
    state.grid.offsetX = proj.grid.offsetX || 0;
    state.grid.offsetY = proj.grid.offsetY || 0;

    elements.colsInput.value = state.grid.cols;
    elements.rowsInput.value = state.grid.rows;
    elements.squareToggle.checked = state.grid.squareCells;
    elements.colorPicker.value = state.grid.color;
    elements.thicknessInput.value = state.grid.thickness;
    elements.thicknessValue.textContent = state.grid.thickness;
    elements.opacityInput.value = state.grid.opacity;
    elements.opacityValue.textContent = state.grid.opacity;
    elements.labelsToggle.checked = state.grid.showLabels;
    elements.diagonalToggle.checked = state.grid.showDiagonals;
    elements.gridTypeRadios.forEach(r => { r.checked = (r.value === state.grid.type); });

    if (proj.fog) {
      state.fog.enabled = !!proj.fog.enabled;
      state.fog.brushSize = proj.fog.brushSize || 60;
      state.fog.feather = proj.fog.feather !== undefined ? proj.fog.feather : 0.5;
      state.fog.dmOpacity = proj.fog.dmOpacity !== undefined ? proj.fog.dmOpacity : 0.35;

      elements.fogToggle.checked = state.fog.enabled;
      elements.fogControls.hidden = !state.fog.enabled;
      elements.brushSizeInput.value = state.fog.brushSize;
      elements.brushSizeVal.textContent = state.fog.brushSize;
      elements.brushFeatherInput.value = Math.round(state.fog.feather * 100);
      elements.brushFeatherVal.textContent = Math.round(state.fog.feather * 100);
      elements.dmOpacityInput.value = Math.round(state.fog.dmOpacity * 100);
      elements.dmOpacityVal.textContent = Math.round(state.fog.dmOpacity * 100);
    }

    state.objects = proj.objects || proj.lights || [];
    state.lightsRevealFog = proj.lightsRevealFog !== undefined ? proj.lightsRevealFog : true;
    elements.lightsRevealFogToggle.checked = state.lightsRevealFog;
    state.animSpeed = proj.animSpeed !== undefined ? proj.animSpeed : 1.0;
    if (elements.animSpeedInput) {
      elements.animSpeedInput.value = Math.round(state.animSpeed * 100);
    }
    if (elements.animSpeedVal) {
      elements.animSpeedVal.textContent = Math.round(state.animSpeed * 100);
    }
    renderObjectsList();

    state.weather = proj.weather || 'none';
    elements.weatherSelect.value = state.weather;
    initParticles();

    if (proj.name) {
      elements.mapNameInput.value = proj.name;
    }

    if (proj.mediaDataUrl) {
      const img = new Image();
      img.onload = () => {
        state.mediaType = 'image';
        state.mediaElement = img;
        state.mediaDataUrl = proj.mediaDataUrl;
        state.mediaFileName = proj.mediaFileName || 'map';
        state.origWidth = img.naturalWidth;
        state.origHeight = img.naturalHeight;

        onMediaLoaded(state.mediaFileName, `${img.naturalWidth}×${img.naturalHeight}`, 0);

        if (proj.fog && proj.fog.maskData) {
          const maskImg = new Image();
          maskImg.onload = () => {
            if (state.fog.ctx) {
              state.fog.ctx.clearRect(0, 0, state.origWidth, state.origHeight);
              state.fog.ctx.drawImage(maskImg, 0, 0);
            }
          };
          maskImg.src = proj.fog.maskData;
        }
      };
      img.src = proj.mediaDataUrl;
    } else {
      alert('Проект загружен! Пожалуйста, выберите файл карты для продолжения.');
    }
  }

  function exportImage() {
    if (!state.origWidth) return;

    const format = elements.formatSelect.value;
    const mimeMap = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };
    const mime = mimeMap[format] || 'image/png';
    const quality = format === 'jpg' ? 0.92 : undefined;

    const offCanvas = document.createElement('canvas');
    offCanvas.width = state.origWidth;
    offCanvas.height = state.origHeight;
    const offCtx = offCanvas.getContext('2d');

    // 1. Фон
    if (state.mediaElement) {
      offCtx.drawImage(state.mediaElement, 0, 0, state.origWidth, state.origHeight);
    }
    // 2. Интерактивные объекты
    if (state.objects.length > 0) {
      for (let obj of state.objects) {
        const def = OBJECT_TYPES[obj.type];
        if (def && def.draw) {
          def.draw(offCtx, obj, state.globalPhase);
        }
      }
    }
    // 3. Сетка
    if (state.grid.type === 'square') {
      drawSquareGrid(offCtx, state.origWidth, state.origHeight);
    } else {
      drawHexGrid(offCtx, state.origWidth, state.origHeight);
    }
    // 4. Туман
    if (state.fog.enabled && state.fog.canvas) {
      offCtx.save();
      offCtx.globalAlpha = state.isPlayerView ? 1.0 : state.fog.dmOpacity;
      offCtx.drawImage(state.fog.canvas, 0, 0);
      offCtx.restore();
    }

    offCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${elements.mapNameInput.value || 'battlemap'}.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    }, mime, quality);
  }

  function exportStandaloneHtml() {
    if (!state.origWidth) {
      alert('Сначала загрузите карту!');
      return;
    }

    const mapName = (elements.mapNameInput.value || 'map').trim();

    // 1. Получаем маску тумана
    let fogMaskData = null;
    if (state.fog.canvas) {
      fogMaskData = state.fog.canvas.toDataURL('image/png');
    }

    // 2. Получаем DataURL фонового изображения
    let mapImgSrc = state.mediaDataUrl;
    if (!mapImgSrc && state.mediaElement) {
      try {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = state.origWidth;
        offCanvas.height = state.origHeight;
        const offCtx = offCanvas.getContext('2d');
        offCtx.drawImage(state.mediaElement, 0, 0);
        mapImgSrc = offCanvas.toDataURL('image/jpeg', 0.92);
      } catch (err) {
        console.warn('Canvas export warning:', err);
      }
    }

    if (!mapImgSrc) {
      alert('Не удалось сформировать изображение для автономной карты.');
      return;
    }

    // 3. Формируем полезную нагрузку
    const payload = {
      name: mapName,
      width: state.origWidth,
      height: state.origHeight,
      imgSrc: mapImgSrc,
      fog: {
        enabled: state.fog.enabled,
        brushSize: state.fog.brushSize,
        feather: state.fog.feather,
        dmOpacity: state.fog.dmOpacity,
        maskData: fogMaskData
      },
      grid: {
        type: state.grid.type,
        cols: state.grid.cols,
        rows: state.grid.rows,
        squareCells: state.grid.squareCells,
        color: state.grid.color,
        thickness: state.grid.thickness,
        opacity: state.grid.opacity,
        showLabels: state.grid.showLabels,
        showDiagonals: state.grid.showDiagonals,
        offsetX: state.grid.offsetX,
        offsetY: state.grid.offsetY
      },
      objects: state.objects,
      lightsRevealFog: state.lightsRevealFog,
      animSpeed: state.animSpeed !== undefined ? state.animSpeed : 1.0,
      weather: state.weather
    };

    const standaloneHtml = buildStandaloneHtml(payload);

    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${mapName}_интерактивная_карта.html`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  function buildStandaloneHtml(payload) {
    const jsonPayload = JSON.stringify(payload).replace(/</g, '\\u003c');

    return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(payload.name)} — Живая карта D&D</title>
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden;
      background: #080811; color: #f0e6d0; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      user-select: none;
    }
    #topBar {
      position: absolute; top: 0; left: 0; right: 0; height: 48px;
      background: rgba(13, 13, 26, 0.94); border-bottom: 1.5px solid rgba(201, 168, 76, 0.4);
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 16px; z-index: 50; backdrop-filter: blur(8px);
      box-shadow: 0 4px 20px rgba(0,0,0,0.6);
    }
    .bar-group { display: flex; align-items: center; gap: 8px; }
    .bar-title {
      font-weight: 700; color: #f5c842; font-size: 0.92rem; display: flex; align-items: center; gap: 6px;
      margin-right: 6px;
    }
    .btn {
      background: rgba(30, 30, 48, 0.85); border: 1px solid rgba(201, 168, 76, 0.35);
      color: #f0e6d0; padding: 5px 10px; border-radius: 4px; font-size: 0.74rem;
      cursor: pointer; transition: all 0.15s; display: inline-flex; align-items: center; gap: 4px;
    }
    .btn:hover { background: rgba(201, 168, 76, 0.2); border-color: #f5c842; color: #fff; }
    .btn.active {
      background: linear-gradient(135deg, rgba(201, 168, 76, 0.35), rgba(245, 200, 66, 0.15));
      border-color: #f5c842; color: #f5c842; font-weight: 600;
      box-shadow: 0 0 10px rgba(245, 200, 66, 0.3);
    }
    .btn-pv {
      background: linear-gradient(135deg, rgba(123, 45, 139, 0.45), rgba(26, 26, 46, 0.85));
      border-color: rgba(201, 168, 76, 0.5); color: #f5c842; font-weight: 600;
    }
    .label-ctrl {
      font-size: 0.72rem; color: #d4c5a0; display: flex; align-items: center; gap: 6px;
    }
    .range-input { accent-color: #c9a84c; cursor: pointer; height: 5px; width: 75px; }
    #canvasWrapper {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      transform-origin: center center;
    }
    canvas { display: block; box-shadow: 0 0 40px rgba(0,0,0,0.9); }
    #hud {
      position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
      display: flex; align-items: center; gap: 8px;
      background: rgba(13, 13, 26, 0.85); border: 1px solid rgba(201, 168, 76, 0.35);
      border-radius: 20px; padding: 5px 14px; backdrop-filter: blur(8px);
      z-index: 50; font-size: 0.72rem;
    }
    #hud .chip { color: #f5c842; font-weight: 700; min-width: 40px; text-align: center; }
    #hud button {
      background: transparent; border: none; color: #f0e6d0; cursor: pointer; font-size: 0.9rem; padding: 2px 6px;
    }
    #hud button:hover { color: #f5c842; }
    .hud-hint { color: #a09885; font-style: italic; font-size: 0.68rem; margin-left: 6px; }
    #exitPlayerBtn {
      position: absolute; top: 16px; right: 16px; z-index: 100;
      background: rgba(13, 13, 26, 0.85); border: 1px solid rgba(201, 168, 76, 0.5);
      color: #f5c842; padding: 8px 16px; border-radius: 20px; font-size: 0.75rem;
      cursor: pointer; opacity: 0.35; transition: opacity 0.2s;
    }
    #exitPlayerBtn:hover { opacity: 1; }
    body.player-mode #topBar, body.player-mode #hud { display: none !important; }
  </style>
</head>
<body>
  <div id="topBar">
    <div class="bar-group">
      <span class="bar-title">🔮 ${escapeHtml(payload.name)}</span>
      <button id="bReveal" class="btn active" title="Горячая клавиша: R">🔦 Стереть (R)</button>
      <button id="bHide" class="btn" title="Горячая клавиша: H">⬛ Накрыть (H)</button>
      <label class="label-ctrl">
        Радиус: <strong id="rVal" style="color:#f5c842;">${payload.fog.brushSize || 60}</strong>px
        <input type="range" id="rInput" min="15" max="300" step="5" value="${payload.fog.brushSize || 60}" class="range-input">
      </label>
      <label class="label-ctrl">
        DM Вид: <strong id="opVal" style="color:#f5c842;">${Math.round((payload.fog.dmOpacity || 0.35) * 100)}</strong>%
        <input type="range" id="opInput" min="0" max="100" step="5" value="${Math.round((payload.fog.dmOpacity || 0.35) * 100)}" class="range-input">
      </label>
      <label class="label-ctrl">
        ⚡ Анимация: <strong id="spdVal" style="color:#f5c842;">${Math.round((payload.animSpeed !== undefined ? payload.animSpeed : 1.0) * 100)}</strong>%
        <input type="range" id="spdInput" min="0" max="200" step="5" value="${Math.round((payload.animSpeed !== undefined ? payload.animSpeed : 1.0) * 100)}" class="range-input" style="width:65px;">
      </label>
    </div>
    <div class="bar-group">
      <button id="bClear" class="btn">☀️ Очистить</button>
      <button id="bCover" class="btn">🪣 Залить</button>
      <button id="bPlayer" class="btn btn-pv">👁️ Вид игроков (P)</button>
    </div>
  </div>

  <div id="canvasWrapper">
    <canvas id="c"></canvas>
  </div>

  <div id="hud">
    <span class="chip" id="hudZoom">100%</span>
    <button id="zIn" title="Приблизить">➕</button>
    <button id="zOut" title="Отдалить">➖</button>
    <button id="zFit" title="По размеру экрана">⤢</button>
    <span class="hud-hint">Пробел + ЛКМ: перемещение • Колёсико: зум • R / H: кисть тумана</span>
  </div>

  <button id="exitPlayerBtn" style="display:none;">✕ Выход из вида игроков (Esc)</button>

  <script>
  (function() {
    const DATA = ${jsonPayload};

    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const wrapper = document.getElementById('canvasWrapper');

    canvas.width = DATA.width;
    canvas.height = DATA.height;

    const mapImg = new Image();
    mapImg.src = DATA.imgSrc;

    // Туман войны
    const fogCanvas = document.createElement('canvas');
    fogCanvas.width = DATA.width;
    fogCanvas.height = DATA.height;
    const fogCtx = fogCanvas.getContext('2d');

    if (DATA.fog.maskData) {
      const mask = new Image();
      mask.onload = () => { fogCtx.drawImage(mask, 0, 0); };
      mask.src = DATA.fog.maskData;
    } else {
      fogCtx.fillStyle = '#0b0c14';
      fogCtx.fillRect(0, 0, DATA.width, DATA.height);
      if (DATA.lightsRevealFog !== false) {
        revealFogFromAllLights();
      }
    }

    // Состояние плеера
    let brushMode = 'reveal';
    let brushSize = DATA.fog.brushSize || 60;
    let brushFeather = DATA.fog.feather || 0.5;
    let dmOpacity = DATA.fog.dmOpacity !== undefined ? DATA.fog.dmOpacity : 0.35;
    let animSpeed = DATA.animSpeed !== undefined ? DATA.animSpeed : 1.0;
    let isPlayerMode = false;
    let isDrawing = false;
    let lastX = 0, lastY = 0;
    let mouseX = null, mouseY = null, isMouseOver = false;

    // Вьюпорт (Zoom & Pan)
    let zoom = 1.0, panX = 0, panY = 0;
    let isPanning = false, spacePressed = false, startPanX = 0, startPanY = 0;
    let globalPhase = 0;

    // Векторные иконки для автономной карты
    const PROP_ICONS_SVG = ${JSON.stringify(PROP_ICONS_SVG)};
    const propIconImages = {};
    for (const [k, svg] of Object.entries(PROP_ICONS_SVG)) {
      const img = new Image();
      img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
      propIconImages[k] = img;
    }

    function drawTokenBadge(c, obj, isSelected) {
      const tokenRadius = 14;
      c.save();
      c.shadowColor = 'rgba(0, 0, 0, 0.85)';
      c.shadowBlur = 8;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 2;
      c.beginPath();
      c.arc(obj.x, obj.y, tokenRadius, 0, Math.PI * 2);
      c.fillStyle = '#0f111a';
      c.fill();
      c.shadowBlur = 0;
      c.lineWidth = isSelected ? 2.5 : 1.5;
      c.strokeStyle = isSelected ? '#f5c842' : '#c9a84c';
      c.stroke();
      if (isSelected) {
        c.beginPath();
        c.arc(obj.x, obj.y, tokenRadius + 3, 0, Math.PI * 2);
        c.strokeStyle = 'rgba(245, 200, 66, 0.5)';
        c.lineWidth = 1.5;
        c.stroke();
      }
      const iconImg = propIconImages[obj.type];
      if (iconImg && iconImg.complete && iconImg.naturalWidth > 0) {
        const iconSize = 18;
        c.drawImage(iconImg, obj.x - iconSize / 2, obj.y - iconSize / 2, iconSize, iconSize);
      }
      c.restore();
    }

    function tracePolygonPath(c, pts) {
      if (!pts || pts.length === 0) return;
      c.beginPath();
      c.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) c.lineTo(pts[i].x, pts[i].y);
      c.closePath();
    }

    // Реестр процедурной графики
    const OBJECT_TYPES = {
      torch: {
        draw(c, obj, p, spd = 1.0) {
          const f = (Math.sin(p * 4 + obj.id) * 0.08 + (Math.random() - 0.5) * 0.03) * spd;
          const r = obj.radius * (1 + f);
          const g = c.createRadialGradient(obj.x, obj.y, r * 0.08, obj.x, obj.y, r);
          g.addColorStop(0, 'rgba(255, 245, 210, 0.9)');
          g.addColorStop(0.25, 'rgba(245, 158, 11, 0.55)');
          g.addColorStop(0.65, 'rgba(217, 119, 6, 0.18)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          c.fillStyle = g;
          c.beginPath(); c.arc(obj.x, obj.y, r, 0, Math.PI * 2); c.fill();
        }
      },
      campfire: {
        draw(c, obj, p, spd = 1.0) {
          const f = (Math.sin(p * 3.5 + obj.id) * 0.09 + (Math.random() - 0.5) * 0.04) * spd;
          const r = obj.radius * (1 + f);
          const g = c.createRadialGradient(obj.x, obj.y, r * 0.12, obj.x, obj.y, r);
          g.addColorStop(0, 'rgba(255, 250, 220, 0.95)');
          g.addColorStop(0.2, 'rgba(249, 115, 22, 0.65)');
          g.addColorStop(0.5, 'rgba(220, 38, 38, 0.25)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          c.fillStyle = g;
          c.beginPath(); c.arc(obj.x, obj.y, r, 0, Math.PI * 2); c.fill();

          c.save();
          c.strokeStyle = '#451a03'; c.lineWidth = 5; c.lineCap = 'round';
          c.beginPath();
          c.moveTo(obj.x - 14, obj.y - 8); c.lineTo(obj.x + 14, obj.y + 8);
          c.moveTo(obj.x - 14, obj.y + 8); c.lineTo(obj.x + 14, obj.y - 8);
          c.stroke();
          c.restore();

          c.fillStyle = 'rgba(251, 191, 36, 0.9)';
          c.beginPath(); c.arc(obj.x, obj.y - 2, 9, 0, Math.PI * 2); c.fill();

          for (let i = 0; i < 4; i++) {
            const age = (p * 0.8 + i * 0.25) % 1.0;
            const sx = obj.x + Math.sin(p * 2 + i * 1.5) * (12 + age * 12);
            const sy = obj.y - age * (obj.radius * 0.45);
            c.fillStyle = 'rgba(254, 215, 170, ' + (1 - age) + ')';
            c.beginPath(); c.arc(sx, sy, 2 * (1 - age), 0, Math.PI * 2); c.fill();
          }
        }
      },
      crystal: {
        draw(c, obj, p, spd = 1.0) {
          const r = obj.radius * (1 + Math.sin(p * 2 + obj.id) * 0.08 * spd);
          const g = c.createRadialGradient(obj.x, obj.y, r * 0.08, obj.x, obj.y, r);
          g.addColorStop(0, 'rgba(245, 208, 254, 0.95)');
          g.addColorStop(0.25, 'rgba(192, 132, 252, 0.6)');
          g.addColorStop(0.65, 'rgba(56, 189, 248, 0.18)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          c.fillStyle = g;
          c.beginPath(); c.arc(obj.x, obj.y, r, 0, Math.PI * 2); c.fill();

          c.save();
          c.translate(obj.x, obj.y);
          c.fillStyle = 'rgba(216, 180, 254, 0.9)';
          c.strokeStyle = '#e9d5ff'; c.lineWidth = 1.5;
          c.beginPath();
          c.moveTo(0, -14); c.lineTo(9, 0); c.lineTo(0, 14); c.lineTo(-9, 0); c.closePath();
          c.fill(); c.stroke();
          c.restore();
        }
      },
      candles: {
        draw(c, obj, p, spd = 1.0) {
          const r = obj.radius * (1 + Math.sin(p * 4) * 0.05 * spd);
          const g = c.createRadialGradient(obj.x, obj.y, 4, obj.x, obj.y, r);
          g.addColorStop(0, 'rgba(254, 240, 138, 0.85)');
          g.addColorStop(0.3, 'rgba(245, 158, 11, 0.4)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          c.fillStyle = g;
          c.beginPath(); c.arc(obj.x, obj.y, r, 0, Math.PI * 2); c.fill();
        }
      },
      water: {
        draw(c, obj, p, spd = 1.0) {
          if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
            c.save();
            const g = c.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
            g.addColorStop(0, 'rgba(6, 182, 212, 0.5)');
            g.addColorStop(0.7, 'rgba(14, 116, 144, 0.4)');
            g.addColorStop(1, 'rgba(8, 47, 73, 0.25)');
            tracePolygonPath(c, obj.points);
            c.fillStyle = g; c.fill();
            c.clip();
            for (let i = 0; i < 3; i++) {
              const prog = (p * 0.4 + i * 0.33) % 1.0;
              const r = obj.radius * prog;
              c.strokeStyle = 'rgba(165, 243, 252, ' + ((1 - prog) * 0.65) + ')';
              c.lineWidth = 2.2;
              c.beginPath(); c.ellipse(obj.x, obj.y, r, r * 0.82, Math.sin(p * 0.2) * 0.1 * spd, 0, Math.PI * 2); c.stroke();
            }
            c.restore();
            c.save();
            tracePolygonPath(c, obj.points);
            c.strokeStyle = 'rgba(165, 243, 252, 0.65)';
            c.lineWidth = 2;
            c.stroke();
            c.restore();
            return;
          }
          const g = c.createRadialGradient(obj.x, obj.y, obj.radius * 0.2, obj.x, obj.y, obj.radius);
          g.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
          g.addColorStop(0.7, 'rgba(14, 116, 144, 0.35)');
          g.addColorStop(1, 'rgba(8, 47, 73, 0)');
          c.fillStyle = g;
          c.beginPath(); c.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2); c.fill();

          for (let i = 0; i < 3; i++) {
            const prog = (p * 0.4 + i * 0.33) % 1.0;
            const r = obj.radius * prog;
            c.strokeStyle = 'rgba(165, 243, 252, ' + ((1 - prog) * 0.6) + ')';
            c.lineWidth = 1.8;
            c.beginPath(); c.ellipse(obj.x, obj.y, r, r * 0.82, Math.sin(p * 0.2) * 0.1 * spd, 0, Math.PI * 2);
            c.stroke();
          }
        }
      },
      puddle: {
        draw(c, obj, p, spd = 1.0) {
          if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
            c.save();
            tracePolygonPath(c, obj.points);
            const g = c.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
            g.addColorStop(0, 'rgba(30, 41, 59, 0.7)');
            g.addColorStop(0.8, 'rgba(51, 65, 85, 0.5)');
            g.addColorStop(1, 'rgba(15, 23, 42, 0.3)');
            c.fillStyle = g; c.fill();
            c.clip();
            const prog = (p * 0.35) % 1.0;
            const r = (obj.radius * 0.6) * prog;
            c.strokeStyle = 'rgba(203, 213, 225, ' + ((1 - prog) * 0.5) + ')';
            c.lineWidth = 1.5;
            c.beginPath(); c.ellipse(obj.x, obj.y, r, r * 0.65, 0.25, 0, Math.PI * 2); c.stroke();
            c.restore();
            c.save();
            tracePolygonPath(c, obj.points);
            c.strokeStyle = 'rgba(148, 163, 184, 0.4)'; c.lineWidth = 1.5; c.stroke();
            c.restore();
            return;
          }
          c.save();
          const g = c.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
          g.addColorStop(0, 'rgba(30, 41, 59, 0.65)');
          g.addColorStop(0.75, 'rgba(51, 65, 85, 0.45)');
          g.addColorStop(0.95, 'rgba(148, 163, 184, 0.3)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          c.fillStyle = g;
          c.beginPath(); c.ellipse(obj.x, obj.y, obj.radius, obj.radius * 0.65, 0.25, 0, Math.PI * 2); c.fill();
          c.restore();
        }
      },
      acid: {
        draw(c, obj, p, spd = 1.0) {
          if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
            c.save();
            tracePolygonPath(c, obj.points);
            const g = c.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
            g.addColorStop(0, 'rgba(74, 222, 128, 0.75)');
            g.addColorStop(0.65, 'rgba(22, 163, 74, 0.55)');
            g.addColorStop(1, 'rgba(5, 46, 22, 0.35)');
            c.fillStyle = g; c.fill();
            c.clip();
            for (let i = 0; i < 5; i++) {
              const age = (p * 0.9 + i * 0.2) % 1.0;
              const ang = i * 1.1 + 0.3;
              const dist = (obj.radius * 0.4) * Math.sin(p * 0.5 + i);
              c.strokeStyle = 'rgba(220, 252, 231, ' + (1 - age * 0.6) + ')';
              c.fillStyle = 'rgba(34, 197, 94, ' + (0.8 - age * 0.5) + ')';
              c.lineWidth = 1.2;
              c.beginPath(); c.arc(obj.x + Math.cos(ang) * dist, obj.y + Math.sin(ang) * dist, 3 + age * 5, 0, Math.PI * 2);
              c.fill(); c.stroke();
            }
            c.restore();
            c.save();
            tracePolygonPath(c, obj.points);
            c.strokeStyle = 'rgba(134, 239, 172, 0.65)'; c.lineWidth = 2; c.stroke();
            c.restore();
            return;
          }
          const g = c.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
          g.addColorStop(0, 'rgba(74, 222, 128, 0.7)');
          g.addColorStop(0.6, 'rgba(22, 163, 74, 0.5)');
          g.addColorStop(0.9, 'rgba(21, 128, 61, 0.25)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          c.fillStyle = g;
          c.beginPath(); c.ellipse(obj.x, obj.y, obj.radius, obj.radius * 0.85, 0.1, 0, Math.PI * 2); c.fill();

          for (let i = 0; i < 4; i++) {
            const age = (p * 0.9 + i * 0.25) % 1.0;
            const ang = i * (Math.PI / 2) + 0.3;
            const dist = (obj.radius * 0.45) * Math.sin(p * 0.5 + i);
            const bx = obj.x + Math.cos(ang) * dist;
            const by = obj.y + Math.sin(ang) * dist;
            c.strokeStyle = 'rgba(220, 252, 231, ' + (1 - age * 0.6) + ')';
            c.fillStyle = 'rgba(34, 197, 94, ' + (0.8 - age * 0.5) + ')';
            c.lineWidth = 1.2;
            c.beginPath(); c.arc(bx, by, 3 + age * 5, 0, Math.PI * 2); c.fill(); c.stroke();
          }
        }
      },
      blood: {
        draw(c, obj, p, spd = 1.0) {
          if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
            c.save();
            tracePolygonPath(c, obj.points);
            const g = c.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
            g.addColorStop(0, 'rgba(136, 19, 55, 0.88)');
            g.addColorStop(0.7, 'rgba(159, 18, 57, 0.7)');
            g.addColorStop(1, 'rgba(76, 5, 25, 0.45)');
            c.fillStyle = g; c.fill();
            c.clip();
            const glintAlpha = 0.35 + Math.sin(p * 1.5) * 0.15 * spd;
            c.fillStyle = 'rgba(254, 205, 211, ' + glintAlpha + ')';
            c.beginPath(); c.ellipse(obj.x - obj.radius * 0.15, obj.y - obj.radius * 0.1, obj.radius * 0.2, obj.radius * 0.08, -0.4, 0, Math.PI * 2); c.fill();
            c.restore();
            c.save();
            tracePolygonPath(c, obj.points);
            c.strokeStyle = 'rgba(225, 29, 72, 0.6)'; c.lineWidth = 2; c.stroke();
            c.restore();
            return;
          }
          const g = c.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
          g.addColorStop(0, 'rgba(136, 19, 55, 0.85)');
          g.addColorStop(0.6, 'rgba(159, 18, 57, 0.65)');
          g.addColorStop(0.85, 'rgba(76, 5, 25, 0.4)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          c.fillStyle = g;
          c.beginPath(); c.ellipse(obj.x, obj.y, obj.radius, obj.radius * 0.75, -0.3, 0, Math.PI * 2); c.fill();
        }
      },
      lava: {
        draw(c, obj, p, spd = 1.0) {
          if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
            c.save();
            tracePolygonPath(c, obj.points);
            c.shadowColor = 'rgba(249, 115, 22, 0.85)';
            c.shadowBlur = 20 * (1 + Math.sin(p * 2.5 + obj.id) * 0.08 * spd);
            c.fillStyle = 'rgba(239, 68, 68, 0.3)';
            c.fill();
            c.restore();

            c.save();
            tracePolygonPath(c, obj.points);
            const g = c.createRadialGradient(obj.x, obj.y, obj.radius * 0.1, obj.x, obj.y, obj.radius);
            g.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
            g.addColorStop(0.35, 'rgba(249, 115, 22, 0.85)');
            g.addColorStop(0.75, 'rgba(185, 28, 28, 0.6)');
            g.addColorStop(1, 'rgba(69, 10, 10, 0.4)');
            c.fillStyle = g; c.fill();
            c.clip();
            for (let i = 0; i < 6; i++) {
              const ang = p * 0.15 + (i * Math.PI / 3);
              const dist = (obj.radius * 0.35) * (0.6 + Math.sin(p * 0.4 + i) * 0.3);
              c.fillStyle = 'rgba(28, 10, 5, 0.88)';
              c.beginPath(); c.arc(obj.x + Math.cos(ang) * dist, obj.y + Math.sin(ang) * dist, 9, 0, Math.PI * 2); c.fill();
            }
            c.restore();

            c.save();
            tracePolygonPath(c, obj.points);
            c.strokeStyle = 'rgba(254, 215, 170, 0.75)'; c.lineWidth = 2.5; c.stroke();
            c.restore();
            return;
          }
          const curR = obj.radius * (1 + Math.sin(p * 2.5 + obj.id) * 0.07 * spd);
          const g = c.createRadialGradient(obj.x, obj.y, curR * 0.15, obj.x, obj.y, curR);
          g.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
          g.addColorStop(0.25, 'rgba(249, 115, 22, 0.7)');
          g.addColorStop(0.6, 'rgba(185, 28, 28, 0.35)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          c.fillStyle = g;
          c.beginPath(); c.arc(obj.x, obj.y, curR, 0, Math.PI * 2); c.fill();
        }
      },
      portal: {
        draw(c, obj, p) {
          const curR = obj.radius;
          const g = c.createRadialGradient(obj.x, obj.y, curR * 0.1, obj.x, obj.y, curR);
          g.addColorStop(0, 'rgba(245, 243, 255, 0.95)');
          g.addColorStop(0.3, 'rgba(139, 92, 246, 0.6)');
          g.addColorStop(0.7, 'rgba(6, 182, 212, 0.2)');
          g.addColorStop(1, 'rgba(0, 0, 0, 0)');
          c.fillStyle = g;
          c.beginPath(); c.arc(obj.x, obj.y, curR, 0, Math.PI * 2); c.fill();

          c.save();
          c.translate(obj.x, obj.y);
          c.rotate(p * 1.8);
          for (let arm = 0; arm < 3; arm++) {
            c.rotate((Math.PI * 2) / 3);
            c.strokeStyle = arm % 2 === 0 ? 'rgba(192, 132, 252, 0.8)' : 'rgba(103, 232, 249, 0.8)';
            c.lineWidth = 3;
            c.beginPath();
            for (let th = 0; th < Math.PI * 2; th += 0.2) {
              const r = (th / (Math.PI * 2)) * (obj.radius * 0.65);
              const px = r * Math.cos(th);
              const py = r * Math.sin(th);
              if (th === 0) c.moveTo(px, py);
              else c.lineTo(px, py);
            }
            c.stroke();
          }
          c.restore();
        }
      },
      smoke: {
        draw(c, obj, p, spd = 1.0) {
          if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
            c.save();
            tracePolygonPath(c, obj.points);
            c.fillStyle = 'rgba(71, 85, 105, 0.25)'; c.fill();
            c.clip();
            for (let i = 0; i < 5; i++) {
              const ang = p * 0.25 + (i * Math.PI / 3);
              const cx = obj.x + Math.cos(ang) * (obj.radius * 0.35);
              const cy = obj.y + Math.sin(ang) * (obj.radius * 0.35);
              const pr = obj.radius * (0.55 + Math.sin(p * 0.8 + i) * 0.1 * spd);
              const g = c.createRadialGradient(cx, cy, 0, cx, cy, pr);
              g.addColorStop(0, 'rgba(148, 163, 184, 0.45)');
              g.addColorStop(0.6, 'rgba(71, 85, 105, 0.25)');
              g.addColorStop(1, 'rgba(0, 0, 0, 0)');
              c.fillStyle = g;
              c.beginPath(); c.arc(cx, cy, pr, 0, Math.PI * 2); c.fill();
            }
            c.restore();
            return;
          }
          c.save();
          for (let i = 0; i < 4; i++) {
            const ang = p * 0.25 + (i * Math.PI / 2);
            const cx = obj.x + Math.cos(ang) * (obj.radius * 0.28);
            const cy = obj.y + Math.sin(ang) * (obj.radius * 0.28);
            const pr = obj.radius * (0.65 + Math.sin(p * 0.8 + i) * 0.1 * spd);
            const g = c.createRadialGradient(cx, cy, 0, cx, cy, pr);
            g.addColorStop(0, 'rgba(100, 116, 139, 0.45)');
            g.addColorStop(0.6, 'rgba(71, 85, 105, 0.25)');
            g.addColorStop(1, 'rgba(0, 0, 0, 0)');
            c.fillStyle = g;
            c.beginPath(); c.arc(cx, cy, pr, 0, Math.PI * 2); c.fill();
          }
          c.restore();
        }
      },
      web: {
        draw(c, obj) {
          if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
            c.save();
            tracePolygonPath(c, obj.points);
            c.clip();
            c.strokeStyle = 'rgba(241, 245, 249, 0.55)';
            c.lineWidth = 1.2;
            const rays = 10;
            for (let i = 0; i < rays; i++) {
              const a = (i * Math.PI * 2) / rays;
              c.beginPath(); c.moveTo(obj.x, obj.y);
              c.lineTo(obj.x + Math.cos(a) * obj.radius, obj.y + Math.sin(a) * obj.radius);
              c.stroke();
            }
            c.restore();
            c.save();
            tracePolygonPath(c, obj.points);
            c.strokeStyle = 'rgba(241, 245, 249, 0.4)'; c.lineWidth = 1.5; c.stroke();
            c.restore();
            return;
          }
          c.save();
          c.strokeStyle = 'rgba(241, 245, 249, 0.55)';
          c.lineWidth = 1.2;
          const rays = 8;
          for (let i = 0; i < rays; i++) {
            const a = (i * Math.PI * 2) / rays;
            c.beginPath(); c.moveTo(obj.x, obj.y);
            c.lineTo(obj.x + Math.cos(a) * obj.radius, obj.y + Math.sin(a) * obj.radius);
            c.stroke();
          }
          for (let rIdx = 1; rIdx <= 4; rIdx++) {
            const r = (obj.radius / 4) * rIdx;
            c.beginPath();
            for (let i = 0; i <= rays; i++) {
              const a = (i * Math.PI * 2) / rays;
              const px = obj.x + Math.cos(a) * r;
              const py = obj.y + Math.sin(a) * r;
              if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
            }
            c.stroke();
          }
          c.restore();
        }
      }
    };

    // Сетка
    function drawGrid(c, w, h) {
      const g = DATA.grid;
      if (!g) return;
      c.save();
      c.strokeStyle = g.color || '#c9a84c';
      c.globalAlpha = (g.opacity || 80) / 100;
      c.lineWidth = Math.max(1, g.thickness || 2);

      const cellW = w / (g.cols || 10);
      const cellH = g.squareCells ? cellW : (h / (g.rows || 10));
      const offX = (g.offsetX || 0) % cellW;
      const offY = (g.offsetY || 0) % cellH;

      c.beginPath();
      for (let x = offX; x <= w; x += cellW) {
        if (x >= 0) { c.moveTo(x, 0); c.lineTo(x, h); }
      }
      for (let y = offY; y <= h; y += cellH) {
        if (y >= 0) { c.moveTo(0, y); c.lineTo(w, y); }
      }
      c.stroke();
      c.restore();
    }

    // Стирание и нанесение тумана
    function applyFogStamp(x, y, radius, feather, isReveal) {
      fogCtx.save();
      if (isReveal) {
        fogCtx.globalCompositeOperation = 'destination-out';
        const grad = fogCtx.createRadialGradient(x, y, Math.max(0, radius * (1 - feather)), x, y, radius);
        grad.addColorStop(0, 'rgba(0,0,0,1)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        fogCtx.fillStyle = grad;
      } else {
        fogCtx.globalCompositeOperation = 'source-over';
        const grad = fogCtx.createRadialGradient(x, y, Math.max(0, radius * (1 - feather)), x, y, radius);
        grad.addColorStop(0, 'rgba(11, 12, 20, 1)');
        grad.addColorStop(1, 'rgba(11, 12, 20, 0)');
        fogCtx.fillStyle = grad;
      }
      fogCtx.beginPath();
      fogCtx.arc(x, y, radius, 0, Math.PI * 2);
      fogCtx.fill();
      fogCtx.restore();
    }

    function applyFogPolygon(pts, feather, isReveal) {
      if (!fogCtx || !pts || pts.length < 3) return;
      fogCtx.save();
      if (isReveal) {
        fogCtx.globalCompositeOperation = 'destination-out';
        fogCtx.fillStyle = 'rgba(0, 0, 0, 1)';
      } else {
        fogCtx.globalCompositeOperation = 'source-over';
        fogCtx.fillStyle = 'rgba(11, 12, 20, 1)';
      }
      tracePolygonPath(fogCtx, pts);
      fogCtx.fill();
      if (feather > 0) {
        fogCtx.lineWidth = 14 * feather;
        fogCtx.strokeStyle = isReveal ? 'rgba(0, 0, 0, 0.6)' : 'rgba(11, 12, 20, 0.6)';
        fogCtx.stroke();
      }
      fogCtx.restore();
    }

    function applyFogLine(x0, y0, x1, y1, radius, feather, isReveal) {
      const dist = Math.hypot(x1 - x0, y1 - y0);
      const step = Math.max(4, radius * 0.25);
      const count = Math.ceil(dist / step);
      for (let i = 0; i <= count; i++) {
        const t = count === 0 ? 0 : i / count;
        applyFogStamp(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, radius, feather, isReveal);
      }
    }

    const LIGHT_TYPES = { torch: true, campfire: true, crystal: true, candles: true, lava: true, portal: true };
    function revealFogFromAllLights() {
      if (!DATA.objects) return;
      for (let obj of DATA.objects) {
        if (LIGHT_TYPES[obj.type] || obj.revealFog) {
          if (obj.shape === 'polygon' && obj.points && obj.points.length >= 3) {
            applyFogPolygon(obj.points, 0.45, true);
          } else {
            applyFogStamp(obj.x, obj.y, obj.radius, 0.45, true);
          }
        }
      }
    }

    // Вьюпорт
    function fitScreen() {
      const scale = Math.min(window.innerWidth / DATA.width, (window.innerHeight - 50) / DATA.height, 1.0);
      zoom = Math.max(0.1, scale);
      panX = 0; panY = 0;
      applyTransform();
    }

    function applyTransform() {
      wrapper.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + zoom + ')';
      document.getElementById('hudZoom').textContent = Math.round(zoom * 100) + '%';
    }

    function getCanvasCoords(e) {
      const rect = canvas.getBoundingClientRect();
      const sx = canvas.width / rect.width;
      const sy = canvas.height / rect.height;
      return { x: (e.clientX - rect.left) * sx, y: (e.clientY - rect.top) * sy };
    }

    // События холста
    canvas.addEventListener('mousedown', (e) => {
      if (spacePressed || e.button === 1) {
        isPanning = true;
        startPanX = e.clientX - panX;
        startPanY = e.clientY - panY;
        e.preventDefault();
        return;
      }
      if (e.button === 0) {
        isDrawing = true;
        const coords = getCanvasCoords(e);
        lastX = coords.x; lastY = coords.y;
        const isReveal = (brushMode === 'reveal') ^ e.shiftKey;
        applyFogStamp(coords.x, coords.y, brushSize, brushFeather, isReveal);
      }
    });

    window.addEventListener('mousemove', (e) => {
      if (isPanning) {
        panX = e.clientX - startPanX;
        panY = e.clientY - startPanY;
        applyTransform();
        return;
      }
      const coords = getCanvasCoords(e);
      mouseX = coords.x; mouseY = coords.y;
      if (isDrawing) {
        const isReveal = (brushMode === 'reveal') ^ e.shiftKey;
        applyFogLine(lastX, lastY, coords.x, coords.y, brushSize, brushFeather, isReveal);
        lastX = coords.x; lastY = coords.y;
      }
    });

    window.addEventListener('mouseup', () => {
      isPanning = false;
      isDrawing = false;
    });

    canvas.addEventListener('mouseenter', () => { isMouseOver = true; });
    canvas.addEventListener('mouseleave', () => { isMouseOver = false; });

    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      zoom = Math.min(4.0, Math.max(0.15, zoom * delta));
      applyTransform();
    }, { passive: false });

    // UI Кнопки
    const bReveal = document.getElementById('bReveal');
    const bHide = document.getElementById('bHide');
    const rInput = document.getElementById('rInput');
    const rVal = document.getElementById('rVal');
    const opInput = document.getElementById('opInput');
    const opVal = document.getElementById('opVal');
    const bPlayer = document.getElementById('bPlayer');
    const exitPlayerBtn = document.getElementById('exitPlayerBtn');

    bReveal.addEventListener('click', () => {
      brushMode = 'reveal';
      bReveal.classList.add('active');
      bHide.classList.remove('active');
    });

    bHide.addEventListener('click', () => {
      brushMode = 'hide';
      bHide.classList.add('active');
      bReveal.classList.remove('active');
    });

    rInput.addEventListener('input', (e) => {
      brushSize = parseInt(e.target.value, 10);
      rVal.textContent = brushSize;
    });

    opInput.addEventListener('input', (e) => {
      dmOpacity = parseInt(e.target.value, 10) / 100;
      opVal.textContent = e.target.value;
    });

    document.getElementById('bClear').addEventListener('click', () => {
      fogCtx.clearRect(0, 0, DATA.width, DATA.height);
    });

    document.getElementById('bCover').addEventListener('click', () => {
      fogCtx.globalCompositeOperation = 'source-over';
      fogCtx.fillStyle = '#0b0c14';
      fogCtx.fillRect(0, 0, DATA.width, DATA.height);
      if (DATA.lightsRevealFog !== false) {
        revealFogFromAllLights();
      }
    });

    const spdInput = document.getElementById('spdInput');
    const spdVal = document.getElementById('spdVal');
    if (spdInput) {
      spdInput.addEventListener('input', (e) => {
        animSpeed = parseInt(e.target.value, 10) / 100;
        if (spdVal) spdVal.textContent = e.target.value;
      });
    }

    function togglePlayerMode() {
      isPlayerMode = !isPlayerMode;
      document.body.classList.toggle('player-mode', isPlayerMode);
      exitPlayerBtn.style.display = isPlayerMode ? 'block' : 'none';
      fitScreen();
    }

    bPlayer.addEventListener('click', togglePlayerMode);
    exitPlayerBtn.addEventListener('click', togglePlayerMode);

    document.getElementById('zIn').addEventListener('click', () => { zoom = Math.min(4.0, zoom * 1.25); applyTransform(); });
    document.getElementById('zOut').addEventListener('click', () => { zoom = Math.max(0.15, zoom / 1.25); applyTransform(); });
    document.getElementById('zFit').addEventListener('click', fitScreen);

    // Горячие клавиши
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') { spacePressed = true; canvas.style.cursor = 'grab'; }
      if (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К') bReveal.click();
      if (e.key === 'h' || e.key === 'H' || e.key === 'р' || e.key === 'Р') bHide.click();
      if (e.key === 'p' || e.key === 'P' || e.key === 'з' || e.key === 'З') togglePlayerMode();
      if (e.key === 'Escape') { if (isPlayerMode) togglePlayerMode(); }
    });

    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') { spacePressed = false; canvas.style.cursor = 'crosshair'; }
    });

    window.addEventListener('resize', fitScreen);

    // Главный цикл отрисовки
    function render() {
      globalPhase += 0.035 * animSpeed;
      ctx.clearRect(0, 0, DATA.width, DATA.height);

      if (mapImg.complete && mapImg.naturalWidth > 0) {
        ctx.drawImage(mapImg, 0, 0);
      }

      if (DATA.objects && DATA.objects.length > 0) {
        for (let obj of DATA.objects) {
          const def = OBJECT_TYPES[obj.type];
          if (def && def.draw) {
            const objSpeed = (obj.animSpeed !== undefined ? obj.animSpeed : 1.0);
            if (obj.phase === undefined) obj.phase = Math.random() * 10;
            obj.phase += 0.035 * objSpeed;
            def.draw(ctx, obj, obj.phase, objSpeed);
          }
        }
      }

      drawGrid(ctx, DATA.width, DATA.height);

      // Туман
      ctx.save();
      ctx.globalAlpha = isPlayerMode ? 1.0 : dmOpacity;
      ctx.drawImage(fogCanvas, 0, 0);
      ctx.restore();

      // Статичные DM-токены объектов (видны только в режиме Мастера)
      if (!isPlayerMode && DATA.objects && DATA.objects.length > 0) {
        for (let obj of DATA.objects) {
          drawTokenBadge(ctx, obj, false);
        }
      }

      // UI индикаторы для DM
      if (!isPlayerMode && isMouseOver && mouseX !== null) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, brushSize, 0, Math.PI * 2);
        ctx.strokeStyle = brushMode === 'reveal' ? 'rgba(245, 200, 66, 0.85)' : 'rgba(255, 100, 100, 0.85)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();
      }

      requestAnimationFrame(render);
    }

    fitScreen();
    requestAnimationFrame(render);
  })();
  <\/script>
</body>
</html>`;
  }

  function resetAll() {
    if (!confirm('Сбросить все параметры, карту и туман войны к начальному состоянию?')) return;
    location.reload();
  }

  // ==============================================================
  // 13. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  // ==============================================================
  function hexToRgba(hex, alpha) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function colToLetter(index) {
    let result = '';
    let n = index;
    while (n >= 0) {
      result = String.fromCharCode(65 + (n % 26)) + result;
      n = Math.floor(n / 26) - 1;
    }
    return result;
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
