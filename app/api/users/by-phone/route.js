import { prisma } from '@/lib/prisma';

// POST - Find user by phone number
export async function POST(request) {
  try {
    const { phoneNumber } = await request.json();

    if (!phoneNumber) {
      return Response.json({
        success: false,
        message: 'Phone number is required'
      }, { status: 400 });
    }

    // Format phone number consistently
    let formattedNumber = phoneNumber.replace(/\s+/g, '');
    if (formattedNumber.startsWith('0')) {
      formattedNumber = '+233' + formattedNumber.substring(1);
    } else if (formattedNumber.startsWith('233')) {
      formattedNumber = '+' + formattedNumber;
    }

    const user = await prisma.user.findUnique({
      where: { phoneNumber: formattedNumber },
      select: {
        id: true,
        phoneNumber: true,
        isVerified: true,
        createdAt: true
      }
    });

    if (!user) {
      return Response.json({
        success: false,
        message: 'User not found'
      }, { status: 404 });
    }

    if (!user.isVerified) {
      return Response.json({
        success: false,
        message: 'User not verified'
      }, { status: 400 });
    }

    return Response.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error finding user by phone:', error);
    return Response.json({
      success: false,
      message: 'Failed to find user'
    }, { status: 500 });
  }
}
