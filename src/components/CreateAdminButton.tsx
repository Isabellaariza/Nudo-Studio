import { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/api';
import { toast } from 'sonner';

/**
 * Componente para crear el registro del admin en la tabla users
 */
export function CreateAdminButton() {
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const createAdminUser = async () => {
    setIsCreating(true);
    setResult(null);

    try {
      // Paso 1: Login como admin
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: 'admin@demo.com',
        password: 'admin123'
      });

      if (loginError) {
        setResult({ 
          success: false, 
          message: 'Error al hacer login',
          error: loginError.message 
        });
        toast.error('Error: El usuario admin no existe en Auth');
        setIsCreating(false);
        return;
      }

      const userId = loginData.user?.id;
      if (!userId) {
        setResult({ 
          success: false, 
          message: 'No se pudo obtener el ID del usuario' 
        });
        toast.error('Error al obtener ID del usuario');
        setIsCreating(false);
        return;
      }

      // Paso 2: Verificar si ya existe en la tabla users
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (existingUser) {
        setResult({
          success: true,
          message: 'El usuario admin ya existe en la tabla users',
          data: existingUser
        });
        toast.success('El usuario admin ya existe');
        setIsCreating(false);
        return;
      }

      // Paso 3: Crear el registro en la tabla users
      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert({
          id: userId,
          email: 'admin@demo.com',
          name: 'Administrador',
          role: 'admin',
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (insertError) {
        // Si el error es por permisos, intentar con RPC
        if (insertError.message.includes('permission') || insertError.message.includes('policy')) {
          setResult({
            success: false,
            message: 'Error de permisos. Necesitas crear una función RPC en Supabase',
            error: insertError.message,
            solution: 'Debes ejecutar SQL en Supabase para crear el usuario admin'
          });
          toast.error('Error de permisos. Necesitas ejecutar SQL manual');
        } else {
          setResult({
            success: false,
            message: 'Error al crear el usuario',
            error: insertError.message
          });
          toast.error('Error al crear el usuario admin');
        }
        setIsCreating(false);
        return;
      }

      setResult({
        success: true,
        message: '¡Usuario admin creado exitosamente!',
        data: newUser
      });
      toast.success('¡Usuario admin creado! Ahora puedes hacer login');

      // Cerrar sesión para que pueda volver a hacer login
      await supabase.auth.signOut();

    } catch (error: any) {
      setResult({
        success: false,
        message: 'Error inesperado',
        error: error.message || error.toString()
      });
      toast.error('Error inesperado');
    }

    setIsCreating(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.div
        className="p-4 rounded-2xl shadow-2xl max-w-md"
        style={{ backgroundColor: 'white', border: '2px solid #2D4B39' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="font-semibold mb-3" style={{ color: '#2D4B39' }}>
          🔧 Crear Usuario Admin
        </h3>

        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: '#F3F4F6' }}>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            <strong>Email:</strong> admin@demo.com<br />
            <strong>Password:</strong> admin123<br />
            <strong>Rol:</strong> admin
          </p>
        </div>

        <button
          onClick={createAdminUser}
          disabled={isCreating}
          className="w-full px-4 py-3 rounded-lg mb-3 transition-all"
          style={{ 
            backgroundColor: isCreating ? '#9CA3AF' : '#2D4B39', 
            color: 'white' 
          }}
        >
          {isCreating ? 'Creando...' : 'Crear Usuario Admin'}
        </button>

        {result && (
          <motion.div
            className="p-3 rounded-lg text-sm"
            style={{
              backgroundColor: result.success ? '#D1FAE5' : '#FEE2E2',
              border: `1px solid ${result.success ? '#10B981' : '#EF4444'}`
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">
                {result.success ? '✅' : '❌'}
              </span>
              <div className="flex-1">
                <p className="font-semibold mb-1" style={{ color: result.success ? '#065F46' : '#991B1B' }}>
                  {result.message}
                </p>
                {result.error && (
                  <p className="text-xs mt-1" style={{ color: '#DC2626' }}>
                    Error: {result.error}
                  </p>
                )}
                {result.solution && (
                  <p className="text-xs mt-2 p-2 rounded" style={{ backgroundColor: '#FEF3C7' }}>
                    💡 {result.solution}
                  </p>
                )}
                {result.data && (
                  <pre className="text-xs mt-2 overflow-auto p-2 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
