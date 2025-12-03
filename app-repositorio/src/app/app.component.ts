import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent], 
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
        if (urlAtual.includes('/login') || urlAtual.includes('/registrar')) {
          this.mostrarMenu = false;
        } else {
          this.mostrarMenu = true;
        }
      }
    });
  }
}