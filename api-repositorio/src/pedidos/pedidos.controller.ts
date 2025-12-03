import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto'; 
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto, @Request() req) {
    return this.pedidosService.create(createPedidoDto, +req.user.sub);
  }

  @Get()
  findAll(@Request() req) {
    return this.pedidosService.findAll(+req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(+id);
  }

  @Patch(':id') 
  update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto) {
    return this.pedidosService.update(+id, updatePedidoDto);
  }

  @Delete(':id') 
  remove(@Param('id') id: string) {
    return this.pedidosService.remove(+id);
  }
}