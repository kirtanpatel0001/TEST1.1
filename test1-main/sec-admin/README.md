# LensKart Admin Panel

A comprehensive admin panel for managing an e-commerce eyewear business, built with React, Node.js, Express, and MongoDB.

## 🚀 Features

### Admin Panel Features
- **Dashboard**: Real-time analytics and key metrics
- **Product Management**: Complete CRUD operations for eyewear products
- **User Management**: Customer account management and status control
- **Order Management**: Order tracking, status updates, and fulfillment
- **Staff Management**: Team member management with role-based access
- **Analytics & Reports**: Sales insights and website traffic analytics

### Technical Features
- **Authentication**: Secure JWT-based authentication system
- **Role-based Access**: Admin and staff roles with different permissions
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live data synchronization
- **Security**: Rate limiting, CORS protection, and data validation

## 📁 Project Structure

```
lenskart-admin-panel/
├── server/                 # Backend Node.js/Express server
│   ├── models/             # MongoDB models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Analytics.js
│   ├── routes/             # API routes
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── users.js
│   │   ├── orders.js
│   │   ├── analytics.js
│   │   └── staff.js
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── index.js           # Server entry point
├── src/                   # Frontend React application
│   ├── components/        # Reusable components
│   │   ├── Layout.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   ├── pages/             # Page components
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Products.tsx
│   │   ├── Users.tsx
│   │   ├── Orders.tsx
│   │   ├── Staff.tsx
│   │   └── Analytics.tsx
│   └── App.tsx           # Main App component
├── .env.example          # Environment variables template
└── package.json          # Project dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Step 1: Clone and Install Dependencies
```bash
# Clone the repository
git clone <your-repo-url>
cd lenskart-admin-panel

# Install dependencies
npm install
```

### Step 2: Environment Configuration
```bash
# Copy the environment template
cp .env.example .env

# Edit the .env file with your configuration
# Required environment variables:
MONGODB_URI=mongodb://localhost:27017/lenskart_admin
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Step 3: MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Ubuntu
   sudo systemctl start mongod
   
   # On Windows
   net start MongoDB
   ```
3. Use the local connection string in `.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/lenskart_admin
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Update your `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lenskart_admin
   ```

### Step 4: Create Admin User
After starting the server, you can create an admin user by making a POST request to `/api/auth/register`:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@lenskart.com",
    "password": "admin123",
    "phone": "+1234567890",
    "role": "admin"
  }'
```

Or use the demo credentials provided in the login form.

## 🚀 Running the Application

### Development Mode
```bash
# Start both frontend and backend concurrently
npm run dev

# Or start them separately:
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### Production Mode
```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: Object,
  role: String (customer/admin/staff),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date
}
```

### Products Collection
```javascript
{
  name: String,
  description: String,
  category: String (eyeglasses/sunglasses/contact-lenses/accessories),
  brand: String,
  price: Number,
  originalPrice: Number,
  images: Array,
  specifications: Object,
  stock: Number,
  isActive: Boolean,
  tags: Array,
  rating: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection
```javascript
{
  orderNumber: String (unique),
  user: ObjectId (ref: User),
  items: Array,
  totalAmount: Number,
  shippingAddress: Object,
  status: String (pending/confirmed/processing/shipped/delivered/cancelled),
  paymentStatus: String (pending/paid/failed/refunded),
  paymentMethod: String,
  trackingNumber: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Users
- `GET /api/users` - Get all users (Admin only)
- `PUT /api/users/:id/status` - Update user status (Admin only)

### Orders
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### Staff
- `GET /api/staff` - Get all staff members (Admin only)
- `POST /api/staff` - Create staff member (Admin only)

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard analytics (Admin only)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Server-side data validation
- **Role-based Access**: Different permissions for admin/staff
- **Helmet.js**: Security headers protection

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Interface**: Clean and professional design
- **Interactive Charts**: Real-time analytics visualization
- **Toast Notifications**: User feedback for actions
- **Loading States**: Smooth user experience
- **Form Validation**: Client and server-side validation
- **Modal Dialogs**: Intuitive create/edit interfaces

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update environment variables for production

### Backend Deployment (Heroku/Railway/DigitalOcean)
1. Set up your hosting service
2. Configure environment variables
3. Deploy the server code
4. Update the frontend API URLs

### Database Deployment
- Use MongoDB Atlas for production database
- Configure connection strings and security settings
- Set up database backups and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints and database schema

## 🔄 Updates and Maintenance

Regular updates include:
- Security patches
- Feature enhancements
- Bug fixes
- Performance optimizations
- Database schema updates

---

**Happy Coding! 🚀**