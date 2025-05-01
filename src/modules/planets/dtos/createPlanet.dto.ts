import { IsOptional } from 'class-validator';

import { ReplaceOnePlanetDto } from './replaceOnePlanet.dto';

export class CreatePlanetDto extends ReplaceOnePlanetDto {
  @IsOptional()
  declare id: string;
}
