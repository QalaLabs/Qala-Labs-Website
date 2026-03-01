"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from "@/components/ui/link";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background py-2">
      <h1 className="text-4xl font-bold">Welcome to My Application</h1>
      <p className="mt-6 text-lg">Explore our case studies and learn more about our projects.</p>

      <div className="mt-8">
        <Button asChild>
          <Link href="/case-study">View Case Study</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;