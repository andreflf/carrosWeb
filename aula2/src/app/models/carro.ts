import { Acessorio } from "./acessorio";
import { Marca } from "./marca";
//export interface CreateCarro { 
//    nome: string; //permite criar um obj só com o nome
//}
export class Carro {

    id!: number | null;
    nome!: string;
    marca!: Marca | null;
    acessorios: Acessorio [] = [];

    constructor(id: number | null, nome:string, marca: Marca | null){
        this.id=id;
        this.nome=nome;
        this.marca=marca;
    }
}
