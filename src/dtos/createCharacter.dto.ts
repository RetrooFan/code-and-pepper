import { IsEmpty, IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';

import { CreateDto } from './create.dto';

export class CreateCharacterDto extends CreateDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;

  @IsEmpty()
  episodes: ObjectId[];

  @IsOptional()
  @IsMongoId()
  planet: ObjectId;
}
