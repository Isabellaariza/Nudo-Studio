import React, { useState } from 'react';
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
  User,
  Package,
  Send
} from 'lucide-react';

interface Quote {
  id: string;
  clientName: string;
  clientEmail: string;
  service: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  status: 'pendiente' | 'enviada' | 'aprobada' | 'rechazada' | 'expirada';
  createdDate: string;
  expiryDate: string;
  notes?: string;
}

const QuoteDialogs: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([
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

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);

  const [newQuote, setNewQuote] = useState<Partial<Quote>>({
    clientName: '',
    clientEmail: '',
    service: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    status: 'pendiente',
    expiryDate: '',
    notes: ''
  });

  const statusColors = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    enviada: 'bg-blue-100 text-blue-800',
    aprobada: 'bg-green-100 text-green-800',
    rechazada: 'bg-red-100 text-red-800',
    expirada: 'bg-gray-100 text-gray-800'
  };

  const statusIcons = {
    pendiente: Clock,
    enviada: Send,
    aprobada: CheckCircle,
    rechazada: XCircle,
    expirada: Clock
  };

  const filteredQuotes = quotes.filter(quote =>
    quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateQuote = () => {
    if (newQuote.clientName && newQuote.service && newQuote.unitPrice) {
      const quote: Quote = {
        id: `COT-${String(quotes.length + 1).padStart(3, '0')}`,
        clientName: newQuote.clientName!,
        clientEmail: newQuote.clientEmail!,
        service: newQuote.service!,
        description: newQuote.description!,
        quantity: newQuote.quantity!,
        unitPrice: newQuote.unitPrice!,
        totalPrice: newQuote.quantity! * newQuote.unitPrice!,
        status: 'pendiente',
        createdDate: new Date().toISOString().split('T')[0],
        expiryDate: newQuote.expiryDate!,
        notes: newQuote.notes
      };
      
      setQuotes([...quotes, quote]);
      setNewQuote({
        clientName: '',
        clientEmail: '',
        service: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        status: 'pendiente',
        expiryDate: '',
        notes: ''
      });
      setShowCreateDialog(false);
    }
  };

  const handleUpdateQuote = () => {
    if (editingQuote) {
      const updatedQuote = {
        ...editingQuote,
        totalPrice: editingQuote.quantity * editingQuote.unitPrice
      };
      
      setQuotes(quotes.map(q => q.id === editingQuote.id ? updatedQuote : q));
      setEditingQuote(null);
      setShowCreateDialog(false);
    }
  };

  const handleDeleteQuote = (id: string) => {
    setQuotes(quotes.filter(q => q.id !== id));
  };

  const handleStatusChange = (id: string, newStatus: Quote['status']) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, status: newStatus } : q));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#2D4B39] rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Gestión de Cotizaciones</h2>
            <p className="text-gray-600">{quotes.length} cotizaciones registradas</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateDialog(true)}
          className="flex items-center space-x-2 bg-[#2D4B39] text-white px-4 py-2 rounded-lg hover:bg-[#1e3327] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Cotización</span>
        </motion.button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar cotizaciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
        />
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredQuotes.map((quote) => {
            const StatusIcon = statusIcons[quote.status];
            return (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">{quote.id}</h3>
                      <p className="text-sm text-gray-600">{quote.clientName}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusColors[quote.status]}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{quote.status}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Package className="w-4 h-4" />
                      <span>{quote.service}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">${quote.totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Vence: {new Date(quote.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedQuote(quote);
                        setShowQuoteDialog(true);
                      }}
                      className="flex-1 flex items-center justify-center space-x-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Ver</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setEditingQuote(quote);
                        setShowCreateDialog(true);
                      }}
                      className="flex-1 flex items-center justify-center space-x-1 bg-orange-50 text-orange-600 px-3 py-2 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Editar</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteQuote(quote.id)}
                      className="flex items-center justify-center bg-red-50 text-red-600 px-3 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Quote Details Dialog */}
      <AnimatePresence>
        {showQuoteDialog && selectedQuote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowQuoteDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Detalles de Cotización</h3>
                  <button
                    onClick={() => setShowQuoteDialog(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ID Cotización</label>
                      <p className="text-gray-900 font-semibold">{selectedQuote.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                      <select
                        value={selectedQuote.status}
                        onChange={(e) => handleStatusChange(selectedQuote.id, e.target.value as Quote['status'])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="enviada">Enviada</option>
                        <option value="aprobada">Aprobada</option>
                        <option value="rechazada">Rechazada</option>
                        <option value="expirada">Expirada</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                      <p className="text-gray-900">{selectedQuote.clientName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <p className="text-gray-900">{selectedQuote.clientEmail}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                    <p className="text-gray-900">{selectedQuote.service}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <p className="text-gray-900">{selectedQuote.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                      <p className="text-gray-900">{selectedQuote.quantity}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                      <p className="text-gray-900">${selectedQuote.unitPrice.toLocaleString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                      <p className="text-gray-900 font-bold text-lg">${selectedQuote.totalPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Creación</label>
                      <p className="text-gray-900">{new Date(selectedQuote.createdDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Vencimiento</label>
                      <p className="text-gray-900">{new Date(selectedQuote.expiryDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {selectedQuote.notes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                      <p className="text-gray-900">{selectedQuote.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create/Edit Quote Dialog */}
      <AnimatePresence>
        {showCreateDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowCreateDialog(false);
              setEditingQuote(null);
              setNewQuote({
                clientName: '',
                clientEmail: '',
                service: '',
                description: '',
                quantity: 1,
                unitPrice: 0,
                status: 'pendiente',
                expiryDate: '',
                notes: ''
              });
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {editingQuote ? 'Editar Cotización' : 'Nueva Cotización'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowCreateDialog(false);
                      setEditingQuote(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Cliente</label>
                      <input
                        type="text"
                        value={editingQuote?.clientName || newQuote.clientName}
                        onChange={(e) => editingQuote 
                          ? setEditingQuote({...editingQuote, clientName: e.target.value})
                          : setNewQuote({...newQuote, clientName: e.target.value})
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email del Cliente</label>
                      <input
                        type="email"
                        value={editingQuote?.clientEmail || newQuote.clientEmail}
                        onChange={(e) => editingQuote 
                          ? setEditingQuote({...editingQuote, clientEmail: e.target.value})
                          : setNewQuote({...newQuote, clientEmail: e.target.value})
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                    <select
                      value={editingQuote?.service || newQuote.service}
                      onChange={(e) => editingQuote 
                        ? setEditingQuote({...editingQuote, service: e.target.value})
                        : setNewQuote({...newQuote, service: e.target.value})
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      value={editingQuote?.description || newQuote.description}
                      onChange={(e) => editingQuote 
                        ? setEditingQuote({...editingQuote, description: e.target.value})
                        : setNewQuote({...newQuote, description: e.target.value})
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                      placeholder="Descripción detallada del servicio..."
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                      <input
                        type="number"
                        min="1"
                        value={editingQuote?.quantity || newQuote.quantity}
                        onChange={(e) => editingQuote 
                          ? setEditingQuote({...editingQuote, quantity: parseInt(e.target.value)})
                          : setNewQuote({...newQuote, quantity: parseInt(e.target.value)})
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Precio Unitario</label>
                      <input
                        type="number"
                        min="0"
                        value={editingQuote?.unitPrice || newQuote.unitPrice}
                        onChange={(e) => editingQuote 
                          ? setEditingQuote({...editingQuote, unitPrice: parseFloat(e.target.value)})
                          : setNewQuote({...newQuote, unitPrice: parseFloat(e.target.value)})
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                      <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-semibold">
                        ${((editingQuote?.quantity || newQuote.quantity || 0) * (editingQuote?.unitPrice || newQuote.unitPrice || 0)).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento</label>
                    <input
                      type="date"
                      value={editingQuote?.expiryDate || newQuote.expiryDate}
                      onChange={(e) => editingQuote 
                        ? setEditingQuote({...editingQuote, expiryDate: e.target.value})
                        : setNewQuote({...newQuote, expiryDate: e.target.value})
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notas (Opcional)</label>
                    <textarea
                      value={editingQuote?.notes || newQuote.notes}
                      onChange={(e) => editingQuote 
                        ? setEditingQuote({...editingQuote, notes: e.target.value})
                        : setNewQuote({...newQuote, notes: e.target.value})
                      }
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2D4B39] focus:border-transparent"
                      placeholder="Notas adicionales..."
                    />
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={editingQuote ? handleUpdateQuote : handleCreateQuote}
                    className="flex-1 bg-[#2D4B39] text-white py-2 px-4 rounded-lg hover:bg-[#1e3327] transition-colors"
                  >
                    {editingQuote ? 'Actualizar Cotización' : 'Crear Cotización'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowCreateDialog(false);
                      setEditingQuote(null);
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuoteDialogs;