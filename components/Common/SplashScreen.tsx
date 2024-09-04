"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import anime from "animejs";

export default function SplashScreen({ finishLoading }) {
  const [mounted, setMounted] = useState(false);

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader.add({
      targets: "#logo",
      delay: 0,
      duration: 500,
      easing: "easeInOutExpo",
      scale: 1,
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 10);
    animate();

    return () => clearTimeout(timeout);
  });

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image
        id="logo"
        width={500}
        height={500}
        alt="logo"
        className="w-56 h-56 animate-pulse"
        src={"/assets/logo.png"}
      />
    </div>
  );
}
