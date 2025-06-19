import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  images: { url: string; alt: string }[];
}

const ContactLenses: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          params: { category: 'contact-lenses', limit: 50 }
        });
        setProducts(response.data.products);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Lenses</h1>
      <p className="text-lg text-center text-gray-600 mb-8">Explore our range of comfortable and clear contact lenses for every need.</p>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500">No contact lenses found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              {product.images && product.images[0] && (
                <img src={product.images[0].url} alt={product.images[0].alt} className="w-full h-40 object-cover mb-2 rounded" />
              )}
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-blue-600">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="line-through text-gray-400">${product.originalPrice}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactLenses;
