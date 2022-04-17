import { Mensagens } from 'src/utils/Mensagens';
import { PaginaFormularioCrud } from "./../../shared/PaginaFormularioCrud";
import { Router } from "@angular/router";
import { CommonService } from "../../shared/services/common.service";
import { HandleErrorService } from "../../shared/services/handle-error.service";
import { MessageService, ConfirmationService } from "primeng/api";
import { GrupoService } from "../grupo.service";
import { Observable, Subscriber } from "rxjs";
import GrupoModel from "../../../model/grupo";
import { Component, OnInit, ViewChild } from "@angular/core";
import {
    criarConfiguracaoColuna,
    criarConfiguracaoColunaStatusAuditavel,
    TipoColuna,
} from "../../shared/components/tabela-crud/coluna";
import { PaginaBuscaCrud } from "../../shared/PaginaBuscaCrud";
import { FiltroStatusAuditoria } from "src/model/enums";

@Component({
    selector: "grupo-lista",
    templateUrl: "./grupo-busca.component.html",
})
export class GrupoBuscaComponent extends PaginaBuscaCrud<GrupoModel> {
    TITULO_PAGINA = "Grupos de Produto";

    enums$: Observable<any>;
    colunas: any[];
    filtro = {
        descricao: null,
        statusAuditoria: FiltroStatusAuditoria.APENAS_ATIVOS,
    };

    constructor(
        private grupoService: GrupoService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private handleErrorService: HandleErrorService,
        private commonService: CommonService,
        private router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.colunas = [
            criarConfiguracaoColuna("descricao", "Descrição", TipoColuna.TEXTO),
            criarConfiguracaoColuna(
                "auditoria.dataCriacao",
                "Criação",
                TipoColuna.DATA_HORA
            ),
            criarConfiguracaoColuna(
                "auditoria.dataAlteracao",
                "Última Alteração",
                TipoColuna.DATA_HORA
            ),
            criarConfiguracaoColunaStatusAuditavel("Status"),
        ];
        this.onBuscar({});
    }

    onBuscar(filtro: any): void {
        filtro = { ...filtro, statusAuditoria: filtro?.statusAuditoria?.type ?? null };
        this.loading = true;
        this.grupoService.buscarGrupos(filtro).subscribe({
            next: dados => this.registros = dados,
            complete: () => this.loading = false
        });
    }


    limparFiltros(): void {
        this.filtro = {
            descricao: null,
            statusAuditoria: FiltroStatusAuditoria.APENAS_ATIVOS,
        };
        this.onBuscar(this.filtro);
    }

    onEditar = (grupo: GrupoModel) =>
        this.router.navigate([`grupos/editar/${grupo.id}`]);

    onExcluir(grupo: GrupoModel) {
        this.confirmationService.confirm({
            message: `Você têm certeza que deseja excluir o grupo ${grupo.descricao} ?`,
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            accept: () => {
                this.grupoService.excluir(grupo.id).subscribe({
                    next: () => {
                        this.messageService.add(Mensagens.SUCESSO_REGISTRO_EXCLUIDO)
                        this.onBuscar(this.filtro);
                    },
                    error: this.handleErrorService.handleError
                });
            },
        });
        this.messageService.messageObserver.subscribe();
    }

    exibirAcaoEditar = (grupo: GrupoModel) => !grupo.auditoria.excluido;

    exibirAcaoExcluir = (grupo: GrupoModel) => !grupo.auditoria.excluido;
}
