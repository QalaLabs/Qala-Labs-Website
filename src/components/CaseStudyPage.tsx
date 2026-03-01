"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

const CaseStudyPage = () => {
  return (
    <Card className="max-w-2xl mx-auto p-4">
      <CardHeader>
        <CardTitle>Case Study: Example Project</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-4">Overview:</p>
        <p>This is a detailed description of the case study. It includes the project's objectives, challenges faced, and solutions implemented.</p>

        <p className="text-lg mt-6">Objectives:</p>
        <ul className="list-disc pl-5">
          <li>To improve website performance by 30%</li>
          <li>To increase user engagement by 20%</li>
        </ul>

        <p className="text-lg mt-6">Challenges:</p>
        <ul className="list-disc pl-5">
          <li>Complex database schema</li>
          <li>High traffic during peak hours</li>
        </ul>

        <p className="text-lg mt-6">Solutions:</p>
        <ul className="list-disc pl-5">
          <li>Optimized database queries</li>
          <li>Implemented caching mechanisms</li>
        </ul>

        <div className="mt-8">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStudyPage;