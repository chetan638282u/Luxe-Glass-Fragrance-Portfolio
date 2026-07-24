import { products } from '../products';

const KEYS = {
  PRODUCTS: 'admin_products',
  INQUIRIES: 'admin_inquiries',
  ORDERS: 'admin_orders',
  SETTINGS: 'admin_settings',
  SESSION: 'admin_session',
  FAILED_ATTEMPTS: 'admin_failed_attempts',
  PASSWORD: 'admin_password',
};

const DEFAULT_PASSWORD = 'Aetheris@2026#Secure';

function get(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// ── Session ──
const SESSION_DURATION = 15 * 60 * 1000;

export function checkSession() {
  const session = get(KEYS.SESSION);
  if (!session || !session.authenticated) return false;
  const elapsed = Date.now() - session.loginTime;
  if (elapsed > SESSION_DURATION) {
    clearSession();
    return false;
  }
  return true;
}

export function login(password) {
  const attempts = get(KEYS.FAILED_ATTEMPTS) || { count: 0, lastAttempt: 0 };
  if (attempts.count >= 5 && (Date.now() - attempts.lastAttempt) < 300000) {
    return { success: false, reason: 'LOCKOUT' };
  }

  const storedPassword = get(KEYS.PASSWORD) || DEFAULT_PASSWORD;
  if (password === storedPassword) {
    set(KEYS.SESSION, { authenticated: true, loginTime: Date.now() });
    set(KEYS.FAILED_ATTEMPTS, { count: 0, lastAttempt: 0 });
    if (!get(KEYS.PRODUCTS)) seedProducts();
    return { success: true };
  }

  const newCount = attempts.count + 1;
  set(KEYS.FAILED_ATTEMPTS, { count: newCount, lastAttempt: Date.now() });
  return { success: false, reason: 'INVALID', remaining: 5 - newCount };
}

export function changePassword(oldPassword, newPassword) {
  const storedPassword = get(KEYS.PASSWORD) || DEFAULT_PASSWORD;
  if (oldPassword !== storedPassword) {
    return { success: false, reason: 'Current password is incorrect.' };
  }
  if (newPassword.length < 6) {
    return { success: false, reason: 'New password must be at least 6 characters.' };
  }
  set(KEYS.PASSWORD, newPassword);
  return { success: true };
}

export function clearSession() {
  localStorage.removeItem(KEYS.SESSION);
}

// ── Products ──
function seedProducts() {
  const seeded = Object.values(products).map(p => ({
    ...p,
    price: p.price["50ml"] || p.price,
    image: p.image || '',
    stock: 10,
    createdAt: new Date().toISOString(),
  }));
  set(KEYS.PRODUCTS, seeded);
}

export function getProducts() {
  return get(KEYS.PRODUCTS) || [];
}

export function getProduct(id) {
  return getProducts().find(p => p.id === id) || null;
}

export function saveProduct(product) {
  const list = getProducts();
  const newProduct = { ...product, id: generateId(), createdAt: new Date().toISOString() };
  list.push(newProduct);
  set(KEYS.PRODUCTS, list);
  return newProduct;
}

export function updateProduct(id, data) {
  const list = getProducts();
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...data };
  set(KEYS.PRODUCTS, list);
  return list[idx];
}

export function deleteProduct(id) {
  const list = getProducts().filter(p => p.id !== id);
  set(KEYS.PRODUCTS, list);
}

// ── Inquiries ──
export function getInquiries() {
  return get(KEYS.INQUIRIES) || [];
}

export function addInquiry(inquiry) {
  const list = getInquiries();
  const newInquiry = {
    id: generateId(),
    ...inquiry,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  list.unshift(newInquiry);
  set(KEYS.INQUIRIES, list);
}

export function updateInquiryStatus(id, status) {
  const list = getInquiries();
  const idx = list.findIndex(i => i.id === id);
  if (idx === -1) return;
  list[idx].status = status;
  set(KEYS.INQUIRIES, list);
}

// ── Orders ──
export function getOrders() {
  return get(KEYS.ORDERS) || [];
}

export function addOrder(order) {
  const list = getOrders();
  const newOrder = {
    id: generateId(),
    ...order,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  list.unshift(newOrder);
  set(KEYS.ORDERS, list);
}

export function updateOrderStatus(id, status) {
  const list = getOrders();
  const idx = list.findIndex(o => o.id === id);
  if (idx === -1) return;
  list[idx].status = status;
  set(KEYS.ORDERS, list);
}

// ── Settings ──
export function getSettings() {
  const defaults = {
    storeName: 'AETHERIS',
    contactEmail: 'atelier@aetherisperfumes.com',
    contactPhone: '+44 20 7946 0958',
    address: 'Bond Street, London W1S 1SR, United Kingdom',
    socialLinks: { instagram: '', twitter: '', facebook: '' },
  };
  return { ...defaults, ...(get(KEYS.SETTINGS) || {}) };
}

export function saveSettings(data) {
  set(KEYS.SETTINGS, data);
}
