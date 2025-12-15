import { useState, useRef, useEffect } from 'react';
import { LogOut, RefreshCw, Bell, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../contexts/AppContext';

interface AdminNavbarProps {
  user: any;
  onLogout: () => void;
  onRefresh?: () => void;
}

export function AdminNavbar({ user, onLogout, onRefresh }: AdminNavbarProps) {
  const { notifications, markNotificationAsRead, clearNotifications } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close notifications on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefresh = async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch(type) {
      case 'order': return '🛍️';
      case 'user': return '👤';
      case 'workshop': return '🛠️';
      case 'quote': return '💰';
      case 'return': return '🔄';
      default: return '🔔';
    }
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 border-b" 
      style={{ 
        backgroundColor: '#ffffff',
        borderColor: '#E0D1C0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center" style={{ height: '80px' }}>
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <div 
              className="font-elegant"
              style={{ 
                color: '#2D4B39',
                fontSize: '2.2rem',
                letterSpacing: '0.15em'
              }}
            >
              NUDO
            </div>
            {/* LÍNEA VERTICAL DORADA */}
            <div
              style={{
                width: '1px',
                height: '40px',
                backgroundColor: '#B8860B',
                opacity: 0.4
              }}
            />
            <div 
              style={{ 
                color: '#2D4B39',
                opacity: 0.8,
                fontSize: '0.9rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            >
              Studio
            </div>
          </div>

          {/* BOTONES DERECHA */}
          <div className="flex items-center gap-4">
            {/* NOTIFICACIONES */}
            <div className="relative" ref={notificationRef}>
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full relative transition-colors hover:bg-gray-100"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5" style={{ color: '#2D4B39' }} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                    {unreadCount}
                  </span>
                )}
              </motion.button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  >
                    <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
                      <h3 className="font-semibold text-sm text-[#2D4B39]">Notificaciones</h3>
                      {notifications.length > 0 && (
                        <button 
                          onClick={clearNotifications}
                          className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" /> Limpiar
                        </button>
                      )}
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.length > 0 ? (
                        <div className="divide-y">
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className={`p-3 hover:bg-gray-50 transition-colors cursor-pointer relative ${!notification.read ? 'bg-blue-50/50' : ''}`}
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              <div className="flex gap-3">
                                <span className="text-xl">{getNotificationIcon(notification.type)}</span>
                                <div className="flex-1">
                                  <p className={`text-sm ${!notification.read ? 'font-medium text-[#2D4B39]' : 'text-gray-600'}`}>
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1">
                                    {new Date(notification.date).toLocaleString()}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-500 text-sm">
                          No tienes notificaciones nuevas
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BADGE ADMIN */}
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ 
                backgroundColor: 'rgba(45, 75, 57, 0.05)',
                border: '1px solid rgba(45, 75, 57, 0.2)'
              }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: '#B8860B' }}
              />
              <span className="text-sm" style={{ color: '#2D4B39' }}>
                Admin
              </span>
            </div>

            {/* BOTÓN CERRAR SESIÓN */}
            <motion.button
              onClick={onLogout}
              className="flex items-center gap-2 transition-all duration-300"
              style={{ 
                color: '#6b7280'
              }}
              whileHover={{ 
                color: '#374151'
              }}
              whileTap={{ 
                scale: 0.95
              }}
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Cerrar Sesión</span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
}