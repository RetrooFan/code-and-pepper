import { IsString, MaxLength, MinLength } from 'class-validator';

import { SaveDto } from './create.dto';

export class SavePlanetDto extends SaveDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;
}
