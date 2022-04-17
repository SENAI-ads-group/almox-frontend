import { Component, EventEmitter, Input, Output } from "@angular/core";

import { FiltroStatusAuditoria } from "../../../../model/enums";
import DepartamentoModel from "../../../../model/departamento";
import GrupoModel from "../../../../model/grupo";

@Component({
    selector: "produto-filtro",
    templateUrl: "./produto-filtro-busca.component.html",
})
export class ProdutoFiltroComponent {
    @Output("buscar") buscarEvent: EventEmitter<any> = new EventEmitter();
    @Input() grupos: GrupoModel[];
    @Input() departamentos: DepartamentoModel[];

    filtro = {
        descricao: null,
        codigoBarras: null,
        grupos: null,
        fornecedor: null,
        departamentos: null,
        unidadeMedida: null,
        filtroStatusAuditavel: FiltroStatusAuditoria.APENAS_ATIVOS,
    };

    constructor() {}

    buscar(): void {
        this.buscarEvent.emit({ filtro: this.filtro });
    }

    limpar(): void {
        this.filtro = {
            descricao: null,
            codigoBarras: null,
            grupos: null,
            fornecedor: null,
            departamentos: null,
            unidadeMedida: null,
            filtroStatusAuditavel: FiltroStatusAuditoria.APENAS_ATIVOS,
        };
    }
}
