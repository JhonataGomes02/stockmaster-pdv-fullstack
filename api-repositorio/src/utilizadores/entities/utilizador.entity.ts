import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class Utilizador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  // MANTENHA ESSES RELACIONAMENTOS, SÃO IMPORTANTES PARA O DASHBOARD
  @OneToMany(() => Produto, (produto) => produto.utilizador)
  produtos: Produto[];

  @OneToMany(() => Pedido, (pedido) => pedido.utilizador)
  pedidos: Pedido[];

  // REMOVIDO: A função hashSenha() e o decorator @BeforeInsert()
  // Agora quem cuida da senha é só o AuthService.
}