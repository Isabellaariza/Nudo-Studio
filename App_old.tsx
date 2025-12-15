import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { AdminNavbar } from "./components/AdminNavbar";
import { Footer } from "./components/Footer";
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
import { AppProvider } from "./contexts/AppContext";
import { AdminInitializer } from "./components/AdminInitializer";
import { DirectAdminAccess } from "./components/DirectAdminAccess";
import { WelcomeScreen } from "./components/WelcomeScreen";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState<any>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [forceAdmin, setForceAdmin] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);

        if (
          event === "SIGNED_OUT" ||
          event === "TOKEN_REFRESHED"
        ) {
          if (!session) {
            setUser(null);
            setCartItemCount(0);
          } else if (event === "TOKEN_REFRESHED") {
            // Reload user data on token refresh
            checkAuth();
          }
        } else if (event === "SIGNED_IN") {
          checkAuth();
        }
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      loadCartCount();
    }
  }, [user, currentPage, refreshTrigger]);

  const checkAuth = async () => {
    try {
      const session = await auth.getSession();
      if (session?.access_token) {
        const userData = await auth.getUser(session.access_token);
        if (userData && userData.user) {
          setUser(userData.user);
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error: any) {
      // Silently handle - no session is not an error, it's a normal state
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

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
        setUser(null);
        await auth.signOut();
      }
      setCartItemCount(0);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setCartItemCount(0);
      setCurrentPage("home");
      setForceAdmin(false);
      toast.success("Sesión cerrada");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error al cerrar sesión");
    }
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
    const isAdmin = user?.email === "admin@demo.com" || user?.role === "admin";
    if (isAdmin) {
      setCurrentPage("admin");
    } else {
      setCurrentPage("home");
    }
  };

  const handleLoginSuccess = async () => {
    try {
      const session = await auth.getSession();
      if (session?.access_token) {
        const userData = await auth.getUser(session.access_token);
        if (userData && userData.user) {
          setUser(userData.user);
          console.log('Usuario logueado:', userData.user);
          console.log('Rol del usuario:', userData.user.role);

          // Mostrar pantalla de bienvenida
          setShowWelcome(true);
        } else {
          setCurrentPage("home");
        }
      } else {
        setCurrentPage("home");
      }
    } catch (error) {
      console.error('Error en handleLoginSuccess:', error);
      setCurrentPage("home");
    }
  };

  const handleNavigate = (page: string) => {
    // Si es admin, solo permitir navegar al panel de admin
    if ((user?.email === "admin@demo.com" || user?.role === "admin") && page !== "admin") {
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
    console.log('renderPage - user role:', user?.role);
    
    // Si es admin o forzado, mostrar panel de admin
    if (forceAdmin || user?.email === "admin@demo.com" || user?.role === "admin") {
      console.log('Renderizando AdminPanel');
      return <AdminPanel user={user} onLogout={handleLogout} />;
    }

    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "products":
        return (
          <ProductsPage
            user={user}
            onNavigate={handleNavigate}
            onCartUpdate={loadCartCount}
          />
        );
      case "services":
        return <ServicesPage onNavigate={handleNavigate} />;
      case "workshops":
        return (
          <WorkshopsPage
            user={user}
            onNavigate={handleNavigate}
          />
        );
      case "blog":
        return <BlogPage onNavigate={handleNavigate} />;
      case "profile":
        return user ? (
          <ProfilePage user={user} onLogout={handleLogout} />
        ) : (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        );
      case "cart":
        return user ? (
          <CartPage
            user={user}
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
        return <AdminPanel user={user} onLogout={handleLogout} />;
      default:
        console.log('Switch default - renderizando HomePage');
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const isAdminPage = forceAdmin || user?.email === "admin@demo.com" || user?.role === "admin";

  return (
    <div className="min-h-screen bg-white">
      <AdminInitializer />

      {isAdminPage ? (
        <AdminNavbar user={user} onLogout={handleLogout} onRefresh={handleRefresh} />
      ) : (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          user={user}
          cartItemCount={cartItemCount}
          onLogout={handleLogout}
        />
      )}

      <main className="pt-20">{renderPage()}</main>

      {!isAdminPage && <Footer />}

      {showWelcome && (
        <WelcomeScreen
          user={user}
          isAdmin={user?.email === "admin@demo.com" || user?.role === "admin"}
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
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}