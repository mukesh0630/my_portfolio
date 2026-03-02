import React, { useRef, useEffect, useState } from 'react';

export default function Particles() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouse = useRef({ x: null, y: null });
  const parallax = useRef({ x: 0, y: 0 });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq ? mq.matches : false);
    const onChange = () => setPrefersReduced(mq.matches);
    if (mq && mq.addEventListener) mq.addEventListener('change', onChange);
    return () => { if (mq && mq.removeEventListener) mq.removeEventListener('change', onChange); };
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    let particles = [];
    let w = 0, h = 0;
    let particleCount = 0;
    let rafId;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // subtle density tuned for portfolios (slightly increased)
      particleCount = Math.max(30, Math.floor((w * h) / 100000));
      initParticles();
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: 0.8 + Math.random() * 1.6,
          hue: 170 + Math.random() * 20, // soft teal range (170-190)
        });
      }
    }

    function updateParallax(targetX, targetY) {
      // smooth parallax follow (eases toward mouse)
      parallax.current.x += (targetX - parallax.current.x) * 0.06;
      parallax.current.y += (targetY - parallax.current.y) * 0.06;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // draw connections
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = (p.x - q.x) + (parallax.current.x * 0.02);
          const dy = (p.y - q.y) + (parallax.current.y * 0.02);
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            const alpha = 0.14 * (1 - d / 120);
            const hue = (p.hue + q.hue) / 2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `hsla(${hue},60%,50%,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // draw particles (soft bokeh)
      for (const p of particles) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x - parallax.current.x * 0.02, p.y - parallax.current.y * 0.02, 0, p.x, p.y, p.r * 8);
        const color = `hsla(${p.hue}, 60%, 50%, 0.09)`;
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.9, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(p.x - p.r * 8, p.y - p.r * 8, p.r * 16, p.r * 16);

        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 65%, 48%, 0.95)`;
        ctx.arc(p.x - parallax.current.x * 0.02, p.y - parallax.current.y * 0.02, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function update() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // slow drift
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;

        // keep on-screen
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }
    }

    function loop() {
      update();
      draw();
      rafId = requestAnimationFrame(loop);
      animRef.current = rafId;
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0] && e.touches[0].clientX) ?? window.innerWidth / 2;
      const clientY = e.clientY ?? (e.touches && e.touches[0] && e.touches[0].clientY) ?? window.innerHeight / 2;
      const tx = (clientX - rect.left) - w / 2;
      const ty = (clientY - rect.top) - h / 2;
      updateParallax(tx * 0.08, ty * 0.08);
      mouse.current.x = clientX; mouse.current.y = clientY;
    }

    function onLeave() {
      // gracefully return parallax to center
      mouse.current.x = null; mouse.current.y = null;
      updateParallax(0, 0);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
