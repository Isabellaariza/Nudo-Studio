import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, ChevronDown, Package, Search } from 'lucide-react';
import { cartAPI } from '../../lib/api';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { useApp } from '../../contexts/AppContext';

interface ProductsPageProps {
  user: any;
  onNavigate: (page: string) => void;
  onCartUpdate?: () => void;
}

export function ProductsPage({ user, onNavigate, onCartUpdate }: ProductsPageProps) {
  const { products, currentUser } = useApp();
  const activeUser = currentUser || user;
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Simular carga de productos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Mapear categorías del contexto a categorías de la página
  const categoryMap: Record<string, string> = {
    'Tapices': 'macrame',
    'Joyería': 'joyeria',
    'Decoración': 'decoracion',
    'Accesorios': 'accesorios'
  };

  // Convertir productos del contexto al formato de la página
  const pageProducts = products.filter(p => p.status === 'active').map(product => ({
    id: product.id.toString(),
    name: product.name,
    category: categoryMap[product.category] || 'accesorios',
    price: product.price,
    stock: product.stock,
    description: product.description,
    imageUrl: `https://images.unsplash.com/photo-1621607508892-8b7a5e69e8fe?w=400&h=400&fit=crop` // URL por defecto
  }));

  const handleAddToCart = async (productId: string) => {
    if (!activeUser) {
      toast.error('Debes iniciar sesión para agregar productos al carrito');
      onNavigate('login');
      return;
    }

    try {
      const session = await import('../../lib/api').then(m => m.auth.getSession());
      if (!session?.access_token) {
        toast.error('Sesión expirada. Por favor inicia sesión nuevamente');
        onNavigate('login');
        return;
      }

      await cartAPI.add(productId, 1, session.access_token);
      toast.success('Producto agregado al carrito');
      if (onCartUpdate) onCartUpdate();
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      toast.error(error.message || 'Error al agregar al carrito');
    }
  };

  const categories = ['all', 'macrame', 'joyeria', 'accesorios', 'decoracion'];
  const categoryLabels: Record<string, string> = {
    all: 'Todos los Productos',
    macrame: 'Macrame',
    joyeria: 'Joyeria',
    accesorios: 'Accesorios',
    decoracion: 'Decoracion'
  };
  
  const filteredProducts = pageProducts
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return (
      <div className="min-h-screen pt-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#B8860B' }}></div>
          <p className="mt-4" style={{ color: '#2D4B39' }}>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 
            className="font-elegant text-[5rem] tracking-wide mb-6" 
            style={{ color: '#2D4B39' }}
          >
            Nuestros Productos
          </h1>
          <p className="text-lg" style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
            Descubre nuestra colección de piezas artesanales únicas
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-sm mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(45, 75, 57, 0.5)' }} />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full backdrop-blur-sm transition-all"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(224, 209, 192, 0.5)',
                color: '#2D4B39'
              }}
              onFocus={(e) => e.target.style.borderColor = '#B8860B'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(224, 209, 192, 0.5)'}
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-6 py-3 text-base tracking-wide transition-all rounded-full"
              style={
                selectedCategory === cat
                  ? { backgroundColor: '#B8860B', color: 'white' }
                  : { 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      color: '#2D4B39',
                      border: '1px solid rgba(224, 209, 192, 0.5)'
                    }
              }
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={
                selectedCategory === cat
                  ? { scale: 1.05, boxShadow: '0 8px 16px rgba(184, 134, 11, 0.3)' }
                  : { 
                      scale: 1.05,
                      borderColor: '#B8860B',
                      color: '#B8860B'
                    }
              }
              whileTap={{ scale: 0.95 }}
            >
              {categoryLabels[cat]}
            </motion.button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgba(45, 75, 57, 0.3)' }} />
            <p className="text-lg" style={{ color: 'rgba(45, 75, 57, 0.6)' }}>
              {searchQuery ? 'No se encontraron productos con ese nombre' : 'No hay productos disponibles en esta categoría'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              const isExpanded = expandedProduct === product.id;
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group bg-white rounded-[1.5rem] p-3 shadow-sm hover:shadow-xl transition-all"
                >
                  <motion.div 
                    className="relative aspect-square overflow-hidden mb-3 rounded-xl"
                    style={{ backgroundColor: 'rgba(224, 209, 192, 0.2)' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex items-center justify-center"><div class="w-16 h-16 rounded-full flex items-center justify-center" style="background-color: rgba(45, 75, 57, 0.1); color: #2D4B39;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div></div>';
                        }
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-[#2D4B39]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.div>
                  
                  <h3 className="text-sm tracking-wide mb-1 line-clamp-1" style={{ color: '#2D4B39' }}>
                    {product.name}
                  </h3>
                  
                  <div className="mb-2">
                    <p className={`text-xs ${isExpanded ? '' : 'line-clamp-2'} min-h-[2rem]`} style={{ color: 'rgba(45, 75, 57, 0.6)' }}>
                      {product.description}
                    </p>
                    <motion.button
                      onClick={() => setExpandedProduct(isExpanded ? null : product.id)}
                      className="text-xs flex items-center gap-1 mt-1 hover:underline"
                      style={{ color: '#B8860B' }}
                    >
                      {isExpanded ? 'Ver menos' : 'Ver más'}
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-3 h-3" />
                      </motion.div>
                    </motion.button>
                  </div>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mb-2"
                      >
                        <div className="p-2 rounded-xl space-y-1 text-xs" style={{ backgroundColor: 'rgba(224, 209, 192, 0.2)' }}>
                          <div className="flex items-center gap-2">
                            <Package className="w-3 h-3" style={{ color: '#B8860B' }} />
                            <span style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
                              Categoría: <strong>{product.category}</strong>
                            </span>
                          </div>
                          {product.stock !== undefined && (
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                              <span style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
                                {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Sin stock'}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <div className="flex items-center justify-between mb-2">
                    <motion.span 
                      className="font-elegant text-base md:text-lg"
                      style={{ color: '#B8860B' }}
                      whileHover={{ scale: 1.05 }}
                    >
                      ${product.price.toLocaleString('es-CO')} COP
                    </motion.span>
                    <span className={`text-xs ${product.stock > 5 ? 'opacity-50' : ''}`} style={{ color: product.stock > 0 ? '#2D4B39' : '#B8860B' }}>
                      {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
                    </span>
                  </div>
                  
                  <motion.button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock === 0}
                    className="w-full px-3 py-2 text-white text-xs tracking-wide flex items-center justify-center gap-1 transition-all rounded-full overflow-hidden group relative disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#2D4B39' }}
                    whileHover={product.stock > 0 ? { 
                      scale: 1.02,
                      boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                    } : {}}
                    whileTap={product.stock > 0 ? { scale: 0.98 } : {}}
                  >
                    <ShoppingCart className="w-3 h-3 relative z-10" />
                    <span className="relative z-10">Agregar</span>
                    {product.stock > 0 && (
                      <motion.div
                        className="absolute inset-0"
                        style={{ backgroundColor: '#B8860B' }}
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}