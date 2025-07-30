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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';

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
}
