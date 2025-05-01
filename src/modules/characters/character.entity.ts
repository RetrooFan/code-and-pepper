import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CharacterDocument = Character & Document;

@Schema({ timestamps: true })
export class Character {
  @Prop({ required: true })
  name: string;
}

export const characterSchema = SchemaFactory.createForClass(Character);
