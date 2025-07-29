import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ProductFilters from '../components/ProductFilters';
import { Link } from 'react-router-dom';

interface ProductSpecifications {
  frameType?: string;
  frameShape?: string;
  frameColor?: string;
  frameSize?: string;
  gender?: string;
  weightGroup?: string;
  brand?: string;
}

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
  frameSize?: string;
  gender?: string;
  weightGroup?: string;
  brand?: string;
  specifications?: ProductSpecifications;
}

const FRAME_TYPES = ['Full Rim', 'Rimless', 'Half Rim'];
const FRAME_SHAPES = ['Rectangle', 'Square', 'Round', 'Cat Eye', 'Geometric', 'Aviator', 'Clubmaster', 'Oval'];
const FRAME_COLORS = ['Black', 'Transparent', 'Blue', 'Gold', 'Gunmetal', 'Silver', 'Brown', 'Green', 'Grey'];
const FRAME_SIZES = ['Small', 'Medium', 'Large'];
const GENDER_OPTIONS = ['Men', 'Women', 'Unisex'];
const WEIGHT_GROUPS = ['Light', 'Medium', 'Heavy'];
const BRANDS = ['Ray-Ban', 'Oakley', 'Prada', 'Gucci', 'Tom Ford', 'Persol', 'Maui Jim'];
const PRICE_RANGE_DEFAULT: [number, number] = [0, 10000];

const FRAME_TYPE_IMAGES: Record<string, string> = {
  'Full Rim': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/FullRim.png',
  'Rimless': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/Rimless.png',
  'Half Rim': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/HalfRim.png',
};

const FRAME_SHAPE_IMAGES: Record<string, string> = {
  'Rectangle': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/Rectangle.png',
  'Square': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/Square.png',
  'Round': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/Round.png',
  'Cat Eye': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/CatEye.png',
  'Geometric': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/Geometric.png',
  'Aviator': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/Aviator.png',
  'Clubmaster': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/Clubmaster.png',
  'Oval': 'https://static.lenskart.com/images/cust_mailer/Eyeglass/Oval.png',
};

const Eyeglasses: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('');
  const [selectedShape, setSelectedShape] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>(PRICE_RANGE_DEFAULT);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [mainImageIdx, setMainImageIdx] = useState<{ [key: string]: number }>({});
  useCart();
  useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products', {
          params: { category: 'eyeglasses', limit: 50 }
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

  const isAnyFilterActive = !!(
    selectedType || selectedShape || selectedColor || selectedSize ||
    selectedGender || selectedWeight || selectedBrand || priceRange[1] !== PRICE_RANGE_DEFAULT[1]
  );

  const filteredProducts = isAnyFilterActive
    ? products.filter(product => {
        const specs = product.specifications || {};
        const typeMatch = !selectedType || product.frameType === selectedType || specs.frameType === selectedType;
        const shapeMatch = !selectedShape || product.frameShape === selectedShape || specs.frameShape === selectedShape;
        const colorMatch = !selectedColor || product.frameColor === selectedColor || specs.frameColor === selectedColor || (product.images && product.images.some(img => img.color === selectedColor));
        const sizeMatch = !selectedSize || product.frameSize === selectedSize || specs.frameSize === selectedSize;
        const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
        const genderMatch = !selectedGender || product.gender?.toLowerCase() === selectedGender.toLowerCase() || specs.gender?.toLowerCase() === selectedGender.toLowerCase();
        const weightMatch = !selectedWeight || product.weightGroup?.toLowerCase() === selectedWeight.toLowerCase() || specs.weightGroup?.toLowerCase() === selectedWeight.toLowerCase();
        const brandMatch = !selectedBrand || product.brand === selectedBrand || specs.brand === selectedBrand;
        return typeMatch && shapeMatch && colorMatch && sizeMatch && priceMatch && genderMatch && weightMatch && brandMatch;
      })
    : products;

  const getVisibleImages = (images: Product['images']) => images.slice(0, 4);
  const getExtraCount = (images: Product['images']) => images.length > 4 ? images.length - 4 : 0;

  console.log('Eyeglasses products:', products);

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      
      <div className="flex gap-8">
        {/* Filters */}
        <aside className="w-64 hidden md:block">
          <ProductFilters
            frameTypes={FRAME_TYPES}
            frameTypeImages={FRAME_TYPE_IMAGES}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            frameShapes={FRAME_SHAPES}
            frameShapeImages={FRAME_SHAPE_IMAGES}
            selectedShape={selectedShape}
            setSelectedShape={setSelectedShape}
            frameColors={FRAME_COLORS}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            frameSizes={FRAME_SIZES}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            genderOptions={GENDER_OPTIONS}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            weightGroups={WEIGHT_GROUPS}
            selectedWeight={selectedWeight}
            setSelectedWeight={setSelectedWeight}
            brands={BRANDS}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
        </aside>
        {/* Product Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500">No eyeglasses found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map(product => {
                const idx = mainImageIdx[product._id] || 0;
                const visibleImages = getVisibleImages(product.images);
                const extraCount = getExtraCount(product.images);
                return (
                  <Link
                    key={product._id}
                    to={`/eyeglasses/${product._id}`}
                    className="relative bg-white border rounded-xl p-4 shadow hover:shadow-xl transition hover:border-blue-500 flex flex-col items-center cursor-pointer"
                  >
                    {/* Heart Icon */}
                    <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500" type="button" onClick={e => e.preventDefault()}>
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.42 6.42 3 9.5 3C11.24 3 12.91 3.81 14 5.08C15.09 3.81 16.76 3 18.5 3C21.58 3 24 5.42 24 8.5C24 13.5 16 21 16 21H12Z"/></svg>
                    </button>
                    {/* Product Image */}
                    <img
                      src={product.images[idx]?.url}
                      alt={product.images[idx]?.alt || product.name}
                      className="w-100 h-72 object-contain mb-3 rounded bg-gray-50"
                      loading="lazy"
                    />
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-1 w-full">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                        <svg width="16" height="16" fill="currentColor" className="inline-block text-yellow-400" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z"/></svg>
                        4.8 
                      </span>
                    </div>
                    {/* Title */}
                    <div className="font-semibold text-base mb-1 text-left w-full">{product.name}</div>
                    {/* Details */}
                    <div className="text-xs text-gray-500 mb-2 text-left w-full">Size: Medium • Air Fusion</div>
                    {/* Colors */}
                    <div className="flex gap-1 mb-3 items-center w-full">
                      {visibleImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={e => { e.preventDefault(); setMainImageIdx(prev => ({ ...prev, [product._id]: i })); }}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${idx === i ? 'border-blue-600' : 'border-gray-300'}`}
                          style={{ background: img.color ? img.color.toLowerCase() : '#eee' }}
                          title={img.color || 'Variant'}
                          type="button"
                        >
                          {!img.color && (
                            <img src={img.url} alt={img.alt || product.name} className="w-full h-full object-cover rounded-full" />
                          )}
                        </button>
                      ))}
                      {extraCount > 0 && (
                        <span className="ml-1 text-xs bg-gray-200 rounded-full px-2 py-0.5">+{extraCount}</span>
                      )}
                    </div>
                    {/* Price and discount */}
                    <div className="flex items-center gap-2 mb-1 w-full">
                      <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="line-through text-gray-400 text-sm">₹{product.originalPrice}</span>
                      )}
                      {product.originalPrice > product.price && (
                        <span className="text-green-600 text-xs font-semibold">{Math.round(100 - (product.price / product.originalPrice) * 100)}% OFF</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Eyeglasses;
