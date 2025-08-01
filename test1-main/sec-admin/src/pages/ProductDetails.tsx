import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  images: { url: string; alt: string; color?: string }[];
  frameType?: string;
  frameShape?: string;
  frameColor?: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch {
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center py-16">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto py-8 px-2 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images Section */}
        <div className="grid grid-cols-2 gap-4">
          {product.images && product.images.length > 0 ? (
            product.images.map((img, i) => (
              <div key={i} className="aspect-square bg-white border rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={img.url}
                  alt={img.alt || product.name}
                  className="object-contain w-full h-full"
                />
              </div>
            ))
          ) : (
            <div className="col-span-2 w-full h-80 flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl">No Image</div>
          )}
        </div>
        {/* Details Section */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-sm text-gray-500 mb-1">Lenskart Air</div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg md:text-2xl font-bold text-blue-600">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="line-through text-gray-400 text-base md:text-lg">₹{product.originalPrice}</span>
              )}
              {product.originalPrice > product.price && (
                <span className="text-green-600 text-xs font-semibold">{Math.round(100 - (product.price / product.originalPrice) * 100)}% OFF</span>
              )}
            </div>
            <div className="mb-2 text-gray-700">Frame + Lens</div>
            <div className="flex gap-2 mb-4">
              {/* Color dots if available */}
              {product.images && product.images.map((img, i) => (
                <span key={i} className="w-6 h-6 rounded-full border border-gray-300 inline-block" style={{ background: img.color ? img.color.toLowerCase() : '#eee' }}></span>
              ))}
            </div>
            <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg mb-2 transition">SELECT LENSES</button>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg mb-2 transition"
              onClick={() => {
                if (!user) {
                  alert('Please login to add products to cart.');
                  return;
                }
                addToCart({
                  _id: product._id,
                  name: product.name,
                  price: product.price,
                  images: product.images,
                  quantity: 1
                });
              }}
            >Add to Cart</button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mt-2">
            <div className="font-semibold mb-2">Technical information</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div>Product id</div>
              <div>{product._id}</div>
              <div>Frame Type</div>
              <div>{product.frameType || 'N/A'}</div>
              <div>Frame Shape</div>
              <div>{product.frameShape || 'N/A'}</div>
              <div>Frame Color</div>
              <div>{product.frameColor || 'N/A'}</div>
              {/* Add more fields as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
