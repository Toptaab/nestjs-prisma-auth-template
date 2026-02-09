import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariablesDto {
  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNotEmpty()
  @IsString()
  JWT_SECRET: string;

  @IsOptional()
  @IsNumber()
  HASH_SALT: number;

  @IsNotEmpty()
  @IsString()
  DB_HOST: string

  @IsNotEmpty()
  @IsNumber()
  DB_PORT: number

  @IsNotEmpty()
  @IsString()
  DB_USER: string

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD: string

  @IsNotEmpty()
  @IsString()
  DB_NAME: string

  @IsNotEmpty()
  @IsNumber()
  DB_CONN_LIMIT: number

  @IsNotEmpty()
  @IsString()
  CORS_ORIGIN: string;

  @IsOptional()
  @IsString()
  GOOGLE_CLIENT_ID: string;

  @IsOptional()
  @IsString()
  GOOGLE_CLIENT_SECRET: string;

  @IsOptional()
  @IsString()
  FACEBOOK_CLIENT_ID: string;

  @IsOptional()
  @IsString()
  FACEBOOK_CLIENT_SECRET: string;

}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariablesDto, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
