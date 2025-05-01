import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EpisodeDocument = EpisodeEntity & Document;

@Schema({ timestamps: true })
export class EpisodeEntity {
  @Prop({ required: true, alias: 'id' })
  _id: string;

  @Prop({ required: true })
  name: string;
}

export const episodeSchema = SchemaFactory.createForClass(EpisodeEntity);
