import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Produto } from '../produtos/entities/produto.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Produto]),
    AuthModule 
  ],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}