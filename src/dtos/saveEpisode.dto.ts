import { IsString, MaxLength, MinLength } from 'class-validator';

import { SaveDto } from './save.dto';

export class SaveEpisodeDto extends SaveDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;
}
