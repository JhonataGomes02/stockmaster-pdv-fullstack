import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { PedidosService } from '../../services/pedidos.service';
import * as XLSX from 'xlsx'; 
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-recibos',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatIconModule, MatButtonModule
  ],
  providers: [PedidosService], // Mantendo o provider local para evitar erro de injeção
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.css']
})
export class RecibosComponent implements OnInit {

  listaOriginal: any[] = [];
  listaExibicao: any[] = [];
  
  filtroTexto: string = '';
  filtroData: Date | null = null;

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    this.carregarRecibos();
  }

  carregarRecibos() {
    this.pedidosService.findAll().subscribe({
      next: (dados: any[]) => {
        if(dados && dados.length > 0) {
           this.listaOriginal = dados.sort((a, b) => 
             new Date(b.dataPedido).getTime() - new Date(a.dataPedido).getTime()
           );
           this.aplicarFiltros();
        } else {
           this.listaOriginal = [];
           this.listaExibicao = [];
        }
      },
      error: (err: any) => console.error('Erro ao carregar recibos:', err)
    });
  }

  aplicarFiltros() {
    let temp = [...this.listaOriginal];

    // 1. Filtro por Texto (Nome Cliente, Produto ou ID)
    if (this.filtroTexto) {
      const texto = this.filtroTexto.toLowerCase();
      temp = temp.filter(item => 
        (item.nomeCliente && item.nomeCliente.toLowerCase().includes(texto)) ||
        (item.nomeProduto && item.nomeProduto.toLowerCase().includes(texto)) ||
        (item.id && item.id.toString().includes(texto))
      );
    }

    // 2. Filtro por Data
    if (this.filtroData) {
      const dataSelecionada = this.filtroData.toDateString();
      temp = temp.filter(item => {
        const dataItem = new Date(item.dataPedido).toDateString();
        return dataItem === dataSelecionada;
      });
    }

    this.listaExibicao = temp;
  }

  limparFiltros() {
    this.filtroTexto = '';
    this.filtroData = null;
    this.aplicarFiltros();
  }

  exportarExcel() {
    const dadosParaExcel = this.listaExibicao.map(item => ({
      'ID Recibo': item.id,
      'Data': new Date(item.dataPedido).toLocaleDateString('pt-BR'),
      'Hora': new Date(item.dataPedido).toLocaleTimeString('pt-BR'),
      'Cliente': item.nomeCliente,
      'Produto': item.nomeProduto,
      'Pagamento': item.formaPagamento, 
      'Qtd': item.quantidade,
      'Total': item.valorTotal
    }));
    
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dadosParaExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vendas');
    XLSX.writeFile(wb, `Recibos_${new Date().getTime()}.xlsx`);
  }
  getClassePagamento(metodo: string): string {
    if (!metodo) return '';
    
    switch (metodo) {
      case 'Dinheiro': return 'badge-money';
      case 'PIX': return 'badge-pix';
      case 'Crédito': return 'badge-credit';
      case 'Débito': return 'badge-debit';
      default: return '';
    }
  }
}