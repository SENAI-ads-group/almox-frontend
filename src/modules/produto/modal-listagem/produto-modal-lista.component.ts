import { Observable } from 'rxjs';
import { ProdutoService } from "../produto.service";
import { Component, OnInit } from "@angular/core";
import ProdutoModel from "../../../model/produto";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    selector: "produto-modal-lista",
    templateUrl: "./produto-modal-lista.component.html",
})
export class ProdutoModalListaComponent implements OnInit {
    produtos$: Observable<ProdutoModel[]>;

    constructor(
        private produtoService: ProdutoService,
        public dynamicDialogRef: DynamicDialogRef,
        public configDialog: DynamicDialogConfig
    ) { }

    ngOnInit(): void {
        this.produtos$ = this.produtoService.buscarProdutos();
    }

    onSelecionar(event: MouseEvent, produtoSelecionado: ProdutoModel) {
        this.dynamicDialogRef.close(produtoSelecionado);
    }

}
