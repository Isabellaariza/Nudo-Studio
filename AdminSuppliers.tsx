import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCog,
  Search,
  Plus,
  Edit,
  Trash2,
  Save,
  Phone,
  Mail,
  MapPin,
  Package,
  X
} from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';

export function AdminSuppliers() {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    status: 'active',
    productsProvided: '' // string separado por comas para edición
  });

  const resetForm = () => {
    setFormData({
      name: '',
      contact: '',
      email: '',
      phone: '',
      address: '',
      category: '',
      status: 'active',
      productsProvided: ''
    });
  };

  const handleAdd = () => {
    resetForm();
    setIsAddOpen(true);
  };

  const handleEdit = (supplier: any) => {
    setSelectedSupplier(supplier);
    setFormData({
      name: supplier.name,
      contact: supplier.contact,
      email: supplier.email,
      phone: supplier.phone,
      address: supplier.address,
      category: supplier.category,
      status: supplier.status,
      productsProvided: supplier.productsProvided.join(', ')
    });
    setIsEditOpen(true);
  };

  const handleSaveNew = () => {
    if (!formData.name || !formData.contact) {
      toast.error('Nombre y contacto son obligatorios');
      return;
    }

    addSupplier({
      id: Date.now(), // ID temporal simple
      ...formData,
      status: formData.status as 'active' | 'inactive',
      productsProvided: formData.productsProvided.split(',').map(s => s.trim()).filter(Boolean)
    });
    
    setIsAddOpen(false);
    resetForm();
  };

  const handleSaveEdit = () => {
    if (!selectedSupplier) return;

    updateSupplier(selectedSupplier.id, {
      ...formData,
      status: formData.status as 'active' | 'inactive',
      productsProvided: formData.productsProvided.split(',').map(s => s.trim()).filter(Boolean)
    });

    setIsEditOpen(false);
    setSelectedSupplier(null);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      deleteSupplier(id);
    }
  };

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* HEADER */}
        <motion.div 
          className="relative overflow-hidden mb-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(45, 75, 57, 0.1)',
            borderRadius: '24px',
            boxShadow: '0 8px 32px rgba(45, 75, 57, 0.08)'
          }}
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
                    <UserCog className="w-7 h-7" style={{ color: '#ffffff' }} />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Proveedores
                  </h1>
                  <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                    Gestión de proveedores y contactos
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Buscar proveedor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 w-64 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                
                <motion.button
                  onClick={handleAdd}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-4 h-4" />
                  Nuevo Proveedor
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GRID DE PROVEEDORES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map((supplier, index) => (
            <motion.div
              key={supplier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[#2D4B39]">{supplier.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <UserCog className="w-3 h-3" /> {supplier.contact}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  supplier.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {supplier.status === 'active' ? 'Activo' : 'Inactivo'}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-[#B8860B]" />
                  {supplier.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-[#B8860B]" />
                  {supplier.phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#B8860B]" />
                  {supplier.address}
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <Package className="w-4 h-4 text-[#B8860B] mt-1" />
                  <div>
                    <span className="font-medium text-gray-700">{supplier.category}:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {supplier.productsProvided.map((prod, idx) => (
                        <span key={idx} className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                          {prod}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(supplier)}
                  className="flex-1 py-2 rounded-lg bg-amber-50 text-[#B8860B] hover:bg-amber-100 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                >
                  <Edit className="w-4 h-4" /> Editar
                </button>
                <button
                  onClick={() => handleDelete(supplier.id)}
                  className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* MODAL AGREGAR/EDITAR */}
      <AnimatePresence>
        {(isAddOpen || isEditOpen) && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#2D4B39]">
                  {isAddOpen ? 'Nuevo Proveedor' : 'Editar Proveedor'}
                </h2>
                <button onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Nombre de la empresa"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
                  <Input 
                    value={formData.contact} 
                    onChange={e => setFormData({...formData, contact: e.target.value})}
                    placeholder="Nombre del contacto"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="email@empresa.com"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <Input 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="+57 300..."
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <Input 
                    value={formData.address} 
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="Dirección completa"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <Input 
                    value={formData.category} 
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    placeholder="Ej: Hilos, Madera..."
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({...formData, status: e.target.value})}
                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#2D4B39]"
                  >
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Productos Suministrados</label>
                  <Input 
                    value={formData.productsProvided} 
                    onChange={e => setFormData({...formData, productsProvided: e.target.value})}
                    placeholder="Separados por coma (ej: Hilo rojo, Cuentas)"
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-3 justify-end">
                <button 
                  onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Cancelar
                </button>
                <button 
                  onClick={isAddOpen ? handleSaveNew : handleSaveEdit}
                  className="px-4 py-2 rounded-lg bg-[#2D4B39] text-white hover:bg-[#1a2f23] font-medium flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Guardar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
