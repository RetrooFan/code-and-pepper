import { CreateEpisodeDto } from './createEpisode.dto';
import { IsMongoId } from 'class-validator';

export class ReplaceEpisodeDto extends CreateEpisodeDto {
  @IsMongoId()
  id: string;
}
