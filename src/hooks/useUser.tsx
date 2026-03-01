   import { useEffect, useState } from 'react';
   import { supabase } from "@/integrations/supabase/client";

   const useUser = () => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchUser = async () => {
         try {
           const { data: session, error } = await supabase.auth.getSession();
           if (error) throw error;
           if (!session?.user) return setUser(null);

           const { data: userData, error: userError } = await supabase
             .from('profiles')
             .select('*')
             .eq('id', session.user.id)
             .single();

           if (userError) throw userError;

           setUser(userData);
         } catch (error) {
           console.error('Error fetching user data:', error);
         } finally {
           setLoading(false);
         }
       };

       fetchUser();
     }, []);

     return { user, loading };
   };

   export default useUser;
   ```