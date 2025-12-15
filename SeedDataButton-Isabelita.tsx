import { useState } from 'react';
import { productsAPI, workshopsAPI, newsAPI, auth } from '../lib/api';
import { seedProducts, seedWorkshops, seedNews, seedUsers } from '../lib/seed-data';
import { toast } from 'sonner';
import { Database } from 'lucide-react';

export function SeedDataButton() {
  const [loading, setLoading] = useState(false);

  const handleSeedData = async () => {
    if (!confirm('¿Deseas inicializar la base de datos con datos de demostración? Esto creará productos, talleres y novedades de ejemplo.')) {
      return;
    }

    setLoading(true);

    try {
      // Create demo users
      toast.info('Creando usuarios de demostración...');
      for (const userData of seedUsers) {
        try {
          await auth.signUp(userData.email, userData.password, userData.name, userData.role);
          console.log(`User created: ${userData.email}`);
        } catch (error: any) {
          console.log('User might already exist:', userData.email, error.message);
        }
      }

      // Wait for Supabase Auth to fully process the users
      toast.info('Esperando confirmación del sistema...');
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Login as admin to create content with retry logic
      toast.info('Iniciando sesión como administrador...');
      let session;
      let loginAttempts = 0;
      const maxAttempts = 5;
      
      while (loginAttempts < maxAttempts) {
        try {
          const result = await auth.signIn('admin@demo.com', 'admin123');
          session = result.session;
          console.log('Login successful!');
          break;
        } catch (loginError: any) {
          loginAttempts++;
          console.log(`Login attempt ${loginAttempts} failed:`, loginError.message);
          
          if (loginAttempts < maxAttempts) {
            toast.info(`Reintentando login (${loginAttempts}/${maxAttempts})...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            console.error('All login attempts failed:', loginError);
            toast.error('Las cuentas fueron creadas pero el login automático falló. Por favor, inicia sesión manualmente con: admin@demo.com / admin123');
            setLoading(false);
            return;
          }
        }
      }

      if (!session) {
        toast.error('No se pudo obtener la sesión. Intenta hacer login manualmente.');
        setLoading(false);
        return;
      }
      
      const accessToken = session.access_token;

      // Create products
      toast.info('Creando productos de ejemplo...');
      for (const product of seedProducts) {
        try {
          await productsAPI.create(product, accessToken);
        } catch (error) {
          console.error('Error creating product:', error);
        }
      }

      // Create workshops
      toast.info('Creando talleres...');
      for (const workshop of seedWorkshops) {
        try {
          await workshopsAPI.create(workshop, accessToken);
        } catch (error) {
          console.error('Error creating workshop:', error);
        }
      }

      // Create news
      toast.info('Creando novedades...');
      for (const newsItem of seedNews) {
        try {
          await newsAPI.create(newsItem, accessToken);
        } catch (error) {
          console.error('Error creating news:', error);
        }
      }

      toast.success('¡Datos de demostración creados con éxito! Recarga la página para ver el contenido.');
    } catch (error: any) {
      console.error('Error seeding data:', error);
      toast.error(`Error al crear datos de demostración: ${error.message || 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSeedData}
      disabled={loading}
      className="fixed bottom-8 left-8 px-6 py-3 bg-[#B8860B] text-white tracking-wide flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 z-50 rounded-full hover:bg-[#2D4B39] group"
      title="Crear usuarios demo, productos, talleres y novedades de ejemplo"
    >
      <Database className="w-5 h-5 group-hover:rotate-12 transition-transform" />
      <span className="text-sm">{loading ? 'Inicializando...' : 'Datos Demo'}</span>
    </button>
  );
}
