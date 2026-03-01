import React from 'react';
import { Link } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Logo from './layout/Logo';

const Header = () => {
  const { user, loading } = useUser();

  return (
    <nav className="bg-white border-b border-slate-100 p-4 sticky top-0 z-50 backdrop-blur-md bg-white/80">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <Logo className="scale-75 origin-left" />
        </Link>
        
        <div className="flex items-center gap-6">
          {!loading && (
            <>
              {user ? (
                <Link 
                  to="/dashboard" 
                  className="text-slate-600 font-bold hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;