import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Produto } from 'src/app/model/produto';
import { criarConfiguracaoColuna, TipoColuna } from 'src/app/modules/shared/components/tabela-crud/coluna';

@Component({
    selector: "modal-historico",
    templateUrl: "./modal-historico-produto.component.html",
    styleUrls: ["./modal-historico-produto.component.scss"],
})
export class ModalHistoricoComponent implements OnInit {
    @Input() produto: Produto;
    colunas: any[];
    registros = [{ dataRegistro: new Date() }];

    constructor(
        public dynamicDialogRef: DynamicDialogRef,
        public configDialog: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        this.colunas = [
            criarConfiguracaoColuna(
                "dataRegistro",
                "Data",
                TipoColuna.DATA_HORA,
                "center"
            ),
            criarConfiguracaoColuna(
                "estoqueAnterior",
                "Estq Anterior",
                TipoColuna.DECIMAL,
                "center"
            ),
            criarConfiguracaoColuna(
                "itemMovimento.quantidade",
                "Quantidade",
                TipoColuna.DECIMAL,
                "center"
            ),
            criarConfiguracaoColuna(
                "estoqueFinal",
                "Estq Final",
                TipoColuna.DECIMAL,
                "center"
            ),
            criarConfiguracaoColuna(
                "usuario.nome",
                "Usuário",
                TipoColuna.TEXTO,
                "center"
            ),
        ];
    }
}
