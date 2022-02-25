import { Prisma } from '@prisma/client';

export class Contact implements Prisma.ContactsUncheckedCreateInput {
  id?: string;
  name: string;
  comments?: string;
  fk_id_client: string;
  create_at?: string | Date;
  update_at?: string | Date;
  Phones?: Prisma.PhonesUncheckedCreateNestedManyWithoutContactInput;
}
