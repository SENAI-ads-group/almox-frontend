import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Requisicao } from "src/app/model/requisicao";
import { environment } from "src/environments/environment";
import { CrudService } from "../../shared/services/crud.service";

@Injectable({
    providedIn: "root",
})
export class RequisicaoService extends CrudService<Requisicao, number> {
    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.baseUrl}/requisicoes`);
    }

    atenderRequisicao(id: number): Observable<any>{
return this._http.post(this._base+"/iniciar-atendimento/"+id, null);
    }

    cancelarRequisicao(id: number): Observable<any>{
        return this._http.post(this._base+"/cancelar-atendimento/"+id, null);
    }

    entregarRequisicao(id: number): Observable<any>{
        return this._http.post(this._base+"/entregar-atendimento/"+id, null);
    }

}
