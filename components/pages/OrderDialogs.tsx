import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart,
  Search,
  Info,
  CreditCard,
  Check,
  X,
  User,
  Package,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';

export function OrderDialogs() {
  const { orders } = useApp();

  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [ordersData, setOrdersData] = useState([
    {
      id: 1,
      orderNumber: 'PED-2024-001',
      date: '2024-01-15',
      customer: {
        name: 'María García',
        documentType: 'cedula',
        documentNumber: '1234567890',
        email: 'maria@email.com',
        phone: '300-123-4567',
        address: 'Calle 123 #45-67, Bogotá'
      },
      products: [
        { name: 'Macramé Luna', quantity: 2, price: 85000 },
        { name: 'Collar Textil', quantity: 1, price: 45000 }
      ],
      total: 215000,
      paymentMethod: 'Transferencia Bancaria',
      paymentProof: 'comprobante_001.jpg',
      status: 'Pendiente',
      confirmedDate: null,
      rejectionReason: null
    },
    {
      id: 2,
      orderNumber: 'PED-2024-002',
      date: '2024-01-14',
      customer: {
        name: 'Juan Pérez',
        documentType: 'cedula',
        documentNumber: '0987654321',
        email: 'juan@email.com',
        phone: '310-234-5678',
        address: 'Carrera 45 #12-34, Medellín'
      },
      products: [
        { name: 'Pulsera Macramé', quantity: 3, price: 25000 }
      ],
      total: 75000,
      paymentMethod: 'Consignación',
      paymentProof: 'comprobante_002.jpg',
      status: 'Confirmado',
      confirmedDate: '2024-01-14',
      rejectionReason: null
    },
    {
      id: 3,
      orderNumber: 'PED-2024-003',
      date: '2024-01-13',
      customer: {
        name: 'Ana Martínez',
        documentType: 'cedula',
        documentNumber: '1122334455',
        email: 'ana@email.com',
        phone: '320-345-6789',
        address: 'Avenida 68 #23-45, Cali'
      },
      products: [
        { name: 'Tapiz Natural', quantity: 1, price: 120000 },
        { name: 'Aretes Artesanales', quantity: 2, price: 35000 }
      ],
      total: 190000,
      paymentMethod: 'Transferencia Bancaria',
      paymentProof: 'comprobante_003.jpg',
      status: 'En Proceso',
      confirmedDate: '2024-01-13',
      rejectionReason: null
    }
  ]);

  const [selectedOrderInfo, setSelectedOrderInfo] = useState<any>(null);
  const [showOrderInfoDialog, setShowOrderInfoDialog] = useState(false);
  const [showPaymentProofDialog, setShowPaymentProofDialog] = useState(false);
  const [selectedPaymentProof, setSelectedPaymentProof] = useState<any>(null);

  const handleConfirmOrder = (orderId: number) => {
    setOrdersData(ordersData.map(order => 
      order.id === orderId 
        ? { ...order, status: 'Confirmado', confirmedDate: new Date().toISOString().split('T')[0] }
        : order
    ));
    toast.success('Pedido confirmado exitosamente');
  };

  const handleRejectOrder = (orderId: number) => {
    const reason = prompt('Motivo del rechazo (opcional):');
    setOrdersData(ordersData.map(order => 
      order.id === orderId 
        ? { ...order, status: 'Rechazado', rejectionReason: reason || 'Sin motivo especificado' }
        : order
    ));
    toast.success('Pedido rechazado');
  };

  const handleViewPaymentProof = (order: any) => {
    setSelectedPaymentProof(order);
    setShowPaymentProofDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Confirmado': return { bg: '#D1FAE5', text: '#065F46' };
      case 'Rechazado': return { bg: '#FEE2E2', text: '#991B1B' };
      case 'En Proceso': return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'Completado': return { bg: '#F0FDF4', text: '#166534' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  return (
    <>
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
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden"
                    style={{ 
                      background: 'linear-gradient(135deg, #2D4B39 0%, #1F3A2E 100%)',
                      boxShadow: '0 8px 24px rgba(45, 75, 57, 0.3)'
                    }}
                  >
                    <ShoppingCart className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Pedidos
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {ordersData.length} pedidos registrados
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-xs" style={{ color: '#F59E0B' }}>
                        {ordersData.filter(order => order.status === 'Pendiente').length} pendientes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(107, 114, 128, 0.6)' }} />
                  <Input
                    placeholder="Buscar pedidos..."
                    value={orderSearchTerm}
                    onChange={(e) => setOrderSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 text-sm font-medium transition-all duration-300"
                    style={{ 
                      border: '1px solid rgba(45, 75, 57, 0.15)',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      width: '320px',
                      boxShadow: '0 4px 12px rgba(45, 75, 57, 0.05)'
                    }}
                  />
                </motion.div>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">CLIENTE</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PRODUCTOS</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">TOTAL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ESTADO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
                {(orderSearchTerm ? ordersData.filter(order => 
                  order.customer.name.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
                  order.orderNumber.toLowerCase().includes(orderSearchTerm.toLowerCase())
                ) : ordersData).map((order: any, index: number) => {
                  const statusColors = getStatusColor(order.status);
                  return (
                    <motion.tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      whileHover={{ 
                        y: -2,
                        boxShadow: '0 4px 12px rgba(45, 75, 57, 0.1)',
                        transition: { duration: 0.2 }
                      }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                          <p className="text-xs font-light" style={{ color: '#B8860B' }}>
                            {order.date}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{order.customer.name}</p>
                          <p className="text-xs font-light" style={{ color: '#B8860B' }}>
                            {order.customer.documentType === 'cedula' ? 'CC' : 'CE'}: {order.customer.documentNumber}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {order.products.reduce((total: number, product: any) => total + product.quantity, 0)} productos
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.products.length} tipo{order.products.length > 1 ? 's' : ''} diferentes
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-lg font-bold" style={{ color: '#B8860B' }}>
                          ${order.total.toLocaleString('es-CO')}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: statusColors.bg,
                            color: statusColors.text
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setSelectedOrderInfo(order); setShowOrderInfoDialog(true); }}
                            className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                            title="Ver detalles"
                          >
                            <Info className="w-4 h-4 text-gray-500" />
                          </button>
                          <button 
                            onClick={() => handleViewPaymentProof(order)}
                            className="p-2 rounded-lg transition-colors hover:bg-blue-50"
                            title="Ver comprobante"
                          >
                            <CreditCard className="w-4 h-4" style={{ color: '#3B82F6' }} />
                          </button>
                          <button 
                            onClick={() => handleConfirmOrder(order.id)}
                            className="p-2 rounded-lg transition-colors hover:bg-green-50"
                            title="Confirmar pedido"
                            disabled={order.status === 'Confirmado' || order.status === 'Rechazado'}
                          >
                            <Check className="w-4 h-4" style={{ color: order.status === 'Confirmado' || order.status === 'Rechazado' ? '#9CA3AF' : '#10B981' }} />
                          </button>
                          <button 
                            onClick={() => handleRejectOrder(order.id)}
                            className="p-2 rounded-lg transition-colors hover:bg-red-50"
                            title="Rechazar pedido"
                            disabled={order.status === 'Confirmado' || order.status === 'Rechazado'}
                          >
                            <X className="w-4 h-4" style={{ color: order.status === 'Confirmado' || order.status === 'Rechazado' ? '#9CA3AF' : '#ef4444' }} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* DIÁLOGO DE INFORMACIÓN DEL PEDIDO */}
      <AnimatePresence>
        {showOrderInfoDialog && selectedOrderInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOrderInfoDialog(false)}
          >
            <motion.div
              className="rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                border: '1px solid rgba(184, 134, 11, 0.2)',
                boxShadow: '0 20px 40px rgba(45, 75, 57, 0.1)'
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-8 pb-6 border-b" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ 
                  background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                  boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                }}>
                  <ShoppingCart className="w-8 h-8" style={{ color: '#ffffff' }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>{selectedOrderInfo.orderNumber}</h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>Información completa del pedido</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Información del Cliente */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                    <User className="w-5 h-5" />
                    Información del Cliente
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Nombre:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedOrderInfo.customer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Email:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedOrderInfo.customer.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Teléfono:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedOrderInfo.customer.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Documento:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>
                        {selectedOrderInfo.customer.documentType === 'cedula' ? 'CC' : 'CE'}: {selectedOrderInfo.customer.documentNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Dirección:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedOrderInfo.customer.address}</span>
                    </div>
                  </div>
                </div>

                {/* Información del Pedido */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                    <Calendar className="w-5 h-5" />
                    Detalles del Pedido
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Fecha:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedOrderInfo.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Estado:</span>
                      <span className="text-sm font-medium" style={{ color: getStatusColor(selectedOrderInfo.status).text }}>
                        {selectedOrderInfo.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Método de Pago:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedOrderInfo.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Total:</span>
                      <span className="text-lg font-bold" style={{ color: '#B8860B' }}>
                        ${selectedOrderInfo.total.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div className="p-6 rounded-xl mb-8" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-3" style={{ color: '#B8860B' }}>
                  <Package className="w-5 h-5" />
                  Productos del Pedido
                </h3>
                <div className="space-y-3">
                  {selectedOrderInfo.products.map((product: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                      <div>
                        <p className="font-medium" style={{ color: '#2D4B39' }}>{product.name}</p>
                        <p className="text-sm" style={{ color: '#6B7280' }}>Cantidad: {product.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold" style={{ color: '#B8860B' }}>
                          ${(product.price * product.quantity).toLocaleString('es-CO')}
                        </p>
                        <p className="text-sm" style={{ color: '#6B7280' }}>
                          ${product.price.toLocaleString('es-CO')} c/u
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-6 border-t" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <button
                  onClick={() => setShowOrderInfoDialog(false)}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    border: '1px solid rgba(184, 134, 11, 0.3)',
                    color: '#B8860B',
                    backgroundColor: '#ffffff'
                  }}
                >
                  Cerrar
                </button>
                {selectedOrderInfo.status === 'Pendiente' && (
                  <>
                    <button
                      onClick={() => {
                        handleConfirmOrder(selectedOrderInfo.id);
                        setShowOrderInfoDialog(false);
                      }}
                      className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        color: '#ffffff'
                      }}
                    >
                      <Check className="w-4 h-4" />
                      Confirmar Pedido
                    </button>
                    <button
                      onClick={() => {
                        handleRejectOrder(selectedOrderInfo.id);
                        setShowOrderInfoDialog(false);
                      }}
                      className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: '#ffffff'
                      }}
                    >
                      <X className="w-4 h-4" />
                      Rechazar Pedido
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DIÁLOGO DE COMPROBANTE DE PAGO */}
      <AnimatePresence>
        {showPaymentProofDialog && selectedPaymentProof && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPaymentProofDialog(false)}
          >
            <motion.div
              className="rounded-2xl p-8 max-w-2xl w-full"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(184, 134, 11, 0.2)',
                boxShadow: '0 20px 40px rgba(45, 75, 57, 0.1)'
              }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <CreditCard className="w-8 h-8" style={{ color: '#2D4B39' }} />
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>Comprobante de Pago</h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>{selectedPaymentProof.orderNumber}</p>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-8 text-center mb-6">
                <CreditCard className="w-16 h-16 mx-auto mb-4" style={{ color: '#6B7280' }} />
                <p className="text-lg font-semibold mb-2" style={{ color: '#2D4B39' }}>
                  {selectedPaymentProof.paymentProof}
                </p>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Método: {selectedPaymentProof.paymentMethod}
                </p>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Total: ${selectedPaymentProof.total.toLocaleString('es-CO')} COP
                </p>
              </div>

              <button
                onClick={() => setShowPaymentProofDialog(false)}
                className="w-full py-3 px-4 rounded-lg font-medium"
                style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}