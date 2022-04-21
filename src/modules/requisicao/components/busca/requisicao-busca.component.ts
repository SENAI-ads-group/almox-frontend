import { RequisicaoFormComponent } from "./../form/requisicao-form.component";
import { OperadorService } from "../../../operador/operador.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { Requisicao } from "src/model/requisicao";
import OperadorModel from "src/model/operador";
import {
    criarConfiguracaoColuna,
    TipoColuna,
} from "src/modules/shared/components/tabela-crud/coluna";
import { CommonService } from "src/modules/shared/services/common.service";
import { HandleErrorService } from "src/modules/shared/services/handle-error.service";

import { PaginaBuscaCrud } from "../../../shared/PaginaBuscaCrud";
import { RequisicaoService } from "../../services/requisicao.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
    selector: "requisicao-busca",
    templateUrl: "./requisicao-busca.component.html",
    styleUrls: ["./requisicao-busca.component.scss"],
})
export class RequisicaoBuscaComponent extends PaginaBuscaCrud<Requisicao> {
    NOME_PAGINA = "Requisições";
    enums: any;
    almoxarifes$: Observable<OperadorModel[]>;
    requisitantes$: Observable<OperadorModel[]>;
    colunas: any[];
    dialogRef: DynamicDialogRef;

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private commonService: CommonService,
        private requisicaoService: RequisicaoService,
        private operadorService: OperadorService,
        private router: Router,
        private dialogService: DialogService
    ) {
        super();
    }

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
                "departamento.descricao",
                "Departamento",
                TipoColuna.TEXTO
            ),
        ];

        this.commonService
            .buscarEnumeradores()
            .subscribe(resp => (this.enums = resp));
        this.almoxarifes$ = this.operadorService.buscarTodos();
        this.requisitantes$ = this.operadorService.buscarTodos();

        this.onBuscar({});
    }

    onBuscar(filtro: any) {
        filtro.status = filtro.status
            ? filtro.status
            : { type: 'AGUARDANDO_ATENDIMENTO' };

        this.carregando = true;
        this.registrosSubscription = this.requisicaoService.buscarTodosFiltrado(filtro).subscribe({
            next: (data) => this.registros = data,
            complete: () => this.carregando = false
        });
    }

    onChangeStatus({ index }) {
        this.onBuscar({ status: this.enums.statusRequisicao[index] });
    }

    onNovaRequisicao() {
        this.dialogRef = this.dialogService.open(RequisicaoFormComponent, {
            width: "70%",
            header: "Nova Requisição",
        });

        this.dialogRef.onClose.subscribe(() => { });
    }

    onEditar(registro: Requisicao) {
        this.router.navigate([`requisicoes/informacoes/${registro.id}`]);
    }

    onDetalhes(registro: Requisicao) {
        this.router.navigate([`requisicoes/informacoes/${registro.id}`]);
    }

    onExcluir(registro: Requisicao) {
        this.confirmationService.confirm({
            message: `Você têm certeza que deseja excluir a requisição ${registro.id} ?`,
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            accept: () => { },
        });
        this.messageService.messageObserver.subscribe();
    }
}
