import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './entities/pedido.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Produto } from '../produtos/entities/produto.entity';
import { Utilizador } from '../utilizadores/entities/utilizador.entity';

@Injectable()
export class PedidosService {
  
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async create(createPedidoDto: CreatePedidoDto, userId: number) {
    // verificações de produto e estoque continuam iguais
    const produto = await this.produtoRepository.findOne({
      where: { id: createPedidoDto.produtoId, utilizador: { id: userId } }
    });

    if (!produto) throw new NotFoundException('Produto não encontrado.');
    if (produto.quantidade < createPedidoDto.quantidade) throw new BadRequestException('Estoque insuficiente!');

    produto.quantidade -= createPedidoDto.quantidade;
    await this.produtoRepository.save(produto);

    const novoPedido = this.pedidoRepository.create({
      nomeCliente: createPedidoDto.nomeCliente,
      produtoId: produto.id,
      nomeProduto: produto.nome,
      quantidade: createPedidoDto.quantidade,
      valorTotal: produto.preco * createPedidoDto.quantidade,
      // Salva a forma de pagamento
      formaPagamento: createPedidoDto.formaPagamento, 
      status: 'Concluido',
      utilizador: { id: userId } as Utilizador
    });

    return this.pedidoRepository.save(novoPedido);
  }

  findAll(userId: number) {
    return this.pedidoRepository.find({
      where: { 
        utilizador: { id: userId } 
      },
      order: { dataPedido: 'DESC' }
    });
  }

  findOne(id: number) {
    return this.pedidoRepository.findOneBy({ id });
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return this.pedidoRepository.update(id, updatePedidoDto);
  }

  async remove(id: number) {
    return this.pedidoRepository.delete(id);
  }
}