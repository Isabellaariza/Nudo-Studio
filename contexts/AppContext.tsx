import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { sendReturnResponseEmail } from '../lib/EmailService';

// TIPOS
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Empleado' | 'Cliente' | 'Estudiante';
  orders: number;
  status: boolean;
  joined: string;
  password?: string;
  address?: string;
  documentType?: string;
  documentNumber?: string;
  profilePhoto?: string;
  permissions?: {
    canManageUsers: boolean;
    canManageEmployees: boolean;
    canManageInventory: boolean;
    canManageOrders: boolean;
    canManageReturns: boolean;
    canManageServices: boolean;
    canManageQuotes: boolean;
    canManageWorkshops: boolean;
    canManageBlog: boolean;
    canManageMessages: boolean;
  };
}

interface Workshop {
  id: number;
  name: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  students: number;
  maxCapacity: number;
  price: number;
  revenue: number;
  status: string;
  enrolledUsers?: {
    userId: number;
    name: string;
    email: string;
    phone: string;
    experience: string;
    enrollmentDate: string;
  }[];
}

interface Order {
  id: number;
  customer: string;
  email: string;
  products: number;
  items: string;
  total: number;
  status: string;
  date: string;
  payment: string;
  address: string;
  userId?: number;
}

interface Quote {
  id: number;
  customer: string;
  email: string;
  service: string;
  details: string;
  status: string;
  date: string;
  phone: string;
  budget: string;
  response?: string;
  userId?: number;
}

interface Return {
  id: number;
  returnNumber: string;
  requestDate: string;
  originalOrder: string;
  deliveryDate: string;
  daysLeft: number;
  customer: {
    name: string;
    documentType: string;
    documentNumber: string;
    email: string;
    phone: string;
    address: string;
  };
  products: { name: string; quantity: number; price: number; condition: string }[];
  totalRefund: number;
  reason: { category: string; description: string; evidence: string[] };
  originalPaymentProof: string;
  status: 'Pendiente' | 'Aprobada' | 'Rechazada' | 'Reembolsada';
  adminResponse?: { approved: boolean; reason: string; message: string; alternative?: string };
  refundMethod: string;
  pickupAddress: string;
  shippingCost: string;
  processedDate: string | null;
  userId?: number;
}

interface RolePermissions {
  canManageUsers: boolean;
  canManageEmployees: boolean;
  canManageInventory: boolean;
  canManageOrders: boolean;
  canManageReturns: boolean;
  canManageServices: boolean;
  canManageQuotes: boolean;
  canManageWorkshops: boolean;
  canManageBlog: boolean;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  materials: string[];
  size: string;
  weight: string;
  status: 'active' | 'inactive';
}

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  documentType: string;
  documentNumber: string;
  position: string;
  salary: number;
  schedule: string;
  address: string;
  role: string;
  status: boolean;
  hireDate: string;
  department: string;
  experience: number;
  rating: number;
  birthDate: string;
  contractType: string;
  supervisor: string;
  emergencyContact: { name: string; phone: string };
  eps: string;
  bankInfo: { bank: string; accountType: string; accountNumber: string };
  education: string;
  certifications: string[];
  studyCertificate: string;
  bloodType: string;
  allergies: string;
  socialSecurity: string;
  profilePhoto: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
}

interface Notification {
  id: string;
  type: 'order' | 'user' | 'workshop' | 'quote' | 'return' | 'system';
  message: string;
  date: string;
  read: boolean;
  link?: string;
}

interface ActivityLog {
  id: string;
  action: string;
  user: string; // Quién hizo la acción (Admin)
  details: string;
  date: string;
  type: 'create' | 'update' | 'delete' | 'status';
}

interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  category: string;
  status: 'active' | 'inactive';
  productsProvided: string[];
}

interface AppContextType {
  // USUARIOS
  users: User[];
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  updateUser: (userId: number, updatedUser: Partial<User>) => void;
  deleteUser: (userId: number) => void;
  loginUser: (email: string, password: string) => User | null;
  logoutUser: () => void;
  
  // PERMISOS POR ROL
  rolePermissions: Record<string, RolePermissions>;
  updateRolePermissions: (role: string, permissions: RolePermissions) => void;
  
  // EMPLEADOS
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employeeId: number, updatedEmployee: Partial<Employee>) => void;
  deleteEmployee: (employeeId: number) => void;
  
  // PRODUCTOS
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (productId: number, updatedProduct: Partial<Product>) => void;
  deleteProduct: (productId: number) => void;
  
  // TALLERES
  workshops: Workshop[];
  addWorkshop: (workshop: Workshop) => void;
  updateWorkshop: (workshopId: number, updatedWorkshop: Partial<Workshop>) => void;
  deleteWorkshop: (workshopId: number) => void;
  enrollInWorkshop: (workshopId: number, userId: number, enrollmentData?: { name: string; email: string; phone: string; experience: string }) => void;
  completeWorkshop: (workshopId: number) => void;
  
  // PEDIDOS
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrder: (orderId: number, updatedOrder: Partial<Order>) => void;
  deleteOrder: (orderId: number) => void;
  
  // COTIZACIONES
  quotes: Quote[];
  addQuote: (quote: Quote) => void;
  updateQuote: (quoteId: number, updatedQuote: Partial<Quote>) => void;
  deleteQuote: (quoteId: number) => void;
  
  // DEVOLUCIONES
  returns: Return[];
  addReturn: (returnRequest: Return) => void;
  updateReturn: (returnId: number, updatedReturn: Partial<Return>) => void;
  deleteReturn: (returnId: number) => void;
  respondToReturn: (returnId: number, approved: boolean, reason: string, message: string, alternative?: string) => void;
  
  // BLOG
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (postId: number, updatedPost: Partial<BlogPost>) => void;
  deleteBlogPost: (postId: number) => void;

  // NOTIFICACIONES
  notifications: Notification[];
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;

  // ACTIVITY LOG
  activityLog: ActivityLog[];
  logActivity: (action: string, details: string, type: ActivityLog['type']) => void;

  // PROVEEDORES
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => void;
  updateSupplier: (supplierId: number, updatedSupplier: Partial<Supplier>) => void;
  deleteSupplier: (supplierId: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// DATOS INICIALES
const initialProducts: Product[] = [
  {
    id: 1,
    name: 'Macramé Luna',
    description: 'Hermoso tapiz de macramé con diseño de luna y estrellas, perfecto para decorar cualquier espacio.',
    price: 65000,
    stock: 15,
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
    price: 35000,
    stock: 24,
    category: 'Joyería',
    image: 'collar_bohemio.jpg',
    materials: ['Hilo de lino', 'Cuentas de madera', 'Cierre metálico'],
    size: '45cm largo',
    weight: '50g',
    status: 'active'
  },
  {
    id: 3,
    name: 'Tapiz Natural Grande',
    description: 'Tapiz de gran tamaño con fibras naturales, perfecto para decorar paredes y crear ambientes acogedores.',
    price: 120000,
    stock: 3,
    category: 'Tapices',
    image: 'tapiz_natural.jpg',
    materials: ['Fibras naturales', 'Hilo de yute'],
    size: '80cm x 120cm',
    weight: '800g',
    status: 'active'
  },
  {
    id: 4,
    name: 'Pulsera Artesanal',
    description: 'Pulsera tejida a mano con técnicas tradicionales, disponible en varios colores y diseños únicos.',
    price: 25000,
    stock: 42,
    category: 'Joyería',
    image: 'pulsera_artesanal.jpg',
    materials: ['Hilo encerado', 'Piedras naturales'],
    size: 'Ajustable',
    weight: '20g',
    status: 'active'
  },
  {
    id: 5,
    name: 'Aretes Colgantes',
    description: 'Aretes elegantes con diseño colgante, perfectos para ocasiones especiales y uso diario.',
    price: 30000,
    stock: 18,
    category: 'Joyería',
    image: 'aretes_colgantes.jpg',
    materials: ['Hilo de seda', 'Cuentas de cristal'],
    size: '6cm largo',
    weight: '15g',
    status: 'active'
  },
  {
    id: 6,
    name: 'Cortina Macramé',
    description: 'Cortina decorativa en macramé para puertas o ventanas, añade privacidad con estilo artesanal.',
    price: 95000,
    stock: 8,
    category: 'Decoración',
    image: 'cortina_macrame.jpg',
    materials: ['Hilo de algodón grueso', 'Varilla de madera'],
    size: '100cm x 200cm',
    weight: '600g',
    status: 'active'
  },
  {
    id: 7,
    name: 'Cojín Tejido',
    description: 'Cojín decorativo tejido a mano con patrones únicos, ideal para sofás y camas.',
    price: 45000,
    stock: 0,
    category: 'Accesorios',
    image: 'cojin_tejido.jpg',
    materials: ['Lana natural', 'Relleno de fibra'],
    size: '40cm x 40cm',
    weight: '400g',
    status: 'inactive'
  },
  {
    id: 8,
    name: 'Bolso Artesanal',
    description: 'Bolso tejido a mano con materiales resistentes, perfecto para el día a día con estilo único.',
    price: 55000,
    stock: 12,
    category: 'Accesorios',
    image: 'bolso_artesanal.jpg',
    materials: ['Hilo de algodón', 'Forro interno', 'Asas de cuero'],
    size: '35cm x 25cm x 10cm',
    weight: '250g',
    status: 'active'
  }
];

const initialEmployees: Employee[] = [
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
];

const initialUsers: User[] = [
  { id: 1, name: 'Patricia Izarra', email: 'patricia@nudostudio.com', phone: '300-123-4567', role: 'Admin', orders: 0, status: true, joined: '2020-01-15', password: '123456', address: 'Calle 123 #45-67, Bogotá', documentType: 'cedula', documentNumber: '1234567890' },
  { id: 2, name: 'Isabella Ariza', email: 'isabella@nudostudio.com', phone: '301-234-5678', role: 'Cliente', orders: 5, status: true, joined: '2021-03-20', password: '123456', address: 'Carrera 15 #32-45, Bogotá', documentType: 'cedula', documentNumber: '0987654321' },
  { id: 3, name: 'María García', email: 'maria@email.com', phone: '302-345-6789', role: 'Empleado', orders: 0, status: true, joined: '2024-01-15', password: '123456', address: 'Calle 123 #45-67, Bogotá', documentType: 'cedula', documentNumber: '1122334455', permissions: { canManageUsers: true, canManageEmployees: false, canManageInventory: true, canManageOrders: true, canManageReturns: false, canManageServices: false, canManageQuotes: false, canManageWorkshops: false, canManageBlog: false, canManageMessages: false } },
  { id: 4, name: 'Juan Pérez', email: 'juan@email.com', phone: '310-234-5678', role: 'Estudiante', orders: 8, status: true, joined: '2024-02-20', password: '123456', address: 'Carrera 78 #90-12, Medellín', documentType: 'cedula', documentNumber: '0987654321' },
  { id: 5, name: 'Ana Martínez', email: 'ana@email.com', phone: '320-345-6789', role: 'Cliente', orders: 5, status: false, joined: '2024-03-10', password: '123456', address: 'Avenida 34 #56-78, Cali', documentType: 'tarjeta_identidad', documentNumber: '1122334455' },
  { id: 6, name: 'Carlos López', email: 'carlos@email.com', phone: '330-456-7890', role: 'Estudiante', orders: 5, status: false, joined: '2024-03-10', password: '123456', address: 'Diagonal 45 #67-89, Barranquilla', documentType: 'cedula_extranjeria', documentNumber: '5566778899' },
  { id: 7, name: 'Laura Rodríguez', email: 'laura@email.com', phone: '340-567-8901', role: 'Cliente', orders: 15, status: true, joined: '2023-11-05', password: '123456', address: 'Transversal 12 #34-56, Cartagena', documentType: 'cedula', documentNumber: '9988776655' },
  { id: 8, name: 'Diego Ramírez', email: 'diego@email.com', phone: '350-678-9012', role: 'Estudiante', orders: 3, status: true, joined: '2024-04-12', password: '123456', address: 'Calle 67 #89-01, Bucaramanga', documentType: 'cedula', documentNumber: '4433221100' },
];

const initialRolePermissions: Record<string, RolePermissions> = {
  Admin: {
    canManageUsers: true,
    canManageEmployees: true,
    canManageInventory: true,
    canManageOrders: true,
    canManageReturns: true,
    canManageServices: true,
    canManageQuotes: true,
    canManageWorkshops: true,
    canManageBlog: true
  },
  Empleado: {
    canManageUsers: false,
    canManageEmployees: false,
    canManageInventory: true,
    canManageOrders: true,
    canManageReturns: false,
    canManageServices: false,
    canManageQuotes: false,
    canManageWorkshops: false,
    canManageBlog: false
  },
  Cliente: {
    canManageUsers: false,
    canManageEmployees: false,
    canManageInventory: false,
    canManageOrders: false,
    canManageReturns: false,
    canManageServices: false,
    canManageQuotes: false,
    canManageWorkshops: false,
    canManageBlog: false
  },
  Estudiante: {
    canManageUsers: false,
    canManageEmployees: false,
    canManageInventory: false,
    canManageOrders: false,
    canManageReturns: false,
    canManageServices: false,
    canManageQuotes: false,
    canManageWorkshops: false,
    canManageBlog: false
  }
};

export function AppProvider({ children }: { children: ReactNode }) {
  // CARGAR DATOS DEL LOCALSTORAGE O USAR DATOS INICIALES
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('nudostudio-users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nudostudio-currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [rolePermissions, setRolePermissions] = useState<Record<string, RolePermissions>>(() => {
    const saved = localStorage.getItem('nudostudio-rolePermissions');
    return saved ? JSON.parse(saved) : initialRolePermissions;
  });

  const [workshops, setWorkshops] = useState<Workshop[]>(() => {
    const saved = localStorage.getItem('nudostudio-workshops');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Macramé Básico', instructor: 'Isabella Ariza', date: '2025-01-15', time: '10:00 AM', duration: '6 horas', students: 8, maxCapacity: 12, price: 80000, revenue: 640000, status: 'Programado', enrolledUsers: [] },
      { id: 2, name: 'Joyería Textil Avanzado', instructor: 'Carlos Mendoza', date: '2025-01-18', time: '2:00 PM', duration: '4 horas', students: 6, maxCapacity: 10, price: 95000, revenue: 570000, status: 'Programado', enrolledUsers: [] },
      { id: 3, name: 'Tapiz Decorativo', instructor: 'Laura Sánchez', date: '2025-01-22', time: '9:00 AM', duration: '8 horas', students: 12, maxCapacity: 12, price: 120000, revenue: 1440000, status: 'Completo', enrolledUsers: [] },
      { id: 4, name: 'Accesorios Personalizados', instructor: 'María Torres', date: '2025-01-25', time: '3:00 PM', duration: '5 horas', students: 4, maxCapacity: 8, price: 75000, revenue: 300000, status: 'Programado', enrolledUsers: [] },
      { id: 5, name: 'Macramé Avanzado', instructor: 'Isabella Ariza', date: '2025-02-05', time: '10:00 AM', duration: '6 horas', students: 10, maxCapacity: 12, price: 90000, revenue: 900000, status: 'Programado', enrolledUsers: [] },
    ];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nudostudio-orders');
    return saved ? JSON.parse(saved) : [
      { id: 3421, customer: 'María García', email: 'maria@email.com', products: 2, items: 'Macramé Luna, Collar Textil', total: 100000, status: 'Pendiente', date: '2025-01-05', payment: 'Transferencia', address: 'Calle 123 #45-67', userId: 1 },
      { id: 3420, customer: 'Juan Pérez', email: 'juan@email.com', products: 1, items: 'Tapiz Natural Grande', total: 120000, status: 'En Proceso', date: '2025-01-04', payment: 'Efectivo', address: 'Carrera 78 #90-12', userId: 2 },
      { id: 3419, customer: 'Laura Rodríguez', email: 'laura@email.com', products: 3, items: 'Pulsera Artesanal x3', total: 75000, status: 'Completado', date: '2025-01-03', payment: 'Tarjeta', address: 'Avenida 34 #56-78', userId: 5 },
      { id: 3418, customer: 'Carlos López', email: 'carlos@email.com', products: 2, items: 'Aretes Colgantes x2', total: 60000, status: 'Completado', date: '2025-01-02', payment: 'Transferencia', address: 'Diagonal 45 #67-89', userId: 4 },
      { id: 3417, customer: 'Diego Ramírez', email: 'diego@email.com', products: 1, items: 'Cortina Macramé', total: 95000, status: 'En Proceso', date: '2025-01-01', payment: 'Efectivo', address: 'Transversal 12 #34-56', userId: 6 },
    ];
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('nudostudio-employees');
    return saved ? JSON.parse(saved) : initialEmployees;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nudostudio-products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [quotes, setQuotes] = useState<Quote[]>(() => {
    const saved = localStorage.getItem('nudostudio-quotes');
    return saved ? JSON.parse(saved) : [
      { id: 101, customer: 'Andrea Silva', email: 'andrea@email.com', service: 'Tapiz Personalizado 2x3m', details: 'Tapiz grande para sala con diseño de luna y estrellas en tonos beige y verde', status: 'Pendiente', date: '2025-01-06', phone: '300-123-4567', budget: '150000-200000' },
      { id: 102, customer: 'Roberto Gómez', email: 'roberto@email.com', service: 'Collar Personalizado', details: 'Collar con iniciales RG en macramé dorado, estilo bohemio', status: 'Pendiente', date: '2025-01-05', phone: '310-234-5678', budget: '40000-50000' },
      { id: 103, customer: 'Sofía Ramírez', email: 'sofia@email.com', service: 'Decoración Evento', details: 'Decoración macramé para boda 50 personas: cortinas, centros de mesa, y detalles colgantes', status: 'Respondida', date: '2025-01-04', phone: '320-345-6789', budget: '800000-1000000', response: 'Cotización enviada: $950.000 - Incluye 4 cortinas, 10 centros de mesa, 20 detalles colgantes' },
      { id: 104, customer: 'Felipe Morales', email: 'felipe@email.com', service: 'Set Joyería Completo', details: 'Set de joyería: collar, pulsera y aretes a juego en tonos tierra', status: 'Pendiente', date: '2025-01-03', phone: '330-456-7890', budget: '80000-100000' },
    ];
  });

  const [returns, setReturns] = useState<Return[]>(() => {
    const saved = localStorage.getItem('nudostudio-returns');
    return saved ? JSON.parse(saved) : [];
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('nudostudio-blogPosts');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'El Arte del Macramé: Una Tradición Milenaria',
        excerpt: 'Descubre la historia fascinante del macramé y cómo esta antigua técnica de anudado ha evolucionado hasta convertirse en una forma de arte contemporánea.',
        content: 'El macramé es una técnica de creación de textiles que utiliza nudos en lugar de tejer o hacer ganchillo. La palabra macramé deriva del árabe migramah, que significa fleco ornamental...',
        image: '/api/placeholder/400/250',
        author: 'Isabella Ariza',
        date: '2024-01-15',
        category: 'Historia',
        tags: ['macramé', 'historia', 'arte'],
        status: 'published'
      },
      {
        id: 2,
        title: 'Materiales Esenciales para Comenzar en el Macramé',
        excerpt: 'Una guía completa sobre los materiales básicos que necesitas para empezar tu viaje en el mundo del macramé, desde cuerdas hasta herramientas especializadas.',
        content: 'Para comenzar en el macramé, es importante conocer los materiales básicos. Las cuerdas de algodón son ideales para principiantes debido a su suavidad y facilidad de manejo...',
        image: '/api/placeholder/400/250',
        author: 'Carlos Mendoza',
        date: '2024-01-10',
        category: 'Tutoriales',
        tags: ['materiales', 'principiantes', 'guía'],
        status: 'published'
      },
      {
        id: 3,
        title: 'Tendencias 2024: Macramé en Decoración de Interiores',
        excerpt: 'Explora las últimas tendencias en decoración con macramé para 2024 y cómo incorporar estas piezas artesanales en espacios modernos.',
        content: 'El macramé ha regresado con fuerza en el mundo del diseño de interiores. Las tendencias 2024 muestran una preferencia por piezas minimalistas con líneas limpias...',
        image: '/api/placeholder/400/250',
        author: 'Isabella Ariza',
        date: '2024-01-05',
        category: 'Tendencias',
        tags: ['decoración', 'tendencias', '2024'],
        status: 'published'
      }
    ];
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('nudostudio-notifications');
    return saved ? JSON.parse(saved) : [];
  });

  const [activityLog, setActivityLog] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('nudostudio-activityLog');
    return saved ? JSON.parse(saved) : [];
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem('nudostudio-suppliers');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Textiles Andinos', contact: 'Juan Pérez', email: 'ventas@textilesandinos.com', phone: '310 123 4567', address: 'Cra 10 #20-30, Bogotá', category: 'Hilos', status: 'active', productsProvided: ['Hilo Algodón', 'Lana'] },
      { id: 2, name: 'Maderas del Valle', contact: 'Ana López', email: 'ana@maderasdelvalle.com', phone: '320 987 6543', address: 'Av 5 #15-20, Cali', category: 'Madera', status: 'active', productsProvided: ['Aros de Madera', 'Cuentas'] }
    ];
  });

  // GUARDAR EN LOCALSTORAGE CUANDO CAMBIAN LOS DATOS
  useEffect(() => {
    localStorage.setItem('nudostudio-users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('nudostudio-notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('nudostudio-activityLog', JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    localStorage.setItem('nudostudio-suppliers', JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem('nudostudio-currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nudostudio-workshops', JSON.stringify(workshops));
  }, [workshops]);

  useEffect(() => {
    localStorage.setItem('nudostudio-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nudostudio-quotes', JSON.stringify(quotes));
  }, [quotes]);

  useEffect(() => {
    localStorage.setItem('nudostudio-returns', JSON.stringify(returns));
  }, [returns]);

  useEffect(() => {
    localStorage.setItem('nudostudio-rolePermissions', JSON.stringify(rolePermissions));
  }, [rolePermissions]);

  useEffect(() => {
    localStorage.setItem('nudostudio-employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('nudostudio-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nudostudio-blogPosts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  // HELPERS PARA NOTIFICACIONES Y LOGS
  const addNotification = (type: Notification['type'], message: string, link?: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message,
      date: new Date().toISOString(),
      read: false,
      link
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const logActivity = (action: string, details: string, type: ActivityLog['type']) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      action,
      user: currentUser?.name || 'Sistema',
      details,
      date: new Date().toISOString(),
      type
    };
    setActivityLog(prev => [newLog, ...prev].slice(0, 50)); // Mantener solo los últimos 50 logs
  };

  // FUNCIONES DE USUARIOS
  const addUser = (user: User) => {
    setUsers([...users, user]);
    addNotification('user', `Nuevo usuario registrado: ${user.name}`);
    logActivity('Crear Usuario', `Se registró un nuevo usuario: ${user.name}`, 'create');
    toast.success('Usuario agregado exitosamente');
  };

  const updateUser = (userId: number, updatedUser: Partial<User>) => {
    const originalUser = users.find(u => u.id === userId);
    const updatedUserData = { ...originalUser, ...updatedUser };
    
    setUsers(users.map(u => u.id === userId ? updatedUserData : u));
    logActivity('Actualizar Usuario', `Se actualizó el usuario: ${originalUser?.name}`, 'update');
    
    // Si el usuario actualizado es el usuario actual, actualizar también currentUser
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(updatedUserData);
    }
    
    // Si se cambió el rol a "Empleado", crear automáticamente la tarjeta de empleado
    if (originalUser && originalUser.role !== 'Empleado' && updatedUser.role === 'Empleado') {
      const existingEmployee = employees.find(e => e.email === updatedUserData.email);
      if (!existingEmployee) {
        const newEmployee = {
          id: employees.length + 1,
          name: updatedUserData.name,
          email: updatedUserData.email,
          phone: updatedUserData.phone || '300-000-0000',
          documentType: updatedUserData.documentType || 'cedula',
          documentNumber: updatedUserData.documentNumber || '0000000000',
          position: 'Por definir',
          salary: 1300000,
          schedule: 'Lunes a Viernes 8:00 AM - 5:00 PM',
          address: updatedUserData.address || 'Por definir',
          role: 'Trabajador',
          status: true,
          hireDate: new Date().toISOString().split('T')[0],
          department: 'Producción',
          experience: 0,
          rating: 0,
          birthDate: '1990-01-01',
          contractType: 'Indefinido',
          supervisor: 'Por asignar',
          emergencyContact: { name: 'Por definir', phone: '300-000-0000' },
          eps: 'Por definir',
          bankInfo: { bank: 'Por definir', accountType: 'Ahorros', accountNumber: '****0000' },
          education: 'Por definir',
          certifications: [],
          studyCertificate: 'pendiente.pdf',
          bloodType: 'O+',
          allergies: 'Ninguna conocida',
          socialSecurity: '****0000',
          profilePhoto: ''
        };
        setEmployees([...employees, newEmployee]);
        toast.success('Usuario actualizado y tarjeta de empleado creada automáticamente');
      } else {
        toast.success('Usuario actualizado exitosamente');
      }
    } else {
      toast.success('Usuario actualizado exitosamente');
    }
  };

  const deleteUser = (userId: number) => {
    const user = users.find(u => u.id === userId);
    setUsers(users.filter(u => u.id !== userId));
    logActivity('Eliminar Usuario', `Se eliminó al usuario: ${user?.name}`, 'delete');
    toast.success('Usuario eliminado exitosamente');
  };

  const loginUser = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const updatedUser = users.find(u => u.id === user.id) || user;
      setCurrentUser(updatedUser);
      toast.success(`¡Bienvenido/a ${updatedUser.name}!`);
      return updatedUser;
    }
    toast.error('Email o contraseña incorrectos');
    return null;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('nudostudio-currentUser');
    toast.success('Sesión cerrada exitosamente');
  };

  // FUNCIONES DE TALLERES
  const addWorkshop = (workshop: Workshop) => {
    setWorkshops([...workshops, workshop]);
    logActivity('Crear Taller', `Se creó el taller: ${workshop.name}`, 'create');
    toast.success('Taller agregado exitosamente');
  };

  const updateWorkshop = (workshopId: number, updatedWorkshop: Partial<Workshop>) => {
    setWorkshops(workshops.map(w => w.id === workshopId ? { ...w, ...updatedWorkshop } : w));
    logActivity('Actualizar Taller', `Se actualizó el taller ID: ${workshopId}`, 'update');
    toast.success('Taller actualizado exitosamente');
  };

  const deleteWorkshop = (workshopId: number) => {
    const workshop = workshops.find(w => w.id === workshopId);
    setWorkshops(workshops.filter(w => w.id !== workshopId));
    logActivity('Eliminar Taller', `Se eliminó el taller: ${workshop?.name}`, 'delete');
    toast.success('Taller eliminado exitosamente');
  };

  const enrollInWorkshop = (workshopId: number, userId: number, enrollmentData?: { name: string; email: string; phone: string; experience: string }) => {
    const workshop = workshops.find(w => w.id === workshopId);
    const user = users.find(u => u.id === userId);
    if (!workshop || !user) return;

    if (workshop.students >= workshop.maxCapacity) {
      toast.error('El taller está lleno');
      return;
    }

    // Crear datos de inscripción
    const enrollmentInfo = {
      userId,
      name: enrollmentData?.name || user.name,
      email: enrollmentData?.email || user.email,
      phone: enrollmentData?.phone || user.phone,
      experience: enrollmentData?.experience || 'No especificado',
      enrollmentDate: new Date().toISOString().split('T')[0]
    };

    // Actualizar el taller
    setWorkshops(workshops.map(w => 
      w.id === workshopId 
        ? { 
            ...w, 
            students: w.students + 1, 
            revenue: w.revenue + w.price,
            enrolledUsers: [...(w.enrolledUsers || []), enrollmentInfo],
            status: w.students + 1 >= w.maxCapacity ? 'Completo' : w.status
          } 
        : w
    ));

    // Cambiar el rol del usuario a "Estudiante"
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: 'Estudiante' } : u
    ));

    addNotification('workshop', `Nueva inscripción: ${enrollmentInfo.name} en ${workshop.name}`);
    logActivity('Inscripción Taller', `${enrollmentInfo.name} se inscribió en ${workshop.name}`, 'update');
    toast.success('¡Inscripción exitosa! Tu rol ha sido actualizado a Estudiante');
  };

  const completeWorkshop = (workshopId: number) => {
    const workshop = workshops.find(w => w.id === workshopId);
    if (!workshop) return;

    // Cambiar el estado del taller a completado
    setWorkshops(workshops.map(w => 
      w.id === workshopId ? { ...w, status: 'Completado' } : w
    ));

    // Cambiar el rol de todos los usuarios inscritos de vuelta a "Cliente"
    const enrolledUserIds = (workshop.enrolledUsers || []).map(e => e.userId);
    setUsers(users.map(u => 
      enrolledUserIds.includes(u.id) ? { ...u, role: 'Cliente' } : u
    ));

    toast.success('Taller completado. Los roles de estudiantes han sido actualizados a Cliente');
  };

  // FUNCIONES DE PEDIDOS
  const addOrder = (order: Order) => {
    setOrders([...orders, order]);
    
    // Incrementar el contador de pedidos del usuario
    if (order.userId) {
      setUsers(users.map(u => 
        u.id === order.userId ? { ...u, orders: u.orders + 1 } : u
      ));
    }
    
    addNotification('order', `Nuevo pedido de ${order.customer}: ${order.items}`);
    logActivity('Nuevo Pedido', `Pedido #${order.id} creado por ${order.customer}`, 'create');
    toast.success('Pedido creado exitosamente');
  };

  const updateOrder = (orderId: number, updatedOrder: Partial<Order>) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, ...updatedOrder } : o));
    logActivity('Actualizar Pedido', `Se actualizó el estado del pedido #${orderId}`, 'update');
    toast.success('Pedido actualizado exitosamente');
  };

  const deleteOrder = (orderId: number) => {
    setOrders(orders.filter(o => o.id !== orderId));
    logActivity('Eliminar Pedido', `Se eliminó el pedido #${orderId}`, 'delete');
    toast.success('Pedido eliminado exitosamente');
  };

  // FUNCIONES DE COTIZACIONES
  const addQuote = (quote: Quote) => {
    setQuotes([...quotes, quote]);
    addNotification('quote', `Nueva cotización solicitada por ${quote.customer}`);
    logActivity('Nueva Cotización', `Cotización #${quote.id} solicitada por ${quote.customer}`, 'create');
    toast.success('Cotización enviada exitosamente');
  };

  const updateQuote = (quoteId: number, updatedQuote: Partial<Quote>) => {
    setQuotes(quotes.map(q => q.id === quoteId ? { ...q, ...updatedQuote } : q));
    logActivity('Actualizar Cotización', `Se actualizó la cotización #${quoteId}`, 'update');
    toast.success('Cotización actualizada exitosamente');
  };

  const deleteQuote = (quoteId: number) => {
    setQuotes(quotes.filter(q => q.id !== quoteId));
    logActivity('Eliminar Cotización', `Se eliminó la cotización #${quoteId}`, 'delete');
    toast.success('Cotización eliminada exitosamente');
  };

  // FUNCIONES DE DEVOLUCIONES
  const addReturn = (returnRequest: Return) => {
    setReturns([...returns, returnRequest]);
    addNotification('return', `Nueva solicitud de devolución: ${returnRequest.returnNumber}`);
    logActivity('Nueva Devolución', `Solicitud de devolución ${returnRequest.returnNumber} creada`, 'create');
    toast.success('Solicitud de devolución creada exitosamente');
  };

  const updateReturn = (returnId: number, updatedReturn: Partial<Return>) => {
    setReturns(returns.map(r => r.id === returnId ? { ...r, ...updatedReturn } : r));
    logActivity('Actualizar Devolución', `Se actualizó la devolución #${returnId}`, 'update');
    toast.success('Devolución actualizada exitosamente');
  };

  const deleteReturn = (returnId: number) => {
    setReturns(returns.filter(r => r.id !== returnId));
    logActivity('Eliminar Devolución', `Se eliminó la devolución #${returnId}`, 'delete');
    toast.success('Devolución eliminada exitosamente');
  };

  const respondToReturn = (returnId: number, approved: boolean, reason: string, message: string, alternative?: string) => {
    const returnToUpdate = returns.find(r => r.id === returnId);
    const userEmail = users.find(u => u.id === returnToUpdate?.userId)?.email;
    const userName = users.find(u => u.id === returnToUpdate?.userId)?.name;

    setReturns(returns.map(r => 
      r.id === returnId 
        ? { 
            ...r, 
            status: approved ? 'Aprobada' : 'Rechazada',
            processedDate: new Date().toISOString().split('T')[0],
            adminResponse: { 
              approved, 
              reason, 
              message,
              alternative 
            } 
          }
        : r
    ));

    // Enviar email de notificación
    if (userEmail && userName) {
      sendReturnResponseEmail(userName, userEmail, {
        approved,
        reason,
        message,
        alternativeProduct: alternative
      }).then(success => {
        if (success) {
          console.log('✅ Email de devolución enviado a', userEmail);
        } else {
          console.log('⚠️ No se pudo enviar el email, pero la devolución se registró');
        }
      });
    }

    toast.success(approved ? 'Devolución aprobada y notificación enviada' : 'Devolución rechazada y notificación enviada');
  };

  // FUNCIONES DE PERMISOS POR ROL
  const updateRolePermissions = (role: string, permissions: RolePermissions) => {
    setRolePermissions(prev => ({ ...prev, [role]: permissions }));
    
    // Actualizar permisos de todos los usuarios con ese rol
    setUsers(users.map(user => 
      user.role === role ? { ...user, permissions } : user
    ));
    
    toast.success(`Permisos actualizados para el rol ${role}`);
  };

  // FUNCIONES DE EMPLEADOS
  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
    logActivity('Crear Empleado', `Se agregó al empleado: ${employee.name}`, 'create');
    toast.success('Empleado agregado exitosamente');
  };

  const updateEmployee = (employeeId: number, updatedEmployee: Partial<Employee>) => {
    setEmployees(employees.map(e => e.id === employeeId ? { ...e, ...updatedEmployee } : e));
    logActivity('Actualizar Empleado', `Se actualizaron datos del empleado ID: ${employeeId}`, 'update');
    toast.success('Empleado actualizado exitosamente');
  };

  const deleteEmployee = (employeeId: number) => {
    const employee = employees.find(e => e.id === employeeId);
    setEmployees(employees.filter(e => e.id !== employeeId));
    logActivity('Eliminar Empleado', `Se eliminó al empleado: ${employee?.name}`, 'delete');
    toast.success('Empleado eliminado exitosamente');
  };

  // FUNCIONES DE PRODUCTOS
  const addProduct = (product: Product) => {
    setProducts([...products, product]);
    logActivity('Crear Producto', `Se agregó el producto: ${product.name}`, 'create');
    toast.success('Producto agregado exitosamente');
  };

  const updateProduct = (productId: number, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => p.id === productId ? { ...p, ...updatedProduct } : p));
    logActivity('Actualizar Producto', `Se actualizó el producto ID: ${productId}`, 'update');
    toast.success('Producto actualizado exitosamente');
  };

  const deleteProduct = (productId: number) => {
    const product = products.find(p => p.id === productId);
    setProducts(products.filter(p => p.id !== productId));
    logActivity('Eliminar Producto', `Se eliminó el producto: ${product?.name}`, 'delete');
    toast.success('Producto eliminado exitosamente');
  };

  // FUNCIONES DE BLOG
  const addBlogPost = (post: BlogPost) => {
    setBlogPosts([...blogPosts, post]);
    logActivity('Crear Blog', `Se creó el artículo: ${post.title}`, 'create');
    toast.success('Artículo agregado exitosamente');
  };

  const updateBlogPost = (postId: number, updatedPost: Partial<BlogPost>) => {
    setBlogPosts(blogPosts.map(p => p.id === postId ? { ...p, ...updatedPost } : p));
    logActivity('Actualizar Blog', `Se actualizó el artículo ID: ${postId}`, 'update');
    toast.success('Artículo actualizado exitosamente');
  };

  const deleteBlogPost = (postId: number) => {
    const post = blogPosts.find(p => p.id === postId);
    setBlogPosts(blogPosts.filter(p => p.id !== postId));
    logActivity('Eliminar Blog', `Se eliminó el artículo: ${post?.title}`, 'delete');
    toast.success('Artículo eliminado exitosamente');
  };

  // FUNCIONES DE PROVEEDORES
  const addSupplier = (supplier: Supplier) => {
    setSuppliers([...suppliers, supplier]);
    logActivity('Crear Proveedor', `Se agregó el proveedor: ${supplier.name}`, 'create');
    toast.success('Proveedor agregado exitosamente');
  };

  const updateSupplier = (supplierId: number, updatedSupplier: Partial<Supplier>) => {
    setSuppliers(suppliers.map(s => s.id === supplierId ? { ...s, ...updatedSupplier } : s));
    logActivity('Actualizar Proveedor', `Se actualizó el proveedor ID: ${supplierId}`, 'update');
    toast.success('Proveedor actualizado exitosamente');
  };

  const deleteSupplier = (supplierId: number) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    setSuppliers(suppliers.filter(s => s.id !== supplierId));
    logActivity('Eliminar Proveedor', `Se eliminó el proveedor: ${supplier?.name}`, 'delete');
    toast.success('Proveedor eliminado exitosamente');
  };

  const value = {
    users,
    currentUser,
    setCurrentUser,
    addUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    rolePermissions,
    updateRolePermissions,
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
    returns,
    addReturn,
    updateReturn,
    deleteReturn,
    respondToReturn,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    notifications,
    markNotificationAsRead,
    clearNotifications,
    activityLog,
    logActivity,
    suppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
