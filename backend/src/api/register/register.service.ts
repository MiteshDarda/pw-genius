import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { S3Service } from '../../shared/services/s3.service';
import {
  RegisterLog,
  RegisterLogDocument,
} from './schemas/register-log.schema';

@Injectable()
export class RegisterService {
  constructor(
    private readonly s3Service: S3Service,
    @InjectModel(RegisterLog.name)
    private registerLogModel: Model<RegisterLogDocument>,
  ) {}

  async create(
    createRegisterDto: CreateRegisterDto,
    file?: Express.Multer.File,
  ) {
    // Check if user has already submitted a registration
    const existingRegistration = await this.registerLogModel.findOne({
      userId: createRegisterDto.userId,
    });

    if (existingRegistration) {
      throw new ConflictException(
        'User has already submitted a registration. Duplicate submissions are not allowed.',
      );
    }

    let fileUrl: string | undefined;
    let fileSize: number | undefined;
    let fileMimeType: string | undefined;

    if (file) {
      console.log('File uploaded:', {
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      });

      fileSize = file.size;
      fileMimeType = file.mimetype;

      try {
        fileUrl = await this.s3Service.uploadFile(file);
        console.log('File saved to S3 at:', fileUrl);
      } catch (error) {
        console.error('Failed to upload file to S3:', error);
        throw new Error('Failed to upload file to S3');
      }
    }

    // Save successful registration to MongoDB
    const savedLog = await this.saveToMongoDB(createRegisterDto, file, fileUrl);

    // TODO: Save to database when database is configured
    // For now, just return success response
    return {
      message: 'Registration submitted successfully!',
      data: {
        ...createRegisterDto,
        fileUploaded: !!file,
        fileName: file?.originalname,
        fileUrl: fileUrl,
      },
      status: 'success',
      logId: savedLog._id,
    };
  }

  private async saveToMongoDB(
    createRegisterDto: CreateRegisterDto,
    file?: Express.Multer.File,
    fileUrl?: string,
    errorMessage?: string,
  ): Promise<RegisterLogDocument> {
    const logData = {
      ...createRegisterDto,
      fileUploaded: !!file,
      fileName: file?.originalname,
      fileUrl: fileUrl,
      fileSize: file?.size,
      fileMimeType: file?.mimetype,
      originalData: createRegisterDto,
      status: errorMessage ? 'error' : 'pending',
      errorMessage: errorMessage,
    };

    const registerLog = new this.registerLogModel(logData);
    return await registerLog.save();
  }

  findAll() {
    return this.registerLogModel.find().exec();
  }

  async checkUserRegistration(userId: string) {
    const existingRegistration = await this.registerLogModel.findOne({
      userId: userId,
    });

    if (existingRegistration) {
      return {
        hasRegistered: true,
        status: existingRegistration.status,
        registrationDate: (existingRegistration as any).createdAt,
        message: 'User has already registered',
        data: {
          studentName: existingRegistration.studentName,
          class: existingRegistration.class,
          examName: existingRegistration.examName,
          year: existingRegistration.year,
          status: existingRegistration.status,
        },
      };
    }

    return {
      hasRegistered: false,
      message: 'User has not registered yet',
    };
  }

  async getNominations(
    search?: string,
    classFilter?: string,
    examFilter?: string,
    statusFilter?: string,
  ) {
    const filter: any = {};

    // Search filter
    if (search) {
      filter.studentName = { $regex: search, $options: 'i' };
    }

    // Class filter
    if (classFilter) {
      filter.class = classFilter;
    }

    // Exam filter
    if (examFilter) {
      filter.examName = { $regex: examFilter, $options: 'i' };
    }

    // Status filter
    if (statusFilter) {
      filter.status = statusFilter;
    }

    const nominations = await this.registerLogModel.find(filter).exec();

    return {
      nominations: nominations.map((nomination) => ({
        id: nomination._id,
        studentName: nomination.studentName,
        class: nomination.class,
        exam: nomination.examName,
        status: nomination.status,
        year: nomination.year,
        performance: nomination.performance,
        reason: nomination.reason,
        dream: nomination.dream,
        remarks: nomination.remarks,
        fileUploaded: nomination.fileUploaded,
        fileName: nomination.fileName,
        fileUrl: nomination.fileUrl,
        createdAt: (nomination as any).createdAt,
        updatedAt: (nomination as any).updatedAt,
      })),
      total: nominations.length,
    };
  }

  findOne(id: string) {
    return this.registerLogModel.findById(id).exec();
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

  remove(id: string) {
    return this.registerLogModel.findByIdAndDelete(id).exec();
  }

  async getNominationDetails(id: string) {
    const nomination = await this.registerLogModel.findById(id).exec();

    if (!nomination) {
      throw new Error('Nomination not found');
    }

    return {
      id: nomination._id,
      studentName: nomination.studentName,
      class: nomination.class,
      exam: nomination.examName,
      status: nomination.status,
      year: nomination.year,
      performance: nomination.performance,
      reason: nomination.reason,
      dream: nomination.dream,
      remarks: nomination.remarks,
      fileUploaded: nomination.fileUploaded,
      fileName: nomination.fileName,
      fileUrl: nomination.fileUrl,
      fileSize: nomination.fileSize,
      fileMimeType: nomination.fileMimeType,
      fatherName: nomination.fatherName,
      motherName: nomination.motherName,
      createdAt: (nomination as any).createdAt,
      updatedAt: (nomination as any).updatedAt,
    };
  }

  async updateNominationStatus(id: string, status: string, remarks?: string) {
    const nomination = await this.registerLogModel.findById(id).exec();

    if (!nomination) {
      throw new Error('Nomination not found');
    }

    const updateData: any = { status };
    if (remarks !== undefined) {
      updateData.remarks = remarks;
    }

    const updatedNomination = await this.registerLogModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    return {
      message: 'Nomination status updated successfully',
      nomination: {
        id: updatedNomination._id,
        studentName: updatedNomination.studentName,
        status: updatedNomination.status,
        remarks: updatedNomination.remarks,
        updatedAt: (updatedNomination as any).updatedAt,
      },
    };
  }

  async bulkUpdateStatus(ids: string[], status: string, remarks?: string) {
    const updateData: any = { status };
    if (remarks !== undefined) {
      updateData.remarks = remarks;
    }

    const result = await this.registerLogModel
      .updateMany({ _id: { $in: ids } }, updateData, { new: true })
      .exec();

    return {
      message: `Successfully updated ${result.modifiedCount} nominations`,
      updatedCount: result.modifiedCount,
      totalRequested: ids.length,
    };
  }

  async getAdminStatistics() {
    const totalNominations = await this.registerLogModel
      .countDocuments()
      .exec();
    const pendingCount = await this.registerLogModel
      .countDocuments({ status: 'pending' })
      .exec();
    const approvedCount = await this.registerLogModel
      .countDocuments({ status: 'approved' })
      .exec();
    const rejectedCount = await this.registerLogModel
      .countDocuments({ status: 'rejected' })
      .exec();

    // Get class distribution
    const classStats = await this.registerLogModel
      .aggregate([
        {
          $group: {
            _id: '$class',
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .exec();

    // Get exam distribution
    const examStats = await this.registerLogModel
      .aggregate([
        {
          $group: {
            _id: '$examName',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .exec();

    // Get recent nominations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentNominations = await this.registerLogModel
      .countDocuments({
        createdAt: { $gte: sevenDaysAgo },
      })
      .exec();

    return {
      totalNominations,
      statusBreakdown: {
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount,
      },
      classDistribution: classStats,
      examDistribution: examStats,
      recentNominations,
      lastUpdated: new Date().toISOString(),
    };
  }

  async downloadNominationFile(id: string) {
    const nomination = await this.registerLogModel.findById(id).exec();

    if (!nomination) {
      throw new Error('Nomination not found');
    }

    if (!nomination.fileUploaded || !nomination.fileUrl) {
      throw new Error('No file available for this nomination');
    }

    try {
      // Get the file from S3
      const fileBuffer = await this.s3Service.downloadFile(nomination.fileUrl);

      return {
        fileName: nomination.fileName,
        fileSize: nomination.fileSize,
        fileMimeType: nomination.fileMimeType,
        fileBuffer: fileBuffer,
        studentName: nomination.studentName,
      };
    } catch (error) {
      throw new Error('Failed to download file');
    }
  }
}
