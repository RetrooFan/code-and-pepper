import { IsOptional } from 'class-validator';

import { ReplaceOneEpisodeDto } from './replaceOneEpisode.dto';

export class CreateEpisodeDto extends ReplaceOneEpisodeDto {
  @IsOptional()
  declare id: string;
}
