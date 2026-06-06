import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;     // 3D coordinate x
  y: number;     // 3D coordinate y
  z: number;     // 3D coordinate z
  ox: number;    // Original coordinate x
  oy: number;    // Original coordinate y
  oz: number;    // Original coordinate z
  vx: number;    // Velocity X
  vy: number;    // Velocity Y
  vz: number;    // Velocity Z
  size: number;  // Base particle size
  alpha: number; // Base alpha opacity
  color: string; // Dynamic chromatic shade
}

export default function Interactive3DSpace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize handling using ResizeObserver
    let width = canvas.width;
    let height = canvas.height;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      width = canvas.width;
      height = canvas.height;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    resize();

    // Constant parameters
    const PARTICLE_COUNT = 180;
    const FOCAL_LENGTH = 380; // Perspective zoom intensity
    const DEPTH_LIMIT = 450;  // Z clipping limit
    const particles: Particle[] = [];

    // Initialize 3D particles across a spherical luxury galaxy cluster
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 100 + Math.random() * 280;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Create rich chromatic variety mirroring the Aura design
      const colors = ['rgba(0, 191, 165, ', 'rgba(38, 166, 154, ', 'rgba(224, 242, 241, '];
      const colorPick = colors[Math.floor(Math.random() * colors.length)];

      particles.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        size: 1.2 + Math.random() * 2.5,
        alpha: 0.15 + Math.random() * 0.65,
        color: colorPick,
      });
    }

    // Keep track of cursor coordinates to trigger beautiful orbital gravitational fields
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      
      mouseRef.current.targetX = clientX - rect.width / 2;
      mouseRef.current.targetY = clientY - rect.height / 2;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Frame Euler angles for rotating the space relative to cursor
    let rotX = 0;
    let rotY = 0;
    let autoRotRate = 0.0012; // Base drift speed

    // Animation Loop
    const render = () => {
      // Clear with very subtle persistence trail
      ctx.clearRect(0, 0, width, height);

      const parentWidth = canvas.parentElement?.clientWidth || width;
      const parentHeight = canvas.parentElement?.clientHeight || height;

      // Softly interpolate mouse trajectory for buttery smooth float
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Map current offset coordinates to 3D rotational values
      const targetRotY = mouseRef.current.active ? (mouseRef.current.x / parentWidth) * 0.5 : 0;
      const targetRotX = mouseRef.current.active ? -(mouseRef.current.y / parentHeight) * 0.5 : 0;

      rotY += (targetRotY - rotY) * 0.05 + autoRotRate;
      rotX += (targetRotX - rotX) * 0.05;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Pre-calculate visual depth values to perform proper 3D sorting (painter's algorithm)
      const projected = particles.map(p => {
        // Apply passive physical speed drifting
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Apply a spring force back to original local orbit if drifts too far
        const distToOrigin = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z);
        if (distToOrigin > 420) {
          p.vx -= p.x * 0.0003;
          p.vy -= p.y * 0.0003;
          p.vz -= p.z * 0.0003;
        }

        // 3D Rotations around Y Axis
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // 3D Rotations around X Axis
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Interactive cursor attraction
        let finalX = x1;
        let finalY = y2;
        let finalZ = z2;

        if (mouseRef.current.active) {
          const m3dX = mouseRef.current.x;
          const m3dY = mouseRef.current.y;

          // Calculate interactive vector distance to projected coordinates on front plane
          const scale = FOCAL_LENGTH / (z2 + FOCAL_LENGTH);
          const screenX = x1 * scale;
          const screenY = y2 * scale;

          const dx = m3dX - screenX;
          const dy = m3dY - screenY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Apply gorgeous spatial gravity warp
          if (distance < 145) {
            const pull = (145 - distance) * 0.085;
            finalX += (dx / distance) * pull;
            finalY += (dy / distance) * pull;
            finalZ -= pull * 0.35; // Warp along z axis toward the viewer
          }
        }

        // Projection mapping based on final coordinates
        const zProjection = finalZ + FOCAL_LENGTH;
        let screenX = 0;
        let screenY = 0;
        let visible = false;

        if (zProjection > 30 && zProjection < DEPTH_LIMIT + FOCAL_LENGTH) {
          const scale = FOCAL_LENGTH / zProjection;
          screenX = parentWidth / 2 + finalX * scale;
          screenY = parentHeight / 2 + finalY * scale;
          visible = (screenX >= 0 && screenX <= parentWidth && screenY >= 0 && screenY <= parentHeight);
        }

        return {
          sx: screenX,
          sy: screenY,
          sz: finalZ,
          size: p.size * (FOCAL_LENGTH / zProjection),
          color: p.color,
          alpha: p.alpha * (1 - (finalZ / DEPTH_LIMIT)), // Cinematic fade to black on back-plane
          visible
        };
      });

      // Painter's algorithm sorting by depth (furthest elements first)
      projected.sort((a, b) => b.sz - a.sz);

      // Render deep sorted visual embers
      projected.forEach(p => {
        if (!p.visible || p.alpha <= 0) return;

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(0.4, p.size), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.01, Math.min(0.99, p.alpha))})`;
        ctx.shadowBlur = p.size > 2 ? 8 : 0;
        ctx.shadowColor = '#00BFA5';
        ctx.fill();
      });

      // Ambient geometric link network lines for closer particles to feel structured
      ctx.shadowBlur = 0; // reset glow for performance
      for (let i = 0; i < projected.length; i += 6) {
        const p1 = projected[i];
        if (!p1.visible || p1.sz > 80) continue;

        for (let j = i + 1; j < Math.min(projected.length, i + 4); j++) {
          const p2 = projected[j];
          if (!p2.visible || p2.sz > 80) continue;

          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            // Dynamic subtle alpha matching distance
            const lineAlpha = (1 - (dist / 85)) * 0.08 * (1 - (p1.sz / DEPTH_LIMIT));
            ctx.strokeStyle = `rgba(0, 191, 165, ${lineAlpha})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-1 bg-transparent"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
