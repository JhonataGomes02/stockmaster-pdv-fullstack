import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { PedidosService } from '../../services/pedidos.service';
import { ProdutosService } from '../../services/produtos.service';
import { ReciboDialogComponent } from '../recibo/recibo-dialog.component'; 
import { PagamentoDialogComponent } from '../pagamento/pagamento-dialog.component';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, 
    MatCardModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatSelectModule, MatIconModule,
    MatDialogModule
  ],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidoForm: FormGroup;
  listaProdutos: any[] = [];
  listaPedidos: any[] = [];
  carrinho: any[] = [];
  produtoSelecionado: any = null;

  constructor(
    private fb: FormBuilder,
    private pedidosService: PedidosService,
    private produtosService: ProdutosService,
    private dialog: MatDialog
  ) {
    this.pedidoForm = this.fb.group({
      nomeCliente: ['Consumidor Final', Validators.required],
      produtoId: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.carregarProdutos();
    this.carregarPedidos();
  }

  carregarProdutos() {
    this.produtosService.findAll().subscribe(dados => {
      this.listaProdutos = dados;
    });
  }

  carregarPedidos() {
    this.pedidosService.findAll().subscribe(dados => {
      this.listaPedidos = dados;
    });
  }

  aoSelecionarProduto(id: number) {
    this.produtoSelecionado = this.listaProdutos.find(p => p.id === id);
  }

  adicionarAoCarrinho() {
    if (this.pedidoForm.invalid || !this.produtoSelecionado) return;
    const qtdAdicionar = this.pedidoForm.get('quantidade')?.value;
    
    const indexExistente = this.carrinho.findIndex(item => item.produtoId === this.produtoSelecionado.id);

    if (indexExistente !== -1) {
      const itemExistente = this.carrinho[indexExistente];
      const novaQuantidadeTotal = itemExistente.quantidade + qtdAdicionar;

      if (novaQuantidadeTotal > this.produtoSelecionado.quantidade) {
        alert(`Estoque insuficiente!`);
        return;
      }
      itemExistente.quantidade = novaQuantidadeTotal;
      itemExistente.subtotal = itemExistente.precoUnitario * novaQuantidadeTotal;
    } else {
      if (this.produtoSelecionado.quantidade < qtdAdicionar) {
        alert(`Estoque insuficiente!`);
        return;
      }
      const item = {
        produtoId: this.produtoSelecionado.id,
        nomeProduto: this.produtoSelecionado.nome,
        quantidade: qtdAdicionar,
        precoUnitario: this.produtoSelecionado.preco,
        subtotal: this.produtoSelecionado.preco * qtdAdicionar
      };
      this.carrinho.push(item);
    }
    this.pedidoForm.patchValue({ produtoId: '', quantidade: 1 });
    this.produtoSelecionado = null;
  }

  removerDoCarrinho(index: number) {
    this.carrinho.splice(index, 1);
  }

  get totalCarrinho(): number {
    return this.carrinho.reduce((acc, item) => acc + item.subtotal, 0);
  }

  finalizarVenda() {
    if (this.carrinho.length === 0) return;

    //Modal de Pagamento
    const dialogRef = this.dialog.open(PagamentoDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(metodoPagamento => {
      if (!metodoPagamento) return; 

      const cliente = this.pedidoForm.get('nomeCliente')?.value;
      const nomeMercado = localStorage.getItem('usuario_nome') || 'Seu Mercado';
      
      const dadosRecibo = {
        nomeMercado: nomeMercado,
        nomeCliente: cliente,
        itens: [...this.carrinho],
        total: this.totalCarrinho,
        data: new Date(),
        pagamento: metodoPagamento // Adiciona o pagamento ao recibo
      };

      const requisicoes = this.carrinho.map(item => {
        const pedidoDTO = {
          nomeCliente: cliente,
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          formaPagamento: metodoPagamento // Envia o pagamento pro Back
        };
        return this.pedidosService.create(pedidoDTO);
      });

      forkJoin(requisicoes).subscribe({
        next: () => {
          this.abrirRecibo(dadosRecibo); // Chama a função que imprime
          
          this.carrinho = [];
          this.pedidoForm.patchValue({ nomeCliente: 'Consumidor Final' });
          this.carregarPedidos(); 
          this.carregarProdutos(); 
        },
        error: (err) => {
          alert('Erro ao processar venda.');
          console.error(err);
        }
      });
    });
  }

  abrirRecibo(dados: any) {
    this.dialog.open(ReciboDialogComponent, {
      width: '400px',
      data: dados,
      autoFocus: false
    });
  }
} 