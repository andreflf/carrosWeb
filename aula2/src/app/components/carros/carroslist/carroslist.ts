import { Component, inject, TemplateRef, ViewChild} from '@angular/core';
import { Carro } from '../../../models/carro';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';
import { Carrosdetails } from "../carrosdetails/carrosdetails";
import { CarroService } from '../../../services/carroService';
import { Marca } from '../../../models/marca';

@Component({
  selector: 'app-carroslist',
  imports: [MdbModalModule, Carrosdetails],
  templateUrl: './carroslist.html',
  styleUrl: './carroslist.scss'
})
export class Carroslist {

  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, "", null);

  carroService = inject(CarroService);

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); //para conseguir abrir a modal
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;
  
  constructor() {

    this.findAll();

    //verificar se tem carro Novo ou Editado
    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    //se tem carro novo insere 
    if (carroNovo != null) {
      carroNovo.id = 555;
      this.lista.push(carroNovo);
    }
    //se tem carro editado coloca no lugar/sobrescreve de acordo com o id
    if (carroEditado != null) {
      //faz varredura na lista para achar um id igual o do carro editado
      let indice = this.lista.findIndex(x => { return x.id == carroEditado.id });
      this.lista[indice] = carroEditado;
    }
  }

  findAll(){
    this.carroService.findAll().subscribe({next: lista =>{ //quando back-end retornar OK
      this.lista = lista;
    },error: erro => { //se o back-end retornar bad_request
      Swal.fire({
            title: "Ocorreu um erro!",
            icon: "error"
          });
  },})
  }

  deleteById(carro: Carro) {
    Swal.fire({
      title: "Deseja realmente deletar " + carro.nome + "?",
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton:true,
      confirmButtonText: 'Sim',
      cancelButtonText: "Nao"
    })
      .then((result) => {
        if (result.isConfirmed && carro.id != null) { 
           this.carroService.deleteById(carro.id).subscribe({next: mensagem =>{ //quando back-end retornar OK
      Swal.fire({
            title: mensagem,
            icon: "success"
          });
          this.findAll();
    },error: erro => { //se o back-end retornar bad_request
      Swal.fire({
            title: "Ocorreu um erro!",
            icon: "error"
          });
  },})

            //usei apenas no inicio com lista fixa e assim removia na mao
          //faz varredura na lista para achar um id igual o do carro na lista para deletar
         // let indice = this.lista.findIndex(x => { return x.id == carro.id });
        //  this.lista.splice(indice, 1); //na posiçao do indice passado, vai remover 1 da lista
        }
      });

  }

  new(){
    this.carroEdit = new Carro(null, "", null);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro:Carro){
    this.carroEdit = Object.assign({}, carro); //clonando para evitar referencia do objeto (evitar quando estiver editando já ir mudando na tabela)
this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){
    //atualizar a lista de carros e depois fecha a modal
    this.findAll();
    this.modalRef.close();

  }
}
