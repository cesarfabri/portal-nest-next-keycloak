import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Contact } from '../entities/contact.entity';

export class CreateContactDto extends Contact {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  comments: string;

  @IsUUID()
  fk_id_client: string;
}
