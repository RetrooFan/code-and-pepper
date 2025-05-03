import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { SaveDto } from './save.dto';

export class SaveCharacterDto extends SaveDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;

  @IsOptional()
  @IsMongoId()
  planet: string;
}
