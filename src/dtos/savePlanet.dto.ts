import { IsString, MaxLength, MinLength } from 'class-validator';

import { SaveDto } from './save.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SavePlanetDto extends SaveDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  name: string;
}
