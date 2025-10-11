import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarroService } from '../../../services/carroService';
import { Marca } from '../../../models/marca';
import { Marcaslist } from "../../marcas/marcaslist/marcaslist";
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Acessorioslist } from '../../acessorios/acessorioslist/acessorioslist';
import { Acessorio } from '../../../models/acessorio';

@Component({
  selector: 'app-carrosdetails',
  imports: [MdbFormsModule, FormsModule, Marcaslist, Acessorioslist],
  templateUrl: './carrosdetails.html',
  styleUrl: './carrosdetails.scss'
})
export class Carrosdetails {

  @Input("carro") carro: Carro = new Carro(0, "", null);
  @Output("retorno") retorno = new EventEmitter<any>();

  router = inject(ActivatedRoute); //para pegar parametro de rota (na url)
  router2 = inject(Router); // fazer redirecionamentos

  carroService = inject(CarroService);


    //ELEMENTOS DA MODAL
  modalService = inject(MdbModalService); //para conseguir abrir a modal
  @ViewChild("modalMarcas") modalMarcas!: TemplateRef<any>; //referencia a modal que está no html
  @ViewChild("modalAcessorios") modalAcessorios!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  
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
    this.carroService.findById(id).subscribe({
      next: retorno => {
        this.carro = retorno;
      }, error: erro => {
        Swal.fire({
          title: "Ocorreu um erro!",
          icon: "error"
        });
      }
    });
  }

  salvar() {
    console.log("Carro enviado:", this.carro);
    if (this.carro.id !=null && this.carro.id > 0) { //se maior que 0 é porque o carro existe, ou seja, é uma ediçao
      this.carroService.update(this.carro, this.carro.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem, // trás a mensagem do back
            // text: "Editado com sucesso!",
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(["admin/carros"], { state: { carroEditado: this.carro } }); //voltar para a lista de carros
          this.retorno.emit(this.carro);
        }, error: erro => {
          Swal.fire({
            title: "Ocorreu um erro!",
            icon: "error"
          });
          this.router2.navigate(["admin/carros"], { state: { carroEditado: this.carro } }); //voltar para a lista de carros
          this.retorno.emit(this.carro);
        }
      });
    } else { //caso de save
      this.carroService.save(this.carro).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router2.navigate(["admin/carros"], { state: { carroEditado: this.carro } }); //voltar para a lista de carros
          this.retorno.emit(this.carro);
        }, error: erro => {
          Swal.fire({
            title: erro.error || "Ocorreu um erro!",
            icon: "error"
          });
          this.router2.navigate(["admin/carros"], { state: { carroEditado: this.carro } }); //voltar para a lista de carros
          this.retorno.emit(this.carro);
        }
      });
    }
  }

  buscarMarca(){
    //abre a modal de marcaslist, mas que fica dentro da carrosdetails.html pq é na frente dela que vai aparecer
    //por isso tem que colocar o Marcaslist nos imports daqui
    this.modalRef = this.modalService.open(this.modalMarcas, {modalClass: "modal-lg"}); 
  }

  retornoMarca(marca: Marca){ //recebe a marca selecionada na marcaslist
    this.carro.marca=marca;
    this.modalRef.close(); //fecha a modal da marcaslist
  }

  buscarAcessorio(){
    this.modalRef = this.modalService.open(this.modalAcessorios, {modalClass: "modal-lg"}); 
  }

  retornoAcessorio(acessorio: Acessorio){
    if(this.carro.acessorios ==null)
      this.carro.acessorios = [];
    this.carro.acessorios.push(acessorio);
    this.modalRef.close();
  }

  removerAcessorio(acessorio: Acessorio){ //remove apenas da tabela, desassocia do carro, mas o acessorio ainda existe na tabela de acessórios
    let posicao = this.carro.acessorios.findIndex(x => {return x.id == acessorio.id});
    this.carro.acessorios.splice(posicao,1);
  }
}


