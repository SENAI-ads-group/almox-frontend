import { NgForm } from '@angular/forms';
import { Mensagens } from './../../../utils/Mensagens';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription, Observable, filter, map } from 'rxjs';

import DepartamentoModel, { CriarDepartamento } from '../../../model/departamento';
import OperadorModel from '../../../model/operador';
import { OperadorService } from '../../operador/operador.service';
import { HandleErrorService } from '../../shared/services/handle-error.service';
import { DepartamentoService } from '../departamento.service';

@Component({
    selector: "departamento-formulario",
    templateUrl: "./departamento-formulario.component.html",
})
export class DepartamentoFormularioComponent implements OnInit, OnDestroy {
    isEditando: boolean;
    isLoading: boolean = false;
    departamentoFormulario: DepartamentoModel = { operadores: [] };
    operadores$: Observable<OperadorModel[]>;

    activatedRouteSubscription: Subscription;
    @ViewChild("formulario") formulario: NgForm;

    constructor(
        private departamentoService: DepartamentoService,
        private operadorService: OperadorService,
        private handleErrorService: HandleErrorService,
        private messageService: MessageService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRouteSubscription = this.activatedRoute.params.subscribe(params => {
            const id: string = params["id"];
            if (id) {
                this.isEditando = true;
                this.departamentoService.buscarPorId(id)
                    .subscribe({
                        next: res => {
                            this.departamentoFormulario = res;
                            this.operadores$ = this.operadorService.buscarOperadores()
                                .pipe(
                                    map(opeList => opeList.filter(ope => !res.operadores.some(o => o.id === ope.id)))
                                );
                        },
                        error: () => this.router.navigate(['/departamentos']),
                        complete: () => this.isLoading = false
                    });
            } else {
                this.operadores$ = this.operadorService.buscarOperadores();
            }
        });
    }

    ngOnDestroy(): void {
        this.activatedRouteSubscription.unsubscribe();
    }

    onSubmit(): void {
        if (this.isEditando) {
            this.departamentoService.atualizar(this.departamentoFormulario.id, this.departamentoFormulario).subscribe({
                next: () => {
                    this.messageService.add(Mensagens.SUCESSO_REGISTRO_SALVO);
                    this.router.navigate(["/departamentos/"]);
                },
                error: e => this.handleErrorService.handleError(e)
            });
        }
        else {
            const criarDepartamento: CriarDepartamento = {
                descricao: this.departamentoFormulario.descricao,
                idOperadores: this.departamentoFormulario.operadores.map(ope => ope.id)
            };
            this.departamentoService.criar(criarDepartamento).subscribe({
                next: () => {
                    this.messageService.add(Mensagens.SUCESSO_REGISTRO_CRIADO);
                    this.router.navigate(["/departamentos/"])
                },
                error: e => this.handleErrorService.handleError(e)
            });
        }
    }

    onLimpar(): void {
        this.departamentoFormulario = {};
    }

}
