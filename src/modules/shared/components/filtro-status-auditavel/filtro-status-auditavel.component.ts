import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FiltroStatusAuditoria } from "../../../../model/enums";

@Component({
    selector: "filtro-status-auditavel",
    templateUrl: "./filtro-status-auditavel.component.html",
    styleUrls: ["./filtro-status-auditavel.component.scss"],
})
export class FiltroStatusAuditavel implements OnInit {
    filtroStatusAuditavel: any = null;
    @Input() filtroSelecionado: any = FiltroStatusAuditoria.APENAS_ATIVOS;
    @Output() filtroChange = new EventEmitter();

    constructor() {}

    ngOnInit(): void {
        this.filtroStatusAuditavel = this.filtroSelecionado.valor;
    }

    onChangeTriStateCheckBox() {
        this.filtroSelecionado =
            FiltroStatusAuditoria.resolverSelecaoConsideracao(
                this.filtroStatusAuditavel
            );
        this.filtroChange.emit(this.filtroSelecionado);
    }
}
