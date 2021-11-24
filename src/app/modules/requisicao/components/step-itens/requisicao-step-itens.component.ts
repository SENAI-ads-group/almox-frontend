import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProdutoService } from "src/app/modules/produto/services/produto.service";

import { ItemRequisicao } from "../../../../model/item-requisicao";
import { RequisicaoStepMergeService } from "../../services/requisicao-step-merge.service";

@Component({
    selector: "requisicao-step-itens",
    templateUrl: "./requisicao-step-itens.component.html",
    styleUrls: ["./requisicao-step-itens.component.scss"],
})
export class RequisicaoStepItensComponent implements OnInit {
    registroNoFormulario: any;
    registros: ItemRequisicao[];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private stepMergeService: RequisicaoStepMergeService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private produtoService: ProdutoService
    ) {}

    dialogItemRequisicao: DynamicDialogRef;

    ngOnInit(): void {
        this.registros = this.stepMergeService.state.itens;
    }

    handleEditar({ rowIndex, item }) {
        this.registroNoFormulario = { rowIndex, item: Object.assign({}, item) };
    }

    handleExcluir({ rowIndex }) {
        this.registros.splice(rowIndex, 1);
    }

    onFormularioSubmit(itemFormulario: ItemRequisicao) {
        if (this.registroNoFormulario.rowIndex !== -1) {
            this.registros[this.registroNoFormulario.rowIndex] = Object.assign(
                {},
                itemFormulario
            );
        } else {
            this.registros.push(Object.assign({}, itemFormulario));
        }
        this.registroNoFormulario = null; // fecha o formulário
    }

    stepAnterior() {
        this.router.navigate(["../informacoes"], {
            relativeTo: this.activatedRoute,
        });
    }

    proximoStep() {}
}
