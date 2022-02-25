import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';

@Injectable()
export class PhonesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPhoneDto: CreatePhoneDto) {
    return await this.prisma.phones.create({
      data: createPhoneDto,
    });
  }

  async findAll(id: string) {
    return await this.prisma.phones.findMany({
      where: { fk_id_contact: id },
      select: { id: true, number: true, comments: true, create_at: true },
    });
  }

  async findOne(id: string) {
    const phone = await this.prisma.phones.findFirst({
      where: { id },
    });

    if (!phone) {
      throw new NotFoundException(`Phone ID ${id} not found`);
    }

    return phone;
  }

  async update(id: string, updatePhoneDto: UpdatePhoneDto) {
    const phone = await this.prisma.phones.findFirst({
      where: { id },
    });

    if (!phone) {
      throw new NotFoundException(`Phone ID ${id} not found`);
    }

    updatePhoneDto.update_at = new Date();

    return await this.prisma.phones.update({
      where: { id },
      data: updatePhoneDto,
    });
  }

  async remove(id: string) {
    const phone = await this.prisma.phones.findFirst({
      where: { id },
    });

    if (!phone) {
      throw new NotFoundException(`Phone ID ${id} not found`);
    }

    return this.prisma.phones.delete({
      where: { id },
    });
  }
}
