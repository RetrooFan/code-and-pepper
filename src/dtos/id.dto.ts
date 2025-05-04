import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class IdDto {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
