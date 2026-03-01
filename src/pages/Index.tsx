"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Flying Kraken Wag</h1>
      <p className="text-lg text-gray-600 mb-6">This is the home page.</p>
      <Button onClick={() => console.log('Primary clicked')}>Get Started</Button>
      <Link href="/about">Learn More</Link>
    </div>
  );
};

export default Home;