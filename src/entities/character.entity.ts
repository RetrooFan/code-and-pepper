import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Episode } from './episode.entity';
import { Planet } from './planet.entity';

export type CharacterDocument = Character & Document;

@Schema({ timestamps: true })
export class Character {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId] })
  episodes: Episode[];

  @Prop({ type: Types.ObjectId })
  planet: Planet;
}

export const characterSchema = SchemaFactory.createForClass(Character);
