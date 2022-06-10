import { map, Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Requisicao, CriarRequisicao } from "src/model/requisicao";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class RequisicaoService {
    _base = `${environment.api.baseUrl}/requisicoes`;

    constructor(private _http: HttpClient) { }

    criar(criar: CriarRequisicao): Observable<Requisicao> {
        return this._http.post<Requisicao>(`${this._base}`, criar);
    }

    buscarPorId(id: string): Observable<Requisicao> {
        return this._http.get<Requisicao>(`${this._base}/${id}`);
    }

    buscarRequisicoes(filtro: object = {}): Observable<Requisicao[]> {
        Object.keys(filtro).forEach(key => {
            if (typeof filtro[key] !== 'number' && !filtro[key]) delete filtro[key];
        });
        return this._http.get<any>(`${this._base}`, { params: new HttpParams({ fromObject: { ...filtro, size: 500 } }) })
            .pipe(map(res => res.data))
    }

    atenderRequisicao(id: number): Observable<any> {
        return this._http.post(`${this._base}/${id}/atender`, null);
    }

    cancelarRequisicao(id: number): Observable<any> {
        return this._http.post(`${this._base}/${id}/cancelar`, null);
    }

    entregarRequisicao(requisicao: Requisicao): Observable<any> {
        return this._http.post(
            `${this._base}/${requisicao.id}/entregar`,
            requisicao
        );
    }
}
