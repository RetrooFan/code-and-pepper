import { IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationQueryDto {
  @ApiPropertyOptional({ type: Number })
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => parseInt(value as string))
  offset = 0;

  @ApiPropertyOptional({ type: Number })
  @Min(1)
  @Max(1000)
  @IsNumber()
  @Transform(({ value }) => parseInt(value as string))
  limit = 10;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @IsIn([0, 1])
  @Transform(({ value }) => parseInt(value as string))
  populate: number;
}
