import { IsString, IsNumber, IsNotEmpty, Min, IsOptional } from 'class-validator';

export class CreateProdutoDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    preco: number;

    @IsString()
    @IsNotEmpty()
    categoria: string;

    @IsNumber()
    @IsOptional()
    quantidade?: number;
}