import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onExplore?: () => void;
}

export function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background - Marfil claro y luminoso */}
      <div className="absolute inset-0 bg-[#F5F3EE]">
        {/* Gradiente base para profundidad luminosa */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#F5F3EE] to-[#F0EDE6]" />

        {/* Ondas/formas fluidas verdes - MUY sutiles, translúcidas, como velos */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Filtros para crear efecto etéreo y orgánico */}
            <filter id="etherealBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="100" />
            </filter>
            <filter id="softBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
            </filter>
            
            {/* Gradientes verdes sutiles y translúcidos pero visibles */}
            <linearGradient id="greenVeil1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8C5A8" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#B5D1B5" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#C8D8C8" stopOpacity="0.15" />
            </linearGradient>
            
            <linearGradient id="greenVeil2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9BC09B" stopOpacity="0.28" />
              <stop offset="50%" stopColor="#B0CCB0" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#C5D9C5" stopOpacity="0.12" />
            </linearGradient>
            
            <linearGradient id="greenVeil3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#A0C5A0" stopOpacity="0.32" />
              <stop offset="50%" stopColor="#B8D2B8" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D0E0D0" stopOpacity="0.14" />
            </linearGradient>
            
            <linearGradient id="greenVeil4" x1="30%" y1="70%" x2="70%" y2="30%">
              <stop offset="0%" stopColor="#95BD95" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#AECFAE" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#CADACA" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Velo verde superior derecha - forma fluida y orgánica */}
          <path
            d="M1200,-50 Q1500,50 1700,150 Q1900,250 2000,400 Q2100,550 1950,700 Q1800,850 1600,800 Q1400,750 1250,650 Q1100,550 1050,400 Q1000,250 1100,100 Q1200,0 1200,-50 Z"
            fill="url(#greenVeil1)"
            filter="url(#etherealBlur)"
          />
          
          {/* Velo verde izquierda media - forma suave y delicada */}
          <path
            d="M-100,300 Q100,250 300,320 Q500,390 650,340 Q800,290 850,450 Q900,610 750,700 Q600,790 400,740 Q200,690 50,600 Q-100,510 -100,400 Z"
            fill="url(#greenVeil2)"
            filter="url(#softBlur)"
          />
          
          {/* Velo verde central - forma etérea grande */}
          <path
            d="M400,400 Q700,350 1000,450 Q1300,550 1500,480 Q1700,410 1800,600 Q1900,790 1650,900 Q1400,1010 1100,950 Q800,890 600,800 Q400,710 300,550 Q200,390 400,400 Z"
            fill="url(#greenVeil3)"
            filter="url(#etherealBlur)"
            opacity="0.8"
          />
          
          {/* Velo verde inferior - forma ondulante */}
          <path
            d="M-100,850 Q200,800 500,880 Q800,960 1100,900 Q1400,840 1700,920 Q2000,1000 2000,1080 L-100,1080 Z"
            fill="url(#greenVeil4)"
            filter="url(#softBlur)"
          />
          
          {/* Acento verde superior izquierda - pequeño y sutil */}
          <ellipse
            cx="250"
            cy="200"
            rx="300"
            ry="200"
            fill="url(#greenVeil2)"
            filter="url(#etherealBlur)"
            opacity="0.5"
          />
        </svg>

        {/* Overlay luminoso muy sutil para mayor sofisticación */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/6 via-white/2 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mb-8"
        >
          {/* Título Principal - NUDO con STUDIO debajo */}
          <div className="relative inline-block">
            {/* NUDO - Serif moderna y elegante */}
            <h1 
              className="text-[4.5rem] sm:text-[6rem] lg:text-[8rem]"
              style={{ 
                color: '#3F5243', 
                fontFamily: "'Playfair Display', 'Lora', 'Cormorant Garamond', serif",
                fontWeight: 500,
                letterSpacing: '0.1em',
                lineHeight: 0.9
              }}
            >
              NUDO
            </h1>
            
            {/* STUDIO - Sans-serif muy fina y minimalista, mucho más pequeña, centrada */}
            <div className="flex justify-center mt-1 sm:mt-2 lg:mt-3">
              <h2 
                className="text-[1.1rem] sm:text-[1.5rem] lg:text-[2rem]"
                style={{ 
                  color: '#5A6D5E', 
                  fontFamily: "'Montserrat', 'Lato', 'Open Sans', sans-serif",
                  fontWeight: 300,
                  letterSpacing: '0.5em',
                  lineHeight: 1
                }}
              >
                STUDIO
              </h2>
            </div>
          </div>
        </motion.div>

        {/* Texto Secundario - Sans-serif limpia en gris verdoso */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-base sm:text-lg lg:text-xl mb-12 max-w-2xl"
          style={{ 
            color: '#6B7C6E',
            fontFamily: "'Inter', 'Lato', 'Open Sans', sans-serif",
            fontWeight: 300,
            letterSpacing: '0.02em'
          }}
        >
          Artesanía textil que entrelaza tradición y modernidad
        </motion.p>

        {/* Botón EXPLORAR COLECCIÓN */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(45, 75, 57, 0.2)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onExplore}
          className="px-12 py-4 rounded-full transition-all relative overflow-hidden group"
          style={{ 
            backgroundColor: '#2D4B39',
            color: 'white',
            fontFamily: "'Montserrat', 'Lato', sans-serif",
            fontWeight: 400,
            letterSpacing: '0.15em',
            fontSize: '0.875rem'
          }}
        >
          <span className="relative z-10">EXPLORAR COLECCIÓN</span>
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: '#3F5243' }}
            initial={{ x: '-100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        {/* Indicador de scroll - chevron animado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown 
              className="w-8 h-8" 
              style={{ color: '#5A6D5E', opacity: 0.5 }} 
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
