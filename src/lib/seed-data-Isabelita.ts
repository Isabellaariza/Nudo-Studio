// Initial seed data for Nudo Studio
// This file contains demo data to populate the platform

export const seedUsers = [
  {
    email: 'admin@demo.com',
    password: 'admin123',
    name: 'Administrador Nudo',
    role: 'admin',
  },
  {
    email: 'user@demo.com',
    password: 'password123',
    name: 'Cliente Demo',
    role: 'client',
  },
];

export const seedProducts = [
  // Macramé
  {
    name: 'Tapiz de Macramé Luna',
    description: 'Hermoso tapiz tejido a mano con diseño de luna creciente. Perfecto para decorar cualquier espacio con un toque bohemio y elegante.',
    price: 1250,
    category: 'macrame',
    imageUrl: 'https://images.unsplash.com/photo-1632761644913-0da6105863cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwd2FsbCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYxNTExMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 5,
  },
  {
    name: 'Cortina de Macramé',
    description: 'Cortina decorativa tejida en macramé. Perfecto como separador de ambientes o elemento decorativo en puertas y ventanas.',
    price: 1800,
    category: 'macrame',
    imageUrl: 'https://images.unsplash.com/photo-1632761644913-0da6105863cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwd2FsbCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYxNTExMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 3,
  },
  {
    name: 'Colgante Triple para Plantas',
    description: 'Set de tres colgantes en macramé para plantas de diferentes tamaños. Incluye soporte de madera y acabados en algodón natural.',
    price: 950,
    category: 'macrame',
    imageUrl: 'https://images.unsplash.com/photo-1645129603960-f1ba77dbd198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwcGxhbnQlMjBoYW5nZXJ8ZW58MXx8fHwxNzYxNTc5MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 7,
  },
  {
    name: 'Posavasos Set Macramé',
    description: 'Set de 4 posavasos tejidos en macramé con diseños geométricos. Protege tus mesas con estilo artesanal.',
    price: 320,
    category: 'macrame',
    imageUrl: 'https://images.unsplash.com/photo-1599241313617-d888d2791a09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwY29hc3RlcnxlbnwxfHx8fDE3NjE1NzkyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 12,
  },
  
  // Joyería Textil
  {
    name: 'Collar Textil Artesanal',
    description: 'Collar único hecho con hilos naturales y cuentas de madera. Una pieza de joyería textil que combina tradición y modernidad.',
    price: 450,
    category: 'joyeria',
    imageUrl: 'https://images.unsplash.com/photo-1653227907864-560dce4c252d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwamV3ZWxyeSUyMGhhbmRtYWRlfGVufDF8fHx8MTc2MTU3Nzc0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 12,
  },
  {
    name: 'Aretes Bohemios Dorados',
    description: 'Aretes ligeros y elegantes con hilos de algodón y acentos dorados. Perfectos para cualquier ocasión.',
    price: 280,
    category: 'joyeria',
    imageUrl: 'https://images.unsplash.com/photo-1756792340190-2039b9a1787d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hlbWlhbiUyMGVhcnJpbmdzfGVufDF8fHx8MTc2MTU3OTIzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 18,
  },
  {
    name: 'Collar Largo Textil',
    description: 'Collar largo tejido con técnicas mixtas, cuentas de cerámica y flecos. Una pieza statement única.',
    price: 680,
    category: 'joyeria',
    imageUrl: 'https://images.unsplash.com/photo-1611012844392-f4f96c7fd052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwbmVja2xhY2V8ZW58MXx8fHwxNzYxNTc5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 8,
  },
  {
    name: 'Set de Pulseras Trenzadas',
    description: 'Set de 3 pulseras tejidas en diferentes patrones y colores naturales. Se pueden usar juntas o por separado.',
    price: 350,
    category: 'joyeria',
    imageUrl: 'https://images.unsplash.com/photo-1756792339453-bc4aa26fc0cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGJyYWNlbGV0JTIwYXJ0aXNhbnxlbnwxfHx8fDE3NjE1NzkyMzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 15,
  },
  
  // Accesorios
  {
    name: 'Bolso Tejido Tote',
    description: 'Bolso tejido a mano en algodón orgánico. Espacioso, duradero y perfecto para el día a día con estilo sostenible.',
    price: 850,
    category: 'accesorios',
    imageUrl: 'https://images.unsplash.com/photo-1588122698107-836d3c39704c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMHRvdGUlMjBiYWd8ZW58MXx8fHwxNzYxNTc5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 10,
  },
  {
    name: 'Llavero Macramé',
    description: 'Llavero artesanal tejido en macramé con detalles de cuentas de madera. Regalo perfecto y funcional.',
    price: 180,
    category: 'accesorios',
    imageUrl: 'https://images.unsplash.com/photo-1503792070985-b4147d061915?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwa2V5Y2hhaW58ZW58MXx8fHwxNzYxNTc5MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 25,
  },
  {
    name: 'Diadema Tejida Artesanal',
    description: 'Diadema tejida con hilos de algodón y detalles bordados. Cómoda y elegante para cualquier ocasión.',
    price: 290,
    category: 'accesorios',
    imageUrl: 'https://images.unsplash.com/photo-1653227907864-560dce4c252d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwamV3ZWxyeSUyMGhhbmRtYWRlfGVufDF8fHx8MTc2MTU3Nzc0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 14,
  },
  
  // Decoración
  {
    name: 'Colgante Individual para Planta',
    description: 'Colgante individual para planta tejido en macramé. Ideal para dar vida a tus espacios de forma original.',
    price: 380,
    category: 'decoracion',
    imageUrl: 'https://images.unsplash.com/photo-1645129603960-f1ba77dbd198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwcGxhbnQlMjBoYW5nZXJ8ZW58MXx8fHwxNzYxNTc5MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 8,
  },
  {
    name: 'Atrapasueños Artesanal Grande',
    description: 'Atrapasueños tejido a mano con plumas naturales y cuentas de madera. Pieza decorativa llena de significado.',
    price: 720,
    category: 'decoracion',
    imageUrl: 'https://images.unsplash.com/photo-1632761644913-0da6105863cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwd2FsbCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYxNTExMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 6,
  },
  {
    name: 'Guirnalda Decorativa Tejida',
    description: 'Guirnalda tejida con formas geométricas y colores naturales. Perfecta para decorar habitaciones o eventos.',
    price: 480,
    category: 'decoracion',
    imageUrl: 'https://images.unsplash.com/photo-1632761644913-0da6105863cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwd2FsbCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYxNTExMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    stock: 9,
  },
];

export const seedWorkshops = [
  {
    title: 'Introducción al Macramé',
    description: 'Aprende los nudos básicos y crea tu primer proyecto de macramé. Ideal para principiantes que quieren explorar este hermoso arte textil.',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(), // 4 hours duration
    maxCapacity: 10,
    totalCost: 800,
    depositRequired: 300,
  },
  {
    title: 'Macramé Avanzado: Tapices',
    description: 'Perfecciona tus habilidades y aprende a crear tapices complejos con diferentes técnicas de anudado y diseños avanzados.',
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString(), // 6 hours duration
    maxCapacity: 8,
    totalCost: 1200,
    depositRequired: 500,
  },
  {
    title: 'Joyería Textil Contemporánea',
    description: 'Combina técnicas de tejido y anudado para crear piezas únicas de joyería. Aprende a trabajar con diferentes materiales y acabados.',
    startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(), // 5 hours duration
    maxCapacity: 12,
    totalCost: 950,
    depositRequired: 400,
  },
];

export const seedNews = [
  {
    title: 'Nueva Colección Primavera 2025',
    content: 'Estamos emocionados de presentar nuestra nueva colección de primavera, inspirada en los colores y texturas de la naturaleza. Cada pieza ha sido cuidadosamente diseñada y tejida a mano para reflejar la belleza de la temporada. Descubre tapices florales, accesorios en tonos pastel y nuevos diseños de joyería textil que capturan la esencia de la primavera. La colección incluye piezas exclusivas en tonos verde menta, rosa suave y beige natural, perfectas para renovar tus espacios.',
    imageUrl: 'https://images.unsplash.com/photo-1632761644913-0da6105863cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwd2FsbCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYxNTExMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: '¡Nuevos Talleres Disponibles!',
    content: 'Abrimos inscripciones para nuestros talleres de macramé y joyería textil. Aprende técnicas tradicionales y contemporáneas de la mano de artesanas expertas. Ofrecemos tres niveles: principiante, intermedio y avanzado. Cada taller incluye todos los materiales necesarios y te llevarás a casa tu propia creación. Cupos limitados a 10-12 personas para garantizar atención personalizada. ¡No te pierdas esta oportunidad de aprender un arte milenario!',
    imageUrl: 'https://images.unsplash.com/photo-1760637626191-fa20283f6fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY3JhZnQlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NjE1MTMzNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Compromiso con la Sostenibilidad',
    content: 'En NUDO STUDIO estamos comprometidos con el medio ambiente y las prácticas sostenibles. Todos nuestros productos están elaborados con materiales naturales y biodegradables: algodón orgánico, fibras naturales, madera certificada y tintes ecológicos. Trabajamos con proveedores locales para reducir nuestra huella de carbono y apoyamos el comercio justo. Cada compra contribuye a preservar técnicas artesanales ancestrales y apoyar a comunidades de artesanos.',
    imageUrl: 'https://images.unsplash.com/photo-1645129603960-f1ba77dbd198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwcGxhbnQlMjBoYW5nZXJ8ZW58MXx8fHwxNzYxNTc5MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Colección Especial: Joyería Textil Contemporánea',
    content: 'Presentamos nuestra nueva línea de joyería textil que fusiona técnicas ancestrales con diseño contemporáneo. Collares, aretes y pulseras únicos que combinan hilos naturales, cuentas de cerámica artesanal y detalles en metales nobles. Cada pieza es única y viene con un certificado de autenticidad. Perfectas para quienes buscan accesorios con historia y significado. Disponibles en edición limitada.',
    imageUrl: 'https://images.unsplash.com/photo-1653227907864-560dce4c252d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXh0aWxlJTIwamV3ZWxyeSUyMGhhbmRtYWRlfGVufDF8fHx8MTc2MTU3Nzc0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Personaliza tus Piezas',
    content: 'Ahora ofrecemos servicio de personalización para nuestros productos. ¿Quieres un tapiz en colores específicos? ¿Un collar con tus iniciales? ¿Un regalo único para alguien especial? Trabajamos contigo para crear piezas únicas que reflejen tu estilo personal. El proceso incluye una consulta inicial, propuesta de diseño y seguimiento durante la creación. Contáctanos para más información sobre precios y tiempos de entrega.',
    imageUrl: 'https://images.unsplash.com/photo-1632761644913-0da6105863cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNyYW1lJTIwd2FsbCUyMGhhbmdpbmd8ZW58MXx8fHwxNzYxNTExMTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'NUDO STUDIO en Ferias Artesanales',
    content: 'Nos emociona anunciar que estaremos presentes en las principales ferias artesanales de la región durante este año. Podrás conocer nuestros productos en persona, aprender sobre nuestro proceso creativo y participar en demostraciones en vivo. Además, tendremos ofertas especiales exclusivas para visitantes de las ferias. Síguenos en redes sociales para conocer fechas y ubicaciones. ¡Esperamos verte allí!',
    imageUrl: 'https://images.unsplash.com/photo-1588122698107-836d3c39704c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3ZlbiUyMHRvdGUlMjBiYWd8ZW58MXx8fHwxNzYxNTc5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export const seedOrders = [
  {
    userId: 'user-demo-id', // Este ID se reemplazará con el ID real del usuario cliente
    items: [
      { 
        productId: 'product-1-id', // Tapiz de Macramé Luna
        quantity: 1, 
        price: 1250 
      },
      { 
        productId: 'product-5-id', // Collar Textil Artesanal
        quantity: 2, 
        price: 450 
      },
      { 
        productId: 'product-10-id', // Llavero Macramé
        quantity: 3, 
        price: 180 
      }
    ],
    totalAmount: 2690,
    status: 'pending', // pending, paid, shipped, delivered, cancelled
    shippingAddress: {
      name: 'Cliente Demo',
      street: 'Av. Reforma 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      zipCode: '01000',
      phone: '+52 55 1234 5678'
    },
    paymentMethod: 'transfer', // transfer, card, cash
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  }
];
