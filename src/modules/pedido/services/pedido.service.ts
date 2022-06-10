import { map, Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Pedido, CriarPedido } from "src/model/pedido";

@Injectable({
    providedIn: "root",
})
export class PedidoService {
    _base = `${environment.api.baseUrl}/pedidos`;

    constructor(private _http: HttpClient) { }

    criar(criar: CriarPedido): Observable<Pedido> {
        return this._http.post<Pedido>(`${this._base}`, criar);
    }

    buscarPorId(id: string): Observable<Pedido> {
        return this._http.get<Pedido>(`${this._base}/${id}`);
    }

    buscarPedidos(filtro: object = {}): Observable<Pedido[]> {
        Object.keys(filtro).forEach(key => {
            if (typeof filtro[key] !== 'number' && !filtro[key]) delete filtro[key];
        });
        return this._http.get<any>(`${this._base}`, { params: new HttpParams({ fromObject: { ...filtro, size: 500 } }) })
            .pipe(map(res => res.data))
    }

    cancelarPedido(id: number): Observable<any> {
        return this._http.post(`${this._base}/${id}/cancelar`, null);
    }

    receberPedido(id: number): Observable<any> {
        return this._http.post<void>(`${this._base}/${id}/receber`, null);
    }
}
