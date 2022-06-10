import { AprovarSolicitacaoCadastro } from './../../model/operador';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';

import { environment } from '../../environments/environment';
import OperadorModel, { SolicitacaoCadastro } from '../../model/operador';
import { CrudService } from '../shared/services/crud.service';

@Injectable({
    providedIn: "root",
})
export class OperadorService {
    _base = `${environment.api.baseUrl}/operadores`;

    constructor(private _http: HttpClient) { }

    criar(operador: OperadorModel): Observable<void> {
        return this._http.post<void>(this._base, { ...operador });
    }

    buscarOperadores(filtro: object = {}): Observable<OperadorModel[]> {
        Object.keys(filtro).forEach(key => {
            if (typeof filtro[key] !== 'number' && !filtro[key]) delete filtro[key];
        });
        return this._http.get<any>(`${this._base}`, { params: new HttpParams({ fromObject: { ...filtro, size: 500 } }) })
            .pipe(map(res => res.data))
    }

    excluir(id: string): Observable<void> {
        return this._http.delete<void>(`${this._base}/${id}`).pipe(take(1));
    }

    buscarAlmoxarifes() {
        return this._http.get<OperadorModel[]>(`${this._base}/listar-almoxarifes`)
    }

    buscarSolicitacoesCadastro(): Observable<SolicitacaoCadastro[]> {
        return this._http.get<SolicitacaoCadastro[]>(`${this._base}/solicitacoes-cadastro`)
    }

    aprovarSolicitacaoCadastro(cpf: string, aprovarSolicitacaoCadastro: AprovarSolicitacaoCadastro): Observable<void> {
        return this._http.post<void>(`${this._base}/solicitacoes-cadastro/${cpf}/aprovar`, { ...aprovarSolicitacaoCadastro });
    }

    excluirSolicitacaoCadastro(cpf: string): Observable<void> {
        return this._http.delete<void>(`${this._base}/solicitacoes-cadastro/${cpf}`).pipe(take(1));
    }
}
