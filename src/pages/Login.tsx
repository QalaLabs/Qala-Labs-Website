"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Auth
        supabaseClient={supabase}
        providers={['google', 'github']}
        appearance={{
          theme: ThemeSupa,
        }}
        theme="light"
      />
    </div>
  );
};

export default Login;