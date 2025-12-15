import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Search, Edit, Plus, Eye, Mail, Phone, FileText, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';

const mockEmployees = [
  { id: 1, name: 'Juan Pérez', position: 'Instructor', email: 'juan@example.com', phone: '300-123-4567', documentType: 'cedula', documentNumber: '1000000001', department: 'Educación', role: 'Profesor', salary: 2500000, status: true },
  { id: 2, name: 'María García', position: 'Coordinadora', email: 'maria@example.com', phone: '300-223-4567', documentType: 'cedula', documentNumber: '1000000002', department: 'Administración', role: 'Coordinador', salary: 2000000, status: true },
  { id: 3, name: 'Carlos López', position: 'Diseñador', email: 'carlos@example.com', phone: '300-323-4567', documentType: 'cedula', documentNumber: '1000000003', department: 'Diseño', role: 'Diseñador', salary: 2200000, status: true },
];

export function AdminEmployees() {
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [employees] = useState(mockEmployees);

  const handleAddEmployee = () => {
    alert('Agregar empleado próximamente');
  };

  const handleEditEmployee = (employee: any) => {
    console.log('Edit employee:', employee);
  };

  const handleDeleteEmployee = (id: number) => {
    console.log('Delete employee:', id);
  };

  return (
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
                  <UserCog className="w-7 h-7" style={{ color: '#ffffff' }} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                  Gestión de Empleados
                </h1>
                <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                  {employees.length} empleados registrados
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(107, 114, 128, 0.6)' }} />
                <Input
                  placeholder="Buscar empleados..."
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
                Agregar Empleado
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">NOMBRE</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">POSICIÓN</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">EMAIL</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">TELÉFONO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">SALARIO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
              {(searchTerm ? employees.filter(e => 
                e.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) : employees).map((employee: any, index: number) => (
                <motion.tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">{employee.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{employee.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{employee.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{employee.phone}</td>
                  <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#B8860B' }}>
                    ${employee.salary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 rounded-lg transition-colors hover:bg-yellow-50">
                        <Edit className="w-4 h-4" style={{ color: '#B8860B' }} />
                      </button>
                      <button className="p-2 rounded-lg transition-colors hover:bg-red-50">
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
  );
}
