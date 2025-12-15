import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  Calendar,
  Package,
  Send,
  Save,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';

export function QuoteDialogs() {
  const [quoteSearchTerm, setQuoteSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const QUOTES_PER_PAGE = 6;

  const [quotesData, setQuotesData] = useState([
    {
      id: 'COT-001',
      clientName: 'María González',
      clientEmail: 'maria@email.com',
      service: 'Macramé Personalizado',
      description: 'Cortina de macramé para sala de estar, diseño bohemio con flecos',
      quantity: 1,
      unitPrice: 150000,
      totalPrice: 150000,
      status: 'pendiente',
      createdDate: '2025-01-10',
      expiryDate: '2025-01-25',
      notes: 'Cliente prefiere colores neutros'
    },
    {
      id: 'COT-002',
      clientName: 'Carlos Mendoza',
      clientEmail: 'carlos@email.com',
      service: 'Taller Grupal',
      description: 'Taller de macramé básico para 8 personas',
      quantity: 8,
      unitPrice: 45000,
      totalPrice: 360000,
      status: 'enviada',
      createdDate: '2025-01-08',
      expiryDate: '2025-01-23',
    },
    {
      id: 'COT-003',
      clientName: 'Ana Rodríguez',
      clientEmail: 'ana@email.com',
      service: 'Kit DIY',
      description: 'Kit completo para hacer tapiz de pared mediano',
      quantity: 3,
      unitPrice: 35000,
      totalPrice: 105000,
      status: 'aprobada',
      createdDate: '2025-01-05',
      expiryDate: '2025-01-20',
    }
  ]);

  const [selectedQuoteInfo, setSelectedQuoteInfo] = useState<any>(null);
  const [showQuoteInfoDialog, setShowQuoteInfoDialog] = useState(false);
  const [editingQuote, setEditingQuote] = useState<any>(null);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [isNewQuote, setIsNewQuote] = useState(false);

  // Filtrado y paginación
  const filteredQuotes = quoteSearchTerm 
    ? quotesData.filter(quote => 
        quote.clientName.toLowerCase().includes(quoteSearchTerm.toLowerCase()) ||
        quote.service.toLowerCase().includes(quoteSearchTerm.toLowerCase()) ||
        quote.id.toLowerCase().includes(quoteSearchTerm.toLowerCase())
      )
    : quotesData;

  const totalPages = Math.ceil(filteredQuotes.length / QUOTES_PER_PAGE);
  const displayedQuotes = filteredQuotes.slice(
    (currentPage - 1) * QUOTES_PER_PAGE,
    currentPage * QUOTES_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const getQuoteStatusColor = (status: string) => {
    switch (status) {
      case 'pendiente': return { bg: '#FEF3C7', text: '#92400E' };
      case 'enviada': return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'aprobada': return { bg: '#D1FAE5', text: '#065F46' };
      case 'rechazada': return { bg: '#FEE2E2', text: '#991B1B' };
      case 'expirada': return { bg: '#F3F4F6', text: '#374151' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const statusIcons = {
    pendiente: Clock,
    enviada: Send,
    aprobada: CheckCircle,
    rechazada: XCircle,
    expirada: Clock
  };

  const handleAddQuote = () => {
    setIsNewQuote(true);
    setEditingQuote({
      id: `COT-${String(quotesData.length + 1).padStart(3, '0')}`,
      clientName: '',
      clientEmail: '',
      service: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      status: 'pendiente',
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      notes: ''
    });
    setShowQuoteDialog(true);
  };

  const handleEditQuote = (quote: any) => {
    setIsNewQuote(false);
    setEditingQuote({...quote});
    setShowQuoteDialog(true);
  };

  const handleSaveQuote = () => {
    const updatedQuote = {
      ...editingQuote,
      totalPrice: editingQuote.quantity * editingQuote.unitPrice
    };
    
    if (isNewQuote) {
      setQuotesData([...quotesData, updatedQuote]);
      toast.success('Cotización creada exitosamente');
    } else {
      setQuotesData(quotesData.map(quote => quote.id === editingQuote.id ? updatedQuote : quote));
      toast.success('Cotización actualizada exitosamente');
    }
    setShowQuoteDialog(false);
    setEditingQuote(null);
  };

  const handleDeleteQuote = (quoteId: string) => {
    if (confirm('¿Estás seguro de eliminar esta cotización?')) {
      setQuotesData(quotesData.filter(quote => quote.id !== quoteId));
      toast.success('Cotización eliminada exitosamente');
    }
  };

  const handleStatusChange = (quoteId: string, newStatus: string) => {
    setQuotesData(quotesData.map(quote => quote.id === quoteId ? { ...quote, status: newStatus } : quote));
    toast.success('Estado actualizado');
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
                    <FileText className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Cotizaciones
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {quotesData.length} cotizaciones registradas
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {quotesData.filter(quote => quote.status === 'aprobada').length} aprobadas
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
                    placeholder="Buscar cotizaciones..."
                    value={quoteSearchTerm}
                    onChange={(e) => {
                      setQuoteSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
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
                  onClick={handleAddQuote}
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
                  Nueva Cotización
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
          {displayedQuotes.map((quote: any, index: number) => {
            const StatusIcon = statusIcons[quote.status as keyof typeof statusIcons];
            return (
              <motion.div
                key={quote.id}
                className="relative overflow-hidden rounded-2xl p-6 group"
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
              >
                {/* Header con ID y estado */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>{quote.id}</h3>
                    <p className="text-sm" style={{ color: '#6B7280' }}>{quote.clientName}</p>
                  </div>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: getQuoteStatusColor(quote.status).bg,
                      color: getQuoteStatusColor(quote.status).text
                    }}
                  >
                    {quote.status}
                  </span>
                </div>
                
                {/* Información del servicio con iconos */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" style={{ color: '#B8860B' }} />
                    <span className="text-sm" style={{ color: '#2D4B39' }}>{quote.service}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" style={{ color: '#B8860B' }} />
                    <span className="text-sm font-medium" style={{ color: '#2D4B39' }}>${quote.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: '#B8860B' }} />
                    <span className="text-sm" style={{ color: '#B8860B' }}>Vence: {new Date(quote.expiryDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {/* Badge de cantidad */}
                <div className="mb-4">
                  <span className="text-xs px-3 py-1 rounded-full" style={{
                    backgroundColor: '#FEF3C7',
                    color: '#92400E'
                  }}>
                    Cantidad: {quote.quantity}
                  </span>
                </div>
                  
                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setSelectedQuoteInfo(quote); setShowQuoteInfoDialog(true); }}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-gray-200"
                    style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                  >
                    <Eye className="w-4 h-4 mx-auto" style={{ color: '#6B7280' }} />
                  </button>
                  <button 
                    onClick={() => handleEditQuote(quote)}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-yellow-200"
                    style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}
                  >
                    <Edit className="w-4 h-4 mx-auto" style={{ color: '#B8860B' }} />
                  </button>
                  <button 
                    onClick={() => handleDeleteQuote(quote.id)}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-red-200"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  >
                    <Trash2 className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#2D4B39]" />
            </button>
            <span className="text-sm font-medium text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#2D4B39]" />
            </button>
          </div>
        )}
      </motion.div>

      {/* DIÁLOGO DE INFORMACIÓN DE LA COTIZACIÓN */}
      <AnimatePresence>
        {showQuoteInfoDialog && selectedQuoteInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuoteInfoDialog(false)}
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
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#2D4B39' }}
                >
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>{selectedQuoteInfo.id}</h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>Detalles de la cotización</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <select
                      value={selectedQuoteInfo.status}
                      onChange={(e) => handleStatusChange(selectedQuoteInfo.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="enviada">Enviada</option>
                      <option value="aprobada">Aprobada</option>
                      <option value="rechazada">Rechazada</option>
                      <option value="expirada">Expirada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                    <p className="text-gray-900">{selectedQuoteInfo.clientName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedQuoteInfo.clientEmail}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                    <p className="text-gray-900">{selectedQuoteInfo.service}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <p className="text-gray-900">{selectedQuoteInfo.description}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                    <p className="text-gray-900">{selectedQuoteInfo.quantity}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                    <p className="text-gray-900">${selectedQuoteInfo.unitPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                    <p className="text-gray-900 font-bold text-lg">${selectedQuoteInfo.totalPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Creación</label>
                    <p className="text-gray-900">{new Date(selectedQuoteInfo.createdDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Vencimiento</label>
                    <p className="text-gray-900">{new Date(selectedQuoteInfo.expiryDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {selectedQuoteInfo.notes && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                    <p className="text-gray-900">{selectedQuoteInfo.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowQuoteInfoDialog(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setShowQuoteInfoDialog(false);
                    handleEditQuote(selectedQuoteInfo);
                  }}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
                >
                  Editar Cotización
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DIÁLOGO PARA EDITAR/AGREGAR COTIZACIÓN */}
      <AnimatePresence>
        {showQuoteDialog && editingQuote && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQuoteDialog(false)}
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
              <div className="flex items-center gap-4 mb-6">
                <FileText className="w-8 h-8" style={{ color: '#2D4B39' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                  {isNewQuote ? 'Nueva Cotización' : 'Editar Cotización'}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Nombre del Cliente</label>
                    <input
                      value={editingQuote.clientName}
                      onChange={(e) => setEditingQuote({...editingQuote, clientName: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Nombre completo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Email del Cliente</label>
                    <input
                      type="email"
                      value={editingQuote.clientEmail}
                      onChange={(e) => setEditingQuote({...editingQuote, clientEmail: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="email@ejemplo.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Servicio</label>
                  <select
                    value={editingQuote.service}
                    onChange={(e) => setEditingQuote({...editingQuote, service: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="">Seleccionar servicio</option>
                    <option value="Macramé Personalizado">Macramé Personalizado</option>
                    <option value="Taller Individual">Taller Individual</option>
                    <option value="Taller Grupal">Taller Grupal</option>
                    <option value="Kit DIY">Kit DIY</option>
                    <option value="Consultoría de Diseño">Consultoría de Diseño</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Descripción</label>
                  <textarea
                    value={editingQuote.description}
                    onChange={(e) => setEditingQuote({...editingQuote, description: e.target.value})}
                    className="w-full p-3 border rounded-lg h-24"
                    placeholder="Descripción detallada del servicio..."
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Cantidad</label>
                    <input
                      type="number"
                      min="1"
                      value={editingQuote.quantity}
                      onChange={(e) => setEditingQuote({...editingQuote, quantity: parseInt(e.target.value)})}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Precio Unitario</label>
                    <input
                      type="number"
                      min="0"
                      value={editingQuote.unitPrice}
                      onChange={(e) => setEditingQuote({...editingQuote, unitPrice: parseFloat(e.target.value)})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Total</label>
                    <div className="w-full p-3 bg-gray-50 border rounded-lg text-gray-900 font-semibold">
                      ${((editingQuote.quantity || 0) * (editingQuote.unitPrice || 0)).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Fecha de Vencimiento</label>
                  <input
                    type="date"
                    value={editingQuote.expiryDate}
                    onChange={(e) => setEditingQuote({...editingQuote, expiryDate: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Notas (Opcional)</label>
                  <textarea
                    value={editingQuote.notes}
                    onChange={(e) => setEditingQuote({...editingQuote, notes: e.target.value})}
                    className="w-full p-3 border rounded-lg h-20"
                    placeholder="Notas adicionales..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowQuoteDialog(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveQuote}
                  className="flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
                >
                  <Save className="w-4 h-4" />
                  {isNewQuote ? 'Crear Cotización' : 'Guardar Cambios'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}