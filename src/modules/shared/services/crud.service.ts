import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators'

export abstract class CrudService<T, ID> {

    constructor(protected _http: HttpClient, protected _base: string) { }

    criar(t: T): Observable<T> {
        return this._http.post<T>(`${this._base}`, t);
    }

    atualizar(id: ID, t: T): Observable<T> {
        return this._http.put<T>(this._base + "/" + id, t, {}).pipe(take(1));
    }

    buscarPorId(id: ID): Observable<T> {
        return this._http.get<T>(this._base + "/" + id);
    }

    buscarTodosFiltrado(filtro: any): Observable<T[]> {
        return this._http.post<T[]>(`${this._base}/listar`, filtro)
    }

    buscarTodos(filtro: object = {}): Observable<T[]> {
        Object.keys(filtro).forEach(key => {
            if (typeof filtro[key] !== 'number' && !filtro[key]) delete filtro[key];
        });
        return this._http.get<any>(`${this._base}`, { params: new HttpParams({ fromObject: { ...filtro } }) })
            .pipe(map(res => res.data))
    }

    excluir(id: ID): Observable<T> {
        return this._http.delete<T>(this._base + '/' + id).pipe(take(1));
    }

}
