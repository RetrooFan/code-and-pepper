import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { Character } from './character.entity';

export type EpisodeDocument = Episode & Document;

@Schema({ timestamps: true })
export class Episode {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [SchemaTypes.ObjectId] })
  characters: Character[];
}

export const episodeSchema = SchemaFactory.createForClass(Episode);
