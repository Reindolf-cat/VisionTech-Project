# VisionTech University - Online Applications Portal

A modern, responsive Next.js application for VisionTech Computer Training Institute's online application system.

## Features

### 🔐 Authentication Flow
- **Email Login**: Users enter their email address to begin the application process
- **OTP Verification**: 6-digit OTP verification system with auto-focus and validation
- **Secure Navigation**: Step-by-step guided application process

### 📝 Comprehensive Application Form

The application form consists of multiple sections:

#### 1. Personal Information
- First Name & Surname
- Gender selection (Male, Female, Other)
- Date of Birth
- Email Address & Telephone Number
- Nationality
- Residential Address & GPS Address

#### 2. Guardian Information
- Guardian Full Name
- Guardian Occupation
- Guardian Telephone Number
- Emergency contact details for applicants under 18

#### 3. Education & Documents
- Highest Education Level (BECE, WASSCE, HND, DIPLOMA, DEGREE, OTHER)
- Year Completed (dropdown with 50 years range)
- **File Uploads**:
  - Proof of Education (PDF, JPG, PNG up to 5MB)
  - Passport Picture (JPG, PNG up to 2MB)

#### 4. Program Selection
Dynamic conditional dropdowns based on program type:

**Foundational Courses:**
- Basic Computer Literacy
- Microsoft Office Suite
- Internet & Email Essentials
- Intro to Keyboard Skills

**Diploma Programs:**
- Graphic & Web Design
- Computer Networking
- Software Development
- Cybersecurity
- Database Management

**Degree Programs:**
- Advanced Software Engineering
- Full Stack Web Development
- Advanced Networking & Security
- Data Science & Analytics
- IT Project Management

#### 5. Review & Submit
- Complete application summary
- Edit links for each section
- Final submission with success confirmation

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **Form Handling**: React state management
- **File Handling**: Browser native file API

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
VisionTech-Project-main/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Login page
│   ├── verify-otp/
│   │   └── page.tsx             # OTP verification
│   └── application/
│       ├── page.tsx             # Personal information
│       ├── guardian/
│       │   └── page.tsx         # Guardian details
│       ├── education/
│       │   └── page.tsx         # Education & documents
│       ├── programs/
│       │   └── page.tsx         # Program selection
│       └── review/
│           └── page.tsx         # Review & submit
├── components/
│   └── ui/                      # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── select.tsx
├── lib/
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
│   └── [images from original project]
└── PROJECT/                     # Original static files (preserved)
```

## Design Features

- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Modern UI**: Clean, professional interface with consistent spacing
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Loading States**: Visual feedback during form submission
- **Error Handling**: Form validation and error messaging
- **Progressive Enhancement**: Works without JavaScript for basic functionality

## Image Assets

All original images from the VisionTech project have been preserved and integrated:
- Logo files (`logo1.png`, `logo3.png`)
- Campus images (`campus.jpeg`, `campus1.jpeg`, `campus3.jpeg`)
- Facility images (`facilities.jpg`, `facilities2.jpg`, `lab.png`)
- Background images for authentication pages

## Deployment

The application is production-ready and can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting provider

## Future Enhancements

- Backend integration for form submission
- Email notification system
- Admin dashboard for application management
- Payment integration for application fees
- Document verification system
- Real-time application status tracking

## Support

For technical support or questions about the application system, contact:
- Email: visiontechinst@gmail.com
- Phone: +233 546 83 6583 / +233 244 46 5000

---

**VisionTech University** - *Empowering Futures Through Technology*