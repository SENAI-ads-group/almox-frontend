import { Router } from "@angular/router";
import { CommonService } from "../../shared/services/common.service";
import { HandleErrorService } from "../../shared/services/handle-error.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { GrupoService } from "../grupo.service";
import { GrupoFiltroBuscaComponent } from "../filtro-busca/grupo-filtro-busca.component";
import { Observable, Subscriber } from "rxjs";
import { Grupo } from "../../../model/grupo";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
    criarConfiguracaoColuna,
    criarConfiguracaoColunaStatusAuditavel,
    TipoColuna,
} from "../../shared/components/tabela-crud/coluna";

@Component({
    selector: "grupo-lista",
    templateUrl: "./grupo-busca.component.html",
})
export class GrupoBuscaComponent implements OnInit {
    TITULO_PAGINA = "Grupos de Produto";

    grupos: Grupo[];
    selecionados: Grupo[];
    enums$: Observable<any>;
    enumSubscribe: Subscriber<any>;
    colunas: any[];
    @ViewChild("filtroComponent") filtroComponent: GrupoFiltroBuscaComponent;

    constructor(
        private grupoService: GrupoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private handleErrorService: HandleErrorService,
        private commonService: CommonService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.colunas = [
            criarConfiguracaoColuna("id", "#", TipoColuna.TEXTO),
            criarConfiguracaoColuna("descricao", "Descrição", TipoColuna.TEXTO),
            criarConfiguracaoColuna(
                "dataCriacao",
                "Criação",
                TipoColuna.DATA_HORA
            ),
            criarConfiguracaoColuna(
                "dataAlteracao",
                "Última Alteração",
                TipoColuna.DATA_HORA
            ),
            criarConfiguracaoColunaStatusAuditavel("Status"),
        ];
    }

    buscar(filtro: any): void {
        this.grupoService
            .buscarTodosFiltrado(filtro)
            .subscribe(gruposEncontrados => (this.grupos = gruposEncontrados));
    }

    visualizar = (grupo: Grupo) =>
        this.router.navigate([`grupos/visualizar/${grupo.id}`]);

    editar = (grupo: Grupo) =>
        this.router.navigate([`grupos/editar/${grupo.id}`]);

    excluirSelecionados(): void {
        this.confirmationService.confirm({
            message: "Tem certeza que deseja excluir os grupos selecionados?",
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            rejectLabel: "Não",
            acceptLabel: "Sim",
            accept: () => {
                this.selecionados
                    .filter(grupo => !grupo.excluido)
                    .forEach(grupo => {
                        this.grupoService
                            .excluir(grupo.id)
                            .subscribe(sucess => {
                                this.messageService.add({
                                    severity: "sucess",
                                    summary: "Sucesso",
                                    detail: `Grupo ${grupo.descricao} excluido.`,
                                    life: 1500,
                                });
                                this.buscar(this.filtroComponent.filtro);
                            });
                    });
            },
        });
    }

    excluir(grupo: Grupo) {
        this.confirmationService.confirm({
            message: `Você têm certeza que deseja excluir o grupo ${grupo.descricao} ?`,
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            accept: () => {
                this.grupoService.excluir(grupo.id).subscribe(
                    sucess => {
                        this.messageService.add({
                            severity: "sucess",
                            summary: "Sucesso",
                            detail: "Grupo Excluído",
                            life: 3000,
                        });
                        this.buscar(this.filtroComponent.filtro);
                    },
                    error => this.handleErrorService.handleError(error)
                );
            },
        });
        this.messageService.messageObserver.subscribe();
    }

    exibirAcaoEditar = (grupo: Grupo) => !grupo.excluido;

    exibirAcaoExcluir = (grupo: Grupo) => !grupo.excluido;
}
