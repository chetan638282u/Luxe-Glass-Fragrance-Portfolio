import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft } from 'lucide-react';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import InquiryModal from './components/InquiryModal';

import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

import { checkSession, addInquiry, addOrder } from './admin/adminStore';

const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/AdminDashboard'));
const AdminProducts = lazy(() => import('./admin/AdminProducts'));
const AdminProductForm = lazy(() => import('./admin/AdminProductForm'));
const AdminInquiries = lazy(() => import('./admin/AdminInquiries'));
const AdminOrders = lazy(() => import('./admin/AdminOrders'));
const AdminSettings = lazy(() => import('./admin/AdminSettings'));

const ADMIN_SECRET = 'k7m9x2b4';

function ProtectedRoute() {
  const location = useLocation();
  if (!checkSession()) {
    return <Navigate to={`/${ADMIN_SECRET}`} replace />;
  }
  return <Outlet />;
}

function PublicApp() {
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("aetheris_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState(null);

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("aetheris_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState("");

  useEffect(() => {
    localStorage.setItem("aetheris_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("aetheris_cart", JSON.stringify(cart));
  }, [cart]);

  // Hash → overlay sync
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      setActiveOverlay(hash === 'checkout' ? 'checkout' : null);
    };
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // PushState → detail sync
  useEffect(() => {
    const onPopState = () => {
      const state = window.history.state;
      if (state?.page === 'detail') {
        setSelectedProductId(state.productId);
        setDetailOpen(true);
      } else {
        setDetailOpen(false);
        setSelectedProductId(null);
      }
    };
    window.addEventListener('popstate', onPopState);
    onPopState();
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Navbar visibility after intro
  useEffect(() => {
    if (introPlayed) {
      setShowNavbar(true);
    }
  }, [introPlayed]);

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) { handleRemoveItem(id); return; }
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleRemoveItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleCartCheckout = (item = null) => {
    setCartOpen(false);
    setCheckoutItem(item);
    window.location.hash = '#checkout';
  };

  const handleInquireProduct = (name) => {
    setInquiryProduct(name);
    setInquiryOpen(true);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleOpenProductDetail = (id) => {
    window.history.pushState({ page: 'detail', productId: id }, '');
    setSelectedProductId(id);
    setDetailOpen(true);
  };

  const handleCloseProductDetail = () => {
    window.history.back();
  };

  const closeOverlay = () => {
    if (detailOpen) {
      setDetailOpen(false);
      setSelectedProductId(null);
    }
    window.location.hash = '';
  };

  return (
    <div className="bg-background text-on-background min-h-[100svh] font-sans flex flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar
        activeOverlay={activeOverlay}
        onCloseOverlay={closeOverlay}
        cartCount={totalCartCount}
        onCartClick={() => setCartOpen(true)}
        visible={showNavbar}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
      />

      <main className="flex-grow">
        <Home
          introPlayed={introPlayed}
          setIntroPlayed={setIntroPlayed}
          setShowNavbar={setShowNavbar}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onProductSelect={handleOpenProductDetail}
        />
      </main>

      {/* Checkout overlay */}
      <AnimatePresence>
        {activeOverlay === 'checkout' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-background"
          >
            <button
              onClick={closeOverlay}
              className="fixed top-4 right-4 z-[61] w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full text-primary hover:bg-primary hover:text-background transition-all cursor-pointer"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="pt-16">
              <Checkout
                cart={cart}
                setCart={setCart}
                onClose={closeOverlay}
                checkoutItem={checkoutItem}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ProductDetail overlay */}
      <AnimatePresence>
        {detailOpen && selectedProductId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-background"
          >
            <button
              onClick={handleCloseProductDetail}
              className="fixed top-4 right-4 z-[61] w-10 h-10 flex items-center justify-center bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full text-primary hover:bg-primary hover:text-background transition-all cursor-pointer"
              aria-label="Back"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="pt-16">
              <ProductDetails
                selectedProductId={selectedProductId}
                onAddToCart={handleAddToCart}
                onClose={handleCloseProductDetail}
                onProductSelect={handleOpenProductDetail}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            cartItems={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => handleCartCheckout()}
            onItemCheckout={(item) => handleCartCheckout(item)}
          />
        )}
      </AnimatePresence>

      {/* Inquiry modal */}
      <AnimatePresence>
        {inquiryOpen && (
          <InquiryModal
            isOpen={inquiryOpen}
            onClose={() => setInquiryOpen(false)}
            productName={inquiryProduct}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-background border-t border-primary/10 py-16 flex flex-col items-center justify-center space-y-4 px-6">
        <h2 className="font-serif text-2xl tracking-widest text-primary font-medium">AETHERIS</h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-6">
          <button onClick={() => { closeOverlay(); setTimeout(() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-sans text-xs text-on-surface/40 hover:text-primary transition-colors uppercase tracking-wider cursor-pointer">Our Story</button>
          <button onClick={() => { closeOverlay(); setTimeout(() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-sans text-xs text-on-surface/40 hover:text-primary transition-colors uppercase tracking-wider cursor-pointer">Collection</button>
          <button onClick={() => { closeOverlay(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-sans text-xs text-on-surface/40 hover:text-primary transition-colors uppercase tracking-wider cursor-pointer">Atelier Booking</button>
        </div>
        <p className="font-sans text-[10px] tracking-[0.15em] text-on-surface/20">© 2026 AETHERIS PERFUMES. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ADMIN_SECRET}>
          <Route index element={<Suspense fallback={null}><AdminLogin /></Suspense>} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Suspense fallback={<div className="min-h-screen bg-background" />}><AdminLayout><Outlet /></AdminLayout></Suspense>}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/new" element={<AdminProductForm />} />
              <Route path="products/edit/:id" element={<AdminProductForm />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<PublicApp />} />
      </Routes>
    </BrowserRouter>
  );
}
