import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number;
  stock: number;
  isActive: boolean;
  images: { url: string; alt: string }[];
  createdAt: string;
  imageUrl?: string; // Add imageUrl from backend
  specifications?: {
    frameType?: string;
    frameShape?: string;
    frameColor?: string;
    frameSize?: string;
    gender?: string;
    weightGroup?: string;
    // ...other fields
  };
}

interface ProductForm {
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  originalPrice: number;
  stock: number;
  isActive: boolean;
  specifications: {
    frameType?: string;
    frameShape?: string;
    frameColor?: string;
    frameSize?: string;
    gender?: string;
    weightGroup?: string;
  };
}

const frameTypes = ['Full Rim', 'Rimless', 'Half Rim'];
const frameShapes = ['Rectangle', 'Square', 'Round', 'Cat Eye', 'Geometric', 'Aviator', 'Clubmaster', 'Oval'];
const frameColors = ['Black', 'Transparent', 'Blue', 'Gold', 'Gunmetal', 'Silver', 'Brown', 'Green', 'Grey', 'Pink', 'Purple', 'Red', 'Rose Gold'];

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductForm>({
    defaultValues: {
      specifications: {}
    }
  });

  const categories = ['eyeglasses', 'sunglasses', 'contact-lenses', 'accessories'];
  const brands = ['Ray-Ban', 'Oakley', 'Prada', 'Gucci', 'Tom Ford', 'Persol', 'Maui Jim'];

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: {
          search: searchTerm,
          category: selectedCategory,
          limit: 50
        }
      });
      console.log('Fetched products:', response.data.products); // DEBUG
      setProducts(response.data.products);
    } catch (err) {
      toast.error('Error fetching products');
      console.error('Fetch error:', err);
    }
  };

  // Fetch images for a product
  const fetchProductImages = async (productId: string) => {
    try {
      const res = await axios.get(`/api/products/${productId}/images`);
      setSelectedImages(res.data.images);
    } catch {
      setSelectedImages([]);
    }
  };

  const onSubmit = async (data: ProductForm) => {
    try {
      let productId = editProduct?._id;
      let productRes;
      if (editProduct) {
        productRes = await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, data);
        toast.success('Product updated successfully');
      } else {
        productRes = await axios.post('http://localhost:5000/api/products', data);
        toast.success('Product created successfully');
        productId = productRes.data._id;
      }
      // Upload images if any
      if (selectedImages.length && productId) {
        setUploading(true);
        for (const file of selectedImages) {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('productId', productId);
          await axios.post('http://localhost:5000/api/products/upload-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
        setUploading(false);
        toast.success('Images uploaded!');
      }
      setShowModal(false);
      setEditProduct(null);
      setSelectedImages([]);
      reset();
      fetchProducts();
    } catch {
      toast.error('Error saving product');
      setUploading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    reset({
      name: product.name,
      description: product.description,
      category: product.category,
      brand: product.brand,
      price: product.price,
      originalPrice: product.originalPrice,
      stock: product.stock,
      isActive: product.isActive,
      specifications: {
        frameType: product.specifications?.frameType || '',
        frameShape: product.specifications?.frameShape || '',
        frameColor: product.specifications?.frameColor || '',
        frameSize: product.specifications?.frameSize || '',
        gender: product.specifications?.gender || '',
        weightGroup: product.specifications?.weightGroup || '',
      }
    });
    fetchProductImages(product._id);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch {
        toast.error('Error deleting product');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button
          onClick={() => {
            setEditProduct(null);
            reset();
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Products Table or Grid */}
        <div className="flex-1">
          {/* Products Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                            {product.imageUrl ? (
                              <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-10 h-10 object-cover rounded"
                                loading="lazy"
                              />
                            ) : product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0].url}
                                alt={product.images[0].alt || product.name}
                                className="w-10 h-10 object-cover rounded"
                                loading="lazy"
                              />
                            ) : (
                              <Eye className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.brand}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₹{product.price}</div>
                        {product.originalPrice > product.price && (
                          <div className="text-xs text-gray-500 line-through">₹{product.originalPrice}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' :
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-blue-600 hover:text-blue-900 transition-colors p-1"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-900 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                  {editProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                      <select
                        {...register('brand', { required: 'Brand is required' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Brand</option>
                        {brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                      {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand.message}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select
                        {...register('category', { required: 'Category is required' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                          </option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                      <input
                        {...register('stock', { required: 'Stock is required', min: 0 })}
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                      <input
                        {...register('originalPrice', { required: 'Original price is required', min: 0 })}
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.originalPrice && <p className="text-red-500 text-xs mt-1">{errors.originalPrice.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price (₹)</label>
                      <input
                        {...register('price', { required: 'Price is required', min: 0 })}
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                    </div>
                  </div>

                  {/* Specifications Section */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Frame Type</label>
                      <select
                        {...register('specifications.frameType')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Frame Type</option>
                        {frameTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Frame Shape</label>
                      <select
                        {...register('specifications.frameShape')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Frame Shape</option>
                        {frameShapes.map(shape => (
                          <option key={shape} value={shape}>{shape}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Frame Color</label>
                      <select
                        {...register('specifications.frameColor')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Frame Color</option>
                        {frameColors.map(color => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Frame Size</label>
                      <select
                        {...register('specifications.frameSize')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Frame Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        {...register('specifications.gender')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Weight Group</label>
                      <select
                        {...register('specifications.weightGroup')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Weight Group</option>
                        <option value="Light">Light</option>
                        <option value="Medium">Medium</option>
                        <option value="Heavy">Heavy</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      {...register('isActive')}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Active Product</label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={e => setSelectedImages(Array.from(e.target.files || []))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedImages.map((file, idx) => (
                        <img
                          key={idx}
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-16 h-16 object-cover rounded border"
                          loading="lazy"
                        />
                      ))}
                    </div>
                    {uploading && <p className="text-blue-500 text-xs mt-1">Uploading images...</p>}
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        setEditProduct(null);
                        reset();
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {editProduct ? 'Update' : 'Create'} Product
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;