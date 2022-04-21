import { OperadorService } from '../../../../operador/operador.service';
import { DepartamentoService } from "src/modules/departamento/departamento.service";
import { Component, ViewChild, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import DepartamentoModel from "src/model/departamento";

import { RequisicaoStepMergeService } from "../../../services/requisicao-step-merge.service";

@Component({
    selector: "requisicao-step-informacoes",
    templateUrl: "./requisicao-step-informacoes.component.html",
    styleUrls: ["./requisicao-step-informacoes.component.scss"],
})
export class RequisicaoStepInformacoesComponent implements OnInit {
    @ViewChild("formulario") formulario: NgForm;
    departamentos$: Observable<DepartamentoModel[]>;
    almoxarifes$: Observable<DepartamentoModel[]>;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public stepMergeService: RequisicaoStepMergeService,
        private departamentoService: DepartamentoService,
        private operadorService: OperadorService
    ) {}

    ngOnInit(): void {
        this.departamentos$ =
            this.departamentoService.buscarAssociadosOperadorLogado();
        //this.almoxarifes$ = this.operadorService.buscarAlmoxarifes();
    }

    onSubmit() {
        if (this.formulario.valid) {
            //this.stepMergeService.state.departamento = this.dados.departamento;
            this.proximo();
        }
    }

    proximo() {
        this.router.navigate(["../itens"], { relativeTo: this.activatedRoute });
    }
}
