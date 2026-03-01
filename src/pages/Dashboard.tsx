                                                                                                                                import React from 'react';
                                                                                                                                import { useUser } from '../hooks/useUser';
                                                                                                                                import Hero from '../components/Hero';

                                                                                                                                const Dashboard = () => {
                                                                                                                                  const { user, loading } = useUser();

                                                                                                                                  if (loading) return <div>Loading...</div>;

                                                                                                                                  if (!user) return <div>Please log in to view your dashboard.</div>;

                                                                                                                                  return (
                                                                                                                                    <div className="container mx-auto p-4">
                                                                                                                                      <Hero />
                                                                                                                                      <div className="bg-white shadow rounded-lg p-6">
                                                                                                                                        <h3 className="font-medium text-lg">{user.first_name} {user.last_name}</h3>
                                                                                                                                        <p className="text-gray-500">{user.email}</p>
                                                                                                                                      </div>
                                                                                                                                    </div>
                                                                                                                                  );
                                                                                                                                };

                                                                                                                                export default Dashboard;
                                                                                                                                ```