# Arkesel SMS OTP Integration Setup

This document explains how to set up and use the Arkesel SMS OTP integration in your VisionTech application.

## 🔑 Getting Your Arkesel API Key

1. **Sign up for Arkesel Account**
   - Visit [arkesel.com](https://arkesel.com)
   - Create an account
   - Complete account verification

2. **Get Your API Key**
   - Log into your Arkesel dashboard at [dash.arkesel.com](https://dash.arkesel.com)
   - Navigate to API section
   - Copy your API key

3. **Add Credits**
   - Purchase SMS credits in your dashboard
   - Each OTP SMS typically costs a few pesewas

## ⚙️ Environment Setup

1. **Create Environment File**
   ```bash
   cp env.example .env.local
   ```

2. **Add Your API Key**
   Edit `.env.local` and add:
   ```env
   ARKESEL_API_KEY=your_actual_api_key_here
   ```

3. **Restart Development Server**
   ```bash
   npm run dev
   ```

## 🔧 How It Works

### Phone Number Format
The system automatically handles Ghana phone number formats:
- Input: `024 123 4567` → API: `+233244123456`
- Input: `0244123456` → API: `+233244123456`  
- Input: `233244123456` → API: `+233244123456`
- Input: `+233244123456` → API: `+233244123456`

### SMS Flow
1. **User enters phone number** on login page
2. **API sends OTP** via Arkesel SMS service
3. **User receives SMS** with 6-digit code
4. **User enters OTP** on verification page
5. **API verifies OTP** with Arkesel
6. **Access granted** to application form

## 📱 Testing the Integration

### Development Testing
1. **Start the server**: `npm run dev`
2. **Visit**: `http://localhost:3000`
3. **Navigate**: Home → HOW TO APPLY → Apply Now
4. **Enter Ghana phone number**: e.g., `024 123 4567`
5. **Check your phone** for SMS with OTP
6. **Enter OTP** to verify

### Test Phone Numbers
For development, Arkesel provides test numbers:
- Use your actual Ghana mobile number
- Small cost per SMS (a few pesewas)
- Check your SMS immediately

## 🛡️ Security Features

### OTP Security
- **6-digit numeric codes**
- **5-minute expiration**
- **One-time use only**
- **Rate limiting** on requests

### Phone Validation
- **Ghana format required** (+233)
- **Input sanitization**
- **Format normalization**
- **Invalid format rejection**

### Error Handling
- **Network timeouts**
- **Invalid phone numbers**
- **Expired OTP codes**
- **API failures**

## 🚨 Troubleshooting

### Common Issues

**"Failed to send OTP"**
- Check your API key is correct
- Verify you have sufficient credits
- Ensure phone number is valid Ghana format

**"Invalid OTP code"**
- Check the 6-digit code was entered correctly
- Verify the code hasn't expired (5 minutes)
- Try requesting a new code

**"Network error"**
- Check internet connection
- Verify Arkesel service is operational
- Try again in a few moments

### API Response Codes
- `1100`: Success
- `1104`: Invalid code
- `1105`: Code expired
- `1102/1103`: Invalid phone format

## 📊 Monitoring & Analytics

### Check SMS Usage
- Monitor your Arkesel dashboard
- Track SMS credits consumed
- View delivery reports

### Application Logs
Check server logs for:
- API request/response details
- Error messages
- Phone number formatting

## 💰 Cost Optimization

### Best Practices
- **Implement rate limiting** to prevent abuse
- **Cache phone numbers** to avoid duplicate sends
- **Set reasonable OTP expiry** times
- **Monitor usage** regularly

### Typical Costs
- SMS OTP: ~0.04 GHS per message
- Budget estimation: 100 applications = ~4 GHS

## 🔄 API Endpoints

### Send OTP
```
POST /api/send-otp
Body: { "phoneNumber": "024 123 4567" }
```

### Verify OTP  
```
POST /api/verify-otp
Body: { "phoneNumber": "+233244123456", "code": "123456" }
```

## 🚀 Production Deployment

### Environment Variables
Ensure `.env.local` (or production environment) contains:
```env
ARKESEL_API_KEY=your_production_api_key
```

### Security Checklist
- ✅ API key secured and not in source control
- ✅ Rate limiting implemented
- ✅ Input validation in place
- ✅ Error handling configured
- ✅ Monitoring set up

---

For support, contact:
- **Arkesel Support**: [support@arkesel.com](mailto:support@arkesel.com)
- **VisionTech**: visiontechinst@gmail.com
