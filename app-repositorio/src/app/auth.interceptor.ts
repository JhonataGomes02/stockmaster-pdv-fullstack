import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Pega o token salvo no login
  const token = localStorage.getItem('token');

  if (token) {
    // Clona a requisição e adiciona o cabeçalho Authorization
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  // Se não tiver token, manda normal (vai dar erro 401 se a rota for protegida)
  return next(req);
};