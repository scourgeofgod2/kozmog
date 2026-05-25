"use client";

import { useEffect, useState, useRef } from "react";
import { useSunTheme } from "@/components/providers/SunThemeProvider";

function getSunXY(positionPercent: number, width: number, height: number) {
  const t = positionPercent / 100;
  const angle = Math.PI + t * Math.PI;
  const cx = width / 2;
  const cy = height;
  const rx = width * 0.46;
  const ry = height * 0.92;
  const x = cx + rx * Math.cos(angle);
  const y = cy + ry * Math.sin(angle);
  return { x, y };
}

export default function SunArc() {
  const { theme } = useSunTheme();
  const [mounted, setMounted] = useState(false);
  const [dims, setDims] = useState({ width: 1200, height: 120 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDims({
          width: entry.contentRect.width,
          height: 120,
        });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [mounted]);

  if (!mounted) {
    return <div style={{ height: 120 }} />;
  }

  const { width, height } = dims;
  const sun = getSunXY(theme.sunPosition, width, height);

  const arcPath = `M ${width * 0.02} ${height} A ${width * 0.46} ${height * 0.92} 0 0 1 ${width * 0.98} ${height}`;

  const isNight = theme.slot === "night";
  const sunSize = isNight ? 6 : 14;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: 120,
        overflow: "hidden",
        pointerEvents: "none",
        marginTop: -1,
      }}
    >
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        <defs>
          <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={isNight ? 0.9 : 1} />
            <stop offset="35%" stopColor={theme.sunColor} stopOpacity={1} />
            <stop offset="100%" stopColor={theme.sunColor} stopOpacity={0} />
          </radialGradient>

          <radialGradient
            id="horizonGrad"
            cx="50%"
            cy="100%"
            r="60%"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1={height}
            x2={width}
            y2={height}
          >
            <stop offset="0%" stopColor={theme.horizonColor} stopOpacity={1} />
            <stop offset="100%" stopColor={theme.horizonColor} stopOpacity={0} />
          </radialGradient>

          <filter id="sunBlur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation={isNight ? 3 : 6} />
          </filter>

          <filter id="sunCoreBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={isNight ? 1 : 2} />
          </filter>

          <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={theme.gold} stopOpacity={0} />
            <stop offset="30%" stopColor={theme.gold} stopOpacity={0.5} />
            <stop offset="50%" stopColor={theme.gold} stopOpacity={0.8} />
            <stop offset="70%" stopColor={theme.gold} stopOpacity={0.5} />
            <stop offset="100%" stopColor={theme.gold} stopOpacity={0} />
          </linearGradient>
        </defs>

        <path
          d={arcPath}
          fill="none"
          stroke="url(#arcGrad)"
          strokeWidth={1}
          opacity={0.5}
        />

        {!isNight && (
          <circle
            cx={sun.x}
            cy={sun.y}
            r={sunSize * 3.5}
            fill={theme.sunColor}
            opacity={0.12}
            filter="url(#sunBlur)"
          />
        )}

        <circle
          cx={sun.x}
          cy={sun.y}
          r={sunSize * 2}
          fill={theme.sunColor}
          opacity={isNight ? 0.15 : 0.25}
          filter="url(#sunBlur)"
        />

        <circle
          cx={sun.x}
          cy={sun.y}
          r={sunSize}
          fill={`url(#sunGradient)`}
          opacity={isNight ? 0.85 : 1}
        />

        {!isNight && (
          <circle
            cx={sun.x}
            cy={sun.y}
            r={sunSize * 0.4}
            fill="#ffffff"
            opacity={0.9}
            filter="url(#sunCoreBlur)"
          />
        )}

        {isNight &&
          Array.from({ length: 18 }).map((_, i) => {
            const starX = (width * ((i * 73 + 37) % 100)) / 100;
            const starY = (height * 0.75 * ((i * 47 + 13) % 100)) / 100;
            const size = ((i * 31 + 7) % 3) + 1;
            return (
              <circle
                key={i}
                cx={starX}
                cy={starY}
                r={size * 0.6}
                fill={theme.star}
                opacity={0.4 + ((i * 17) % 40) / 100}
              />
            );
          })}
      </svg>

      
    </div>
  );
}