import UnidadeMedida from 'src/model/enums/unidade-medida';
import { FornecedorService } from './../../fornecedor/fornecedor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import DepartamentoModel from 'src/model/departamento';
import { FiltroStatusAuditoria } from 'src/model/enums';
import FornecedorModel from 'src/model/fornecedor';
import GrupoModel from 'src/model/grupo';
import { DepartamentoService } from 'src/modules/departamento/departamento.service';

import ProdutoModel from '../../../model/produto';
import { Mensagens } from '../../../utils/Mensagens';
import { GrupoService } from '../../grupo/grupo.service';
import {
    criarConfiguracaoColuna,
    criarConfiguracaoColunaStatusAuditavel,
    TipoColuna,
} from '../../shared/components/tabela-crud/coluna';
import { ModalHistoricoComponent } from '../modal-historico/modal-historico-produto.component';
import { ProdutoService } from '../produto.service';

@Component({
    selector: "produto-lista",
    templateUrl: "./produto-busca.component.html",
})
export class ProdutoBuscaComponent implements OnInit {
    TITULO_PAGINA = "Produtos";

    produtos$: Observable<ProdutoModel[]>;
    enums$: Observable<any>;
    grupos$: Observable<GrupoModel[]>;
    departamentos$: Observable<DepartamentoModel[]>;
    fornecedores$: Observable<FornecedorModel[]>;

    unidadesMedida = Object.values(UnidadeMedida);

    colunas: any[];
    dynamicDialog: DynamicDialogRef;
    mostrarDialogHistorico: boolean;

    filtro = {
        descricao: null,
        codigoBarras: null,
        grupos: null,
        fornecedor: null,
        departamentos: null,
        unidadeMedida: null,
    };

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private dialogService: DialogService,
        private produtoService: ProdutoService,
        private grupoService: GrupoService,
        private departamentoService: DepartamentoService,
        private fornecedorService: FornecedorService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.colunas = [
            criarConfiguracaoColuna("descricao", "Descrição", TipoColuna.TEXTO),
            criarConfiguracaoColuna(
                "grupo.descricao",
                "Grupo",
                TipoColuna.TEXTO
            ),
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
        this.grupos$ = this.grupoService.buscarGrupos();
        this.departamentos$ = this.departamentoService.buscarDepartamentos();
        this.fornecedores$ = this.fornecedorService.buscarFornecedores();

        this.onBuscar({});
    }

    onBuscar(filtro: any): void {
        this.produtos$ = this.produtoService.buscarProdutos({ ...filtro });
    }

    onEditar = (produto: ProdutoModel) => this.router.navigate([`/produtos/editar/${produto.id}`])

    onDetalhes(produto: ProdutoModel) {
        this.dialogService.open(ModalHistoricoComponent, {
            header: "Histórico de Estoque",
            width: "70%",
            data: produto,
        });
    }

    onExcluir(produto: ProdutoModel) {
        this.confirmationService.confirm({
            message: `Você têm certeza que deseja excluir o produto ${produto.descricao} ?`,
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            accept: () => {
                this.produtoService.excluir(produto.id).subscribe(() => {
                    this.messageService.add(Mensagens.SUCESSO_REGISTRO_EXCLUIDO);
                    this.ngOnInit();
                });
            }
        });
    }

    exibirAcaoEditar = (produto: ProdutoModel) => !produto.excluido;

    exibirAcaoExcluir = (produto: ProdutoModel) => !produto.excluido;

    onLimpar = () => this.filtro = { descricao: null, codigoBarras: null, grupos: null, fornecedor: null, departamentos: null, unidadeMedida: null }
}
