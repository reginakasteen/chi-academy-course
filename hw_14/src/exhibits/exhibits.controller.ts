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
import type { Response } from 'express';
import { uploadOptions } from './config/upload.config';
import path, { join } from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { uuid } from 'uuidv4'
import { ExhibitResponseDto } from './dto/exhibit-response.dto';

@ApiTags('Exhibits')
@Controller('api/exhibits')
export class ExhibitsController {
  constructor(private readonly exhibitsService: ExhibitsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all exhibits (paginated)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({
    status: 200,
    description: 'List of exhibits',
    type: [ExhibitResponseDto],
  })
  async getAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return await this.exhibitsService.getAllExhibits(Number(page), Number(limit));
  }

  @Get('post/:id')
  @ApiOperation({ summary: 'Get exhibit by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Exhibit found',
    type: ExhibitResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Exhibit not found' })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.exhibitsService.getExhibitById(id);
  }

  @Get('static/:filename')
  @ApiOperation({ summary: 'Get exhibit image file' })
  @ApiParam({ name: 'filename', example: 'uuid.jpg' })
  @ApiResponse({ status: 200, description: 'Image file' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', filename);
    return res.sendFile(filePath);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('my-posts')
  @ApiOperation({ summary: 'Get current user exhibits' })
  @ApiResponse({
    status: 200,
    description: 'User exhibits',
    type: [ExhibitResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMyPosts(@CurrentUser() user: JwtPayload) {
    const { data } = await this.exhibitsService.getAllExhibits();
    return data.filter((exhibit) => exhibit.user.id === user.sub);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create new exhibit' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Exhibit creation data',
    schema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          example: 'Ancient Greek vase',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['description', 'image'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Exhibit successfully created',
    type: ExhibitResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Image is required' })
  @UseInterceptors(FileInterceptor('image', uploadOptions))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('description') description: string,
    @CurrentUser() user: JwtPayload,
  ) {
    if (!file) throw new NotFoundException('Image is required');

    const uniqueFileName = `${uuid()}${path.extname(file.originalname)}`;
    const imageUrl = `uploads/${uniqueFileName}`;

    return await this.exhibitsService.createExhibit(
      description,
      imageUrl,
      user.sub,
    );
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete exhibit by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 204, description: 'Exhibit deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Exhibit not found' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: JwtPayload,
  ) {
    await this.exhibitsService.deleteExhibit(id, user.sub);
  }
}