import { Prisma, Unit } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Composition } from '../entities/composition.entity';

export class CreateCompositionDto extends Composition {
  @IsString()
  name: string;

  @IsNumber()
  quantity: string | number | Prisma.Decimal;

  @IsNumber()
  price: string | number | Prisma.Decimal;

  @IsOptional()
  @IsEnum(Unit, { each: true })
  unit?: Unit;

  @IsUUID()
  fk_id_product: string;
}
