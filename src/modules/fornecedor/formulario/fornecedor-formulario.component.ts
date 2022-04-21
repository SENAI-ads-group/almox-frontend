import { CriarFornecedor } from './../../../model/fornecedor';
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import FornecedorModel from "src/model/fornecedor";
import { CommonService } from "src/modules/shared/services/common.service";
import { HandleErrorService } from "src/modules/shared/services/handle-error.service";
import { Mensagens } from "src/utils/Mensagens";
import { rotaEstaEmModoVisualizacao } from "src/utils/RouterUtil";

import { FornecedorService } from "../fornecedor.service";

@Component({
    selector: "fornecedor-formulario",
    templateUrl: "./fornecedor-formulario.component.html",
})
export class FornecedorFormularioComponent implements OnInit {
    fornecedorFormulario: FornecedorModel = {};

    tiposEndereco: any[];
    tiposTelefone: any[];

    isEditando: boolean;
    modoVisualizacao: boolean;
    @ViewChild("formulario") formulario: NgForm;

    constructor(
        private fornecedorService: FornecedorService,
        private handleErrorService: HandleErrorService,
        private messageService: MessageService,
        private commonService: CommonService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const id: string = params["id"];
            if (id) {
                this.isEditando = true;
                this.fornecedorService.buscarPorId(id).subscribe({
                    next: data => this.fornecedorFormulario = data
                });
            }
        });

        this.commonService.buscarEnumeradores().subscribe({
            next: enumaradores => {
                this.tiposEndereco = enumaradores.tiposEndereco;
                this.tiposTelefone = enumaradores.tiposTelefone;
            }
        });
    }

    onSubmit(formulario: NgForm): void {
        if (!formulario.valid) return;

        if (this.isEditando) {
            this.fornecedorService.atualizar(this.fornecedorFormulario.id, this.fornecedorFormulario).subscribe({
                next: () => {
                    this.messageService.add(Mensagens.SUCESSO_REGISTRO_SALVO);
                    this.router.navigate(["/departamentos/"]);
                },
                error: e => this.handleErrorService.handleError(e)
            });
        }
        else {
            const criarFornecedor: CriarFornecedor = {
                pessoa: {}
            };
            this.fornecedorService.criar(criarFornecedor).subscribe({
                next: () => {
                    this.messageService.add(Mensagens.SUCESSO_REGISTRO_CRIADO);
                    this.router.navigate(["/fornecedores/"])
                },
                error: this.handleErrorService.handleError
            });
        }
    }

    limpar(): void {
        this.fornecedorFormulario = {};
    }

}
