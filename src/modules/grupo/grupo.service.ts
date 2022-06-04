import GrupoModel, { CriarGrupo } from './../../model/grupo';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CrudService } from "../shared/services/crud.service";

import { environment } from "../../environments/environment";
import { map, Observable, take } from 'rxjs';

@Injectable({
    providedIn: "root",
})
export class GrupoService {
    _base = `${environment.api.baseUrl}/grupos`;

    constructor(private _http: HttpClient) { }

    criar(criar: CriarGrupo): Observable<GrupoModel> {
        return this._http.post<GrupoModel>(`${this._base}`, criar);
    }

    atualizar(id: string, dpto: GrupoModel): Observable<GrupoModel> {
        return this._http.put<GrupoModel>(this._base + "/" + id, dpto, {}).pipe(take(1));
    }

    buscarPorId(id: string): Observable<GrupoModel> {
        return this._http.get<GrupoModel>(`${this._base}/${id}`);
    }

    buscarGrupos(filtro: object = {}): Observable<GrupoModel[]> {
        Object.keys(filtro).forEach(key => {
            if (typeof filtro[key] !== 'number' && !filtro[key]) delete filtro[key];
        });
        return this._http.get<any>(`${this._base}`, { params: new HttpParams({ fromObject: { ...filtro } }) })
            .pipe(map(res => res.data))
    }

    excluir(id: string): Observable<GrupoModel> {
        return this._http.delete<GrupoModel>(this._base + '/' + id).pipe(take(1));
    }
}
