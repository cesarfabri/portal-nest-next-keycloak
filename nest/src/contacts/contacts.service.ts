import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    return await this.prisma.contacts.create({
      data: createContactDto,
    });
  }

  async findAll(id: string) {
    return await this.prisma.contacts.findMany({
      where: { fk_id_client: id },
      select: { id: true, name: true, comments: true, create_at: true },
    });
  }

  async findOne(id: string) {
    const contact = await this.prisma.contacts.findFirst({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact ID ${id} not found`);
    }

    return contact;
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contacts.findFirst({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact ID ${id} not found`);
    }

    updateContactDto.update_at = new Date();

    return await this.prisma.contacts.update({
      where: { id },
      data: updateContactDto,
    });
  }

  async remove(id: string) {
    const contact = await this.prisma.contacts.findFirst({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact ID ${id} not found`);
    }

    return this.prisma.contacts.delete({
      where: { id },
    });
  }
}
