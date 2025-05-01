import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { Episode } from './episode.entity';
import { emptyArrayValidator } from './validators';

export type CharacterDocument = Character & Document;

@Schema({ timestamps: true })
export class Character {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [SchemaTypes.ObjectId], ...emptyArrayValidator })
  episodes: Episode[];
}

export const characterSchema = SchemaFactory.createForClass(Character);
