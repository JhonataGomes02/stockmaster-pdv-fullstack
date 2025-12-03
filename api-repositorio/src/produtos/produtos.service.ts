import { Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { Utilizador } from '../utilizadores/entities/utilizador.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto, userId: number) {
    const novoProduto = this.produtoRepository.create({
      ...createProdutoDto,
      utilizador: { id: userId } as Utilizador // Vincula ao Utilizador correto
    });
    return this.produtoRepository.save(novoProduto);
  }

  findAll(userId: number) {
    return this.produtoRepository.find({
      where: { 
        utilizador: { id: userId } }
    });
  }

  findOne(id: number) { return this.produtoRepository.findOneBy({ id }); }
  update(id: number, updateProdutoDto: UpdateProdutoDto) { return this.produtoRepository.update(id, updateProdutoDto); }
  remove(id: number) { return this.produtoRepository.delete(id); }
}