import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    return await this.prisma.clients.create({
      data: createClientDto,
    });
  }

  async findAll() {
    return await this.prisma.clients.findMany();
  }

  async findOne(id: string) {
    const client = await this.prisma.clients.findFirst({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Client ID ${id} not found`);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.clients.findFirst({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Client ID ${id} not found`);
    }

    updateClientDto.update_at = new Date();

    return await this.prisma.clients.update({
      where: { id },
      data: updateClientDto,
    });
  }

  async remove(id: string) {
    const client = await this.prisma.clients.findFirst({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException(`Client ID ${id} not found`);
    }

    return this.prisma.clients.delete({
      where: { id },
    });
  }
}
