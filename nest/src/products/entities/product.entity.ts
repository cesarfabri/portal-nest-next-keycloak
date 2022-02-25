import { Prisma } from '@prisma/client';

export class Product implements Prisma.ProductsUncheckedCreateInput {
  id?: string;
  name: string;
  price: string | number | Prisma.Decimal;
  cost?: string | number | Prisma.Decimal;
  percent?: string | number | Prisma.Decimal;
  label: string;
  description?: string;
  create_at?: string | Date;
  update_at?: string | Date;
  fk_id_client: string;
  Orders?: Prisma.OrdersUncheckedCreateNestedManyWithoutProductInput;
  Compositions?: Prisma.CompositionsUncheckedCreateNestedManyWithoutProductInput;
}
