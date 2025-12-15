import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { productsAPI, newsAPI } from '../../lib/api';
import { ArrowRight, Sparkles, Star, ChevronDown } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [latestNews, setLatestNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      // Load products and news without requiring authentication
      const [productsData, newsData] = await Promise.all([
        productsAPI.getAll().catch(() => ({ products: [] })),
        newsAPI.getAll().catch(() => ({ news: [] })),
      ]);
      
      // Get first 3 products for featured section
      setFeaturedProducts((productsData.products || []).slice(0, 3));
      
      // Get first 3 news items
      setLatestNews((newsData.news || []).slice(0, 3));
    } catch (error) {
      console.error('Error loading home data:', error);
      // Set empty arrays on error
      setFeaturedProducts([]);
      setLatestNews([]);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      title: 'Artesanía Única',
      description: 'Cada pieza es creada a mano con dedicación y atención al detalle',
      image: 'https://images.unsplash.com/photo-1632761644913-0da6105863cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwd2FsbCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYxNTExMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Diseño Personalizado',
      description: 'Creamos piezas únicas adaptadas a tu estilo y necesidades',
      image: 'https://images.unsplash.com/photo-1653227907864-560dce4c252d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwamV3ZWxyeSUyMGhhbmRtYWRlfGVufDF8fHx8MTc2MTU3Nzc0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Talleres & Aprendizaje',
      description: 'Aprende el arte del macramé y tejido con nuestros expertos',
      image: 'https://images.unsplash.com/photo-1760637626191-fa20283f6fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY3JhZnQlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjE1MTMzNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  // Placeholder products if not loaded yet
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : [
    { id: 1, name: 'Tapiz Macramé', description: 'Tapiz de pared tejido a mano', price: '65.000 COP', imageUrl: '' },
    { id: 2, name: 'Pulsera Textil', description: 'Joyería artesanal personalizada', price: '30.000 COP', imageUrl: '' },
    { id: 3, name: 'Cortina Decorativa', description: 'Cortina de macramé bohemia', price: '85.000 COP', imageUrl: '' },
  ];

  const faqs = [
    {
      question: '¿Cuánto tiempo toma hacer un pedido personalizado?',
      answer: 'Los pedidos personalizados toman entre 2-3 semanas dependiendo de la complejidad. Te mantendremos informado del progreso durante todo el proceso.'
    },
    {
      question: '¿Qué materiales utilizan en sus productos?',
      answer: 'Utilizamos hilos de algodón 100% natural, cuentas de madera certificada y materiales eco-friendly. Todos nuestros productos son libres de químicos dañinos.'
    },
    {
      question: '¿Hacen envíos a toda Colombia?',
      answer: 'Sí, realizamos envíos a todo el territorio nacional. Los envíos dentro de Medellín son gratuitos, y para otras ciudades manejamos tarifas preferenciales.'
    },
    {
      question: '¿Puedo aprender macramé en sus talleres sin experiencia?',
      answer: '¡Por supuesto! Nuestros talleres están diseñados para todos los niveles. Comenzamos desde lo básico y te acompañamos paso a paso.'
    },
    {
      question: '¿Ofrecen garantía en sus productos?',
      answer: 'Todos nuestros productos tienen garantía de 30 días. Si no estás satisfecho, puedes devolverlo sin problemas dentro de este período.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-8 px-8"
        style={{
          background: 'linear-gradient(to bottom, rgba(250, 247, 242, 1) 0%, rgba(250, 247, 242, 0.8) 50%, rgba(250, 247, 242, 1) 100%)'
        }}
      >
        {/* Floating decorative elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: '#B8860B',
              opacity: 0.2,
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}

        {/* Large decorative circles */}
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full"
          style={{ backgroundColor: '#2D4B39', opacity: 0.05 }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full"
          style={{ backgroundColor: '#B8860B', opacity: 0.05 }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <h1 
                className="font-elegant text-[5rem] leading-tight mb-2"
                style={{ color: '#2D4B39' }}
              >
                Creaciones
              </h1>
              <h1 
                className="font-elegant text-[5rem] leading-tight mb-6"
                style={{ color: '#B8860B' }}
              >
                Únicas
              </h1>
              
              <p 
                className="text-xl leading-relaxed mb-8"
                style={{ color: 'rgba(45, 75, 57, 0.8)' }}
              >
                Descubre el arte del macramé y tejido textil. Cada pieza cuenta una historia, 
                cada nudo abraza la tradición con un toque contemporáneo.
              </p>

              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8"
                style={{ border: '1px solid rgba(224, 209, 192, 0.5)' }}
                whileHover={{ scale: 1.05 }}
              >
                <Star className="w-5 h-5" style={{ color: '#B8860B' }} fill="#B8860B" />
                <div className="flex flex-col items-start">
                  <span className="text-sm tracking-wide" style={{ color: '#2D4B39' }}>
                    100% Artesanal
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(45, 75, 57, 0.6)' }}>
                    Hecho a mano con amor
                  </span>
                </div>
              </motion.div>

              {/* Buttons */}
              <div className="flex flex-row gap-4 justify-start">
                <motion.button
                  onClick={() => onNavigate('products')}
                  className="px-8 py-4 bg-[#2D4B39] text-white tracking-wide rounded-full shadow-lg"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(45, 75, 57, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explorar Catálogo
                </motion.button>
                
                <motion.button
                  onClick={() => onNavigate('workshops')}
                  className="px-8 py-4 border-2 border-[#2D4B39] text-[#2D4B39] tracking-wide rounded-full"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(45, 75, 57, 0.05)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Talleres
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-end"
            >
              <motion.div
                className="relative w-full max-w-[320px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1634120830231-4d9dabb67e2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwd2FsbCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYyMzM5MTU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Macramé artesanal"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FILOSOFÍA SECTION */}
      <section 
        className="py-20 px-8 relative overflow-hidden"
        style={{
          backgroundColor: '#F8F6F3'
        }}
      >
        {/* Decorative circles */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 rounded-full"
          style={{ backgroundColor: '#B8860B', opacity: 0.1 }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 rounded-full"
          style={{ backgroundColor: '#2D4B39', opacity: 0.1 }}
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            className="font-elegant text-5xl tracking-wide mb-8"
            style={{ color: '#2D4B39' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Nuestra Filosofía
          </motion.h2>
          
          <motion.p
            className="text-lg leading-relaxed mb-6 text-center"
            style={{ color: 'rgba(45, 75, 57, 0.7)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            En Nudo Studio, creemos que cada nudo cuenta una historia. Nuestro trabajo celebra 
            el arte ancestral del anudado, combinándolo con diseños contemporáneos para crear 
            piezas únicas que transforman espacios y adornan vidas.
          </motion.p>

          <motion.p
            className="text-lg leading-relaxed text-center"
            style={{ color: 'rgba(45, 75, 57, 0.7)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Cada creación es el resultado de horas de trabajo meticuloso, pasión por el detalle 
            y un profundo respeto por la artesanía tradicional.
          </motion.p>
        </div>
      </section>

      {/* CARACTERÍSTICAS SECTION */}
      <section 
        className="py-20 px-8"
        style={{ backgroundColor: 'rgba(224, 209, 192, 0.3)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <motion.div 
                  className="aspect-[4/3] overflow-hidden mb-4 rounded-2xl relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#2D4B39]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
                <h3 
                  className="font-elegant text-xl tracking-wide mb-2"
                  style={{ color: '#2D4B39' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: 'rgba(45, 75, 57, 0.6)' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS SECTION */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 
              className="font-elegant text-5xl tracking-wide mb-6"
              style={{ color: '#2D4B39' }}
            >
              Productos Destacados
            </h2>
          </motion.div>

          <div className="grid grid-cols-3 gap-6 mb-12">
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => onNavigate('products')}
              >
                <motion.div 
                  className="relative aspect-square overflow-hidden mb-4 rounded-2xl"
                  style={{ backgroundColor: 'rgba(224, 209, 192, 0.2)' }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {product.imageUrl && (
                    <ImageWithFallback
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                </motion.div>
                
                <h3 
                  className="tracking-wide mb-2"
                  style={{ color: '#2D4B39' }}
                >
                  {product.name}
                </h3>
                
                <p className="text-sm mb-3" style={{ color: 'rgba(45, 75, 57, 0.6)' }}>
                  {product.description}
                </p>
                
                <motion.p 
                  className="font-elegant text-xl"
                  style={{ color: '#B8860B' }}
                  whileHover={{ scale: 1.05 }}
                >
                  ${product.price}
                </motion.p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              onClick={() => onNavigate('products')}
              className="px-10 py-4 bg-[#2D4B39] text-white tracking-wide rounded-full inline-flex items-center gap-2"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(45, 75, 57, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Ver Todos los Productos</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* NOVEDADES SECTION */}
      {!loading && latestNews.length > 0 && (
        <section 
          className="py-20 px-8"
          style={{ backgroundColor: 'rgba(224, 209, 192, 0.3)' }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 
                className="font-elegant text-5xl tracking-wide mb-6"
                style={{ color: '#2D4B39' }}
              >
                Últimas Novedades
              </h2>
            </motion.div>

            <div className="grid grid-cols-3 gap-6 mb-12">
              {latestNews.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow"
                  onClick={() => onNavigate('news')}
                >
                  {item.imageUrl && (
                    <motion.div 
                      className="aspect-[16/10] overflow-hidden mb-4 rounded-xl relative"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </motion.div>
                  )}

                  <h3 
                    className="tracking-wide mb-2 group-hover:text-[#B8860B] transition-colors duration-300"
                    style={{ color: '#2D4B39' }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
                    {item.content.length > 120 ? `${item.content.substring(0, 120)}...` : item.content}
                  </p>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.button
                onClick={() => onNavigate('news')}
                className="px-10 py-4 border-2 border-[#2D4B39] text-[#2D4B39] tracking-wide rounded-full inline-flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: '#2D4B39',
                  color: 'white'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Ver Todas las Novedades</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ SECTION */}
      <section 
        className="py-20 px-8 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 
              className="font-elegant text-5xl tracking-wider mb-6"
              style={{ 
                color: '#2D4B39',
                letterSpacing: '0.05em',
                fontWeight: 'normal'
              }}
            >
              Preguntas Frecuentes
            </h2>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: 'rgba(45, 75, 57, 0.7)' }}
            >
              Resolvemos las dudas más comunes sobre nuestros productos y servicios
            </p>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(224, 209, 192, 0.3)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Question Button */}
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between transition-colors"
                  style={{
                    backgroundColor: expandedFAQ === index ? 'rgba(224, 209, 192, 0.1)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (expandedFAQ !== index) {
                      e.currentTarget.style.backgroundColor = 'rgba(224, 209, 192, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (expandedFAQ !== index) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span 
                    className="text-left pr-4"
                    style={{ 
                      color: '#2D4B39',
                      fontSize: '18px',
                      fontWeight: 500
                    }}
                  >
                    {faq.question}
                  </span>
                  
                  {/* Chevron Circle */}
                  <motion.div
                    className="flex-shrink-0 rounded-full flex items-center justify-center"
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#B8860B'
                    }}
                    animate={{
                      rotate: expandedFAQ === index ? 180 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <ChevronDown 
                      className="w-4 h-4"
                      style={{ color: '#FFFFFF' }}
                    />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {expandedFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p 
                        className="px-6 pb-6 leading-relaxed"
                        style={{ 
                          color: 'rgba(45, 75, 57, 0.7)',
                          fontSize: '16px',
                          lineHeight: '1.6'
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}