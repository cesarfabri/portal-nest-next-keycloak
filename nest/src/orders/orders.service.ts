import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    const idP = createOrderDto.fk_id_product;
    const client = createOrderDto.fk_id_client;
    const product = await this.prisma.products.findFirst({
      where: { id: idP, fk_id_client: client },
    });

    if (!product) {
      return 'Product not find';
    } else {
      const valueP = Number(product.price);
      const quant = Number(createOrderDto.quantity);
      const valueTotal = (valueP * quant).toFixed(2);
      createOrderDto.total = Number(valueTotal);
    }

    return this.prisma.orders.create({
      data: createOrderDto,
    });
    // return `Product ${JSON.stringify(product)}`;
  }

  async findAll(id: string) {
    return await this.prisma.orders.findMany({
      where: { fk_id_client: id },
      include: {
        client: {
          select: {
            name: true,
          },
        },
        product: {
          select: {
            label: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
