import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Save,
  Image as ImageIcon
} from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useApp } from '../../contexts/AppContext';

export function BlogDialogs() {
  const {
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
  } = useApp();

  const [blogSearchTerm, setBlogSearchTerm] = useState('');
  const [selectedBlogInfo, setSelectedBlogInfo] = useState<any>(null);
  const [showBlogInfoDialog, setShowBlogInfoDialog] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [showBlogDialog, setShowBlogDialog] = useState(false);
  const [isNewBlog, setIsNewBlog] = useState(false);

  const handleAddBlog = () => {
    setIsNewBlog(true);
    setEditingBlog({
      id: String(blogPosts.length + 1),
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      image: '',
      category: 'Técnicas',
      author: 'Isabella Ariza',
      published: true
    });
    setShowBlogDialog(true);
  };

  const handleEditBlog = (blog: any) => {
    setIsNewBlog(false);
    setEditingBlog({...blog});
    setShowBlogDialog(true);
  };

  const handleSaveBlog = () => {
    if (isNewBlog) {
      addBlogPost(editingBlog);
      toast.success('Artículo creado exitosamente');
    } else {
      updateBlogPost(editingBlog.id, editingBlog);
      toast.success('Artículo actualizado exitosamente');
    }
    setShowBlogDialog(false);
    setEditingBlog(null);
  };

  const handleDeleteBlog = (blogId: string) => {
    if (confirm('¿Estás seguro de eliminar este artículo?')) {
      deleteBlogPost(blogId);
      toast.success('Artículo eliminado exitosamente');
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
                    <BookOpen className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión del Blog
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {blogPosts.length} artículos publicados
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {blogPosts.filter(post => post.published).length} activos
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
                    placeholder="Buscar artículos..."
                    value={blogSearchTerm}
                    onChange={(e) => setBlogSearchTerm(e.target.value)}
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
                  onClick={handleAddBlog}
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
                  Nuevo Artículo
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
          {(blogSearchTerm ? blogPosts.filter(post => 
            post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(blogSearchTerm.toLowerCase())
          ) : blogPosts).map((post: any, index: number) => (
            <motion.div
              key={post.id}
              className="group cursor-pointer backdrop-blur-xl overflow-hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '1.5rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(224, 209, 192, 0.2)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transition: { duration: 0.3 }
              }}
            >
              {/* IMAGEN */}
              <div 
                className="relative overflow-hidden" 
                style={{ 
                  aspectRatio: '16/10',
                  backgroundColor: 'rgba(224, 209, 192, 0.2)'
                }}
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* OVERLAY EN HOVER */}
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: '#2D4B39' }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.2 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Badge de categoría */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
                    backgroundColor: 'rgba(184, 134, 11, 0.9)',
                    color: '#ffffff'
                  }}>
                    {post.category}
                  </span>
                </div>

                {/* Estado de publicación */}
                <div className="absolute top-4 right-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    post.published 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {post.published ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
              </div>

              {/* CONTENIDO */}
              <div className="p-6">
                {/* FECHA */}
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-3.5 h-3.5" style={{ color: '#B8860B' }} />
                  <span className="text-xs" style={{ color: '#B8860B' }}>
                    {post.date}
                  </span>
                </div>

                {/* TÍTULO */}
                <h3 
                  className="font-elegant text-lg mb-3 transition-colors duration-300 group-hover:text-[#B8860B] line-clamp-2"
                  style={{ color: '#2D4B39' }}
                >
                  {post.title}
                </h3>

                {/* EXTRACTO */}
                <p 
                  className="text-sm mb-4 leading-relaxed line-clamp-3"
                  style={{ color: 'rgba(45, 75, 57, 0.7)' }}
                >
                  {post.excerpt}
                </p>

                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => { setSelectedBlogInfo(post); setShowBlogInfoDialog(true); }}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-gray-200"
                    style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                  >
                    <Eye className="w-4 h-4 mx-auto" style={{ color: '#6B7280' }} />
                  </button>
                  <button 
                    onClick={() => handleEditBlog(post)}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-yellow-200"
                    style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}
                  >
                    <Edit className="w-4 h-4 mx-auto" style={{ color: '#B8860B' }} />
                  </button>
                  <button 
                    onClick={() => handleDeleteBlog(post.id)}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-red-200"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  >
                    <Trash2 className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* DIÁLOGO DE INFORMACIÓN DEL ARTÍCULO */}
      <AnimatePresence>
        {showBlogInfoDialog && selectedBlogInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBlogInfoDialog(false)}
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
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#2D4B39' }}
                >
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>{selectedBlogInfo.title}</h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>Vista previa del artículo</p>
                </div>
              </div>

              {/* Imagen del artículo */}
              <div className="mb-6 rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <ImageWithFallback
                  src={selectedBlogInfo.image}
                  alt={selectedBlogInfo.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs px-3 py-1 rounded-full" style={{
                    backgroundColor: 'rgba(184, 134, 11, 0.1)',
                    color: '#B8860B'
                  }}>
                    {selectedBlogInfo.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" style={{ color: '#B8860B' }} />
                    <span className="text-sm" style={{ color: '#B8860B' }}>{selectedBlogInfo.date}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#2D4B39' }}>Extracto</h3>
                  <p className="text-gray-700">{selectedBlogInfo.excerpt}</p>
                </div>

                {selectedBlogInfo.content && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: '#2D4B39' }}>Contenido</h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedBlogInfo.content}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowBlogInfoDialog(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setShowBlogInfoDialog(false);
                    handleEditBlog(selectedBlogInfo);
                  }}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
                >
                  Editar Artículo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DIÁLOGO PARA EDITAR/AGREGAR ARTÍCULO */}
      <AnimatePresence>
        {showBlogDialog && editingBlog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBlogDialog(false)}
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
              <div className="flex items-center gap-4 mb-6">
                <BookOpen className="w-8 h-8" style={{ color: '#2D4B39' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                  {isNewBlog ? 'Nuevo Artículo' : 'Editar Artículo'}
                </h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Título</label>
                    <input
                      value={editingBlog.title}
                      onChange={(e) => setEditingBlog({...editingBlog, title: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                      placeholder="Título del artículo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Categoría</label>
                    <select
                      value={editingBlog.category}
                      onChange={(e) => setEditingBlog({...editingBlog, category: e.target.value})}
                      className="w-full p-3 border rounded-lg"
                    >
                      <option value="Técnicas">Técnicas</option>
                      <option value="Talleres">Talleres</option>
                      <option value="Sostenibilidad">Sostenibilidad</option>
                      <option value="Eventos">Eventos</option>
                      <option value="Inspiración">Inspiración</option>
                      <option value="Proceso">Proceso</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>URL de la Imagen</label>
                  <input
                    value={editingBlog.image}
                    onChange={(e) => setEditingBlog({...editingBlog, image: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Extracto</label>
                  <textarea
                    value={editingBlog.excerpt}
                    onChange={(e) => setEditingBlog({...editingBlog, excerpt: e.target.value})}
                    className="w-full p-3 border rounded-lg h-24"
                    placeholder="Breve descripción del artículo..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Contenido</label>
                  <textarea
                    value={editingBlog.content}
                    onChange={(e) => setEditingBlog({...editingBlog, content: e.target.value})}
                    className="w-full p-3 border rounded-lg h-40"
                    placeholder="Contenido completo del artículo..."
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: 'rgba(45, 75, 57, 0.05)' }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${editingBlog.published ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                    <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>
                      {editingBlog.published ? 'Artículo Publicado' : 'Borrador'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingBlog({ ...editingBlog, published: !editingBlog.published })}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      editingBlog.published ? 'bg-green-500' : 'bg-gray-500'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        editingBlog.published ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowBlogDialog(false)}
                  className="flex-1 py-3 px-4 rounded-lg font-medium"
                  style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveBlog}
                  className="flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
                  style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
                >
                  <Save className="w-4 h-4" />
                  {isNewBlog ? 'Crear Artículo' : 'Guardar Cambios'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}