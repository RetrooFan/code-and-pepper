import { IdDto } from '../../../dtos/id.dto';
import { IsString } from 'class-validator';

export class ReplaceOneEpisodeDto extends IdDto {
  @IsString()
  name: string;
}
