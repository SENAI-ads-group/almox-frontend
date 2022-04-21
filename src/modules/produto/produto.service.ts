import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import ProdutoModel, { CriarProduto } from '../../model/produto';
import { environment } from 'src/environments/environment';

import { CrudService } from '../shared/services/crud.service';
import { HistoricoEstoqueProduto } from '../../model/historico-estoque';


@Injectable({
    providedIn: "root",
})
export class ProdutoService {
    _base = `${environment.api.baseUrl}/produtos`;

    constructor(private _http: HttpClient) { }

    criar(criar: CriarProduto): Observable<ProdutoModel> {
        return this._http.post<ProdutoModel>(`${this._base}`, criar);
    }

    atualizar(id: string, prod: ProdutoModel): Observable<ProdutoModel> {
        return this._http.put<ProdutoModel>(`${this._base}/${id}`, prod).pipe(take(1));
    }

    buscarPorId(id: string): Observable<ProdutoModel> {
        return this._http.get<ProdutoModel>(`${this._base}/${id}`);
    }

    buscarProdutos(filtro: object = {}): Observable<ProdutoModel[]> {
        Object.keys(filtro).forEach(key => {
            if (typeof filtro[key] !== 'number' && !filtro[key]) delete filtro[key];
        });
        return this._http.get<any>(`${this._base}`, { params: new HttpParams({ fromObject: { ...filtro } }) })
            .pipe(map(res => res.data))
    }

    excluir(id: string): Observable<ProdutoModel> {
        return this._http.delete<ProdutoModel>(this._base + '/' + id).pipe(take(1));
    }

    buscarHistoricos(idProduto: number): Observable<HistoricoEstoqueProduto[]> {
        return this._http.get<HistoricoEstoqueProduto[]>(`${this._base}/${idProduto}/historico-estoque`);
    }
}
