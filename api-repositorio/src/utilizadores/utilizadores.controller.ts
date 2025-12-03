import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UtilizadoresService } from './utilizadores.service';
import { CreateUtilizadorDto } from './dto/create-utilizador.dto';
import { UpdateUtilizadorDto } from './dto/update-utilizador.dto';

@Controller('utilizadores')
export class UtilizadoresController {
  constructor(private readonly utilizadoresService: UtilizadoresService) {}

  @Post()
  create(@Body() createUtilizadoreDto: CreateUtilizadorDto) {
    return this.utilizadoresService.create(createUtilizadoreDto);
  }

  @Get()
  findAll() {
    return this.utilizadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilizadoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUtilizadoreDto: UpdateUtilizadorDto) {
    return this.utilizadoresService.update(+id, updateUtilizadoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilizadoresService.remove(+id);
  }
}
