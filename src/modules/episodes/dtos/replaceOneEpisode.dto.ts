import { IsString } from 'class-validator';

import { IdDto } from '../../../dtos/id.dto';

export class ReplaceOneEpisodeDto extends IdDto {
  @IsString()
  name: string;
}
