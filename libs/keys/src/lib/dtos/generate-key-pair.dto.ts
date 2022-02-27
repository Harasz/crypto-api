import { ApiProperty } from '@nestjs/swagger';

export class GenerateKeysResponseDto {
  @ApiProperty()
  privKey: string;

  @ApiProperty()
  pubKey: string;
}
