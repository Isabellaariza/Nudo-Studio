import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock,
  RefreshCw,
  FileText,
  AlertTriangle,
  Users,
  User,
  Package,
  Calendar,
  ChevronLeft,
  ChevronRight,
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
  Copy,
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
  FileDown
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
import { toast } from 'sonner';
import { useApp } from '../../contexts/AppContext';
import { useIsMobile, useIsTablet } from '../../hooks/useResponsive';
import { UserDialogs } from './AdminPanelDialogs';
import { EmployeeDialogs } from './EmployeeDialogs';
import { InventoryDialogs } from './InventoryDialogs';
import { OrderDialogs } from './OrderDialogs';
import { ReturnDialogs } from './ReturnDialogs';
import { QuoteDialogs } from './QuoteDialogs';
import { WorkshopDialogs } from '../WorkshopDialogs';
import { AdminSuppliers } from './AdminSuppliers';

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
  } = useApp();

  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
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

  const [salesPeriod, setSalesPeriod] = useState<'Diarias' | 'Semanales' | 'Mensuales' | 'Anuales'>('Mensuales');

  const [salesData] = useState([
    { month: 'Ene', sales: 12400 },
    { month: 'Feb', sales: 19800 },
    { month: 'Mar', sales: 15600 },
    { month: 'Abr', sales: 23400 },
    { month: 'May', sales: 28900 },
    { month: 'Jun', sales: 34200 },
  ]);

  const [dailySalesData] = useState([
    { month: 'Lun', sales: 4200 },
    { month: 'Mar', sales: 5100 },
    { month: 'Mié', sales: 3800 },
    { month: 'Jue', sales: 6200 },
    { month: 'Vie', sales: 7100 },
    { month: 'Sáb', sales: 5900 },
  ]);

  const [weeklySalesData] = useState([
    { month: 'Sem 1', sales: 28500 },
    { month: 'Sem 2', sales: 32100 },
    { month: 'Sem 3', sales: 25600 },
    { month: 'Sem 4', sales: 35200 },
    { month: 'Sem 5', sales: 29800 },
    { month: 'Sem 6', sales: 31400 },
  ]);

  const [yearlySalesData] = useState([
    { month: '2018', sales: 145000 },
    { month: '2019', sales: 182000 },
    { month: '2020', sales: 156000 },
    { month: '2021', sales: 234000 },
    { month: '2022', sales: 289000 },
    { month: '2023', sales: 342000 },
  ]);

  const getChartData = () => {
    switch(salesPeriod) {
      case 'Diarias':
        return dailySalesData;
      case 'Semanales':
        return weeklySalesData;
      case 'Anuales':
        return yearlySalesData;
      case 'Mensuales':
      default:
        return salesData;
    }
  };

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
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Isabella Ariza',
      email: 'isabella@artesanias.com',
      phone: '300 123 4567',
      documentType: 'cedula',
      documentNumber: '1234567890',
      position: 'Directora General',
      salary: 3500000,
      schedule: 'Lunes a Viernes 8:00 AM - 6:00 PM',
      address: 'Calle 123 #45-67, Bogotá',
      role: 'Profesor',
      status: true,
      hireDate: '2020-01-15',
      department: 'Administración',
      experience: 8,
      rating: 5,
      birthDate: '1990-05-15',
      contractType: 'Indefinido',
      supervisor: 'N/A',
      emergencyContact: { name: 'María Ariza', phone: '310 987 6543' },
      eps: 'Compensar',
      bankInfo: { bank: 'Bancolombia', accountType: 'Ahorros', accountNumber: '****1234' },
      education: 'Maestría en Administración',
      certifications: ['Certificación en Liderazgo', 'Diplomado en Gestión Empresarial'],
      studyCertificate: 'certificado_isabella.pdf',
      bloodType: 'O+',
      allergies: 'Ninguna',
      socialSecurity: '****5678',
      profilePhoto: 'isabella_profile.jpg'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      email: 'carlos@artesanias.com',
      phone: '301 234 5678',
      documentType: 'cedula',
      documentNumber: '0987654321',
      position: 'Instructor de Macramé',
      salary: 2200000,
      schedule: 'Martes a Sábado 9:00 AM - 5:00 PM',
      address: 'Carrera 45 #12-34, Medellín',
      role: 'Profesor',
      status: true,
      hireDate: '2021-03-10',
      department: 'Talleres',
      experience: 5,
      rating: 4.8,
      birthDate: '1985-11-22',
      contractType: 'Indefinido',
      supervisor: 'Isabella Ariza',
      emergencyContact: { name: 'Sofía Mendoza', phone: '320 456 7890' },
      eps: 'Sura',
      bankInfo: { bank: 'Davivienda', accountType: 'Corriente', accountNumber: '****5678' },
      education: 'Técnico en Artes y Oficios',
      certifications: ['Certificación en Macramé Avanzado', 'Curso de Pedagogía'],
      studyCertificate: 'certificado_carlos.pdf',
      bloodType: 'A+',
      allergies: 'Polen',
      socialSecurity: '****9012',
      profilePhoto: 'carlos_profile.jpg'
    },
    {
      id: 3,
      name: 'Ana García',
      email: 'ana@artesanias.com',
      phone: '302 345 6789',
      documentType: 'cedula',
      documentNumber: '1122334455',
      position: 'Artesana Senior',
      salary: 1800000,
      schedule: 'Lunes a Viernes 7:00 AM - 4:00 PM',
      address: 'Avenida 68 #23-45, Bogotá',
      role: 'Trabajador',
      status: true,
      hireDate: '2019-08-22',
      department: 'Producción',
      experience: 12,
      rating: 4.9,
      birthDate: '1980-03-08',
      contractType: 'Indefinido',
      supervisor: 'Isabella Ariza',
      emergencyContact: { name: 'Luis García', phone: '315 123 4567' },
      eps: 'Sanitas',
      bankInfo: { bank: 'Banco de Bogotá', accountType: 'Ahorros', accountNumber: '****9012' },
      education: 'Bachiller Académico',
      certifications: ['Certificación en Tejería Tradicional', 'Curso de Calidad Artesanal'],
      studyCertificate: 'certificado_ana.pdf',
      bloodType: 'B-',
      allergies: 'Mariscos',
      socialSecurity: '****3456',
      profilePhoto: 'ana_profile.jpg'
    }
  ]);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [showEmployeeDialog, setShowEmployeeDialog] = useState(false);
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [selectedEmployeeInfo, setSelectedEmployeeInfo] = useState<any>(null);
  const [showEmployeeInfoDialog, setShowEmployeeInfoDialog] = useState(false);
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
  const EMPLOYEES_PER_PAGE = 6;

  // ESTADOS PARA INVENTARIO
  const [activeInventoryTab, setActiveInventoryTab] = useState('finished-products');
  const [finishedProducts, setFinishedProducts] = useState([
    {
      id: 1,
      name: 'Macramé Luna',
      description: 'Hermoso tapiz de macramé con diseño de luna y estrellas, perfecto para decorar cualquier espacio.',
      price: 85000,
      stock: 12,
      category: 'Tapices',
      image: 'macrame_luna.jpg',
      materials: ['Hilo de algodón', 'Aro de madera', 'Cuentas doradas'],
      size: '40cm x 60cm',
      weight: '300g',
      status: 'active'
    },
    {
      id: 2,
      name: 'Collar Textil Bohemio',
      description: 'Collar artesanal tejido a mano con hilos naturales y detalles en cuentas de madera.',
      price: 45000,
      stock: 8,
      category: 'Joyería',
      image: 'collar_bohemio.jpg',
      materials: ['Hilo de lino', 'Cuentas de madera', 'Cierre metálico'],
      size: '45cm largo',
      weight: '50g',
      status: 'active'
    },
    {
      id: 3,
      name: 'Pulsera Macramé',
      description: 'Pulsera elegante tejida en macramé con piedras naturales y cierre ajustable.',
      price: 25000,
      stock: 0,
      category: 'Joyería',
      image: 'pulsera_macrame.jpg',
      materials: ['Hilo encerado', 'Piedras naturales'],
      size: 'Ajustable',
      weight: '20g',
      status: 'inactive'
    }
  ]);
  
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
  const [showReturnResponsePanel, setShowReturnResponsePanel] = useState(false);
  const [selectedReturnForResponse, setSelectedReturnForResponse] = useState<any>(null);
  const [returnResponse, setReturnResponse] = useState('');

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
  const [showQuoteResponsePanel, setShowQuoteResponsePanel] = useState(false);
  const [selectedQuoteForResponse, setSelectedQuoteForResponse] = useState<any>(null);
  const [quoteResponse, setQuoteResponse] = useState('');
  const [adminName, setAdminName] = useState('');

  // Talleres / Calendario - estados
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calendarFilter, setCalendarFilter] = useState<'Todos' | 'Publicado' | 'Borrador'>('Todos');
  const [showEnrolledPanel, setShowEnrolledPanel] = useState(false);
  const [selectedWorkshopForEnrolled, setSelectedWorkshopForEnrolled] = useState<any>(null);
  const [enrolledPage, setEnrolledPage] = useState<number>(1);
  const [enrolledPageSize] = useState<number>(8);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceSelection, setAttendanceSelection] = useState<Record<string, boolean>>({});

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
      setEmployees([...employees, editingEmployee]);
      toast.success('Empleado agregado exitosamente');
    } else {
      setEmployees(employees.map(emp => emp.id === editingEmployee.id ? editingEmployee : emp));
      toast.success('Empleado actualizado exitosamente');
    }
    setShowEmployeeDialog(false);
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (employeeId: number) => {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      setEmployees(employees.filter(emp => emp.id !== employeeId));
      toast.success('Empleado eliminado exitosamente');
    }
  };

  const handleToggleEmployeeStatus = (employeeId: number) => {
    setEmployees(employees.map(emp => 
      emp.id === employeeId ? { ...emp, status: !emp.status } : emp
    ));
    toast.success('Estado actualizado');
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
      id: finishedProducts.length + 1,
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
      setFinishedProducts([...finishedProducts, editingProduct]);
      toast.success('Producto agregado exitosamente');
    } else {
      setFinishedProducts(finishedProducts.map(prod => prod.id === editingProduct.id ? editingProduct : prod));
      toast.success('Producto actualizado exitosamente');
    }
    setShowProductDialog(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setFinishedProducts(finishedProducts.filter(prod => prod.id !== productId));
      toast.success('Producto eliminado exitosamente');
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

  const generateQuotePDF = (quote: any, preparedBy: string = 'Equipo NUDO Studio') => {
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
          .prepared-by { margin-top: 25px; text-align: right; padding-right: 20px; }
          .prepared-by-label { font-size: 12px; color: #666; }
          .prepared-by-name { font-weight: bold; color: #2D4B39; margin-top: 5px; }
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

          <!-- Prepared By -->
          <div class="prepared-by">
            <div class="prepared-by-label">Preparado por:</div>
            <div class="prepared-by-name">${preparedBy}</div>
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

  // ESTADOS PARA DIÁLOGOS DE TALLERES
  const [isAddWorkshopOpen, setIsAddWorkshopOpen] = useState(false);
  const [isEditWorkshopOpen, setIsEditWorkshopOpen] = useState(false);
  const [isViewWorkshopOpen, setIsViewWorkshopOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<any>(null);

  // ESTADOS PARA MOTIVOS DE RECHAZO PERSONALIZADOS
  const [customRejectionReasons, setCustomRejectionReasons] = useState<string[]>([
    'Producto fuera de especificación',
    'No cumple con política de devoluciones',
    'Producto dañado por negligencia del cliente',
    'Excede el período de devolución',
    'Falta de evidencia de compra'
  ]);
  const [newReason, setNewReason] = useState('');
  const [reasonToRemove, setReasonToRemove] = useState<string | null>(null);

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
              Panel de Administración
            </h1>
            <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
              Gestión y control del sistema
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
            title: 'Stock Crítico',
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
        {/* Ventas Analíticas */}
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
                Ventas Analíticas
              </h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Últimos 6 períodos
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={salesPeriod}
                onChange={(e) => setSalesPeriod(e.target.value as 'Diarias' | 'Semanales' | 'Mensuales' | 'Anuales')}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: 'rgba(45, 75, 57, 0.05)',
                  border: '1px solid rgba(45, 75, 57, 0.15)',
                  color: '#2D4B39',
                  cursor: 'pointer'
                }}
              >
                <option value="Diarias">Diarias</option>
                <option value="Semanales">Semanales</option>
                <option value="Mensuales">Mensuales</option>
                <option value="Anuales">Anuales</option>
              </select>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color: '#10B981' }} />
                <span className="text-sm font-medium" style={{ color: '#10B981' }}>
                  +23%
                </span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getChartData()}>
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

      {/* Ingresos del Mes y Talleres de Hoy */}
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
          transition={{ delay: 0.6, duration: 0.6 }}
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
                transition={{ delay: 0.7 + (0.1 * index), duration: 0.3 }}
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
      </div>
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
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2D4B39' }}>
                          <User className="w-5 h-5 text-white" />
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
                        disabled={user.role === 'Admin'}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                          user.status ? 'bg-green-500' : 'bg-gray-400'
                        } ${user.role === 'Admin' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={user.role === 'Admin' ? 'No se puede cambiar estado de Admin' : 'Cambiar estado'}
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
                          disabled={user.role === 'Admin'}
                          style={{ opacity: user.role === 'Admin' ? 0.5 : 1, cursor: user.role === 'Admin' ? 'not-allowed' : 'pointer' }}
                        >
                          <Edit className="w-4 h-4" style={{ color: '#B8860B' }} />
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
                    onChange={(e) => {
                      setEmployeeSearchTerm(e.target.value);
                      setEmployeeCurrentPage(1);
                    }}
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
          {(() => {
            const filteredEmployees = employeeSearchTerm 
              ? employees.filter(employee => 
                  employee.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
                  employee.position.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
                  employee.department.toLowerCase().includes(employeeSearchTerm.toLowerCase())
                ) 
              : employees;
            
            const totalPages = Math.ceil(filteredEmployees.length / EMPLOYEES_PER_PAGE);
            const startIndex = (employeeCurrentPage - 1) * EMPLOYEES_PER_PAGE;
            const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + EMPLOYEES_PER_PAGE);
            
            return paginatedEmployees.map((employee: any, index: number) => (
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
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="flex-1 py-2 px-4 rounded-lg transition-colors hover:bg-red-200"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                  >
                    <Trash2 className="w-4 h-4 mx-auto" style={{ color: '#ef4444' }} />
                  </button>
                </div>
              </motion.div>
            ));
          })()}
        </motion.div>

        {(() => {
          const filteredEmployees = employeeSearchTerm 
            ? employees.filter(employee => 
                employee.name.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
                employee.position.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
                employee.department.toLowerCase().includes(employeeSearchTerm.toLowerCase())
              ) 
            : employees;
          
          const totalPages = Math.ceil(filteredEmployees.length / EMPLOYEES_PER_PAGE);
          
          if (totalPages <= 1) return null;
          
          return (
            <motion.div
              className="flex items-center justify-center gap-2 mt-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <button
                onClick={() => setEmployeeCurrentPage(Math.max(1, employeeCurrentPage - 1))}
                disabled={employeeCurrentPage === 1}
                className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                style={{ backgroundColor: 'rgba(45, 75, 57, 0.1)' }}
              >
                ← Anterior
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setEmployeeCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg transition-all font-medium ${
                    page === employeeCurrentPage ? 'scale-105' : 'hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: page === employeeCurrentPage 
                      ? '#2D4B39' 
                      : 'rgba(45, 75, 57, 0.1)',
                    color: page === employeeCurrentPage ? '#ffffff' : '#2D4B39'
                  }}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setEmployeeCurrentPage(Math.min(totalPages, employeeCurrentPage + 1))}
                disabled={employeeCurrentPage === totalPages}
                className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                style={{ backgroundColor: 'rgba(45, 75, 57, 0.1)' }}
              >
                Siguiente →
              </button>
            </motion.div>
          );
        })()}
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
                    Gestión de Stock
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
                    placeholder="Buscar en stock..."
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
                
                <motion.button
                  onClick={() => alert('Agregar Producto próximamente')}
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
                  Agregar Producto
                </motion.button>
                
                <motion.button
                  onClick={() => alert('Agregar Material próximamente')}
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
                  Agregar Material
                </motion.button>
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
              {finishedProducts.map((product: any, index: number) => (
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
                      onClick={() => handleDeleteProduct(product.id)}
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
              className="overflow-x-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <thead style={{ backgroundColor: '#2D4B39' }}>
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Nombre</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Cantidad</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Proveedor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Precio</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
                  {(inventorySearchTerm ? rawMaterials.filter(mat => 
                    mat.name.toLowerCase().includes(inventorySearchTerm.toLowerCase()) ||
                    mat.supplier.toLowerCase().includes(inventorySearchTerm.toLowerCase())
                  ) : rawMaterials).map((material: any) => {
                    const isLowStock = material.stock <= material.minStock;
                    return (
                      <tr key={material.id} className="hover:bg-gray-50 transition-all duration-200">
                        <td className="px-6 py-4 font-semibold text-gray-900">{material.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                            {material.stock} {material.unit}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{material.supplier}</td>
                        <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#B8860B' }}>${material.cost.toLocaleString('es-CO')}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => { setSelectedMaterialInfo(material); setShowMaterialInfoDialog(true); }}
                              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                              title="Ver más información"
                            >
                              <Info className="w-4 h-4 text-gray-500" />
                            </button>
                            <button 
                              onClick={() => handleEditMaterial(material)}
                              className="p-2 rounded-lg transition-colors hover:bg-yellow-50"
                            >
                              <Edit className="w-4 h-4" style={{ color: '#B8860B' }} />
                            </button>
                            <button 
                              onClick={() => handleDeleteMaterial(material.id)}
                              className="p-2 rounded-lg transition-colors hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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

        <motion.div className="overflow-x-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead style={{ backgroundColor: '#2D4B39' }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Número</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
              {(returnSearchTerm ? returnsData.filter(ret => 
                ret.customer.name.toLowerCase().includes(returnSearchTerm.toLowerCase()) ||
                ret.returnNumber.toLowerCase().includes(returnSearchTerm.toLowerCase())
              ) : returnsData).map((returnItem: any) => {
                const statusColors = getReturnStatusColor(returnItem.status);
                return (
                  <tr key={returnItem.id} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="px-6 py-4 font-semibold text-gray-900">{returnItem.returnNumber}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{returnItem.customer.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{returnItem.requestDate}</td>
                    <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs font-medium inline-block" style={{ backgroundColor: statusColors.bg, color: statusColors.text }}>{returnItem.status}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setSelectedReturnInfo(returnItem); setShowReturnInfoDialog(true); }}
                          className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                          title="Más información"
                        >
                          <Info className="w-4 h-4 text-gray-500" />
                        </button>
                        <button 
                          onClick={() => handleViewReturnEvidence(returnItem)}
                          className="p-2 rounded-lg transition-colors hover:bg-blue-50"
                          title="Ver evidencia"
                        >
                          <Eye className="w-4 h-4" style={{ color: '#3B82F6' }} />
                        </button>
                        <button 
                          onClick={() => { setSelectedReturnForResponse(returnItem); setReturnResponse(''); setShowReturnResponsePanel(true); }}
                          className="p-2 rounded-lg transition-colors hover:bg-green-50"
                          title="Responder"
                        >
                          <MessageSquare className="w-4 h-4" style={{ color: '#10B981' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </>
  );

  // RENDERIZAR SERVICIOS
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
                  Nueva
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="overflow-x-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead style={{ backgroundColor: '#2D4B39' }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Cliente</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
              {(quoteSearchTerm ? quotesData.filter(quote => 
                quote.customer.name.toLowerCase().includes(quoteSearchTerm.toLowerCase()) ||
                quote.quoteNumber.toLowerCase().includes(quoteSearchTerm.toLowerCase()) ||
                quote.project.service.toLowerCase().includes(quoteSearchTerm.toLowerCase())
              ) : quotesData).map((quote: any) => {
                const statusColors = getQuoteStatusColor(quote.status);
                return (
                  <tr key={quote.id} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="px-6 py-4 font-semibold text-gray-900">{quote.customer.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{quote.requestDate}</td>
                    <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs font-medium inline-block" style={{ backgroundColor: statusColors.bg, color: statusColors.text }}>{quote.status}</span></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { setSelectedQuoteInfo(quote); setShowQuoteInfoDialog(true); }}
                          className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                          title="Ver más información"
                        >
                          <Info className="w-4 h-4 text-gray-500" />
                        </button>
                        <button 
                          onClick={() => generateQuotePDF(quote, adminName || 'Equipo NUDO Studio')}
                          className="p-2 rounded-lg transition-colors hover:bg-green-50"
                          title="Descargar PDF"
                        >
                          <Download className="w-4 h-4" style={{ color: '#10B981' }} />
                        </button>
                        <button 
                          onClick={() => { setSelectedQuoteForResponse(quote); setQuoteResponse(''); setShowQuoteResponsePanel(true); }}
                          className="p-2 rounded-lg transition-colors hover:bg-blue-50"
                          title="Responder"
                        >
                          <MessageSquare className="w-4 h-4" style={{ color: '#3B82F6' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </>
  );

  // RENDERIZAR TALLERES
  const renderWorkshops = () => (
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
                      {workshops.length} talleres registrados
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs" style={{ color: '#10b981' }}>
                        {workshops.filter(w => w.status === 'Programado').length} programados
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
                    placeholder="Buscar talleres..."
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
                  onClick={() => setIsAddWorkshopOpen(true)}
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
                  Agregar Taller
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
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">TALLER</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">INSTRUCTOR</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">FECHA</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">HORA</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">INSCRITOS</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PRECIO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ESTADO</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
                {(searchTerm ? workshops.filter(w => 
                  w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  w.instructor.toLowerCase().includes(searchTerm.toLowerCase())
                ) : workshops).map((workshop: any, index: number) => (
                  <motion.tr
                    key={workshop.id}
                    className="hover:bg-gray-50 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">{workshop.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{workshop.instructor}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(workshop.date).toLocaleDateString('es-ES')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{workshop.time}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {workshop.students}/{workshop.maxCapacity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold" style={{ color: '#B8860B' }}>
                      ${workshop.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                        backgroundColor: workshop.status === 'Programado' ? '#DBEAFE' : '#F3E8FF',
                        color: workshop.status === 'Programado' ? '#1E40AF' : '#6B21A8'
                      }}>
                        {workshop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            // Obtener estudiantes inscritos del AppContext
                            const enrolledStudents = users
                              .filter(u => u.enrolledWorkshops?.includes(workshop.id))
                              .map(u => ({
                                userId: u.id,
                                userName: u.name,
                                email: u.email,
                                enrolledDate: new Date().toISOString()
                              }));
                            
                            setSelectedWorkshop({
                              ...workshop,
                              enrolledStudents,
                              enrolled: enrolledStudents.length
                            });
                            setIsViewWorkshopOpen(true);
                          }}
                          className="p-2 rounded-full transition-colors hover:bg-gray-100"
                          title="Ver inscritos"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedWorkshop(workshop);
                            setIsEditWorkshopOpen(true);
                          }}
                          className="p-2 rounded-full transition-colors hover:bg-yellow-50"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" style={{ color: '#B8860B' }} />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm(`¿Eliminar el taller "${workshop.name}"?`)) {
                              deleteWorkshop(workshop.id);
                              toast.success('Taller eliminado');
                            }
                          }}
                          className="p-2 rounded-full transition-colors hover:bg-red-50"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                        <button onClick={() => { const copy = { ...workshop, id: Date.now(), name: workshop.name + ' (Copia)', date: workshop.date }; addWorkshop(copy); toast.success('Taller duplicado'); }} className="p-2 rounded-full transition-colors hover:bg-gray-100" title="Duplicar">
                          <Copy className="w-4 h-4 text-gray-700" />
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

  // RENDERIZAR CONFIGURACIÓN
  const renderSettings = () => (
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
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
              Configuración del Sistema
            </h1>
            <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
              Gestión de permisos y roles
            </p>
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
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">ROL</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">USUARIOS</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">EMPLEADOS</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">INVENTARIO</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">PEDIDOS</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">DEVOLUCIONES</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase">COTIZACIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'rgba(45, 75, 57, 0.08)' }}>
              {['Admin', 'Empleado', 'Cliente', 'Estudiante'].map((role: string, index: number) => (
                <motion.tr
                  key={role}
                  className="hover:bg-gray-50 transition-all duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium" style={{
                      backgroundColor: role === 'Admin' ? '#F3E8FF' : role === 'Empleado' ? '#D1FAE5' : '#FEF3C7',
                      color: role === 'Admin' ? '#5B21B6' : role === 'Empleado' ? '#065F46' : '#92400E'
                    }}>
                      {role}
                    </span>
                  </td>
                  {['canManageUsers', 'canManageEmployees', 'canManageInventory', 'canManageOrders', 'canManageReturns', 'canManageQuotes'].map((permission: string) => (
                    <td key={permission} className="px-6 py-4 text-center">
                      <motion.button
                        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none"
                        style={{
                          background: role === 'Admin' || (role === 'Empleado' && permission !== 'canManageUsers' && permission !== 'canManageQuotes') ? '#10B981' : '#D1D5DB',
                          cursor: 'pointer'
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span
                          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300"
                          style={{
                            transform: role === 'Admin' || (role === 'Empleado' && permission !== 'canManageUsers' && permission !== 'canManageQuotes') ? 'translateX(1.5rem)' : 'translateX(0.25rem)'
                          }}
                        />
                      </motion.button>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* SECCIÓN DE MOTIVOS DE RECHAZO PERSONALIZADOS */}
      <motion.div 
        className="mt-8 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(45, 75, 57, 0.1)',
          borderRadius: '24px',
          boxShadow: '0 8px 32px rgba(45, 75, 57, 0.08)'
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="relative px-10 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2" style={{ color: '#2D4B39' }}>
              Motivos de Rechazo de Devoluciones
            </h2>
            <p className="text-sm font-medium" style={{ color: 'rgba(107, 114, 128, 0.8)' }}>
              Personaliza los motivos que se muestran cuando rechazas una devolución
            </p>
          </div>

          <div className="space-y-4">
            {/* Agregar nuevo motivo */}
            <div className="flex gap-2">
              <Input
                placeholder="Nuevo motivo de rechazo"
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                className="flex-1 border-amber-200 focus:border-amber-400 focus:ring-amber-300"
              />
              <motion.button
                onClick={() => {
                  if (newReason.trim()) {
                    setCustomRejectionReasons([...customRejectionReasons, newReason.trim()]);
                    setNewReason('');
                    toast.success('Motivo agregado');
                  }
                }}
                className="px-6 py-2 rounded-lg font-medium transition-all"
                style={{
                  background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)',
                  color: '#ffffff'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Lista de motivos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {customRejectionReasons.map((reason, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-amber-100 hover:border-amber-300 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-sm font-medium text-slate-900">{reason}</span>
                  <motion.button
                    onClick={() => {
                      setCustomRejectionReasons(customRejectionReasons.filter((_, i) => i !== idx));
                      toast.success('Motivo eliminado');
                    }}
                    className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
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
      
      {/* Ajustar marginLeft para que el contenido no quede debajo del sidebar fijo */}
      <div
        className="pt-2 pb-20 px-2 md:px-4 lg:px-8"
        style={{
          marginLeft: isMobile ? 0 : (isTablet || sidebarCollapsed ? 80 : 280),
          paddingTop: 65 // espacio para el AdminNavbar fijo (65px)
        }}
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeSection === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderDashboard()}
              </motion.div>
            )}
            {activeSection === 'users' && (
              <motion.div 
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderUsers()}
              </motion.div>
            )}
            {activeSection === 'employees' && (
              <motion.div 
                key="employees"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <EmployeeDialogs />
              </motion.div>
            )}
            {activeSection === 'inventory' && (
              <motion.div 
                key="inventory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <InventoryDialogs />
              </motion.div>
            )}
            {activeSection === 'suppliers' && (
              <motion.div 
                key="suppliers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AdminSuppliers />
              </motion.div>
            )}
            {activeSection === 'orders' && (
              <motion.div 
                key="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <OrderDialogs />
              </motion.div>
            )}
            {activeSection === 'returns' && (
              <motion.div 
                key="returns"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ReturnDialogs />
              </motion.div>
            )}
            {activeSection === 'quotes' && (
              <motion.div 
                key="quotes"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuoteDialogs />
              </motion.div>
            )}
            {activeSection === 'workshops' && (
              <motion.div 
                key="workshops"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderWorkshops()}
              </motion.div>
            )}
            {activeSection === 'blog' && (
              <motion.div 
                key="blog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                Blog
              </motion.div>
            )}
            {activeSection === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderSettings()}
              </motion.div>
            )}
            {activeSection === 'messages' && (
              <motion.div 
                key="messages"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                Mensajes
              </motion.div>
            )}
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


      
      {/* Panel Responder Devoluciones */}
      <AnimatePresence>
        {showReturnResponsePanel && (
          <motion.div 
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setShowReturnResponsePanel(false)} />
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg flex flex-col z-50"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(45, 75, 57, 0.1)' }}>
                <h2 className="text-xl font-bold" style={{ color: '#2D4B39' }}>Responder Devolución</h2>
                <button onClick={() => setShowReturnResponsePanel(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedReturnForResponse && (
                  <>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Número de Devolución</p>
                      <p className="font-semibold" style={{ color: '#2D4B39' }}>{selectedReturnForResponse.returnNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Cliente</p>
                      <p className="font-semibold" style={{ color: '#2D4B39' }}>{selectedReturnForResponse.customer.name}</p>
                    </div>
                  </>
                )}
                <div>
                  <label className="text-sm font-medium" style={{ color: '#2D4B39' }}>Tu Nombre</label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full mt-2 p-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: 'rgba(45, 75, 57, 0.15)', '--tw-ring-color': '#2D4B39' } as any}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: '#2D4B39' }}>Respuesta</label>
                  <textarea
                    value={returnResponse}
                    onChange={(e) => setReturnResponse(e.target.value)}
                    className="w-full mt-2 p-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: 'rgba(45, 75, 57, 0.15)', '--tw-ring-color': '#2D4B39' } as any}
                    rows={6}
                    placeholder="Ingresa tu respuesta aquí..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 p-6 border-t" style={{ borderColor: 'rgba(45, 75, 57, 0.1)' }}>
                <button
                  onClick={() => setShowReturnResponsePanel(false)}
                  className="flex-1 px-4 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)', color: '#2D4B39' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    toast.success('Respuesta guardada');
                    setShowReturnResponsePanel(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg text-white transition-colors"
                  style={{ background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)' }}
                >
                  Guardar Respuesta
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Modal - Marcar Asistencia */}
      <AnimatePresence>
        {showAttendanceModal && selectedWorkshop && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowAttendanceModal(false)} />
            <motion.div className="bg-white rounded-lg shadow-lg z-50 max-w-2xl w-full p-6" initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: '#2D4B39' }}>Marcar Asistencia - {selectedWorkshop.name}</h3>
                <button onClick={() => setShowAttendanceModal(false)} className="p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {(selectedWorkshop.enrolledStudents || []).map((s: any) => (
                  <div key={s.userId} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-semibold">{s.userName}</div>
                      <div className="text-xs text-gray-500">{s.email}</div>
                    </div>
                    <div>
                      <label className="inline-flex items-center">
                        <input type="checkbox" className="mr-2" checked={!!attendanceSelection[s.userId]} onChange={(e) => setAttendanceSelection(prev => ({ ...prev, [s.userId]: e.target.checked }))} />
                        <span className="text-sm">Presente</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowAttendanceModal(false)} className="px-4 py-2 rounded border">Cancelar</button>
                <button onClick={() => { toast.success('Asistencia registrada'); setShowAttendanceModal(false); }} className="px-4 py-2 rounded bg-gradient-to-r from-amber-600 to-amber-700 text-white">Guardar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Panel Avanzado - Inscritos */}
      <AnimatePresence>
        {showEnrolledPanel && selectedWorkshopForEnrolled && (
          <motion.div className="fixed inset-0 z-50 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setShowEnrolledPanel(false)} />
            <motion.div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-lg flex flex-col z-50" initial={{ x: 500 }} animate={{ x: 0 }} exit={{ x: 500 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(45,75,57,0.08)' }}>
                <h2 className="text-xl font-bold" style={{ color: '#2D4B39' }}>Inscritos - {selectedWorkshopForEnrolled.name}</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => {
                    // export CSV
                    const enrolled = selectedWorkshopForEnrolled.enrolledStudents || [];
                    const headers = ['userId','userName','email','enrolledDate'];
                    const csv = [headers.join(',')].concat(enrolled.map((r: any)=> headers.map(h=> `"${(r[h]||'').toString().replace(/"/g,'""')}"`).join(','))).join('\n');
                    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = `${selectedWorkshopForEnrolled.name.replace(/\s+/g,'_')}_inscritos.csv`; a.click(); URL.revokeObjectURL(url);
                  }} className="p-2 rounded-full hover:bg-gray-100" title="Exportar CSV">
                    <Download className="w-4 h-4 text-gray-700" />
                  </button>
                  <button onClick={() => setShowEnrolledPanel(false)} className="p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {(() => {
                  const enrolled = selectedWorkshopForEnrolled.enrolledStudents || [];
                  const start = (enrolledPage - 1) * enrolledPageSize;
                  const pageItems = enrolled.slice(start, start + enrolledPageSize);
                  return (
                    <div>
                      {pageItems.length > 0 ? (
                        <div className="space-y-2">
                          {pageItems.map((s: any, idx: number) => (
                            <div key={`${s.userId}-${idx}`} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                              <div>
                                <div className="font-semibold">{s.userName}</div>
                                <div className="text-xs text-gray-500">{s.email} • {new Date(s.enrolledDate).toLocaleDateString()}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button onClick={() => {
                                  // Cancelar inscripción - simulate by removing from selectedWorkshopForEnrolled and AppContext users mapping
                                  const idxAll = selectedWorkshopForEnrolled.enrolledStudents.findIndex((el: any) => el.userId === s.userId);
                                  if (idxAll > -1) selectedWorkshopForEnrolled.enrolledStudents.splice(idxAll,1);
                                  toast.success('Inscripción cancelada');
                                  setSelectedWorkshopForEnrolled({ ...selectedWorkshopForEnrolled });
                                }} className="p-2 rounded-full hover:bg-red-50" title="Cancelar inscripción">
                                  <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                                <button onClick={() => {
                                  // mover desde lista de espera simplificada
                                  toast.success('Usuario movido desde lista de espera (si aplica)');
                                }} className="p-2 rounded-full hover:bg-green-50" title="Mover desde lista de espera">
                                  <UserCheck className="w-4 h-4 text-green-600" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-8">No hay inscritos aún.</div>
                      )}
                      {/* Pagination */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-600">Mostrando {Math.min(enrolled.length, (enrolledPage)*enrolledPageSize)} de {enrolled.length}</div>
                        <div className="flex items-center gap-2">
                          <button disabled={enrolledPage===1} onClick={() => setEnrolledPage(p => Math.max(1,p-1))} className="px-3 py-1 rounded border">Anterior</button>
                          <button disabled={(enrolledPage*enrolledPageSize)>=enrolled.length} onClick={() => setEnrolledPage(p => p+1)} className="px-3 py-1 rounded border">Siguiente</button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className="flex gap-3 p-4 border-t" style={{ borderColor: 'rgba(45,75,57,0.06)' }}>
                <button onClick={() => setShowEnrolledPanel(false)} className="flex-1 px-4 py-2 rounded-lg bg-gray-100">Cerrar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Panel Responder Cotizaciones */}
      <AnimatePresence>
        {showQuoteResponsePanel && (
          <motion.div 
            className="fixed inset-0 z-50 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setShowQuoteResponsePanel(false)} />
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg flex flex-col z-50"
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'rgba(45, 75, 57, 0.1)' }}>
                <h2 className="text-xl font-bold" style={{ color: '#2D4B39' }}>Responder Cotización</h2>
                <button onClick={() => setShowQuoteResponsePanel(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedQuoteForResponse && (
                  <>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Cliente</p>
                      <p className="font-semibold" style={{ color: '#2D4B39' }}>{selectedQuoteForResponse.client}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Fecha</p>
                      <p className="font-semibold" style={{ color: '#2D4B39' }}>{selectedQuoteForResponse.requestDate}</p>
                    </div>
                  </>
                )}
                <div>
                  <label className="text-sm font-medium" style={{ color: '#2D4B39' }}>Tu Nombre (para PDF)</label>
                  <input
                    type="text"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full mt-2 p-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: 'rgba(45, 75, 57, 0.15)', '--tw-ring-color': '#2D4B39' } as any}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: '#2D4B39' }}>Respuesta / Presupuesto</label>
                  <textarea
                    value={quoteResponse}
                    onChange={(e) => setQuoteResponse(e.target.value)}
                    className="w-full mt-2 p-3 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ borderColor: 'rgba(45, 75, 57, 0.15)', '--tw-ring-color': '#2D4B39' } as any}
                    rows={6}
                    placeholder="Ingresa tu presupuesto o respuesta aquí..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 p-6 border-t" style={{ borderColor: 'rgba(45, 75, 57, 0.1)' }}>
                <button
                  onClick={() => setShowQuoteResponsePanel(false)}
                  className="flex-1 px-4 py-2 rounded-lg transition-colors"
                  style={{ backgroundColor: 'rgba(107, 114, 128, 0.1)', color: '#2D4B39' }}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    toast.success('Respuesta guardada');
                    setShowQuoteResponsePanel(false);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg text-white transition-colors"
                  style={{ background: 'linear-gradient(135deg, #2D4B39 0%, #1a2f23 100%)' }}
                >
                  Guardar Respuesta
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      

      
      <WorkshopDialogs
        isAddOpen={isAddWorkshopOpen}
        setIsAddOpen={setIsAddWorkshopOpen}
        isEditOpen={isEditWorkshopOpen}
        setIsEditOpen={setIsEditWorkshopOpen}
        isViewOpen={isViewWorkshopOpen}
        setIsViewOpen={setIsViewWorkshopOpen}
        selectedWorkshop={selectedWorkshop}
        setSelectedWorkshop={setSelectedWorkshop}
      />
    </div>
  );
}