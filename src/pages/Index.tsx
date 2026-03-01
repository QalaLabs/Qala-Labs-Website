"use client";

import React from 'react';
import { useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import Login from '../pages/Login';

const Index = () => {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        // Redirect to login page
        window.location.href = '/login';
      }
    });

    return () => authListener?.unsubscribe();
  }, []);

  return (
    <div className="p-4">
      {/* ... keep existing code (rest of the component) */}
    </div>
  );
};

export default Index;