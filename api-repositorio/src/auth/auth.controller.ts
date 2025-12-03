import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUtilizadorDto } from '../utilizadores/dto/create-utilizador.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.senha);
  }

  @Post('registrar') 
  signUp(@Body() signUpDto: CreateUtilizadorDto) {
    return this.authService.signUp(signUpDto.nome, signUpDto.email, signUpDto.senha);
  }
}