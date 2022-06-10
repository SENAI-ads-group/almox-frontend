import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProdutoService } from 'src/modules/produto/produto.service';
import { criarConfiguracaoColuna, TipoColuna } from 'src/modules/shared/components/tabela-crud/coluna';

import { HistoricoEstoqueProduto } from '../../../model/historico-estoque';
import ProdutoModel from '../../../model/produto';

@Component({
    selector: "modal-historico",
    templateUrl: "./modal-historico-produto.component.html",
    styleUrls: ["./modal-historico-produto.component.scss"],
})
export class ModalHistoricoComponent implements OnInit {
    @Input() produto: ProdutoModel;
    colunas: any[];
    registros: HistoricoEstoqueProduto[];
    loading: boolean = false;

    constructor(
        public dynamicDialogRef: DynamicDialogRef,
        public configDialog: DynamicDialogConfig,
        private produtoService: ProdutoService
    ) { }

    ngOnInit(): void {
        this.loading = true;
        this.colunas = [
            criarConfiguracaoColuna(
                "dataRegistro",
                "Data",
                TipoColuna.DATA_HORA,
                "left"
            ),
            criarConfiguracaoColuna(
                "movimento.tipoDeMovimento.descricao",
                "Tipo",
                TipoColuna.TEXTO,
                "left"
            ),
            criarConfiguracaoColuna(
                "movimento.idOrigem",
                "ID Origem",
                TipoColuna.TEXTO,
                "left"
            ),
            criarConfiguracaoColuna(
                "movimento.tipoOrigemMovimento.descricao",
                "Tipo Origem",
                TipoColuna.TEXTO,
                "left"
            ),
            criarConfiguracaoColuna(
                "estoqueAnterior",
                "Estoque Anterior",
                TipoColuna.DECIMAL,
                "left"
            ),
            criarConfiguracaoColuna(
                "itemMovimento.quantidade",
                "Quantidade",
                TipoColuna.DECIMAL,
                "left"
            ),
            criarConfiguracaoColuna(
                "estoqueFinal",
                "Estoque Final",
                TipoColuna.DECIMAL,
                "left"
            ),
            criarConfiguracaoColuna(
                "operador.pessoa.nome",
                "Operador",
                TipoColuna.TEXTO,
                "left"
            ),
        ];
        this.produto = this.configDialog.data;
        this.produtoService
            .buscarHistoricos(this.configDialog.data.id)
            .subscribe(
                dados => {
                    this.registros = dados;
                    this.loading = false;
                },
                () => (this.loading = false)
            );
    }

}
