import { ApiProperty } from '@nestjs/swagger';

export class GenerateKeysResponseDto {
  @ApiProperty()
  privateKey: string;

  @ApiProperty()
  publicKey: string;
}
