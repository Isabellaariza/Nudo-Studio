import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock,
  RefreshCw,
  FileText,
  AlertTriangle,
  Users,
  User,
  Package,
  Calendar,
  ShoppingCart,
  TrendingUp,
  Award,
  Activity,
  DollarSign,
  ArrowUpRight,
  CalendarCheck,
  UserCheck,
  Edit,
  Trash2,
  Plus,
  Search,
  Mail,
  Phone,
  MapPin,
  Check,
  X,
  Eye,
  Save,
  MessageSquare,
  Settings,
  Filter,
  Download,
  Upload,
  UserCog,
  CreditCard,
  Truck,
  Star,
  Info,
  Wrench,
  BookOpen,
  Image,
  FileImage,
  Palette,
  RotateCcw,
  FileDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
  Legend
} from 'recharts';
import { AdminSidebar } from '../AdminSidebar';
import { AdminNavbar } from '../AdminNavbar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner@2.0.3';
import { useApp } from '../../contexts/AppContext';
import { UserDialogs } from './AdminPanelDialogs';
import { EmployeeDialogs } from './EmployeeDialogs';
import { InventoryDialogs } from './InventoryDialogs';
import { OrderDialogs } from './OrderDialogs';
import { ReturnDialogs } from './ReturnDialogs';
import { ServiceDialogs } from './ServiceDialogs';
import { QuoteDialogs } from './QuoteDialogs';
import { SettingsPage } from './SettingsPage';

interface AdminPanelProps {
  user?: any;
  onLogout?: () => void;
}

export function AdminPanel({ user, onLogout }: AdminPanelProps) {
  const {
    users,
    addUser,
    updateUser,
    deleteUser,
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    workshops,
    addWorkshop,
    updateWorkshop,
    deleteWorkshop,
    enrollInWorkshop,
    completeWorkshop,
    orders,
    addOrder,
    updateOrder,
    deleteOrder,
    quotes,
    addQuote,
    updateQuote,
    deleteQuote,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    currentUser,
    rolePermissions,
  } = useApp();

  const isAdmin = currentUser?.role === 'Admin';
  const isEmployee = currentUser?.role === 'Empleado';
  const userPermissions = isAdmin ? {
    canManageUsers: true,
    canManageEmployees: true,
    canManageInventory: true,
    canManageOrders: true,
    canManageReturns: true,
    canManageServices: true,
    canManageQuotes: true,
    canManageWorkshops: true,
    canManageBlog: true
  } : rolePermissions[currentUser?.role || 'Cliente'] || {
    canManageUsers: false,
    canManageEmployees: false,
    canManageInventory: false,
    canManageOrders: false,
    canManageReturns: false,
    canManageServices: false,
    canManageQuotes: false,
    canManageWorkshops: false,
    canManageBlog: false
  };

  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [stats, setStats] = useState({
    pendingPayments: 3,
    returns: 2,
    quotes: 5,
    criticalInventory: 4,
    totalUsers: 248,
    totalProducts: 156,
    totalWorkshops: 12,
    totalOrders: 342,
    monthlyRevenue: 12850000,
    previousMonthRevenue: 11450000,
  });

  const [salesData] = useState([
    { month: 'Ene', sales: 12400 },
    { month: 'Feb', sales: 19800 },
    { month: 'Mar', sales: 15600 },
    { month: 'Abr', sales: 23400 },
    { month: 'May', sales: 28900 },
    { month: 'Jun', sales: 34200 },
  ]);

  const [topProducts] = useState([
    { name: 'Macramé Luna', sales: 142, percentage: 100 },
    { name: 'Collar Textil', sales: 128, percentage: 90 },
    { name: 'Pulsera Bohemia', sales: 95, percentage: 67 },
    { name: 'Tapiz Natural', sales: 78, percentage: 55 },
    { name: 'Aretes Artesanales', sales: 64, percentage: 45 },
  ]);

  const [recentActivity] = useState([
    { 
      type: 'order', 
      title: 'Nuevo pedido #3421', 
      time: 'Hace 5 min', 
      color: '#3B82F6',
      icon: 'ShoppingCart'
    },
    { 
      type: 'workshop', 
      title: 'Usuario inscrito en taller', 
      time: 'Hace 12 min', 
      color: '#A855F7',
      icon: 'Calendar'
    },
    { 
      type: 'quote', 
      title: 'Nueva cotización', 
      time: 'Hace 25 min', 
      color: '#F97316',
      icon: 'FileText'
    },
    { 
      type: 'user', 
      title: 'Nuevo usuario registrado', 
      time: 'Hace 1 hora', 
      color: '#10B981',
      icon: 'Users'
    },
    { 
      type: 'stock', 
      title: 'Stock bajo', 
      time: 'Hace 2 horas', 
      color: '#EF4444',
      icon: 'AlertTriangle'
    },
  ]);

  const [todayWorkshops] = useState([
    {
      id: 1,
      name: 'Macramé Básico para Principiantes',
      startTime: '10:00 AM',
      endTime: '4:00 PM',
      instructor: 'Isabella Ariza',
      students: 8,
      maxCapacity: 12,
      status: 'Programado'
    },
    {
      id: 2,
      name: 'Joyería Textil Avanzado',
      startTime: '2:00 PM',
      endTime: '6:00 PM',
      instructor: 'Carlos Mendoza',
      students: 6,
      maxCapacity: 10,
      status: 'Programado'
    }
  ]);

  // ESTADOS LOCALES PARA DIÁLOGOS
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState<any>(null);
  const [showUserInfoDialog, setShowUserInfoDialog] = useState(false);

  // ESTADOS PARA EMPLEADOS
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState<any>(null);
  const [showEmployeeInfoDialog, setShowEmployeeInfoDialog] = useState(false);
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');

  // ESTADOS PARA INVENTARIO
  const [activeInventoryTab, setActiveInventoryTab] = useState('finished-products');
  
  const [rawMaterials, setRawMaterials] = useState([
    {
      id: 1,
      name: 'Hilo de Algodón Natural',
      description: 'Hilo 100% algodón para tejidos y macramé, disponible en varios colores.',
      stock: 25,
      minStock: 10,
      unit: 'rollos',
      supplier: 'Textiles Andinos',
      cost: 12000,
      category: 'Hilos',
      lastPurchase: '2024-01-15'
    },
    {
      id: 2,
      name: 'Cuentas de Madera Natural',
      description: 'Cuentas redondas de madera natural de 8mm, perfectas para joyería artesanal.',
      stock: 5,
      minStock: 20,
      unit: 'paquetes',
      supplier: 'Maderas del Valle',
      cost: 8500,
      category: 'Cuentas',
      lastPurchase: '2024-01-10'
    },
    {
      id: 3,
      name: 'Piedras Semipreciosas',
      description: 'Mix de piedras semipreciosas: cuarzo, amatista y jade para joyería.',
      stock: 3,
      minStock: 15,
      unit: 'sets',
      supplier: 'Gemas Naturales',
      cost: 35000,
      category: 'Piedras',
      lastPurchase: '2023-12-20'
    },
    {
      id: 4,
      name: 'Aros de Madera',
      description: 'Aros de madera de diferentes tamaños para tapices y dreamcatchers.',
      stock: 18,
      minStock: 8,
      unit: 'unidades',
      supplier: 'Maderas del Valle',
      cost: 15000,
      category: 'Estructuras',
      lastPurchase: '2024-01-12'
    }
  ]);
  
  const [inventorySearchTerm, setInventorySearchTerm] = useState('');
  
  // Variable para productos terminados (usando products del contexto)
  const finishedProducts = products;

  // ESTADOS PARA DIÁLOGOS DE INVENTARIO
  const [selectedMaterialInfo, setSelectedMaterialInfo] = useState<any>(null);
  const [showMaterialInfoDialog, setShowMaterialInfoDialog] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [isNewMaterial, setIsNewMaterial] = useState(false);
  
  const [selectedProductInfo, setSelectedProductInfo] = useState<any>(null);
  const [showProductInfoDialog, setShowProductInfoDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // ESTADOS PARA PEDIDOS
  const [ordersData, setOrdersData] = useState([
    {
      id: 1,
      orderNumber: 'PED-2024-001',
      date: '2024-01-15',
      customer: {
        name: 'María García',
        documentType: 'cedula',
        documentNumber: '1234567890',
        email: 'maria@email.com',
        phone: '300-123-4567',
        address: 'Calle 123 #45-67, Bogotá'
      },
      products: [
        { name: 'Macramé Luna', quantity: 2, price: 85000 },
        { name: 'Collar Textil', quantity: 1, price: 45000 }
      ],
      total: 215000,
      paymentMethod: 'Transferencia Bancaria',
      paymentProof: 'comprobante_001.jpg',
      status: 'Pendiente',
      confirmedDate: null,
      rejectionReason: null
    },
    {
      id: 2,
      orderNumber: 'PED-2024-002',
      date: '2024-01-14',
      customer: {
        name: 'Juan Pérez',
        documentType: 'cedula',
        documentNumber: '0987654321',
        email: 'juan@email.com',
        phone: '310-234-5678',
        address: 'Carrera 45 #12-34, Medellín'
      },
      products: [
        { name: 'Pulsera Macramé', quantity: 3, price: 25000 }
      ],
      total: 75000,
      paymentMethod: 'Consignación',
      paymentProof: 'comprobante_002.jpg',
      status: 'Confirmado',
      confirmedDate: '2024-01-14',
      rejectionReason: null
    },
    {
      id: 3,
      orderNumber: 'PED-2024-003',
      date: '2024-01-13',
      customer: {
        name: 'Ana Martínez',
        documentType: 'cedula',
        documentNumber: '1122334455',
        email: 'ana@email.com',
        phone: '320-345-6789',
        address: 'Avenida 68 #23-45, Cali'
      },
      products: [
        { name: 'Tapiz Natural', quantity: 1, price: 120000 },
        { name: 'Aretes Artesanales', quantity: 2, price: 35000 }
      ],
      total: 190000,
      paymentMethod: 'Transferencia Bancaria',
      paymentProof: 'comprobante_003.jpg',
      status: 'En Proceso',
      confirmedDate: '2024-01-13',
      rejectionReason: null
    }
  ]);
  const [selectedOrderInfo, setSelectedOrderInfo] = useState<any>(null);
  const [showOrderInfoDialog, setShowOrderInfoDialog] = useState(false);
  const [showPaymentProofDialog, setShowPaymentProofDialog] = useState(false);
  const [selectedPaymentProof, setSelectedPaymentProof] = useState<any>(null);
  const [orderSearchTerm, setOrderSearchTerm] = useState('');

  // ESTADOS PARA DEVOLUCIONES
  const [returnsData, setReturnsData] = useState([
    {
      id: 1,
      returnNumber: 'DEV-2024-001',
      requestDate: '2024-01-20',
      originalOrder: 'PED-2024-001',
      deliveryDate: '2024-01-10',
      daysLeft: 5, // 15 días hábiles - días transcurridos
      customer: {
        name: 'María García',
        documentType: 'cedula',
        documentNumber: '1234567890',
        email: 'maria@email.com',
        phone: '300-123-4567',
        address: 'Calle 123 #45-67, Bogotá'
      },
      products: [
        { name: 'Macramé Luna', quantity: 1, price: 85000, condition: 'Dañado' }
      ],
      totalRefund: 85000,
      reason: {
        category: 'Defecto de fábrica',
        description: 'El producto llegó con hilos sueltos y la estructura del macramé está dañada.',
        evidence: ['evidencia_001_1.jpg', 'evidencia_001_2.jpg']
      },
      originalPaymentProof: 'comprobante_001.jpg',
      status: 'Pendiente',
      refundMethod: 'Transferencia bancaria',
      pickupAddress: 'Calle 123 #45-67, Bogotá',
      shippingCost: 'Cliente',
      processedDate: null
    },
    {
      id: 2,
      returnNumber: 'DEV-2024-002',
      requestDate: '2024-01-18',
      originalOrder: 'PED-2024-002',
      deliveryDate: '2024-01-08',
      daysLeft: 3,
      customer: {
        name: 'Juan Pérez',
        documentType: 'cedula',
        documentNumber: '0987654321',
        email: 'juan@email.com',
        phone: '310-234-5678',
        address: 'Carrera 45 #12-34, Medellín'
      },
      products: [
        { name: 'Collar Textil', quantity: 1, price: 45000, condition: 'Nuevo' }
      ],
      totalRefund: 45000,
      reason: {
        category: 'Color diferente',
        description: 'El color del collar no coincide con el mostrado en la página web.',
        evidence: ['evidencia_002_1.jpg']
      },
      originalPaymentProof: 'comprobante_002.jpg',
      status: 'Aprobada',
      refundMethod: 'Crédito en tienda',
      pickupAddress: 'Carrera 45 #12-34, Medellín',
      shippingCost: 'Empresa',
      processedDate: '2024-01-19'
    },
    {
      id: 3,
      returnNumber: 'DEV-2024-003',
      requestDate: '2024-01-15',
      originalOrder: 'PED-2024-003',
      deliveryDate: '2024-01-05',
      daysLeft: 0, // Vencido
      customer: {
        name: 'Ana Martínez',
        documentType: 'cedula',
        documentNumber: '1122334455',
        email: 'ana@email.com',
        phone: '320-345-6789',
        address: 'Avenida 68 #23-45, Cali'
      },
      products: [
        { name: 'Pulsera Macramé', quantity: 2, price: 25000, condition: 'Usado' }
      ],
      totalRefund: 50000,
      reason: {
        category: 'No cumple expectativas',
        description: 'Las pulseras no tienen la calidad esperada según las fotos.',
        evidence: ['evidencia_003_1.jpg', 'evidencia_003_2.jpg']
      },
      originalPaymentProof: 'comprobante_003.jpg',
      status: 'Rechazada',
      refundMethod: 'N/A',
      pickupAddress: 'N/A',
      shippingCost: 'N/A',
      processedDate: '2024-01-16'
    }
  ]);
  const [selectedReturnInfo, setSelectedReturnInfo] = useState<any>(null);
  const [showReturnInfoDialog, setShowReturnInfoDialog] = useState(false);
  const [showReturnEvidenceDialog, setShowReturnEvidenceDialog] = useState(false);
  const [selectedReturnEvidence, setSelectedReturnEvidence] = useState<any>(null);
  const [returnSearchTerm, setReturnSearchTerm] = useState('');

  // ESTADOS PARA SERVICIOS
  const [servicesData, setServicesData] = useState([
    {
      id: 1,
      title: 'Confección a Medida',
      description: 'Creamos piezas personalizadas adaptadas a tus necesidades y estilo. Desde macramé decorativo hasta accesorios únicos, trabajamos contigo para dar vida a tu visión.',
      features: [
        'Consultoría personalizada',
        'Diseño exclusivo',
        'Materiales de alta calidad',
        'Entrega en tiempo estimado'
      ],
      color: '#B8860B',
      gradient: 'from-[#B8860B]/10 to-[#B8860B]/5',
      icon: 'Scissors',
      status: 'active'
    },
    {
      id: 2,
      title: 'Diseño Personalizado',
      description: 'Ofrecemos servicios de diseño donde colaboramos contigo para crear piezas que reflejen tu personalidad o complementen tu espacio perfectamente.',
      features: [
        'Asesoría de color y estilo',
        'Bocetos y propuestas',
        'Ajustes ilimitados',
        'Garantía de satisfacción'
      ],
      color: '#2D4B39',
      gradient: 'from-[#2D4B39]/10 to-[#2D4B39]/5',
      icon: 'Palette',
      status: 'active'
    },
    {
      id: 3,
      title: 'Talleres y Capacitaciones',
      description: 'Aprende el arte del macramé, anudado y tejido textil en nuestros talleres prácticos. Desde nivel principiante hasta avanzado, te guiamos en cada paso.',
      features: [
        'Grupos reducidos',
        'Materiales incluidos',
        'Certificado de participación',
        'Acceso a comunidad'
      ],
      color: '#B8860B',
      gradient: 'from-[#B8860B]/10 to-[#B8860B]/5',
      icon: 'GraduationCap',
      status: 'active'
    },
    {
      id: 4,
      title: 'Kits para Hacer en Casa',
      description: 'Te enviamos todo lo que necesitas para crear tu propia pieza de macramé en casa, con instrucciones detalladas paso a paso y acceso a tutoriales en video.',
      features: [
        'Materiales premium incluidos',
        'Instrucciones detalladas',
        'Videos tutoriales',
        'Soporte online'
      ],
      color: '#2D4B39',
      gradient: 'from-[#2D4B39]/10 to-[#2D4B39]/5',
      icon: 'Package',
      status: 'active'
    }
  ]);
  const [selectedServiceInfo, setSelectedServiceInfo] = useState<any>(null);
  const [showServiceInfoDialog, setShowServiceInfoDialog] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [isNewService, setIsNewService] = useState(false);
  const [serviceSearchTerm, setServiceSearchTerm] = useState('');

  // ESTADOS PARA COTIZACIONES
  const [quotesData, setQuotesData] = useState([
    {
      id: 1,
      quoteNumber: 'COT-2024-001',
      requestDate: '2024-01-20',
      expiryDate: '2024-02-19',
      daysLeft: 15,
      customer: {
        name: 'María García',
        email: 'maria@email.com',
        phone: '300-123-4567'
      },
      project: {
        description: 'Necesito un tapiz de macramé grande para decorar la sala principal de mi casa. Me gustaría que tenga diseños geométricos y colores neutros que combinen con mi decoración actual.',
        budget: '$200.000-$500.000 COP',
        timeline: '1-2 meses',
        service: 'Confección a Medida'
      },
      quote: {
        price: 350000,
        notes: 'Tapiz de 120x80cm con diseño geométrico en hilo de algodón natural. Incluye instalación.',
        attachments: ['boceto_maria_001.jpg', 'referencia_colores.jpg']
      },
      status: 'Pendiente',
      responseDate: null
    },
    {
      id: 2,
      quoteNumber: 'COT-2024-002',
      requestDate: '2024-01-18',
      expiryDate: '2024-02-17',
      daysLeft: 13,
      customer: {
        name: 'Juan Pérez',
        email: 'juan@email.com',
        phone: '310-234-5678'
      },
      project: {
        description: 'Quiero aprender macramé desde cero. Me interesa un taller presencial para principiantes, preferiblemente los fines de semana.',
        budget: '$50.000-$100.000 COP',
        timeline: 'Flexible',
        service: 'Talleres y Capacitaciones'
      },
      quote: {
        price: 85000,
        notes: 'Taller básico de macramé - 4 sesiones de 3 horas c/u. Incluye todos los materiales y certificado.',
        attachments: ['programa_taller_basico.pdf']
      },
      status: 'Cotizada',
      responseDate: '2024-01-19'
    },
    {
      id: 3,
      quoteNumber: 'COT-2024-003',
      requestDate: '2024-01-15',
      expiryDate: '2024-02-14',
      daysLeft: 10,
      customer: {
        name: 'Ana Martínez',
        email: 'ana@email.com',
        phone: '320-345-6789'
      },
      project: {
        description: 'Necesito 20 pulseras de macramé personalizadas para regalar en mi boda. Cada una con las iniciales de los invitados y en colores dorado y blanco.',
        budget: 'Más de $500.000 COP',
        timeline: '3-4 semanas',
        service: 'Confección a Medida'
      },
      quote: {
        price: 650000,
        notes: '20 pulseras personalizadas con iniciales bordadas. Hilo dorado y blanco, empaque individual de regalo.',
        attachments: ['muestra_pulsera_boda.jpg', 'lista_iniciales.pdf']
      },
      status: 'Aprobada',
      responseDate: '2024-01-16'
    },
    {
      id: 4,
      quoteNumber: 'COT-2024-004',
      requestDate: '2024-01-10',
      expiryDate: '2024-02-09',
      daysLeft: 0,
      customer: {
        name: 'Carlos López',
        email: 'carlos@email.com',
        phone: '330-456-7890'
      },
      project: {
        description: 'Kit completo para hacer macramé en casa. Soy principiante y quiero empezar con proyectos sencillos como posavasos y pequeños colgantes.',
        budget: '$100.000-$200.000 COP',
        timeline: '1-2 semanas',
        service: 'Kits para Hacer en Casa'
      },
      quote: {
        price: 125000,
        notes: 'Kit principiante: hilos, herramientas básicas, 5 patrones diferentes y acceso a videos tutoriales.',
        attachments: ['contenido_kit_principiante.pdf']
      },
      status: 'Vencida',
      responseDate: '2024-01-12'
    }
  ]);
  const [selectedQuoteInfo, setSelectedQuoteInfo] = useState<any>(null);
  const [showQuoteInfoDialog, setShowQuoteInfoDialog] = useState(false);
  const [editingQuote, setEditingQuote] = useState<any>(null);
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);
  const [isNewQuote, setIsNewQuote] = useState(false);
  const [quoteSearchTerm, setQuoteSearchTerm] = useState('');

  // ESTADOS PARA TALLERES
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);

  // ESTADOS PARA BLOG
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [isNewPost, setIsNewPost] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [blogSearchTerm, setBlogSearchTerm] = useState('');

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success('Datos actualizados');
  };

  // FUNCIONES PARA USUARIOS
  const handleAddUser = () => {
    setIsNewUser(true);
    setEditingUser({
      id: users.length + 1,
      name: '',
      email: '',
      phone: '',
      address: '',
      documentType: 'cedula',
      documentNumber: '',
      role: 'Cliente',
      orders: 0,
      status: true,
      joined: new Date().toISOString().split('T')[0]
    });
    setShowUserDialog(true);
  };

  const handleEditUser = (user: any) => {
    setIsNewUser(false);
    setEditingUser({...user});
    setShowUserDialog(true);
  };

  const handleSaveUser = () => {
    if (isNewUser) {
      addUser(editingUser);
      toast.success('Usuario agregado exitosamente');
    } else {
      updateUser(editingUser.id, editingUser);
      toast.success('Usuario actualizado exitosamente');
    }
    setShowUserDialog(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: number) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      deleteUser(userId);
      toast.success('Usuario eliminado exitosamente');
    }
  };

  const handleToggleUserStatus = (userId: number) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      updateUser(userId, { ...user, status: !user.status });
      toast.success('Estado actualizado');
    }
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
    } else {
      updateEmployee(editingEmployee.id, editingEmployee);
    }
    setShowEmployeeDialog(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployeeAdmin = (employeeId: number) => {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      deleteEmployee(employeeId);
    }
  };

  const handleToggleEmployeeStatus = (employeeId: number) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      updateEmployee(employeeId, { status: !employee.status });
    }
  };

  // FUNCIONES PARA INVENTARIO
  const handleAddMaterial = () => {
    setIsNewMaterial(true);
    setEditingMaterial({
      id: rawMaterials.length + 1,
      name: '',
      description: '',
      stock: 0,
      minStock: 0,
      unit: 'unidades',
      supplier: '',
      cost: 0,
      category: '',
      lastPurchase: new Date().toISOString().split('T')[0]
    });
    setShowMaterialDialog(true);
  };

  const handleEditMaterial = (material: any) => {
    setIsNewMaterial(false);
    setEditingMaterial({...material});
    setShowMaterialDialog(true);
  };

  const handleSaveMaterial = () => {
    if (isNewMaterial) {
      setRawMaterials([...rawMaterials, editingMaterial]);
      toast.success('Material agregado exitosamente');
    } else {
      setRawMaterials(rawMaterials.map(mat => mat.id === editingMaterial.id ? editingMaterial : mat));
      toast.success('Material actualizado exitosamente');
    }
    setShowMaterialDialog(false);
    setEditingMaterial(null);
  };

  const handleDeleteMaterial = (materialId: number) => {
    if (confirm('¿Estás seguro de eliminar este material?')) {
      setRawMaterials(rawMaterials.filter(mat => mat.id !== materialId));
      toast.success('Material eliminado exitosamente');
    }
  };

  const handleAddProduct = () => {
    setIsNewProduct(true);
    setEditingProduct({
      id: products.length + 1,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      category: '',
      image: '',
      materials: [],
      size: '',
      weight: '',
      status: 'active'
    });
    setShowProductDialog(true);
  };

  const handleEditProduct = (product: any) => {
    setIsNewProduct(false);
    setEditingProduct({...product});
    setShowProductDialog(true);
  };

  const handleSaveProduct = () => {
    if (isNewProduct) {
      addProduct(editingProduct);
    } else {
      updateProduct(editingProduct.id, editingProduct);
    }
    setShowProductDialog(false);
    setEditingProduct(null);
  };

  const handleDeleteProductAdmin = (productId: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      deleteProduct(productId);
    }
  };

  // FUNCIONES PARA PEDIDOS
  const handleConfirmOrder = (orderId: number) => {
    setOrdersData(ordersData.map(order => 
      order.id === orderId 
        ? { ...order, status: 'Confirmado', confirmedDate: new Date().toISOString().split('T')[0] }
        : order
    ));
    toast.success('Pedido confirmado exitosamente');
  };

  const handleRejectOrder = (orderId: number) => {
    const reason = prompt('Motivo del rechazo (opcional):');
    setOrdersData(ordersData.map(order => 
      order.id === orderId 
        ? { ...order, status: 'Rechazado', rejectionReason: reason || 'Sin motivo especificado' }
        : order
    ));
    toast.success('Pedido rechazado');
  };

  const handleViewPaymentProof = (order: any) => {
    setSelectedPaymentProof(order);
    setShowPaymentProofDialog(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Confirmado': return { bg: '#D1FAE5', text: '#065F46' };
      case 'Rechazado': return { bg: '#FEE2E2', text: '#991B1B' };
      case 'En Proceso': return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'Completado': return { bg: '#F0FDF4', text: '#166534' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const getReturnStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return { bg: '#FEF3C7', text: '#92400E' };
      case 'Aprobada': return { bg: '#D1FAE5', text: '#065F46' };
      case 'Rechazada': return { bg: '#FEE2E2', text: '#991B1B' };
      case 'Procesada': return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'Reembolsada': return { bg: '#F0FDF4', text: '#166534' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  // FUNCIONES PARA DEVOLUCIONES
  const handleApproveReturn = (returnId: number) => {
    setReturnsData(returnsData.map(ret => 
      ret.id === returnId 
        ? { ...ret, status: 'Aprobada', processedDate: new Date().toISOString().split('T')[0] }
        : ret
    ));
    toast.success('Devolución aprobada exitosamente');
  };

  const handleRejectReturn = (returnId: number) => {
    const reason = prompt('Motivo del rechazo (opcional):');
    setReturnsData(returnsData.map(ret => 
      ret.id === returnId 
        ? { ...ret, status: 'Rechazada', processedDate: new Date().toISOString().split('T')[0] }
        : ret
    ));
    toast.success('Devolución rechazada');
  };

  const handleProcessRefund = (returnId: number) => {
    setReturnsData(returnsData.map(ret => 
      ret.id === returnId 
        ? { ...ret, status: 'Reembolsada', processedDate: new Date().toISOString().split('T')[0] }
        : ret
    ));
    toast.success('Reembolso procesado exitosamente');
  };

  const handleViewReturnEvidence = (returnData: any) => {
    setSelectedReturnEvidence(returnData);
    setShowReturnEvidenceDialog(true);
  };

  // FUNCIONES PARA SERVICIOS
  const handleAddService = () => {
    setIsNewService(true);
    setEditingService({
      id: servicesData.length + 1,
      title: '',
      description: '',
      features: [],
      color: '#B8860B',
      gradient: 'from-[#B8860B]/10 to-[#B8860B]/5',
      icon: 'Wrench',
      status: 'active'
    });
    setShowServiceDialog(true);
  };

  const handleEditService = (service: any) => {
    setIsNewService(false);
    setEditingService({...service});
    setShowServiceDialog(true);
  };

  const handleSaveService = () => {
    if (isNewService) {
      setServicesData([...servicesData, editingService]);
      toast.success('Servicio agregado exitosamente');
    } else {
      setServicesData(servicesData.map(service => service.id === editingService.id ? editingService : service));
      toast.success('Servicio actualizado exitosamente');
    }
    setShowServiceDialog(false);
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: number) => {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      setServicesData(servicesData.filter(service => service.id !== serviceId));
      toast.success('Servicio eliminado exitosamente');
    }
  };

  // FUNCIONES PARA COTIZACIONES
  const handleAddQuote = () => {
    setIsNewQuote(true);
    setEditingQuote({
      id: quotesData.length + 1,
      quoteNumber: `COT-2024-${String(quotesData.length + 1).padStart(3, '0')}`,
      requestDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      customer: { name: '', email: '', phone: '' },
      project: { description: '', budget: '', timeline: '', service: '' },
      quote: { price: 0, notes: '', attachments: [] },
      status: 'Pendiente'
    });
    setShowQuoteDialog(true);
  };

  const handleEditQuote = (quote: any) => {
    setIsNewQuote(false);
    setEditingQuote({...quote});
    setShowQuoteDialog(true);
  };

  const handleSaveQuote = () => {
    if (isNewQuote) {
      setQuotesData([...quotesData, editingQuote]);
      toast.success('Cotización agregada exitosamente');
    } else {
      setQuotesData(quotesData.map(quote => quote.id === editingQuote.id ? editingQuote : quote));
      toast.success('Cotización actualizada exitosamente');
    }
    setShowQuoteDialog(false);
    setEditingQuote(null);
  };

  const handleDeleteQuote = (quoteId: number) => {
    if (confirm('¿Estás seguro de eliminar esta cotización?')) {
      setQuotesData(quotesData.filter(quote => quote.id !== quoteId));
      toast.success('Cotización eliminada exitosamente');
    }
  };

  const handleApproveQuote = (quoteId: number) => {
    setQuotesData(quotesData.map(quote => 
      quote.id === quoteId 
        ? { ...quote, status: 'Aprobada' }
        : quote
    ));
    toast.success('Cotización aprobada exitosamente');
  };

  const handleRejectQuote = (quoteId: number) => {
    setQuotesData(quotesData.map(quote => 
      quote.id === quoteId 
        ? { ...quote, status: 'Rechazada' }
        : quote
    ));
    toast.success('Cotización rechazada');
  };

  const getQuoteStatusColor = (status: string) => {
    switch (status) {
      case 'Pendiente': return { bg: '#FEF3C7', text: '#92400E' };
      case 'En revisión': return { bg: '#DBEAFE', text: '#1E40AF' };
      case 'Cotizada': return { bg: '#E0E7FF', text: '#3730A3' };
      case 'Aprobada': return { bg: '#D1FAE5', text: '#065F46' };
      case 'Rechazada': return { bg: '#FEE2E2', text: '#991B1B' };
      case 'Vencida': return { bg: '#F3F4F6', text: '#374151' };
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const generateQuotePDF = (quote: any) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Cotización ${quote.quoteNumber}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2D4B39; padding-bottom: 20px; }
          .logo { font-size: 32px; font-weight: bold; color: #2D4B39; margin-bottom: 10px; }
          .company-info { color: #666; font-size: 14px; }
          .quote-info { display: flex; justify-content: space-between; margin: 30px 0; }
          .quote-number { font-size: 24px; font-weight: bold; color: #2D4B39; }
          .dates { text-align: right; }
          .section { margin: 25px 0; }
          .section-title { background: #2D4B39; color: white; padding: 10px; font-weight: bold; margin-bottom: 15px; }
          .client-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .info-item { margin-bottom: 10px; }
          .label { font-weight: bold; color: #2D4B39; }
          .project-desc { background: #f9f9f9; padding: 15px; border-left: 4px solid #B8860B; margin: 15px 0; }
          .quote-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .quote-table th, .quote-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .quote-table th { background: #2D4B39; color: white; }
          .total-row { background: #f0f8f0; font-weight: bold; }
          .terms { background: #f9f9f9; padding: 20px; margin-top: 30px; }
          .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
          @media print { body { margin: 0; } .container { max-width: none; } }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="logo">NUDO Studio</div>
            <div class="company-info">
              Arte Textil y Macramé Artesanal<br>
              Email: info@nudostudio.com | Teléfono: +57 300 123 4567<br>
              Bogotá, Colombia
            </div>
          </div>

          <!-- Quote Info -->
          <div class="quote-info">
            <div>
              <div class="quote-number">COTIZACIÓN</div>
              <div class="quote-number">${quote.quoteNumber}</div>
            </div>
            <div class="dates">
              <div><strong>Fecha de Emisión:</strong> ${quote.requestDate}</div>
              <div><strong>Válida hasta:</strong> ${quote.expiryDate}</div>
              <div><strong>Estado:</strong> ${quote.status}</div>
            </div>
          </div>

          <!-- Client Info -->
          <div class="section">
            <div class="section-title">INFORMACIÓN DEL CLIENTE</div>
            <div class="client-info">
              <div>
                <div class="info-item"><span class="label">Nombre:</span> ${quote.customer.name}</div>
                <div class="info-item"><span class="label">Email:</span> ${quote.customer.email}</div>
              </div>
              <div>
                <div class="info-item"><span class="label">Teléfono:</span> ${quote.customer.phone}</div>
                <div class="info-item"><span class="label">Fecha de Solicitud:</span> ${quote.requestDate}</div>
              </div>
            </div>
          </div>

          <!-- Project Details -->
          <div class="section">
            <div class="section-title">DETALLES DEL PROYECTO</div>
            <div class="info-item"><span class="label">Servicio:</span> ${quote.project.service}</div>
            <div class="project-desc">
              <strong>Descripción:</strong><br>
              ${quote.project.description}
            </div>
            <div class="client-info">
              <div class="info-item"><span class="label">Presupuesto Estimado:</span> ${quote.project.budget}</div>
              <div class="info-item"><span class="label">Timeline:</span> ${quote.project.timeline}</div>
            </div>
          </div>

          <!-- Quote Table -->
          <div class="section">
            <div class="section-title">COTIZACIÓN</div>
            <table class="quote-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${quote.project.service}<br><small>${quote.quote.notes || 'Servicio personalizado según especificaciones'}</small></td>
                  <td>1</td>
                  <td>$${quote.quote.price.toLocaleString('es-CO')} COP</td>
                  <td>$${quote.quote.price.toLocaleString('es-CO')} COP</td>
                </tr>
                <tr class="total-row">
                  <td colspan="3"><strong>TOTAL</strong></td>
                  <td><strong>$${quote.quote.price.toLocaleString('es-CO')} COP</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Terms -->
          <div class="terms">
            <div class="section-title">TÉRMINOS Y CONDICIONES</div>
            <ul style="margin-left: 20px;">
              <li><strong>Validez:</strong> Esta cotización es válida por 30 días calendario.</li>
              <li><strong>Forma de Pago:</strong> 50% anticipo, 50% contra entrega. Transferencia bancaria o consignación.</li>
              <li><strong>Tiempo de Entrega:</strong> ${quote.project.timeline} a partir de la confirmación del pedido.</li>
              <li><strong>Garantía:</strong> 30 días por defectos de fabricación.</li>
              <li><strong>Cambios:</strong> Cualquier modificación al proyecto puede afectar el precio y tiempo de entrega.</li>
              <li><strong>Materiales:</strong> Se utilizan materiales de primera calidad, 100% naturales.</li>
            </ul>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p><strong>NUDO Studio</strong> - Arte Textil y Macramé Artesanal</p>
            <p>NIT: 123.456.789-0 | Registro Mercantil: 12345</p>
            <p>Instagram: @nudostudio | Facebook: NUDO Studio</p>
            <p>¡Gracias por confiar en nosotros para crear piezas únicas!</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
    
    toast.success('PDF generado exitosamente');
  };

  // RENDERIZAR DASHBOARD
  const renderDashboard = () => (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header del Dashboard */}
      <motion.div 
        className="relative overflow-hidden"
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
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
              {isAdmin ? 'Panel de Administración' : 'Panel de Empleado'}
            </h1>
            <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
              {isAdmin ? 'Gestión y control del sistema' : 'Gestión operativa'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tarjetas de Alertas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          {
            title: 'Pagos Pendientes',
            value: '0',
            action: 'Ver pedidos →',
            icon: Clock,
            color: '#F59E0B',
            section: 'orders'
          },
          {
            title: 'Devoluciones Nuevas',
            value: '0',
            action: 'Revisar →',
            icon: RefreshCw,
            color: '#8B5CF6',
            section: 'returns'
          },
          {
            title: 'Cotizaciones Pendientes',
            value: '0',
            action: 'Responder →',
            icon: FileText,
            color: '#F97316',
            section: 'quotes'
          },
          {
            title: 'Inventario Crítico',
            value: '2',
            action: 'Ver materiales →',
            icon: AlertTriangle,
            color: '#EF4444',
            section: 'inventory'
          }
        ].map((alert, index) => (
          <motion.div
            key={alert.title}
            className="relative overflow-hidden rounded-2xl p-6 cursor-pointer"
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
            onClick={() => setActiveSection(alert.section)}
          >
            <div className="flex items-center justify-between mb-6">
              <alert.icon className="w-6 h-6" style={{ color: alert.color }} />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                  {alert.value}
                </span>
                {alert.value !== '0' && (
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: alert.color }}></div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>
                {alert.title}
              </p>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                {alert.action}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Usuarios Totales',
            value: '4',
            subtitle: '+0 este mes',
            icon: Users,
            color: '#B8860B',
            section: 'users'
          },
          {
            title: 'Productos',
            value: '41',
            subtitle: 'En catálogo',
            icon: Package,
            color: '#B8860B',
            section: 'inventory'
          },
          {
            title: 'Talleres',
            value: '8',
            subtitle: 'Programados',
            icon: Calendar,
            color: '#B8860B',
            section: 'workshops'
          },
          {
            title: 'Pedidos',
            value: '6',
            subtitle: 'Total',
            icon: ShoppingCart,
            color: '#B8860B',
            section: 'orders'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            className="relative overflow-hidden rounded-2xl p-6 cursor-pointer"
            style={{
              background: '#ffffff',
              border: '1px solid rgba(224, 209, 192, 0.2)',
              boxShadow: '0 2px 8px rgba(45, 75, 57, 0.04)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 4), duration: 0.5 }}
            whileHover={{ 
              y: -4,
              boxShadow: '0 8px 24px rgba(45, 75, 57, 0.12)',
              transition: { duration: 0.2 }
            }}
            onClick={() => setActiveSection(stat.section)}
          >
            <div className="flex items-center justify-between mb-6">
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              <span className="text-2xl font-bold" style={{ color: '#2D4B39' }}>
                {stat.value}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#2D4B39' }}>
                {stat.title}
              </p>
              <p className="text-sm" style={{ color: stat.color }}>
                {stat.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ventas Mensuales y Top 5 Productos - Lado a lado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Ventas Mensuales */}
        <motion.div
          className="rounded-2xl p-6"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(224, 209, 192, 0.2)',
            boxShadow: '0 8px 32px rgba(45, 75, 57, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          whileHover={{ 
            boxShadow: '0 12px 40px rgba(45, 75, 57, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
            transition: { duration: 0.3 }
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>
                Ventas Mensuales
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Últimos 6 meses
              </p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" style={{ color: '#10B981' }} />
              <span className="text-sm font-medium" style={{ color: '#10B981' }}>
                +23%
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.1)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid rgba(224, 209, 192, 0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(45, 75, 57, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="url(#greenGradient)" 
                  radius={[8, 8, 0, 0]}
                  style={{
                    filter: 'drop-shadow(0 4px 8px rgba(45, 75, 57, 0.3))'
                  }}
                />
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A6B57" />
                    <stop offset="50%" stopColor="#3A5A47" />
                    <stop offset="100%" stopColor="#2D4B39" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top 5 Productos */}
        <motion.div
          className="rounded-2xl p-6"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(224, 209, 192, 0.2)',
            boxShadow: '0 8px 32px rgba(45, 75, 57, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.1)'
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          whileHover={{ 
            boxShadow: '0 12px 40px rgba(45, 75, 57, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
            transition: { duration: 0.3 }
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>
                Top 5 Productos
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Los más vendidos del mes
              </p>
            </div>
            <Award className="w-6 h-6" style={{ color: '#B8860B' }} />
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => {
              const colors = {
                0: '#FFD700', // Oro
                1: '#C0C0C0', // Plata
                2: '#CD7F32', // Bronce
                3: '#2D4B39', // Verde de la página
                4: '#2D4B39'  // Verde de la página
              };
              return (
                <motion.div
                  key={product.name}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (0.1 * index), duration: 0.3 }}
                >
                  <div 
                    className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-transform hover:scale-110"
                    style={{ 
                      backgroundColor: colors[index as keyof typeof colors],
                      color: '#ffffff',
                      boxShadow: `0 4px 12px ${colors[index as keyof typeof colors]}40, inset 0 1px 3px rgba(255, 255, 255, 0.4), inset 0 -1px 2px rgba(0, 0, 0, 0.2)`
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium" style={{ color: '#2D4B39' }}>
                        {product.name}
                      </p>
                      <span className="text-sm font-semibold" style={{ color: colors[index as keyof typeof colors] }}>
                        {product.sales}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ 
                          backgroundColor: colors[index as keyof typeof colors],
                          boxShadow: `0 2px 6px ${colors[index as keyof typeof colors]}60, inset 0 1px 2px rgba(255, 255, 255, 0.3)`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${product.percentage}%` }}
                        transition={{ delay: 0.7 + (0.1 * index), duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Ingresos del Mes y Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Ingresos del Mes */}
        <motion.div
          className="rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)'
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5" style={{ color: '#10B981' }} />
            <h3 className="text-lg font-semibold" style={{ color: '#10B981' }}>
              Ingresos del Mes
            </h3>
          </div>
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#10B981' }}>
              $125.000 COP
            </h2>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: '#10B981' }} />
              <span className="text-sm font-medium" style={{ color: '#10B981' }}>
                +12.5% vs mes anterior
              </span>
            </div>
          </div>
          <div className="border-t pt-4" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: '#2D4B39' }}>Productos</span>
                <span className="text-sm font-semibold" style={{ color: '#10B981' }}>$125.000 COP</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: '#2D4B39' }}>Talleres</span>
                <span className="text-sm font-semibold" style={{ color: '#10B981' }}>$0 COP</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actividad Reciente */}
        <motion.div
          className="rounded-2xl p-6"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(224, 209, 192, 0.2)',
            boxShadow: '0 2px 8px rgba(45, 75, 57, 0.04)'
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>
                Actividad Reciente
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Últimas acciones del sistema
              </p>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="w-5 h-5" style={{ color: '#6B7280' }} />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + (0.1 * index), duration: 0.3 }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${activity.color}15` }}
                >
                  {activity.icon === 'ShoppingCart' && <ShoppingCart className="w-5 h-5" style={{ color: activity.color }} />}
                  {activity.icon === 'Calendar' && <Calendar className="w-5 h-5" style={{ color: activity.color }} />}
                  {activity.icon === 'FileText' && <FileText className="w-5 h-5" style={{ color: activity.color }} />}
                  {activity.icon === 'Users' && <Users className="w-5 h-5" style={{ color: activity.color }} />}
                  {activity.icon === 'AlertTriangle' && <AlertTriangle className="w-5 h-5" style={{ color: activity.color }} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: '#2D4B39' }}>
                    {activity.title}
                  </p>
                  <p className="text-xs" style={{ color: '#6B7280' }}>
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Talleres de Hoy */}
      <motion.div
        className="rounded-2xl p-6"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(224, 209, 192, 0.2)',
          boxShadow: '0 2px 8px rgba(45, 75, 57, 0.04)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>
              Talleres de Hoy
            </h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>
              {new Date().toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <CalendarCheck className="w-6 h-6" style={{ color: '#B8860B' }} />
        </div>
        <div className="space-y-4">
          {todayWorkshops.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              className="p-4 rounded-xl border-l-4"
              style={{
                backgroundColor: 'rgba(45, 75, 57, 0.05)',
                borderLeftColor: '#B8860B'
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + (0.1 * index), duration: 0.3 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold" style={{ color: '#2D4B39' }}>
                  {workshop.name}
                </h4>
                <span className="text-xs px-2 py-1 rounded-full" style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10B981'
                }}>
                  {workshop.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs" style={{ color: '#6B7280' }}>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {workshop.startTime} - {workshop.endTime}
                </div>
                <div className="flex items-center gap-1">
                  <UserCheck className="w-3 h-3" />
                  {workshop.students}/{workshop.maxCapacity}
                </div>
              </div>
              <p className="text-xs mt-2" style={{ color: '#B8860B' }}>
                Instructor: {workshop.instructor}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  // RENDERIZAR USUARIOS
  const renderUsers = () => (
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
                    <Users className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Usuarios
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {users.length} usuarios registrados
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {users.filter(user => user.status).length} activos
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
                    placeholder="Buscar usuarios..."
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
                  onClick={() => alert('Funcionalidad de crear pedido próximamente')}
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
                  Crear Pedido
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">USUARIO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">EMAIL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">TELÉFONO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ROL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ESTADO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
                {(searchTerm ? users.filter(user => 
                  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchTerm.toLowerCase())
                ) : users).map((user: any, index: number) => (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    whileHover={{ 
                      y: -2,
                      boxShadow: '0 4px 12px rgba(45, 75, 57, 0.1)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#2D4B39' }}>
                          {user.profilePhoto ? (
                            <img 
                              src={user.profilePhoto} 
                              alt={user.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-xs font-light" style={{ color: '#B8860B' }}>
                            {user.documentType === 'cedula' ? 'CC' : 'CE'}: {user.documentNumber || '1234567890'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.phone || '300-123-4567'}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                        backgroundColor: user.role === 'Estudiante' ? '#FEF3C7' : '#F3F4F6',
                        color: user.role === 'Estudiante' ? '#92400E' : '#374151'
                      }}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleUserStatus(user.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                          user.status ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                            user.status ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setSelectedUserInfo(user); setShowUserInfoDialog(true); }}
                          className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                          title="Ver información"
                        >
                          <Info className="w-4 h-4 text-gray-500" />
                        </button>
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="p-2 rounded-lg transition-colors hover:bg-yellow-50"
                          title="Editar usuario"
                        >
                          <Edit className="w-4 h-4" style={{ color: '#B8860B' }} />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 rounded-lg transition-colors hover:bg-red-50"
                          title="Eliminar usuario"
                        >
                          <Trash2 className="w-4 h-4" style={{ color: '#ef4444' }} />
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
          {(employeeSearchTerm ? employees.filter(employee => 
            employee.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
            employee.department.toLowerCase().includes(employeeSearchTerm.toLowerCase())
          ) : employees).map((employee: any, index: number) => (
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
      </motion.div>
    </>
  );

  // RENDERIZAR INVENTARIO
  const renderInventory = () => (
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
                    <Package className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Inventario
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {finishedProducts.length} productos terminados, {rawMaterials.length} materias primas
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-xs" style={{ color: '#ef4444' }}>
                        {rawMaterials.filter(mat => mat.stock <= mat.minStock).length} críticos
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
                    placeholder="Buscar en inventario..."
                    value={inventorySearchTerm}
                    onChange={(e) => setInventorySearchTerm(e.target.value)}
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
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="flex gap-2 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <button
            onClick={() => setActiveInventoryTab('finished-products')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeInventoryTab === 'finished-products' ? 'scale-105' : 'hover:scale-105'
            }`}
            style={{
              background: activeInventoryTab === 'finished-products' 
                ? 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)' 
                : 'rgba(45, 75, 57, 0.1)',
              color: activeInventoryTab === 'finished-products' ? '#ffffff' : '#2D4B39',
              boxShadow: activeInventoryTab === 'finished-products' 
                ? '0 4px 12px rgba(45, 75, 57, 0.3)' 
                : 'none'
            }}
          >
            Productos Terminados
          </button>
          <button
            onClick={() => setActiveInventoryTab('raw-materials')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeInventoryTab === 'raw-materials' ? 'scale-105' : 'hover:scale-105'
            }`}
            style={{
              background: activeInventoryTab === 'raw-materials' 
                ? 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)' 
                : 'rgba(45, 75, 57, 0.1)',
              color: activeInventoryTab === 'raw-materials' ? '#ffffff' : '#2D4B39',
              boxShadow: activeInventoryTab === 'raw-materials' 
                ? '0 4px 12px rgba(45, 75, 57, 0.3)' 
                : 'none'
            }}
          >
            Materias Primas
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeInventoryTab === 'finished-products' && (
            <motion.div
              key="finished-products"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {products.map((product: any, index: number) => (
                <motion.div
                  key={product.id}
                  className="group bg-white rounded-[1.5rem] p-3 shadow-sm hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <motion.div 
                    className="relative aspect-square overflow-hidden mb-3 rounded-xl"
                    style={{ backgroundColor: 'rgba(224, 209, 192, 0.2)' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-16 h-16" style={{ color: '#2D4B39' }} />
                    </div>
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-[#2D4B39]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  
                  <h3 className="text-base font-semibold mb-2 line-clamp-1" style={{ color: '#2D4B39' }}>
                    {product.name}
                  </h3>
                  
                  <div className="mb-3">
                    <p className="text-sm line-clamp-2 min-h-[2.5rem]" style={{ color: 'rgba(45, 75, 57, 0.6)' }}>
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4" style={{ color: '#B8860B' }} />
                      <span className="text-sm font-medium" style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${product.stock > 5 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                      <span className="text-sm" style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
                        {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <motion.span 
                      className="font-bold text-lg"
                      style={{ color: '#B8860B' }}
                      whileHover={{ scale: 1.05 }}
                    >
                      ${product.price.toLocaleString('es-CO')}
                    </motion.span>
                    <span className="text-sm font-medium" style={{ color: product.stock > 0 ? '#10B981' : '#ef4444' }}>
                      Stock: {product.stock}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setSelectedProductInfo(product); setShowProductInfoDialog(true); }}
                      className="flex-1 py-2 px-2 rounded-lg transition-colors hover:bg-gray-200"
                      style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                    >
                      <Eye className="w-4 h-4 mx-auto" style={{ color: '#6B7280' }} />
                    </button>
                    <button 
                      onClick={() => handleEditProduct(product)}
                      className="flex-1 py-2 px-2 rounded-lg transition-colors hover:bg-yellow-200"
                      style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}
                    >
                      <Edit className="w-4 h-4 mx-auto" style={{ color: '#B8860B' }} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProductAdmin(product.id)}
                      className="flex-1 py-2 px-2 rounded-lg transition-colors hover:bg-red-200"
                      style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    >
                      <Trash2 className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeInventoryTab === 'raw-materials' && (
            <motion.div
              key="raw-materials"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {rawMaterials.map((material: any, index: number) => {
                const isLowStock = material.stock <= material.minStock;
                
                return (
                  <motion.div
                    key={material.id}
                    className="relative rounded-2xl overflow-hidden shadow-sm h-[520px] flex flex-col"
                    style={{
                      background: isLowStock ? '#FEF2F2' : '#ffffff',
                      border: isLowStock ? '2px solid #FCA5A5' : '1px solid rgba(224, 209, 192, 0.2)',
                      boxShadow: isLowStock ? '0 4px 12px rgba(239, 68, 68, 0.2)' : '0 2px 8px rgba(45, 75, 57, 0.04)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ 
                      y: -4,
                      boxShadow: isLowStock ? '0 8px 24px rgba(239, 68, 68, 0.3)' : '0 8px 24px rgba(45, 75, 57, 0.12)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Header con título y badge crítico */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200 relative h-[88px] flex items-center">
                      <div className="flex items-start justify-between w-full">
                        <div className="flex-1 min-w-0 pr-2">
                          <h3 className="text-lg font-semibold mb-1 truncate" style={{ color: '#2D4B39' }}>{material.name}</h3>
                          <span 
                            className="text-xs px-3 py-1 rounded-full font-medium"
                            style={{ 
                              backgroundColor: '#B8860B',
                              color: '#ffffff'
                            }}
                          >
                            {material.category}
                          </span>
                        </div>
                        {isLowStock && (
                          <motion.div 
                            className="flex items-center gap-1 px-2 py-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <AlertTriangle className="w-3 h-3" />
                            <span className="text-xs font-medium">Crítico</span>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Contenido principal */}
                    <div className="p-6 flex-1 flex flex-col">
                      <p className="text-sm mb-4 leading-relaxed line-clamp-2" style={{ color: '#6B7280' }}>{material.description}</p>
                      
                      {/* Stock Information en grid */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: isLowStock ? '#FEE2E2' : '#F0FDF4' }}>
                            <p className="text-xs mb-1 font-medium" style={{ color: '#6B7280' }}>Stock Actual</p>
                            <p className="text-xl font-bold" style={{ color: isLowStock ? '#ef4444' : '#16A34A' }}>
                              {material.stock}
                            </p>
                            <p className="text-xs" style={{ color: '#6B7280' }}>{material.unit}</p>
                          </div>
                          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
                            <p className="text-xs mb-1 font-medium" style={{ color: '#6B7280' }}>Stock Mínimo</p>
                            <p className="text-xl font-bold" style={{ color: '#B8860B' }}>
                              {material.minStock}
                            </p>
                            <p className="text-xs" style={{ color: '#6B7280' }}>{material.unit}</p>
                          </div>
                        </div>
                        
                        {/* Barra de progreso */}
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium" style={{ color: '#6B7280' }}>Nivel de Stock</span>
                            <span className="text-xs font-bold" style={{ color: isLowStock ? '#ef4444' : '#10B981' }}>
                              {Math.round((material.stock / material.minStock) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="h-2 rounded-full"
                              style={{ 
                                backgroundColor: isLowStock ? '#ef4444' : '#10B981'
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((material.stock / material.minStock) * 100, 100)}%` }}
                              transition={{ delay: 0.5 + (0.1 * index), duration: 0.8 }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Información del proveedor */}
                      <div className="space-y-2 mb-4 text-sm flex-1">
                        <div className="flex justify-between items-center py-1">
                          <span className="text-gray-500">Proveedor:</span>
                          <span className="font-medium truncate ml-2" style={{ color: '#2D4B39' }}>{material.supplier}</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-gray-500">Costo/unidad:</span>
                          <span className="font-bold" style={{ color: '#B8860B' }}>${material.cost.toLocaleString('es-CO')}</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-gray-500">Última compra:</span>
                          <span className="font-medium" style={{ color: '#2D4B39' }}>{material.lastPurchase}</span>
                        </div>
                      </div>
                      
                      {/* Botones */}
                      <div className="flex gap-2 mt-auto">
                        <button 
                          onClick={() => { setSelectedMaterialInfo(material); setShowMaterialInfoDialog(true); }}
                          className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-gray-200"
                          style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                        >
                          <Eye className="w-4 h-4 mx-auto" style={{ color: '#6B7280' }} />
                        </button>
                        <button 
                          onClick={() => handleEditMaterial(material)}
                          className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-yellow-200"
                          style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}
                        >
                          <Edit className="w-4 h-4 mx-auto" style={{ color: '#B8860B' }} />
                        </button>
                        <button 
                          onClick={() => handleDeleteMaterial(material.id)}
                          className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-red-200"
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        >
                          <Trash2 className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );

  // RENDERIZAR PEDIDOS
  const renderOrders = () => (
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
                    <ShoppingCart className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Pedidos
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {ordersData.length} pedidos registrados
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-xs" style={{ color: '#F59E0B' }}>
                        {ordersData.filter(order => order.status === 'Pendiente').length} pendientes
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
                    placeholder="Buscar pedidos..."
                    value={orderSearchTerm}
                    onChange={(e) => setOrderSearchTerm(e.target.value)}
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PEDIDO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">CLIENTE</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PRODUCTOS</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">TOTAL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ESTADO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
                {(orderSearchTerm ? ordersData.filter(order => 
                  order.customer.name.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
                  order.orderNumber.toLowerCase().includes(orderSearchTerm.toLowerCase())
                ) : ordersData).map((order: any, index: number) => {
                  const statusColors = getStatusColor(order.status);
                  return (
                    <motion.tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                      whileHover={{ 
                        y: -2,
                        boxShadow: '0 4px 12px rgba(45, 75, 57, 0.1)',
                        transition: { duration: 0.2 }
                      }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                          <p className="text-xs font-light" style={{ color: '#B8860B' }}>
                            {order.date}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{order.customer.name}</p>
                          <p className="text-xs font-light" style={{ color: '#B8860B' }}>
                            {order.customer.documentType === 'cedula' ? 'CC' : 'CE'}: {order.customer.documentNumber}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {order.products.reduce((total: number, product: any) => total + product.quantity, 0)} productos
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.products.length} tipo{order.products.length > 1 ? 's' : ''} diferentes
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-lg font-bold" style={{ color: '#B8860B' }}>
                          ${order.total.toLocaleString('es-CO')}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: statusColors.bg,
                            color: statusColors.text
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => { setSelectedOrderInfo(order); setShowOrderInfoDialog(true); }}
                            className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                            title="Ver detalles"
                          >
                            <Info className="w-4 h-4 text-gray-500" />
                          </button>
                          <button 
                            onClick={() => handleViewPaymentProof(order)}
                            className="p-2 rounded-lg transition-colors hover:bg-blue-50"
                            title="Ver comprobante"
                          >
                            <CreditCard className="w-4 h-4" style={{ color: '#3B82F6' }} />
                          </button>
                          <button 
                            onClick={() => handleConfirmOrder(order.id)}
                            className="p-2 rounded-lg transition-colors hover:bg-green-50"
                            title="Confirmar pedido"
                            disabled={order.status === 'Confirmado' || order.status === 'Rechazado'}
                          >
                            <Check className="w-4 h-4" style={{ color: order.status === 'Confirmado' || order.status === 'Rechazado' ? '#9CA3AF' : '#10B981' }} />
                          </button>
                          <button 
                            onClick={() => handleRejectOrder(order.id)}
                            className="p-2 rounded-lg transition-colors hover:bg-red-50"
                            title="Rechazar pedido"
                            disabled={order.status === 'Confirmado' || order.status === 'Rechazado'}
                          >
                            <X className="w-4 h-4" style={{ color: order.status === 'Confirmado' || order.status === 'Rechazado' ? '#9CA3AF' : '#ef4444' }} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </>
  );

  // RENDERIZAR DEVOLUCIONES
  const renderReturns = () => (
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
                    <RotateCcw className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Devoluciones
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {returnsData.length} devoluciones registradas
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-xs" style={{ color: '#F59E0B' }}>
                        {returnsData.filter(ret => ret.status === 'Pendiente').length} pendientes
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
                    placeholder="Buscar devoluciones..."
                    value={returnSearchTerm}
                    onChange={(e) => setReturnSearchTerm(e.target.value)}
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
                  onClick={() => alert('Funcionalidad de agregar devolución próximamente')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                    color: '#ffffff',
                    boxShadow: '0 4px 12px rgba(45, 75, 57, 0.3)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="w-3 h-3" />
                  Agregar
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
          {(returnSearchTerm ? returnsData.filter(ret => 
            ret.customer.name.toLowerCase().includes(returnSearchTerm.toLowerCase()) ||
            ret.returnNumber.toLowerCase().includes(returnSearchTerm.toLowerCase())
          ) : returnsData).map((returnItem: any, index: number) => {
            const statusColors = getReturnStatusColor(returnItem.status);
            const isExpired = returnItem.daysLeft <= 0;
            
            return (
              <motion.div
                key={returnItem.id}
                className="relative overflow-hidden rounded-2xl group"
                style={{
                  background: isExpired ? '#FEF2F2' : '#ffffff',
                  border: isExpired ? '2px solid #FCA5A5' : '1px solid rgba(224, 209, 192, 0.2)',
                  boxShadow: isExpired ? '0 4px 12px rgba(239, 68, 68, 0.2)' : '0 2px 8px rgba(45, 75, 57, 0.04)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: isExpired ? '0 8px 24px rgba(239, 68, 68, 0.3)' : '0 8px 24px rgba(45, 75, 57, 0.12)',
                  transition: { duration: 0.2 }
                }}
              >
                {/* Header con número y estado */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1" style={{ color: '#2D4B39' }}>{returnItem.returnNumber}</h3>
                      <p className="text-sm" style={{ color: '#6B7280' }}>Pedido: {returnItem.originalOrder}</p>
                      <p className="text-xs" style={{ color: '#B8860B' }}>{returnItem.requestDate}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: statusColors.bg,
                          color: statusColors.text
                        }}
                      >
                        {returnItem.status}
                      </span>
                      {isExpired ? (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full font-medium animate-pulse">
                          Vencido
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                          {returnItem.daysLeft} días restantes
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contenido principal */}
                <div className="p-6">
                  {/* Cliente */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(45, 75, 57, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" style={{ color: '#2D4B39' }} />
                      <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Cliente</span>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#2D4B39' }}>{returnItem.customer.name}</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>
                      {returnItem.customer.documentType === 'cedula' ? 'CC' : 'CE'}: {returnItem.customer.documentNumber}
                    </p>
                  </div>
                  
                  {/* Productos */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(184, 134, 11, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-4 h-4" style={{ color: '#B8860B' }} />
                      <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Productos</span>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#2D4B39' }}>
                      {returnItem.products.reduce((total: number, product: any) => total + product.quantity, 0)} productos a devolver
                    </p>
                    <p className="text-lg font-bold" style={{ color: '#B8860B' }}>
                      ${returnItem.totalRefund.toLocaleString('es-CO')}
                    </p>
                  </div>
                  
                  {/* Motivo */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-4 h-4" style={{ color: '#F59E0B' }} />
                      <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Motivo</span>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#F59E0B' }}>{returnItem.reason.category}</p>
                    <p className="text-xs line-clamp-2" style={{ color: '#6B7280' }}>
                      {returnItem.reason.description}
                    </p>
                  </div>
                  
                  {/* Botones de acción */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setSelectedReturnInfo(returnItem); setShowReturnInfoDialog(true); }}
                      className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-gray-200"
                      style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                      title="Ver detalles"
                    >
                      <Info className="w-4 h-4 mx-auto" style={{ color: '#6B7280' }} />
                    </button>
                    <button 
                      onClick={() => handleViewReturnEvidence(returnItem)}
                      className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-blue-200"
                      style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                      title="Ver evidencia"
                    >
                      <FileImage className="w-4 h-4 mx-auto" style={{ color: '#3B82F6' }} />
                    </button>
                    {returnItem.status === 'Pendiente' && (
                      <>
                        <button 
                          onClick={() => handleApproveReturn(returnItem.id)}
                          className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-green-200"
                          style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                          title="Aprobar devolución"
                        >
                          <Check className="w-4 h-4 mx-auto" style={{ color: '#10B981' }} />
                        </button>
                        <button 
                          onClick={() => handleRejectReturn(returnItem.id)}
                          className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-red-200"
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                          title="Rechazar devolución"
                        >
                          <X className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                        </button>
                      </>
                    )}
                    {returnItem.status === 'Aprobada' && (
                      <button 
                        onClick={() => handleProcessRefund(returnItem.id)}
                        className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-green-200"
                        style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
                        title="Procesar reembolso"
                      >
                        <DollarSign className="w-4 h-4 mx-auto" style={{ color: '#10B981' }} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );

  // RENDERIZAR SERVICIOS
  const renderServices = () => (
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
                    <Wrench className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Servicios
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {servicesData.length} servicios disponibles
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {servicesData.filter(service => service.status === 'active').length} activos
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
                    placeholder="Buscar servicios..."
                    value={serviceSearchTerm}
                    onChange={(e) => setServiceSearchTerm(e.target.value)}
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
                  onClick={handleAddService}
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
                  Nuevo Servicio
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {(serviceSearchTerm ? servicesData.filter(service => 
            service.title.toLowerCase().includes(serviceSearchTerm.toLowerCase()) ||
            service.description.toLowerCase().includes(serviceSearchTerm.toLowerCase())
          ) : servicesData).map((service: any, index: number) => (
            <motion.div
              key={service.id}
              className="relative overflow-hidden rounded-2xl p-8 group"
              style={{
                background: '#ffffff',
                border: '1px solid rgba(224, 209, 192, 0.2)',
                boxShadow: '0 2px 8px rgba(45, 75, 57, 0.04)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                boxShadow: '0 8px 24px rgba(45, 75, 57, 0.12)',
                transition: { duration: 0.2 }
              }}
            >
              <div className="relative z-10">
                <motion.div 
                  className="rounded-[1.5rem] flex items-center justify-center mb-6 shadow-lg"
                  style={{ 
                    backgroundColor: service.color,
                    width: '80px',
                    height: '80px'
                  }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Wrench className="w-10 h-10 text-white" />
                </motion.div>

                <h3 
                  className="font-elegant text-2xl tracking-wide mb-4" 
                  style={{ color: '#2D4B39' }}
                >
                  {service.title}
                </h3>

                <p className="leading-relaxed mb-6" style={{ color: 'rgba(45, 75, 57, 0.7)' }}>
                  {service.description}
                </p>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature: string, i: number) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                        style={{ backgroundColor: service.color }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span style={{ color: 'rgba(45, 75, 57, 0.8)' }}>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="flex gap-2">
                  <button 
                    onClick={() => { setSelectedServiceInfo(service); setShowServiceInfoDialog(true); }}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-gray-200"
                    style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)' }}
                  >
                    <Eye className="w-4 h-4 mx-auto" style={{ color: '#6B7280' }} />
                  </button>
                  <button 
                    onClick={() => handleEditService(service)}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-yellow-200"
                    style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}
                  >
                    <Edit className="w-4 h-4 mx-auto" style={{ color: '#B8860B' }} />
                  </button>
                  <button 
                    onClick={() => handleDeleteService(service.id)}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-red-200"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  >
                    <Trash2 className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );

  // RENDERIZAR TALLERES
  const renderWorkshops = () => {
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
                      {workshops.length} talleres programados
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {workshops.filter(w => w.status === 'Programado').length} activos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => {
                    const newWorkshop = {
                      id: workshops.length + 1,
                      name: 'Nuevo Taller',
                      instructor: 'Por asignar',
                      date: new Date().toISOString().split('T')[0],
                      time: '10:00 AM',
                      duration: '4 horas',
                      students: 0,
                      maxCapacity: 10,
                      price: 80000,
                      revenue: 0,
                      status: 'Programado',
                      enrolledUsers: []
                    };
                    addWorkshop(newWorkshop);
                  }}
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
                  Nuevo Taller
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
          {workshops.map((workshop: any, index: number) => {
            const isCompleto = workshop.students >= workshop.maxCapacity;
            const progressPercentage = (workshop.students / workshop.maxCapacity) * 100;
            
            return (
              <motion.div
                key={workshop.id}
                className="bg-white rounded-2xl p-6 shadow-lg group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: '0 8px 24px rgba(45, 75, 57, 0.12)',
                  transition: { duration: 0.2 }
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-2" style={{ color: '#2D4B39' }}>
                      {workshop.name}
                    </h4>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1" style={{ color: '#B8860B' }}>
                        <Calendar className="w-4 h-4" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-1" style={{ color: '#B8860B' }}>
                        <Clock className="w-4 h-4" />
                        <span>{workshop.time}</span>
                      </div>
                    </div>
                  </div>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: workshop.status === 'Completo' ? '#FEE2E2' : workshop.status === 'Programado' ? '#D1FAE5' : '#FEF3C7',
                      color: workshop.status === 'Completo' ? '#991B1B' : workshop.status === 'Programado' ? '#065F46' : '#92400E'
                    }}
                  >
                    {workshop.status}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(45, 75, 57, 0.05)' }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2D4B39' }}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: '#6B7280' }}>Instructor</p>
                    <p className="text-sm font-semibold" style={{ color: '#2D4B39' }}>{workshop.instructor}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: '#2D4B39' }}>Cupos</span>
                    <span className="text-sm font-bold" style={{ color: isCompleto ? '#ef4444' : '#10B981' }}>
                      {workshop.students}/{workshop.maxCapacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        backgroundColor: isCompleto ? '#ef4444' : '#10B981',
                        width: `${progressPercentage}%`
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}>
                    <p className="text-xs font-medium mb-1" style={{ color: '#92400E' }}>PRECIO</p>
                    <p className="text-sm font-bold" style={{ color: '#B8860B' }}>
                      ${workshop.price.toLocaleString('es-CO')}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(45, 75, 57, 0.1)' }}>
                    <p className="text-xs font-medium mb-1" style={{ color: '#1F3A2E' }}>DURACIÓN</p>
                    <p className="text-sm font-bold" style={{ color: '#2D4B39' }}>
                      {workshop.duration}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => {
                      const enrolledList = workshop.enrolledUsers && workshop.enrolledUsers.length > 0 
                        ? workshop.enrolledUsers.map((e: any) => `- ${e.name} (${e.email}) - ${e.phone}`).join('\n')
                        : 'No hay personas inscritas';
                      alert(`Detalles del taller:\n\nNombre: ${workshop.name}\nFecha: ${workshop.date}\nHora: ${workshop.time}\nInstructor: ${workshop.instructor}\nEstudiantes: ${workshop.students}/${workshop.maxCapacity}\nPrecio: $${workshop.price.toLocaleString('es-CO')}\nDuración: ${workshop.duration}\nIngresos: $${workshop.revenue.toLocaleString('es-CO')}\n\nPersonas inscritas:\n${enrolledList}`);
                    }}
                    className="py-2 px-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-1 text-xs font-medium"
                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#1D4ED8' }}
                  >
                    <Info className="w-3 h-3" />
                    <span className="hidden sm:inline">Info</span>
                  </button>
                  <button 
                    onClick={() => {
                      const newName = prompt('Nuevo nombre del taller:', workshop.name);
                      if (newName) {
                        const updatedWorkshop = { ...workshop, name: newName };
                        updateWorkshop(workshop.id, updatedWorkshop);
                      }
                    }}
                    className="py-2 px-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-1 text-xs font-medium"
                    style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)', color: '#92400E' }}
                  >
                    <Edit className="w-3 h-3" />
                    <span className="hidden sm:inline">Editar</span>
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm(`¿Eliminar el taller "${workshop.name}"?`)) {
                        deleteWorkshop(workshop.id);
                      }
                    }}
                    className="py-2 px-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-1 text-xs font-medium"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#DC2626' }}
                  >
                    <Trash2 className="w-3 h-3" />
                    <span className="hidden sm:inline">Eliminar</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    );
  };

          {/* Calendario y Información */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Calendario */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>Calendario</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateMonth(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" style={{ color: '#2D4B39' }} />
                  </button>
                  <span className="text-sm font-semibold px-3" style={{ color: '#2D4B39' }}>
                    {monthNames[month]} {year}
                  </span>
                  <button
                    onClick={() => navigateMonth(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" style={{ color: '#2D4B39' }} />
                  </button>
                </div>
              </div>
              
              {/* Días de la semana en fila horizontal */}
              <div className="flex justify-between mb-3 pb-2" style={{ borderBottom: '1px solid rgba(45, 75, 57, 0.1)' }}>
                {dayNames.map(day => (
                  <div key={day} className="text-xs font-semibold w-8 text-center" style={{ color: '#6B7280' }}>
                    {day.substring(0, 2).toUpperCase()}
                  </div>
                ))}
              </div>
              
              {/* Números en grid de filas y columnas */}
              <div className="space-y-1">
                {Array.from({ length: Math.ceil((firstDay + daysInMonth) / 7) }, (_, weekIndex) => (
                  <div key={weekIndex} className="flex justify-between">
                    {Array.from({ length: 7 }, (_, dayIndex) => {
                      const dayNumber = weekIndex * 7 + dayIndex - firstDay + 1;
                      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
                      
                      if (!isValidDay) {
                        return <div key={dayIndex} className="w-8 h-8"></div>;
                      }
                      
                      const dayWorkshops = getWorkshopsForDay(dayNumber);
                      const hasWorkshop = dayWorkshops.length > 0;
                      const isToday = new Date().getDate() === dayNumber && new Date().getMonth() === month && new Date().getFullYear() === year;
                      
                      return (
                        <button
                          key={dayIndex}
                          className="w-8 h-8 flex items-center justify-center text-sm rounded-lg transition-all duration-200 hover:bg-gray-50"
                          style={{
                            backgroundColor: hasWorkshop ? '#B8860B' : isToday ? '#2D4B39' : 'transparent',
                            color: hasWorkshop || isToday ? '#ffffff' : '#374151',
                            fontWeight: hasWorkshop || isToday ? '600' : '400'
                          }}
                          onClick={() => {
                            if (hasWorkshop) {
                              setSelectedWorkshop(dayWorkshops[0]);
                            }
                          }}
                        >
                          {dayNumber}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-4 text-xs mt-4 pt-3" style={{ borderTop: '1px solid rgba(45, 75, 57, 0.1)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#B8860B' }}></div>
                  <span style={{ color: '#6B7280' }}>Con talleres</span>
                </div>
              </div>
            </div>

            {/* Información del Taller */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <Info className="w-5 h-5" style={{ color: '#B8860B' }} />
                <h3 className="text-lg font-semibold" style={{ color: '#2D4B39' }}>Información del Taller</h3>
              </div>
              
              {selectedWorkshop ? (
                <div className="space-y-6">
                  {/* Título y Badges */}
                  <div className="text-center">
                    <h4 className="text-2xl font-bold mb-3" style={{ color: '#2D4B39' }}>{selectedWorkshop.name}</h4>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{
                          backgroundColor: selectedWorkshop.status === 'Completo' ? '#FEE2E2' : '#D1FAE5',
                          color: selectedWorkshop.status === 'Completo' ? '#991B1B' : '#065F46'
                        }}
                      >
                        {selectedWorkshop.status}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                      >
                        ${selectedWorkshop.price.toLocaleString('es-CO')}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{ backgroundColor: '#DBEAFE', color: '#1E40AF' }}
                      >
                        {selectedWorkshop.students}/{selectedWorkshop.maxCapacity} cupos
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{ backgroundColor: '#F0FDF4', color: '#166534' }}
                      >
                        {selectedWorkshop.duration}
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: '#EDE9FE', color: '#5B21B6' }}
                      >
                        📅 {selectedWorkshop.date}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: '#FDF2F8', color: '#BE185D' }}
                      >
                        🕐 {selectedWorkshop.time}
                      </span>
                      <span 
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: '#F0F9FF', color: '#0369A1' }}
                      >
                        👨‍🏫 {selectedWorkshop.instructor}
                      </span>
                    </div>
                  </div>
                  
                  {/* Progreso Visual */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium" style={{ color: '#2D4B39' }}>Progreso de Inscripciones</span>
                      <span className="text-sm font-bold" style={{ color: '#10B981' }}>
                        {Math.round((selectedWorkshop.students / selectedWorkshop.maxCapacity) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full transition-all duration-500" 
                        style={{ 
                          backgroundColor: '#10B981',
                          width: `${(selectedWorkshop.students / selectedWorkshop.maxCapacity) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Lista de Inscritos con Badge */}
                  {selectedWorkshop.enrolledUsers && selectedWorkshop.enrolledUsers.length > 0 && (
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span 
                          className="px-4 py-2 rounded-full text-sm font-semibold"
                          style={{ backgroundColor: '#3B82F6', color: '#ffffff' }}
                        >
                          👥 {selectedWorkshop.enrolledUsers.length} Inscritos
                        </span>
                      </div>
                      <div className="text-center text-sm" style={{ color: '#6B7280' }}>
                        {selectedWorkshop.enrolledUsers.map((e: any, i: number) => (
                          <span key={i} className="inline-block mx-1">
                            {e.name}{i < selectedWorkshop.enrolledUsers.length - 1 ? ',' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Botones de Acción */}
                  <div className="grid grid-cols-3 gap-4">
                    <button 
                      onClick={() => {
                        const enrolledList = selectedWorkshop.enrolledUsers && selectedWorkshop.enrolledUsers.length > 0 
                          ? selectedWorkshop.enrolledUsers.map((e: any) => `- ${e.name} (${e.email}) - ${e.phone}`).join('\n')
                          : 'No hay personas inscritas';
                        alert(`Detalles del taller:\n\nNombre: ${selectedWorkshop.name}\nFecha: ${selectedWorkshop.date}\nHora: ${selectedWorkshop.time}\nInstructor: ${selectedWorkshop.instructor}\nEstudiantes: ${selectedWorkshop.students}/${selectedWorkshop.maxCapacity}\nPrecio: $${selectedWorkshop.price.toLocaleString('es-CO')}\nDuración: ${selectedWorkshop.duration}\nIngresos: $${selectedWorkshop.revenue.toLocaleString('es-CO')}\n\nPersonas inscritas:\n${enrolledList}`);
                      }}
                      className="py-4 px-4 rounded-xl text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg flex flex-col items-center gap-2"
                      style={{ backgroundColor: '#3B82F6', color: '#ffffff' }}
                    >
                      <Eye className="w-5 h-5" />
                      Ver Detalles
                    </button>
                    <button 
                      onClick={() => {
                        const newName = prompt('Nuevo nombre del taller:', selectedWorkshop.name);
                        if (newName) {
                          const updatedWorkshop = { ...selectedWorkshop, name: newName };
                          updateWorkshop(selectedWorkshop.id, updatedWorkshop);
                          setSelectedWorkshop(updatedWorkshop);
                        }
                      }}
                      className="py-4 px-4 rounded-xl text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg flex flex-col items-center gap-2"
                      style={{ backgroundColor: '#F97316', color: '#ffffff' }}
                    >
                      <Edit className="w-5 h-5" />
                      Editar Taller
                    </button>
                    <button 
                      onClick={() => {
                        const newWorkshop = {
                          id: workshops.length + 1,
                          name: 'Nuevo Taller',
                          instructor: 'Por asignar',
                          date: new Date().toISOString().split('T')[0],
                          time: '10:00 AM',
                          duration: '4 horas',
                          students: 0,
                          maxCapacity: 10,
                          price: 80000,
                          revenue: 0,
                          status: 'Programado',
                          enrolledUsers: []
                        };
                        addWorkshop(newWorkshop);
                      }}
                      className="py-4 px-4 rounded-xl text-sm font-semibold transition-all hover:scale-105 hover:shadow-lg flex flex-col items-center gap-2"
                      style={{ backgroundColor: '#10B981', color: '#ffffff' }}
                    >
                      <Plus className="w-5 h-5" />
                      Crear Nuevo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold mb-2" style={{ color: '#2D4B39' }}>Selecciona un Taller</h4>
                    <p className="text-sm text-gray-500 mb-1">Haz clic en un día resaltado del calendario</p>
                    <p className="text-xs text-gray-400">Los días con talleres aparecen en color dorado</p>
                  </div>
                  
                  {/* Botón Crear cuando no hay taller seleccionado */}
                  <div className="text-center">
                    <button 
                      onClick={() => {
                        const newWorkshop = {
                          id: workshops.length + 1,
                          name: 'Nuevo Taller',
                          instructor: 'Por asignar',
                          date: new Date().toISOString().split('T')[0],
                          time: '10:00 AM',
                          duration: '4 horas',
                          students: 0,
                          maxCapacity: 10,
                          price: 80000,
                          revenue: 0,
                          status: 'Programado',
                          enrolledUsers: []
                        };
                        addWorkshop(newWorkshop);
                      }}
                      className="py-4 px-8 rounded-xl text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg flex items-center gap-3 mx-auto"
                      style={{ backgroundColor: '#10B981', color: '#ffffff' }}
                    >
                      <Plus className="w-6 h-6" />
                      Crear Nuevo Taller
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lista de Todos los Talleres */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3" style={{ color: '#2D4B39' }}>
              <Calendar className="w-6 h-6" style={{ color: '#B8860B' }} />
              Todos los Talleres
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workshops.map((workshop: any, index: number) => {
                const isCompleto = workshop.students >= workshop.maxCapacity;
                const progressPercentage = (workshop.students / workshop.maxCapacity) * 100;
                
                return (
                  <motion.div
                    key={workshop.id}
                    className="bg-white rounded-2xl p-6 shadow-lg group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ 
                      y: -4,
                      boxShadow: '0 8px 24px rgba(45, 75, 57, 0.12)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    {/* Header del Taller */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-bold mb-2" style={{ color: '#2D4B39' }}>
                          {workshop.name}
                        </h4>
                        <div className="flex items-center gap-4 text-sm mb-3">
                          <div className="flex items-center gap-1" style={{ color: '#B8860B' }}>
                            <Calendar className="w-4 h-4" />
                            <span>{workshop.date}</span>
                          </div>
                          <div className="flex items-center gap-1" style={{ color: '#B8860B' }}>
                            <Clock className="w-4 h-4" />
                            <span>{workshop.time}</span>
                          </div>
                        </div>
                      </div>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: workshop.status === 'Completo' ? '#FEE2E2' : workshop.status === 'Programado' ? '#D1FAE5' : '#FEF3C7',
                          color: workshop.status === 'Completo' ? '#991B1B' : workshop.status === 'Programado' ? '#065F46' : '#92400E'
                        }}
                      >
                        {workshop.status}
                      </span>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-3 mb-4 p-3 rounded-lg" style={{ backgroundColor: 'rgba(45, 75, 57, 0.05)' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2D4B39' }}>
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-medium" style={{ color: '#6B7280' }}>Instructor</p>
                        <p className="text-sm font-semibold" style={{ color: '#2D4B39' }}>{workshop.instructor}</p>
                      </div>
                    </div>

                    {/* Cupos */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium" style={{ color: '#2D4B39' }}>Cupos</span>
                        <span className="text-sm font-bold" style={{ color: isCompleto ? '#ef4444' : '#10B981' }}>
                          {workshop.students}/{workshop.maxCapacity}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{ 
                            backgroundColor: isCompleto ? '#ef4444' : '#10B981',
                            width: `${progressPercentage}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Precio y Duración */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)' }}>
                        <p className="text-xs font-medium mb-1" style={{ color: '#92400E' }}>PRECIO</p>
                        <p className="text-sm font-bold" style={{ color: '#B8860B' }}>
                          ${workshop.price.toLocaleString('es-CO')}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(45, 75, 57, 0.1)' }}>
                        <p className="text-xs font-medium mb-1" style={{ color: '#1F3A2E' }}>DURACIÓN</p>
                        <p className="text-sm font-bold" style={{ color: '#2D4B39' }}>
                          {workshop.duration}
                        </p>
                      </div>
                    </div>

                    {/* Botones de Acción */}
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        onClick={() => setSelectedWorkshop(workshop)}
                        className="py-2 px-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-1 text-xs font-medium"
                        style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#1D4ED8' }}
                      >
                        <Info className="w-3 h-3" />
                        <span className="hidden sm:inline">Info</span>
                      </button>
                      <button 
                        onClick={() => alert(`Editar taller: ${workshop.name}`)}
                        className="py-2 px-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-1 text-xs font-medium"
                        style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)', color: '#92400E' }}
                      >
                        <Edit className="w-3 h-3" />
                        <span className="hidden sm:inline">Editar</span>
                      </button>
                      <button 
                        onClick={() => {
                          if (confirm(`¿Eliminar el taller "${workshop.name}"?`)) {
                            deleteWorkshop(workshop.id);
                          }
                        }}
                        className="py-2 px-3 rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-1 text-xs font-medium"
                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#DC2626' }}
                      >
                        <Trash2 className="w-3 h-3" />
                        <span className="hidden sm:inline">Eliminar</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </>
    );
  };

  // RENDERIZAR BLOG
  const renderBlog = () => (
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
                    <BookOpen className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión del Blog
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {blogPosts.length} artículos totales
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {blogPosts.filter(post => post.status === 'published').length} publicados
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
                    placeholder="Buscar artículos..."
                    value={blogSearchTerm}
                    onChange={(e) => setBlogSearchTerm(e.target.value)}
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
                  onClick={() => {
                    setIsNewPost(true);
                    setEditingPost({
                      id: blogPosts.length + 1,
                      title: '',
                      excerpt: '',
                      content: '',
                      image: '/api/placeholder/400/250',
                      author: currentUser?.name || 'Admin',
                      date: new Date().toISOString().split('T')[0],
                      category: 'General',
                      tags: [],
                      status: 'draft'
                    });
                    setShowPostDialog(true);
                  }}
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
                  Nuevo Artículo
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
          {(blogSearchTerm ? blogPosts.filter(post => 
            post.title.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(blogSearchTerm.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(blogSearchTerm.toLowerCase()))
          ) : blogPosts).map((post: any, index: number) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="relative overflow-hidden">
                <div 
                  className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                >
                  <Image className="w-16 h-16" style={{ color: '#2D4B39' }} />
                </div>
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      backgroundColor: post.status === 'published' ? '#D1FAE5' : '#FEF3C7',
                      color: post.status === 'published' ? '#065F46' : '#92400E'
                    }}
                  >
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: '#B8860B', color: '#ffffff' }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs" style={{ color: '#6B7280' }}>{post.date}</span>
                </div>
                
                <h3 className="text-lg font-bold mb-3 line-clamp-2" style={{ color: '#2D4B39' }}>
                  {post.title}
                </h3>
                
                <p className="text-sm mb-4 line-clamp-3" style={{ color: '#6B7280' }}>
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" style={{ color: '#B8860B' }} />
                    <span className="text-sm font-medium" style={{ color: '#2D4B39' }}>{post.author}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedPost(post);
                      alert(`Artículo: ${post.title}\n\nAutor: ${post.author}\nFecha: ${post.date}\nCategoría: ${post.category}\nEstado: ${post.status}\n\nContenido: ${post.content.substring(0, 200)}...`);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg transition-colors hover:bg-gray-200 text-xs font-medium"
                    style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)', color: '#6B7280' }}
                  >
                    <Eye className="w-4 h-4 mx-auto" />
                  </button>
                  <button 
                    onClick={() => {
                      setIsNewPost(false);
                      setEditingPost({...post});
                      setShowPostDialog(true);
                    }}
                    className="flex-1 py-2 px-3 rounded-lg transition-colors hover:bg-yellow-200 text-xs font-medium"
                    style={{ backgroundColor: 'rgba(184, 134, 11, 0.1)', color: '#B8860B' }}
                  >
                    <Edit className="w-4 h-4 mx-auto" />
                  </button>
                  <button 
                    onClick={() => {
                      if (confirm(`¿Eliminar el artículo "${post.title}"?`)) {
                        deleteBlogPost(post.id);
                      }
                    }}
                    className="flex-1 py-2 px-3 rounded-lg transition-colors hover:bg-red-200 text-xs font-medium"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}
                  >
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Dialog para crear/editar artículo */}
      {showPostDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: '#2D4B39' }}>
                {isNewPost ? 'Nuevo Artículo' : 'Editar Artículo'}
              </h3>
              <button 
                onClick={() => setShowPostDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Título</label>
                <input
                  type="text"
                  value={editingPost?.title || ''}
                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Título del artículo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Extracto</label>
                <textarea
                  value={editingPost?.excerpt || ''}
                  onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                  className="w-full p-3 border rounded-lg h-20"
                  placeholder="Breve descripción del artículo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Contenido</label>
                <textarea
                  value={editingPost?.content || ''}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  className="w-full p-3 border rounded-lg h-32"
                  placeholder="Contenido completo del artículo"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Categoría</label>
                  <select
                    value={editingPost?.category || ''}
                    onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="General">General</option>
                    <option value="Tutoriales">Tutoriales</option>
                    <option value="Historia">Historia</option>
                    <option value="Tendencias">Tendencias</option>
                    <option value="Materiales">Materiales</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#2D4B39' }}>Estado</label>
                  <select
                    value={editingPost?.status || ''}
                    onChange={(e) => setEditingPost({...editingPost, status: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowPostDialog(false)}
                className="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
                style={{ backgroundColor: '#f3f4f6', color: '#374151' }}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (isNewPost) {
                    addBlogPost(editingPost);
                  } else {
                    updateBlogPost(editingPost.id, editingPost);
                  }
                  setShowPostDialog(false);
                  setEditingPost(null);
                }}
                className="flex-1 py-3 px-4 rounded-lg font-medium transition-colors"
                style={{ backgroundColor: '#2D4B39', color: '#ffffff' }}
              >
                {isNewPost ? 'Crear Artículo' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // RENDERIZAR COTIZACIONES
  const renderQuotes = () => (
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
                    <FileText className="w-7 h-7" style={{ color: '#ffffff' }} />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20" />
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
                    Gestión de Cotizaciones
                  </h1>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
                      {quotesData.length} cotizaciones registradas
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <span className="text-xs" style={{ color: '#F59E0B' }}>
                        {quotesData.filter(quote => quote.status === 'Pendiente').length} pendientes
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
                    placeholder="Buscar cotizaciones..."
                    value={quoteSearchTerm}
                    onChange={(e) => setQuoteSearchTerm(e.target.value)}
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
                  onClick={handleAddQuote}
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
                  Nueva Cotización
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
          {(quoteSearchTerm ? quotesData.filter(quote => 
            quote.customer.name.toLowerCase().includes(quoteSearchTerm.toLowerCase()) ||
            quote.quoteNumber.toLowerCase().includes(quoteSearchTerm.toLowerCase()) ||
            quote.project.service.toLowerCase().includes(quoteSearchTerm.toLowerCase())
          ) : quotesData).map((quote: any, index: number) => {
            const statusColors = getQuoteStatusColor(quote.status);
            const isExpired = quote.daysLeft <= 0;
            const isUrgent = quote.daysLeft <= 3 && quote.daysLeft > 0;
            
            return (
              <motion.div
                key={quote.id}
                className="relative overflow-hidden rounded-2xl group"
                style={{
                  background: isExpired ? '#FEF2F2' : isUrgent ? '#FFFBEB' : '#ffffff',
                  border: isExpired ? '2px solid #FCA5A5' : isUrgent ? '2px solid #FCD34D' : '1px solid rgba(224, 209, 192, 0.2)',
                  boxShadow: isExpired ? '0 4px 12px rgba(239, 68, 68, 0.2)' : isUrgent ? '0 4px 12px rgba(245, 158, 11, 0.2)' : '0 2px 8px rgba(45, 75, 57, 0.04)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: isExpired ? '0 8px 24px rgba(239, 68, 68, 0.3)' : isUrgent ? '0 8px 24px rgba(245, 158, 11, 0.3)' : '0 8px 24px rgba(45, 75, 57, 0.12)',
                  transition: { duration: 0.2 }
                }}
              >
                {/* Header con estado y tiempo */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: '#2D4B39' }}>{quote.quoteNumber}</h3>
                      <p className="text-sm font-medium" style={{ color: '#B8860B' }}>{quote.project.service}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium inline-block"
                        style={{
                          backgroundColor: statusColors.bg,
                          color: statusColors.text
                        }}
                      >
                        {quote.status}
                      </span>
                      <div className="text-xs" style={{ color: '#6B7280' }}>
                        {isExpired ? (
                          <span className="text-red-600 font-medium animate-pulse block">Vencida</span>
                        ) : isUrgent ? (
                          <span className="text-yellow-600 font-medium animate-pulse block">Urgente - {quote.daysLeft}d</span>
                        ) : (
                          <span className="block">{quote.daysLeft} días restantes</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Cliente y contacto */}
                  <div className="flex items-start gap-4 mb-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(45, 75, 57, 0.05)' }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2D4B39' }}>
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-lg mb-2" style={{ color: '#2D4B39' }}>{quote.customer.name}</p>
                      <p className="text-sm mb-3" style={{ color: '#6B7280' }}>{quote.customer.email}</p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1" style={{ color: '#B8860B' }}>
                          <Calendar className="w-4 h-4" />
                          <span>{quote.requestDate}</span>
                        </div>
                        <div className="flex items-center gap-1" style={{ color: '#B8860B' }}>
                          <Phone className="w-4 h-4" />
                          <span>{quote.customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Descripción del proyecto */}
                <div className="px-6 pb-6">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(184, 134, 11, 0.05)' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4" style={{ color: '#B8860B' }} />
                      <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Descripción del Proyecto</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
                      {quote.project.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-medium" style={{ color: '#6B7280' }}>Presupuesto:</span>
                        <p className="font-semibold" style={{ color: '#B8860B' }}>{quote.project.budget}</p>
                      </div>
                      <div>
                        <span className="font-medium" style={{ color: '#6B7280' }}>Timeline:</span>
                        <p className="font-semibold" style={{ color: '#B8860B' }}>{quote.project.timeline}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Cotización y precio */}
                {quote.quote.price > 0 && (
                  <div className="px-6 pb-6">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" style={{ color: '#10B981' }} />
                          <span className="text-sm font-semibold" style={{ color: '#2D4B39' }}>Cotización</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: '#10B981' }}>
                          ${quote.quote.price.toLocaleString('es-CO')}
                        </p>
                      </div>
                      {quote.quote.notes && (
                        <p className="text-xs" style={{ color: '#6B7280' }}>
                          {quote.quote.notes}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Botones de acción */}
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <button 
                      onClick={() => { setSelectedQuoteInfo(quote); setShowQuoteInfoDialog(true); }}
                      className="py-3 px-2 rounded-xl transition-all hover:scale-105 hover:shadow-md flex items-center justify-center gap-1 font-medium"
                      style={{ backgroundColor: 'rgba(107, 114, 128, 0.15)', color: '#374151' }}
                    >
                      <Info className="w-4 h-4" />
                      <span className="text-xs">Ver</span>
                    </button>
                    <button 
                      onClick={() => handleEditQuote(quote)}
                      className="py-3 px-2 rounded-xl transition-all hover:scale-105 hover:shadow-md flex items-center justify-center gap-1 font-medium"
                      style={{ backgroundColor: 'rgba(184, 134, 11, 0.15)', color: '#92400E' }}
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-xs">Editar</span>
                    </button>
                    <button 
                      onClick={() => generateQuotePDF(quote)}
                      className="py-3 px-2 rounded-xl transition-all hover:scale-105 hover:shadow-md flex items-center justify-center gap-1 font-medium"
                      style={{ backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#1D4ED8' }}
                    >
                      <FileDown className="w-4 h-4" />
                      <span className="text-xs">PDF</span>
                    </button>
                  </div>
                  {quote.status === 'Pendiente' && (
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => handleApproveQuote(quote.id)}
                        className="py-3 px-4 rounded-xl transition-all hover:scale-105 hover:shadow-md flex items-center justify-center gap-2 font-medium"
                        style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#047857' }}
                      >
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Aprobar</span>
                      </button>
                      <button 
                        onClick={() => handleRejectQuote(quote.id)}
                        className="py-3 px-4 rounded-xl transition-all hover:scale-105 hover:shadow-md flex items-center justify-center gap-2 font-medium"
                        style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#DC2626' }}
                      >
                        <X className="w-4 h-4" />
                        <span className="text-sm">Rechazar</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <AdminNavbar 
        user={user}
        onLogout={onLogout}
        onRefresh={handleRefresh}
      />
      <AdminSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
        collapsed={sidebarCollapsed} 
        onToggleCollapse={setSidebarCollapsed} 
      />
      
      <div className="pt-8 pb-20 px-4" style={{ marginLeft: sidebarCollapsed ? '80px' : '280px' }}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeSection === 'dashboard' && <div key="dashboard">{renderDashboard()}</div>}
            {activeSection === 'users' && (isAdmin || userPermissions.canManageUsers) ? <div key="users">{renderUsers()}</div> : activeSection === 'users' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Esta sección no está permitida para empleados</p></div>}
            {activeSection === 'employees' && (isAdmin || userPermissions.canManageEmployees) ? <div key="employees">{renderEmployees()}</div> : activeSection === 'employees' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Esta sección no está permitida para empleados</p></div>}
            {activeSection === 'inventory' && (isAdmin || userPermissions.canManageInventory) ? <div key="inventory">{renderInventory()}</div> : activeSection === 'inventory' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Esta sección no está permitida para empleados</p></div>}
            {activeSection === 'orders' && (isAdmin || userPermissions.canManageOrders) ? <div key="orders">{renderOrders()}</div> : activeSection === 'orders' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Esta sección no está permitida para empleados</p></div>}
            {activeSection === 'returns' && (isAdmin || userPermissions.canManageReturns) ? <div key="returns">{renderReturns()}</div> : activeSection === 'returns' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Esta sección no está permitida para empleados</p></div>}
            {activeSection === 'services' && (isAdmin || userPermissions.canManageServices) ? <div key="services">{renderServices()}</div> : activeSection === 'services' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Esta sección no está permitida para empleados</p></div>}
            {activeSection === 'quotes' && (isAdmin || userPermissions.canManageQuotes) ? <div key="quotes">{renderQuotes()}</div> : activeSection === 'quotes' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Esta sección no está permitida para empleados</p></div>}
            {activeSection === 'workshops' && (isAdmin || userPermissions.canManageWorkshops) ? <div key="workshops">{renderWorkshops()}</div> : activeSection === 'workshops' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Esta sección no está permitida para empleados</p></div>}
            {activeSection === 'blog' && (isAdmin || userPermissions.canManageBlog) ? <div key="blog">{renderBlog()}</div> : activeSection === 'blog' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Esta sección no está permitida para empleados</p></div>}
            {activeSection === 'settings' && isAdmin ? <div key="settings"><SettingsPage /></div> : activeSection === 'settings' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Solo administradores pueden acceder a configuración</p></div>}
            {activeSection === 'messages' && (isAdmin || userPermissions.canManageMessages) ? <div key="messages">Mensajes</div> : activeSection === 'messages' && <div key="no-access" className="text-center py-20"><h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Acceso Restringido</h2><p style={{ color: '#6B7280' }}>Esta sección no está permitida para empleados</p></div>}
          </AnimatePresence>
        </div>
      </div>
      
      <UserDialogs
        showUserInfoDialog={showUserInfoDialog}
        selectedUserInfo={selectedUserInfo}
        setShowUserInfoDialog={setShowUserInfoDialog}
        showUserDialog={showUserDialog}
        editingUser={editingUser}
        setShowUserDialog={setShowUserDialog}
        isNewUser={isNewUser}
        setEditingUser={setEditingUser}
        handleSaveUser={handleSaveUser}
        handleEditUser={handleEditUser}
      />

      <EmployeeDialogs
        showEmployeeInfoDialog={showEmployeeInfoDialog}
        selectedEmployeeInfo={selectedEmployeeInfo}
        setShowEmployeeInfoDialog={setShowEmployeeInfoDialog}
        showEmployeeDialog={showEmployeeDialog}
        editingEmployee={editingEmployee}
        setShowEmployeeDialog={setShowEmployeeDialog}
        isNewEmployee={isNewEmployee}
        setEditingEmployee={setEditingEmployee}
        handleSaveEmployee={handleSaveEmployee}
        handleEditEmployee={handleEditEmployee}
      />
      
      <InventoryDialogs
        showMaterialInfoDialog={showMaterialInfoDialog}
        selectedMaterialInfo={selectedMaterialInfo}
        setShowMaterialInfoDialog={setShowMaterialInfoDialog}
        showMaterialDialog={showMaterialDialog}
        editingMaterial={editingMaterial}
        setShowMaterialDialog={setShowMaterialDialog}
        isNewMaterial={isNewMaterial}
        setEditingMaterial={setEditingMaterial}
        handleSaveMaterial={handleSaveMaterial}
        showProductInfoDialog={showProductInfoDialog}
        selectedProductInfo={selectedProductInfo}
        setShowProductInfoDialog={setShowProductInfoDialog}
        showProductDialog={showProductDialog}
        editingProduct={editingProduct}
        setShowProductDialog={setShowProductDialog}
        isNewProduct={isNewProduct}
        setEditingProduct={setEditingProduct}
        handleSaveProduct={handleSaveProduct}
      />
      
      <OrderDialogs
        showOrderInfoDialog={showOrderInfoDialog}
        selectedOrderInfo={selectedOrderInfo}
        setShowOrderInfoDialog={setShowOrderInfoDialog}
        showPaymentProofDialog={showPaymentProofDialog}
        selectedPaymentProof={selectedPaymentProof}
        setShowPaymentProofDialog={setShowPaymentProofDialog}
      />
      
      <ReturnDialogs
        showReturnInfoDialog={showReturnInfoDialog}
        selectedReturnInfo={selectedReturnInfo}
        setShowReturnInfoDialog={setShowReturnInfoDialog}
        showReturnEvidenceDialog={showReturnEvidenceDialog}
        selectedReturnEvidence={selectedReturnEvidence}
        setShowReturnEvidenceDialog={setShowReturnEvidenceDialog}
      />
      
      <ServiceDialogs
        showServiceInfoDialog={showServiceInfoDialog}
        selectedServiceInfo={selectedServiceInfo}
        setShowServiceInfoDialog={setShowServiceInfoDialog}
        showServiceDialog={showServiceDialog}
        editingService={editingService}
        setShowServiceDialog={setShowServiceDialog}
        isNewService={isNewService}
        setEditingService={setEditingService}
        handleSaveService={handleSaveService}
      />
      
      <QuoteDialogs
        showQuoteInfoDialog={showQuoteInfoDialog}
        selectedQuoteInfo={selectedQuoteInfo}
        setShowQuoteInfoDialog={setShowQuoteInfoDialog}
        showQuoteDialog={showQuoteDialog}
        editingQuote={editingQuote}
        setShowQuoteDialog={setShowQuoteDialog}
        isNewQuote={isNewQuote}
        setEditingQuote={setEditingQuote}
        handleSaveQuote={handleSaveQuote}
      />
    </div>
  );
}