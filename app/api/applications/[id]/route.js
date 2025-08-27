import { prisma } from '@/lib/prisma';

// GET - Fetch single application by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            phoneNumber: true,
            isVerified: true,
            createdAt: true
          }
        },
        documents: {
          select: {
            id: true,
            documentType: true,
            fileName: true,
            originalName: true,
            fileSize: true,
            fileUrl: true,
            uploadedAt: true
          }
        }
      }
    });

    if (!application) {
      return Response.json({
        success: false,
        message: 'Application not found'
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: application
    });
  } catch (error) {
    console.error('Error fetching application:', error);
    return Response.json({
      success: false,
      message: 'Failed to fetch application'
    }, { status: 500 });
  }
}

// PUT - Update application
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // Check if application exists
    const existingApplication = await prisma.application.findUnique({
      where: { id }
    });

    if (!existingApplication) {
      return Response.json({
        success: false,
        message: 'Application not found'
      }, { status: 404 });
    }

    // Prevent updates to submitted applications (unless admin)
    if (existingApplication.status === 'SUBMITTED' && !body.isAdmin) {
      return Response.json({
        success: false,
        message: 'Cannot modify submitted applications'
      }, { status: 403 });
    }

    // Prepare update data
    const updateData = {};
    
    if (body.personalInfo) {
      Object.assign(updateData, {
        firstName: body.personalInfo.firstName,
        surname: body.personalInfo.surname,
        gender: body.personalInfo.gender?.toUpperCase(),
        dateOfBirth: body.personalInfo.dateOfBirth ? new Date(body.personalInfo.dateOfBirth) : undefined,
        email: body.personalInfo.email,
        telephone: body.personalInfo.telephone,
        nationality: body.personalInfo.nationality,
        address: body.personalInfo.address,
        gpsAddress: body.personalInfo.gpsAddress
      });
    }

    if (body.guardianInfo) {
      Object.assign(updateData, {
        guardianName: body.guardianInfo.guardianName,
        guardianOccupation: body.guardianInfo.guardianOccupation,
        guardianTelephone: body.guardianInfo.guardianTelephone
      });
    }

    if (body.educationInfo) {
      Object.assign(updateData, {
        highestEducation: body.educationInfo.highestEducation,
        yearCompleted: body.educationInfo.yearCompleted ? parseInt(body.educationInfo.yearCompleted) : undefined
      });
    }

    if (body.programInfo) {
      Object.assign(updateData, {
        programType: body.programInfo.programType?.toUpperCase(),
        specificProgram: body.programInfo.specificProgram
      });
    }

    if (body.status) {
      updateData.status = body.status;
      if (body.status === 'SUBMITTED') {
        updateData.submittedAt = new Date();
      }
    }

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedApplication = await prisma.application.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            phoneNumber: true
          }
        },
        documents: true
      }
    });

    return Response.json({
      success: true,
      message: 'Application updated successfully',
      data: updatedApplication
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return Response.json({
      success: false,
      message: 'Failed to update application'
    }, { status: 500 });
  }
}

// DELETE - Delete application
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Check if application exists
    const existingApplication = await prisma.application.findUnique({
      where: { id },
      include: {
        documents: true
      }
    });

    if (!existingApplication) {
      return Response.json({
        success: false,
        message: 'Application not found'
      }, { status: 404 });
    }

    // Prevent deletion of submitted applications (unless admin)
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    if (existingApplication.status === 'SUBMITTED' && !isAdmin) {
      return Response.json({
        success: false,
        message: 'Cannot delete submitted applications'
      }, { status: 403 });
    }

    // Delete application (cascade will handle related records)
    await prisma.application.delete({
      where: { id }
    });

    // TODO: Delete associated files from storage

    return Response.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    return Response.json({
      success: false,
      message: 'Failed to delete application'
    }, { status: 500 });
  }
}
