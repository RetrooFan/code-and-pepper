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

      const episodesNames = (result.body as Episode[]).map((episode) => episode.name);

      expect(episodesNames).toEqual(['Episode 0', 'Episode 1', 'Episode 2']);
    });

    it('should omit first episode', async () => {
      const result = await api.get('/episodes').query({ offset: 1 }).expect(HttpStatus.OK);

      const episodesNames = (result.body as Episode[]).map((episode) => episode.name);

      expect(episodesNames).toEqual(['Episode 1', 'Episode 2']);
    });

    it('should return two episodes from the beggining', async () => {
      const result = await api.get('/episodes').query({ limit: 2 }).expect(HttpStatus.OK);

      const episodesNames = (result.body as Episode[]).map((episode) => episode.name);

      expect(episodesNames).toEqual(['Episode 0', 'Episode 1']);
    });

    it('should return all episodes and first one should contain character id', async () => {
      const character = await charactersService.save({ name: 'Character 0' });
      await episodesService.addCharacter(episodes[0]._id.toString(), character._id.toString());

      const result = await api.get('/episodes').expect(HttpStatus.OK);

      const episodesNames = (result.body as Episode[]).map((episode) => episode.name);
      const charactersArrays = (result.body as Episode[]).map((episode) => episode.characters);

      expect(episodesNames).toEqual(['Episode 0', 'Episode 1', 'Episode 2']);
      expect(charactersArrays[0]).toEqual([character._id.toString()]);
    });

    it('should return all episodes and first one should be populated', async () => {
      const character = await charactersService.save({ name: 'Character 0' });
      await episodesService.addCharacter(episodes[0]._id.toString(), character._id.toString());

      const result = await api.get('/episodes').query({ populate: 1 }).expect(HttpStatus.OK);

      const episodesNames = (result.body as Episode[]).map((episode) => episode.name);
      const charactersArrays = (result.body as Episode[]).map((episode) => episode.characters);

      expect(episodesNames).toEqual(['Episode 0', 'Episode 1', 'Episode 2']);
      expect(charactersArrays[0][0]._id).toEqual(character._id.toString());
    });
  });

  describe('/episodes (POST)', () => {
    it('should create new episode with a given name', async () => {
      await api.post('/episodes').send({ name: 'Episode 0' }).expect(HttpStatus.CREATED);

      const episodes = await episodesService.find(new PaginationQueryDto());
      const episodesNames = episodes.map((episode) => episode.name);

      expect(episodesNames).toEqual(['Episode 0']);
    });

    it('should return 400 for bad body', async () => {
      await api.post('/episodes').expect(HttpStatus.BAD_REQUEST);

      const episodes = await episodesService.find(new PaginationQueryDto());
      const episodesNames = episodes.map((episode) => episode.name);

      expect(episodesNames).toEqual([]);
    });
  });

  describe('/episodes/:id (PUT)', () => {
    it('should update an episode with a given name', async () => {
      const episode = await episodesService.save({ name: 'Episode 0' });

      await api.put(`/episodes/${episode._id.toString()}`).send({ name: 'Episode 1' }).expect(HttpStatus.OK);

      const episodes = await episodesService.find(new PaginationQueryDto());
      const episodesNames = episodes.map((episode) => episode.name);

      expect(episodesNames).toEqual(['Episode 1']);
    });

    it('should return 400 for bad body', async () => {
      const episode = await episodesService.save({ name: 'Episode 0' });

      await api.put(`/episodes/${episode._id.toString()}`).expect(HttpStatus.BAD_REQUEST);

      const episodes = await episodesService.find(new PaginationQueryDto());
      const episodesNames = episodes.map((episode) => episode.name);

      expect(episodesNames).toEqual(['Episode 0']);
    });

    it('should return 404 for non existing episode', async () => {
      await api.put('/episodes/123456789012345678911234').send({ name: 'Episode 1' }).expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/episodes/:id (DELETE)', () => {
    it('should delete an episode', async () => {
      const episode = await episodesService.save({ name: 'Episode 0' });

      await api.delete(`/episodes/${episode._id.toString()}`).expect(HttpStatus.NO_CONTENT);

      const episodes = await episodesService.find(new PaginationQueryDto());
      const episodesNames = episodes.map((episode) => episode.name);

      expect(episodesNames).toEqual([]);
    });

    it('should return 404 for non existing episode', async () => {
      await episodesService.save({ name: 'Episode 0' });

      await api.delete('/episodes/123456789012345678911234').expect(HttpStatus.NOT_FOUND);

      const episodes = await episodesService.find(new PaginationQueryDto());
      const episodesNames = episodes.map((episode) => episode.name);

      expect(episodesNames).toEqual(['Episode 0']);
    });

    it('should return 409 when there are characters assigned', async () => {
      const episode = await episodesService.save({ name: 'Episode 0' });
      const character = await charactersService.save({ name: 'Character 0' });
      await episodesService.addCharacter(episode._id.toString(), character._id.toString());

      await api.delete(`/episodes/${episode._id.toString()}`).expect(HttpStatus.CONFLICT);

      const episodes = await episodesService.find(new PaginationQueryDto());
      const episodesNames = episodes.map((episode) => episode.name);

      expect(episodesNames).toEqual(['Episode 0']);
    });
  });

  describe('/episodes/:id/characters (POST)', () => {
    it('should add a character to the episode', async () => {
      const episode = await episodesService.save({ name: 'Episode 0' });
      const character = await charactersService.save({ name: 'Character 0' });

      await api
        .post(`/episodes/${episode._id.toString()}/characters`)
        .send({ id: character._id.toString() })
        .expect(HttpStatus.CREATED);

      const episodes = await episodesService.find(new PaginationQueryDto());
      const episodesNames = episodes.map((episode) => episode.name);
      const charactersNames = episodes[0].characters.map((character) => character._id.toString());

      expect(episodesNames).toEqual(['Episode 0']);
      expect(charactersNames).toEqual([character._id.toString()]);
    });
  });
});
