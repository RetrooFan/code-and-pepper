import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { PlanetsRepository } from '../../repositories/planets.repository';
import { SavePlanetDto } from '../../dtos/savePlanet.dto';
import { UpdateOnePlanetDto } from '../../dtos/updateOnePlanet.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { CharactersRepository } from '../../repositories/characters.repository';
import { transaction } from '../../utils/transaction';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly planetsRepository: PlanetsRepository,
    private readonly charactersRepository: CharactersRepository,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.planetsRepository.find(paginationQueryDto);
  }

  save(savePlanetDto: SavePlanetDto) {
    return this.planetsRepository.save(savePlanetDto);
  }

  updateOne(planetId: string, updateOnePlanetDto: UpdateOnePlanetDto) {
    return this.planetsRepository.updateOne(planetId, updateOnePlanetDto);
  }

  deleteOne(planetId: string) {
    return this.planetsRepository.deleteOne(planetId);
  }

  async addCharacter(planetId: string, characterId: string) {
    const planet = await this.planetsRepository.findById(planetId);
    if (!planet) {
      throw new HttpException('No such a planet.', 404);
    }

    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 404);
    }

    if (planet.characters.find((element) => element._id.equals(characterId))) {
      throw new HttpException('Character already added for this planet.', 409);
    }

    planet.characters.push(character);
    character.planet = planet;

    await transaction(async (session) => {
      await this.planetsRepository.updateOne(planetId, planet, session);
      await this.charactersRepository.updateOne(characterId, character, session);
    }, this.connection);

    return this.planetsRepository.findById(planetId);
  }

  async deleteCharacter(planetId: string, characterId: string) {
    const planet = await this.planetsRepository.findById(planetId);
    if (!planet) {
      throw new HttpException('No such a planet.', 404);
    }

    const character = await this.charactersRepository.findById(characterId);
    if (!character) {
      throw new HttpException('No such a character.', 404);
    }

    const characterIndex = planet.characters.findIndex((element) => element._id.equals(characterId));
    if (characterIndex < 0) {
      throw new HttpException('No such a character for this planet.', 404);
    }

    planet.characters.splice(characterIndex, 1);
    character.planet = null;

    await transaction(async (session) => {
      await this.planetsRepository.updateOne(planetId, planet, session);
      await this.charactersRepository.updateOne(characterId, character, session);
    }, this.connection);

    return this.planetsRepository.findById(planetId);
  }
}
