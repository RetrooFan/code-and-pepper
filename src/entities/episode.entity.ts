import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

import { Character } from './character.entity';
import { emptyArrayValidator } from './validators';

export type EpisodeDocument = Episode & Document;

@Schema({ timestamps: true })
export class Episode {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [SchemaTypes.ObjectId], ...emptyArrayValidator })
  characters: Character[];
}

export const episodeSchema = SchemaFactory.createForClass(Episode);
