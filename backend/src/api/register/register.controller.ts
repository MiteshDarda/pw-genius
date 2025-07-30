import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Query,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { BulkUpdateDto } from './dto/bulk-update.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createRegisterDto: CreateRegisterDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 25 * 1024 * 1024 }), // 25MB
          new FileTypeValidator({ fileType: '.(zip)' }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    return this.registerService.create(createRegisterDto, file);
  }

  @Get('check/:userId')
  async checkUserRegistration(@Param('userId') userId: string) {
    return this.registerService.checkUserRegistration(userId);
  }

  @Get('logs')
  findAll() {
    return this.registerService.findAll();
  }

  @Get('logs/:id')
  findOne(@Param('id') id: string) {
    return this.registerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegisterDto: UpdateRegisterDto,
  ) {
    return this.registerService.update(+id, updateRegisterDto);
  }

  @Delete('logs/:id')
  remove(@Param('id') id: string) {
    return this.registerService.remove(id);
  }

  @Get('admin/nominations')
  async getNominations(
    @Query('search') search?: string,
    @Query('class') classFilter?: string,
    @Query('exam') examFilter?: string,
    @Query('status') statusFilter?: string,
  ) {
    return this.registerService.getNominations(
      search,
      classFilter,
      examFilter,
      statusFilter,
    );
  }

  @Get('admin/nominations/:id')
  async getNominationDetails(@Param('id') id: string) {
    return this.registerService.getNominationDetails(id);
  }

  @Put('admin/nominations/:id/status')
  async updateNominationStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.registerService.updateNominationStatus(
      id,
      updateStatusDto.status,
      updateStatusDto.remarks,
    );
  }

  @Post('admin/nominations/bulk-status')
  async bulkUpdateStatus(@Body() bulkUpdateDto: BulkUpdateDto) {
    return this.registerService.bulkUpdateStatus(
      bulkUpdateDto.ids,
      bulkUpdateDto.status,
      bulkUpdateDto.remarks,
    );
  }

  @Get('admin/statistics')
  async getAdminStatistics() {
    return this.registerService.getAdminStatistics();
  }

  @Get('admin/nominations/:id/download')
  async downloadNominationFile(@Param('id') id: string, @Res() res: Response) {
    try {
      const fileData = await this.registerService.downloadNominationFile(id);

      res.set({
        'Content-Type': fileData.fileMimeType,
        'Content-Disposition': `attachment; filename="${fileData.fileName}"`,
        'Content-Length': fileData.fileBuffer.length,
      });

      res.send(fileData.fileBuffer);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        message: error.message || 'File not found',
      });
    }
  }

  @Get('admin/user/:userId')
  async getUserNomination(@Param('userId') userId: string) {
    return this.registerService.getUserNomination(userId);
  }
}
