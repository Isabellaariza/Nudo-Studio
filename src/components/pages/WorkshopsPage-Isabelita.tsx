import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, DollarSign, MapPin, User, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';

interface WorkshopsPageProps {
  onNavigate: (page: string) => void;
  user?: { name: string; email: string; role: string } | null;
}

export function WorkshopsPage({ onNavigate, user }: WorkshopsPageProps) {
  const { workshops, enrollInWorkshop, currentUser, updateUser } = useApp();
  const activeUser = currentUser || user;
  
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState({
    name: '',
    email: '',
    phone: '',
    documentType: 'CC',
    documentNumber: '',
    experience: 'principiante',
    specialRequests: '',
    paymentProof: ''
  });

  // Actualizar enrollmentData cuando activeUser cambie
  useEffect(() => {
    if (activeUser) {
      setEnrollmentData(prev => ({
        ...prev,
        name: activeUser.name || '',
        email: activeUser.email || ''
      }));
    }
  }, [activeUser]);

  // Si no hay talleres en AppContext, usar datos por defecto
  const defaultWorkshops: any[] = [
    {
      id: 1,
      title: 'Macramé Básico para Principiantes',
      description: 'Aprende las técnicas fundamentales del macramé y crea tu primera pieza decorativa.',
      longDescription: 'En este taller aprenderás los nudos básicos del macramé, técnicas de medición y planificación, y crearás un hermoso colgante para plantas. Perfecto para quienes nunca han trabajado con esta técnica.',
      date: '2025-02-05',
      time: '10:00 AM',
      duration: '6 horas',
      price: 90000,
      originalPrice: 120000,
      availableSpots: 0,
      totalSpots: 12,
      instructor: 'Isabella Ariza',
      location: 'Taller Principal - Medellín',
      image: 'https://images.unsplash.com/photo-1632761644913-0da6105863cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwd2FsbCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYyNDU5NzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      level: 'Principiante',
      materials: ['Cuerda de algodón', 'Aro de madera', 'Tijeras', 'Cinta métrica'],
      requirements: ['No se requiere experiencia previa', 'Traer delantal o ropa cómoda'],
      category: 'Macramé'
    },
    {
      id: 2,
      title: 'Joyería Textil Avanzado',
      description: 'Crea piezas únicas de joyería combinando técnicas textiles con elementos modernos.',
      longDescription: 'Taller especializado donde combinaremos hilos, cuentas y elementos metálicos para crear collares, pulseras y aretes únicos. Aprenderás técnicas avanzadas de tejido y acabados profesionales.',
      date: '2025-02-12',
      time: '2:00 PM',
      duration: '4 horas',
      price: 95000,
      availableSpots: 6,
      totalSpots: 10,
      instructor: 'Carlos Mendoza',
      location: 'Estudio de Diseño - Bogotá',
      image: 'https://images.unsplash.com/photo-1761721133695-e7558dce99c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGUlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjQ2Nzg1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      level: 'Avanzado',
      materials: ['Hilos especializados', 'Cuentas de vidrio', 'Elementos metálicos', 'Herramientas de joyería'],
      requirements: ['Experiencia básica en tejido', 'Conocimiento de nudos básicos'],
      category: 'Joyería'
    },
    {
      id: 3,
      title: 'Tapices Decorativos',
      description: 'Diseña y teje tapices únicos para decorar cualquier espacio de tu hogar.',
      longDescription: 'Aprende a crear tapices decorativos desde el diseño hasta el acabado final. Trabajaremos con diferentes texturas, colores y técnicas para lograr piezas artísticas únicas.',
      date: '2025-02-19',
      time: '9:00 AM',
      duration: '8 horas',
      price: 150000,
      originalPrice: 180000,
      availableSpots: 8,
      totalSpots: 15,
      instructor: 'Ana García',
      location: 'Taller Principal - Medellín',
      image: 'https://images.unsplash.com/photo-1599143684839-a0af1fe2fdf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwZmliZXIlMjB0ZXh0dXJlfGVufDF8fHx8MTc2MjM5MzY1OXww&ixlib=rb-4.1.0&q=80&w=1080',
      level: 'Intermedio',
      materials: ['Telar portátil', 'Lanas naturales', 'Hilos de colores', 'Peines de telar'],
      requirements: ['Conocimientos básicos de tejido', 'Paciencia para trabajos detallados'],
      category: 'Tapices'
    },
    {
      id: 4,
      title: 'Macramé Navideño',
      description: 'Crea decoraciones navideñas únicas con técnicas de macramé tradicional.',
      longDescription: 'Taller especial para la temporada navideña donde aprenderás a crear adornos, guirnaldas y decoraciones festivas usando técnicas de macramé. Perfecto para regalar o decorar tu hogar.',
      date: '2025-02-26',
      time: '3:00 PM',
      duration: '5 horas',
      price: 75000,
      availableSpots: 12,
      totalSpots: 20,
      instructor: 'Isabella Ariza',
      location: 'Taller Principal - Medellín',
      image: 'https://images.unsplash.com/photo-1632761644913-0da6105863cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGUlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjQ2Nzg1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      level: 'Principiante',
      materials: ['Cuerdas doradas y plateadas', 'Adornos navideños', 'Cintas decorativas'],
      requirements: ['No se requiere experiencia', 'Espíritu navideño'],
      category: 'Temporada'
    }
  ];

  const handleEnroll = (workshop: any) => {
    if (!activeUser) {
      toast.error('Debes iniciar sesión para inscribirte a un taller');
      onNavigate('login');
      return;
    }
    setSelectedWorkshop(workshop);
    setShowEnrollModal(true);
  };

  const handleSubmitEnrollment = () => {
    if (!enrollmentData.name || !enrollmentData.email || !enrollmentData.phone || !enrollmentData.documentNumber || !enrollmentData.paymentProof) {
      toast.error('Por favor completa todos los campos requeridos, incluyendo el comprobante de pago');
      return;
    }
    
    if (!activeUser || !selectedWorkshop) {
      toast.error('Error al procesar la inscripción');
      return;
    }

    // Llamar a enrollInWorkshop de AppContext
    enrollInWorkshop(activeUser.id, selectedWorkshop.id, {
      name: enrollmentData.name,
      email: enrollmentData.email,
      phone: enrollmentData.phone,
      documentType: enrollmentData.documentType,
      documentNumber: enrollmentData.documentNumber,
      experience: enrollmentData.experience,
      specialRequests: enrollmentData.specialRequests,
      paymentProof: enrollmentData.paymentProof
    });

    // Si el usuario no es "Estudiante", actualizar su rol
    if (activeUser.role !== 'Estudiante' && currentUser) {
      updateUser(activeUser.id, { ...activeUser, role: 'Estudiante' });
    }

    toast.success(`¡Te has inscrito exitosamente al taller "${selectedWorkshop?.title}"!`);
    setShowEnrollModal(false);
    setEnrollmentData({
      name: activeUser?.name || '',
      email: activeUser?.email || '',
      phone: '',
      documentType: 'CC',
      documentNumber: '',
      experience: 'principiante',
      specialRequests: '',
      paymentProof: ''
    });
  };

  const handlePaymentProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEnrollmentData({...enrollmentData, paymentProof: reader.result as string});
        toast.success('Comprobante de pago cargado');
      };
      reader.readAsDataURL(file);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* HEADER */}
      <div className="pt-8 pb-12 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="font-elegant text-[5rem] mb-6"
            style={{ 
              color: '#2D4B39',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Talleres
          </motion.h1>
          
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: 'rgba(45, 75, 57, 0.7)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Aprende nuevas técnicas y perfecciona tus habilidades en nuestros talleres especializados
          </motion.p>
        </div>
      </div>

      {/* TALLERES */}
      <div className="pb-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {((workshops && workshops.length > 0 ? workshops : defaultWorkshops)).map((workshop: any, index: number) => (
              <motion.div
                key={workshop.id}
                className="group cursor-pointer relative overflow-hidden bg-white rounded-3xl"
                style={{
                  boxShadow: '0 10px 40px rgba(45, 75, 57, 0.12)',
                  border: '2px solid rgba(224, 209, 192, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 60px rgba(45, 75, 57, 0.25)',
                  borderColor: 'rgba(184, 134, 11, 0.5)',
                  transition: { duration: 0.3 }
                }}
                onClick={() => handleEnroll(workshop)}
              >
                {/* BORDE SUPERIOR DECORATIVO */}
                <div 
                  className="h-2 w-full"
                  style={{
                    background: 'linear-gradient(90deg, #2D4B39 0%, #B8860B 50%, #2D4B39 100%)'
                  }}
                />

                {/* CONTENIDO */}
                <div className="p-8">
                  {/* BADGE DE NIVEL */}
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide"
                      style={{
                        backgroundColor: workshop.level === 'Principiante' ? '#D1FAE5' : workshop.level === 'Intermedio' ? '#FEF3C7' : '#FEE2E2',
                        color: workshop.level === 'Principiante' ? '#047857' : workshop.level === 'Intermedio' ? '#92400E' : '#991B1B'
                      }}
                    >
                      {workshop.level}
                    </span>
                    <span 
                      className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                        workshop.availableSpots === 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {workshop.availableSpots === 0 ? 'Agotado' : `${workshop.availableSpots} cupos`}
                    </span>
                  </div>

                  {/* CATEGORÍA */}
                  <p className="text-xs font-medium mb-3" style={{ color: '#B8860B', letterSpacing: '0.05em' }}>
                    {workshop.category}
                  </p>

                  {/* TÍTULO */}
                  <h3 
                    className="font-elegant text-2xl mb-3 leading-tight group-hover:text-[#B8860B] transition-colors duration-300"
                    style={{ color: '#2D4B39' }}
                  >
                    {workshop.title}
                  </h3>

                  {/* DESCRIPCIÓN */}
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: '#6B7280' }}>
                    {workshop.longDescription || workshop.description}
                  </p>

                  {/* INFO GRID */}
                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(184, 134, 11, 0.1)' }}>
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: '#B8860B' }}>FECHA</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" style={{ color: '#2D4B39' }} />
                        <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>
                          {new Date(workshop.date).toLocaleDateString('es-ES', { 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: '#B8860B' }}>HORA</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" style={{ color: '#2D4B39' }} />
                        <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>
                          {workshop.time}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: '#B8860B' }}>DURACIÓN</p>
                      <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>
                        {workshop.duration}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1" style={{ color: '#B8860B' }}>INSTRUCTOR</p>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" style={{ color: '#2D4B39' }} />
                        <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>
                          {workshop.instructor}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BARRA DE CUPOS */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium" style={{ color: '#6B7280' }}>DISPONIBILIDAD</span>
                      <span className="text-xs font-bold" style={{ color: '#B8860B' }}>
                        {workshop.availableSpots}/{workshop.totalSpots}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full rounded-full"
                        style={{ 
                          background: 'linear-gradient(90deg, #2D4B39 0%, #B8860B 100%)',
                          boxShadow: '0 0 12px rgba(184, 134, 11, 0.4)'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${((workshop.totalSpots - workshop.availableSpots) / workshop.totalSpots) * 100}%` }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      />
                    </div>
                  </div>

                  {/* PRECIO Y BOTÓN */}
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      {workshop.originalPrice && (
                        <p className="text-xs text-gray-400 line-through mb-1">
                          ${workshop.originalPrice.toLocaleString()}
                        </p>
                      )}
                      <p className="text-2xl font-bold" style={{ color: '#B8860B' }}>
                        ${workshop.price.toLocaleString('es-CO')}
                      </p>
                      <p className="text-xs mt-1" style={{ color: '#6B7280' }}>COP</p>
                    </div>
                    
                    <motion.button
                      disabled={workshop.availableSpots === 0}
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        workshop.availableSpots === 0 
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'text-white hover:scale-105'
                      }`}
                      style={{
                        background: workshop.availableSpots === 0 ? undefined : 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                        boxShadow: workshop.availableSpots > 0 ? '0 8px 20px rgba(45, 75, 57, 0.3)' : 'none'
                      }}
                      whileHover={workshop.availableSpots > 0 ? { scale: 1.05 } : {}}
                      whileTap={workshop.availableSpots > 0 ? { scale: 0.95 } : {}}
                    >
                      {workshop.availableSpots === 0 ? 'Agotado' : (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Inscribirse
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL DE INSCRIPCIÓN */}
      <AnimatePresence>
        {showEnrollModal && selectedWorkshop && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEnrollModal(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#2D4B39' }}
                >
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: '#2D4B39' }}>
                    Inscripción al Taller
                  </h3>
                  <p className="text-sm text-gray-600">{selectedWorkshop.title}</p>
                </div>
              </div>

              {/* Información del taller */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Fecha:</span>
                    <p className="font-medium">{new Date(selectedWorkshop.date).toLocaleDateString('es-ES')}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Hora:</span>
                    <p className="font-medium">{selectedWorkshop.time}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Duración:</span>
                    <p className="font-medium">{selectedWorkshop.duration}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Precio:</span>
                    <p className="font-bold text-lg" style={{ color: '#B8860B' }}>
                      ${selectedWorkshop.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Formulario */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={enrollmentData.name}
                    onChange={(e) => setEnrollmentData({...enrollmentData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Documento *
                    </label>
                    <select
                      value={enrollmentData.documentType}
                      onChange={(e) => setEnrollmentData({...enrollmentData, documentType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                      required
                    >
                      <option value="CC">Cédula de Ciudadanía</option>
                      <option value="CE">Cédula de Extranjería</option>
                      <option value="TI">Tarjeta de Identidad</option>
                      <option value="PA">Pasaporte</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Documento *
                    </label>
                    <input
                      type="text"
                      value={enrollmentData.documentNumber}
                      onChange={(e) => setEnrollmentData({...enrollmentData, documentNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                      placeholder="1234567890"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={enrollmentData.email}
                      onChange={(e) => setEnrollmentData({...enrollmentData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Celular *
                    </label>
                    <input
                      type="tel"
                      value={enrollmentData.phone}
                      onChange={(e) => setEnrollmentData({...enrollmentData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                      placeholder="300 123 4567"
                      required
                    />
                  </div>
                </div>

                {/* Comprobante de Pago */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comprobante de Pago * (Obligatorio)
                  </label>
                  <div className="mt-2">
                    <label
                      htmlFor="paymentProof"
                      className={`flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                        enrollmentData.paymentProof 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-300 hover:border-[#2D4B39]'
                      }`}
                    >
                      {enrollmentData.paymentProof ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-green-600">Comprobante cargado</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm text-gray-600">Subir comprobante de pago</span>
                        </>
                      )}
                    </label>
                    <input
                      id="paymentProof"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handlePaymentProofUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Sin el comprobante de pago no se puede completar la inscripción
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nivel de experiencia (opcional)
                  </label>
                  <select
                    value={enrollmentData.experience}
                    onChange={(e) => setEnrollmentData({...enrollmentData, experience: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                  >
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Solicitudes especiales (opcional)
                  </label>
                  <textarea
                    value={enrollmentData.specialRequests}
                    onChange={(e) => setEnrollmentData({...enrollmentData, specialRequests: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                    placeholder="Alergias, necesidades especiales, etc."
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowEnrollModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <motion.button
                  onClick={handleSubmitEnrollment}
                  className="flex-1 px-6 py-3 text-white rounded-lg font-medium transition-colors"
                  style={{ backgroundColor: '#2D4B39' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Confirmar Inscripción
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}