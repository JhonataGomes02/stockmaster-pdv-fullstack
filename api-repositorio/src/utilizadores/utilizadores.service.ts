import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilizador } from './entities/utilizador.entity';

// ⚠️ CUIDADO: Não pode ter "import { UtilizadoresService } ..." aqui!

@Injectable()
export class UtilizadoresService {
  
  constructor(
    @InjectRepository(Utilizador)
    private utilizadoresRepository: Repository<Utilizador>,
  ) {}

  // Cria um usuário
  async create(dadosUtilizador: any) {
    const novoUtilizador = this.utilizadoresRepository.create(dadosUtilizador);
    return await this.utilizadoresRepository.save(novoUtilizador);
  }

  // Busca por e-mail (usado no Login/Auth)
  async findOneByEmail(email: string) {
    return await this.utilizadoresRepository.findOneBy({ email });
  }

  // Alias para garantir compatibilidade (se AuthService chamar findByEmail)
  async findByEmail(email: string) {
    return this.findOneByEmail(email);
  }

  // Lista todos
  async findAll() {
    return await this.utilizadoresRepository.find();
  }

  // Busca por ID
  async findOne(id: number) {
    return await this.utilizadoresRepository.findOneBy({ id });
  }

  // Atualiza dados gerais
  async update(id: number, dadosAtualizacao: any) {
    await this.utilizadoresRepository.update(id, dadosAtualizacao);
    return this.findOne(id);
  }

  // Remove usuário
  async remove(id: number) {
    return await this.utilizadoresRepository.delete(id);
  }

  // Atualiza SOMENTE a senha (usado no Recuperar Senha)
  async atualizarSenha(id: number, novaSenhaHash: string) {
    return this.utilizadoresRepository.update(id, { senha: novaSenhaHash });
  }
}