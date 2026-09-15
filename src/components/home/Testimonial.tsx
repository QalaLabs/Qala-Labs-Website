"use client";

import React from 'react';
import QuickMetrics, { QuickMetricsProps } from './QuickMetrics';

export type TestimonialProps = QuickMetricsProps;

/**
 * Testimonial (Merged Proof Section)
 * Merged with QuickMetrics into a high-impact two-column proof layout:
 * - Large quote card featuring verified client story (Akaash Maskeen, Founder & CEO, Gaffar India)
 * - Stacked pair of stat cards featuring verified aggregate metrics (₹3Cr+ revenue, 5X ROAS, 5M+ reach, 20+ automations)
 * - Full light & dark theme support
 */
const Testimonial: React.FC<TestimonialProps> = (props) => {
  return <QuickMetrics {...props} />;
};

export default Testimonial;
export { QuickMetrics as ProofSection };