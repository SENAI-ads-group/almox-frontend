import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Fornecedor } from 'src/app/model/fornecedor';
import { criarConfiguracaoColuna, TipoColuna } from 'src/app/modules/shared/components/tabela-crud/coluna';
import { HandleErrorService } from 'src/app/modules/shared/services/handle-error.service';
import { FornecedorService } from '../../../services/fornecedor.service';
import { FornecedorFiltroComponent } from '../../fornecedor-filtro/fornecedor-filtro/fornecedor-filtro.component';
@Component({
  selector: 'fornecedor-lista',
  templateUrl: './fornecedor-lista.component.html',

})
export class FornecedorListaComponent implements OnInit {

    colunas = [];
    fornecedores: Fornecedor[];
    selecionados: Fornecedor[];
    @ViewChild("filtroComponent") filtroComponent: FornecedorFiltroComponent;


  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fornecedorService: FornecedorService,
    private handleErrorService: HandleErrorService

  ) { }

  ngOnInit(): void {  this.colunas = [
    criarConfiguracaoColuna("id", "#", TipoColuna.TEXTO),
    criarConfiguracaoColuna("cnpj", "Cnpj", TipoColuna.TEXTO),
    criarConfiguracaoColuna(
        "razaoSocial",
        "Razão Social",
        TipoColuna.TEXTO
    ),
    criarConfiguracaoColuna(
        "nomeFantasia",
        "Nome Fantasia",
        TipoColuna.TEXTO
    ),
];
}
handleVisualizar(fornecedor: Fornecedor) {
this.router.navigate([`fornecedores/visualizar/${fornecedor.id}`]);
}
handleEditar(fornecedor: Fornecedor) {
this.router.navigate([`fornecedores/editar/${fornecedor.id}`]);
}
handleExcluir(fornecedor: Fornecedor) {
this.confirmationService.confirm({
    message: `Você têm certeza que deseja excluir o fornecedor ${fornecedor.razaoSocial} ?`,
    header: "Confirmação",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "Sim",
    rejectLabel: "Não",
    accept: () => {
        this.fornecedorService.excluir(fornecedor.id).subscribe(
            success => {
                this.messageService.add({
                    severity: "success",
                    summary: "Sucesso",
                    detail: "Fornecedor Excluído",
                    life: 3000,
                });
                this.handleBuscar(this.filtroComponent.filtro);
            },
            error => this.handleErrorService.handleError(error)
        );
    },
});
this.messageService.messageObserver.subscribe();
}

handleBuscar(filtro: any) {
this.fornecedorService
    .buscarTodosFiltrado(filtro)
    .subscribe(
        fornecedoresEncontrados =>
            (this.fornecedores = fornecedoresEncontrados)
    );
}

handleExibirAcaoEditar(fornecedor: Fornecedor) {
return true;
}
handleExibirAcaoExcluir(fornecedor: Fornecedor) {
return true;
}
}
