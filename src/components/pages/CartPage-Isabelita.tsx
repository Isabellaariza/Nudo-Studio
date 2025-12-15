import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, ShoppingBag, Plus, Minus, Upload, FileText } from 'lucide-react';
import { cartAPI, ordersAPI } from '../../lib/api';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { useApp } from '../../contexts/AppContext';

interface CartPageProps {
  user: any;
  onNavigate: (page: string) => void;
  onCartUpdate?: () => void;
}

export function CartPage({ user, onNavigate, onCartUpdate }: CartPageProps) {
  const { addOrder, updateUser, currentUser } = useApp();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingOrder, setProcessingOrder] = useState(false);
  const [paymentProof, setPaymentProof] = useState<string>('');
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      loadCart();
    }
  }, [user]);

  const loadCart = async () => {
    try {
      const session = await import('../../lib/api').then(m => m.auth.getSession());
      if (!session?.access_token) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const { items } = await cartAPI.get(session.access_token);
      setCartItems(items || []);
      if (onCartUpdate) onCartUpdate();
    } catch (error: any) {
      console.error('Error loading cart:', error);
      // If auth error, redirect to login
      if (error.message?.includes('Unauthorized') || error.message?.includes('token')) {
        toast.error('Sesión expirada. Por favor inicia sesión nuevamente');
        onNavigate('login');
      } else {
        toast.error('Error al cargar el carrito');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const session = await import('../../lib/api').then(m => m.auth.getSession());
      if (!session?.access_token) return;

      await cartAPI.updateQuantity(productId, newQuantity, session.access_token);
      loadCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Error al actualizar cantidad');
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      const session = await import('../../lib/api').then(m => m.auth.getSession());
      if (!session?.access_token) return;

      await cartAPI.remove(productId, session.access_token);
      toast.success('Producto eliminado del carrito');
      loadCart();
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Error al eliminar producto');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simular subida de archivo - en producción usar Supabase Storage
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentProof(reader.result as string);
        toast.success('Comprobante de pago cargado');
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * (item.quantity || 1);
    }, 0);
  };

  const handleCheckout = async () => {
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.phone) {
      toast.error('Por favor completa la dirección de envío');
      return;
    }

    if (!paymentProof) {
      toast.error('Por favor sube el comprobante de pago');
      return;
    }

    setProcessingOrder(true);

    try {
      const total = calculateTotal();
      const orderId = Date.now();
      
      // Crear orden en AppContext
      addOrder({
        id: orderId,
        userId: currentUser?.id || user?.id || 0,
        items: cartItems.map(item => ({
          productId: item.productId,
          product: item.product,
          quantity: item.quantity,
        })),
        total: total,
        shippingAddress: shippingAddress,
        paymentProof: paymentProof,
        status: 'Pendiente',
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      });

      // Actualizar contador de órdenes del usuario
      if (currentUser) {
        updateUser(currentUser.id, { 
          ...currentUser,
          orders: (currentUser.orders || 0) + 1 
        });
      }

      toast.success('¡Pedido realizado con éxito! Esperando verificación de pago');
      setCartItems([]);
      onNavigate('profile');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error al procesar el pedido');
    } finally {
      setProcessingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-8 flex items-center justify-center">
        <div className="text-[#2D4B39]">Cargando carrito...</div>
      </div>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-8 pb-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-[#2D4B39]/30" />
          <h1 className="font-elegant text-[3rem] md:text-[4rem] tracking-wide mb-4" style={{ color: '#2D4B39' }}>
            Tu Carrito está Vacío
          </h1>
          <p className="text-lg text-[#2D4B39]/70 mb-8">
            Agrega algunos productos a tu carrito para continuar
          </p>
          <motion.button
            onClick={() => onNavigate('products')}
            className="px-10 py-4 bg-[#2D4B39] text-white tracking-wide transition-all rounded-full overflow-hidden relative"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 16px rgba(45, 75, 57, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explorar Productos</span>
            <motion.div
              className="absolute inset-0 bg-[#B8860B]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-elegant text-[5rem] tracking-wide mb-12" style={{ color: '#2D4B39' }}>
            Tu Carrito
          </h1>

          <div className="mb-8 p-4 rounded-lg border-l-4 border-[#B8860B] bg-[#FFF7E1]">
            <p className="text-sm text-[#7A5B2B]">
              <strong>Advertencia de Devolución:</strong> En caso de devolución del producto, no se realizará un reembolso monetario. El cliente podrá cambiar el producto por el mismo producto o por otro de igual precio.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="col-span-2 space-y-6">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#E0D1C0]/20 rounded-2xl p-6 flex flex-row gap-6"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={item.product?.imageUrl}
                      alt={item.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg tracking-wide mb-2" style={{ color: '#2D4B39' }}>
                      {item.product?.name}
                    </h3>
                    <p className="text-lg mb-3" style={{ color: '#B8860B' }}>
                      ${item.product?.price}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center" style={{ color: '#2D4B39' }}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <p className="text-xl" style={{ color: '#B8860B' }}>
                      ${item.product?.price * item.quantity}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="text-[#2D4B39]/60 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Checkout Section */}
            <div className="col-span-1">
              <div className="bg-[#E0D1C0]/20 rounded-2xl p-6 sticky top-32">
                <h2 className="text-xl tracking-wide mb-6" style={{ color: '#2D4B39' }}>
                  Resumen del Pedido
                </h2>

                {/* Shipping Form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <Label htmlFor="street" style={{ color: '#2D4B39' }}>
                      Calle y Número
                    </Label>
                    <Input
                      id="street"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                      className="mt-1 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" style={{ color: '#2D4B39' }}>
                        Ciudad
                      </Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="mt-1 rounded-xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="state" style={{ color: '#2D4B39' }}>
                        Estado
                      </Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className="mt-1 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="zipCode" style={{ color: '#2D4B39' }}>
                      Código Postal
                    </Label>
                    <Input
                      id="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                      className="mt-1 rounded-xl"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" style={{ color: '#2D4B39' }}>
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      className="mt-1 rounded-xl"
                    />
                  </div>

                  {/* Payment Proof Upload */}
                  <div>
                    <Label htmlFor="paymentProof" style={{ color: '#2D4B39' }}>
                      Comprobante de Pago
                    </Label>
                    <div className="mt-2">
                      <label
                        htmlFor="paymentProof"
                        className={`flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                          paymentProof 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-[#2D4B39]/20 hover:border-[#2D4B39]/40'
                        }`}
                      >
                        {paymentProof ? (
                          <>
                            <FileText className="w-5 h-5 text-green-600" />
                            <span className="text-sm text-green-600">Comprobante cargado</span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-5 h-5 text-[#2D4B39]/60" />
                            <span className="text-sm text-[#2D4B39]/60">Subir comprobante</span>
                          </>
                        )}
                      </label>
                      <input
                        id="paymentProof"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                    <p className="text-xs text-[#2D4B39]/60 mt-1">
                      Sube tu comprobante de transferencia o depósito
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-[#2D4B39]/10 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#2D4B39]/70">Subtotal</span>
                    <span style={{ color: '#2D4B39' }}>${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[#2D4B39]/70">Envío</span>
                    <span style={{ color: '#2D4B39' }}>Gratis</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl" style={{ color: '#2D4B39' }}>
                      Total
                    </span>
                    <span className="text-2xl" style={{ color: '#B8860B' }}>
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>

                {/* POLÍTICA DE DEVOLUCIONES */}
                <div className="bg-blue-50 border-l-4 border-[#2D4B39] p-4 rounded mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">📌 Política de Devoluciones</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>✓ Las devoluciones se realizan como <strong>crédito en tienda</strong></li>
                    <li>✓ Puedes comprar el <strong>mismo producto</strong> nuevamente</li>
                    <li>✓ O comprar un <strong>producto diferente del mismo precio</strong></li>
                    <li>✓ Plazo de devolución: <strong>30 días</strong> desde la entrega</li>
                    <li>✓ El producto debe estar en <strong>condiciones originales</strong></li>
                  </ul>
                </div>

                <motion.button
                  onClick={handleCheckout}
                  disabled={processingOrder}
                  className="w-full px-6 py-4 bg-[#2D4B39] text-white tracking-wide transition-all disabled:opacity-50 rounded-full overflow-hidden relative"
                  whileHover={!processingOrder ? { 
                    scale: 1.02,
                    boxShadow: "0 10px 20px rgba(45, 75, 57, 0.3)"
                  } : {}}
                  whileTap={!processingOrder ? { scale: 0.98 } : {}}
                >
                  <span className="relative z-10">
                    {processingOrder ? 'Procesando...' : 'Realizar Pedido'}
                  </span>
                  {!processingOrder && (
                    <motion.div
                      className="absolute inset-0 bg-[#B8860B]"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}