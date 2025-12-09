import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Imports do Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // <--- 1. IMPORTAR DIALOG

import { AuthService } from '../../services/auth.service';
import { EsqueciSenhaComponent } from '../esqueci-senha/esqueci-senha.component'; // <--- 2. IMPORTAR O COMPONENT

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule // <--- 3. ADICIONAR NO ARRAY DE IMPORTS
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  erroLogin: boolean = false; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog // <--- 4. INJETAR O DIALOG AQUI
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  fazerLogin() {
    if (this.loginForm.invalid) return;

    // Reseta o erro antes de tentar
    this.erroLogin = false;

    const { email, senha } = this.loginForm.value;

    this.authService.login({ email, senha }).subscribe({
      next: (res: any) => {
        // Salva o Token e o Nome no navegador
        localStorage.setItem('token', res.access_token);
        if (res.usuario) {
            localStorage.setItem('usuario_nome', res.usuario.nome); // Ajuste conforme seu backend retorna
        }

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.erroLogin = true; 
      }
    });
  }

  // <--- 5. FUNÇÃO QUE ABRE O MODAL
  abrirEsqueciSenha() {
    this.dialog.open(EsqueciSenhaComponent, {
      width: '400px',
      // panelClass: 'custom-modal' // Se quiser estilizar a borda do modal depois
    });
  }
}