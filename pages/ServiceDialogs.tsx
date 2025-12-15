import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Check,
  Save
} from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';

export function ServiceDialogs() {
  const [serviceSearchTerm, setServiceSearchTerm] = useState('');
  const [servicesData, setServicesData] = useState([
    {
      id: 1,
      title: 'Confección a Medida',
      description: 'Creamos piezas personalizadas adaptadas a tus necesidades y estilo. Desde macramé decorativo hasta accesorios únicos, trabajamos contigo para dar vida a tu visión.',
      features: [
        'Consultoría personalizada',
        'Diseño exclusivo',
        'Materiales de alta calidad',
        'Entrega en tiempo estimado'
      ],
      color: '#B8860B',
      gradient: 'from-[#B8860B]/10 to-[#B8860B]/5',
      icon: 'Scissors',
      status: 'active'
    },
    {
      id: 2,
      title: 'Diseño Personalizado',
      description: 'Ofrecemos servicios de diseño donde colaboramos contigo para crear piezas que reflejen tu personalidad o complementen tu espacio perfectamente.',
      features: [
        'Asesoría de color y estilo',
        'Bocetos y propuestas',
        'Ajustes ilimitados',
        'Garantía de satisfacción'
      ],
      color: '#2D4B39',
      gradient: 'from-[#2D4B39]/10 to-[#2D4B39]/5',
      icon: 'Palette',
      status: 'active'
    },
    {
      id: 3,
      title: 'Talleres y Capacitaciones',
      description: 'Aprende el arte del macramé, anudado y tejido textil en nuestros talleres prácticos. Desde nivel principiante hasta avanzado, te guiamos en cada paso.',
      features: [
        'Grupos reducidos',
        'Materiales incluidos',
        'Certificado de participación',
        'Acceso a comunidad'
      ],
      color: '#B8860B',
      gradient: 'from-[#B8860B]/10 to-[#B8860B]/5',
      icon: 'GraduationCap',
      status: 'active'
    },
    {
      id: 4,
      title: 'Kits para Hacer en Casa',
      description: 'Te enviamos todo lo que necesitas para crear tu propia pieza de macramé en casa, con instrucciones detalladas paso a paso y acceso a tutoriales en video.',
      features: [
        'Materiales premium incluidos',
        'Instrucciones detalladas',
        'Videos tutoriales',
        'Soporte online'
      ],
      color: '#2D4B39',
      gradient: 'from-[#2D4B39]/10 to-[#2D4B39]/5',
      icon: 'Package',
      status: 'active'
    }
  ]);

  const [selectedServiceInfo, setSelectedServiceInfo] = useState<any>(null);
  const [showServiceInfoDialog, setShowServiceInfoDialog] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [isNewService, setIsNewService] = useState(false);

  const handleAddService = () => {
    setIsNewService(true);
    setEditingService({
      id: servicesData.length + 1,
      title: '',
      description: '',
      features: [],
      color: '#B8860B',
      gradient: 'from-[#B8860B]/10 to-[#B8860B]/5',
      icon: 'Wrench',
      status: 'active'
    });
    setShowServiceDialog(true);
  };

  const handleEditService = (service: any) => {
    setIsNewService(false);
    setEditingService({...service});
    setShowServiceDialog(true);
  };

  const handleSaveService = () => {
    if (isNewService) {
      setServicesData([...servicesData, editingService]);
      toast.success('Servicio agregado exitosamente');
    } else {
      setServicesData(servicesData.map(service => service.id === editingService.id ? editingService : service));
      toast.success('Servicio actualizado exitosamente');
    }
    setShowServiceDialog(false);
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: number) => {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      setServicesData(servicesData.filter(service => service.id !== serviceId));
      toast.success('Servicio eliminado exitosamente');
    }
  };

  return (
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
                    <Wrench className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Servicios
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {servicesData.length} servicios disponibles
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {servicesData.filter(service => service.status === 'active').length} activos
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
                    placeholder="Buscar servicios..."
                    value={serviceSearchTerm}
                    onChange={(e) => setServiceSearchTerm(e.target.value)}
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
                  onClick={handleAddService}
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
                  Nuevo Servicio
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {(serviceSearchTerm ? servicesData.filter(service => 
            service.title.toLowerCase().includes(serviceSearchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(serviceSearchTerm.toLowerCase())
          ) : servicesData).map((service: any, index: number) => (
            <motion.div
              key={service.id}
              className="relative overflow-hidden rounded-2xl p-8 group"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(224, 209, 192, 0.2)',
                boxShadow: '0 2px 8px rgba(45, 75, 57, 0.04)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                boxShadow: '0 8px 24px rgba(45, 75, 57, 0.12)',
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative z-10">
                <motion.div 
                  className="rounded-[1.5rem] flex items-center justify-center mb-6 shadow-lg"
                  style={{ 
                    backgroundColor: service.color,
                    width: '80px',
                    height: '80px'
                  }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Wrench className="w-10 h-10 text-white" />
                </motion.div>

                <h3 
                  className="font-elegant text-2xl tracking-wide mb-4" 
                  style={{ color: '#2D4B39' }}
                >
                  {service.title}
                </h3>

                <p className="leading-relaxed mb-6" style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature: string, i: number) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: service.color }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span style={{ color: 'rgba(45, 75, 57, 0.8)' }}>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <button 
                    onClick={() => { setSelectedServiceInfo(service); setShowServiceInfoDialog(true); }}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-gray-200"
                    style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                  >
                    <Eye className="w-4 h-4 mx-auto" style={{ color: '#6B7280' }} />
                  </button>
                  <button 
                    onClick={() => handleEditService(service)}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-yellow-200"
                    style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}
                  >
                    <Edit className="w-4 h-4 mx-auto" style={{ color: '#B8860B' }} />
                  </button>
                  <button 
                    onClick={() => handleDeleteService(service.id)}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-red-200"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  >
                    <Trash2 className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* DIÁLOGO DE INFORMACIÓN DEL SERVICIO */}
      <AnimatePresence>
        {showServiceInfoDialog && selectedServiceInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowServiceInfoDialog(false)}
          >
            <motion.div
              className="rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(184, 134, 11, 0.2)',
                boxShadow: '0 20px 40px rgba(45, 75, 57, 0.1)'
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: selectedServiceInfo.color }}
                >
                  <Wrench className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>{selectedServiceInfo.title}</h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>Información del servicio</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-lg leading-relaxed" style={{ color: 'rgba(45, 75, 57, 0.8)' }}>
                  {selectedServiceInfo.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#2D4B39' }}>Características incluidas:</h3>
                <ul className="space-y-3">
                  {selectedServiceInfo.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: selectedServiceInfo.color }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span style={{ color: 'rgba(45, 75, 57, 0.8)' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowServiceInfoDialog(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setShowServiceInfoDialog(false);
                    handleEditService(selectedServiceInfo);
                  }}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
                >
                  Editar Servicio
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DIÁLOGO PARA EDITAR/AGREGAR SERVICIO */}
      <AnimatePresence>
        {showServiceDialog && editingService && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowServiceDialog(false)}
          >
            <motion.div
              className="rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(184, 134, 11, 0.2)',
                boxShadow: '0 20px 40px rgba(45, 75, 57, 0.1)'
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <Wrench className="w-8 h-8" style={{ color: '#2D4B39' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                  {isNewService ? 'Nuevo Servicio' : 'Editar Servicio'}
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Título</label>
                  <input
                    value={editingService.title}
                    onChange={(e) => setEditingService({...editingService, title: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Título del servicio"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Descripción</label>
                  <textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                    className="w-full p-3 border rounded-lg h-24"
                    placeholder="Descripción del servicio"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Características (una por línea)</label>
                  <textarea
                    value={editingService.features.join('\n')}
                    onChange={(e) => setEditingService({...editingService, features: e.target.value.split('\n').filter(f => f.trim())})}
                    className="w-full p-3 border rounded-lg h-20"
                    placeholder="Característica 1&#10;Característica 2&#10;Característica 3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Color</label>
                  <select
                    value={editingService.color}
                    onChange={(e) => setEditingService({...editingService, color: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="#B8860B">Dorado</option>
                    <option value="#2D4B39">Verde</option>
                    <option value="#3B82F6">Azul</option>
                    <option value="#EF4444">Rojo</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowServiceDialog(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveService}
                  className="flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
                >
                  <Save className="w-4 h-4" />
                  {isNewService ? 'Crear Servicio' : 'Guardar Cambios'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}