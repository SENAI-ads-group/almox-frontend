import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscriber } from 'rxjs';
import { FiltroStatusAuditoria } from 'src/model/enums';
import { Mensagens } from 'src/utils/Mensagens';

import DepartamentoModel from '../../../model/departamento';
import {
    criarConfiguracaoColuna,
    criarConfiguracaoColunaStatusAuditavel,
    TipoColuna,
} from '../../shared/components/tabela-crud/coluna';
import { CommonService } from '../../shared/services/common.service';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { DepartamentoService } from '../departamento.service';

@Component({
    selector: "departamento-lista",
    templateUrl: "./departamento-busca.component.html",
})
export class DepartamentoBuscaComponent implements OnInit {
    departamentos$: Observable<DepartamentoModel[]>;
    selecionados: DepartamentoModel[];
    enums$: Observable<any>;
    enumsSubscribe: Subscriber<any>;
    colunas: any[];
    filtro = { descricao: null, statusAuditoria: FiltroStatusAuditoria.APENAS_ATIVOS };

    constructor(
        private departamentoService: DepartamentoService,
        private messageService: MessageService,
        private handleErrorService: HandleErrorService,
        private confirmationService: ConfirmationService,
        private commonService: CommonService,
        private router: Router
    ) { }

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

    onLimparFiltro() {
        this.filtro = {
            descricao: null,
            statusAuditoria: FiltroStatusAuditoria.APENAS_ATIVOS,
        };
        this.onBuscar(this.filtro);
    }

    onBuscar(filtro: any): void {
        this.departamentos$ = this.departamentoService.buscarDepartamentos({ ...filtro, statusAuditoria: filtro?.statusAuditoria?.type ?? null })
    }

    onEditar = (departamento: DepartamentoModel) =>
        this.router.navigate([`departamentos/editar/${departamento.id}`]);

    onExcluir(departamento: DepartamentoModel) {
        this.confirmationService.confirm({
            message: `Você têm certeza que deseja excluir o departamento ${departamento.descricao}?`,
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            accept: () => {
                this.departamentoService.excluir(departamento.id)
                    .subscribe({
                        next: () => this.messageService.add(Mensagens.SUCESSO_REGISTRO_EXCLUIDO),
                        error: () => this.messageService.add(Mensagens.ERRO_EXCLUIR_REGISTRO),
                        complete: () => this.onBuscar(this.filtro)
                    })
            },
        });
        this.messageService.messageObserver.subscribe();
    }

    exibirAcaoEditar = (departamento: DepartamentoModel) => !departamento.auditoria.excluido;

    exibirAcaoExcluir = (departamento: DepartamentoModel) => !departamento.auditoria.excluido;
}
