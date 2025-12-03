import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = 'http://localhost:3060/pedidos';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Cabeçalho com o Token (Necessário para o NestJS aceitar)
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Listar todas as vendas
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Criar uma nova venda
  create(pedido: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pedido, { headers: this.getHeaders() });
  }
}