// Simple database connection test
// Run with: node test-database.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDatabase() {
  try {
    console.log('🔌 Testing database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test queries
    const userCount = await prisma.user.count();
    console.log(`👥 Users in database: ${userCount}`);
    
    const applicationCount = await prisma.application.count();
    console.log(`📝 Applications in database: ${applicationCount}`);
    
    const otpCount = await prisma.otpCode.count();
    console.log(`🔐 OTP codes in database: ${otpCount}`);
    
    console.log('\n🎉 Database is working correctly!');
    console.log('\nNext steps:');
    console.log('1. Set up your Arkesel API key in .env.local');
    console.log('2. Start the development server: npm run dev');
    console.log('3. Test the application flow');
    
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your DATABASE_URL in .env.local');
    console.log('2. Ensure PostgreSQL is running');
    console.log('3. Run: npx prisma migrate dev');
    console.log('4. Check DATABASE_SETUP.md for detailed instructions');
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabase();
