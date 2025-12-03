import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // Injeta os serviços necessários
  const authService = inject(AuthService);
  const router = inject(Router);

  // Pergunta ao AuthService: "O usuário tem token?"
  if (authService.isAuthenticated()) {
    return true; // Pode passar!
  } else {
    // Se não tiver logado, chuta para o login
    router.navigate(['/login']);
    return false; // Barrado!
  }
};