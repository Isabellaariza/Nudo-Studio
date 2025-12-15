import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, X, Eye } from 'lucide-react';
import { Toggle } from './ui/toggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { toast } from 'sonner';

interface Workshop {
  id: string;
  name: string;
  description: string;
  instructor: string;
  date: string;
  time: string;
  capacity: number;
  enrolled: number;
  price: number;
  status: string;
  visible?: boolean;
  enrolledStudents?: Array<{ userId: string; userName: string; email: string; enrolledDate: string }>;
}

interface WorkshopDialogsProps {
  isAddOpen: boolean;
  setIsAddOpen: (open: boolean) => void;
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  isViewOpen: boolean;
  setIsViewOpen: (open: boolean) => void;
  selectedWorkshop: Workshop | null;
  setSelectedWorkshop: (workshop: Workshop | null) => void;
}

export const WorkshopDialogs: React.FC<WorkshopDialogsProps> = ({
  isAddOpen,
  setIsAddOpen,
  isEditOpen,
  setIsEditOpen,
  isViewOpen,
  setIsViewOpen,
  selectedWorkshop,
  setSelectedWorkshop,
}) => {
  const { addWorkshop, updateWorkshop, users } = useApp();
  const [formData, setFormData] = useState<Partial<Workshop>>({
    name: '',
    description: '',
    instructor: '',
    date: '',
    time: '',
    capacity: 20,
    price: 0,
    status: 'Programado',
    // visibility flag: true => Publicado, false => Borrador
    visible: true as any,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      instructor: '',
      date: '',
      time: '',
      capacity: 20,
      price: 0,
      status: 'Programado',
    });
  };

  const handleAddWorkshop = () => {
    if (!formData.name || !formData.instructor || !formData.date || !formData.time) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    const newWorkshop: Partial<Workshop> = {
      ...formData,
      enrolled: 0,
      enrolledStudents: [],
    };

    addWorkshop(newWorkshop as any);
    resetForm();
    setIsAddOpen(false);
    toast.success('Taller agregado exitosamente');
  };

  const handleEditWorkshop = () => {
    if (!selectedWorkshop) return;

    if (!formData.name || !formData.instructor || !formData.date || !formData.time) {
      toast.error('Por favor completa todos los campos requeridos');
      return;
    }

    const updatedWorkshop: Workshop = {
      ...selectedWorkshop,
      ...formData,
      id: selectedWorkshop.id,
    } as Workshop;

    updateWorkshop(updatedWorkshop);
    resetForm();
    setIsEditOpen(false);
    setSelectedWorkshop(null);
    toast.success('Taller actualizado exitosamente');
  };

  const handleOpenEdit = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setFormData({
      name: workshop.name,
      description: workshop.description,
      instructor: workshop.instructor,
      date: workshop.date,
      time: workshop.time,
      capacity: workshop.capacity,
      price: workshop.price,
      status: workshop.status,
      visible: workshop.visible !== undefined ? (workshop.visible as any) : (workshop.status !== 'Borrador') as any,
    });
    setIsEditOpen(true);
  };

  const handleOpenView = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsViewOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedWorkshop(null);
    resetForm();
  };

  const handleCloseView = () => {
    setIsViewOpen(false);
    setSelectedWorkshop(null);
  };

  // Obtener estudiantes inscritos
  const enrolledStudents = selectedWorkshop?.enrolledStudents || [];

  return (
    <AnimatePresence>
      {/* Add Workshop Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100 border border-amber-200">
          <DialogHeader className="border-b border-amber-200 pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent flex items-center gap-2">
              <Calendar className="w-6 h-6 text-amber-600" />
              Agregar Nuevo Taller
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-slate-700">Nombre del Taller *</Label>
                <Input
                  placeholder="Ej: Diseño de Interiores Básico"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Instructor *</Label>
                <Input
                  placeholder="Nombre del instructor"
                  value={formData.instructor || ''}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Fecha *</Label>
                <Input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Hora *</Label>
                <Input
                  type="time"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Capacidad</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.capacity || 20}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Precio</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price || 0}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div className="col-span-2">
                <Label className="text-sm font-semibold text-slate-700">Estado</Label>
                <Select value={formData.status || 'Programado'} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Programado">Programado</SelectItem>
                    <SelectItem value="En progreso">En progreso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label className="text-sm font-semibold text-slate-700">Visibilidad pública</Label>
                <div className="mt-2 flex items-center gap-3">
                  <Toggle pressed={!!formData.visible} onPressedChange={(val: any) => setFormData({ ...formData, visible: !!val })}>
                    {formData.visible ? 'Publicado' : 'Borrador'}
                  </Toggle>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-slate-700">Descripción</Label>
              <Textarea
                placeholder="Describe el contenido del taller"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300 min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-amber-200 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddOpen(false);
                resetForm();
              }}
              className="border-slate-300 hover:bg-slate-100"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAddWorkshop}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
            >
              Agregar Taller
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Workshop Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100 border border-amber-200">
          <DialogHeader className="border-b border-amber-200 pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent flex items-center gap-2">
              <Calendar className="w-6 h-6 text-amber-600" />
              Editar Taller
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-slate-700">Nombre del Taller *</Label>
                <Input
                  placeholder="Ej: Diseño de Interiores Básico"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Instructor *</Label>
                <Input
                  placeholder="Nombre del instructor"
                  value={formData.instructor || ''}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Fecha *</Label>
                <Input
                  type="date"
                  value={formData.date || ''}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Hora *</Label>
                <Input
                  type="time"
                  value={formData.time || ''}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Capacidad</Label>
                <Input
                  type="number"
                  min="1"
                  value={formData.capacity || 20}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-slate-700">Precio</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price || 0}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
                />
              </div>

              <div className="col-span-2">
                <Label className="text-sm font-semibold text-slate-700">Estado</Label>
                <Select value={formData.status || 'Programado'} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Programado">Programado</SelectItem>
                    <SelectItem value="En progreso">En progreso</SelectItem>
                    <SelectItem value="Completado">Completado</SelectItem>
                    <SelectItem value="Cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-semibold text-slate-700">Descripción</Label>
              <Textarea
                placeholder="Describe el contenido del taller"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300 min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-amber-200 pt-4">
            <Button variant="outline" onClick={handleCloseEdit} className="border-slate-300 hover:bg-slate-100">
              Cancelar
            </Button>
            <Button
              onClick={handleEditWorkshop}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white"
            >
              Guardar Cambios
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Enrolled Students Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100 border border-amber-200">
          <DialogHeader className="border-b border-amber-200 pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent flex items-center gap-2">
              <Eye className="w-6 h-6 text-amber-600" />
              Inscritos en: {selectedWorkshop?.name}
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {enrolledStudents && enrolledStudents.length > 0 ? (
              <motion.div
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {enrolledStudents.map((student, index) => (
                  <motion.div
                    key={`${student.userId}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-white border border-amber-100 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">NOMBRE</p>
                        <p className="text-sm font-semibold text-slate-900">{student.userName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">EMAIL</p>
                        <p className="text-sm text-slate-700">{student.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">FECHA INSCRIPCIÓN</p>
                        <p className="text-sm text-slate-700">{new Date(student.enrolledDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-semibold">ESTADO</p>
                        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                          Inscrito
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500 font-semibold">No hay estudiantes inscritos aún</p>
              </div>
            )}

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-slate-500 font-semibold">TOTAL INSCRITOS</p>
                  <p className="text-2xl font-bold text-amber-700">{enrolledStudents?.length || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">CAPACIDAD</p>
                  <p className="text-2xl font-bold text-slate-700">{selectedWorkshop?.capacity}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-semibold">DISPONIBLES</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Math.max(0, (selectedWorkshop?.capacity || 0) - (enrolledStudents?.length || 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-amber-200 pt-4">
            <Button onClick={handleCloseView} className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white">
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
};
