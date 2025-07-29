import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Clock, Truck, Shield, Heart, ChevronRight } from 'lucide-react';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [savedForLater, setSavedForLater] = useState<string[]>([]);
  
  const totalItemPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = totalItemPrice * 0.1; // 10% discount
  const deliveryCharges = totalItemPrice > 999 ? 0 : 49;
  const finalAmount = totalItemPrice - discount + deliveryCharges;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <ShoppingBag className="w-20 h-20 mx-auto mb-6 text-gray-300" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty!</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Cart Section */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Shopping Cart ({cart.length} item{cart.length > 1 ? 's' : ''})</h2>
                  <div className="text-sm text-green-600 flex items-center">
                    <Truck className="w-4 h-4 mr-1" />
                    {totalItemPrice > 999 ? 'Free Delivery' : 'Delivery charges apply'}
                  </div>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {cart.map(item => (
                  <div key={item._id} className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img src={item.images[0]?.url} alt={item.name} className="w-40 h-40 object-contain rounded-lg" />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">{item.name}</h3>
                            <div className="text-sm text-gray-500 mb-4">Brand: Generic</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-gray-900">₹{item.price * item.quantity}</div>
                            <div className="text-sm text-gray-500">₹{item.price} / item</div>
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-6 mt-4">
                          <div className="flex items-center border rounded-lg">
                            <button 
                              onClick={() => decreaseQuantity(item._id)}
                              className="p-2 hover:bg-gray-50 text-gray-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => increaseQuantity(item._id)}
                              className="p-2 hover:bg-gray-50 text-gray-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>

                          <div className="flex gap-4">
                            <button 
                              onClick={() => removeFromCart(item._id)}
                              className="text-sm font-medium text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                            <button 
                              onClick={() => {
                                setSavedForLater([...savedForLater, item._id]);
                                removeFromCart(item._id);
                              }}
                              className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center"
                            >
                              <Heart className="w-4 h-4 mr-1" />
                              Save for later
                            </button>
                          </div>
                        </div>

                        {/* Delivery Estimate */}
                        <div className="mt-4 flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          Delivery by {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow sticky top-6">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price ({cart.length} items)</span>
                  <span className="text-gray-900">₹{totalItemPrice}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">- ₹{discount}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Charges</span>
                  <span className={deliveryCharges === 0 ? 'text-green-600' : 'text-gray-900'}>
                    {deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges}`}
                  </span>
                </div>
                
                <div className="border-t pt-4 flex justify-between">
                  <span className="text-base font-semibold">Total Amount</span>
                  <span className="text-xl font-bold">₹{finalAmount}</span>
                </div>

                <div className="text-sm text-green-600">
                  You will save ₹{discount} on this order
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-b-lg">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  Proceed to Checkout
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
                
                <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2" />
                  Safe and Secure Payments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
