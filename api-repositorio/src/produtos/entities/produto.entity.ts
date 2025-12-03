import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Utilizador } from '../../utilizadores/entities/utilizador.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  categoria: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column('int')
  quantidade: number;

  @ManyToOne(() => Utilizador, (utilizador) => utilizador.produtos)
  utilizador: Utilizador;
}