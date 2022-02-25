import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.products.create({
      data: createProductDto,
    });
  }

  async findAll(id) {
    return await this.prisma.products.findMany({
      where: { fk_id_client: id },
      select: {
        id: true,
        name: true,
        label: true,
        description: true,
        price: true,
        cost: true,
        create_at: true,
      },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.products.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.products.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product ID ${id} not found`);
    }

    updateProductDto.update_at = new Date();

    return await this.prisma.products.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: string) {
    const product = await this.prisma.products.findFirst({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product ID ${id} not found`);
    }

    return this.prisma.products.delete({
      where: { id },
    });
  }
}
