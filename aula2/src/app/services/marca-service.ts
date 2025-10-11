import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Marca } from '../models/marca';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  
  http = inject(HttpClient);


  API = environment.SERVIDOR + "/api/carro/marca";

  constructor() {

  }

  findAll(): Observable<Marca[]> { //retorno List no back vira array no front(ts)
    return this.http.get<Marca[]>(this.API + "/findAll");
  }

  deleteById(id: number): Observable<string> { //quando o retorno é string no back fica assim:
    return this.http.delete<string>(this.API + "/deleteById/" + id, { responseType: "text" as "json" });
  }

  save(marca: Marca): Observable<string> { //sempre conferir no back o retorno, o verbo e o body (se tiver)
    return this.http.post<string>(this.API + "/save", marca, { responseType: "text" as "json" });
   //return this.http.post<string>(this.API + "/save", { nome: this.carro.nome }, { responseType: "text" as "json" });
  }

  update(marca: Marca, id: number): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + id, marca, { responseType: "text" as "json" });
  }

  findById(id: number): Observable<Marca> {
    return this.http.get<Marca>(this.API + "/findById/" + id);
  }
}
