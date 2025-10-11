import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { Acessorio } from '../../../models/acessorio';
import { ActivatedRoute, Router } from '@angular/router';
import { AcessorioService } from '../../../services/acessorio-service';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acessoriosdetails',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './acessoriosdetails.html',
  styleUrl: './acessoriosdetails.scss'
})
export class Acessoriosdetails {

 @Input("acessorio") acessorio: Acessorio = new Acessorio(0, "");
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute); //para pegar parametro de rota (na url)
  router2 = inject(Router); // fazer redirecionamentos

  acessorioService = inject(AcessorioService);

  constructor() {
    //pega id e nome da rota/url
    let id = this.router.snapshot.params["id"];
    if (id > 0) {
      this.findById(id);
    }
  }
  findById(id: number) {
    //busca no back-end
    //  let carroRetornado: Carro = new Carro(id, nome);
    //  this.carro=carroRetornado;
    this.acessorioService.findById(id).subscribe({
      next: retorno => {
        this.acessorio = retorno;
      }, error: erro => {
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: "error"
        });
      }
    });
  }

  salvar() {

    if (this.acessorio.id!=null && this.acessorio.id > 0) { //se maior que 0 é porque o carro existe, ou seja, é uma ediçao

      this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem, // trás a mensagem do back
            // text: "Editado com sucesso!",
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(["admin/acessorios"], { state: { acessorioEditado: this.acessorio } }); //voltar para a lista de carros
          this.retorno.emit(this.acessorio);
        }, error: erro => {
          Swal.fire({
            title: "Ocorreu um erro!",
            icon: "error"
          });
          this.router2.navigate(["admin/acessorios"], { state: { acessorioEditado: this.acessorio } }); //voltar para a lista de carros
          this.retorno.emit(this.acessorio);
        }
      });
    } else { //caso de save
      this.acessorioService.save(this.acessorio).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(["admin/acessorios"], { state: { acessorioEditado: this.acessorio } }); //voltar para a lista de marcas
          this.retorno.emit(this.acessorio);
        }, error: erro => {
          Swal.fire({
            title: erro.error || "Ocorreu um erro!",
            icon: "error"
          });
          this.router2.navigate(["admin/acessorios"], { state: { acessorioEditado: this.acessorio } }); 
          this.retorno.emit(this.acessorio);
        }
      });
    }
  }
}
