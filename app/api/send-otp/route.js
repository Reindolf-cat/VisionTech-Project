
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  const { phoneNumber } = await request.json();

  if (!phoneNumber) {
    return Response.json({ message: 'Phone number is required' }, { status: 400 });
  }

  // Validate and format phone number for Ghana (+233 format)
  let formattedNumber = phoneNumber.replace(/\s+/g, ''); // Remove spaces
  
  // Handle different input formats for Ghana numbers
  if (formattedNumber.startsWith('0')) {
    formattedNumber = '+233' + formattedNumber.substring(1);
  } else if (formattedNumber.startsWith('233')) {
    formattedNumber = '+' + formattedNumber;
  } else if (!formattedNumber.startsWith('+233')) {
    return Response.json({ 
      success: false, 
      message: 'Please enter a valid Ghana phone number' 
    }, { status: 400 });
  }

  try {
    // First, find or create user
    let user = await prisma.user.findUnique({
      where: { phoneNumber: formattedNumber }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          phoneNumber: formattedNumber,
          isVerified: false
        }
      });
    }

    // Invalidate any existing OTP codes for this user
    await prisma.otpCode.updateMany({
      where: {
        userId: user.id,
        isUsed: false
      },
      data: {
        isUsed: true
      }
    });

    // Send OTP via Arkesel
    const response = await fetch('https://sms.arkesel.com/api/otp/generate', {
      method: 'POST',
      headers: {
        'api-key': process.env.ARKESEL_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expiry: 5,
        length: 6,
        medium: 'sms',
        message: 'Your VisionTech verification code is %otp_code%. Code expires in %expiry% minutes.',
        number: formattedNumber,
        sender_id: 'VisionTech',
        type: 'numeric'
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Save OTP to database
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + 5); // 5 minutes from now

      await prisma.otpCode.create({
        data: {
          userId: user.id,
          code: data.code || 'pending', // Arkesel might not return the code
          phoneNumber: formattedNumber,
          expiresAt: expiresAt
        }
      });

      return Response.json({ 
        success: true, 
        message: 'OTP sent successfully to ' + formattedNumber,
        phoneNumber: formattedNumber
      });
    } else {
      console.error('Arkesel API Error:', data);
      return Response.json({ 
        success: false, 
        message: data.message || 'Failed to send OTP. Please try again.' 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    return Response.json({ 
      success: false, 
      message: 'Network error. Please check your connection and try again.' 
    }, { status: 500 });
  }
}
  
