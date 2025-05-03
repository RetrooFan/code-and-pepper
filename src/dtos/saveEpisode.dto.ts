import { IsString, MaxLength, MinLength } from 'class-validator';

import { CreateDto } from './create.dto';

export class SaveEpisodeDto extends CreateDto {
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  name: string;
}
