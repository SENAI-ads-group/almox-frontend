import { DepartamentoModule } from './departamento.module';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, take, map } from "rxjs";

import { environment } from "../../environments/environment";
import DepartamentoModel, { CriarDepartamento } from "../../model/departamento";
import { CrudService } from "../shared/services/crud.service";

@Injectable({
    providedIn: "root",
})
export class DepartamentoService {
    _base = `${environment.api.baseUrl}/departamentos`;

    constructor(private _http: HttpClient) { }

    criar(criar: CriarDepartamento): Observable<DepartamentoModel> {
        return this._http.post<DepartamentoModel>(`${this._base}`, criar);
    }

    atualizar(id: string, dpto: DepartamentoModel): Observable<DepartamentoModel> {
        return this._http.put<DepartamentoModel>(this._base + "/" + id, dpto, {}).pipe(take(1));
    }

    buscarPorId(id: string): Observable<DepartamentoModel> {
        return this._http.get<DepartamentoModel>(`${this._base}/${id}`);
    }

    buscarDepartamentos(filtro: object = {}): Observable<DepartamentoModel[]> {
        Object.keys(filtro).forEach(key => {
            if (typeof filtro[key] !== 'number' && !filtro[key]) delete filtro[key];
        });
        return this._http.get<any>(`${this._base}`, { params: new HttpParams({ fromObject: { ...filtro, size: 500 } }) })
            .pipe(map(res => res.data))
    }

    excluir(id: string): Observable<DepartamentoModel> {
        return this._http.delete<DepartamentoModel>(this._base + '/' + id).pipe(take(1));
    }

    buscarAssociadosOperadorLogado(): Observable<DepartamentoModel[]> {
        return this._http.get<DepartamentoModel[]>(
            this._base + "/associados-operador-logado"
        );
    }

    buscarPorRelacaoProduto(idProduto: number, relacionados: boolean): Observable<DepartamentoModel[]> {
        return this._http.get<DepartamentoModel[]>(
            this._base + `/relacao-produto/${idProduto}?relacionados=${relacionados}`
        );
    }
}
