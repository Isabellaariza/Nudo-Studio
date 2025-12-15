export * from "./BlogPage";
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Nuevas Técnicas de Macramé Contemporáneo',
      excerpt: 'Descubre las últimas tendencias en macramé que fusionan tradición con innovación moderna, creando piezas únicas y versátiles.',
      date: '15 de Octubre, 2024',
      image: 'https://images.unsplash.com/photo-1632761644913-0da6105863cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwd2FsbCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYyNDU5NzIxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Técnicas'
    },
    {
      id: '2',
      title: 'Taller Especial: Joyería Textil',
      excerpt: 'Aprende a crear tus propias piezas de joyería textil en nuestro próximo taller. Cupos limitados para una experiencia personalizada.',
      date: '8 de Octubre, 2024',
      image: 'https://images.unsplash.com/photo-1761721133695-e7558dce99c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHRleHRpbGUlMjBqZXdlbHJ5fGVufDF8fHx8MTc2MjQ2Nzg1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Talleres'
    },
    {
      id: '3',
      title: 'Materiales Sostenibles en Nuestras Creaciones',
      excerpt: 'Conoce nuestro compromiso con el medio ambiente y los materiales ecológicos que utilizamos en cada una de nuestras piezas.',
      date: '1 de Octubre, 2024',
      image: 'https://images.unsplash.com/photo-1756374190688-a75e7bfd2c64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMG5hdHVyYWwlMjBtYXRlcmlhbHN8ZW58MXx8fHwxNzYyNDY3ODUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Sostenibilidad'
    },
    {
      id: '4',
      title: 'Exposición de Arte Textil en Medellín',
      excerpt: 'Te invitamos a nuestra primera exposición de arte textil donde presentaremos colecciones exclusivas y piezas colaborativas.',
      date: '25 de Septiembre, 2024',
      image: 'https://images.unsplash.com/photo-1758800366458-52987cd08583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwYXJ0JTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NjI0Njc4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Eventos'
    },
    {
      id: '5',
      title: 'Inspiración: Texturas y Colores Naturales',
      excerpt: 'Exploramos cómo la naturaleza influencia nuestras paletas de colores y las texturas que incorporamos en cada diseño artesanal.',
      date: '18 de Septiembre, 2024',
      image: 'https://images.unsplash.com/photo-1599143684839-a0af1fe2fdf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwZmliZXIlMjB0ZXh0dXJlfGVufDF8fHx8MTc2MjM5MzY1OXww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Inspiración'
    },
    {
      id: '6',
      title: 'Detrás de Escena: Proceso Creativo',
      excerpt: 'Un vistazo íntimo a nuestro proceso creativo, desde el concepto inicial hasta la pieza final que llega a tus manos.',
      date: '10 de Septiembre, 2024',
      image: 'https://images.unsplash.com/photo-1711006777187-2c991e1b90b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY3JhZnRpbmclMjBoYW5kc3xlbnwxfHx8fDE3NjI0Njc4NTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Proceso'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* HEADER */}
      <div className="pt-8 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="font-elegant mb-6"
            style={{ 
              color: '#2D4B39',
              fontSize: 'clamp(3rem, 8vw, 4rem)',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Novedades
          </motion.h1>
          
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: 'rgba(45, 75, 57, 0.7)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Mantente al día con nuestras últimas creaciones, eventos y noticias
          </motion.p>
        </div>
      </div>

      {/* GRID DE ARTÍCULOS */}
      <div className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group cursor-pointer backdrop-blur-xl p-4"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '1.5rem',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  transition: { duration: 0.3 }
                }}
              >
                {/* IMAGEN */}
                <div 
                  className="relative overflow-hidden rounded-xl mb-4" 
                  style={{ 
                    aspectRatio: '16/10',
                    backgroundColor: 'rgba(224, 209, 192, 0.2)'
                  }}
                >
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* OVERLAY EN HOVER */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ backgroundColor: '#2D4B39' }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* CONTENIDO */}
                <div>
                  {/* FECHA */}
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-3.5 h-3.5" style={{ color: '#B8860B' }} />
                    <span className="text-xs" style={{ color: '#B8860B' }}>
                      {post.date}
                    </span>
                  </div>

                  {/* TÍTULO */}
                  <h3 
                    className="font-elegant text-lg mb-2 transition-colors duration-300 group-hover:text-[#B8860B]"
                    style={{ color: '#2D4B39' }}
                  >
                    {post.title}
                  </h3>

                  {/* EXTRACTO - máximo 3 líneas */}
                  <p 
                    className="text-sm mb-3 leading-relaxed line-clamp-3"
                    style={{ color: 'rgba(45, 75, 57, 0.7)' }}
                  >
                    {post.excerpt}
                  </p>

                  {/* LEER MÁS */}
                  <div className="flex items-center gap-2 group/link">
                    <motion.span 
                      className="text-xs transition-all duration-300"
                      style={{ color: '#B8860B' }}
                      whileHover={{ x: 5 }}
                    >
                      Leer más →
                    </motion.span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}