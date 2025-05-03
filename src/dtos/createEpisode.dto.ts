import { IsEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';

import { CreateDto } from './create.dto';

export class CreateEpisodeDto extends CreateDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;

  @IsEmpty()
  characters: ObjectId[];
}
