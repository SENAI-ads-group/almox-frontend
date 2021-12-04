import { ControlContainer, NgForm } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

import { ItemRequisicao } from "../../../../model/item-requisicao";
import { ProdutoModalListaComponent } from 'src/app/modules/produto/components/modal-listagem/produto-modal-lista.component';

@Component({
    selector: "item-requisicao-form",
    templateUrl: "./item-requisicao-form.component.html",
<<<<<<< HEAD
    styleUrls: ["./form.component.scss"]
=======
    styleUrls: ["./form.component.scss"],
>>>>>>> 2676bd2 (criar-acao-requisicao)
})
export class ItemRequisicaoFormComponent {
    @Input() item: ItemRequisicao = {  };
    @Output() submit = new EventEmitter<ItemRequisicao>();

    constructor(private dialogService: DialogService) {}

    dialogRefProduto: DynamicDialogRef;

    abrirDialogProduto() {
        this.dialogRefProduto = this.dialogService.open(
            ProdutoModalListaComponent,
            {
                header: "Selecione um produto clicando duas vezes sobre o mesmo",
                width: "70%",
                contentStyle: { "max-height": "500px", overflow: "auto" },
                baseZIndex: 10000,
            }
        );

        this.dialogRefProduto.onClose.subscribe(produtoSelecionado => {
            if (!produtoSelecionado) return;
            this.item.produto = produtoSelecionado;
        });
    }

<<<<<<< HEAD
    onSubmit = () => {
        if(!this.item.produto || !this.item.quantidade || this.item.quantidade <= 0) {
            return;
        }

        this.submit.emit(this.item);
=======
    onSubmit(formulario: NgForm){
        formulario.valid ? this.submit.emit(this.item) : null
>>>>>>> 2676bd2 (criar-acao-requisicao)
    }
}
