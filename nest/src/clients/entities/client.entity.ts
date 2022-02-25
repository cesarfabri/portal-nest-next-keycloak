import { Prisma } from '@prisma/client';

export class Client implements Prisma.ClientsUncheckedCreateInput {
  id?: string;
  name: string;
  address: string;
  complement?: string;
  number: string;
  city: string;
  district: string;
  state: string;
  zipcode: string;
  create_at?: string | Date;
  update_at?: string | Date;
  Contacts?: Prisma.ContactsUncheckedCreateNestedManyWithoutClientInput;
  Products?: Prisma.ProductsUncheckedCreateNestedManyWithoutClientInput;
  Orders?: Prisma.OrdersUncheckedCreateNestedManyWithoutClientInput;
}
