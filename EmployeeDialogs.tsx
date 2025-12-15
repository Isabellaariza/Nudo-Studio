import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserCheck,
  User,
  Edit,
  Trash2,
  Plus,
  Search,
  Mail,
  Phone,
  FileText,
  Eye,
  Save,
  Shield,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';

export function EmployeeDialogs() {
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    currentUser,
    rolePermissions,
  } = useApp();

  const isAdmin = currentUser?.role === 'Admin';
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const EMPLOYEES_PER_PAGE = 6;
  
  // ESTADOS PARA EMPLEADOS
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState<any>(null);
  const [showEmployeeInfoDialog, setShowEmployeeInfoDialog] = useState(false);

  // Filtrado y paginación
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(employeeSearchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / EMPLOYEES_PER_PAGE);
  const displayedEmployees = filteredEmployees.slice(
    (currentPage - 1) * EMPLOYEES_PER_PAGE,
    currentPage * EMPLOYEES_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // FUNCIONES PARA EMPLEADOS
  const handleAddEmployee = () => {
    setIsNewEmployee(true);
    setEditingEmployee({
      id: employees.length + 1,
      name: '',
      email: '',
      phone: '',
      documentType: 'cedula',
      documentNumber: '',
      position: '',
      salary: 0,
      schedule: '',
      address: '',
      role: 'Trabajador',
      status: true,
      hireDate: new Date().toISOString().split('T')[0],
      department: 'Producción',
      experience: 0,
      rating: 0,
      birthDate: '',
      contractType: 'Indefinido',
      supervisor: '',
      emergencyContact: { name: '', phone: '' },
      eps: '',
      bankInfo: { bank: '', accountType: 'Ahorros', accountNumber: '' },
      education: '',
      certifications: [],
      studyCertificate: '',
      bloodType: '',
      allergies: '',
      socialSecurity: '',
      profilePhoto: ''
    });
    setShowEmployeeDialog(true);
  };

  const handleEditEmployee = (employee: any) => {
    setIsNewEmployee(false);
    setEditingEmployee({...employee});
    setShowEmployeeDialog(true);
  };

  const handleSaveEmployee = () => {
    if (isNewEmployee) {
      addEmployee(editingEmployee);
      toast.success('Empleado agregado exitosamente');
    } else {
      updateEmployee(editingEmployee.id, editingEmployee);
      toast.success('Empleado actualizado exitosamente');
    }
    setShowEmployeeDialog(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployeeAdmin = (employeeId: number) => {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      deleteEmployee(employeeId);
      toast.success('Empleado eliminado exitosamente');
    }
  };

  const handleToggleEmployeeStatus = (employeeId: number) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      updateEmployee(employeeId, { ...employee, status: !employee.status });
      toast.success('Estado actualizado');
    }
  };

  // RENDERIZAR EMPLEADOS
  const renderEmployees = () => (
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
                    <UserCheck className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Empleados
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {employees.length} empleados registrados
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {employees.filter(emp => emp.status).length} activos
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
                    placeholder="Buscar empleados..."
                    value={employeeSearchTerm}
                    onChange={(e) => setEmployeeSearchTerm(e.target.value)}
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
                  onClick={handleAddEmployee}
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
                  Nuevo Empleado
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
          {displayedEmployees.map((employee: any, index: number) => (
            <motion.div
              key={employee.id}
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
              {/* Header con avatar y nombre */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#2D4B39' }}>
                    {employee.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>{employee.name}</h3>
                    <p className="text-sm" style={{ color: '#6B7280' }}>{employee.position}</p>
                  </div>
                </div>
                <span className="text-xs font-medium" style={{
                  color: employee.status ? '#10B981' : '#ef4444'
                }}>
                  {employee.status ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              
              {/* Información de contacto con iconos */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: '#B8860B' }} />
                  <span className="text-sm" style={{ color: '#2D4B39' }}>{employee.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: '#B8860B' }} />
                  <span className="text-sm" style={{ color: '#2D4B39' }}>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" style={{ color: '#B8860B' }} />
                  <span className="text-sm" style={{ color: '#B8860B' }}>
                    {employee.documentType === 'cedula' ? 'CC' : 'CE'}: {employee.documentNumber}
                  </span>
                </div>
              </div>
              
              {/* Badges de departamento y rol */}
              <div className="flex gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full" style={{
                  backgroundColor: '#FEF3C7',
                  color: '#92400E'
                }}>
                  {employee.department}
                </span>
                <span className="text-xs px-3 py-1 rounded-full" style={{
                  backgroundColor: employee.role === 'Profesor' ? '#EDE9FE' : '#D1FAE5',
                  color: employee.role === 'Profesor' ? '#5B21B6' : '#065F46'
                }}>
                  {employee.role}
                </span>
              </div>
              
              {/* Salario */}
              <div className="mb-4">
                <span className="text-xs" style={{ color: '#6B7280' }}>Salario</span>
                <p className="text-lg font-bold" style={{ color: '#2D4B39' }}>
                  ${employee.salary.toLocaleString('es-CO')} COP
                </p>
              </div>
                
              {/* Botones de acción */}
              <div className="flex gap-2">
                <button 
                  onClick={() => { setSelectedEmployeeInfo(employee); setShowEmployeeInfoDialog(true); }}
                  className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-gray-200"
                  style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                >
                  <Eye className="w-4 h-4 mx-auto" style={{ color: '#6B7280' }} />
                </button>
                <button 
                  onClick={() => handleEditEmployee(employee)}
                  className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-yellow-200"
                  style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}
                >
                  <Edit className="w-4 h-4 mx-auto" style={{ color: '#B8860B' }} />
                </button>
                <button 
                  onClick={() => handleDeleteEmployeeAdmin(employee.id)}
                  className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-red-200"
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                >
                  <Trash2 className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                </button>
              </div>
            </motion.div>
          ))}
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

      {/* DIÁLOGO DE INFORMACIÓN COMPLETA DEL EMPLEADO */}
      <AnimatePresence>
        {showEmployeeInfoDialog && selectedEmployeeInfo && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEmployeeInfoDialog(false)}
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
                  <UserCheck className="w-8 h-8" style={{ color: '#ffffff' }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>{selectedEmployeeInfo.name}</h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>Información completa del empleado</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#B8860B' }}>Información Personal</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Email:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedEmployeeInfo.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Teléfono:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedEmployeeInfo.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Documento:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedEmployeeInfo.documentType === 'cedula' ? 'CC' : 'CE'}: {selectedEmployeeInfo.documentNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Dirección:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedEmployeeInfo.address || 'No especificada'}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#B8860B' }}>Información Laboral</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Cargo:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedEmployeeInfo.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Departamento:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedEmployeeInfo.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Salario:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>${selectedEmployeeInfo.salary.toLocaleString('es-CO')} COP</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm" style={{ color: '#2D4B39' }}>Fecha de contratación:</span>
                      <span className="text-sm font-medium" style={{ color: '#B8860B' }}>{selectedEmployeeInfo.hireDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <button
                  onClick={() => setShowEmployeeInfoDialog(false)}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    border: '1px solid rgba(184, 134, 11, 0.3)',
                    color: '#B8860B',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 8px rgba(184, 134, 11, 0.1)'
                  }}
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setShowEmployeeInfoDialog(false);
                    handleEditEmployee(selectedEmployeeInfo);
                  }}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                  }}
                >
                  Editar Empleado
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DIÁLOGO PARA EDITAR/AGREGAR EMPLEADO */}
      <AnimatePresence>
        {showEmployeeDialog && editingEmployee && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEmployeeDialog(false)}
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
                  <UserCheck className="w-8 h-8" style={{ color: '#ffffff' }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                    {isNewEmployee ? 'Nuevo Empleado' : 'Editar Empleado'}
                  </h2>
                  <p className="text-sm" style={{ color: '#B8860B' }}>Complete la información del empleado</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Información Personal */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#B8860B' }}>Información Personal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Nombre Completo</label>
                      <input
                        value={editingEmployee.name}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="Nombre completo"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Email</label>
                      <input
                        type="email"
                        value={editingEmployee.email}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="email@ejemplo.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Teléfono</label>
                      <input
                        value={editingEmployee.phone}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="300 123 4567"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Número de Documento</label>
                      <input
                        value={editingEmployee.documentNumber}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, documentNumber: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="1234567890"
                      />
                    </div>
                  </div>
                </div>

                {/* Información Laboral */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#B8860B' }}>Información Laboral</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Cargo</label>
                      <input
                        value={editingEmployee.position}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, position: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="Cargo del empleado"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Departamento</label>
                      <select
                        value={editingEmployee.department}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, department: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                      >
                        <option value="Producción">Producción</option>
                        <option value="Ventas">Ventas</option>
                        <option value="Administración">Administración</option>
                        <option value="Talleres">Talleres</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Salario</label>
                      <input
                        type="number"
                        value={editingEmployee.salary}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, salary: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="1000000"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Fecha de Contratación</label>
                      <input
                        type="date"
                        value={editingEmployee.hireDate}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, hireDate: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                      />
                    </div>
                </div>
              </div>

                {/* Información Importante - Salud y Datos de Emergencia */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(184, 134, 11, 0.08)' }}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: '#B8860B' }}>
                    <Shield className="w-5 h-5" /> Información Importante
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>EPS</label>
                      <input
                        value={editingEmployee.eps}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, eps: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="Empresa de Salud"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Tipo de Sangre</label>
                      <select
                        value={editingEmployee.bloodType}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, bloodType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                      >
                        <option value="">Seleccionar...</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Alergias</label>
                      <input
                        value={editingEmployee.allergies}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, allergies: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="Ej: Penicilina, Mariscos, etc."
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Contacto de Emergencia</label>
                      <input
                        value={editingEmployee.emergencyContact?.name || ''}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, emergencyContact: { ...editingEmployee.emergencyContact, name: e.target.value } })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="Nombre"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Teléfono Emergencia</label>
                      <input
                        value={editingEmployee.emergencyContact?.phone || ''}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, emergencyContact: { ...editingEmployee.emergencyContact, phone: e.target.value } })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="300 123 4567"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Formación Académica</label>
                      <input
                        value={editingEmployee.education}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, education: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="Ej: Licenciado en..."
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Horario Laboral</label>
                      <input
                        value={editingEmployee.schedule}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, schedule: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="Ej: Lunes-Viernes 8AM-5PM"
                      />
                    </div>
                    <div>
                      <label className="text-sm mb-2 block font-semibold" style={{ color: '#2D4B39' }}>Certificaciones</label>
                      <input
                        value={editingEmployee.certifications?.join(', ') || ''}
                        onChange={(e) => setEditingEmployee({ ...editingEmployee, certifications: e.target.value.split(',').map(c => c.trim()) })}
                        className="w-full px-4 py-3 rounded-lg border"
                        placeholder="Separadas por comas"
                      />
                    </div>
                  </div>
                </div>

                {/* Estado del Empleado */}
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.08)' }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#B8860B' }}>Estado del Empleado</h3>
                  <div className="flex items-center justify-between p-4 rounded-lg" style={{ backgroundColor: '#ffffff' }}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${editingEmployee.status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>
                        {editingEmployee.status ? 'Empleado Activo' : 'Empleado Inactivo'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEditingEmployee({ ...editingEmployee, status: !editingEmployee.status })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        editingEmployee.status ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                          editingEmployee.status ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t" style={{ borderColor: 'rgba(184, 134, 11, 0.2)' }}>
                <button
                  onClick={() => setShowEmployeeDialog(false)}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    border: '1px solid rgba(184, 134, 11, 0.3)',
                    color: '#B8860B',
                    backgroundColor: '#ffffff'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEmployee}
                  className="flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                  }}
                >
                  <Save className="w-4 h-4" />
                  {isNewEmployee ? 'Crear Empleado' : 'Guardar Cambios'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return renderEmployees();
}