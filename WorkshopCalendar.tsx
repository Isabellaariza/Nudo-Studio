import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface WorkshopCalendarProps {
  selectedDate?: string;
  onDateSelect?: (date: string) => void;
}

export const WorkshopCalendar: React.FC<WorkshopCalendarProps> = ({
  selectedDate,
  onDateSelect
}) => {
  const { workshops } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Obtener días con talleres
  const workshopDays = useMemo(() => {
    const days = new Set<string>();
    workshops.forEach(w => {
      if (w.date) {
        days.add(w.date);
      }
    });
    return days;
  }, [workshops]);

  // Obtener talleres para un día específico
  const getWorkshopsForDay = (date: string) => {
    return workshops.filter(w => w.date === date);
  };

  // Calendario
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthName = currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const days: (number | null)[] = Array(firstDay).fill(null);
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const formatDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return date.toISOString().split('T')[0];
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const hasWorkshops = (day: number) => {
    return day !== null && workshopDays.has(formatDate(day));
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl border border-amber-200 p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #B8860B 0%, #8B6914 100%)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              <CalendarIcon className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 capitalize">{monthName}</h3>
              <p className="text-xs text-slate-600">Talleres disponibles en color dorado</p>
            </div>
          </div>

          <div className="flex gap-2">
            <motion.button
              onClick={previousMonth}
              className="p-2 rounded-lg hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </motion.button>
            <motion.button
              onClick={nextMonth}
              className="p-2 rounded-lg hover:bg-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </motion.button>
          </div>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-2">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'].map(day => (
            <div key={day} className="text-center text-xs font-bold text-slate-600 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            const dateStr = day ? formatDate(day) : '';
            const dayWorkshops = day ? getWorkshopsForDay(dateStr) : [];
            const isWorkshopDay = hasWorkshops(day as number);
            const isCurrentDay = isToday(day as number);

            return (
              <motion.button
                key={index}
                onClick={() => {
                  if (day && onDateSelect) {
                    onDateSelect(dateStr);
                  }
                }}
                disabled={!day}
                className={`
                  relative p-2 rounded-lg font-semibold text-sm transition-all
                  ${!day
                    ? 'bg-transparent'
                    : isWorkshopDay
                    ? 'hover:scale-105 cursor-pointer'
                    : 'hover:bg-slate-200 cursor-pointer'
                  }
                  ${selectedDate === dateStr ? 'ring-2 ring-amber-500' : ''}
                `}
                style={{
                  background: isWorkshopDay
                    ? 'linear-gradient(135deg, #B8860B 0%, #8B6914 100%)'
                    : isCurrentDay
                    ? 'rgba(59, 130, 246, 0.2)'
                    : 'transparent',
                  color: isWorkshopDay ? '#ffffff' : isCurrentDay ? '#1E40AF' : '#374151',
                }}
                whileHover={day && isWorkshopDay ? { scale: 1.05 } : {}}
                whileTap={day ? { scale: 0.95 } : {}}
              >
                <span>{day}</span>
                {isWorkshopDay && (
                  <motion.div
                    className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {dayWorkshops.map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full"
                        style={{ background: '#ffffff' }}
                      />
                    ))}
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Selected Day Workshops */}
        {selectedDate && (
          <motion.div
            className="border-t border-amber-200 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Talleres para {new Date(selectedDate).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            
            {getWorkshopsForDay(selectedDate).length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {getWorkshopsForDay(selectedDate).map((workshop, idx) => (
                  <motion.div
                    key={workshop.id}
                    className="p-3 bg-white rounded-lg border border-amber-100 hover:border-amber-300 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <p className="font-semibold text-sm text-slate-900">{workshop.name}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      <span className="font-medium">Instructor:</span> {workshop.instructor}
                    </p>
                    <p className="text-xs text-slate-600">
                      <span className="font-medium">Hora:</span> {workshop.time}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        {workshop.enrolled || 0}/{workshop.capacity} inscritos
                      </span>
                      <span className="text-xs font-semibold" style={{ color: '#B8860B' }}>
                        ${workshop.price?.toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                className="p-4 bg-white rounded-lg border border-slate-200 text-center text-slate-600 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No hay talleres programados para este día
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
