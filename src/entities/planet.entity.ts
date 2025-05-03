import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Character } from './character.entity';

export type PlanetDocument = Planet & Document;

@Schema({ timestamps: true })
export class Planet {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId] })
  characters: Character[];
}

export const planetSchema = SchemaFactory.createForClass(Planet);
