"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Logo from '@/components/layout/Logo';
import { UserRole } from '@/types/platform';

const ROLE_REDIRECT: Record<UserRole, string> = {
  admin: '/admin',
  employee: '/employee',
  client: '/client',
};

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      const role = (profile?.role as UserRole) ?? 'client';
      navigate(ROLE_REDIRECT[role]);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="flex flex-col items-center space-y-4 pt-8">
          <Logo className="scale-125 mb-2" />
          <div className="text-center">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest">Qala Labs Portal</h2>
            <p className="text-slate-500 text-xs mt-1">Sign in to access your workspace</p>
          </div>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                  }
                }
              }
            }}
            theme="light"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;