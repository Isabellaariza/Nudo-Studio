import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard,
  Users,
  Package,
  Calendar,
  ShoppingCart,
  FileText,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCog,
  Wrench,
  BookOpen,
  Package2,
  Layers,
  RotateCcw,
  X,
  Menu
} from 'lucide-react';
import { useIsMobile, useIsTablet } from '../hooks/useResponsive';

interface AdminSidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: (collapsed: boolean) => void;
}

export function AdminSidebar({ 
  activeSection = 'dashboard', 
  onSectionChange,
  collapsed = false,
  onToggleCollapse
}: AdminSidebarProps) {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // En móvil: mostrar como drawer. En tablet: mostrar colapsado. En desktop: normal
  const shouldShowAsDrawer = isMobile;
  const shouldAutoCollapse = isTablet && !isMobile;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Usuarios', icon: Users },
    { id: 'employees', label: 'Empleados', icon: UserCog },
    { 
      id: 'inventory', 
      label: 'Stock', 
      icon: Package,
      submenu: [
        { id: 'finished-products', label: 'Productos Terminados', icon: Package2 },
        { id: 'raw-materials', label: 'Materia Prima', icon: Layers },
        { id: 'suppliers', label: 'Proveedores', icon: UserCog } // Agregado
      ]
    },
    { id: 'orders', label: 'Pedidos', icon: ShoppingCart },
    { id: 'returns', label: 'Devoluciones', icon: RotateCcw },
    { id: 'quotes', label: 'Cotizaciones', icon: FileText },
    { id: 'workshops', label: 'Talleres', icon: Calendar },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ];

  return (
    <>
      {/* EN MÓVIL: BOTÓN PARA ABRIR DRAWER */}
      {shouldShowAsDrawer && (
        <motion.button
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="fixed top-20 left-4 z-50 p-2 rounded-lg"
          style={{ backgroundColor: '#2D4B39', color: '#fff' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      )}

      {/* SIDEBAR PRINCIPAL */}
      <motion.div
        className={`${shouldShowAsDrawer ? 'fixed inset-0' : 'fixed left-0 top-20'} backdrop-blur-lg z-40`}
        style={{
          backgroundColor: shouldShowAsDrawer && mobileDrawerOpen ? 'rgba(0, 0, 0, 0.5)' : shouldShowAsDrawer ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
          borderRight: !shouldShowAsDrawer ? '1px solid #E0D1C0' : 'none',
          width: shouldShowAsDrawer 
            ? mobileDrawerOpen ? '100vw' : '0' 
            : shouldAutoCollapse ? '80px' : collapsed ? '80px' : '280px',
          height: shouldShowAsDrawer ? '100vh' : 'calc(100vh - 80px)',
          top: shouldShowAsDrawer ? '0' : '80px'
        }}
        initial={{ x: shouldShowAsDrawer ? -400 : 0 }}
        animate={{ 
          x: shouldShowAsDrawer && !mobileDrawerOpen ? -400 : 0,
          width: shouldShowAsDrawer 
            ? mobileDrawerOpen ? '100vw' : '0' 
            : shouldAutoCollapse ? '80px' : collapsed ? '80px' : '280px'
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => {
          if (shouldShowAsDrawer && e.target === e.currentTarget) {
            setMobileDrawerOpen(false);
          }
        }}
      >
        <motion.div
          className="h-full bg-white flex flex-col"
          style={{
            width: shouldShowAsDrawer ? '280px' : 'auto'
          }}
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* HEADER DEL MENÚ */}
          {(!collapsed || shouldShowAsDrawer) && (
            <div className="p-4 pb-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold" style={{ color: '#2D4B39' }}>
                Menú principal
              </h3>
            </div>
          )}
          
          {/* MENÚ */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    onSectionChange?.(item.id);
                    if (shouldShowAsDrawer) setMobileDrawerOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 relative"
                  style={{
                    backgroundColor: isActive ? 'rgba(45, 75, 57, 0.1)' : 'transparent',
                    color: isActive ? '#2D4B39' : '#6B7280',
                    borderLeft: isActive ? '4px solid #B8860B' : '4px solid transparent',
                    justifyContent: (!collapsed && !shouldShowAsDrawer) || shouldShowAsDrawer ? 'flex-start' : 'center'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ 
                    backgroundColor: isActive ? 'rgba(45, 75, 57, 0.15)' : 'rgba(45, 75, 57, 0.05)',
                    x: 5
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  
                  {((!collapsed && !shouldShowAsDrawer) || shouldShowAsDrawer) && (
                    <span className="text-sm font-medium truncate">
                      {item.label}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* DIVIDER */}
          <div 
            className="mx-4 my-2" 
            style={{ 
              height: '1px', 
              backgroundColor: '#E0D1C0' 
            }} 
          />

          {/* INFO INFERIOR */}
          {(!collapsed || shouldShowAsDrawer) && (
            <motion.div
              className="px-4 py-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div 
                className="p-4 rounded-2xl"
                style={{ backgroundColor: 'rgba(232, 220, 200, 0.3)' }}
              >
                <div className="text-xs mb-2" style={{ color: '#6B7280' }}>
                  NUDO Studio Admin
                </div>
                <div className="text-xs" style={{ color: '#9CA3AF' }}>
                  Versión 1.0.0
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}