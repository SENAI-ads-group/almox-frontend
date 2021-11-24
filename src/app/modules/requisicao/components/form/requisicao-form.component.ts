import { RequisicaoStepMergeService } from '../../services/requisicao-step-merge.service';
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Requisicao } from "src/app/model/requisicao";

import { Departamento } from "../../../../model/departamento";
import { Usuario } from "../../../../model/usuario";
import { rotaEstaEmModoVisualizacao } from "../../../../utils/RouterUtil";
import { HandleErrorService } from "../../../shared/services/handle-error.service";
import { UsuarioService } from "../../../usuario/services/usuario.service";
import { RequisicaoService } from "../../services/requisicao.service";
import { PaginaFormularioCrud } from "../../../shared/PaginaFormularioCrud";

@Component({
    selector: "departamento-form",
    templateUrl: "./requisicao-form.component.html",
})
export class RequisicaoFormComponent
    implements OnInit, PaginaFormularioCrud<Requisicao>
{
    NOME_PAGINA = "Requisições";
    editandoRegistroExistente: boolean;
    registro: Requisicao = {};

    constructor(
        private requisicaoService: RequisicaoService,
        private handleErrorService: HandleErrorService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private stepMergeService: RequisicaoStepMergeService
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const id: number = params["id"];
            if (id) {
                this.editandoRegistroExistente = true;
                this.requisicaoService
                    .buscarPorId(id)
                    .subscribe(registroEncontrado => {
                        this.registro = registroEncontrado;
                    });
            }
        });
    }

    onSubmit(formulario: NgForm): void {
        this.registro = this.stepMergeService.state;
        console.log(this.registro)

        const httpSubscriber = this.editandoRegistroExistente
            ? this.requisicaoService.atualizar(this.registro.id, this.registro)
            : this.requisicaoService.criar(this.registro);
        httpSubscriber.subscribe(
            () => this.router.navigate(["/requisicoes/"])
        );
    }

    onLimpar(): void {
    }
}
