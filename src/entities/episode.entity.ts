import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EpisodeDocument = Episode & Document;

@Schema({ timestamps: true })
export class Episode {
  @Prop({ required: true })
  name: string;
}

export const episodeSchema = SchemaFactory.createForClass(Episode);
