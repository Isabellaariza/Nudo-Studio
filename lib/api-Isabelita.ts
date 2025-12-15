import { projectId, publicAnonKey } from '../utils/supabase/info';
import { createClient } from '@supabase/supabase-js';

const API_URL = `https://${projectId}.supabase.co/functions/v1/server/api`;

export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, name: string, role: string = 'client') => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          role: role
        }
      }
    });

    if (error) throw error;
    return data;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getSession: async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      // If there's an error, handle it silently for common cases
      if (error) {
        // Clear the session for any auth errors
        await supabase.auth.signOut();
        return null;
      }
      
      return data.session;
    } catch (error: any) {
      // Clear session on any error
      try {
        await supabase.auth.signOut();
      } catch (e) {
        // Ignore signOut errors
      }
      return null;
    }
  },

  getUser: async (accessToken: string) => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser(accessToken);
      
      if (error || !user) {
        return null;
      }

      // Verificar si es el admin por email
      const role = user.email === 'admin@demo.com' ? 'admin' : 'client';
      
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email,
          role: role
        }
      };
    } catch (error: any) {
      return null;
    }
  },
};

// Products API
export const productsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/products`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener productos');
    return response.json();
  },

  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener producto');
    return response.json();
  },

  create: async (product: any, accessToken: string) => {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear producto');
    }
    return response.json();
  },

  update: async (id: string, product: any, accessToken: string) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error('Error al actualizar producto');
    return response.json();
  },

  delete: async (id: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Error al eliminar producto');
    return response.json();
  },
};

// Workshops API
export const workshopsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/workshops`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener talleres');
    return response.json();
  },

  create: async (workshop: any, accessToken: string) => {
    const response = await fetch(`${API_URL}/workshops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(workshop),
    });

    if (!response.ok) throw new Error('Error al crear taller');
    return response.json();
  },

  update: async (id: string, workshop: any, accessToken: string) => {
    const response = await fetch(`${API_URL}/workshops/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(workshop),
    });

    if (!response.ok) throw new Error('Error al actualizar taller');
    return response.json();
  },

  delete: async (id: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/workshops/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Error al eliminar taller');
    return response.json();
  },

  register: async (id: string, depositPaid: number, accessToken: string) => {
    const response = await fetch(`${API_URL}/workshops/${id}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ depositPaid }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al registrarse en el taller');
    }
    return response.json();
  },

  getRegistrations: async (id: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/workshops/${id}/registrations`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener inscripciones');
    return response.json();
  },

  getMyWorkshops: async (accessToken: string) => {
    const response = await fetch(`${API_URL}/my-workshops`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener tus talleres');
    return response.json();
  },

  addPayment: async (workshopId: string, userId: string, amount: number, accessToken: string) => {
    const response = await fetch(`${API_URL}/registrations/${workshopId}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ workshopId, userId, amount }),
    });

    if (!response.ok) throw new Error('Error al registrar pago');
    return response.json();
  },

  deleteRegistration: async (workshopId: string, userId: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/workshops/${workshopId}/registrations/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Error al eliminar inscripción');
    return response.json();
  },

  completeWorkshop: async (id: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/workshops/${id}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Error al completar taller');
    return response.json();
  },
};

// Cart API
export const cartAPI = {
  get: async (accessToken: string) => {
    const response = await fetch(`${API_URL}/cart`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener carrito');
    return response.json();
  },

  add: async (productId: string, quantity: number, accessToken: string) => {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) throw new Error('Error al agregar al carrito');
    return response.json();
  },

  remove: async (productId: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Error al eliminar del carrito');
    return response.json();
  },

  updateQuantity: async (productId: string, quantity: number, accessToken: string) => {
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) throw new Error('Error al actualizar cantidad');
    return response.json();
  },
};

// Orders API
export const ordersAPI = {
  create: async (items: any[], shippingAddress: any, totalAmount: number, paymentProof: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ items, shippingAddress, totalAmount, paymentProof }),
    });

    if (!response.ok) throw new Error('Error al crear pedido');
    return response.json();
  },

  getAll: async (accessToken: string) => {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener pedidos');
    return response.json();
  },

  updateStatus: async (id: string, status: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/orders/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) throw new Error('Error al actualizar estado del pedido');
    return response.json();
  },

  updateChecklist: async (id: string, checklist: any, accessToken: string) => {
    const response = await fetch(`${API_URL}/orders/${id}/checklist`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ checklist }),
    });

    if (!response.ok) throw new Error('Error al actualizar checklist');
    return response.json();
  },
};

// News API
export const newsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/news`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    });

    if (!response.ok) throw new Error('Error al obtener novedades');
    return response.json();
  },

  create: async (news: any, accessToken: string) => {
    const response = await fetch(`${API_URL}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(news),
    });

    if (!response.ok) throw new Error('Error al crear novedad');
    return response.json();
  },

  delete: async (id: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) throw new Error('Error al eliminar novedad');
    return response.json();
  },
};