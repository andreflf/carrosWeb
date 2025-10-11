import { Component, EventEmitter, inject, Input, input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Marca } from '../../../models/marca';
import { MarcaService } from '../../../services/marca-service';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import Swal from 'sweetalert2';
import { Marcasdetails } from '../marcasdetails/marcasdetails';

@Component({
  selector: 'app-marcaslist',
  imports: [Marcasdetails, MdbModalModule],
  templateUrl: './marcaslist.html',
  styleUrl: './marcaslist.scss'
})
export class Marcaslist {
  lista: Marca[] = [];
  marcaEdit: Marca = new Marca(0, "");

  marcaService = inject(MarcaService);

  @Input("esconderBotoes") esconderBotoes: boolean = false; //para o valor que sera enviado pela carrosdetails.html 
  @Output("retorno") retorno = new EventEmitter<any>(); //vai retornar a marca selecionada para a modal carrosdetails de trás

  //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); //para conseguir abrir a modal
  @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    //para listar todos assim que abrir a aba de carros
    this.findAll();

    //verificar se tem carro Novo ou Editado
    let MarcaNova = history.state.marcaNova;
    let MarcaEditada = history.state.marcaEditada;

    //se tem carro novo insere 
    if (MarcaNova != null) {
      MarcaNova.id = 555;
      this.lista.push(MarcaNova);
    }
    //se tem carro editado coloca no lugar/sobrescreve de acordo com o id
    if (MarcaEditada != null) {
      //faz varredura na lista para achar um id igual o do carro editado
      let indice = this.lista.findIndex(x => { return x.id == MarcaEditada.id });
      this.lista[indice] = MarcaEditada;
    }
  }

  findAll() {
    this.marcaService.findAll().subscribe({
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

  deleteById(marca: Marca) {
    Swal.fire({
      title: "Deseja realmente deletar " + marca.nome + "?",
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: "Nao"
    })
      .then((result) => {
        if (result.isConfirmed && marca.id !=null) {
          this.marcaService.deleteById(marca.id).subscribe({
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
    this.marcaEdit = new Marca(null, "");
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca: Marca) {
    this.marcaEdit = Object.assign({}, marca); //clonando para evitar referencia do objeto (evitar quando estiver editando já ir mudando na tabela)
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(marca: Marca) {
    //atualizar a lista de carros e depois fecha a modal
    this.findAll();
    this.modalRef.close();

  }

  select(marca: Marca) {
    //quando clica em selecionar envia a marca para a modal de trás (carrosdetails.html) 
    // e segue o fluxo de lá indo para a carrosdetails.ts
    this.retorno.emit(marca); 
  }
}
