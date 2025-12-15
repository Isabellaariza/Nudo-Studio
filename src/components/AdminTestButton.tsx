import { useState } from 'react';
import { supabase } from '../lib/api';
import { toast } from 'sonner';

interface AdminTestButtonProps {
  onLoginSuccess: () => void;
}

export function AdminTestButton({ onLoginSuccess }: AdminTestButtonProps) {
  const [loading, setLoading] = useState(false);

  const testAdminLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@demo.com',
        password: 'admin123'
      });
      
      if (error) throw error;
      
      toast.success('Login de administrador exitoso');
      onLoginSuccess();
    } catch (error: any) {
      toast.error('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={testAdminLogin}
      disabled={loading}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
    >
      {loading ? 'Probando...' : 'Probar Login Admin'}
    </button>
  );
}