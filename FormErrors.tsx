import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

interface FormErrorProps {
  message: string;
  field?: string;
}

export function FormError({ message, field }: FormErrorProps) {
  return (
    <motion.div
      className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
      <div>
        {field && <p className="text-xs font-semibold text-red-800">{field}</p>}
        <p className="text-sm text-red-700">{message}</p>
      </div>
    </motion.div>
  );
}

interface FormErrorsListProps {
  errors: Array<{ field: string; message: string }>;
}

export function FormErrorsList({ errors }: FormErrorsListProps) {
  if (errors.length === 0) return null;

  return (
    <motion.div
      className="space-y-2 p-4 bg-red-50 border border-red-200 rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className="font-semibold text-red-800 text-sm">
        Se encontraron {errors.length} error{errors.length !== 1 ? 'es' : ''}:
      </p>
      <ul className="space-y-1">
        {errors.map((error, idx) => (
          <motion.li
            key={idx}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <span className="text-red-400 font-bold">•</span>
            <span className="text-sm text-red-700">
              <span className="font-medium">{error.field}:</span> {error.message}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
