import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UtilizadoresService } from '../utilizadores/utilizadores.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private utilizadoresService: UtilizadoresService,
    private jwtService: JwtService
  ) {}

  // 1. LOGIN
  async signIn(email: string, pass: string): Promise<any> {
    // Padronizado para findOneByEmail
    const user = await this.utilizadoresService.findOneByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
    
    // Compara a senha digitada com a senha criptografada do banco
    const isMatch = await bcrypt.compare(pass, user.senha);
    
    if (!isMatch) {
      throw new UnauthorizedException('Senha incorreta');
    }
    
    const payload = { sub: user.id, username: user.email, nome: user.nome };
    return {
      access_token: await this.jwtService.signAsync(payload),
      nome: user.nome,
      // Opcional: retornar o objeto usuario completo se seu front precisar
      usuario: { id: user.id, nome: user.nome, email: user.email }
    };
  }

  // 2. REGISTRO (Corrigido: Agora criptografa a senha!)
  async signUp(nome: string, email: string, pass: string): Promise<any> {
    const userExists = await this.utilizadoresService.findOneByEmail(email);
    if (userExists) {
      throw new UnauthorizedException('E-mail já cadastrado');
    }

    // --- CORREÇÃO IMPORTANTE: CRIPTOGRAFAR ANTES DE SALVAR ---
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(pass, salt);

    const user = await this.utilizadoresService.create({
      nome: nome,
      email: email,
      senha: hash // Salva o hash, não a senha pura!
    });

    return user; 
  }

  // 3. RECUPERAR SENHA
  async recuperarSenha(email: string, novaSenha: string) {
    // Padronizado para findOneByEmail (igual ao resto do arquivo)
    const user = await this.utilizadoresService.findOneByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('E-mail não encontrado no sistema.');
    }

    // Criptografa a nova senha
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(novaSenha, salt);

    // Salva a nova senha no banco
    return this.utilizadoresService.atualizarSenha(user.id, hash);
  }
}