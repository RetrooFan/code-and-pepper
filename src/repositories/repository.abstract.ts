import { ClientSession, Document, Model } from 'mongoose';

import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { IdDto } from '../dtos/id.dto';
import { SaveDto } from '../dtos/save.dto';

export abstract class RepositoryAbstract<TSchema> {
  protected abstract readonly modelAbstract: Model<Document>;

  find(paginationQueryDto: PaginationQueryDto) {
    return this.modelAbstract
      .find<TSchema>()
      .sort({ createdAt: 1 })
      .skip(paginationQueryDto.offset)
      .limit(paginationQueryDto.limit);
  }

  findById(idDto: IdDto) {
    return this.modelAbstract.findById<TSchema>(idDto.id);
  }

  save(saveDto: SaveDto, session?: ClientSession) {
    return new this.modelAbstract(saveDto).save({ session });
  }

  updateOne(idDto: IdDto, saveDto: SaveDto, session?: ClientSession) {
    return this.modelAbstract.updateOne({ _id: idDto.id }, saveDto, { session });
  }

  deleteOne(idDto: IdDto, session?: ClientSession) {
    return this.modelAbstract.deleteOne({ _id: idDto.id }, { session });
  }
}
