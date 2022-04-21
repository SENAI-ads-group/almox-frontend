import { OperadorService } from "../../../operador/operador.service";
import { Observable } from "rxjs";
import OperadorModel from "./../../../../model/operador";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "requisicao-filtro",
    templateUrl: "./requisicao-filtro-busca.component.html",
})
export class RequisicaoFiltroComponent {
    @Output("buscar") buscarEvent: EventEmitter<any> = new EventEmitter();

    @Input() almoxarifes: OperadorModel[];
    @Input() requisitantes: OperadorModel[];
    @Input() enums: any;

    filtro = {
        descricao: null,
        almoxarife: null,
        requisitante: null
    };

    constructor(private operadorService: OperadorService) {}

    onBuscar(): void {
        this.buscarEvent.emit({ filtro: this.filtro });
    }

    onLimpar(): void {
        this.filtro = {
            descricao: null,
            almoxarife: null,
            requisitante: null
        };
    }
}
