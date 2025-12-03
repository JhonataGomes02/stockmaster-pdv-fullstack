import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilizador } from './entities/utilizador.entity';

@Injectable()
export class UtilizadoresService {
  
  constructor(
    @InjectRepository(Utilizador)
    private utilizadoresRepository: Repository<Utilizador>,
  ) {}

  // CRIA UM NOVO USUÁRIO NO BANCO
  async create(dadosUtilizador: any) {
    const novoUtilizador = this.utilizadoresRepository.create(dadosUtilizador);
    return await this.utilizadoresRepository.save(novoUtilizador);
  }

  // BUSCA POR EMAIL (Usado no Login)
  async findOneByEmail(email: string) {
    return await this.utilizadoresRepository.findOneBy({ email });
  }

  // LISTA TODOS
  async findAll() {
    return await this.utilizadoresRepository.find();
  }

  // BUSCA POR ID
  async findOne(id: number) {
    return await this.utilizadoresRepository.findOneBy({ id });
  }

  async update(id: number, dadosAtualizacao: any) {
    // Atualiza no banco de dados
    await this.utilizadoresRepository.update(id, dadosAtualizacao);
    // Retorna o usuário atualizado
    return this.findOne(id);
  }

  // DELETA UM USUÁRIO
  async remove(id: number) {
    return await this.utilizadoresRepository.delete(id);
  }
}