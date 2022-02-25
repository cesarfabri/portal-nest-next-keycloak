import { Prisma } from '@prisma/client';

export class Phone implements Prisma.PhonesUncheckedCreateInput {
  id?: string;
  number: string;
  comments?: string;
  create_at?: string | Date;
  update_at?: string | Date;
  fk_id_contact: string;
}
