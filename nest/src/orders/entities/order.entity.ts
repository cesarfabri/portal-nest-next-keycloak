import { Prisma } from '@prisma/client';

export class Order implements Prisma.OrdersUncheckedCreateInput {
  id?: string;
  control?: number;
  quantity: number;
  total: string | number | Prisma.Decimal;
  date_ready?: string | Date;
  date_out?: string | Date;
  name_collector?: string;
  comments?: string;
  create_at?: string | Date;
  update_at?: string | Date;
  fk_id_client: string;
  fk_id_product: string;
}
