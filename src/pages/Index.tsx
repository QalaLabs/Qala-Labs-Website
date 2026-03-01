                                                                                                                                 import React from 'react';
                                                                                                                                 import { useUser } from '../hooks/useUser';
                                                                                                                                 import Hero from '../components/Hero';

                                                                                                                                 const Index = () => {
                                                                                                                                   const { user, loading } = useUser();

                                                                                                                                   if (loading) return <div>Loading...</div>;

                                                                                                                                   if (!user) return <div><a href="/login">Please log in</a> to view your dashboard.</div>;

                                                                                                                                   return (
                                                                                                                                     <div className="container mx-auto p-4">
                                                                                                                                       <Hero />
                                                                                                                                       <p>Your data will be displayed here.</p>
                                                                                                                                     </div>
                                                                                                                                   );
                                                                                                                                 };

                                                                                                                                 export default Index;
                                                                                                                                 ```