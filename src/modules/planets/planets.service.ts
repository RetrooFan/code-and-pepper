import { HttpException, Injectable } from '@nestjs/common';

import { PlanetsRepository } from '../../repositories/planets.repository';
import { SavePlanetDto } from '../../dtos/savePlanet.dto';
import { UpdateOnePlanetDto } from '../../dtos/updateOnePlanet.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
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

  async addCharacter(planetId: string, characterId: string) {
    const planet = await this.planetsRepository.findById(planetId);
    if (!planet) {
      throw new HttpException('No such a planet.', 400);
    }

    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 400);
    }

    if (planet.characters.find((element) => element._id.equals(characterId))) {
      throw new HttpException('Character already added for this planet.', 400);
    }

    planet.characters.push(character);
    character.planet = planet;

    await this.planetsRepository.updateOne(planetId, planet);
    await this.charactersRepository.updateOne(characterId, character);

    return planet;
  }

  updateOne(planetId: string, updateOnePlanetDto: UpdateOnePlanetDto) {
    return this.planetsRepository.updateOne(planetId, updateOnePlanetDto);
  }

  deleteOne(planetId: string) {
    return this.planetsRepository.deleteOne(planetId);
  }
}
