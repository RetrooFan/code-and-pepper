import { IsOptional } from 'class-validator';

import { UpdateOnePlanetDto } from './updateOnePlanet.dto';

export class CreatePlanetDto extends UpdateOnePlanetDto {
  @IsOptional()
  declare id: string;
}
