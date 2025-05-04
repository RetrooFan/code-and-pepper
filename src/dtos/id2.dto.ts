import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

import { IdDto } from './id.dto';

export class IdDto2 extends IdDto {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  id2: string;
}
