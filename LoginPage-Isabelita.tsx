import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Loader2, Phone, MapPin, FileText, CreditCard } from 'lucide-react';
import { AdminTestButton } from '../AdminTestButton';
import { LoginDebug } from '../LoginDebug';
import { useApp } from '../../contexts/AppContext';
import { toast } from 'sonner@2.0.3';


interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const { loginUser, addUser } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    documentType: 'cedula',
    documentNumber: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        // Login usando el contexto local
        const user = loginUser(formData.email, formData.password);
        if (user) {
          onLoginSuccess();
        }
      } else {
        // Registro usando el contexto local
        const newUser = {
          id: Date.now(), // ID temporal
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          address: formData.address,
          documentType: formData.documentType,
          documentNumber: formData.documentNumber,
          role: 'Cliente' as const,
          orders: 0,
          status: true,
          joined: new Date().toISOString().split('T')[0]
        };
        
        addUser(newUser);
        onLoginSuccess();
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error('Error en la autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  // Generar partículas flotantes
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    color: i % 2 === 0 ? '#B8860B' : '#2D4B39'
  }));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* FONDO CON DEGRADADO */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF, rgba(224, 209, 192, 0.1), #FFFFFF)'
        }}
      />

      {/* CÍRCULO DORADO ANIMADO - TOP LEFT */}
      <motion.div
        className="absolute -top-32 -left-32 rounded-full"
        style={{
          width: '264px',
          height: '264px',
          backgroundColor: '#B8860B',
          filter: 'blur(80px)',
          opacity: 0.1
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* CÍRCULO VERDE ANIMADO - BOTTOM RIGHT */}
      <motion.div
        className="absolute -bottom-48 -right-48 rounded-full"
        style={{
          width: '384px',
          height: '384px',
          backgroundColor: '#2D4B39',
          filter: 'blur(100px)',
          opacity: 0.1
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, -40, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* PARTÍCULAS FLOTANTES */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: '1px',
            height: '1px',
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: 0.3
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 pt-8 pb-24">
        <div className="w-full max-w-md">
          {/* HEADER */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.h1
                key={isLogin ? 'login' : 'register'}
                className="font-elegant mb-4"
                style={{
                  color: '#2D4B39',
                  fontSize: 'clamp(3rem, 8vw, 4.5rem)',
                  lineHeight: 1.1
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isLogin ? 'Bienvenido' : 'Únete a Nudo Studio'}
              </motion.h1>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={isLogin ? 'login-sub' : 'register-sub'}
                className="text-lg"
                style={{ color: 'rgba(45, 75, 57, 0.7)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {isLogin 
                  ? 'Nos alegra verte de nuevo' 
                  : 'Crea tu cuenta y descubre el arte artesanal'}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* FORMULARIO */}
          <motion.div
            className="relative backdrop-blur-xl rounded-3xl p-8"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              border: '1px solid rgba(224, 209, 192, 0.5)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* ELEMENTO DECORATIVO - ESQUINA SUPERIOR IZQUIERDA */}
            <div
              className="absolute top-0 left-0 rounded-tl-3xl"
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, rgba(184, 134, 11, 0.1), transparent)',
                pointerEvents: 'none'
              }}
            />

            {/* ELEMENTO DECORATIVO - ESQUINA INFERIOR DERECHA */}
            <div
              className="absolute bottom-0 right-0 rounded-br-3xl"
              style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(315deg, rgba(45, 75, 57, 0.1), transparent)',
                pointerEvents: 'none'
              }}
            />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {/* CAMPO NOMBRE (solo en registro) */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" style={{ color: '#2D4B39' }} />
                      <span style={{ color: '#2D4B39' }}>Nombre Completo</span>
                    </label>
                    <motion.input
                      type="text"
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-full px-6 outline-none transition-all duration-300"
                      style={{
                        height: '48px',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        border: '2px solid #E0D1C0',
                        color: '#2D4B39'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#B8860B';
                        e.target.style.transform = 'scale(1.01)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#E0D1C0';
                        e.target.style.transform = 'scale(1)';
                      }}
                      required={!isLogin}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CAMPOS ADICIONALES PARA REGISTRO */}
              <AnimatePresence>
                {!isLogin && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="flex items-center gap-2 mb-2">
                        <Phone className="w-4 h-4" style={{ color: '#2D4B39' }} />
                        <span style={{ color: '#2D4B39' }}>Teléfono</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="300-123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-full px-6 outline-none transition-all duration-300"
                        style={{
                          height: '48px',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          border: '2px solid #E0D1C0',
                          color: '#2D4B39'
                        }}
                        required={!isLogin}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <label className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" style={{ color: '#2D4B39' }} />
                        <span style={{ color: '#2D4B39' }}>Dirección</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Calle 123 #45-67, Ciudad"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full rounded-full px-6 outline-none transition-all duration-300"
                        style={{
                          height: '48px',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          border: '2px solid #E0D1C0',
                          color: '#2D4B39'
                        }}
                        required={!isLogin}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <label className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4" style={{ color: '#2D4B39' }} />
                        <span style={{ color: '#2D4B39' }}>Tipo de Documento</span>
                      </label>
                      <select
                        value={formData.documentType}
                        onChange={(e) => setFormData({ ...formData, documentType: e.target.value })}
                        className="w-full rounded-full px-6 outline-none transition-all duration-300"
                        style={{
                          height: '48px',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          border: '2px solid #E0D1C0',
                          color: '#2D4B39'
                        }}
                        required={!isLogin}
                      >
                        <option value="cedula">Cédula de Ciudadanía</option>
                        <option value="tarjeta_identidad">Tarjeta de Identidad</option>
                        <option value="cedula_extranjeria">Cédula de Extranjería</option>
                      </select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <label className="flex items-center gap-2 mb-2">
                        <CreditCard className="w-4 h-4" style={{ color: '#2D4B39' }} />
                        <span style={{ color: '#2D4B39' }}>Número de Documento</span>
                      </label>
                      <input
                        type="text"
                        placeholder="1234567890"
                        value={formData.documentNumber}
                        onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                        className="w-full rounded-full px-6 outline-none transition-all duration-300"
                        style={{
                          height: '48px',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          border: '2px solid #E0D1C0',
                          color: '#2D4B39'
                        }}
                        required={!isLogin}
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* CAMPO EMAIL */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <label className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" style={{ color: '#2D4B39' }} />
                  <span style={{ color: '#2D4B39' }}>Correo Electrónico</span>
                </label>
                <motion.input
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-full px-6 outline-none transition-all duration-300"
                  style={{
                    height: '48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    border: '2px solid #E0D1C0',
                    color: '#2D4B39'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#B8860B';
                    e.target.style.transform = 'scale(1.01)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0D1C0';
                    e.target.style.transform = 'scale(1)';
                  }}
                  required
                />
              </motion.div>

              {/* CAMPO CONTRASEÑA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <label className="flex items-center gap-2 mb-2">
                  <Lock className="w-4 h-4" style={{ color: '#2D4B39' }} />
                  <span style={{ color: '#2D4B39' }}>Contraseña</span>
                </label>
                <motion.input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-full px-6 outline-none transition-all duration-300"
                  style={{
                    height: '48px',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    border: '2px solid #E0D1C0',
                    color: '#2D4B39'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#B8860B';
                    e.target.style.transform = 'scale(1.01)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E0D1C0';
                    e.target.style.transform = 'scale(1)';
                  }}
                  required
                />
              </motion.div>

              {/* OLVIDASTE CONTRASEÑA (solo en login) */}
              {isLogin && (
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <motion.button
                    type="button"
                    className="text-sm transition-all duration-300"
                    style={{ color: '#B8860B' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ¿Olvidaste tu contraseña?
                  </motion.button>
                </motion.div>
              )}

              {/* BOTÓN PRINCIPAL */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-300 overflow-hidden relative"
                style={{
                  backgroundColor: isLoading ? '#B8860B' : '#2D4B39',
                  color: '#FFFFFF'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                whileHover={{
                  scale: isLoading ? 1 : 1.02,
                  backgroundColor: '#B8860B',
                  boxShadow: '0 10px 30px rgba(45, 75, 57, 0.3)'
                }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Procesando...</span>
                  </>
                ) : (
                  <>
                    <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* TOGGLE LOGIN/REGISTRO */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
              {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
              {' '}
              <motion.button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="relative inline-block transition-all duration-300"
                style={{ color: '#2D4B39' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">
                  {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: '#B8860B' }}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </p>
          </motion.div>
          
          {/* BOTÓN DE PRUEBA ADMIN */}
          <div className="mt-6 text-center">
            <AdminTestButton onLoginSuccess={onLoginSuccess} />
          </div>
          
          {/* DEBUG */}
          <LoginDebug />
        </div>
      </div>
    </div>
  );
}