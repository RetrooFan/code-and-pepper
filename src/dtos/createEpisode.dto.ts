import { IsEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateEpisodeDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;

  @IsEmpty()
  characters: ObjectId[];
}
