import { IsString } from 'class-validator';

import { IdDto } from '../../../dtos/id.dto';

export class UpdateOneEpisodeDto extends IdDto {
  @IsString()
  name: string;
}
