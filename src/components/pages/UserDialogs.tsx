import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users,
  User,
  Edit,
  Trash2,
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Check,
  X,
  Eye,
  Save,
  Shield,
  FileText,
  Info
} from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';

export function UserDialogs() {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
    currentUser,
    rolePermissions,
  } = useApp();

  const isAdmin = currentUser?.role === 'Admin';
  const userPermissions = isAdmin ? {
    canManageUsers: true,
  } : rolePermissions[currentUser?.role || 'Cliente'] || {
    canManageUsers: false,
  };

  const [searchTerm, setSearchTerm] = useState('');
  
  // ESTADOS LOCALES PARA DIÁLOGOS
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState<any>(null);
  const [showUserInfoDialog, setShowUserInfoDialog] = useState(false);

  // FUNCIONES PARA USUARIOS
  const handleAddUser = () => {
    setIsNewUser(true);
    setEditingUser({
      id: users.length + 1,
      name: '',
      email: '',
      phone: '',
      address: '',
      documentType: 'cedula',
      documentNumber: '',
      role: 'Cliente',
      orders: 0,
      status: true,
      joined: new Date().toISOString().split('T')[0]
    });
    setShowUserDialog(true);
  };

  const handleEditUser = (user: any) => {
    setIsNewUser(false);
    setEditingUser({...user});
    setShowUserDialog(true);
  };

  const handleSaveUser = () => {
    if (isNewUser) {
      addUser(editingUser);
      toast.success('Usuario agregado exitosamente');
    } else {
      updateUser(editingUser.id, editingUser);
      toast.success('Usuario actualizado exitosamente');
    }
    setShowUserDialog(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      deleteUser(userId);
      toast.success('Usuario eliminado exitosamente');
    }
  };

  const handleToggleUserStatus = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      updateUser(userId, { ...user, status: !user.status });
      toast.success('Estado actualizado');
    }
  };

  // RENDERIZAR USUARIOS
  const renderUsers = () => (
    <>
      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <motion.div 
          className="relative overflow-hidden mb-8"
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
            <div className="flex items-center justify-between">
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
                    <Users className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Usuarios
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {users.length} usuarios registrados
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {users.filter(user => user.status).length} activos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(107, 114, 128, 0.6)' }} />
                  <Input
                    placeholder="Buscar usuarios..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 text-sm font-medium transition-all duration-300"
                    style={{ 
                      border: '1px solid rgba(45, 75, 57, 0.15)',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      width: '320px',
                      boxShadow: '0 4px 12px rgba(45, 75, 57, 0.05)'
                    }}
                  />
                </motion.div>
                
                <motion.button
                  onClick={handleAddUser}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                  Nuevo Usuario
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">USUARIO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">EMAIL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">TELÉFONO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ROL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ESTADO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
                {(searchTerm ? users.filter(user => 
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
                ) : users).map((user: any, index: number) => (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    whileHover={{ 
                      y: -2,
                      boxShadow: '0 4px 12px rgba(45, 75, 57, 0.1)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#2D4B39' }}>
                          {user.profilePhoto ? (
                            <img 
                              src={user.profilePhoto} 
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs font-light" style={{ color: '#B8860B' }}>
                            {user.documentType === 'cedula' ? 'CC' : 'CE'}: {user.documentNumber || '1234567890'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.phone || '300-123-4567'}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                        backgroundColor: user.role === 'Estudiante' ? '#FEF3C7' : '#F3F4F6',
                        color: user.role === 'Estudiante' ? '#92400E' : '#374151'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleUserStatus(user.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                          user.status ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                            user.status ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setSelectedUserInfo(user); setShowUserInfoDialog(true); }}
                          className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                          title="Ver información"
                        >
                          <Info className="w-4 h-4 text-gray-500" />
                        </button>
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="p-2 rounded-lg transition-colors hover:bg-yellow-50"
                          title="Editar usuario"
                        >
                          <Edit className="w-4 h-4" style={{ color: '#B8860B' }} />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 rounded-lg transition-colors hover:bg-red-50"
                          title="Eliminar usuario"
                        >
                          <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* DIÁLOGO DE INFORMACIÓN COMPLETA DEL USUARIO */}
      <AnimatePresence>
        {showUserInfoDialog && selectedUserInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUserInfoDialog(false)}
          >
            <motion.div
              className="rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                border: '1px solid rgba(184, 134, 11, 0.2)',
                boxShadow: '0 20px 40px rgba(45, 75, 57, 0.1), 0 0 0 1px rgba(184, 134, 11, 0.05)'
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ 
                  background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                  boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                }}>
                  <User className="w-8 h-8" style={{ color: '#ffffff' }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>{selectedUserInfo.name}</h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>Información completa del usuario</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)', border: '1px solid rgba(45, 75, 57, 0.15)' }}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                      <User className="w-5 h-5" style={{ color: '#B8860B' }} />
                      Información Personal
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Email:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedUserInfo.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Teléfono:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedUserInfo.phone || 'No especificado'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Documento:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedUserInfo.documentType === 'cedula' ? 'CC' : 'CE'}: {selectedUserInfo.documentNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Dirección:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedUserInfo.address || 'No especificada'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)', border: '1px solid rgba(45, 75, 57, 0.15)' }}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                      <Shield className="w-5 h-5" style={{ color: '#B8860B' }} />
                      Estado de la Cuenta
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Rol:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedUserInfo.role}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Estado:</span>
                        <span className="text-sm font-medium" style={{ color: selectedUserInfo.status ? '#10b981' : '#ef4444' }}>
                          {selectedUserInfo.status ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Fecha de registro:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedUserInfo.joined || 'No disponible'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)', border: '1px solid rgba(45, 75, 57, 0.15)' }}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                      <FileText className="w-5 h-5" style={{ color: '#B8860B' }} />
                      Actividad
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Pedidos realizados:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedUserInfo.orders || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Talleres completados:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedUserInfo.workshops || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Último acceso:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>Hoy</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)', border: '1px solid rgba(45, 75, 57, 0.15)' }}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                      <Phone className="w-5 h-5" style={{ color: '#B8860B' }} />
                      Estadísticas
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Total gastado:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>$0 COP</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm" style={{ color: '#2D4B39' }}>Productos favoritos:</span>
                        <span className="text-sm font-medium" style={{ color: '#B8860B' }}>Macramé</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <button
                  onClick={() => setShowUserInfoDialog(false)}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    border: '1px solid rgba(184, 134, 11, 0.3)',
                    color: '#B8860B',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(184, 134, 11, 0.1)'
                  }}
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setShowUserInfoDialog(false);
                    handleEditUser(selectedUserInfo);
                  }}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                  }}
                >
                  Editar Usuario
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DIÁLOGO PARA EDITAR/AGREGAR USUARIO */}
      <AnimatePresence>
        {showUserDialog && editingUser && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUserDialog(false)}
          >
            <motion.div
              className="rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                border: '1px solid rgba(184, 134, 11, 0.2)',
                boxShadow: '0 20px 40px rgba(45, 75, 57, 0.1), 0 0 0 1px rgba(184, 134, 11, 0.05)'
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ 
                  background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                  boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                }}>
                  <User className="w-8 h-8" style={{ color: '#ffffff' }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                    {isNewUser ? 'Nuevo Usuario' : 'Editar Usuario'}
                  </h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>Complete la información del usuario</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Información Personal */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)', border: '1px solid rgba(45, 75, 57, 0.15)' }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                    <User className="w-5 h-5" style={{ color: '#B8860B' }} />
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm mb-2 block font-semibold flex items-center gap-2" style={{ color: '#2D4B39' }}>
                        <User className="w-4 h-4" style={{ color: '#B8860B' }} />
                        Nombre Completo
                      </label>
                      <input
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2"
                        style={{
                          borderColor: 'rgba(45, 75, 57, 0.3)',
                          backgroundColor: '#ffffff',
                          outline: 'none',
                          boxShadow: '0 2px 4px rgba(45, 75, 57, 0.05)'
                        }}
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold flex items-center gap-2" style={{ color: '#2D4B39' }}>
                        <Mail className="w-4 h-4" style={{ color: '#B8860B' }} />
                        Email
                      </label>
                      <input
                        type="email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2"
                        style={{
                          borderColor: 'rgba(45, 75, 57, 0.3)',
                          backgroundColor: '#ffffff',
                          outline: 'none',
                          boxShadow: '0 2px 4px rgba(45, 75, 57, 0.05)'
                        }}
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Contacto y Rol */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)', border: '1px solid rgba(45, 75, 57, 0.15)' }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                    <Phone className="w-5 h-5" style={{ color: '#B8860B' }} />
                    Contacto y Permisos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm mb-2 block font-semibold flex items-center gap-2" style={{ color: '#2D4B39' }}>
                        <Phone className="w-4 h-4" style={{ color: '#B8860B' }} />
                        Teléfono
                      </label>
                      <input
                        value={editingUser.phone}
                        onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2"
                        style={{
                          borderColor: 'rgba(45, 75, 57, 0.3)',
                          backgroundColor: '#ffffff',
                          outline: 'none',
                          boxShadow: '0 2px 4px rgba(45, 75, 57, 0.05)'
                        }}
                        placeholder="300 123 4567"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold flex items-center gap-2" style={{ color: '#2D4B39' }}>
                        <Shield className="w-4 h-4" style={{ color: '#B8860B' }} />
                        Rol
                      </label>
                      <select
                        value={editingUser.role}
                        onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 appearance-none"
                        style={{
                          borderColor: 'rgba(45, 75, 57, 0.3)',
                          backgroundColor: '#ffffff',
                          outline: 'none',
                          boxShadow: '0 2px 4px rgba(45, 75, 57, 0.05)'
                        }}
                      >
                        <option value="Admin">Administrador</option>
                        <option value="Empleado">Empleado</option>
                        <option value="Cliente">Cliente</option>
                        <option value="Estudiante">Estudiante</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Documentación */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)', border: '1px solid rgba(45, 75, 57, 0.15)' }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                    <FileText className="w-5 h-5" style={{ color: '#B8860B' }} />
                    Documentación
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="text-sm mb-2 block font-semibold flex items-center gap-2" style={{ color: '#2D4B39' }}>
                        <FileText className="w-4 h-4" style={{ color: '#B8860B' }} />
                        Tipo de Documento
                      </label>
                      <select
                        value={editingUser.documentType}
                        onChange={(e) => setEditingUser({ ...editingUser, documentType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2 appearance-none"
                        style={{
                          borderColor: 'rgba(45, 75, 57, 0.3)',
                          backgroundColor: '#ffffff',
                          outline: 'none',
                          boxShadow: '0 2px 4px rgba(45, 75, 57, 0.05)'
                        }}
                      >
                        <option value="cedula">Cédula de Ciudadanía</option>
                        <option value="extranjeria">Cédula de Extranjería</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold flex items-center gap-2" style={{ color: '#2D4B39' }}>
                        <FileText className="w-4 h-4" style={{ color: '#B8860B' }} />
                        Número de Documento
                      </label>
                      <input
                        value={editingUser.documentNumber}
                        onChange={(e) => setEditingUser({ ...editingUser, documentNumber: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2"
                        style={{
                          borderColor: 'rgba(45, 75, 57, 0.3)',
                          backgroundColor: '#ffffff',
                          outline: 'none',
                          boxShadow: '0 2px 4px rgba(45, 75, 57, 0.05)'
                        }}
                        placeholder="1234567890"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm mb-2 block font-semibold flex items-center gap-2" style={{ color: '#2D4B39' }}>
                      <MapPin className="w-4 h-4" style={{ color: '#B8860B' }} />
                      Dirección
                    </label>
                    <input
                      value={editingUser.address || ''}
                      onChange={(e) => setEditingUser({ ...editingUser, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:ring-2"
                      style={{
                        borderColor: 'rgba(45, 75, 57, 0.3)',
                        backgroundColor: '#ffffff',
                        outline: 'none',
                        boxShadow: '0 2px 4px rgba(45, 75, 57, 0.05)'
                      }}
                      placeholder="Calle 123 #45-67, Ciudad"
                    />
                  </div>
                </div>

                {/* Estado del Usuario */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)', border: '1px solid rgba(45, 75, 57, 0.15)' }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                    <Shield className="w-5 h-5" style={{ color: '#B8860B' }} />
                    Estado de la Cuenta
                  </h3>
                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(45, 75, 57, 0.2)' }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${editingUser.status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>
                        {editingUser.status ? 'Usuario Activo' : 'Usuario Inactivo'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingUser({ ...editingUser, status: !editingUser.status })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                        editingUser.status ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          editingUser.status ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <button
                  onClick={() => setShowUserDialog(false)}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    border: '1px solid rgba(184, 134, 11, 0.3)',
                    color: '#B8860B',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(184, 134, 11, 0.1)'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveUser}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                  }}
                >
                  <Save className="w-4 h-4" />
                  {isNewUser ? 'Crear Usuario' : 'Guardar Cambios'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return renderUsers();
}