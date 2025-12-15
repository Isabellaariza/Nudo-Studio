import { motion } from 'framer-motion';
import { Scissors, Palette, GraduationCap, Package, Check, User, Mail, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    budget: '',
    timeline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Cotización enviada. Te contactaremos pronto.');
    setFormData({ name: '', email: '', phone: '', description: '', budget: '', timeline: '' });
  };

  const services = [
    {
      icon: Scissors,
      title: 'Confección a Medida',
      description: 'Creamos piezas personalizadas adaptadas a tus necesidades y estilo. Desde macramé decorativo hasta accesorios únicos, trabajamos contigo para dar vida a tu visión.',
      features: [
        'Consultoría personalizada',
        'Diseño exclusivo',
        'Materiales de alta calidad',
        'Entrega en tiempo estimado',
      ],
      color: '#B8860B',
      gradient: 'from-[#B8860B]/10 to-[#B8860B]/5',
    },
    {
      icon: Palette,
      title: 'Diseño Personalizado',
      description: 'Ofrecemos servicios de diseño donde colaboramos contigo para crear piezas que reflejen tu personalidad o complementen tu espacio perfectamente.',
      features: [
        'Asesoría de color y estilo',
        'Bocetos y propuestas',
        'Ajustes ilimitados',
        'Garantía de satisfacción',
      ],
      color: '#2D4B39',
      gradient: 'from-[#2D4B39]/10 to-[#2D4B39]/5',
    },
    {
      icon: GraduationCap,
      title: 'Talleres y Capacitaciones',
      description: 'Aprende el arte del macramé, anudado y tejido textil en nuestros talleres prácticos. Desde nivel principiante hasta avanzado, te guiamos en cada paso.',
      features: [
        'Grupos reducidos',
        'Materiales incluidos',
        'Certificado de participación',
        'Acceso a comunidad',
      ],
      cta: 'Ver Talleres',
      ctaAction: () => onNavigate('workshops'),
      color: '#B8860B',
      gradient: 'from-[#B8860B]/10 to-[#B8860B]/5',
    },
    {
      icon: Package,
      title: 'Kits para Hacer en Casa',
      description: 'Te enviamos todo lo que necesitas para crear tu propia pieza de macramé en casa, con instrucciones detalladas paso a paso y acceso a tutoriales en video.',
      features: [
        'Materiales premium incluidos',
        'Instrucciones detalladas',
        'Videos tutoriales',
        'Soporte online',
      ],
      color: '#2D4B39',
      gradient: 'from-[#2D4B39]/10 to-[#2D4B39]/5',
    },
  ];

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 bg-gradient-to-br from-white via-[#E0D1C0]/10 to-white relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        className="absolute top-40 left-10 rounded-full opacity-5 blur-[48px]"
        style={{ 
          backgroundColor: '#B8860B',
          width: '288px',
          height: '288px'
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 right-10 rounded-full opacity-5 blur-[48px]"
        style={{ 
          backgroundColor: '#2D4B39',
          width: '384px',
          height: '384px'
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 
            className="font-elegant text-[4rem] md:text-[5rem] tracking-wide mb-4" 
            style={{ color: '#2D4B39' }}
          >
            Nuestros Servicios
          </h1>
          <motion.p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'rgba(45, 75, 57, 0.7)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Ofrecemos una gama completa de servicios relacionados con el arte del anudado 
            y tejido textil, desde creación personalizada hasta formación
          </motion.p>
        </motion.div>

        {/* Services Grid - 2x2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`bg-gradient-to-br ${service.gradient} backdrop-blur-xl rounded-[2.5rem] p-8 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group`}
            >
              {/* Decorative corner circle */}
              <div 
                className="absolute top-0 right-0 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"
                style={{
                  width: '160px',
                  height: '160px',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }}
              />
              
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
                  <service.icon className="w-10 h-10 text-white" />
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
                  {service.features.map((feature, i) => (
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

                {service.cta && service.ctaAction && (
                  <motion.button
                    onClick={service.ctaAction}
                    className="px-8 py-4 text-white tracking-wide transition-all rounded-full overflow-hidden relative group/btn"
                    style={{ backgroundColor: service.color }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 10px 30px ${service.color}40`
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {service.cta}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                    <motion.div
                      className="absolute inset-0"
                      style={{ backgroundColor: '#2D4B39' }}
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Section with Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20 relative overflow-hidden rounded-[2.5rem]"
          style={{
            background: 'linear-gradient(135deg, #2D4B39 0%, #1e3326 100%)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Decorative elements */}
          <div 
            className="absolute top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '256px',
              height: '256px',
              backgroundColor: 'rgba(184, 134, 11, 0.2)',
              filter: 'blur(48px)'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 rounded-full translate-x-1/2 translate-y-1/2"
            style={{
              width: '256px',
              height: '256px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              filter: 'blur(48px)'
            }}
          />
          
          <div className="relative z-10 py-8 px-8 md:py-24 md:px-12">
            {/* Header */}
            <div className="text-center mb-8 max-w-2xl mx-auto">
              <h2 
                className="font-elegant tracking-wide mb-4 text-white text-[2.5rem] md:text-[3.5rem]"
              >
                Solicita tu Cotización
              </h2>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Cuéntanos sobre tu proyecto y te enviaremos una cotización personalizada
              </p>
            </div>

            {/* Quote Form */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              {/* Nombre y Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre con ícono */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-white font-medium drop-shadow-sm">
                    <User className="w-4 h-4" />
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-full border text-white placeholder-white/60 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#B8860B'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  />
                </div>

                {/* Email con ícono */}
                <div>
                  <label className="flex items-center gap-2 mb-2 text-white font-medium drop-shadow-sm">
                    <Mail className="w-4 h-4" />
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-full border text-white placeholder-white/60 focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#B8860B'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  />
                </div>
              </div>

              {/* Teléfono full width */}
              <div>
                <label className="block mb-2 text-white font-medium drop-shadow-sm">
                  Teléfono
                </label>
                <input
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-full border text-white placeholder-white/60 focus:outline-none transition-colors"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#B8860B'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                />
              </div>

              {/* Descripción con ícono */}
              <div>
                <label className="flex items-center gap-2 mb-2 text-white font-medium drop-shadow-sm">
                  <MessageSquare className="w-4 h-4" />
                  Descripción del Proyecto *
                </label>
                <textarea
                  placeholder="Describe tu proyecto: tamaño, colores, estilo, uso previsto, etc."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border text-white placeholder-white/60 focus:outline-none transition-colors resize-none"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#B8860B'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                />
              </div>

              {/* Presupuesto y Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Presupuesto */}
                <div>
                  <label className="block mb-2 text-white font-medium drop-shadow-sm">
                    Presupuesto Estimado
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-full border focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: formData.budget ? 'white' : 'rgba(255, 255, 255, 0.6)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#B8860B'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  >
                    <option value="" disabled style={{ color: 'black' }}>Presupuesto estimado</option>
                    <option value="50-100" style={{ color: 'black' }}>$50,000-$100,000 COP</option>
                    <option value="100-200" style={{ color: 'black' }}>$100,000-$200,000 COP</option>
                    <option value="200-500" style={{ color: 'black' }}>$200,000-$500,000 COP</option>
                    <option value="500+" style={{ color: 'black' }}>Más de $500,000 COP</option>
                    <option value="consultar" style={{ color: 'black' }}>Prefiero consultar</option>
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block mb-2 text-white font-medium drop-shadow-sm">
                    Tiempo de Entrega
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3 rounded-full border focus:outline-none transition-colors"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      color: formData.timeline ? 'white' : 'rgba(255, 255, 255, 0.6)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#B8860B'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                  >
                    <option value="" disabled style={{ color: 'black' }}>Tiempo de entrega</option>
                    <option value="1-2weeks" style={{ color: 'black' }}>1-2 semanas</option>
                    <option value="3-4weeks" style={{ color: 'black' }}>3-4 semanas</option>
                    <option value="1-2months" style={{ color: 'black' }}>1-2 meses</option>
                    <option value="flexible" style={{ color: 'black' }}>Flexible</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full py-4 px-8 text-white tracking-wide rounded-full overflow-hidden relative group flex items-center justify-center gap-2"
                style={{ backgroundColor: '#B8860B' }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 30px rgba(184, 134, 11, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-5 h-5" />
                <span className="relative z-10">Solicitar Cotización</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="rounded-[2.5rem] p-4 md:p-6"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h2 
            className="font-elegant text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wide mb-8 md:mb-12 text-center" 
            style={{ color: '#2D4B39' }}
          >
            ¿Por Qué Elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: 1, title: 'Experiencia', desc: 'Años de experiencia en artesanía textil y diseño personalizado' },
              { num: 2, title: 'Calidad', desc: 'Utilizamos solo materiales de la más alta calidad en cada proyecto' },
              { num: 3, title: 'Compromiso', desc: 'Dedicación absoluta a la satisfacción de nuestros clientes' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div 
                  className="rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ 
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#B8860B'
                  }}
                >
                  <span className="text-white text-xl">{item.num}</span>
                </div>
                <h3 
                  className="tracking-wide mb-2" 
                  style={{ color: '#2D4B39' }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: 'rgba(45, 75, 57, 0.7)' }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}