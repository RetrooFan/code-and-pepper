import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';

import { CreateDto } from './create.dto';

export class SaveCharacterDto extends CreateDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;

  @IsOptional()
  @IsMongoId()
  planet: ObjectId;
}
