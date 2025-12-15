import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MapPin, FileText, CreditCard, Package, Calendar, Edit3, LogOut, Trash2, X, Save, Camera, Upload, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface ProfilePageProps {
  user: any;
  onLogout: () => void;
}

export function ProfilePage({ user, onLogout }: ProfilePageProps) {
  const { orders, workshops, updateUser, deleteUser, logoutUser, currentUser, setCurrentUser } = useApp();
  const activeUser = currentUser || { name: 'Usuario', email: '', phone: '', address: '', documentType: 'cedula', documentNumber: '', profilePhoto: '' };
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editData, setEditData] = useState({
    name: activeUser?.name || '',
    email: activeUser?.email || '',
    phone: activeUser?.phone || '',
    address: activeUser?.address || '',
    documentType: activeUser?.documentType || 'cedula',
    documentNumber: activeUser?.documentNumber || '',
    profilePhoto: activeUser?.profilePhoto || ''
  });
  const [showPhotoDialog, setShowPhotoDialog] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Filtrar pedidos y talleres del usuario actual
  const userOrders = orders.filter(order => order.userId === activeUser?.id);
  const userWorkshops = workshops.filter(workshop => 
    workshop.enrolledUsers?.includes(activeUser?.id)
  );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'Pendiente': '#B8860B',
      'En Proceso': '#2D4B39',
      'Completado': '#4CAF50',
      'Cancelado': '#F44336',
      'Programado': '#2D4B39',
      'Completo': '#B8860B'
    };
    return colors[status] || '#2D4B39';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSaveEdit = () => {
    if (!activeUser?.id) return;
    
    updateUser(activeUser.id, editData);
    setCurrentUser({ ...activeUser, ...editData });
    setIsEditing(false);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPhotoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = () => {
    if (photoPreview && activeUser?.id) {
      updateUser(activeUser.id, { profilePhoto: photoPreview });
      setCurrentUser({ ...activeUser, profilePhoto: photoPreview });
      setEditData({ ...editData, profilePhoto: photoPreview });
      setShowPhotoDialog(false);
      setPhotoPreview(null);
      toast.success('Foto de perfil actualizada');
    }
  };

  const handleRemovePhoto = () => {
    if (activeUser?.id) {
      updateUser(activeUser.id, { profilePhoto: '' });
      setCurrentUser({ ...activeUser, profilePhoto: '' });
      setEditData({ ...editData, profilePhoto: '' });
      setShowPhotoDialog(false);
      setPhotoPreview(null);
      toast.success('Foto de perfil eliminada');
    }
  };

  const handleDeleteProfile = () => {
    if (!activeUser?.id) return;
    
    deleteUser(activeUser.id);
    logoutUser();
    onLogout();
    toast.success('Perfil eliminado exitosamente');
  };

  const handleLogout = () => {
    logoutUser();
    onLogout();
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'cedula': 'Cédula de Ciudadanía',
      'tarjeta_identidad': 'Tarjeta de Identidad',
      'cedula_extranjeria': 'Cédula de Extranjería'
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen pt-8 pb-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header con información del usuario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-[#E0D1C0]/30 to-[#E0D1C0]/10 rounded-3xl p-10 relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#2D4B39]/10 rounded-full translate-y-12 -translate-x-12" />
            
            <div className="relative z-10">
              <div className="flex flex-col gap-8">
                {/* Header con avatar y botones */}
                <div className="flex items-start justify-between gap-8 mb-8">
                  <div className="flex items-center gap-8">
                    <div className="relative group">
                      <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white relative" style={{ backgroundColor: '#2D4B39' }}>
                        <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #2D4B39 0%, #B8860B 100%)' }}>
                          <User className="w-20 h-20" style={{ color: 'white' }} />
                        </div>
                        {activeUser.profilePhoto && (
                          <img 
                            src={activeUser.profilePhoto} 
                            alt={activeUser.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <motion.button
                        onClick={() => setShowPhotoDialog(true)}
                        className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#2D4B39] rounded-full flex items-center justify-center shadow-lg border-4 border-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit3 className="w-5 h-5 text-white" />
                      </motion.button>
                    </div>
                    <div>
                      <h1 className="font-elegant text-5xl tracking-wide mb-3" style={{ color: '#2D4B39' }}>
                        {activeUser?.name}
                      </h1>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#B8860B' }} />
                        <p className="text-xl font-medium" style={{ color: '#B8860B' }}>
                          Cliente
                        </p>
                      </div>
                      <p className="text-base text-[#2D4B39]/70">Miembro desde {formatDate(activeUser?.joined || new Date().toISOString())}</p>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex flex-col gap-3">
                    {isEditing ? (
                      <>
                        <motion.button
                          onClick={handleSaveEdit}
                          className="flex items-center gap-2 px-6 py-3 rounded-full text-white transition-all duration-300"
                          style={{ backgroundColor: '#4CAF50' }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Save className="w-4 h-4" />
                          Guardar
                        </motion.button>
                        <motion.button
                          onClick={() => {
                            setIsEditing(false);
                            setEditData({
                              name: activeUser?.name || '',
                              email: activeUser?.email || '',
                              phone: activeUser?.phone || '',
                              address: activeUser?.address || '',
                              documentType: activeUser?.documentType || 'cedula',
                              documentNumber: activeUser?.documentNumber || '',
                              profilePhoto: activeUser?.profilePhoto || ''
                            });
                          }}
                          className="flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300"
                          style={{ borderColor: '#2D4B39', color: '#2D4B39' }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X className="w-4 h-4" />
                          Cancelar
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center gap-2 px-6 py-3 rounded-full text-white transition-all duration-300"
                          style={{ backgroundColor: '#2D4B39' }}
                          whileHover={{ scale: 1.05, backgroundColor: '#B8860B' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Edit3 className="w-4 h-4" />
                          Editar Perfil
                        </motion.button>
                        <motion.button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300"
                          style={{ borderColor: '#B8860B', color: '#B8860B' }}
                          whileHover={{ scale: 1.05, backgroundColor: '#B8860B', color: 'white' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <LogOut className="w-4 h-4" />
                          Cerrar Sesión
                        </motion.button>
                        <motion.button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-300"
                          style={{ borderColor: '#F44336', color: '#F44336' }}
                          whileHover={{ scale: 1.05, backgroundColor: '#F44336', color: 'white' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar Perfil
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>

                {/* Información del usuario */}
                <div className="border-t border-[#2D4B39]/10 pt-8">
                  <AnimatePresence mode="wait">
                    {isEditing ? (
                      <motion.div
                        key="editing"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-2 gap-6"
                      >
                        <div className="space-y-6">
                          <div>
                            <label className="flex items-center gap-2 mb-2 text-base font-medium" style={{ color: '#2D4B39' }}>
                              <User className="w-5 h-5" />
                              Nombre Completo
                            </label>
                            <input
                              type="text"
                              value={editData.name}
                              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                              className="w-full px-5 py-3 rounded-xl border-2 border-[#E0D1C0] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="flex items-center gap-2 mb-2 text-base font-medium" style={{ color: '#2D4B39' }}>
                              <Mail className="w-5 h-5" />
                              Email
                            </label>
                            <input
                              type="email"
                              value={editData.email}
                              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                              className="w-full px-5 py-3 rounded-xl border-2 border-[#E0D1C0] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="flex items-center gap-2 mb-2 text-base font-medium" style={{ color: '#2D4B39' }}>
                              <Phone className="w-5 h-5" />
                              Teléfono
                            </label>
                            <input
                              type="tel"
                              value={editData.phone}
                              onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                              className="w-full px-5 py-3 rounded-xl border-2 border-[#E0D1C0] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="flex items-center gap-2 mb-2 text-base font-medium" style={{ color: '#2D4B39' }}>
                              <MapPin className="w-5 h-5" />
                              Dirección
                            </label>
                            <input
                              type="text"
                              value={editData.address}
                              onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                              className="w-full px-5 py-3 rounded-xl border-2 border-[#E0D1C0] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="flex items-center gap-2 mb-2 text-base font-medium" style={{ color: '#2D4B39' }}>
                                <FileText className="w-5 h-5" />
                                Tipo de Documento
                              </label>
                              <select
                                value={editData.documentType}
                                onChange={(e) => setEditData({ ...editData, documentType: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl border-2 border-[#E0D1C0] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all"
                              >
                                <option value="cedula">Cédula de Ciudadanía</option>
                                <option value="tarjeta_identidad">Tarjeta de Identidad</option>
                                <option value="cedula_extranjeria">Cédula de Extranjería</option>
                              </select>
                            </div>
                            <div>
                              <label className="flex items-center gap-2 mb-2 text-base font-medium" style={{ color: '#2D4B39' }}>
                                <CreditCard className="w-5 h-5" />
                                Número de Documento
                              </label>
                              <input
                                type="text"
                                value={editData.documentNumber}
                                onChange={(e) => setEditData({ ...editData, documentNumber: e.target.value })}
                                className="w-full px-5 py-3 rounded-xl border-2 border-[#E0D1C0] focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all"
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="viewing"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-3 gap-8"
                      >
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#E0D1C0]/30">
                          <div className="w-12 h-12 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4">
                            <Mail className="w-6 h-6" style={{ color: '#B8860B' }} />
                          </div>
                          <p className="text-sm text-[#2D4B39]/60 mb-2">Email</p>
                          <p className="text-base text-[#2D4B39] font-medium">{activeUser?.email || 'No especificado'}</p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#E0D1C0]/30">
                          <div className="w-12 h-12 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4">
                            <Phone className="w-6 h-6" style={{ color: '#B8860B' }} />
                          </div>
                          <p className="text-sm text-[#2D4B39]/60 mb-2">Teléfono</p>
                          <p className="text-base text-[#2D4B39] font-medium">{activeUser?.phone || 'No especificado'}</p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#E0D1C0]/30">
                          <div className="w-12 h-12 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4">
                            <MapPin className="w-6 h-6" style={{ color: '#B8860B' }} />
                          </div>
                          <p className="text-sm text-[#2D4B39]/60 mb-2">Dirección</p>
                          <p className="text-base text-[#2D4B39] font-medium">{activeUser?.address || 'No especificada'}</p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#E0D1C0]/30">
                          <div className="w-12 h-12 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4">
                            <FileText className="w-6 h-6" style={{ color: '#B8860B' }} />
                          </div>
                          <p className="text-sm text-[#2D4B39]/60 mb-2">Documento</p>
                          <p className="text-base text-[#2D4B39] font-medium">{getDocumentTypeLabel(activeUser?.documentType)}</p>
                          <p className="text-sm text-[#2D4B39]/70 mt-1">{activeUser?.documentNumber || 'No especificado'}</p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#E0D1C0]/30">
                          <div className="w-12 h-12 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4">
                            <Package className="w-6 h-6" style={{ color: '#B8860B' }} />
                          </div>
                          <p className="text-sm text-[#2D4B39]/60 mb-2">Pedidos</p>
                          <p className="text-3xl font-bold text-[#2D4B39]">{userOrders.length}</p>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-[#E0D1C0]/30">
                          <div className="w-12 h-12 bg-[#B8860B]/10 rounded-full flex items-center justify-center mb-4">
                            <Calendar className="w-6 h-6" style={{ color: '#B8860B' }} />
                          </div>
                          <p className="text-sm text-[#2D4B39]/60 mb-2">Miembro desde</p>
                          <p className="text-base text-[#2D4B39] font-medium">{formatDate(activeUser?.joined || new Date().toISOString())}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs para pedidos y talleres */}
        <Tabs defaultValue="orders" className="space-y-8">
          <TabsList className="bg-[#E0D1C0]/30 p-1 rounded-full">
            <TabsTrigger 
              value="orders" 
              className="data-[state=active]:bg-[#2D4B39] data-[state=active]:text-white rounded-full px-8 py-3 transition-all duration-300"
            >
              Mis Pedidos ({userOrders.length})
            </TabsTrigger>
            <TabsTrigger 
              value="workshops" 
              className="data-[state=active]:bg-[#2D4B39] data-[state=active]:text-white rounded-full px-8 py-3 transition-all duration-300"
            >
              Mis Talleres ({userWorkshops.length})
            </TabsTrigger>
          </TabsList>

          {/* Pedidos */}
          <TabsContent value="orders">
            {userOrders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-gradient-to-br from-[#E0D1C0]/20 to-[#E0D1C0]/5 rounded-3xl"
              >
                <Package className="w-20 h-20 mx-auto mb-6" style={{ color: '#2D4B39', opacity: 0.3 }} />
                <h3 className="text-2xl font-elegant mb-2" style={{ color: '#2D4B39' }}>No tienes pedidos aún</h3>
                <p className="text-[#2D4B39]/60">Explora nuestros productos y realiza tu primer pedido</p>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                {userOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-[#E0D1C0]/20 to-[#E0D1C0]/5 rounded-2xl p-6 border border-[#E0D1C0]/30"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-elegant" style={{ color: '#2D4B39' }}>Pedido #{order.id}</h3>
                        <p className="text-[#2D4B39]/60">{formatDate(order.date)}</p>
                      </div>
                      <span
                        className="px-4 py-2 rounded-full text-white text-sm font-medium"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-[#2D4B39]/70 mb-2">Productos: {order.items}</p>
                      <p className="text-[#2D4B39]/70">Dirección: {order.address}</p>
                      <p className="text-[#2D4B39]/70">Pago: {order.payment}</p>
                    </div>
                    
                    <div className="border-t border-[#2D4B39]/10 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg" style={{ color: '#2D4B39' }}>Total</span>
                        <span className="text-2xl font-bold" style={{ color: '#B8860B' }}>
                          ${order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Talleres */}
          <TabsContent value="workshops">
            {userWorkshops.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-gradient-to-br from-[#E0D1C0]/20 to-[#E0D1C0]/5 rounded-3xl"
              >
                <h3 className="text-2xl font-elegant mb-2" style={{ color: '#2D4B39' }}>No estás inscrito en talleres</h3>
                <p className="text-[#2D4B39]/60">Descubre nuestros talleres y desarrolla nuevas habilidades</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {userWorkshops.map((workshop, index) => (
                  <motion.div
                    key={workshop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-[#E0D1C0]/20 to-[#E0D1C0]/5 rounded-2xl p-6 border border-[#E0D1C0]/30"
                  >
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>{workshop.name}</h3>
                      <p className="text-sm text-[#2D4B39]/70">Instructor: {workshop.instructor}</p>
                    </div>
                    
                    <div className="space-y-2 mb-3 text-sm">
                      <p><span className="font-medium" style={{ color: '#2D4B39' }}>Fecha:</span> {formatDate(workshop.date)}</p>
                      <p><span className="font-medium" style={{ color: '#2D4B39' }}>Hora:</span> {workshop.time}</p>
                    </div>

                    {workshop.materials && workshop.materials.length > 0 && (
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}>
                        <p className="text-xs font-semibold mb-2" style={{ color: '#2D4B39' }}>Materiales:</p>
                        <div className="flex flex-wrap gap-2">
                          {workshop.materials.map((material: string, idx: number) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 rounded text-xs"
                              style={{
                                backgroundColor: 'rgba(184, 134, 11, 0.3)',
                                color: '#2D4B39'
                              }}
                            >
                              {material}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de foto de perfil */}
      <AnimatePresence>
        {showPhotoDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPhotoDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2D4B39]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8" style={{ color: '#2D4B39' }} />
                </div>
                <h3 className="text-2xl font-elegant mb-4" style={{ color: '#2D4B39' }}>
                  Foto de Perfil
                </h3>
                
                {photoPreview ? (
                  <div className="mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#E0D1C0] mb-4">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSavePhoto}
                        className="flex-1 px-4 py-2 rounded-full text-white transition-all duration-300"
                        style={{ backgroundColor: '#4CAF50' }}
                      >
                        Guardar
                      </button>
                      <button
                        onClick={() => setPhotoPreview(null)}
                        className="flex-1 px-4 py-2 rounded-full border-2 transition-all duration-300"
                        style={{ borderColor: '#2D4B39', color: '#2D4B39' }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="block w-full p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 hover:border-[#B8860B] hover:bg-[#B8860B]/5"
                      style={{ borderColor: '#E0D1C0' }}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#2D4B39' }} />
                      <p className="text-sm" style={{ color: '#2D4B39' }}>Seleccionar imagen</p>
                    </label>
                    
                    {activeUser?.profilePhoto && (
                      <div className="mt-4">
                        <button
                          onClick={handleRemovePhoto}
                          className="px-4 py-2 rounded-full border-2 transition-all duration-300 hover:bg-red-50"
                          style={{ borderColor: '#F44336', color: '#F44336' }}
                        >
                          Eliminar foto actual
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de confirmación para eliminar perfil */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-elegant mb-4" style={{ color: '#2D4B39' }}>
                  Eliminar Perfil
                </h3>
                <p className="text-[#2D4B39]/70 mb-8">
                  ¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-6 py-3 rounded-full border-2 transition-all duration-300"
                    style={{ borderColor: '#2D4B39', color: '#2D4B39' }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeleteProfile}
                    className="flex-1 px-6 py-3 rounded-full bg-red-600 text-white transition-all duration-300 hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}