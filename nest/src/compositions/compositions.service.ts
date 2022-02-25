import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from 'src/products/entities/product.entity';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';

@Injectable()
export class CompositionsService {
  constructor(private readonly prisma: PrismaService) {}

  async updateProduct(id: string, price: number, qt: number) {
    const prod: Product | null = await this.prisma.products.findUnique({
      where: { id },
    });
    const value = price * qt;
    prod.cost = Number(prod.cost) + value;
    console.log(prod.cost);
    prod.percent = (prod.cost / Number(prod.price)) * 100;
    console.log(prod.percent);

    const product = await this.prisma.products.update({
      where: { id },
      data: prod,
    });
    console.log(product);
  }

  async create(createCompositionDto: CreateCompositionDto) {
    const composition = await this.prisma.compositions.create({
      data: createCompositionDto,
    });

    if (composition) {
      this.updateProduct(
        composition.fk_id_product,
        Number(composition.price),
        Number(composition.quantity),
      );
    }

    return composition;
  }

  async findAll(id: string) {
    return await this.prisma.compositions.findMany({
      where: { fk_id_product: id },
      select: {
        id: true,
        name: true,
        quantity: true,
        price: true,
        unit: true,
        create_at: true,
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} composition`;
  }

  async update(id: string, updateCompositionDto: UpdateCompositionDto) {
    const composition = await this.prisma.compositions.findFirst({
      where: { id },
    });

    if (!composition) {
      throw new NotFoundException(`Composition ID ${id} not found`);
    }

    updateCompositionDto.update_at = new Date();

    return await this.prisma.compositions.update({
      where: { id },
      data: updateCompositionDto,
    });
  }

  async remove(id: string) {
    const composition = await this.prisma.compositions.findFirst({
      where: { id },
    });

    if (!composition) {
      throw new NotFoundException(`Composition ID ${id} not found`);
    }

    return this.prisma.compositions.delete({
      where: { id },
    });
  }
}
