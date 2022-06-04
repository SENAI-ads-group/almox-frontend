import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import FornecedorModel from "src/model/fornecedor";

@Component({
    selector: "fornecedor-modal-lista",
    templateUrl: "./fornecedor-modal-lista.component.html",
})
export class FornecedorModalListaComponent implements OnInit {
    @Input() titulo: string;
    @Input() mostrarModal: boolean;
    @Input() fornecedores: FornecedorModel[];
    @Output() onHide = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    handleOnHide() {
        this.onHide.emit({});
    }
}
