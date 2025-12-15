import { useEffect } from 'react';
import { supabase } from '../lib/api';

export function AdminInitializer() {
  useEffect(() => {
    createAdminUser();
  }, []);

  const createAdminUser = async () => {
    try {
      // Intentar crear el usuario admin
      const { data, error } = await supabase.auth.signUp({
        email: 'admin@demo.com',
        password: 'admin123',
        options: {
          data: {
            name: 'Administrador',
            role: 'admin'
          }
        }
      });
      
      if (!error) {
        console.log('Usuario administrador creado');
      }
    } catch (error: any) {
      console.log('Admin ya existe o error:', error.message);
    }
  };

  return null;
}