import { IsString, MaxLength, MinLength } from 'class-validator';

import { SaveDto } from './save.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SaveEpisodeDto extends SaveDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;
}
