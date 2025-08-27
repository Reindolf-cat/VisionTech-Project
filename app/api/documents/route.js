import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

// POST - Upload document
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const applicationId = formData.get('applicationId');
    const documentType = formData.get('documentType');

    if (!file || !applicationId || !documentType) {
      return Response.json({
        success: false,
        message: 'File, application ID, and document type are required'
      }, { status: 400 });
    }

    // Validate file
    const maxSize = documentType === 'PASSPORT_PICTURE' ? 2 * 1024 * 1024 : 5 * 1024 * 1024; // 2MB for images, 5MB for documents
    if (file.size > maxSize) {
      return Response.json({
        success: false,
        message: `File size exceeds ${maxSize / (1024 * 1024)}MB limit`
      }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = {
      'PASSPORT_PICTURE': ['image/jpeg', 'image/jpg', 'image/png'],
      'PROOF_OF_EDUCATION': ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    };

    if (!allowedTypes[documentType]?.includes(file.type)) {
      return Response.json({
        success: false,
        message: 'Invalid file type'
      }, { status: 400 });
    }

    // Check if application exists
    const application = await prisma.application.findUnique({
      where: { id: applicationId }
    });

    if (!application) {
      return Response.json({
        success: false,
        message: 'Application not found'
      }, { status: 404 });
    }

    // Create upload directory
    const uploadDir = join(process.cwd(), 'public', 'uploads', applicationId);
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const fileName = `${documentType.toLowerCase()}_${timestamp}.${extension}`;
    const filePath = join(uploadDir, fileName);

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Save document record to database
    const document = await prisma.document.create({
      data: {
        applicationId: applicationId,
        documentType: documentType,
        fileName: fileName,
        originalName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        fileUrl: `/uploads/${applicationId}/${fileName}`
      }
    });

    return Response.json({
      success: true,
      message: 'Document uploaded successfully',
      data: document
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return Response.json({
      success: false,
      message: 'Failed to upload document'
    }, { status: 500 });
  }
}

// GET - List documents for an application
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get('applicationId');

    if (!applicationId) {
      return Response.json({
        success: false,
        message: 'Application ID is required'
      }, { status: 400 });
    }

    const documents = await prisma.document.findMany({
      where: { applicationId },
      orderBy: { uploadedAt: 'desc' }
    });

    return Response.json({
      success: true,
      data: documents
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return Response.json({
      success: false,
      message: 'Failed to fetch documents'
    }, { status: 500 });
  }
}
