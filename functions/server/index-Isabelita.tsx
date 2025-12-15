import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Helper function to verify auth token
async function verifyAuth(authHeader: string | undefined) {
  try {
    const accessToken = authHeader?.split(' ')[1];
    if (!accessToken) {
      return { error: 'No authorization token', status: 401 };
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return { error: 'Invalid or expired token', status: 401 };
    }

    return { user };
  } catch (error) {
    return { error: 'Authentication failed', status: 401 };
  }
}

// ==================== AUTH ROUTES ====================

app.post('/api/signup', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, role = 'client' } = body;

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password and name are required' }, 400);
    }

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, role },
      email_confirm: true,
    });

    if (authError) {
      console.log('Auth error during signup:', authError);
      return c.json({ error: authError.message }, 400);
    }

    await kv.set(`user:${authData.user.id}`, {
      id: authData.user.id,
      email,
      name,
      role,
      createdAt: new Date().toISOString(),
    });

    return c.json({ 
      user: {
        id: authData.user.id,
        email,
        name,
        role,
      }
    });
  } catch (error) {
    console.log('Error in signup:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

app.get('/api/user', async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header('Authorization'));
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status || 401);
    }

    const user = authResult.user!;
    let userProfile = await kv.get(`user:${user.id}`);
    
    if (!userProfile) {
      userProfile = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || 'Usuario',
        role: user.user_metadata?.role || 'client',
        createdAt: new Date().toISOString(),
      };
      await kv.set(`user:${user.id}`, userProfile);
    }
    
    return c.json({ user: userProfile });
  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// ==================== PRODUCTS ROUTES ====================

app.get('/api/products', async (c) => {
  try {
    const products = await kv.getByPrefix('product:');
    return c.json({ products: products || [] });
  } catch (error) {
    console.log('Error getting products:', error);
    return c.json({ error: 'Error fetching products' }, 500);
  }
});

app.get('/api/products/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const product = await kv.get(`product:${id}`);
    
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }
    
    return c.json({ product });
  } catch (error) {
    console.log('Error getting product:', error);
    return c.json({ error: 'Error fetching product' }, 500);
  }
});

app.post('/api/products', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const body = await c.req.json();
    const { name, description, price, category, imageUrl, stock } = body;

    const productId = crypto.randomUUID();
    const product = {
      id: productId,
      name,
      description,
      price,
      category,
      imageUrl,
      stock: stock || 0,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`product:${productId}`, product);

    return c.json({ product });
  } catch (error) {
    console.log('Error creating product:', error);
    return c.json({ error: 'Error creating product' }, 500);
  }
});

app.put('/api/products/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const id = c.req.param('id');
    const body = await c.req.json();

    const existingProduct = await kv.get(`product:${id}`);
    if (!existingProduct) {
      return c.json({ error: 'Product not found' }, 404);
    }

    const updatedProduct = {
      ...existingProduct,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`product:${id}`, updatedProduct);

    return c.json({ product: updatedProduct });
  } catch (error) {
    console.log('Error updating product:', error);
    return c.json({ error: 'Error updating product' }, 500);
  }
});

app.delete('/api/products/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const id = c.req.param('id');
    await kv.del(`product:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting product:', error);
    return c.json({ error: 'Error deleting product' }, 500);
  }
});

// ==================== WORKSHOPS ROUTES ====================

app.get('/api/workshops', async (c) => {
  try {
    const workshops = await kv.getByPrefix('workshop:');
    return c.json({ workshops: workshops || [] });
  } catch (error) {
    console.log('Error getting workshops:', error);
    return c.json({ error: 'Error fetching workshops' }, 500);
  }
});

app.post('/api/workshops', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const body = await c.req.json();
    const { title, description, startDate, endDate, maxCapacity, totalCost, depositRequired } = body;

    const workshopId = crypto.randomUUID();
    const workshop = {
      id: workshopId,
      title,
      description,
      startDate,
      endDate,
      maxCapacity,
      totalCost,
      depositRequired,
      currentParticipants: 0,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`workshop:${workshopId}`, workshop);

    return c.json({ workshop });
  } catch (error) {
    console.log('Error creating workshop:', error);
    return c.json({ error: 'Error creating workshop' }, 500);
  }
});

app.put('/api/workshops/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const id = c.req.param('id');
    const body = await c.req.json();

    const existingWorkshop = await kv.get(`workshop:${id}`);
    if (!existingWorkshop) {
      return c.json({ error: 'Workshop not found' }, 404);
    }

    const updatedWorkshop = {
      ...existingWorkshop,
      ...body,
      id,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`workshop:${id}`, updatedWorkshop);

    return c.json({ workshop: updatedWorkshop });
  } catch (error) {
    console.log('Error updating workshop:', error);
    return c.json({ error: 'Error updating workshop' }, 500);
  }
});

app.delete('/api/workshops/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const id = c.req.param('id');
    
    const registrations = await kv.getByPrefix(`registration:workshop:${id}`);
    for (const reg of registrations) {
      await kv.del(`registration:workshop:${id}:user:${reg.userId}`);
      await kv.del(`registration:user:${reg.userId}:workshop:${id}`);
    }
    
    await kv.del(`workshop:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting workshop:', error);
    return c.json({ error: 'Error deleting workshop' }, 500);
  }
});

// ==================== WORKSHOP REGISTRATIONS ====================

app.post('/api/workshops/:id/register', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const workshopId = c.req.param('id');
    const body = await c.req.json();
    const { depositPaid } = body;

    const workshop = await kv.get(`workshop:${workshopId}`);
    if (!workshop) {
      return c.json({ error: 'Workshop not found' }, 404);
    }

    if (workshop.currentParticipants >= workshop.maxCapacity) {
      return c.json({ error: 'Workshop is full' }, 400);
    }

    const existingReg = await kv.get(`registration:workshop:${workshopId}:user:${user.id}`);
    if (existingReg) {
      return c.json({ error: 'Already registered for this workshop' }, 400);
    }

    const registration = {
      id: crypto.randomUUID(),
      workshopId,
      userId: user.id,
      userName: (await kv.get(`user:${user.id}`))?.name || '',
      depositPaid: depositPaid || 0,
      totalPaid: depositPaid || 0,
      totalCost: workshop.totalCost,
      remainingBalance: workshop.totalCost - (depositPaid || 0),
      registeredAt: new Date().toISOString(),
    };

    await kv.set(`registration:workshop:${workshopId}:user:${user.id}`, registration);
    await kv.set(`registration:user:${user.id}:workshop:${workshopId}`, registration);

    workshop.currentParticipants = (workshop.currentParticipants || 0) + 1;
    await kv.set(`workshop:${workshopId}`, workshop);

    // CAMBIAR EL ROL DEL USUARIO A "student"
    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile) {
      userProfile.role = 'student';
      await kv.set(`user:${user.id}`, userProfile);
    }

    return c.json({ registration, userRoleUpdated: 'student' });
  } catch (error) {
    console.log('Error registering for workshop:', error);
    return c.json({ error: 'Error registering for workshop' }, 500);
  }
});

app.get('/api/workshops/:id/registrations', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const workshopId = c.req.param('id');
    const registrations = await kv.getByPrefix(`registration:workshop:${workshopId}`);

    return c.json({ registrations: registrations || [] });
  } catch (error) {
    console.log('Error getting registrations:', error);
    return c.json({ error: 'Error fetching registrations' }, 500);
  }
});

app.get('/api/my-workshops', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const registrations = await kv.getByPrefix(`registration:user:${user.id}`);

    return c.json({ registrations: registrations || [] });
  } catch (error) {
    console.log('Error getting user workshops:', error);
    return c.json({ error: 'Error fetching your workshops' }, 500);
  }
});

app.post('/api/registrations/:registrationId/payment', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const body = await c.req.json();
    const { workshopId, userId, amount } = body;

    const registration = await kv.get(`registration:workshop:${workshopId}:user:${userId}`);
    if (!registration) {
      return c.json({ error: 'Registration not found' }, 404);
    }

    registration.totalPaid = (registration.totalPaid || 0) + amount;
    registration.remainingBalance = registration.totalCost - registration.totalPaid;

    await kv.set(`registration:workshop:${workshopId}:user:${userId}`, registration);
    await kv.set(`registration:user:${userId}:workshop:${workshopId}`, registration);

    const paymentId = crypto.randomUUID();
    await kv.set(`payment:${paymentId}`, {
      id: paymentId,
      workshopId,
      userId,
      amount,
      date: new Date().toISOString(),
    });

    return c.json({ registration });
  } catch (error) {
    console.log('Error recording payment:', error);
    return c.json({ error: 'Error recording payment' }, 500);
  }
});

app.delete('/api/workshops/:workshopId/registrations/:userId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const workshopId = c.req.param('workshopId');
    const userId = c.req.param('userId');

    await kv.del(`registration:workshop:${workshopId}:user:${userId}`);
    await kv.del(`registration:user:${userId}:workshop:${workshopId}`);

    const workshop = await kv.get(`workshop:${workshopId}`);
    if (workshop) {
      workshop.currentParticipants = Math.max(0, (workshop.currentParticipants || 0) - 1);
      await kv.set(`workshop:${workshopId}`, workshop);
    }

    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting registration:', error);
    return c.json({ error: 'Error deleting registration' }, 500);
  }
});

// Completar un taller y cambiar roles de estudiantes de vuelta a clientes
app.post('/api/workshops/:id/complete', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const workshopId = c.req.param('id');
    
    const workshop = await kv.get(`workshop:${workshopId}`);
    if (!workshop) {
      return c.json({ error: 'Workshop not found' }, 404);
    }

    // Marcar el taller como completado
    workshop.status = 'completed';
    workshop.completedAt = new Date().toISOString();
    await kv.set(`workshop:${workshopId}`, workshop);

    // Obtener todas las inscripciones del taller
    const registrations = await kv.getByPrefix(`registration:workshop:${workshopId}`);
    
    // Cambiar el rol de todos los estudiantes inscritos de vuelta a "client"
    for (const registration of registrations) {
      const studentProfile = await kv.get(`user:${registration.userId}`);
      if (studentProfile && studentProfile.role === 'student') {
        studentProfile.role = 'client';
        await kv.set(`user:${registration.userId}`, studentProfile);
      }
    }

    return c.json({ 
      success: true, 
      message: 'Workshop completed and student roles updated to client',
      affectedUsers: registrations.length
    });
  } catch (error) {
    console.log('Error completing workshop:', error);
    return c.json({ error: 'Error completing workshop' }, 500);
  }
});

// ==================== CART ROUTES ====================

app.get('/api/cart', async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header('Authorization'));
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status || 401);
    }

    const user = authResult.user!;
    const cartItems = await kv.getByPrefix(`cart:${user.id}`);

    return c.json({ items: cartItems || [] });
  } catch (error) {
    console.log('Error getting cart:', error);
    return c.json({ error: 'Error fetching cart' }, 500);
  }
});

app.post('/api/cart', async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header('Authorization'));
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status || 401);
    }

    const user = authResult.user!;
    const body = await c.req.json();
    const { productId, quantity } = body;

    const product = await kv.get(`product:${productId}`);
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }

    const cartItem = {
      id: crypto.randomUUID(),
      userId: user.id,
      productId,
      product,
      quantity,
      addedAt: new Date().toISOString(),
    };

    await kv.set(`cart:${user.id}:${productId}`, cartItem);

    return c.json({ item: cartItem });
  } catch (error) {
    console.log('Error adding to cart:', error);
    return c.json({ error: 'Error adding to cart' }, 500);
  }
});

app.put('/api/cart/:productId', async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header('Authorization'));
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status || 401);
    }

    const user = authResult.user!;
    const productId = c.req.param('productId');
    const body = await c.req.json();
    const { quantity } = body;

    const cartItem = await kv.get(`cart:${user.id}:${productId}`);
    if (!cartItem) {
      return c.json({ error: 'Cart item not found' }, 404);
    }

    cartItem.quantity = quantity;
    cartItem.updatedAt = new Date().toISOString();

    await kv.set(`cart:${user.id}:${productId}`, cartItem);

    return c.json({ item: cartItem });
  } catch (error) {
    console.log('Error updating cart:', error);
    return c.json({ error: 'Error updating cart' }, 500);
  }
});

app.delete('/api/cart/:productId', async (c) => {
  try {
    const authResult = await verifyAuth(c.req.header('Authorization'));
    if (authResult.error) {
      return c.json({ error: authResult.error }, authResult.status || 401);
    }

    const user = authResult.user!;
    const productId = c.req.param('productId');
    await kv.del(`cart:${user.id}:${productId}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error removing from cart:', error);
    return c.json({ error: 'Error removing from cart' }, 500);
  }
});

// ==================== ORDERS ROUTES ====================

app.post('/api/orders', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { items, shippingAddress, totalAmount, paymentProof } = body;

    const orderId = crypto.randomUUID();
    const order = {
      id: orderId,
      userId: user.id,
      items,
      shippingAddress,
      totalAmount,
      paymentProof,
      status: 'pending',
      checklist: {
        paymentVerified: false,
        shippingComplete: false,
        inventoryChecked: false,
        packagingComplete: false,
      },
      createdAt: new Date().toISOString(),
    };

    await kv.set(`order:${orderId}`, order);
    await kv.set(`order:user:${user.id}:${orderId}`, order);

    const cartItems = await kv.getByPrefix(`cart:${user.id}`);
    for (const item of cartItems) {
      await kv.del(`cart:${user.id}:${item.productId}`);
    }

    return c.json({ order });
  } catch (error) {
    console.log('Error creating order:', error);
    return c.json({ error: 'Error creating order' }, 500);
  }
});

app.get('/api/orders', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    
    let orders;
    if (userProfile?.role === 'admin') {
      orders = await kv.getByPrefix('order:');
      orders = orders.filter((o: any) => !o.key?.includes('order:user:'));
    } else {
      orders = await kv.getByPrefix(`order:user:${user.id}`);
    }

    return c.json({ orders: orders || [] });
  } catch (error) {
    console.log('Error getting orders:', error);
    return c.json({ error: 'Error fetching orders' }, 500);
  }
});

app.put('/api/orders/:id/status', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const orderId = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;

    const order = await kv.get(`order:${orderId}`);
    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }

    order.status = status;
    order.updatedAt = new Date().toISOString();

    await kv.set(`order:${orderId}`, order);
    await kv.set(`order:user:${order.userId}:${orderId}`, order);

    return c.json({ order });
  } catch (error) {
    console.log('Error updating order status:', error);
    return c.json({ error: 'Error updating order status' }, 500);
  }
});

app.put('/api/orders/:id/checklist', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const orderId = c.req.param('id');
    const body = await c.req.json();
    const { checklist } = body;

    const order = await kv.get(`order:${orderId}`);
    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }

    order.checklist = checklist;
    order.updatedAt = new Date().toISOString();

    await kv.set(`order:${orderId}`, order);
    await kv.set(`order:user:${order.userId}:${orderId}`, order);

    return c.json({ order });
  } catch (error) {
    console.log('Error updating order checklist:', error);
    return c.json({ error: 'Error updating order checklist' }, 500);
  }
});

// ==================== NEWS ROUTES ====================

app.get('/api/news', async (c) => {
  try {
    const news = await kv.getByPrefix('news:');
    return c.json({ news: news || [] });
  } catch (error) {
    console.log('Error getting news:', error);
    return c.json({ error: 'Error fetching news' }, 500);
  }
});

app.post('/api/news', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const body = await c.req.json();
    const { title, content, imageUrl } = body;

    const newsId = crypto.randomUUID();
    const newsItem = {
      id: newsId,
      title,
      content,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    await kv.set(`news:${newsId}`, newsItem);

    return c.json({ news: newsItem });
  } catch (error) {
    console.log('Error creating news:', error);
    return c.json({ error: 'Error creating news' }, 500);
  }
});

app.delete('/api/news/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    if (userProfile?.role !== 'admin') {
      return c.json({ error: 'Admin access required' }, 403);
    }

    const id = c.req.param('id');
    await kv.del(`news:${id}`);

    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting news:', error);
    return c.json({ error: 'Error deleting news' }, 500);
  }
});

// Export the app for Supabase Edge Functions
Deno.serve(app.fetch);