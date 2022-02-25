import { Prisma } from '@prisma/client';
import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends Product {
  @IsString()
  name: string;

  @IsString()
  label: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: string | number | Prisma.Decimal;

  @IsUUID()
  fk_id_client: string;
}
