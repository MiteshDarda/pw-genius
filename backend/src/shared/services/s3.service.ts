import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('aws.region');
    const accessKeyId = this.configService.get<string>('aws.accessKeyId');
    const secretAccessKey = this.configService.get<string>(
      'aws.secretAccessKey',
    );

    console.log('Initializing S3 client with region:', region);
    console.log('S3 Bucket:', this.configService.get<string>('aws.s3Bucket'));

    this.s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    bucketName: string = this.configService.get<string>('aws.s3Bucket'),
  ): Promise<string> {
    const fileName = `uploads/${Date.now()}-${file.originalname}`;
    const region = this.configService.get<string>('aws.region');

    const uploadParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      console.log('Attempting to upload to S3...');
      console.log('Bucket:', bucketName);
      console.log('Region:', region);
      console.log('File:', fileName);

      await this.s3Client.send(new PutObjectCommand(uploadParams));

      const fileUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;

      console.log('File uploaded to S3 successfully!');
      console.log('S3 Location:', fileUrl);
      console.log('Bucket:', bucketName);
      console.log('Key:', fileName);

      return fileUrl;
    } catch (error) {
      console.error('Error uploading file to S3:', error);

      // Handle region redirect errors specifically
      if (
        error.name === 'PermanentRedirect' ||
        error.$metadata?.httpStatusCode === 301
      ) {
        console.error('Region mismatch detected. Please check:');
        console.error('1. AWS_REGION environment variable');
        console.error('2. S3 bucket region in AWS Console');
        console.error('3. Make sure bucket and region match');
      }

      throw new Error(`Failed to upload file to S3: ${error.message}`);
    }
  }
}
