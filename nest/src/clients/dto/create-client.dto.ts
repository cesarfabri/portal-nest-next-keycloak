import { IsOptional, IsString } from 'class-validator';
import { Client } from '../entities/client.entity';

export class CreateClientDto extends Client {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  complement: string;

  @IsString()
  number: string;

  @IsString()
  district: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  zipcode: string;
}
