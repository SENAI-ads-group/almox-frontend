import { FornecedorService } from "../../../fornecedor/fornecedor.service";
import { PedidoFormComponent } from "../form/pedido-form.component";
import { OperadorService } from "../../../operador/operador.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { Pedido } from "src/model/pedido";
import OperadorModel from "../../../../model/operador";
import {
    criarConfiguracaoColuna,
    TipoColuna,
} from "src/modules/shared/components/tabela-crud/coluna";
import { CommonService } from "src/modules/shared/services/common.service";
import { HandleErrorService } from "src/modules/shared/services/handle-error.service";

import { PaginaBuscaCrud } from "../../../shared/PaginaBuscaCrud";
import { PedidoService } from "../../services/pedido.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import FornecedorModel from "src/model/fornecedor";

@Component({
    selector: "pedido-busca",
    templateUrl: "./pedido-busca.component.html",
    styleUrls: ["./pedido-busca.component.scss"],
})
export class PedidoBuscaComponent extends PaginaBuscaCrud<Pedido> {
    NOME_PAGINA = "Pedidos de Compra";
    enums: any;
    compradores$: Observable<OperadorModel[]>;
    fornecedores$: Observable<FornecedorModel[]>;
    colunas: any[];
    dialogRef: DynamicDialogRef;

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private commonService: CommonService,
        private pedidoService: PedidoService,
        private operadorService: OperadorService,
        private fornecedorService: FornecedorService,
        private router: Router,
        private dialogService: DialogService
    ) {
        super();
    }

    ngOnInit(): void {
        this.colunas = [
            criarConfiguracaoColuna("id", "#", TipoColuna.TEXTO),
            criarConfiguracaoColuna("dataPedido", "Data Pedido", TipoColuna.DATA_HORA),
            //criarConfiguracaoColuna("dataPrevisaoEntrega", "Previsão de Entrega", TipoColuna.DATA_HORA),
            criarConfiguracaoColuna(
                "comprador.nome",
                "Comprador",
                TipoColuna.TEXTO
            ),
            criarConfiguracaoColuna(
                "fornecedor.nomeFantasia",
                "Fornecedor",
                TipoColuna.TEXTO
            ),
        ];

        this.commonService
            .buscarEnumeradores()
            .subscribe(resp => (this.enums = resp));
        this.compradores$ = this.operadorService.buscarOperadores();
        this.fornecedores$ = this.fornecedorService.buscarFornecedores();
        this.onBuscar({ status: { type: "PENDENTE_ENTREGA" } });
    }

    onBuscar(filtro: any) {
        filtro.status = filtro.status
            ? filtro.status
            : { type: 'PENDENTE_ENTREGA' };

        this.carregando = true;
        this.pedidoService.buscarTodosFiltrado(filtro).subscribe(
            (dados: Pedido[]) => {
                this.registros = dados;
                this.carregando = false;
            },
            () => (this.carregando = false)
        );
    }

    onChangeStatus({ index }) {
        this.onBuscar({ status: this.enums.statusPedido[index] });
    }

    onNovoPedido() {
        this.dialogRef = this.dialogService.open(PedidoFormComponent, {
            width: "70%",
            header: "Novo Pedido",
        });

        this.dialogRef.onClose.subscribe(() => { });
    }

    onEditar(registro: Pedido): void {
        throw new Error("Method not implemented.");
    }

    onDetalhes(registro: Pedido) {
        this.router.navigate([`pedidos/atendimento/${registro.id}`]);
    }

    onExcluir(registro: Pedido) {
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
