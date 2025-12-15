import { motion } from 'framer-motion';
import { Settings, Users, UserCheck, User, GraduationCap, Check, X } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

export function SettingsPage() {
  const { rolePermissions, updateRolePermissions } = useApp();

  const permissions = [
    { key: 'canManageUsers', label: 'Gestionar Usuarios' },
    { key: 'canManageEmployees', label: 'Gestionar Empleados' },
    { key: 'canManageInventory', label: 'Gestionar Stock' },
    { key: 'canManageOrders', label: 'Gestionar Pedidos' },
    { key: 'canManageReturns', label: 'Gestionar Devoluciones' },
    { key: 'canManageServices', label: 'Gestionar Servicios' },
    { key: 'canManageQuotes', label: 'Gestionar Cotizaciones' },
    { key: 'canManageWorkshops', label: 'Gestionar Talleres' },
    { key: 'canManageBlog', label: 'Gestionar Blog' }
  ];

  const roles = [
    { key: 'Empleado', label: 'Empleado', icon: UserCheck, color: '#3B82F6' },
    { key: 'Cliente', label: 'Cliente', icon: User, color: '#10B981' },
    { key: 'Estudiante', label: 'Estudiante', icon: GraduationCap, color: '#F59E0B' }
  ];

  const togglePermission = (role: string, permissionKey: string) => {
    const currentPermissions = rolePermissions[role];
    const updatedPermissions = {
      ...currentPermissions,
      [permissionKey]: !currentPermissions[permissionKey as keyof typeof currentPermissions]
    };
    updateRolePermissions(role, updatedPermissions);
  };

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div 
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(45, 75, 57, 0.1)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(45, 75, 57, 0.08)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative px-10 py-8">
          <div className="flex items-center gap-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{ 
                  background: 'linear-gradient(135deg, #2D4B39 0%, #1F3A2E 100%)',
                  boxShadow: '0 8px 24px rgba(45, 75, 57, 0.3)'
                }}
              >
                <Settings className="w-7 h-7" style={{ color: '#ffffff' }} />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
              </div>
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                Configuración de Permisos
              </h1>
              <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                Gestiona los permisos por rol de usuario
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabla de Permisos */}
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#2D4B39' }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">
                  PERMISOS
                </th>
                {roles.map((role) => (
                  <th key={role.key} className="px-6 py-4 text-center text-sm font-semibold text-white uppercase">
                    <div className="flex items-center justify-center gap-2">
                      <role.icon className="w-4 h-4" />
                      {role.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
              {permissions.map((permission, index) => (
                <motion.tr
                  key={permission.key}
                  className="hover:bg-gray-50 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{permission.label}</span>
                  </td>
                  {roles.map((role) => {
                    const hasPermission = rolePermissions[role.key]?.[permission.key as keyof typeof rolePermissions[typeof role.key]];
                    return (
                      <td key={role.key} className="px-6 py-4 text-center">
                        <button
                          onClick={() => togglePermission(role.key, permission.key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                            hasPermission ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          title={`${hasPermission ? 'Desactivar' : 'Activar'} ${permission.label} para ${role.label}`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                              hasPermission ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Información adicional */}
      <motion.div
        className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">i</span>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">Información sobre Permisos</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Los <strong>Administradores</strong> tienen acceso completo a todas las secciones</li>
              <li>• Los cambios se aplican automáticamente a todos los usuarios con ese rol</li>
              <li>• Los permisos se guardan automáticamente al hacer cambios</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}