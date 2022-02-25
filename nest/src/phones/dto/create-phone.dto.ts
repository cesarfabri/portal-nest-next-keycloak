import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Phone } from '../entities/phone.entity';

export class CreatePhoneDto extends Phone {
  @IsString()
  number: string;

  @IsString()
  @IsOptional()
  comments: string;

  @IsUUID()
  fk_id_contact: string;
}
