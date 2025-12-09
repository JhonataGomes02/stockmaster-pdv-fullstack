import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ROTA DE LOGIN
  // Removemos o 'UseGuards' para simplificar e usamos o método signIn que já existe no seu service
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dados: Record<string, any>) {
    return this.authService.signIn(dados.email, dados.senha);
  }

  // ROTA DE REGISTRO
  @Post('registrar')
  signUp(@Body() dados: Record<string, any>) {
    return this.authService.signUp(dados.nome, dados.email, dados.senha);
  }

  // ROTA DE RECUPERAR SENHA
  @Post('recuperar-senha')
  async recuperarSenha(@Body() dados: { email: string, novaSenha: string }) {
    return this.authService.recuperarSenha(dados.email, dados.novaSenha);
  }
}