import { Instagram, Facebook, Mail, Phone, MapPin, Heart, ArrowUp, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer 
        className="py-16 px-8"
        style={{ backgroundColor: '#2D4B39' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Main Grid - 4 columnas iguales */}
          <div className="grid grid-cols-4 gap-20 mb-12">
            {/* COLUMNA 1 - LOGO Y UBICACIÓN (25%) */}
            <div className="text-left">
              <div className="flex items-baseline gap-3 justify-start mb-4">
                <span 
                  className="font-elegant text-2xl"
                  style={{ 
                    color: '#FFFFFF',
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
                    className="text-xs uppercase pl-3"
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      letterSpacing: '0.3em'
                    }}
                  >
                    Studio
                  </span>
                </div>
              </div>
              
              <p 
                className="text-base leading-relaxed mb-6"
                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
              >
                Creamos piezas únicas de macramé y tejido textil que transforman espacios 
                y abrazan la tradición artesanal con un toque contemporáneo.
              </p>
              
              <div className="flex items-start gap-2">
                <MapPin 
                  className="w-5 h-5 flex-shrink-0 mt-1" 
                  style={{ color: '#B8860B' }} 
                />
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                >
                  Carrera 70 #45-32, Medellín, Colombia
                </p>
              </div>
            </div>

            {/* COLUMNA 2 - CATEGORÍAS (25%) */}
            <div className="text-left">
              <h4 
                className="font-elegant text-xl mb-6"
                style={{ color: '#B8860B' }}
              >
                Categorías
              </h4>
              
              <div className="space-y-3">
                <a 
                  href="#"
                  className="block hover:opacity-100 transition-opacity"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Macramé
                </a>
                <a 
                  href="#"
                  className="block hover:opacity-100 transition-opacity"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Joyería
                </a>
                <a 
                  href="#"
                  className="block hover:opacity-100 transition-opacity"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Accesorios
                </a>
                <a 
                  href="#"
                  className="block hover:opacity-100 transition-opacity"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  Decoración
                </a>
              </div>
            </div>

            {/* COLUMNA 3 - CONTACTO (25%) */}
            <div className="text-left">
              <h4 
                className="font-elegant text-xl mb-6"
                style={{ color: '#B8860B' }}
              >
                Contacto
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2 justify-start">
                  <Phone 
                    className="w-5 h-5 flex-shrink-0" 
                    style={{ color: '#B8860B' }} 
                  />
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    +57 (4) 123-4567
                  </span>
                </div>
                
                <div className="flex items-center gap-2 justify-start">
                  <MessageCircle 
                    className="w-5 h-5 flex-shrink-0" 
                    style={{ color: '#B8860B' }} 
                  />
                  <a 
                    href="https://wa.me/573001234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-100 transition-opacity"
                    style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    WhatsApp
                  </a>
                </div>
                
                <div className="flex items-center gap-2 justify-start">
                  <Mail 
                    className="w-5 h-5 flex-shrink-0" 
                    style={{ color: '#B8860B' }} 
                  />
                  <a 
                    href="mailto:hola@nudostudio.com"
                    className="hover:opacity-100 transition-opacity"
                    style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    hola@nudostudio.com
                  </a>
                </div>
              </div>
            </div>

            {/* COLUMNA 4 - REDES SOCIALES (25%) */}
            <div className="text-left">
              <h4 
                className="font-elegant text-xl mb-6"
                style={{ color: '#B8860B' }}
              >
                Síguenos
              </h4>
              
              <div className="space-y-3">
                <a 
                  href="#"
                  className="flex items-center gap-2 justify-start hover:opacity-100 transition-opacity"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                
                <a 
                  href="#"
                  className="flex items-center gap-2 justify-start hover:opacity-100 transition-opacity"
                  style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <Facebook className="w-5 h-5" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* SEPARADOR */}
          <div 
            className="h-[1px] my-12"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          />

          {/* COPYRIGHT - Vertical */}
          <div className="flex flex-col items-center gap-4">
            <p 
              className="flex items-center gap-2"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              © 2025 Nudo Studio. Hecho con 
              <Heart 
                className="w-4 h-4" 
                style={{ color: '#B8860B' }} 
                fill="#B8860B"
              /> 
              en Medellín, Colombia
            </p>
            
            <div className="flex items-center gap-4 text-sm">
              <a 
                href="#"
                className="hover:opacity-100 transition-opacity"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                Política de Privacidad
              </a>
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>|</span>
              <a 
                href="#"
                className="hover:opacity-100 transition-opacity"
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* BOTÓN SCROLL TO TOP */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center z-50"
          style={{ backgroundColor: '#B8860B' }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUp className="w-6 h-6" style={{ color: '#FFFFFF' }} />
        </motion.button>
      )}
    </>
  );
}