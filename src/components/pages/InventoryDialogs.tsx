import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  AlertTriangle,
  Image
} from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';

export function InventoryDialogs() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useApp();

  const [activeInventoryTab, setActiveInventoryTab] = useState('finished-products');
  const [inventorySearchTerm, setInventorySearchTerm] = useState('');
  
  // Estados para materias primas (datos locales)
  const [rawMaterials, setRawMaterials] = useState([
    {
      id: 1,
      name: 'Hilo de Algodón Natural',
      description: 'Hilo 100% algodón para tejidos y macramé, disponible en varios colores.',
      stock: 25,
      minStock: 10,
      unit: 'rollos',
      supplier: 'Textiles Andinos',
      cost: 12000,
      category: 'Hilos',
      lastPurchase: '2024-01-15'
    },
    {
      id: 2,
      name: 'Cuentas de Madera Natural',
      description: 'Cuentas redondas de madera natural de 8mm, perfectas para joyería artesanal.',
      stock: 5,
      minStock: 20,
      unit: 'paquetes',
      supplier: 'Maderas del Valle',
      cost: 8500,
      category: 'Cuentas',
      lastPurchase: '2024-01-10'
    },
    {
      id: 3,
      name: 'Piedras Semipreciosas',
      description: 'Mix de piedras semipreciosas: cuarzo, amatista y jade para joyería.',
      stock: 3,
      minStock: 15,
      unit: 'sets',
      supplier: 'Gemas Naturales',
      cost: 35000,
      category: 'Piedras',
      lastPurchase: '2023-12-20'
    }
  ]);

  // Estados para diálogos
  const [selectedProductInfo, setSelectedProductInfo] = useState<any>(null);
  const [showProductInfoDialog, setShowProductInfoDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const [selectedMaterialInfo, setSelectedMaterialInfo] = useState<any>(null);
  const [showMaterialInfoDialog, setShowMaterialInfoDialog] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [isNewMaterial, setIsNewMaterial] = useState(false);

  // Funciones para productos
  const handleAddProduct = () => {
    setIsNewProduct(true);
    setEditingProduct({
      id: products.length + 1,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      image: '',
      materials: [],
      size: '',
      weight: '',
      status: 'active'
    });
    setShowProductDialog(true);
  };

  const handleEditProduct = (product: any) => {
    setIsNewProduct(false);
    setEditingProduct({...product});
    setShowProductDialog(true);
  };

  const handleSaveProduct = () => {
    if (isNewProduct) {
      addProduct(editingProduct);
      toast.success('Producto agregado exitosamente');
    } else {
      updateProduct(editingProduct.id, editingProduct);
      toast.success('Producto actualizado exitosamente');
    }
    setShowProductDialog(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(productId);
      toast.success('Producto eliminado exitosamente');
    }
  };

  // Funciones para materiales
  const handleAddMaterial = () => {
    setIsNewMaterial(true);
    setEditingMaterial({
      id: rawMaterials.length + 1,
      name: '',
      description: '',
      stock: 0,
      minStock: 0,
      unit: 'unidades',
      supplier: '',
      cost: 0,
      category: '',
      lastPurchase: new Date().toISOString().split('T')[0]
    });
    setShowMaterialDialog(true);
  };

  const handleEditMaterial = (material: any) => {
    setIsNewMaterial(false);
    setEditingMaterial({...material});
    setShowMaterialDialog(true);
  };

  const handleSaveMaterial = () => {
    if (isNewMaterial) {
      setRawMaterials([...rawMaterials, editingMaterial]);
      toast.success('Material agregado exitosamente');
    } else {
      setRawMaterials(rawMaterials.map(mat => mat.id === editingMaterial.id ? editingMaterial : mat));
      toast.success('Material actualizado exitosamente');
    }
    setShowMaterialDialog(false);
    setEditingMaterial(null);
  };

  const handleDeleteMaterial = (materialId: number) => {
    if (confirm('¿Estás seguro de eliminar este material?')) {
      setRawMaterials(rawMaterials.filter(mat => mat.id !== materialId));
      toast.success('Material eliminado exitosamente');
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
                    <Package className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Stock
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {products.length} productos terminados, {rawMaterials.length} materias primas
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-xs" style={{ color: '#ef4444' }}>
                        {rawMaterials.filter(mat => mat.stock <= mat.minStock).length} críticos
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
                    placeholder="Buscar en stock..."
                    value={inventorySearchTerm}
                    onChange={(e) => setInventorySearchTerm(e.target.value)}
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
                  onClick={activeInventoryTab === 'finished-products' ? handleAddProduct : handleAddMaterial}
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
                  {activeInventoryTab === 'finished-products' ? 'Nuevo Producto' : 'Nuevo Material'}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="flex gap-2 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <button
            onClick={() => setActiveInventoryTab('finished-products')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeInventoryTab === 'finished-products' ? 'scale-105' : 'hover:scale-105'
            }`}
            style={{
              background: activeInventoryTab === 'finished-products' 
                ? 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)' 
                : 'rgba(45, 75, 57, 0.1)',
              color: activeInventoryTab === 'finished-products' ? '#ffffff' : '#2D4B39',
              boxShadow: activeInventoryTab === 'finished-products' 
                ? '0 4px 12px rgba(45, 75, 57, 0.3)' 
                : 'none'
            }}
          >
            Productos Terminados
          </button>
          <button
            onClick={() => setActiveInventoryTab('raw-materials')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeInventoryTab === 'raw-materials' ? 'scale-105' : 'hover:scale-105'
            }`}
            style={{
              background: activeInventoryTab === 'raw-materials' 
                ? 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)' 
                : 'rgba(45, 75, 57, 0.1)',
              color: activeInventoryTab === 'raw-materials' ? '#ffffff' : '#2D4B39',
              boxShadow: activeInventoryTab === 'raw-materials' 
                ? '0 4px 12px rgba(45, 75, 57, 0.3)' 
                : 'none'
            }}
          >
            Materias Primas
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeInventoryTab === 'finished-products' && (
            <motion.div
              key="finished-products"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {products.map((product: any, index: number) => (
                <motion.div
                  key={product.id}
                  className="group bg-white rounded-[1.5rem] p-3 shadow-sm hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <motion.div 
                    className="relative aspect-square overflow-hidden mb-3 rounded-xl"
                    style={{ backgroundColor: 'rgba(224, 209, 192, 0.2)' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-16 h-16" style={{ color: '#2D4B39' }} />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-base font-semibold mb-2 line-clamp-1" style={{ color: '#2D4B39' }}>
                    {product.name}
                  </h3>
                  
                  <div className="mb-3">
                    <p className="text-sm line-clamp-2 min-h-[2.5rem]" style={{ color: 'rgba(45, 75, 57, 0.6)' }}>
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4" style={{ color: '#B8860B' }} />
                      <span className="text-sm font-medium" style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className="text-sm" style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
                        {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <motion.span 
                      className="font-bold text-lg"
                      style={{ color: '#B8860B' }}
                      whileHover={{ scale: 1.05 }}
                    >
                      ${product.price.toLocaleString('es-CO')}
                    </motion.span>
                    <span className="text-sm font-medium" style={{ color: product.stock > 0 ? '#10B981' : '#ef4444' }}>
                      Stock: {product.stock}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setSelectedProductInfo(product); setShowProductInfoDialog(true); }}
                      className="flex-1 py-2 px-2 rounded-lg transition-colors hover:bg-gray-200"
                      style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                    >
                      <Eye className="w-4 h-4 mx-auto" style={{ color: '#6B7280' }} />
                    </button>
                    <button 
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 py-2 px-2 rounded-lg transition-colors hover:bg-yellow-200"
                      style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}
                    >
                      <Edit className="w-4 h-4 mx-auto" style={{ color: '#B8860B' }} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 py-2 px-2 rounded-lg transition-colors hover:bg-red-200"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    >
                      <Trash2 className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeInventoryTab === 'raw-materials' && (
            <motion.div
              key="raw-materials"
              className="overflow-x-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead style={{ backgroundColor: '#2D4B39' }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">NOMBRE</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">CANTIDAD</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PROVEEDOR</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PRECIO</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
                  {(inventorySearchTerm ? rawMaterials.filter(mat => 
                    mat.name.toLowerCase().includes(inventorySearchTerm.toLowerCase()) ||
                    mat.supplier.toLowerCase().includes(inventorySearchTerm.toLowerCase())
                  ) : rawMaterials).map((material: any, index: number) => (
                    <tr key={material.id} className="hover:bg-gray-50 transition-all duration-300">
                      <td className="px-6 py-4 font-semibold text-gray-900">{material.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{material.stock} {material.unit}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{material.supplier}</td>
                      <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#B8860B' }}>${material.cost.toLocaleString('es-CO')}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setSelectedMaterialInfo(material); setShowMaterialInfoDialog(true); }}
                            className="py-2 px-3 rounded-lg transition-colors hover:bg-gray-100 text-sm"
                            title="Ver más"
                          >
                            Ver Más
                          </button>
                          <button
                            onClick={() => handleEditMaterial(material)}
                            className="py-2 px-3 rounded-lg transition-colors hover:bg-yellow-50 text-sm"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteMaterial(material.id)}
                            className="py-2 px-3 rounded-lg transition-colors hover:bg-red-50 text-sm"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Diálogos de productos y materiales */}
      <AnimatePresence>
        {showProductDialog && editingProduct && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowProductDialog(false)}
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
                <Package className="w-8 h-8" style={{ color: '#2D4B39' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                  {isNewProduct ? 'Nuevo Producto' : 'Editar Producto'}
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Nombre</label>
                  <input
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Nombre del producto"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Descripción</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                    className="w-full p-3 border rounded-lg h-20"
                    placeholder="Descripción del producto"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Precio</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: parseInt(e.target.value)})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Stock</label>
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Categoría</label>
                  <input
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Categoría del producto"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowProductDialog(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
                >
                  <Save className="w-4 h-4" />
                  {isNewProduct ? 'Crear' : 'Guardar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMaterialDialog && editingMaterial && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowMaterialDialog(false)}
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
                <Package className="w-8 h-8" style={{ color: '#2D4B39' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                  {isNewMaterial ? 'Nuevo Material' : 'Editar Material'}
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Nombre</label>
                  <input
                    value={editingMaterial.name}
                    onChange={(e) => setEditingMaterial({...editingMaterial, name: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Nombre del material"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Descripción</label>
                  <textarea
                    value={editingMaterial.description}
                    onChange={(e) => setEditingMaterial({...editingMaterial, description: e.target.value})}
                    className="w-full p-3 border rounded-lg h-20"
                    placeholder="Descripción del material"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Stock Actual</label>
                    <input
                      type="number"
                      value={editingMaterial.stock}
                      onChange={(e) => setEditingMaterial({...editingMaterial, stock: parseInt(e.target.value)})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Stock Mínimo</label>
                    <input
                      type="number"
                      value={editingMaterial.minStock}
                      onChange={(e) => setEditingMaterial({...editingMaterial, minStock: parseInt(e.target.value)})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Categoría</label>
                    <input
                      value={editingMaterial.category}
                      onChange={(e) => setEditingMaterial({...editingMaterial, category: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Categoría"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Unidad</label>
                    <input
                      value={editingMaterial.unit}
                      onChange={(e) => setEditingMaterial({...editingMaterial, unit: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="unidades"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Proveedor</label>
                    <input
                      value={editingMaterial.supplier}
                      onChange={(e) => setEditingMaterial({...editingMaterial, supplier: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Nombre del proveedor"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Costo</label>
                    <input
                      type="number"
                      value={editingMaterial.cost}
                      onChange={(e) => setEditingMaterial({...editingMaterial, cost: parseInt(e.target.value)})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowMaterialDialog(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveMaterial}
                  className="flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
                >
                  <Save className="w-4 h-4" />
                  {isNewMaterial ? 'Crear' : 'Guardar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}