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

  findOne(id: string) {
    return this.registerLogModel.findById(id).exec();
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

  remove(id: string) {
    return this.registerLogModel.findByIdAndDelete(id).exec();
  }
}
