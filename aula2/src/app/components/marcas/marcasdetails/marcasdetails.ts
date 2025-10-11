import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../../../services/marca-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcasdetails',
  imports: [MdbFormsModule, FormsModule], 
  templateUrl: './marcasdetails.html',
  styleUrl: './marcasdetails.scss'
})
export class Marcasdetails {

  @Input("marca") marca: Marca = new Marca(0, "");
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute); //para pegar parametro de rota (na url)
  router2 = inject(Router); // fazer redirecionamentos

  marcaService = inject(MarcaService);

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
    this.marcaService.findById(id).subscribe({
      next: retorno => {
        this.marca = retorno;
      }, error: erro => {
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: "error"
        });
      }
    });
  }

  salvar() {

    if (this.marca.id!=null && this.marca.id > 0) { //se maior que 0 é porque o carro existe, ou seja, é uma ediçao

      this.marcaService.update(this.marca, this.marca.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem, // trás a mensagem do back
            // text: "Editado com sucesso!",
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(["admin/marcas"], { state: { marcaEditada: this.marca } }); //voltar para a lista de carros
          this.retorno.emit(this.marca);
        }, error: erro => {
          Swal.fire({
            title: "Ocorreu um erro!",
            icon: "error"
          });
          this.router2.navigate(["admin/marcas"], { state: { marcaEditada: this.marca } }); //voltar para a lista de carros
          this.retorno.emit(this.marca);
        }
      });
    } else { //caso de save
      this.marcaService.save(this.marca).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(["admin/marcas"], { state: { marcaEditada: this.marca } }); //voltar para a lista de marcas
          this.retorno.emit(this.marca);
        }, error: erro => {
          Swal.fire({
            title: erro.error || "Ocorreu um erro!",
            icon: "error"
          });
          this.router2.navigate(["admin/marcas"], { state: { marcaEditada: this.marca } }); 
          this.retorno.emit(this.marca);
        }
      });
    }
  }
}
