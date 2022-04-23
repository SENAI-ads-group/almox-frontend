import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import OperadorModel from 'src/model/operador';

import ProdutoModel from '../../../model/produto';
import { Mensagens } from '../../../utils/Mensagens';
import { criarConfiguracaoColuna, TipoColuna } from '../../shared/components/tabela-crud/coluna';
import { ModalSolicitacoesComponent } from '../modal-solicitacoes/modal-solicitacoes.component';
import { OperadorService } from '../operador.service';

@Component({
    selector: "operador-busca",
    templateUrl: "./operador-busca.component.html",
})
export class OperadorBuscaComponent implements OnInit {
    TITULO_PAGINA = "Operadores";

    operadores$: Observable<ProdutoModel[]>;

    colunas: any[];
    dynamicDialog: DynamicDialogRef;
    mostrarDialogAprovacaoCadastro: boolean;

    filtro = { cpf: null, nome: null, email: null };

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private dialogService: DialogService,
        private operadorService: OperadorService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.colunas = [
            criarConfiguracaoColuna("pessoa.nome", "Nome", TipoColuna.TEXTO),
            criarConfiguracaoColuna("pessoa.cpf", "CPF", TipoColuna.TEXTO),
            criarConfiguracaoColuna("pessoa.email", "Email", TipoColuna.TEXTO)
        ];

        this.onBuscar({});
    }

    onBuscar(filtro: any): void {
        this.operadores$ = this.operadorService.buscarOperadores({ ...filtro });
    }

    onEditar = (operador: OperadorModel) => this.router.navigate([`/operadores/editar/${operador.id}`])

    visualizarSolicitacoesCadastro() {
        this.dialogService.open(ModalSolicitacoesComponent, {
            header: "Solicitações de Cadastro",
            width: "40%"
        })
            .onClose.subscribe(() => this.onBuscar({}));
    }

    onExcluir(operador: OperadorModel) {
        this.confirmationService.confirm({
            message: `Você têm certeza que deseja excluir o produto ${operador.pessoa.nome} ?`,
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            accept: () => {
                this.operadorService.excluir(operador.id).subscribe({
                    next: () => {
                        this.messageService.add(Mensagens.SUCESSO_REGISTRO_EXCLUIDO);
                        this.onBuscar({});
                    }
                });
            }
        });
    }

    exibirAcaoEditar = (operador: OperadorModel) => false;

    exibirAcaoExcluir = (operador: OperadorModel) => false;

    onLimpar = () => {
        this.filtro = { cpf: null, nome: null, email: null };
        this.onBuscar({});
    }
}
