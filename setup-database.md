# 🚀 Quick Database Setup Guide

Your VisionTech application is now fully integrated with the database! Follow these steps to get everything working:

## ✅ **What's Been Fixed**

The application forms now **save all data to the PostgreSQL database**:
- ✅ **Personal Information** → Saved during application flow
- ✅ **Guardian Information** → Saved to session & database on submit
- ✅ **Education Information** → Saved to session & database on submit  
- ✅ **Program Selection** → Saved to session & database on submit
- ✅ **Complete Application** → Created in database with unique application number
- ✅ **OTP Tracking** → Already working in database

## 🔧 **Quick Setup (Choose One)**

### Option A: Cloud Database (Easiest - 5 minutes)

1. **Create Free Neon Database**:
   ```bash
   # Visit: https://neon.tech
   # Sign up (free) → Create new project
   # Copy the connection string
   ```

2. **Update Environment**:
   ```bash
   # Edit .env.local
   DATABASE_URL="your_neon_connection_string_here"
   ARKESEL_API_KEY="your_arkesel_api_key"
   ```

3. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

### Option B: Local PostgreSQL

1. **Install PostgreSQL** (if not installed):
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   createdb visiontech_db
   
   # Ubuntu
   sudo apt install postgresql postgresql-contrib
   sudo -u postgres createdb visiontech_db
   ```

2. **Update Environment**:
   ```bash
   # Edit .env.local
   DATABASE_URL="postgresql://username:password@localhost:5432/visiontech_db"
   ARKESEL_API_KEY="your_arkesel_api_key"
   ```

3. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## 🧪 **Test Everything**

1. **Test Database Connection**:
   ```bash
   node test-database.js
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Test Complete Flow**:
   - Visit: `http://localhost:3000`
   - Go: Home → HOW TO APPLY → Apply Now
   - Enter Ghana phone number (get real SMS)
   - Complete full application form
   - Submit application
   - **Check database** for your data!

## 🔍 **View Your Data**

**Option 1: Prisma Studio (GUI)**
```bash
npx prisma studio
# Opens web interface at http://localhost:5555
```

**Option 2: Direct Database Query**
```bash
# If using local PostgreSQL
psql -d visiontech_db -c "SELECT * FROM applications;"
```

## 📊 **What You'll See in Database**

After completing an application, you'll see data in:

1. **`users` table**:
   - Phone number
   - Verification status
   - Creation timestamp

2. **`otp_codes` table**:
   - SMS verification codes
   - Usage status
   - Expiration times

3. **`applications` table**:
   - **All personal info** (name, gender, DOB, etc.)
   - **All guardian info** (name, occupation, phone)
   - **All education info** (level, year completed)
   - **All program info** (type, specific program)
   - **Application number** (unique ID)
   - **Status** (SUBMITTED)
   - **Timestamps**

4. **`documents` table** (when file uploads are added):
   - File references
   - Upload metadata

## 🐛 **Troubleshooting**

**"Database connection failed"**
```bash
# Check your DATABASE_URL in .env.local
# Make sure PostgreSQL is running
# Run: npx prisma migrate dev
```

**"No data in database"**
```bash
# Complete the FULL application flow
# Don't just fill forms - click "Submit Application"
# Check you're looking at the right database
```

**"OTP not working"**
```bash
# Check ARKESEL_API_KEY in .env.local
# Make sure you have SMS credits
# Use real Ghana phone number
```

## 🎯 **Next Steps**

1. **Set up your database** (5 minutes)
2. **Test complete application flow**
3. **View data in Prisma Studio**
4. **Your application data will now persist!**

---

**Need help?** Check `DATABASE_SETUP.md` for detailed instructions!
