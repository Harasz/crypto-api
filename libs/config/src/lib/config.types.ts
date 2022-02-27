import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AppConfig {
  @IsNumber()
  @IsOptional()
  APP_PORT: number;

  @IsString()
  @IsOptional()
  JWT_SECRET: string;

  @IsString()
  @IsOptional()
  AUTH_TOKEN_EXPIRES_IN: string;
}
