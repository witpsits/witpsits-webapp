import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { supabase } from '../lib/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(null);

  const isAdminPath = location.pathname.startsWith('/admin');

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user || !isAdminPath) {
        setIsAuthorized(true);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('authorized_admins')
          .select('email')
          .eq('email', user.email)
          .single();

        if (error || !data) {
          console.warn("Unauthorized access attempt blocked.");
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (err) {
        setIsAuthorized(false);
      }
    };

    checkAdminStatus();
  }, [user, isAdminPath]);

  if (!user) {
    const loginPath = isAdminPath ? "/" : "/login";
    return <Navigate to={loginPath} replace />;
  }

  // Waiting for database verification
  if (isAdminPath && isAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#0E1528] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#5671FF] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isAdminPath && isAuthorized === false) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
