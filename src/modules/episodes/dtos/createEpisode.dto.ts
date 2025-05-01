import { IsOptional } from 'class-validator';

import { UpdateOneEpisodeDto } from './updateOneEpisode.dto';

export class CreateEpisodeDto extends UpdateOneEpisodeDto {
  @IsOptional()
  declare id: string;
}
