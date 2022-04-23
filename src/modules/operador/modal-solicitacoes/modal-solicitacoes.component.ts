import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { criarConfiguracaoColuna, TipoColuna } from 'src/modules/shared/components/tabela-crud/coluna';
import { Mensagens } from 'src/utils/Mensagens';

import OperadorModel, { AprovarSolicitacaoCadastro, SolicitacaoCadastro } from '../../../model/operador';
import { OperadorService } from './../operador.service';

@Component({
    selector: "modal-solicitacoes",
    templateUrl: "./modal-solicitacoes.component.html"
})
export class ModalSolicitacoesComponent implements OnInit {
    colunas: any[];
    registros$: Observable<SolicitacaoCadastro[]>;
    operadorEmAprovacao: OperadorModel;
    loading: boolean = false;

    constructor(
        public dynamicDialogRef: DynamicDialogRef,
        public configDialog: DynamicDialogConfig,
        private operadorService: OperadorService,
        private messageService: MessageService
    ) { }

    ngOnInit(): void {
        this.colunas = [
            criarConfiguracaoColuna(
                "nome",
                "Nome",
                TipoColuna.TEXTO,
                "left"
            ),
            criarConfiguracaoColuna(
                "cpf",
                "CPF",
                TipoColuna.TEXTO,
                "left"
            ),
            criarConfiguracaoColuna(
                "email",
                "Email",
                TipoColuna.TEXTO,
                "left"
            ),
            criarConfiguracaoColuna(
                "dataCriacao",
                "Data Criação",
                TipoColuna.DATA_HORA,
                "left"
            ),
        ];
        this.registros$ = this.operadorService.buscarSolicitacoesCadastro();
    }

    onAprovar(solicitacao: SolicitacaoCadastro) {
        this.operadorEmAprovacao = {
            funcoes: [],
            pessoa: {
                cpf: solicitacao.cpf,
                nome: solicitacao.nome,
                email: solicitacao.email,
            }
        }
    }

    onExcluir(solicitacao: SolicitacaoCadastro) {
        this.operadorService.excluirSolicitacaoCadastro(solicitacao.cpf).subscribe({
            next: () => {
                this.registros$ = this.operadorService.buscarSolicitacoesCadastro();
                this.messageService.add(Mensagens.SUCESSO_REGISTRO_EXCLUIDO);
            }
        })
    }

    onSubmit() {
        const { cpf, email, telefone, logradouro, complemento, numero, cep, cidade, uf, bairro } = this.operadorEmAprovacao.pessoa;
        const aprovarSolicitacaoCadastro: AprovarSolicitacaoCadastro = {
            funcoes: this.operadorEmAprovacao.funcoes, email, telefone, logradouro, complemento, numero, cep, cidade, uf, bairro
        }
        this.operadorService.aprovarSolicitacaoCadastro(cpf, aprovarSolicitacaoCadastro).subscribe({
            next: () => {
                this.messageService.add(Mensagens.SUCESSO_REGISTRO_CRIADO);
                this.dynamicDialogRef.close();
            }
        });
    }

    onLimpar() {

    }

}
