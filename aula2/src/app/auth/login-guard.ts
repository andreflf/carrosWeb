import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginGuard: CanActivateFn = (route, state) => {

  let router = inject(Router);
  let loginService = inject(LoginService);
  if(loginService.hasRole("USER") && state.url.startsWith('/admin/carros')){
    alert("Usuário nao tem acesso a essa funçao");
    router.navigate(['/admin/marcas']);
    return false;
  } 
  return true;
};
