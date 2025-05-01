import { CreateEpisodeDto } from './createEpisode.dto';
import { IsMongoId } from 'class-validator';

export class ReplaceOneEpisodeDto extends CreateEpisodeDto {
  @IsMongoId()
  id: string;
}
