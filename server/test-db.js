// Test MongoDB connection
require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('🔍 Testing MongoDB connection...');
    console.log('🔗 Connection URI:', process.env.MONGO_URI ? 'Configurato' : 'NON CONFIGURATO');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI non configurato nel file .env');
    }
    
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB connection successful!');
    console.log('📍 Connected to:', mongoose.connection.host);
    console.log('🗄️ Database:', mongoose.connection.name);
    
    await mongoose.connection.close();
    console.log('🔌 Connection closed.');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error:', error.message);
    console.log('\n💡 Suggestions:');
    console.log('1. Make sure MongoDB is installed and running');
    console.log('2. Check if MongoDB service is started');
    console.log('3. Verify the connection string in .env file');
    console.log('4. For Windows: net start MongoDB');
    console.log('5. For macOS: brew services start mongodb-community');
    console.log('6. For Linux: sudo systemctl start mongod');
  }
  
  process.exit(0);
};

testConnection();
