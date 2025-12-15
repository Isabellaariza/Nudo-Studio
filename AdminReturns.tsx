import { useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Search, Edit, Eye } from 'lucide-react';
import { Input } from '../ui/input';

const mockReturns = [
  { id: 1, product: 'Macramé Luna', customer: 'Juan Pérez', date: '2025-11-18', reason: 'Defecto', status: 'Pendiente', total: 45000 },
  { id: 2, product: 'Collar Textil', customer: 'María García', date: '2025-11-17', reason: 'No coincide', status: 'Aprobado', total: 35000 },
];

export function AdminReturns() {
  const [searchTerm, setSearchTerm] = useState('');
  const [returns] = useState(mockReturns);

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
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)'
              }}
            >
              <RotateCcw className="w-7 h-7" style={{ color: '#ffffff' }} />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                Devoluciones
              </h1>
              <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                {returns.length} devoluciones registradas
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PRODUCTO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">CLIENTE</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">FECHA</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">RAZÓN</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ESTADO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
              {(searchTerm ? returns.filter(r => 
                r.product.toLowerCase().includes(searchTerm.toLowerCase())
              ) : returns).map((ret: any, index: number) => (
                <motion.tr
                  key={ret.id}
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 font-semibold">{ret.product}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ret.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ret.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{ret.reason}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{
                      backgroundColor: ret.status === 'Aprobado' ? '#DBEAFE' : '#FEF3C7',
                      color: ret.status === 'Aprobado' ? '#1E40AF' : '#92400E'
                    }}>
                      {ret.status}
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
