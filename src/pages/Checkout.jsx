import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronLeft, CreditCard, Wallet, Plus, Minus } from 'lucide-react';
import { addOrder } from '../admin/adminStore';

export default function Checkout({ cart, setCart, onClose, checkoutItem = null }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [checkedOutItem, setCheckedOutItem] = useState(null);
  const [localCheckoutItem, setLocalCheckoutItem] = useState(checkoutItem);
  
  // Sync if prop changes
  useEffect(() => {
    setLocalCheckoutItem(checkoutItem);
  }, [checkoutItem]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const displayCart = localCheckoutItem
    ? [localCheckoutItem]
    : cart;
  const displayTotal = displayCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleUpdateQty = (item, delta) => {
    const newQty = item.quantity + delta;
    if (localCheckoutItem) {
      if (newQty <= 0) {
        onClose();
      } else {
        setLocalCheckoutItem({ ...localCheckoutItem, quantity: newQty });
      }
    } else {
      if (newQty <= 0) {
        setCart((prev) => prev.filter((i) => !(i.id === item.id && i.size === item.size)));
      } else {
        setCart((prev) =>
          prev.map((i) => (i.id === item.id && i.size === item.size ? { ...i, quantity: newQty } : i))
        );
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCardChange = (e) => {
    setCardDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const placeOrder = (items, singleItem = null) => {
    const id = Date.now().toString(36).toUpperCase();
    const itemsList = Array.isArray(items) ? items : [items];
    const productName = itemsList.map(item => `${item.name} (${item.quantity}x)`).join(', ');
    addOrder({
      items: itemsList.map(item => ({ name: item.name, quantity: item.quantity, price: item.price, size: item.size })),
      total: itemsList.reduce((acc, item) => acc + item.price * item.quantity, 0),
      productName,
      customer: formData,
      payment: paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card',
    });
    setOrderId(id);
    setCheckedOutItem(singleItem);
    setOrderPlaced(true);
  };

  const handlePlaceOrder = () => {
    placeOrder(displayCart, localCheckoutItem);
    if (localCheckoutItem) {
      setCart((prev) => prev.filter((i) => !(i.id === localCheckoutItem.id && i.size === localCheckoutItem.size)));
    } else {
      setCart([]);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-primary text-2xl font-serif">Æ</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">Order Placed</h1>
          <p className="font-sans text-sm text-on-surface-variant mb-6 leading-relaxed">
            {checkedOutItem
              ? `${checkedOutItem.name} has been ordered successfully.`
              : 'Thank you for your order. A confirmation will be sent to your email shortly.'}
          </p>
          <div className="bg-white/5 border border-primary/10 rounded-sm p-5 mb-8">
            <p className="font-sans text-[10px] tracking-widest text-on-surface/40 uppercase mb-2">Order Reference</p>
            <p className="font-mono text-lg text-primary">#{orderId}</p>
          </div>
          <button
            onClick={() => onClose()}
            className="border border-primary text-primary px-8 py-4 font-sans text-[10px] tracking-[0.25em] uppercase hover:bg-primary hover:text-background transition-all duration-300 cursor-pointer"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-full pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => onClose()}
            className="text-on-surface/40 hover:text-primary transition-colors p-1 cursor-pointer"
            aria-label="Back"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-primary">Checkout</h1>
            <p className="font-sans text-xs text-on-surface-variant mt-1">Complete your fragrance order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          {/* Left — Order Summary */}
          <div className="md:col-span-3 space-y-6">
            <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-on-surface/50 border-b border-primary/10 pb-3">
              Order Summary ({displayCart.length} {displayCart.length === 1 ? 'item' : 'items'})
              {localCheckoutItem && <span className="text-primary/60 ml-2">(single item)</span>}
            </h2>

            <div className="divide-y divide-primary/5">
              {displayCart.map((item) => (
                <div key={`${item.id}-${item.size || '50ml'}`} className="flex items-center gap-4 py-4">
                  <div className="w-20 h-24 flex-shrink-0 overflow-hidden rounded-sm bg-surface-container-low border border-primary/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-lg text-on-surface truncate">{item.name}</p>
                    <p className="font-sans text-xs text-on-surface/40 mt-0.5">{item.tagline}</p>
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <span className="font-sans text-sm text-on-surface/30">{item.size || '50 ML'}</span>
                      <div className="flex items-center gap-3 border border-primary/20 rounded-sm px-3 py-1">
                        <button
                          onClick={() => handleUpdateQty(item, -1)}
                          className="text-primary hover:text-primary-container transition-colors cursor-pointer leading-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={15} />
                        </button>
                        <span className="font-sans text-sm text-on-surface w-6 text-center leading-none font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQty(item, 1)}
                          className="text-primary hover:text-primary-container transition-colors cursor-pointer leading-none"
                          aria-label="Increase quantity"
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-sans text-base text-primary">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-primary/10">
              <span className="font-sans text-sm uppercase tracking-widest text-on-surface/60">Estimated Total</span>
              <span className="font-serif text-2xl text-primary">${displayTotal}</span>
            </div>
          </div>

          {/* Right — Customer Details */}
          <div className="md:col-span-2">
            <div className="bg-white/[0.02] border border-primary/10 rounded-sm p-6 md:p-8">
              <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-on-surface/50 mb-6">
                Customer Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block font-sans text-[10px] tracking-wider text-on-surface/40 uppercase mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Alexander Blackwood"
                    className="w-full bg-transparent border border-primary/10 rounded-sm px-4 py-3 font-sans text-sm text-on-surface placeholder:text-on-surface/20 outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] tracking-wider text-on-surface/40 uppercase mb-1.5">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className="w-full bg-transparent border border-primary/10 rounded-sm px-4 py-3 font-sans text-sm text-on-surface placeholder:text-on-surface/20 outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] tracking-wider text-on-surface/40 uppercase mb-1.5">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-transparent border border-primary/10 rounded-sm px-4 py-3 font-sans text-sm text-on-surface placeholder:text-on-surface/20 outline-none focus:border-primary/40 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] tracking-wider text-on-surface/40 uppercase mb-1.5">Shipping Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    placeholder="123 Luxury Lane, Suite 100&#10;New York, NY 10001"
                    className="w-full bg-transparent border border-primary/10 rounded-sm px-4 py-3 font-sans text-sm text-on-surface placeholder:text-on-surface/20 outline-none focus:border-primary/40 transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-8 pt-6 border-t border-primary/10">
                <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-on-surface/50 mb-4">
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-primary/10 rounded-sm cursor-pointer hover:border-primary/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="appearance-none w-4 h-4 border-2 border-primary/30 rounded-full checked:border-primary checked:ring-2 checked:ring-inset checked:ring-primary transition-all"
                    />
                    <Wallet size={16} className="text-primary/60" />
                    <div>
                      <p className="font-sans text-xs text-on-surface">Cash on Delivery</p>
                      <p className="font-sans text-[9px] text-on-surface/30 mt-0.5">Pay when you receive</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-primary/10 rounded-sm cursor-pointer hover:border-primary/30 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="appearance-none w-4 h-4 border-2 border-primary/30 rounded-full checked:border-primary checked:ring-2 checked:ring-inset checked:ring-primary transition-all"
                    />
                    <CreditCard size={16} className="text-primary/60" />
                    <div>
                      <p className="font-sans text-xs text-on-surface">Credit / Debit Card</p>
                      <p className="font-sans text-[9px] text-on-surface/30 mt-0.5">Visa, Mastercard, Amex</p>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 space-y-3 overflow-hidden"
                  >
                    <div>
                      <label className="block font-sans text-[10px] tracking-wider text-on-surface/40 uppercase mb-1.5">Card Number</label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardChange}
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        className="w-full bg-transparent border border-primary/10 rounded-sm px-4 py-3 font-sans text-sm text-on-surface placeholder:text-on-surface/20 outline-none focus:border-primary/40 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-sans text-[10px] tracking-wider text-on-surface/40 uppercase mb-1.5">Expiry</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-transparent border border-primary/10 rounded-sm px-4 py-3 font-sans text-sm text-on-surface placeholder:text-on-surface/20 outline-none focus:border-primary/40 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-[10px] tracking-wider text-on-surface/40 uppercase mb-1.5">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          maxLength={4}
                          className="w-full bg-transparent border border-primary/10 rounded-sm px-4 py-3 font-sans text-sm text-on-surface placeholder:text-on-surface/20 outline-none focus:border-primary/40 transition-colors"
                        />
                      </div>
                    </div>
                    <p className="font-sans text-[9px] text-on-surface/20 italic">Demo — no real payment processed</p>
                  </motion.div>
                )}
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={displayCart.length === 0}
                className="w-full bg-primary text-background font-sans font-medium text-xs tracking-[0.2em] py-4 uppercase hover:bg-primary-container transition-all active:scale-95 duration-300 mt-6 flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={14} />
                {displayCart.length === 0 ? 'Cart Empty' : `Place Order — $${displayTotal}`}
              </button>

              <p className="font-sans text-[9px] text-on-surface/20 text-center mt-4 tracking-wider">
                This is a demo — no payment is processed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
