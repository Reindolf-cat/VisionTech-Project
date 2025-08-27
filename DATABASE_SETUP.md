# PostgreSQL Database Setup for VisionTech

This guide explains how to set up and configure PostgreSQL database for the VisionTech application.

## 🚀 Quick Setup Options

### Option 1: Cloud PostgreSQL (Recommended)

#### Neon (Free Tier Available)
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string
4. Add to `.env.local`:
   ```env
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
   ```

#### Supabase (Free Tier Available)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy the connection string
5. Add to `.env.local`

#### Railway
1. Go to [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy connection string from variables tab

### Option 2: Local PostgreSQL

#### macOS (using Homebrew)
```bash
# Install PostgreSQL
brew install postgresql

# Start PostgreSQL service
brew services start postgresql

# Create database
createdb visiontech_db

# Set environment variable
DATABASE_URL="postgresql://$(whoami)@localhost:5432/visiontech_db"
```

#### Ubuntu/Debian
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE visiontech_db;
CREATE USER visiontech WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE visiontech_db TO visiontech;
\q

# Set environment variable
DATABASE_URL="postgresql://visiontech:your_password@localhost:5432/visiontech_db"
```

#### Windows
1. Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. During installation, remember the password for the `postgres` user
3. Open pgAdmin or psql command line
4. Create database: `CREATE DATABASE visiontech_db;`
5. Set environment variable in `.env.local`

## 🔧 Environment Configuration

1. **Copy environment file**:
   ```bash
   cp env.example .env.local
   ```

2. **Update `.env.local`** with your database URL:
   ```env
   # Add your Arkesel API key
   ARKESEL_API_KEY=your_arkesel_api_key_here
   
   # Add your PostgreSQL connection string
   DATABASE_URL="postgresql://username:password@host:port/database"
   ```

## 📊 Database Schema

The database includes the following main tables:

### Users Table
- Stores phone numbers and verification status
- Links to applications and OTP codes

### Applications Table
- Complete application form data
- Personal, guardian, education, and program information
- Application status tracking

### OTP Codes Table
- SMS verification codes
- Expiration and usage tracking

### Documents Table
- File upload records
- Links to application submissions

### Admin Users Table
- Administrative access control
- Application review management

## 🏗️ Initialize Database

1. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

2. **Run Database Migration**:
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Seed Database (Optional)**:
   ```bash
   npx prisma db seed
   ```

## 🔍 Database Management

### View Data
```bash
# Open Prisma Studio (GUI)
npx prisma studio
```

### Reset Database
```bash
# Reset and re-migrate
npx prisma migrate reset
```

### Backup Database
```bash
# PostgreSQL dump
pg_dump DATABASE_URL > backup.sql

# Restore
psql DATABASE_URL < backup.sql
```

## 📈 Database Schema Overview

```sql
-- Users (Applicants)
Table users {
  id String [primary key]
  phoneNumber String [unique]
  isVerified Boolean
  createdAt DateTime
  updatedAt DateTime
}

-- OTP Verification
Table otp_codes {
  id String [primary key]
  userId String [ref: > users.id]
  code String
  phoneNumber String
  isUsed Boolean
  expiresAt DateTime
  createdAt DateTime
}

-- Applications
Table applications {
  id String [primary key]
  userId String [ref: > users.id]
  applicationNumber String [unique]
  status ApplicationStatus
  
  -- Personal Info
  firstName String
  surname String
  gender Gender
  dateOfBirth DateTime
  email String
  telephone String
  nationality String
  address String
  gpsAddress String?
  
  -- Guardian Info
  guardianName String
  guardianOccupation String
  guardianTelephone String
  
  -- Education Info
  highestEducation EducationLevel
  yearCompleted Int
  
  -- Program Info
  programType ProgramType
  specificProgram String
  
  -- Timestamps
  createdAt DateTime
  updatedAt DateTime
  submittedAt DateTime?
}

-- Document Uploads
Table documents {
  id String [primary key]
  applicationId String [ref: > applications.id]
  documentType DocumentType
  fileName String
  originalName String
  fileSize Int
  mimeType String
  fileUrl String
  uploadedAt DateTime
}
```

## 🔒 Security Considerations

### Connection Security
- Always use SSL in production (`sslmode=require`)
- Use environment variables for credentials
- Never commit `.env.local` to version control

### Data Protection
- Regular backups
- User data encryption for sensitive fields
- Audit trails for admin actions

### Access Control
- Database user with minimal required permissions
- Admin authentication for sensitive operations
- Rate limiting on API endpoints

## 🧪 Testing Database

### Test Connection
```javascript
// Test file: test-db.js
import { prisma } from './lib/prisma.js';

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');
    
    const userCount = await prisma.user.count();
    console.log(`Users in database: ${userCount}`);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

testConnection();
```

### Run Test
```bash
node test-db.js
```

## 🚨 Troubleshooting

### Common Issues

**Connection Refused**
- Check if PostgreSQL is running
- Verify connection string format
- Check firewall settings

**Authentication Failed**
- Verify username and password
- Check user permissions
- Ensure database exists

**SSL Connection Error**
- Add `sslmode=require` for cloud databases
- For local development, try `sslmode=disable`

**Migration Errors**
- Reset database: `npx prisma migrate reset`
- Check for schema conflicts
- Verify Prisma schema syntax

## 📊 API Endpoints

### Applications
- `GET /api/applications` - List all applications
- `POST /api/applications` - Create new application
- `GET /api/applications/[id]` - Get single application
- `PUT /api/applications/[id]` - Update application
- `DELETE /api/applications/[id]` - Delete application

### Documents
- `POST /api/documents` - Upload document
- `GET /api/documents?applicationId=xyz` - List documents

### OTP
- `POST /api/send-otp` - Send OTP via SMS
- `POST /api/verify-otp` - Verify OTP code

---

## 🎯 Next Steps

1. Set up your PostgreSQL database
2. Update `.env.local` with connection string
3. Run `npx prisma migrate dev`
4. Test the connection
5. Start using the API endpoints

For support, check the [Prisma Documentation](https://www.prisma.io/docs) or [PostgreSQL Documentation](https://www.postgresql.org/docs/).
