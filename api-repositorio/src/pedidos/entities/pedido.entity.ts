import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Utilizador } from '../../utilizadores/entities/utilizador.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeCliente: string;

  @Column()
  nomeProduto: string;

  @Column()
  produtoId: number;

  @Column('int')
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  valorTotal: number;

  @Column({ default: 'Concluido' })
  status: string;

  @Column({ default: 'Dinheiro' }) 
  formaPagamento: string;

  @CreateDateColumn()
  dataPedido: Date;

  @ManyToOne(() => Utilizador, (utilizador) => utilizador.pedidos)
  utilizador: Utilizador;
}