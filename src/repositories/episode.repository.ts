import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Episode } from '../entities/episode.entity';
import { DbConnection } from '../enums/dbConnection.enum';
import { Model } from 'mongoose';

@Injectable()
export class EpisodeRepository {
  constructor(
    @InjectModel(Episode.name, DbConnection.EPISODES)
    private readonly episodeModel: Model<Episode>,
  ) {}

  findAll() {
    return this.episodeModel.find<Episode>().sort({ createdAt: 1 }).skip(0).limit(10);
  }

  create(body: any) {
    return this.episodeModel.create(body);
  }
}
