import { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Input } from '../ui/input';

const mockProducts = [
  { id: 1, name: 'Macramé Luna', category: 'Textil', stock: 15, price: 45000 },
  { id: 2, name: 'Collar Textil', category: 'Accesorios', stock: 8, price: 35000 },
  { id: 3, name: 'Pulsera Bohemia', category: 'Accesorios', stock: 0, price: 25000 },
];

export function AdminInventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products] = useState(mockProducts);

  return (
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
              >
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, #2D4B39 0%, #1F3A2E 100%)',
                    boxShadow: '0 8px 24px rgba(45, 75, 57, 0.3)'
                  }}
                >
                  <Package className="w-7 h-7" style={{ color: '#ffffff' }} />
                </div>
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                  Stock
                </h1>
                <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                  {products.length} productos registrados
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(107, 114, 128, 0.6)' }} />
                <Input
                  placeholder="Buscar en stock..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    paddingLeft: '2.75rem',
                    border: '1px solid rgba(45, 75, 57, 0.15)',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    width: '320px',
                    boxShadow: '0 4px 12px rgba(45, 75, 57, 0.05)'
                  }}
                />
              </motion.div>
              
              <motion.button
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
                Agregar Producto
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: '#2D4B39' }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PRODUCTO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">CATEGORÍA</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">STOCK</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PRECIO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
              {(searchTerm ? products.filter(p => 
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) : products).map((product: any, index: number) => (
                <motion.tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#B8860B' }}>
                    ${product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg transition-colors hover:bg-gray-100">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-2 rounded-lg transition-colors hover:bg-yellow-50">
                        <Edit className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </button>
                      <button className="p-2 rounded-lg transition-colors hover:bg-red-50">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
