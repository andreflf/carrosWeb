import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  http = inject(HttpClient);

//environment para usar o ip em produçao e url localhost em dev
  API = environment.SERVIDOR + "/api/carro";

  constructor() {

  }

  findAll(): Observable<Carro[]> { //retorno List no back vira array no front(ts)
    return this.http.get<Carro[]>(this.API + "/findAll");
  }

  deleteById(id: number): Observable<string> { //quando o retorno é string no back fica assim:
    return this.http.delete<string>(this.API + "/deleteById/" + id, { responseType: "text" as "json" });
  }

  save(carro: Carro): Observable<string> { //sempre conferir no back o retorno, o verbo e o body (se tiver)
    return this.http.post<string>(this.API + "/save", carro, { responseType: "text" as "json" });
   //return this.http.post<string>(this.API + "/save", { nome: this.carro.nome }, { responseType: "text" as "json" });
  }

  update(carro: Carro, id: number): Observable<string> {
    return this.http.put<string>(this.API + "/update/" + id, carro, { responseType: "text" as "json" });
  }

  findById(id: number): Observable<Carro> {
    return this.http.get<Carro>(this.API + "/findById/" + id);
  }
}
