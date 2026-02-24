import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Res,
  NotFoundException,
  ForbiddenException,
  HttpCode
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExhibitsService } from './exhibits.service';
import type { Request, Response } from 'express';
import { uploadOptions } from './config/upload.config';
import path, { join } from 'path';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { uuid } from 'uuidv4'

@Controller('api/exhibits')
export class ExhibitsController {
    constructor(private readonly exhibitsService: ExhibitsService) {}

    @Get()
    async getAll(@Query('page') page = 1, @Query('limit') limit = 10) {
        page = Number(page);
        limit = Number(limit);
        return await this.exhibitsService.getAllExhibits(page, limit);
    }

    @Get('static/:filename')
    async getImage(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = join(process.cwd(), 'uploads', filename);
        return res.sendFile(filePath, (err) => {
            if (err) throw new NotFoundException('File not found');
        });
    }

    @Get('post/:id')
    async getById(@Param('id', ParseIntPipe) id: number) {
        return await this.exhibitsService.getExhibitById(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-posts')
    async getMyPosts(@Req() req: Request) {
        if (!req.user) throw new ForbiddenException();
        const userId = (req.user as { id: number }).id;
        const { data } = await this.exhibitsService.getAllExhibits();
        return data.filter((exhibit) => exhibit.user.id === userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @UseInterceptors(FileInterceptor('image', uploadOptions))
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body('description') description: string,
        @CurrentUser() user: JwtPayload,
    ) {
        if (!file) throw new NotFoundException('Image is required');

        const uniqueFileName = `${uuid()}${path.extname(file.filename)}`;
        const imageUrl = `uploads/${uniqueFileName}`;

        return await this.exhibitsService.createExhibit(description, imageUrl, user.sub);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @HttpCode(204)
    async delete(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user: JwtPayload,
    ) {
        await this.exhibitsService.deleteExhibit(id, user.sub);
    }
}