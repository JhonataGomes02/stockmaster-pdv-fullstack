import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // Variável para guardar o nome dinâmico
  nomeUsuario: string = 'Visitante'; 

  constructor(private router: Router) {}

  ngOnInit() {
    // Busca o nome salvo no navegador. Se não tiver, usa 'Mercado'
    const nomeSalvo = localStorage.getItem('usuario_nome');
    if (nomeSalvo) {
      this.nomeUsuario = nomeSalvo;
    } else {
      this.nomeUsuario = 'Mercado';
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario_nome');
    this.router.navigate(['/login']);
  }
}