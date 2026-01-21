"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "../components/SplashScreen";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  const handleSplashComplete = () => {
    setShowSplash(false);
    // Redirect to dashboard after splash
    setTimeout(() => {
      router.push('/dashboard');
    }, 100);
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#00D2BE] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-500">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
    </>
  );
}