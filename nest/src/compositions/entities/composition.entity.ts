import { Prisma, Unit } from '@prisma/client';

export class Composition implements Prisma.CompositionsUncheckedCreateInput {
  id?: string;
  name: string;
  quantity: string | number | Prisma.Decimal;
  price: string | number | Prisma.Decimal;
  unit?: Unit;
  create_at?: string | Date;
  update_at?: string | Date;
  fk_id_product: string;
}
