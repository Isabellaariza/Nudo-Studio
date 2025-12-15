import React, { ReactNode, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  handleReload = () => {
    window.location.reload();
  };

  render(): ReactElement {
    if (this.state.hasError) {
      return (
        <motion.div
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-orange-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md w-full">
            <motion.div
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </motion.div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">¡Algo salió mal!</h1>
              <p className="text-gray-600 mb-2">Disculpa, hemos encontrado un error inesperado.</p>

              {this.state.error && (
                <motion.div
                  className="mt-4 p-4 bg-white rounded-lg border border-red-200 text-left"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-sm font-mono text-red-700 break-words">
                    {this.state.error.message}
                  </p>
                </motion.div>
              )}

              <div className="mt-8 space-y-3">
                <motion.button
                  onClick={this.handleReload}
                  className="w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: '#2D4B39',
                    color: '#ffffff'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-4 h-4" />
                  Recargar página
                </motion.button>

                <motion.button
                  onClick={this.handleReset}
                  className="w-full px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 bg-gray-200 text-gray-900"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home className="w-4 h-4" />
                  Ir a inicio
                </motion.button>
              </div>

              <p className="text-xs text-gray-500 mt-6">
                Si el problema persiste, contáctanos en support@nudostudio.com
              </p>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    return <>{this.props.children}</>;
  }
}

// Componente para 404
export function NotFound() {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-yellow-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md w-full text-center">
        <motion.h1
          className="text-7xl font-bold mb-4"
          style={{ color: '#B8860B' }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>

        <motion.button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 rounded-lg font-medium"
          style={{
            backgroundColor: '#2D4B39',
            color: '#ffffff'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Volver al inicio
        </motion.button>
      </div>
    </motion.div>
  );
}
