import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateCharacterDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;

  @IsOptional()
  @IsMongoId({ each: true })
  episodes: ObjectId[];

  @IsOptional()
  @IsMongoId()
  planet: ObjectId;
}
