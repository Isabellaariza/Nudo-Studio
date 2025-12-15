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

  const handleRefresh = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success('Datos actualizados');
  };

  // RENDERIZAR DASHBOARD SIMPLE
  const renderDashboard = () => (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#2D4B39' }}>
          {isAdmin ? 'Panel de Administración' : 'Panel de Empleado'}
        </h1>
        <p className="text-gray-600">
          Bienvenido al panel de administración de NUDO Studio
        </p>
      </div>
    </motion.div>
  );

  // RENDERIZAR CONTENIDO SEGÚN SECCIÓN ACTIVA
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return userPermissions.canManageUsers ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Gestión de Usuarios</h2>
            <p>Funcionalidad de usuarios en desarrollo...</p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">No tienes permisos para acceder a esta sección.</p>
          </div>
        );
      case 'employees':
        return userPermissions.canManageEmployees ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Gestión de Empleados</h2>
            <p>Funcionalidad de empleados en desarrollo...</p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">No tienes permisos para acceder a esta sección.</p>
          </div>
        );
      case 'inventory':
        return userPermissions.canManageInventory ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Gestión de Inventario</h2>
            <p>Funcionalidad de inventario en desarrollo...</p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">No tienes permisos para acceder a esta sección.</p>
          </div>
        );
      case 'orders':
        return userPermissions.canManageOrders ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Gestión de Pedidos</h2>
            <p>Funcionalidad de pedidos en desarrollo...</p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">No tienes permisos para acceder a esta sección.</p>
          </div>
        );
      case 'returns':
        return userPermissions.canManageReturns ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Gestión de Devoluciones</h2>
            <p>Funcionalidad de devoluciones en desarrollo...</p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">No tienes permisos para acceder a esta sección.</p>
          </div>
        );
      case 'services':
        return userPermissions.canManageServices ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Gestión de Servicios</h2>
            <p>Funcionalidad de servicios en desarrollo...</p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">No tienes permisos para acceder a esta sección.</p>
          </div>
        );
      case 'quotes':
        return userPermissions.canManageQuotes ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Gestión de Cotizaciones</h2>
            <p>Funcionalidad de cotizaciones en desarrollo...</p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">No tienes permisos para acceder a esta sección.</p>
          </div>
        );
      case 'workshops':
        return userPermissions.canManageWorkshops ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Gestión de Talleres</h2>
            <p>Funcionalidad de talleres en desarrollo...</p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">No tienes permisos para acceder a esta sección.</p>
          </div>
        );
      case 'blog':
        return userPermissions.canManageBlog ? (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2D4B39' }}>Gestión del Blog</h2>
            <p>Funcionalidad del blog en desarrollo...</p>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">No tienes permisos para acceder a esta sección.</p>
          </div>
        );
      case 'settings':
        return <SettingsPage />;
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userPermissions={userPermissions}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <AdminNavbar 
          user={currentUser}
          onLogout={onLogout}
          onRefresh={handleRefresh}
          loading={loading}
        />
        
        <main className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}