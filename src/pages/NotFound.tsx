"use client";

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Ghost } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Path not found:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-24 h-24 bg-zinc-900 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-zinc-800 shadow-2xl">
          <Ghost className="w-12 h-12 text-indigo-500" />
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter text-zinc-50">404.</h1>
        <p className="text-xl text-zinc-400 mb-12 max-w-md mx-auto leading-relaxed">
          The page you're looking for has been moved or doesn't exist in our scale engine.
        </p>
        <Link to="/">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-8 rounded-2xl text-lg font-black shadow-2xl shadow-indigo-500/20 group">
            <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Return to HQ
          </Button>
        </Link>
      </motion.div>

      {/* Decorative */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px]" />
      </div>
    </div>
  );
};

export default NotFound;