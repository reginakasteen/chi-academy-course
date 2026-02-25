import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional({ example: 1 })
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  limit?: number = 10;
}