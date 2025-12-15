import { motion } from 'framer-motion';
import { CheckCircle, Shield, User } from 'lucide-react';

interface WelcomeScreenProps {
  user: any;
  isAdmin: boolean;
  onContinue: () => void;
}

export function WelcomeScreen({ user, isAdmin, onContinue }: WelcomeScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(45, 75, 57, 0.95)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="text-center p-8 rounded-3xl max-w-md mx-4"
        style={{ backgroundColor: '#ffffff' }}
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          {isAdmin ? (
            <Shield className="w-16 h-16 mx-auto" style={{ color: '#B8860B' }} />
          ) : (
            <User className="w-16 h-16 mx-auto" style={{ color: '#2D4B39' }} />
          )}
        </motion.div>

        <motion.h1
          className="text-3xl mb-4"
          style={{ color: '#2D4B39' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          ¡Bienvenido{isAdmin ? ' Administrador' : ''}!
        </motion.h1>

        <motion.p
          className="text-lg mb-6"
          style={{ color: '#6B7280' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {isAdmin 
            ? `Hola ${user?.name || 'Administrador'}, tienes acceso completo al panel de administración.`
            : `Hola ${user?.name || 'Usuario'}, bienvenido a NUDO Studio.`
          }
        </motion.p>

        <motion.button
          onClick={onContinue}
          className="px-8 py-3 rounded-full text-white"
          style={{ backgroundColor: isAdmin ? '#B8860B' : '#2D4B39' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Continuar
        </motion.button>
      </motion.div>
    </motion.div>
  );
}