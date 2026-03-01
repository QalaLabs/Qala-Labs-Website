                                                                                                                                  import React from 'react';
                                                                                                                                  import { Auth } from '@supabase/auth-ui-react';
                                                                                                                                  import { ThemeSupa } from '@supabase/auth-ui-shared';
                                                                                                                                  import Hero from '../components/Hero';

                                                                                                                                  function Login() {
                                                                                                                                    return (
                                                                                                                                      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                                                                                                                                        <Hero />
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
                                                                                                                                  }

                                                                                                                                  export default Login;
                                                                                                                                  ```