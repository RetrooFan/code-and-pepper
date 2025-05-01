import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlanetDocument = Planet & Document;

@Schema({ timestamps: true })
export class Planet {
  @Prop({ required: true })
  name: string;
}

export const planetSchema = SchemaFactory.createForClass(Planet);
