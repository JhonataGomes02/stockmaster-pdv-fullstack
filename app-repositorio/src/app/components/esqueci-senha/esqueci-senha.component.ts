import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatIconModule, MatSnackBarModule],
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.css']
})
export class EsqueciSenhaComponent {
  email: string = '';
  novaSenha: string = '';
  private apiUrl = environment.apiUrl;

  constructor(
    public dialogRef: MatDialogRef<EsqueciSenhaComponent>,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  confirmar() {
    this.http.post(`${this.apiUrl}/auth/recuperar-senha`, {
      email: this.email,
      novaSenha: this.novaSenha
    }).subscribe({
      next: () => {
        this.snackBar.open('✅ Senha alterada com sucesso! Tente logar.', 'OK', {
          duration: 5000,
          panelClass: ['snackbar-success'] // Você pode criar essa classe no styles.css
        });
        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('❌ Erro: E-mail não encontrado.', 'Fechar', {
          duration: 4000
        });
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}