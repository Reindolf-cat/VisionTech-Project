import { prisma } from '@/lib/prisma';

// GET - Fetch all applications (with pagination and filtering)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Build where clause
    const where = {};
    if (status) {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { surname: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { applicationNumber: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              phoneNumber: true,
              isVerified: true
            }
          },
          documents: {
            select: {
              documentType: true,
              fileName: true,
              uploadedAt: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.application.count({ where })
    ]);

    return Response.json({
      success: true,
      data: applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return Response.json({
      success: false,
      message: 'Failed to fetch applications'
    }, { status: 500 });
  }
}

// POST - Create new application
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      userId,
      personalInfo,
      guardianInfo,
      educationInfo,
      programInfo
    } = body;

    // Validate required fields
    if (!userId || !personalInfo || !guardianInfo || !educationInfo || !programInfo) {
      return Response.json({
        success: false,
        message: 'All application sections are required'
      }, { status: 400 });
    }

    // Check if user exists and is verified
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user || !user.isVerified) {
      return Response.json({
        success: false,
        message: 'User not found or not verified'
      }, { status: 400 });
    }

    // Generate unique application number
    const applicationNumber = `VT${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    // Create application
    const application = await prisma.application.create({
      data: {
        userId: userId,
        applicationNumber,
        // Personal Information
        firstName: personalInfo.firstName,
        surname: personalInfo.surname,
        gender: personalInfo.gender.toUpperCase(),
        dateOfBirth: new Date(personalInfo.dateOfBirth),
        email: personalInfo.email,
        telephone: personalInfo.telephone,
        nationality: personalInfo.nationality,
        address: personalInfo.address,
        gpsAddress: personalInfo.gpsAddress || null,
        
        // Guardian Information
        guardianName: guardianInfo.guardianName,
        guardianOccupation: guardianInfo.guardianOccupation,
        guardianTelephone: guardianInfo.guardianTelephone,
        
        // Education Information
        highestEducation: educationInfo.highestEducation,
        yearCompleted: parseInt(educationInfo.yearCompleted),
        
        // Program Information
        programType: programInfo.programType.toUpperCase(),
        specificProgram: programInfo.specificProgram,
        
        status: 'DRAFT'
      },
      include: {
        user: {
          select: {
            phoneNumber: true
          }
        }
      }
    });

    return Response.json({
      success: true,
      message: 'Application created successfully',
      data: application
    });
  } catch (error) {
    console.error('Error creating application:', error);
    return Response.json({
      success: false,
      message: 'Failed to create application'
    }, { status: 500 });
  }
}
