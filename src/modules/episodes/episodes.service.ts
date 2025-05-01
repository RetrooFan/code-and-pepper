import { Injectable } from '@nestjs/common';
import { EpisodeRepository } from '../../repositories/episode.repository';

@Injectable()
export class EpisodesService {
  constructor(private readonly episodeRepository: EpisodeRepository) {}

  find() {
    return this.episodeRepository.find();
  }

  create(body: any) {
    return this.episodeRepository.create(body);
  }
}
