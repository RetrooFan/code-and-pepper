import { Transform } from 'class-transformer';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class IdDto {
  @IsMongoId()
  @Transform(({ value }) => new Types.ObjectId(value as string))
  id: Types.ObjectId;
}
