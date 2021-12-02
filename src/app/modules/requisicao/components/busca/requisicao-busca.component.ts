import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { Requisicao } from "src/app/model/requisicao";
import {
    criarConfiguracaoColuna,
    TipoColuna,
} from "src/app/modules/shared/components/tabela-crud/coluna";
import { CommonService } from "src/app/modules/shared/services/common.service";
import { HandleErrorService } from "src/app/modules/shared/services/handle-error.service";

import { PaginaBuscaCrud } from "../../../shared/PaginaBuscaCrud";
import { RequisicaoService } from "../../services/requisicao.service";

@Component({
    selector: "requisicao-busca",
    templateUrl: "./requisicao-busca.component.html",
})
export class RequisicaoBuscaComponent
    implements OnInit, PaginaBuscaCrud<Requisicao>
{
    NOME_PAGINA = "Requisições";
    registros$: Observable<Requisicao[]>;
    enums$: Observable<any>;
    colunas: any[];

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private commonService: CommonService,
        private requisicaoService: RequisicaoService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.colunas = [
            criarConfiguracaoColuna("id", "#", TipoColuna.TEXTO),
            criarConfiguracaoColuna(
                "dataRequisicao",
                "Data",
                TipoColuna.DATA_HORA
            ),
            criarConfiguracaoColuna(
                "requisitante.nome",
                "Requisitante",
                TipoColuna.TEXTO
            ),
            criarConfiguracaoColuna(
                "almoxarife.nome",
                "Almoxarife",
                TipoColuna.TEXTO
            ),
            criarConfiguracaoColuna(
                "departamento.nome",
                "Departamento",
                TipoColuna.TEXTO
            ),
            criarConfiguracaoColuna(
                "status.descricao",
                "Status",
                TipoColuna.TEXTO
            ),
        ];

        this.enums$ = this.commonService.buscarEnumeradores();
    }

    onBuscar(filtro: any) {
        this.registros$ = this.requisicaoService.buscarTodosFiltrado(filtro);
    }

    onVisualizar(registro: Requisicao) {
        this.router.navigate([`requisicoes/visualizar/${registro.id}`]);
    }

    onEditar(registro: Requisicao) {
        this.router.navigate([`requisicoes/editar/${registro.id}`]);
    }

    onExcluir(registro: Requisicao) {
        this.confirmationService.confirm({
            message: `Você têm certeza que deseja excluir a requisição ${registro} ?`,
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            accept: () => {},
        });
        this.messageService.messageObserver.subscribe();
    }
}
