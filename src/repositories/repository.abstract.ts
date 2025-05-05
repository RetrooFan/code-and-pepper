import { ClientSession, Model } from 'mongoose';

import { PaginationQueryDto } from '../dtos/pagination.query.dto';
import { SaveDto } from '../dtos/save.dto';
import { HttpException } from '@nestjs/common';

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
    const docuemnt = await this.findById(_id);

    if (!docuemnt) {
      throw new HttpException('No such a document.', 404);
    }

    return this.findById(_id);
  }

  async deleteOne(_id: string, session?: ClientSession) {
    const document = await this.findById(_id);

    if (!document) {
      throw new HttpException('No such a document.', 404);
    }

    return (await this.modelAbstract.deleteOne({ _id }, { session })) as TSchema;
  }
}
