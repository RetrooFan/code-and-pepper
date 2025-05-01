import { IsString } from 'class-validator';

import { IdDto } from '../../../dtos/id.dto';

export class UpdateOnePlanetDto extends IdDto {
  @IsString()
  name: string;
}
