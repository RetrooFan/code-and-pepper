import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { Episode } from './episode.entity';
import { Planet } from './planet.entity';

export type CharacterDocument = Character & Document;

@Schema({ timestamps: true })
export class Character {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [SchemaTypes.ObjectId] })
  episodes: Episode[];

  @Prop({ type: SchemaTypes.ObjectId })
  planet: Planet;
}

export const characterSchema = SchemaFactory.createForClass(Character);
