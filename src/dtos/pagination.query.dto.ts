import { IsIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationQueryDto {
  @Min(0)
  @IsNumber()
  @Transform(({ value }) => parseInt(value as string))
  offset = 0;

  @Min(1)
  @Max(1000)
  @IsNumber()
  @Transform(({ value }) => parseInt(value as string))
  limit = 10;

  @IsOptional()
  @IsIn([0, 1])
  @Transform(({ value }) => parseInt(value as string))
  populate: number;
}
