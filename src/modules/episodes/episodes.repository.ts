import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Episode, EpisodeDocument } from '../../entities/episode.entity';
import { DbConnection } from '../../enums/dbConnection.enum';
import { CreateEpisodeDto } from './dtos/createEpisode.dto';
import { UpdateOneEpisodeDto } from './dtos/updateOneEpisode.dto';
import { PaginationQueryDto } from '../../dtos/pagination.query.dto';
import { IdDto } from '../../dtos/id.dto';

@Injectable()
export class EpisodesRepository {
  constructor(
    @InjectModel(Episode.name, DbConnection.EPISODES)
    private readonly episodeModel: Model<EpisodeDocument>,
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

  updateOne(idDto: IdDto, updateOneEpisodeDto: UpdateOneEpisodeDto) {
    return this.episodeModel.updateOne({ _id: idDto.id }, updateOneEpisodeDto);
  }

  deleteOne(idDto: IdDto) {
    return this.episodeModel.deleteOne({ _id: idDto.id });
  }
}
