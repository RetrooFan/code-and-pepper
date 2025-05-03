import { HttpException, Injectable } from '@nestjs/common';

import { PlanetsRepository } from '../../repositories/planets.repository';
import { SavePlanetDto } from '../../dtos/savePlanet.dto';
import { UpdateOnePlanetDto } from '../../dtos/updateOnePlanet.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';
import { CharactersRepository } from '../../repositories/characters.repository';

@Injectable()
export class PlanetsService {
  constructor(
    private readonly planetsRepository: PlanetsRepository,
    private readonly charactersRepository: CharactersRepository,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.planetsRepository.find(paginationQueryDto);
  }

  save(savePlanetDto: SavePlanetDto) {
    return this.planetsRepository.save(savePlanetDto);
  }

  async addCharacter(planetIdDto: IdDto, characterIdDto: IdDto) {
    const planet = await this.planetsRepository.findById(planetIdDto.id);
    if (!planet) {
      throw new HttpException('No such a planet.', 400);
    }

    const character = await this.charactersRepository.findById(characterIdDto.id);
    if (!character) {
      throw new HttpException('No such a character.', 400);
    }

    planet.characters.push(character);
    character.planet = planet;

    await this.planetsRepository.updateOne(planet._id.toString(), planet);
    await this.charactersRepository.updateOne(character._id.toString(), character);

    return planet;
  }

  updateOne(idDto: IdDto, updateOnePlanetDto: UpdateOnePlanetDto) {
    return this.planetsRepository.updateOne(idDto.id, updateOnePlanetDto);
  }

  deleteOne(idDto: IdDto) {
    return this.planetsRepository.deleteOne(idDto.id);
  }
}
