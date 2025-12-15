import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Search, Edit, Eye } from 'lucide-react';
import { Input } from '../ui/input';
import { useApp } from '../../contexts/AppContext';

export function AdminOrders() {
  const { orders } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
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
          <div className="flex items-center gap-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #2D4B39 0%, #1F3A2E 100%)',
                boxShadow: '0 8px 24px rgba(45, 75, 57, 0.3)'
              }}
            >
              <ShoppingCart className="w-7 h-7" style={{ color: '#ffffff' }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                Pedidos
              </h1>
              <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                {orders.length} pedidos registrados
              </p>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PEDIDO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">USUARIO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">FECHA</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">TOTAL</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ESTADO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
              {(orders || []).map((order: any, index: number) => (
                <motion.tr
                  key={order.id}
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 font-semibold">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.userName || 'Usuario'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-semibold" style={{ color: '#B8860B' }}>
                    ${order.total?.toLocaleString() || '0'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{
                      backgroundColor: '#FEF3C7',
                      color: '#92400E'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-yellow-50">
                      <Edit className="w-4 h-4" style={{ color: '#B8860B' }} />
                    </button>
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
