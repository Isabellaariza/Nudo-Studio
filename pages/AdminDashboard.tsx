import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Clock,
  RefreshCw,
  FileText,
  AlertTriangle,
  Users,
  Package,
  Calendar,
  ShoppingCart,
  TrendingUp,
  Award,
  DollarSign,
  ArrowUpRight
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface AdminDashboardProps {
  onSectionChange: (section: string) => void;
}

export function AdminDashboard({ onSectionChange }: AdminDashboardProps) {
  const [salesData] = useState([
    { month: 'Ene', sales: 12400 },
    { month: 'Feb', sales: 19800 },
    { month: 'Mar', sales: 15600 },
    { month: 'Abr', sales: 23400 },
    { month: 'May', sales: 28900 },
    { month: 'Jun', sales: 34200 },
  ]);

  const [topProducts] = useState([
    { name: 'Macramé Luna', sales: 142, percentage: 100 },
    { name: 'Collar Textil', sales: 128, percentage: 90 },
    { name: 'Pulsera Bohemia', sales: 95, percentage: 67 },
    { name: 'Tapiz Natural', sales: 78, percentage: 55 },
    { name: 'Aretes Artesanales', sales: 64, percentage: 45 },
  ]);

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header del Dashboard */}
      <motion.div 
        className="relative overflow-hidden"
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
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
              Panel de Administración
            </h1>
            <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
              Gestión y control del sistema
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tarjetas de Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: 'Pagos Pendientes',
            value: '0',
            action: 'Ver pedidos →',
            icon: Clock,
            color: '#F59E0B',
            section: 'orders'
          },
          {
            title: 'Devoluciones Nuevas',
            value: '0',
            action: 'Revisar →',
            icon: RefreshCw,
            color: '#8B5CF6',
            section: 'returns'
          },
          {
            title: 'Cotizaciones Pendientes',
            value: '0',
            action: 'Responder →',
            icon: FileText,
            color: '#F97316',
            section: 'quotes'
          },
          {
            title: 'Stock Crítico',
            value: '2',
            action: 'Ver materiales →',
            icon: AlertTriangle,
            color: '#EF4444',
            section: 'inventory'
          }
        ].map((alert, index) => (
          <motion.div
            key={alert.title}
            className="relative overflow-hidden rounded-2xl p-6 cursor-pointer"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(224, 209, 192, 0.2)',
              boxShadow: '0 2px 8px rgba(45, 75, 57, 0.04)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{ 
              y: -4,
              boxShadow: '0 8px 24px rgba(45, 75, 57, 0.12)',
              transition: { duration: 0.2 }
            }}
            onClick={() => onSectionChange(alert.section)}
          >
            <div className="flex items-center justify-between mb-6">
              <alert.icon className="w-6 h-6" style={{ color: alert.color }} />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                  {alert.value}
                </span>
                {alert.value !== '0' && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: alert.color }}></div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>
                {alert.title}
              </p>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                {alert.action}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Usuarios Totales',
            value: '4',
            subtitle: '+0 este mes',
            icon: Users,
            color: '#B8860B',
            section: 'users'
          },
          {
            title: 'Productos',
            value: '41',
            subtitle: 'En catálogo',
            icon: Package,
            color: '#B8860B',
            section: 'inventory'
          },
          {
            title: 'Talleres',
            value: '8',
            subtitle: 'Programados',
            icon: Calendar,
            color: '#B8860B',
            section: 'workshops'
          },
          {
            title: 'Pedidos',
            value: '6',
            subtitle: 'Total',
            icon: ShoppingCart,
            color: '#B8860B',
            section: 'orders'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            className="relative overflow-hidden rounded-2xl p-6 cursor-pointer"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(224, 209, 192, 0.2)',
              boxShadow: '0 2px 8px rgba(45, 75, 57, 0.04)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 4), duration: 0.5 }}
            whileHover={{ 
              y: -4,
              boxShadow: '0 8px 24px rgba(45, 75, 57, 0.12)',
              transition: { duration: 0.2 }
            }}
            onClick={() => onSectionChange(stat.section)}
          >
            <div className="flex items-center justify-between mb-6">
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              <span className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                {stat.value}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#2D4B39' }}>
                {stat.title}
              </p>
              <p className="text-sm" style={{ color: stat.color }}>
                {stat.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ventas Mensuales y Top 5 Productos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Ventas Mensuales */}
        <motion.div
          className="rounded-2xl p-6"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(224, 209, 192, 0.2)',
            boxShadow: '0 8px 32px rgba(45, 75, 57, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ 
            boxShadow: '0 12px 40px rgba(45, 75, 57, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
            transition: { duration: 0.3 }
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>
                Ventas Mensuales
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Últimos 6 meses
              </p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" style={{ color: '#10B981' }} />
              <span className="text-sm font-medium" style={{ color: '#10B981' }}>
                +23%
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.1)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(224, 209, 192, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(45, 75, 57, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="url(#greenGradient)" 
                  radius={[8, 8, 0, 0]}
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(45, 75, 57, 0.3))'
                  }}
                />
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A6B57" />
                    <stop offset="50%" stopColor="#3A5A47" />
                    <stop offset="100%" stopColor="#2D4B39" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top 5 Productos */}
        <motion.div
          className="rounded-2xl p-6"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(224, 209, 192, 0.2)',
            boxShadow: '0 8px 32px rgba(45, 75, 57, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ 
            boxShadow: '0 12px 40px rgba(45, 75, 57, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
            transition: { duration: 0.3 }
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>
                Top 5 Productos
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Los más vendidos del mes
              </p>
            </div>
            <Award className="w-6 h-6" style={{ color: '#B8860B' }} />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => {
              const colors = {
                0: '#FFD700',
                1: '#C0C0C0',
                2: '#CD7F32',
                3: '#2D4B39',
                4: '#2D4B39'
              };
              return (
                <motion.div
                  key={product.name}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (0.1 * index), duration: 0.3 }}
                >
                  <div 
                    className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-transform hover:scale-110"
                    style={{ 
                      backgroundColor: colors[index as keyof typeof colors],
                      color: '#ffffff',
                      boxShadow: `0 4px 12px ${colors[index as keyof typeof colors]}40, inset 0 1px 3px rgba(255, 255, 255, 0.4), inset 0 -1px 2px rgba(0, 0, 0, 0.2)`
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium" style={{ color: '#2D4B39' }}>
                        {product.name}
                      </p>
                      <span className="text-sm font-semibold" style={{ color: colors[index as keyof typeof colors] }}>
                        {product.sales}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ 
                          backgroundColor: colors[index as keyof typeof colors],
                          boxShadow: `0 2px 6px ${colors[index as keyof typeof colors]}60, inset 0 1px 2px rgba(255, 255, 255, 0.3)`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${product.percentage}%` }}
                        transition={{ delay: 0.7 + (0.1 * index), duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Ingresos del Mes */}
      <motion.div
        className="rounded-2xl p-6"
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)'
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5" style={{ color: '#10B981' }} />
          <h3 className="text-lg font-semibold" style={{ color: '#10B981' }}>
            Ingresos del Mes
          </h3>
        </div>
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#10B981' }}>
            $125.000 COP
          </h2>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" style={{ color: '#10B981' }} />
            <span className="text-sm font-medium" style={{ color: '#10B981' }}>
              +12.5% vs mes anterior
            </span>
          </div>
        </div>
        <div className="border-t pt-4" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: '#2D4B39' }}>Productos</span>
              <span className="text-sm font-semibold" style={{ color: '#10B981' }}>$125.000 COP</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: '#2D4B39' }}>Talleres</span>
              <span className="text-sm font-semibold" style={{ color: '#10B981' }}>$0 COP</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
