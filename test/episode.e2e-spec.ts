import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import TestAgent from 'supertest/lib/agent';

import { AppModule } from '../src/app.module';
import { EpisodesService } from '../src/modules/episodes/episodes.service';
import { PaginationQueryDto } from '../src/dtos/pagination.query.dto';
import { Episode } from '../src/entities/episode.entity';
import { CharactersService } from '../src/modules/characters/characters.service';
import { SaveEpisodeDto } from '../src/dtos/saveEpisode.dto';

describe('EpisodeController (e2e)', () => {
  let api: TestAgent;
  let episodesService: EpisodesService;
  let charactersService: CharactersService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();
    const app = moduleFixture.createNestApplication<INestApplication<App>>();
    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
    global.app = app;
    episodesService = moduleFixture.get(EpisodesService);
    charactersService = moduleFixture.get(CharactersService);

    await app.init();
    api = request(app.getHttpServer());
  });

  afterEach(async () => {
    const episodes = await episodesService.find(new PaginationQueryDto());

    const charactersPromises = episodes.flatMap((episode) =>
      episode.characters.map((character) =>
        episodesService.deleteCharacter(episode._id.toString(), character._id.toString()),
      ),
    );
    await Promise.all(charactersPromises);

    const episodesPromises = episodes.map((episode) => episodesService.deleteOne(episode._id.toString()));
    await Promise.all(episodesPromises);
  });

  describe('/episodes (GET)', () => {
    let episodes: Episode[];

    beforeEach(async () => {
      episodes = [
        await episodesService.save({ name: 'Episode 0' }),
        await episodesService.save({ name: 'Episode 1' }),
        await episodesService.save({ name: 'Episode 2' }),
      ];
    });

    it('should return all episodes', async () => {
      const result = await api.get('/episodes').expect(HttpStatus.OK);

      const names = (result.body as Episode[]).map((episode) => episode.name);
      expect(names).toEqual(['Episode 0', 'Episode 1', 'Episode 2']);
    });

    it('should omit first episode', async () => {
      const result = await api.get('/episodes').query({ offset: 1 }).expect(HttpStatus.OK);

      const names = (result.body as Episode[]).map((episode) => episode.name);
      expect(names).toEqual(['Episode 1', 'Episode 2']);
    });

    it('should return two episodes from the beggining', async () => {
      const result = await api.get('/episodes').query({ limit: 2 }).expect(HttpStatus.OK);

      const names = (result.body as Episode[]).map((episode) => episode.name);
      expect(names).toEqual(['Episode 0', 'Episode 1']);
    });

    it('should return all episodes and first one should contain character id', async () => {
      const character = await charactersService.save({ name: 'Character 0' });
      await episodesService.addCharacter(episodes[0]._id.toString(), character._id.toString());

      const result = await api.get('/episodes').expect(HttpStatus.OK);

      const names = (result.body as Episode[]).map((episode) => episode.name);
      expect(names).toEqual(['Episode 0', 'Episode 1', 'Episode 2']);

      const charactersArrays = (result.body as Episode[]).map((episode) => episode.characters);
      expect(charactersArrays).toEqual([[character._id.toString()], [], []]);
    });

    it('should return all episodes and first one should be populated', async () => {
      const character = await charactersService.save({ name: 'Character 0' });
      await episodesService.addCharacter(episodes[0]._id.toString(), character._id.toString());

      const result = await api.get('/episodes').query({ populate: 1 }).expect(HttpStatus.OK);

      const names = (result.body as Episode[]).map((episode) => episode.name);
      expect(names).toEqual(['Episode 0', 'Episode 1', 'Episode 2']);

      const charactersArrays = (result.body as Episode[]).map((episode) => episode.characters);
      expect(charactersArrays[0][0]._id).toEqual(character._id.toString());
    });
  });

  describe('/episodes (POST)', () => {
    it('should create new episode with a given name', async () => {
      await api.post('/episodes').send({ name: 'Episode 0' }).expect(HttpStatus.CREATED);

      const episodes = await episodesService.find(new PaginationQueryDto());
      const names = episodes.map((episode) => episode.name);
      expect(names).toEqual(['Episode 0']);
    });

    it('should return 400 for bad body', async () => {
      await api.post('/episodes').expect(HttpStatus.BAD_REQUEST);

      const episodes = await episodesService.find(new PaginationQueryDto());
      const names = episodes.map((episode) => episode.name);
      expect(names).toEqual([]);
    });
  });
});
