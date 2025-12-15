import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Plus, Search, Eye, Edit, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';

interface AdminWorkshopsProps {
  // Props can be added here if needed
}

export function AdminWorkshops({}: AdminWorkshopsProps) {
  const { workshops, users, deleteWorkshop } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);
  const [isViewWorkshopOpen, setIsViewWorkshopOpen] = useState(false);
  const [isEditWorkshopOpen, setIsEditWorkshopOpen] = useState(false);
  const [isAddWorkshopOpen, setIsAddWorkshopOpen] = useState(false);

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
                    <Calendar className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Talleres
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {workshops.length} talleres registrados
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {workshops.filter(w => w.status === 'Programado').length} programados
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
                    placeholder="Buscar talleres..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                  onClick={() => setIsAddWorkshopOpen(true)}
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
                  Agregar Taller
                </motion.button>
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">TALLER</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">INSTRUCTOR</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">FECHA</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">HORA</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">INSCRITOS</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PRECIO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ESTADO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
                {(searchTerm ? workshops.filter(w => 
                  w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  w.instructor.toLowerCase().includes(searchTerm.toLowerCase())
                ) : workshops).map((workshop: any, index: number) => (
                  <motion.tr
                    key={workshop.id}
                    className="hover:bg-gray-50 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">{workshop.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{workshop.instructor}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(workshop.date).toLocaleDateString('es-ES')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{workshop.time}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {workshop.students}/{workshop.maxCapacity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#B8860B' }}>
                      ${workshop.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                        backgroundColor: workshop.status === 'Programado' ? '#DBEAFE' : '#F3E8FF',
                        color: workshop.status === 'Programado' ? '#1E40AF' : '#6B21A8'
                      }}>
                        {workshop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            const enrolledStudents = users
                              .filter(u => u.enrolledWorkshops?.includes(workshop.id))
                              .map(u => ({
                                userId: u.id,
                                userName: u.name,
                                email: u.email,
                                enrolledDate: new Date().toISOString()
                              }));
                            
                            setSelectedWorkshop({
                              ...workshop,
                              enrolledStudents,
                              enrolled: enrolledStudents.length
                            });
                            setIsViewWorkshopOpen(true);
                          }}
                          className="p-2 rounded-lg transition-colors hover:bg-blue-50"
                          title="Ver inscritos"
                        >
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedWorkshop(workshop);
                            setIsEditWorkshopOpen(true);
                          }}
                          className="p-2 rounded-lg transition-colors hover:bg-yellow-50"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" style={{ color: '#B8860B' }} />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm(`¿Eliminar el taller "${workshop.name}"?`)) {
                              deleteWorkshop(workshop.id);
                              toast.success('Taller eliminado');
                            }
                          }}
                          className="p-2 rounded-lg transition-colors hover:bg-red-50"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
