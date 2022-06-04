import { CriarGrupo } from './../../../model/grupo';
import { Mensagens } from '../../../utils/Mensagens';
import ProdutoModel from "../../../model/produto";
import { NgForm } from "@angular/forms";
import GrupoModel from "../../../model/grupo";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { GrupoService } from "../grupo.service";
import { CommonService } from "../../shared/services/common.service";
import { HandleErrorService } from "../../shared/services/handle-error.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Message, MessageService } from "primeng/api";
import { rotaEstaEmModoVisualizacao } from "src/utils/RouterUtil";
import { Subscription } from 'rxjs';

@Component({
    selector: "grupo-formulario",
    templateUrl: "./grupo-formulario.component.html",
})
export class GrupoFormularioComponent implements OnInit, OnDestroy {
    grupo: GrupoModel = {};
    descricao: String;
    produtos: ProdutoModel[];
    isEditando: boolean = false;
    isLoading: boolean = false;

    activatedRouteSubscription: Subscription;

    constructor(
        private grupoService: GrupoService,
        private handleErrorService: HandleErrorService,
        private messageService: MessageService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params => {
            const id: string = params["id"];
            if (id) {
                this.isEditando = true;
                this.isLoading = true;
                this.grupoService.buscarPorId(id)
                    .subscribe({
                        next: grupo => (this.grupo = grupo),
                        complete: () => this.isLoading = false
                    });
            }
        });
    }

    ngOnDestroy(): void {
        this.activatedRouteSubscription.unsubscribe();
    }


    onSubmit(formulario: NgForm): void {
        if (!formulario.valid) return;

        if (this.isEditando) {
            this.grupoService.atualizar(this.grupo.id, this.grupo).subscribe({
                next: () => {
                    this.messageService.add(Mensagens.SUCESSO_REGISTRO_SALVO);
                    this.router.navigate(["/grupos/"]);
                },
                error: e => this.handleErrorService.handleError(e)
            });
        }
        else {
            const criarGrupo: CriarGrupo = {
                descricao: this.grupo.descricao
            };
            this.grupoService.criar(criarGrupo).subscribe({
                next: () => {
                    this.messageService.add(Mensagens.SUCESSO_REGISTRO_CRIADO);
                    this.router.navigate(["/grupos/"])
                },
                error: e => this.handleErrorService.handleError(e)
            });
        }
    }

    onLimpar(): void {
        this.grupo = {};
    }
}
