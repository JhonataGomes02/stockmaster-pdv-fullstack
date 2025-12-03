import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ProdutosService } from '../../services/produtos.service';
import { PedidosService } from '../../services/pedidos.service';

// 1. IMPORT DOS GRÁFICOS
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faturamentoTotal: number = 0;
  totalVendas: number = 0;
  totalProdutos: number = 0;
  produtosBaixoEstoque: number = 0;
  listaAlerta: any[] = [];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Vendas (R$)',
        fill: true,
        tension: 0.4, // Curva suave
        borderColor: '#3b82f6', // Azul Neon
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        pointBackgroundColor: '#fff'
      }
    ]
  };
public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: 'white' } }
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.1)' }
      },
      y: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.1)' },
        
        // --- AQUI ESTÁ A CORREÇÃO DEFINITIVA ---
        min: 0, // Força o gráfico a começar exatamente no 0
        beginAtZero: true 
      }
    }
  };

  // CONFIGURAÇÃO DO GRÁFICO DE PIZZA  ---
  public pieChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
        borderColor: '#1e293b',
        borderWidth: 2
      }
    ]
  };
  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right', labels: { color: 'white' } }
    }
  };

  constructor(
    private pedidosService: PedidosService,
    private produtosService: ProdutosService
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    // Busca Vendas
    this.pedidosService.findAll().subscribe(pedidos => {
      this.totalVendas = pedidos.length;
      this.faturamentoTotal = pedidos.reduce((acc, p) => acc + Number(p.valorTotal), 0);
      
      // PROCESSA DADOS PARA OS GRÁFICOS
      this.gerarGraficoLinha(pedidos);
      this.gerarGraficoPizza(pedidos);
    });

    // Busca Produtos (Lógica do Alerta)
    this.produtosService.findAll().subscribe(produtos => {
      this.totalProdutos = produtos.length;
      this.listaAlerta = produtos.filter(p => p.quantidade < 20);
      this.produtosBaixoEstoque = this.listaAlerta.length;
    });
  }

  // Lógica: Agrupar vendas por dia (Últimos 7 dias)
  gerarGraficoLinha(pedidos: any[]) {
    const hoje = new Date();
    const labels = [];
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(hoje.getDate() - i);
      const dataStr = d.toLocaleDateString('pt-BR').slice(0, 5); // Ex: "30/11"
      
      // Filtra pedidos desse dia
      const totalDia = pedidos
        .filter(p => new Date(p.dataPedido).toDateString() === d.toDateString())
        .reduce((acc, p) => acc + Number(p.valorTotal), 0);

      labels.push(dataStr);
      data.push(totalDia);
    }

    this.lineChartData = { ...this.lineChartData, labels, datasets: [{ ...this.lineChartData.datasets[0], data }] };
  }

  // Lógica: Agrupar produtos mais vendidos
  gerarGraficoPizza(pedidos: any[]) {
    const contagem: any = {};
    
    pedidos.forEach(p => {
      contagem[p.nomeProduto] = (contagem[p.nomeProduto] || 0) + p.quantidade;
    });

    // Ordena e pega top 5
    const top5 = Object.entries(contagem)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 5);

    this.pieChartData = {
      labels: top5.map(item => item[0]), 
      datasets: [{ ...this.pieChartData.datasets[0], data: top5.map((item: any) => item[1]) }] // Quantidades
    };
  }
}