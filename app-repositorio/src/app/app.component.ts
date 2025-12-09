import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component'; 
// 1. IMPORTAR O FOOTER
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. ADICIONAR NO ARRAY DE IMPORTS
  imports: [CommonModule, RouterOutlet, SidebarComponent, FooterComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-repositorio';
  mostrarMenu: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(evento => {
      if (evento instanceof NavigationEnd) {
        const urlAtual = evento.urlAfterRedirects;
        // Lógica: Se for login ou registrar, esconde o menu (e o footer também, para ficar clean)
        if (urlAtual.includes('/login') || urlAtual.includes('/registrar')) {
          this.mostrarMenu = false;
        } else {
          this.mostrarMenu = true;
        }
      }
    });
  }
}