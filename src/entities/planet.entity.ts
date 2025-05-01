import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { Character } from './character.entity';

export type PlanetDocument = Planet & Document;

@Schema({ timestamps: true })
export class Planet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [SchemaTypes.ObjectId] })
  characters: Character[];
}

export const planetSchema = SchemaFactory.createForClass(Planet);
