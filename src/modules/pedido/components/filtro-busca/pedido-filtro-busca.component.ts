import { OperadorService } from "../../../operador/operador.service";
import { Observable } from "rxjs";
import OperadorModel from "../../../../model/operador";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import FornecedorModel from "src/model/fornecedor";

@Component({
    selector: "pedido-filtro",
    templateUrl: "./pedido-filtro-busca.component.html",
})
export class PedidoFiltroComponent {
    @Output("buscar") buscarEvent: EventEmitter<any> = new EventEmitter();

    @Input() compradores: OperadorModel[];
    @Input() fornecedores: FornecedorModel[];
    @Input() enums: any;

    filtro = {
        descricao: null,
        comprador: null,
        fornecedor: null
    };

    constructor(private operadorService: OperadorService) { }

    onBuscar(): void {
        this.buscarEvent.emit({ filtro: this.filtro });
    }

    onLimpar(): void {
        this.filtro = {
            descricao: null,
            comprador: null,
            fornecedor: null,
        };
    }
}
