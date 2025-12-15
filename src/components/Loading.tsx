import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Loading({ message = 'Cargando...', fullScreen = false, size = 'md' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const content = (
    <motion.div
      className="flex flex-col items-center justify-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      >
        <Loader2 className={`${sizeClasses[size]} text-amber-600`} />
      </motion.div>
      {message && (
        <p className="text-gray-600 font-medium text-center">{message}</p>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

// Skeleton loader para placeholders
export function SkeletonLoader({ rows = 3 }: { rows?: number }) {
  return (
    <motion.div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          className="h-12 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-lg"
          animate={{
            backgroundPosition: ['0%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            backgroundSize: '200% 100%'
          }}
        />
      ))}
    </motion.div>
  );
}
