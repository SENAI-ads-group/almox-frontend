import { HandleErrorService } from './../../shared/services/handle-error.service';
import { MessageService } from "primeng/api";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import FornecedorModel from "src/model/fornecedor";
import { Mensagens } from "src/utils/Mensagens";

import { CommonService } from "../../shared/services/common.service";
import DepartamentoModel from "../../../model/departamento";
import GrupoModel from "../../../model/grupo";
import ProdutoModel, { CriarProduto } from "../../../model/produto";
import { DepartamentoService } from "../../departamento/departamento.service";
import { FornecedorService } from "../../fornecedor/fornecedor.service";
import { GrupoService } from "../../grupo/grupo.service";
import { ProdutoService } from "../produto.service";
import UnidadeMedida from "src/model/enums/unidade-medida";

@Component({
    selector: "produto-formulario",
    templateUrl: "./produto-formulario.component.html",
})
export class ProdutoFormularioComponent implements OnInit {
    produtoFormulario: ProdutoModel = { departamentos: [], fornecedores: [] };
    isEditando: boolean;
    carregando: boolean;
    unidadesMedida = Object.values(UnidadeMedida);

    fornecedores$: Observable<FornecedorModel[]>;
    grupos$: Observable<GrupoModel[]>;
    departamentos$: Observable<DepartamentoModel[]>;

    constructor(
        private produtoService: ProdutoService,
        private grupoService: GrupoService,
        private departamentoService: DepartamentoService,
        private fornecedorService: FornecedorService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
        private handleErrorService: HandleErrorService
    ) { }

    ngOnInit(): void {
        this.grupos$ = this.grupoService.buscarGrupos();
        this.fornecedores$ = this.fornecedorService.buscarFornecedores();
        this.departamentos$ = this.departamentoService.buscarDepartamentos();

        this.activatedRoute.params.subscribe(params => {
            const id: string = params["id"];
            if (id) {
                this.isEditando = true;
                this.carregando = true;
                this.produtoService.buscarPorId(id)
                    .subscribe({
                        next: res => {
                            this.produtoFormulario = res;
                            this.departamentos$ = this.departamentoService.buscarDepartamentos()
                                .pipe(
                                    map(dptoList => dptoList.filter(dpto => !res.departamentos.some(d => d.id === dpto.id)))
                                );
                        },
                        error: () => this.router.navigate(['/produtos']),
                        complete: () => this.carregando = false
                    });
            }
        });
    }

    onSubmit(formulario: NgForm): void {
        if (!formulario.valid) return;

        if (this.isEditando) {
            this.produtoService.atualizar(this.produtoFormulario.id, this.produtoFormulario).subscribe({
                next: () => {
                    this.messageService.add(Mensagens.SUCESSO_REGISTRO_SALVO);
                    this.router.navigate(["/produtos/"]);
                },
                error: this.handleErrorService.handleError
            });
        }
        else {
            const criarProduto: CriarProduto = {
                descricao: this.produtoFormulario.descricao,
                codigoBarras: this.produtoFormulario.codigoBarras,
                idFornecedores: this.produtoFormulario.fornecedores.map(forn => forn.id),
                unidadeMedida: this.produtoFormulario.unidadeMedida,
                detalhes: this.produtoFormulario.detalhes,
                palavrasChave: this.produtoFormulario.palavrasChave,
                idDepartamentos: this.produtoFormulario.departamentos.map(dpto => dpto.id),
                idGrupo: this.produtoFormulario.grupo.id,
                estoqueMinimo: this.produtoFormulario.estoqueMinimo,
                estoqueMaximo: this.produtoFormulario.estoqueMaximo,
                controlaEstoqueMinimo: this.produtoFormulario.controlaEstoqueMinimo,
                controlaEstoqueMaximo: this.produtoFormulario.controlaEstoqueMaximo
            };
            this.produtoService.criar(criarProduto).subscribe({
                next: () => {
                    this.messageService.add(Mensagens.SUCESSO_REGISTRO_CRIADO);
                    this.router.navigate(["/produtos/"])
                },
                error: this.handleErrorService.handleError
            });
        }
    }

    onLimpar(): void { }
}
