import { Prisma } from '@prisma/client';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { Order } from '../entities/order.entity';

export class CreateOrderDto extends Order {
  @IsNumber()
  quantity: number;

  @IsDecimal()
  @IsOptional()
  total: string | number | Prisma.Decimal;

  @IsUUID()
  @IsNotEmpty()
  fk_id_client: string;

  @IsUUID()
  @IsNotEmpty()
  fk_id_product: string;
}
