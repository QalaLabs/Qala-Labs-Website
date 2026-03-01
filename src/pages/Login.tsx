import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from "@/integrations/supabase/client";
import Hero from '../components/Hero';

function Login() {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Hero />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mt-8">
          <Auth
            supabaseClient={supabase}
            providers={['google', 'github']}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                  },
                },
              },
            }}
            theme="light"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;