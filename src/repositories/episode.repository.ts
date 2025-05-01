import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Episode } from '../entities/episode.entity';
import { DbConnection } from '../enums/dbConnection.enum';
import { Model } from 'mongoose';
import { CreateEpisodeDto } from '../modules/episodes/dtos/createEpisode.dto';
import { ReplaceOneEpisodeDto } from '../modules/episodes/dtos/replaceOneEpisode.dto';
import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { DeleteOneEpisodeDto } from '../modules/episodes/dtos/deleteOneEpisode.dto';

@Injectable()
export class EpisodeRepository {
  constructor(
    @InjectModel(Episode.name, DbConnection.EPISODES)
    private readonly episodeModel: Model<Episode>,
  ) {}

  find(paginationQueryDto: PaginationQueryDto) {
    return this.episodeModel
      .find<Episode>()
      .sort({ createdAt: 1 })
      .skip(paginationQueryDto.offset)
      .limit(paginationQueryDto.limit);
  }

  create(createEpisodeDto: CreateEpisodeDto) {
    return this.episodeModel.create(createEpisodeDto);
  }

  replaceOne(replaceOneEpisodeDto: ReplaceOneEpisodeDto) {
    return this.episodeModel.replaceOne({ _id: replaceOneEpisodeDto.id }, replaceOneEpisodeDto);
  }

  deleteOne(deleteOneEpisodeDto: DeleteOneEpisodeDto) {
    return this.episodeModel.deleteOne({ _id: deleteOneEpisodeDto.id });
  }
}
