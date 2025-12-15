import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { AdminNavbar } from "./components/AdminNavbar";
import { Footer } from "./components/Footer";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { HomePage } from "./components/pages/HomePage";
import { ProductsPage } from "./components/pages/ProductsPage";
import { ServicesPage } from "./components/pages/ServicesPage";
import { WorkshopsPage } from "./components/pages/WorkshopsPage";
import { BlogPage } from "./components/pages/BlogPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { CartPage } from "./components/pages/CartPage";
import { LoginPage } from "./components/pages/LoginPage";
import { AdminPanel } from "./components/pages/AdminPanel";
import { auth, cartAPI, supabase } from "./lib/api";
import { toast, Toaster } from "sonner";
import { AppProvider, useApp } from "./contexts/AppContext";
import { AdminInitializer } from "./components/AdminInitializer";
import { DirectAdminAccess } from "./components/DirectAdminAccess";
import { WelcomeScreen } from "./components/WelcomeScreen";

function AppContent() {
  const { currentUser, setCurrentUser } = useApp();
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [forceAdmin, setForceAdmin] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadCartCount();
    }
  }, [currentUser, currentPage, refreshTrigger]);



  const loadCartCount = async () => {
    try {
      const session = await auth.getSession();
      if (!session?.access_token) {
        setCartItemCount(0);
        return;
      }

      const { items } = await cartAPI.get(session.access_token);
      const totalItems =
        items?.reduce(
          (sum: number, item: any) =>
            sum + (item.quantity || 1),
          0,
        ) || 0;
      setCartItemCount(totalItems);
    } catch (error: any) {
      console.error("Error loading cart count:", error);
      // If auth error, clear session
      if (
        error.message?.includes("Unauthorized") ||
        error.message?.includes("token")
      ) {
        setCurrentUser(null);
        await auth.signOut();
      }
      setCartItemCount(0);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCartItemCount(0);
    setCurrentPage("home");
    setForceAdmin(false);
    toast.success("Sesión cerrada");
  };

  const handleRefresh = async () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleForceAdmin = () => {
    setForceAdmin(true);
    setCurrentPage("admin");
  };

  const handleWelcomeContinue = () => {
    setShowWelcome(false);
    const isAdmin = currentUser?.email === 'patricia@nudostudio.com' && currentUser?.role === 'Admin';
    if (isAdmin) {
      setCurrentPage("admin");
      setForceAdmin(true);
    } else {
      setCurrentPage("home");
    }
  };

  const handleLoginSuccess = async () => {
    // El usuario ya está establecido por el contexto en LoginPage
    if (currentUser) {
      console.log('Usuario logueado:', currentUser);
      console.log('Rol del usuario:', currentUser.role);
      
      // Si es Patricia (Admin), mostrar bienvenida y luego ir al panel
      if (currentUser.email === 'patricia@nudostudio.com' && currentUser.role === 'Admin') {
        setShowWelcome(true);
      } else {
        // Mostrar pantalla de bienvenida para otros usuarios
        setShowWelcome(true);
      }
    } else {
      setCurrentPage("home");
    }
  };

  const handleNavigate = (page: string) => {
    // Si es Patricia (Admin), solo permitir navegar al panel de admin
    if (currentUser?.email === 'patricia@nudostudio.com' && currentUser?.role === 'Admin' && page !== "admin") {
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E0D1C0] relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#B8860B]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
        <div className="relative z-10 flex items-baseline gap-3">
          <div
            className="font-volkge-heavy text-[2.5rem] md:text-[3.5rem] tracking-[0.25em]"
            style={{ color: "#2D4B39" }}
          >
            NUDO
          </div>
          <div className="relative">
            <div
              className="absolute -left-2 top-0 bottom-0 w-[1px]"
              style={{
                backgroundColor: "#2D4B39",
                opacity: 0.3,
              }}
            />
            <div
              className="font-volkge-light text-[1rem] md:text-[1.5rem] tracking-[0.15em] pl-3"
              style={{ color: "#2D4B39", opacity: 0.75 }}
            >
              Studio
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    console.log('renderPage - currentPage:', currentPage);
    console.log('renderPage - user role:', currentUser?.role);
    
    // Si es Patricia (Admin) o forzado, mostrar panel de admin
    if (forceAdmin || (currentUser?.email === 'patricia@nudostudio.com' && currentUser?.role === 'Admin')) {
      console.log('Renderizando AdminPanel');
      return <AdminPanel user={currentUser} onLogout={handleLogout} />;
    }

    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "products":
        return (
          <ProductsPage
            user={currentUser}
            onNavigate={handleNavigate}
            onCartUpdate={loadCartCount}
          />
        );
      case "services":
        return <ServicesPage onNavigate={handleNavigate} />;
      case "workshops":
        return (
          <WorkshopsPage
            user={currentUser}
            onNavigate={handleNavigate}
          />
        );
      case "blog":
        return <BlogPage onNavigate={handleNavigate} />;
      case "profile":
        return currentUser ? (
          <ProfilePage user={currentUser} onLogout={handleLogout} />
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        );
      case "cart":
        return currentUser ? (
          <CartPage
            user={currentUser}
            onNavigate={handleNavigate}
            onCartUpdate={loadCartCount}
          />
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        );
      case "login":
        return (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        );
      case "admin":
        console.log('Switch case admin - renderizando AdminPanel');
        return <AdminPanel user={currentUser} onLogout={handleLogout} />;
      default:
        console.log('Switch default - renderizando HomePage');
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const isAdminPage = forceAdmin || (currentUser?.email === 'patricia@nudostudio.com' && currentUser?.role === 'Admin');

  return (
    <div className="min-h-screen bg-white">
      <AdminInitializer />

      {isAdminPage ? (
        <AdminNavbar user={currentUser} onLogout={handleLogout} onRefresh={handleRefresh} />
      ) : (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={currentUser}
          cartItemCount={cartItemCount}
          onLogout={handleLogout}
        />
      )}

      <main className="pt-20">{renderPage()}</main>

      {!isAdminPage && <Footer />}

      {showWelcome && (
        <WelcomeScreen
          user={currentUser}
          isAdmin={currentUser?.email === 'patricia@nudostudio.com' && currentUser?.role === 'Admin'}
          onContinue={handleWelcomeContinue}
        />
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#2D4B39",
            color: "white",
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}