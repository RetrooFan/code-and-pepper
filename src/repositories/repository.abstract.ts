import { ClientSession, Model } from 'mongoose';

import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { SaveDto } from '../dtos/save.dto';

export abstract class RepositoryAbstract<TSchema, TDocument> {
  protected abstract readonly modelAbstract: Model<TDocument>;

  find(paginationQueryDto: PaginationQueryDto) {
    return this.modelAbstract
      .find<TSchema>()
      .sort({ createdAt: 1 })
      .skip(paginationQueryDto.offset)
      .limit(paginationQueryDto.limit);
  }

  findById(_id: string) {
    return this.modelAbstract.findById<TSchema>(_id);
  }

  async save(saveDto: SaveDto, session?: ClientSession) {
    return (await new this.modelAbstract(saveDto).save({ session })) as TSchema;
  }

  async updateOne(_id: string, saveDto: SaveDto, session?: ClientSession) {
    await this.modelAbstract.updateOne({ _id }, saveDto, { session });

    return this.findById(_id);
  }

  async deleteOne(_id: string, session?: ClientSession) {
    return (await this.modelAbstract.deleteOne({ _id }, { session })) as TSchema;
  }
}
