import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Usuario } from '../../../auth/usuario';
import { UsuarioService } from '../../../services/usuario-service';
import { LoginService } from '../../../auth/login.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-list',
  imports: [FormsModule],
  templateUrl: './usuarios-list.html',
  styleUrl: './usuarios-list.scss'
})
export class UsuariosList {

  lista: Usuario[] = [];
  pesquisa: string = "";

  @Input("modoModal") modoModal: boolean = false;
  @Output("meuEvento") meuEvento = new EventEmitter();

  usuarioService = inject(UsuarioService);
  loginService = inject(LoginService);

  constructor() {
    this.findAll();
  }


  findAll(){
   
    this.usuarioService.findAll().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');
      }
    });
  
  }

  delete(usuario: Usuario){

    Swal.fire({
      title: 'Deseja mesmo deletar o usuário ' +usuario.username+ '?' ,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.deleteById(usuario.id).subscribe({
          next: (mensagem) => {
            Swal.fire(mensagem, '', 'success');
            this.findAll();
          },
          error: (erro) => {
            Swal.fire(erro.error, '', 'error');
          }
        });
        
      }
    });

  }


  findByNome(){

    this.usuarioService.findByNome(this.pesquisa).subscribe({
      next: (lista) => {
        this.lista = lista;
      },
      error: (erro) => {
        Swal.fire(erro.error, '', 'error');;
      }
    })

  }


  selecionar(usuario: Usuario){
    this.meuEvento.emit(usuario); //esse disparo vai acionar o método do FORM
  }


}
