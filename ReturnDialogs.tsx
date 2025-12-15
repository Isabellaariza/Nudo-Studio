import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RotateCcw,
  Search,
  Plus,
  Info,
  FileImage,
  Check,
  X,
  DollarSign,
  User,
  Package,
  AlertTriangle
} from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';

export function ReturnDialogs() {
  const { returns, respondToReturn } = useApp();
  const [returnSearchTerm, setReturnSearchTerm] = useState('');
  const [selectedReturnInfo, setSelectedReturnInfo] = useState<any>(null);
  const [showReturnInfoDialog, setShowReturnInfoDialog] = useState(false);
  const [showReturnEvidenceDialog, setShowReturnEvidenceDialog] = useState(false);
  const [selectedReturnEvidence, setSelectedReturnEvidence] = useState<any>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [customRejectionReasons] = useState<string[]>([
    'Producto fuera de especificación',
    'No cumple con política de devoluciones',
    'Producto dañado por negligencia del cliente',
    'Excede el período de devolución',
    'Falta de evidencia de compra'
  ]);
  const [responseData, setResponseData] = useState({
    approved: true,
    reason: '',
    message: '',
    alternative: ''
  });
  const [respondingTo, setRespondingTo] = useState<number | null>(null);

  const handleApproveReturn = (returnId: number) => {
    setShowResponseModal(true);
    setRespondingTo(returnId);
    setResponseData({
      approved: true,
      reason: '',
      message: '✓ Tu devolución ha sido APROBADA. Puedes cambiar este producto por otro del mismo precio.',
      alternative: ''
    });
  };

  const handleRejectReturn = (returnId: number) => {
    setShowResponseModal(true);
    setRespondingTo(returnId);
    setResponseData({
      approved: false,
      reason: '',
      message: 'Lamentablemente, tu solicitud de devolución no fue aprobada.',
      alternative: ''
    });
  };

  const handleProcessRefund = (returnId: number) => {
    // No se procesa directamente, se usa el sistema de respuesta
    toast.info('Usa el formulario de respuesta para aprobar o rechazar');
  };

  const handleSubmitResponse = () => {
    if (!respondingTo) return;
    if (responseData.approved && !responseData.alternative) {
      toast.error('Por favor especifica el producto alternativo');
      return;
    }
    
    respondToReturn(
      respondingTo,
      responseData.approved,
      responseData.reason,
      responseData.message,
      responseData.alternative
    );
    
    setShowResponseModal(false);
    setRespondingTo(null);
    setResponseData({
      approved: true,
      reason: '',
      message: '',
      alternative: ''
    });
  };

  const handleViewReturnEvidence = (returnData: any) => {
    setSelectedReturnEvidence(returnData);
    setShowReturnEvidenceDialog(true);
  };

  const getReturnStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Aprobada': return { bg: '#D1FAE5', text: '#065F46' };
      case 'Rechazada': return { bg: '#FEE2E2', text: '#991B1B' };
      case 'Procesada': return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'Reembolsada': return { bg: '#F0FDF4', text: '#166534' };
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
                    <RotateCcw className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Devoluciones
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {returns.length} devoluciones registradas
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-xs" style={{ color: '#F59E0B' }}>
                        {returns.filter(ret => ret.status === 'Pendiente').length} pendientes
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
                    placeholder="Buscar devoluciones..."
                    value={returnSearchTerm}
                    onChange={(e) => setReturnSearchTerm(e.target.value)}
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
                
                <motion.button
                  onClick={() => alert('Funcionalidad de agregar devolución próximamente')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-3 h-3" />
                  Agregar
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {(returnSearchTerm ? returns.filter(ret => 
            ret.customer.name.toLowerCase().includes(returnSearchTerm.toLowerCase()) ||
            ret.returnNumber.toLowerCase().includes(returnSearchTerm.toLowerCase())
          ) : returns).map((returnItem: any, index: number) => {
            const statusColors = getReturnStatusColor(returnItem.status);
            const isExpired = returnItem.daysLeft <= 0;
            
            return (
              <motion.div
                key={returnItem.id}
                className="relative overflow-hidden rounded-2xl group"
                style={{
                  background: isExpired ? '#FEF2F2' : '#ffffff',
                  border: isExpired ? '2px solid #FCA5A5' : '1px solid rgba(224, 209, 192, 0.2)',
                  boxShadow: isExpired ? '0 4px 12px rgba(239, 68, 68, 0.2)' : '0 2px 8px rgba(45, 75, 57, 0.04)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: isExpired ? '0 8px 24px rgba(239, 68, 68, 0.3)' : '0 8px 24px rgba(45, 75, 57, 0.12)',
                  transition: { duration: 0.2 }
                }}
              >
                {/* Header con número y estado */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#2D4B39' }}>{returnItem.returnNumber}</h3>
                      <p className="text-sm" style={{ color: '#6B7280' }}>Pedido: {returnItem.originalOrder}</p>
                      <p className="text-xs" style={{ color: '#B8860B' }}>{returnItem.requestDate}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: statusColors.bg,
                          color: statusColors.text
                        }}
                      >
                        {returnItem.status}
                      </span>
                      {isExpired ? (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium animate-pulse">
                          Vencido
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                          {returnItem.daysLeft} días restantes
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contenido principal */}
                <div className="p-6">
                  {/* Cliente */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(45, 75, 57, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" style={{ color: '#2D4B39' }} />
                      <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Cliente</span>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#2D4B39' }}>{returnItem.customer.name}</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>
                      {returnItem.customer.documentType === 'cedula' ? 'CC' : 'CE'}: {returnItem.customer.documentNumber}
                    </p>
                  </div>
                  
                  {/* Productos */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(184, 134, 11, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4" style={{ color: '#B8860B' }} />
                      <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Productos</span>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#2D4B39' }}>
                      {returnItem.products.reduce((total: number, product: any) => total + product.quantity, 0)} productos a devolver
                    </p>
                    <p className="text-lg font-bold" style={{ color: '#B8860B' }}>
                      ${returnItem.totalRefund.toLocaleString('es-CO')}
                    </p>
                  </div>
                  
                  {/* Motivo */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4" style={{ color: '#F59E0B' }} />
                      <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Motivo</span>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#F59E0B' }}>{returnItem.reason.category}</p>
                    <p className="text-xs line-clamp-2" style={{ color: '#6B7280' }}>
                      {returnItem.reason.description}
                    </p>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setSelectedReturnInfo(returnItem); setShowReturnInfoDialog(true); }}
                      className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-gray-200"
                      style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                      title="Ver detalles"
                    >
                      <Info className="w-4 h-4 mx-auto" style={{ color: '#6B7280' }} />
                    </button>
                    <button 
                      onClick={() => handleViewReturnEvidence(returnItem)}
                      className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-blue-200"
                      style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      title="Ver evidencia"
                    >
                      <FileImage className="w-4 h-4 mx-auto" style={{ color: '#3B82F6' }} />
                    </button>
                    {returnItem.status === 'Pendiente' && (
                      <>
                        <button 
                          onClick={() => handleApproveReturn(returnItem.id)}
                          className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-green-200"
                          style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                          title="Aprobar devolución"
                        >
                          <Check className="w-4 h-4 mx-auto" style={{ color: '#10B981' }} />
                        </button>
                        <button 
                          onClick={() => handleRejectReturn(returnItem.id)}
                          className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-red-200"
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                          title="Rechazar devolución"
                        >
                          <X className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                        </button>
                      </>
                    )}
                    {returnItem.status === 'Aprobada' && (
                      <button 
                        onClick={() => handleProcessRefund(returnItem.id)}
                        className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-green-200"
                        style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                        title="Procesar reembolso"
                      >
                        <DollarSign className="w-4 h-4 mx-auto" style={{ color: '#10B981' }} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* DIÁLOGO DE INFORMACIÓN DE DEVOLUCIÓN */}
      <AnimatePresence>
        {showReturnInfoDialog && selectedReturnInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReturnInfoDialog(false)}
          >
            <motion.div
              className="rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
              <div className="flex items-center gap-4 mb-8 pb-6 border-b" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <RotateCcw className="w-8 h-8" style={{ color: '#2D4B39' }} />
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>{selectedReturnInfo.returnNumber}</h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>Información completa de la devolución</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Información del Cliente */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#B8860B' }}>Cliente</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Nombre:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedReturnInfo.customer.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Email:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedReturnInfo.customer.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Teléfono:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedReturnInfo.customer.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Información de la Devolución */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#B8860B' }}>Detalles</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Estado:</span>
                      <span className="text-sm font-medium" style={{ color: getReturnStatusColor(selectedReturnInfo.status).text }}>
                        {selectedReturnInfo.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Pedido Original:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedReturnInfo.originalOrder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Total Reembolso:</span>
                      <span className="text-lg font-bold" style={{ color: '#B8860B' }}>
                        ${selectedReturnInfo.totalRefund.toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div className="p-6 rounded-xl mb-8" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#B8860B' }}>Productos a Devolver</h3>
                <div className="space-y-3">
                  {selectedReturnInfo.products.map((product: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                      <div>
                        <p className="font-medium" style={{ color: '#2D4B39' }}>{product.name}</p>
                        <p className="text-sm" style={{ color: '#6B7280' }}>Cantidad: {product.quantity} | Condición: {product.condition}</p>
                      </div>
                      <p className="font-bold" style={{ color: '#B8860B' }}>
                        ${(product.price * product.quantity).toLocaleString('es-CO')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Motivo */}
              <div className="p-6 rounded-xl mb-8" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#F59E0B' }}>Motivo de la Devolución</h3>
                <p className="font-medium mb-2" style={{ color: '#F59E0B' }}>{selectedReturnInfo.reason.category}</p>
                <p className="text-sm" style={{ color: '#6B7280' }}>{selectedReturnInfo.reason.description}</p>
              </div>

              <div className="flex gap-3 pt-6 border-t" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <button
                  onClick={() => setShowReturnInfoDialog(false)}
                  className="flex-1 px-6 py-3 rounded-lg font-medium"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  Cerrar
                </button>
                {selectedReturnInfo.status === 'Pendiente' && (
                  <>
                    <button
                      onClick={() => {
                        handleApproveReturn(selectedReturnInfo.id);
                        setShowReturnInfoDialog(false);
                      }}
                      className="flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                      style={{ backgroundColor: '#10B981', color: '#ffffff' }}
                    >
                      <Check className="w-4 h-4" />
                      Aprobar
                    </button>
                    <button
                      onClick={() => {
                        handleRejectReturn(selectedReturnInfo.id);
                        setShowReturnInfoDialog(false);
                      }}
                      className="flex-1 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                      style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                    >
                      <X className="w-4 h-4" />
                      Rechazar
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DIÁLOGO DE EVIDENCIA */}
      <AnimatePresence>
        {showReturnEvidenceDialog && selectedReturnEvidence && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowReturnEvidenceDialog(false)}
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
                <FileImage className="w-8 h-8" style={{ color: '#2D4B39' }} />
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>Evidencia de Devolución</h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>{selectedReturnEvidence.returnNumber}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {selectedReturnEvidence.reason.evidence.map((evidence: string, index: number) => (
                  <div key={index} className="bg-gray-100 rounded-lg p-8 text-center">
                    <FileImage className="w-16 h-16 mx-auto mb-4" style={{ color: '#6B7280' }} />
                    <p className="text-lg font-semibold mb-2" style={{ color: '#2D4B39' }}>{evidence}</p>
                    <p className="text-sm" style={{ color: '#6B7280' }}>Archivo de evidencia #{index + 1}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowReturnEvidenceDialog(false)}
                className="w-full py-3 px-4 rounded-lg font-medium"
                style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL DE RESPUESTA A DEVOLUCIÓN */}
      <AnimatePresence>
        {showResponseModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResponseModal(false)}
          >
            <motion.div
              className="rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
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
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#2D4B39' }}>
                  {responseData.approved ? '✅ Aprobar Devolución' : '❌ Rechazar Devolución'}
                </h2>
                <p className="text-sm" style={{ color: '#6B7280' }}>Completa el formulario para responder a la solicitud</p>
              </div>

              <div className="space-y-4 mb-6">
                {/* Mensaje */}
                <div>
                  <label className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Mensaje</label>
                  <textarea
                    value={responseData.message}
                    onChange={(e) => setResponseData({ ...responseData, message: e.target.value })}
                    className="w-full mt-2 p-3 rounded-lg border"
                    style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}
                    rows={3}
                    placeholder="Mensaje que se enviará al cliente..."
                  />
                </div>

                {responseData.approved ? (
                  // Si está aprobado, mostrar campo de producto alternativo
                  <div>
                    <label className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Producto Alternativo</label>
                    <input
                      type="text"
                      value={responseData.alternative}
                      onChange={(e) => setResponseData({ ...responseData, alternative: e.target.value })}
                      className="w-full mt-2 p-3 rounded-lg border"
                      style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}
                      placeholder="Especifica el producto alternativo..."
                    />
                  </div>
                ) : (
                  // Si está rechazado, mostrar select de motivos
                  <div>
                    <label className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Motivo del Rechazo</label>
                    <select
                      value={responseData.reason}
                      onChange={(e) => setResponseData({ ...responseData, reason: e.target.value })}
                      className="w-full mt-2 p-3 rounded-lg border"
                      style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}
                    >
                      <option value="">Selecciona un motivo...</option>
                      {customRejectionReasons.map((reason, idx) => (
                        <option key={idx} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-6 border-t" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <button
                  onClick={() => {
                    setShowResponseModal(false);
                    setRespondingTo(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitResponse}
                  className="flex-1 py-3 px-4 rounded-lg font-medium text-white"
                  style={{
                    background: responseData.approved 
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                  }}
                >
                  {responseData.approved ? 'Aprobar' : 'Rechazar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}