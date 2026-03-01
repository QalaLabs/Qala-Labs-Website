"use client";

import { useEffect, useState } from 'react';
import { supabase } from "@/integrations/supabase/client";

const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error(error);
        } else {
          setUser(data);
        }
      }
    };

    getUser();
  }, []);

  return user;
};

export default useUser;