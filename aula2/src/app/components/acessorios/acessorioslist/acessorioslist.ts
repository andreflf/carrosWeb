import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Acessorio } from '../../../models/acessorio';
import { AcessorioService } from '../../../services/acessorio-service';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Acessoriosdetails } from '../acessoriosdetails/acessoriosdetails';

@Component({
  selector: 'app-acessorioslist',
  imports: [Acessoriosdetails, MdbModalModule],
  templateUrl: './acessorioslist.html',
  styleUrl: './acessorioslist.scss'
})
export class Acessorioslist {
 lista: Acessorio[] = [];
  acessorioEdit: Acessorio = new Acessorio(0, "");

  acessorioService = inject(AcessorioService);

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); //para conseguir abrir a modal
  @ViewChild("modalAcessorioDetalhe") modalAcessorioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

    @Input("esconderBotoes") esconderBotoes: boolean = false;
    @Output("retorno") retorno = new EventEmitter<any>();

  constructor() {

    this.findAll();

    //verificar se tem carro Novo ou Editado
    let AcessorioNovo = history.state.acessorioNovo;
    let AcessorioEditado = history.state.acessorioEditado;

    //se tem carro novo insere 
    if (AcessorioNovo != null) {
      AcessorioNovo.id = 555;
      this.lista.push(AcessorioNovo);
    }
    //se tem carro editado coloca no lugar/sobrescreve de acordo com o id
    if (AcessorioEditado != null) {
      //faz varredura na lista para achar um id igual o do carro editado
      let indice = this.lista.findIndex(x => { return x.id == AcessorioEditado.id });
      this.lista[indice] = AcessorioEditado;
    }
  }

  findAll() {
    this.acessorioService.findAll().subscribe({
      next: lista => { //quando back-end retornar OK
        this.lista = lista;
      }, error: erro => { //se o back-end retornar bad_request
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: "error"
        });
      },
    })
  }

  deleteById(acessorio: Acessorio) {
    Swal.fire({
      title: "Deseja realmente deletar " + acessorio.nome + "?",
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: "Nao"
    })
      .then((result) => {
        if (result.isConfirmed && acessorio.id !=null) {
          this.acessorioService.deleteById(acessorio.id).subscribe({
            next: mensagem => { //quando back-end retornar OK
              Swal.fire({
                title: mensagem,
                icon: "success"
              });
              this.findAll();
            }, error: erro => { //se o back-end retornar bad_request
              Swal.fire({
                title: "Ocorreu um erro!",
                icon: "error"
              });
            },
          })
        }
      });

  }

  new() {
    this.acessorioEdit = new Acessorio(null, "");
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  edit(acessorio: Acessorio) {
    this.acessorioEdit = Object.assign({}, acessorio); //clonando para evitar referencia do objeto (evitar quando estiver editando já ir mudando na tabela)
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  retornoDetalhe(acessorio: Acessorio) {
    //atualizar a lista de carros e depois fecha a modal
    this.findAll();
    this.modalRef.close();

  }

  select(acessorio: Acessorio) {
      this.retorno.emit(acessorio); 
    }

}
