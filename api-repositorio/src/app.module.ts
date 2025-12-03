import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutosModule } from './produtos/produtos.module';
import { UtilizadoresModule } from './utilizadores/utilizadores.module';
import { AuthModule } from './auth/auth.module';
import { Produto } from './produtos/entities/produto.entity';
import { Utilizador } from './utilizadores/entities/utilizador.entity';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'cimatec', 
      database: 'repositorio_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    
    ProdutosModule,
    UtilizadoresModule,
    AuthModule,
    PedidosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}