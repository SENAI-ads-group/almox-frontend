import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import OperadorModel from '../../model/operador';
import { CrudService } from '../shared/services/crud.service';

@Injectable({
    providedIn: "root",
})
export class OperadorService extends CrudService<OperadorModel, string> {
    constructor(protected _http: HttpClient) {
        super(_http, `${environment.api.baseUrl}/operadores`);
    }

    buscarAlmoxarifes() {
        return this._http.get<OperadorModel[]>(`${this._base}/listar-almoxarifes`)
    }
}
