import React from 'react';
import { useCart } from '../contexts/CartContext';


const Cart: React.FC = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const totalItemPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#fcfaf8] flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-sans text-[#181c3a] mb-8 mt-8 text-center">Your shopping cart is empty! !</h2>
        <button className="bg-[#16e0b0] hover:bg-[#13cfa0] text-[#181c3a] font-semibold text-xl px-10 py-3 rounded-full transition">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf8] px-4 py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cart Section */}
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-6">Cart ({cart.length} item{cart.length > 1 ? 's' : ''})</h2>
          <div className="bg-white rounded-xl shadow p-6 mb-4">
            {cart.map(item => (
              <div key={item._id} className="flex items-center gap-6 border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                <img src={item.images[0]?.url} alt={item.name} className="w-32 h-20 object-contain rounded" />
                <div className="flex-1">
                  <div className="font-medium text-lg mb-1">{item.name}</div>
                  <div className="text-gray-600 text-sm mb-2">Final Price</div>
                  <div className="font-bold text-lg">₹{item.price}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <button onClick={() => decreaseQuantity(item._id)} className="px-2 py-1 bg-gray-200 rounded">-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item._id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
                  </div>
                  <div className="flex gap-4 mt-2">
                    <button className="text-blue-700 underline text-sm" onClick={() => removeFromCart(item._id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <span>Login to see items from your existing bag and wishlist</span>
            <button className="bg-gray-100 rounded-full p-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
        {/* Bill Details Section */}
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-6">Bill Details</h2>
          <div className="bg-white rounded-xl shadow p-6 mb-4">
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Total item price</span>
              <span>₹{totalItemPrice}</span>
            </div>
          </div>
          <button className="w-full bg-green-400 hover:bg-green-500 text-white font-semibold py-3 rounded-full text-lg mt-4 transition">Proceed To Checkout →</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
