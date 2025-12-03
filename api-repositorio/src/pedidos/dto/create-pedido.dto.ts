import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreatePedidoDto {
  @IsString()
  @IsNotEmpty()
  nomeCliente: string;

  @IsInt()
  @IsNotEmpty()
  produtoId: number;

  @IsInt()
  @Min(1)
  quantidade: number;
  
  @IsString()
  @IsNotEmpty()
  formaPagamento: string;

}