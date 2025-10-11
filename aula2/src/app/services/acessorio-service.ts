import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Acessorio } from '../models/acessorio';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AcessorioService {
   http = inject(HttpClient);


  API = environment.SERVIDOR + "/api/carro/acessorio";

  constructor() {

  }

  findAll(): Observable<Acessorio[]> { //retorno List no back vira array no front(ts)
    return this.http.get<Acessorio[]>(this.API + "/findAll");
  }

  deleteById(id: number): Observable<string> { //quando o retorno é string no back fica assim:
    return this.http.delete<string>(this.API + "/deleteById/" + id, { responseType: "text" as "json" });
  }

  save(acessorio: Acessorio): Observable<string> { //sempre conferir no back o retorno, o verbo e o body (se tiver)
    return this.http.post<string>(this.API + "/save", acessorio, { responseType: "text" as "json" });
   //return this.http.post<string>(this.API + "/save", { nome: this.carro.nome }, { responseType: "text" as "json" });
  }

  update(acessorio: Acessorio, id: number): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + id, acessorio, { responseType: "text" as "json" });
  }

  findById(id: number): Observable<Acessorio> {
    return this.http.get<Acessorio>(this.API + "/findById/" + id);
  }
}
