import { IsMongoId, IsOptional } from 'class-validator';

export class IdDto {
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsMongoId()
  id2: string;
}
