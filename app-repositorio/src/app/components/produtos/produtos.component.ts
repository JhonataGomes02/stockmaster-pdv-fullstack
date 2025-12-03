import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProdutosService } from '../../services/produtos.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule,
    MatIconModule 
  ],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: any[] = [];
  produtosFiltrados: any[] = [];
  
  mostrarFormulario = false;
  produtoForm: FormGroup;
  editandoId: number | null = null;

  categorias: string[] = [
    'Alimentos', 
    'Bebidas', 
    'Limpeza', 
    'Higiene', 
    'Hortifruti', 
    'Padaria', 
    'Açougue',
    'Frios e Laticínios', 
    'Outros'
  ];

  constructor(
    private produtosService: ProdutosService,
    private fb: FormBuilder
  ) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      categoria: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0)]],
      quantidade: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtosService.findAll().subscribe(dados => {
      this.produtos = dados;
      this.produtosFiltrados = dados;
    });
  }

  filtrar(event: any) {
    const texto = event.target.value.toLowerCase();
    this.produtos = this.produtosFiltrados.filter(p => 
      p.nome.toLowerCase().includes(texto) || 
      p.categoria.toLowerCase().includes(texto)
    );
  }

  abrirModalOuFormulario() {
    this.mostrarFormulario = true;
    this.editandoId = null;
    this.produtoForm.reset();
  }

  prepararEdicao(produto: any) {
    this.mostrarFormulario = true;
    this.editandoId = produto.id;
    this.produtoForm.patchValue(produto);
  }

  cancelar() {
    this.mostrarFormulario = false;
    this.editandoId = null;
    this.produtoForm.reset();
  }

  salvarProduto() {
    if (this.produtoForm.invalid) return;

    const dados = this.produtoForm.value;

    if (this.editandoId) {
      this.produtosService.update(this.editandoId, dados).subscribe(() => {
        this.carregarProdutos();
        this.cancelar();
      });
    } else {
      this.produtosService.create(dados).subscribe(() => {
        this.carregarProdutos();
        this.cancelar();
      });
    }
  }

  remover(id: number) {
    if (confirm('Tem certeza que deseja remover este produto?')) {
      this.produtosService.remove(id).subscribe(() => {
        this.carregarProdutos();
      });
    }
  }
}