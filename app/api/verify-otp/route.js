
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  const { phoneNumber, code } = await request.json();

  if (!phoneNumber || !code) {
    return Response.json({ message: 'Phone number and code are required' }, { status: 400 });
  }

  // Format phone number consistently
  let formattedNumber = phoneNumber.replace(/\s+/g, '');
  if (formattedNumber.startsWith('0')) {
    formattedNumber = '+233' + formattedNumber.substring(1);
  } else if (formattedNumber.startsWith('233')) {
    formattedNumber = '+' + formattedNumber;
  }

  try {
    // Find user by phone number
    const user = await prisma.user.findUnique({
      where: { phoneNumber: formattedNumber }
    });

    if (!user) {
      return Response.json({ 
        success: false, 
        message: 'User not found. Please request a new OTP.' 
      }, { status: 400 });
    }

    // Check for valid, unexpired OTP
    const validOtp = await prisma.otpCode.findFirst({
      where: {
        userId: user.id,
        phoneNumber: formattedNumber,
        isUsed: false,
        expiresAt: {
          gt: new Date()
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (!validOtp) {
      return Response.json({ 
        success: false, 
        message: 'OTP has expired or is invalid. Please request a new one.' 
      }, { status: 400 });
    }

    // Verify OTP with Arkesel
    const response = await fetch('https://sms.arkesel.com/api/otp/verify', {
      method: 'POST',
      headers: {
        'api-key': process.env.ARKESEL_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        number: formattedNumber
      })
    });

    const data = await response.json();

    if (response.ok && data.code === '1100') {
      // Mark OTP as used
      await prisma.otpCode.update({
        where: { id: validOtp.id },
        data: { isUsed: true }
      });

      // Mark user as verified
      await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true }
      });

      return Response.json({ 
        success: true, 
        message: 'OTP verified successfully',
        phoneNumber: formattedNumber,
        userId: user.id
      });
    } else {
      let errorMessage = 'Invalid or expired OTP';
      
      switch (data.code) {
        case '1104':
          errorMessage = 'Invalid OTP code. Please check and try again.';
          break;
        case '1105':
          errorMessage = 'OTP code has expired. Please request a new one.';
          break;
        case '1102':
        case '1103':
          errorMessage = 'Invalid phone number format';
          break;
        default:
          errorMessage = data.message || 'OTP verification failed. Please try again.';
      }

      return Response.json({ 
        success: false, 
        message: errorMessage 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return Response.json({ 
      success: false, 
      message: 'Network error. Please check your connection and try again.' 
    }, { status: 500 });
  }
}
