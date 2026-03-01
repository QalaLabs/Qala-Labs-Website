                                                                                                                                   import React from 'react';
                                                                                                                                   import { useUser } from '../hooks/useUser';

                                                                                                                                   const Header = () => {
                                                                                                                                     const { user, loading } = useUser();

                                                                                                                                     if (loading) return <div>Loading...</div>;

                                                                                                                                     return (
                                                                                                                                       <nav className="bg-gray-800 p-4">
                                                                                                                                         <div className="container mx-auto flex justify-between items-center">
                                                                                                                                           <h1 className="text-white text-lg">My App</h1>
                                                                                                                                           {user ? (
                                                                                                                                                       <a href="/dashboard" className="text-white hover:text-blue-500">Dashboard</a>
                                                                                                                                           ) : (
                                                                                                                                                       <a href="/login" className="text-white hover:text-blue-500">Login</a>
                                                                                                                                           )}
                                                                                                                                         </div>
                                                                                                                                       </nav>
                                                                                                                                     );
                                                                                                                                   };

                                                                                                                                   export default Header;
                                                                                                                                   ```