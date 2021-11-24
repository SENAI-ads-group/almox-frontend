import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
    selector: "requisicao-filtro",
    templateUrl: "./requisicao-filtro-busca.component.html",
})
export class RequisicaoFiltroComponent {
    @Output("buscar") buscarEvent: EventEmitter<any> = new EventEmitter();

    filtro = {
        descricao: null,
    };

    constructor() {}

    onBuscar(): void {
        this.buscarEvent.emit({ filtro: this.filtro });
    }

    onLimpar(): void {
        this.filtro = {
            descricao: null,
        };
    }
}
