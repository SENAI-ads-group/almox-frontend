import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import FornecedorModel from "src/model/fornecedor";
import {
    criarConfiguracaoColuna,
    TipoColuna,
} from "src/modules/shared/components/tabela-crud/coluna";

import { FornecedorService } from "../fornecedor.service";

@Component({
    selector: "fornecedor-busca",
    templateUrl: "./fornecedor-busca.component.html",
})
export class FornecedorBuscaComponent implements OnInit {
    colunas = [];
    fornecedores$: Observable<FornecedorModel[]>;

    filtro = {
        cnpj: "",
        razaoSocial: "",
        email: "",
    };

    constructor(
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private fornecedorService: FornecedorService
    ) { }

    ngOnInit(): void {
        this.colunas = [
            criarConfiguracaoColuna("pessoa.cnpj", "CNPJ", TipoColuna.TEXTO),
            criarConfiguracaoColuna(
                "pessoa.nome",
                "Nome",
                TipoColuna.TEXTO
            ),
            criarConfiguracaoColuna(
                "pessoa.email",
                "Email",
                TipoColuna.TEXTO
            ),
            criarConfiguracaoColuna(
                "pessoa.razaoSocial",
                "Razão Social",
                TipoColuna.TEXTO
            ),
        ];

        this.onBuscar({});
    }

    onVisualizar(fornecedor: FornecedorModel) {
        this.router.navigate([`fornecedores/visualizar/${fornecedor.id}`]);
    }

    onEditar(fornecedor: FornecedorModel) {
        this.router.navigate([`fornecedores/editar/${fornecedor.id}`]);
    }

    onExcluir(fornecedor: FornecedorModel) {
        this.confirmationService.confirm({
            message: `Você têm certeza que deseja excluir o fornecedor ${fornecedor.pessoa.razaoSocial} ?`,
            header: "Confirmação",
            icon: "pi pi-exclamation-triangle",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            accept: () => {
                this.fornecedorService.excluir(fornecedor.id).subscribe(() => {
                    this.messageService.add({
                        severity: "success",
                        summary: "Sucesso",
                        detail: "Fornecedor Excluído",
                        life: 3000,
                    });
                    this.onBuscar(this.filtro);
                });
            },
        });
        this.messageService.messageObserver.subscribe();
    }

    onBuscar(filtro: any) {
        this.fornecedores$ = this.fornecedorService.buscarFornecedores({ ...filtro });
    }

    onLimpar() {
        this.filtro = {
            cnpj: "",
            razaoSocial: "",
            email: "",
        };
    }

    onExibirAcaoEditar(fornecedor: FornecedorModel) {
        return true;
    }
    onExibirAcaoExcluir(fornecedor: FornecedorModel) {
        return true;
    }
}
