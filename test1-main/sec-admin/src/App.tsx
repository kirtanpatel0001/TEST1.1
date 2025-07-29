import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Users from './pages/Users';
import Orders from './pages/Orders';
import Staff from './pages/Staff';
import Analytics from './pages/Analytics';
import Layout from './components/Layout';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Eyeglasses from './pages/Eyeglasses';
import KidsGlasses from './pages/KidsGlasses';
import ScreenGlasses from './pages/ScreenGlasses';
import ContactLenses from './pages/ContactLenses';
import Sunglasses from './pages/Sunglasses';
import HomeEyeTest from './pages/HomeEyeTest';
import StoreLocator from './pages/StoreLocator';
import Brands from './pages/Brands';
import Header from './components/Header';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';

function AppRoutes() {
  const location = useLocation();
  // Hide header on all admin-related routes and cart
  const adminPaths = [
    '/login', '/signup', '/dashboard', '/products', '/users', '/orders', '/staff', '/analytics', '/cart'
  ];
  const hideHeader = adminPaths.some(path => location.pathname.startsWith(path));
  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/products" element={
          <ProtectedRoute>
            <Layout>
              <Products />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/orders" element={
          <ProtectedRoute>
            <Layout>
              <Orders />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/staff" element={
          <ProtectedRoute>
            <Layout>
              <Staff />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute>
            <Layout>
              <Analytics />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/eyeglasses" element={<Eyeglasses />} />
        <Route path="/eyeglasses/:id" element={<ProductDetails />} />
        <Route path="/kids-glasses" element={<KidsGlasses />} />
        <Route path="/screen-glasses" element={<ScreenGlasses />} />
        <Route path="/contact-lenses" element={<ContactLenses />} />
        <Route path="/sunglasses" element={<Sunglasses />} />
        <Route path="/home-eye-test" element={<HomeEyeTest />} />
        <Route path="/store-locator" element={<StoreLocator />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
          <Toaster position="top-right" />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;