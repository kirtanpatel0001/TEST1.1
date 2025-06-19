import User from '../models/User.js';

export const createDemoAdmin = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: 'admin@lenskart.com' });
    
    if (existingAdmin) {
      console.log('✅ Demo admin user already exists');
      return;
    }

    // Create demo admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@lenskart.com',
      password: 'admin123', // This will be hashed automatically by the User model
      phone: '+1234567890',
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('✅ Demo admin user created successfully');
    console.log('📧 Email: admin@lenskart.com');
    console.log('🔑 Password: admin123');
    
  } catch (error) {
    console.error('❌ Error creating demo admin user:', error.message);
  }
};

export const seedDatabase = async () => {
  console.log('🌱 Seeding database...');
  
  try {
    // Create demo admin user
    await createDemoAdmin();
    
    // You can add more seeding functions here
    // await createDemoProducts();
    // await createDemoOrders();
    
    console.log('✅ Database seeding completed');
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
  }
};