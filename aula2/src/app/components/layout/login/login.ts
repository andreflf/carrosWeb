import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { LoginService } from '../../../auth/login.service';
import { LoginM } from '../../../models/login-m';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login { 

 loginM: LoginM = new LoginM();

  router = inject(Router);
  loginService = inject(LoginService);

  constructor(){
    this.loginService.removerToken(); //limpar o token toda vez que ir para tela de login
  }

  logar(){

    this.loginService.logar(this.loginM).subscribe({
        next: token => {
          if(token){ //se usuário e senha estiverem corretos
            this.loginService.addToken(token);
            if(this.loginService.hasRole('ADMIN'))
              this.router.navigate(["/admin/carros"]);
            else
              this.router.navigate(["/admin/marcas"]);
          }else{ //usuário e senhas incorretos ou nulos
            alert("Usuário e senhas incorretos.");
          }
        },error: erro =>{
          alert("Deu erro");
        }
      });
  }

}
