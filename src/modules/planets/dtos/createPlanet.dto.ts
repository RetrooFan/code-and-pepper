import { IsString } from 'class-validator';

export class CreatePlanetDto {
  @IsString()
  name: string;
}
