'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export function InteractiveLogo() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / rect.height) * 15;
    const rotateY = (mouseX / rect.width) * -15;

    setRotation({ x: rotateX, y: rotateY });
    setScale(1.05);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setScale(1);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const touchX = e.touches[0].clientX - centerX;
    const touchY = e.touches[0].clientY - centerY;

    const rotateX = (touchY / rect.height) * 15;
    const rotateY = (touchX / rect.width) * -15;

    setRotation({ x: rotateX, y: rotateY });
    setScale(1.05);
  };

  const handleTouchEnd = () => {
    setRotation({ x: 0, y: 0 });
    setScale(1);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 perspective cursor-pointer"
      style={{
        perspective: '1000px',
      }}
    >
      <div
        className="w-full h-full relative transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-3xl blur-2xl animate-pulse"></div>
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/steamgoat-logo-1a.png"
            alt="SteamGOAT Logo"
            width={320}
            height={320}
            className="w-full h-full object-contain drop-shadow-2xl filter brightness-110 hover:brightness-125 transition-all duration-300"
            priority
          />
        </div>
      </div>
    </div>
  );
}
