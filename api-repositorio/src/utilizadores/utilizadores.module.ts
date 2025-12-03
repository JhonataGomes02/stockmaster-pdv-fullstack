import { Module } from '@nestjs/common';
import { UtilizadoresService } from './utilizadores.service';
import { UtilizadoresController } from './utilizadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilizador } from './entities/utilizador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utilizador])],
  controllers: [UtilizadoresController],
  providers: [UtilizadoresService],
  exports: [UtilizadoresService] 
})
export class UtilizadoresModule {}