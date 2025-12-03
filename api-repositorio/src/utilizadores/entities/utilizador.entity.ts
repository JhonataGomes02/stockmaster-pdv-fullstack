import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
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

  @OneToMany(() => Produto, (produto) => produto.utilizador)
  produtos: Produto[];

  @OneToMany(() => Pedido, (pedido) => pedido.utilizador)
  pedidos: Pedido[];

  @BeforeInsert()
  async hashSenha() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
}