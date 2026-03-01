"use client";

import React from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/hooks/useUser";

const Dashboard = () => {
  const user = useUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p>Welcome, {user.email}!</p>
    </div>
  );
};

export default Dashboard;