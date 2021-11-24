import { ProdutoService } from "./../../services/produto.service";
import { Component, OnInit } from "@angular/core";
import { Produto } from "src/app/model/produto";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    selector: "produto-modal-lista",
    templateUrl: "./produto-modal-lista.component.html",
})
export class ProdutoModalListaComponent implements OnInit {
    produtos: Produto[];

    constructor(
        private produtoService: ProdutoService,
        public dynamicDialogRef: DynamicDialogRef,
        public configDialog: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
this.produtos = [
    {   id: 1,
        descricao: "escova de dente",
        codigoBarras: "1HHY212JEENNXXIYUY",
        unidadeMedida: {descricao: "MG"},
        grupo: {descricao: "Utensílios"},
    },

    {   id: 2,
        descricao: "escova de cabelo",
        codigoBarras: "1HHY212JEENNX44242Y",
        unidadeMedida: {descricao: "MG"},
        grupo: {descricao: "Utensílios"},
    }
]
        //this.produtoService.buscarTodos().subscribe(registros => this.produtos = registros);
    }

    selecionarProduto(produto: Produto): void {
        this.dynamicDialogRef.close(produto);
    }
}
