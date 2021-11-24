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
}
