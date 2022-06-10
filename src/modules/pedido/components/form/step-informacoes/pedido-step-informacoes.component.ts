import { FornecedorService } from "../../../../fornecedor/fornecedor.service";
import FornecedorModel from "src/model/fornecedor";
import { OperadorService } from "../../../../operador/operador.service";
import { DepartamentoService } from "src/modules/departamento/departamento.service";
import { Component, ViewChild, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import DepartamentoModel from "src/model/departamento";

import { PedidoStepMergeService } from "../../../services/pedido-step-merge.service";

@Component({
    selector: "pedido-step-informacoes",
    templateUrl: "./pedido-step-informacoes.component.html",
    styleUrls: ["./pedido-step-informacoes.component.scss"],
})
export class PedidoStepInformacoesComponent implements OnInit {
    @ViewChild("formulario") formulario: NgForm;
    fornecedores$: Observable<FornecedorModel[]>;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public stepMergeService: PedidoStepMergeService,
        private departamentoService: DepartamentoService,
        private fornecedorService: FornecedorService
    ) { }

    ngOnInit(): void {
        this.fornecedores$ = this.fornecedorService.buscarFornecedores();
    }

    onSubmit() {
        if (this.formulario.valid) {
            //this.stepMergeService.state.departamento = this.dados.departamento;
        }
    }

}
