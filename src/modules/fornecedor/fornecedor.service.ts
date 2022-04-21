import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import FornecedorModel, { CriarFornecedor } from "src/model/fornecedor";
import { environment } from "src/environments/environment";
import { map, Observable, take } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class FornecedorService {
    _base = `${environment.api.baseUrl}/fornecedores`;

    constructor(private _http: HttpClient) { }

    criar(criar: CriarFornecedor): Observable<void> {
        return this._http.post<void>(`${this._base}`, criar);
    }

    atualizar(id: string, fornecedor: FornecedorModel): Observable<FornecedorModel> {
        return this._http.put<FornecedorModel>(`${this._base}/${id}`, fornecedor).pipe(take(1));
    }

    buscarPorId(id: string): Observable<FornecedorModel> {
        return this._http.get<FornecedorModel>(`${this._base}/${id}`);
    }

    buscarFornecedores(filtro: object = {}): Observable<FornecedorModel[]> {
        Object.keys(filtro).forEach(key => {
            if (typeof filtro[key] !== 'number' && !filtro[key]) delete filtro[key];
        });
        return this._http.get<any>(`${this._base}`, { params: new HttpParams({ fromObject: { ...filtro } }) })
            .pipe(map(res => res.data))
    }

    excluir(id: string): Observable<void> {
        return this._http.delete<void>(this._base + '/' + id).pipe(take(1));
    }

}
