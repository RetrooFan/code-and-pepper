import { IsString } from 'class-validator';

import { IdDto } from '../../../dtos/id.dto';

export class ReplaceOnePlanetDto extends IdDto {
  @IsString()
  name: string;
}
