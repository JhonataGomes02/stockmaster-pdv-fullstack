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

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.utilizadoresService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    
    // Compara a senha digitada com a senha criptografada do banco
    const isMatch = await bcrypt.compare(pass, user.senha);
    
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      nome: user.nome 
    };
  }

  async signUp(nome: string, email: string, pass: string): Promise<any> {
    const userExists = await this.utilizadoresService.findOneByEmail(email);
    if (userExists) {
      throw new UnauthorizedException('E-mail já cadastrado');
    }

    const user = await this.utilizadoresService.create({
      nome: nome,
      email: email,
      senha: pass
    });

    return user; 
  }
}