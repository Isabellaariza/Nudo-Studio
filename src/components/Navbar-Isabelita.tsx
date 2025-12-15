import { ShoppingCart, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: any;
  cartItemCount: number;
  onLogout: () => void;
}

export function Navbar({ currentPage, onNavigate, user, cartItemCount, onLogout }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'products', label: 'Catálogo' },
    { id: 'services', label: 'Servicios' },
    { id: 'workshops', label: 'Talleres' },
    { id: 'blog', label: 'Blog' },
  ];

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
      style={{ height: '80px' }}
    >
      <div className="max-w-7xl mx-auto px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo - Izquierda */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex items-baseline gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span 
              className="font-elegant text-2xl"
              style={{ 
                color: '#2D4B39',
                letterSpacing: '0.15em',
                fontWeight: 'normal'
              }}
            >
              NUDO
            </span>
            <div className="relative">
              <div 
                className="absolute -left-2 top-0 bottom-0 w-[1px]"
                style={{ 
                  backgroundColor: '#B8860B',
                  opacity: 0.4
                }}
              />
              <span 
                className="text-sm uppercase pl-3"
                style={{ 
                  color: 'rgba(45, 75, 57, 0.8)',
                  letterSpacing: '0.3em'
                }}
              >
                Studio
              </span>
            </div>
          </motion.button>

          {/* Menú Central - Desktop */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative px-4 text-lg"
                style={{ 
                  color: currentPage === item.id 
                    ? 'rgba(45, 75, 57, 0.85)' 
                    : 'rgba(45, 75, 57, 0.7)',
                  fontWeight: 'normal'
                }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-8"
                    style={{ backgroundColor: '#B8860B' }}
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Sección Derecha */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {/* Usuario logueado */}
                <motion.button
                  onClick={() => onNavigate('profile')}
                  className="flex items-center gap-2"
                  style={{ color: '#2D4B39' }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B8860B' }}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{user.name}</span>
                </motion.button>

                {/* Carrito */}
                <motion.button
                  onClick={() => onNavigate('cart')}
                  className="relative flex items-center gap-2"
                  style={{ color: '#2D4B39' }}
                  whileHover={{ opacity: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span
                      className="w-6 h-6 rounded-full text-xs flex items-center justify-center font-semibold"
                      style={{ 
                        backgroundColor: '#B8860B',
                        color: 'white'
                      }}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </motion.button>


              </>
            ) : (
              /* Usuario NO logueado */
              <motion.button
                onClick={() => onNavigate('login')}
                className="px-6 py-2 text-white rounded-full"
                style={{ backgroundColor: '#2D4B39' }}
                whileHover={{ 
                  backgroundColor: 'white',
                  color: '#2D4B39',
                  boxShadow: '0 0 0 2px #2D4B39 inset'
                }}
                transition={{ duration: 0.2 }}
              >
                Iniciar Sesión
              </motion.button>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
}