import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Character } from './character.entity';
import { Id } from './id.entity';

export type EpisodeDocument = Episode & Document;

@Schema({ timestamps: true })
export class Episode extends Id {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId] })
  characters: Character[];
}

export const episodeSchema = SchemaFactory.createForClass(Episode);
