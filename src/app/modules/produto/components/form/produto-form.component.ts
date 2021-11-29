import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Fornecedor } from 'src/app/model/fornecedor';

import { CommonService } from '../../../shared/services/common.service';
import { Departamento } from './../../../../model/departamento';
import { Fabricante } from './../../../../model/fabricante';
import { Grupo } from './../../../../model/grupo';
import { Produto } from './../../../../model/produto';
import { DepartamentoService } from './../../../departamento/services/departamento.service';
import { FabricanteService } from './../../../fabricante/services/fabricante.service';
import { FornecedorService } from './../../../fornecedor/services/fornecedor.service';
import { GrupoService } from './../../../grupo/grupo.service';
import { ProdutoService } from './../../services/produto.service';

@Component({
    selector: "produto-form",
    templateUrl: "./produto-form.component.html",
})
export class ProdutoFormComponent implements OnInit {
    produto: Produto = { configuracaoEstoque: {}, departamentos: [] };
    editandoRegistroExistente: boolean;
    enums$: Observable<any>;
    fabricantes$: Observable<Fabricante[]>;
    fornecedores$: Observable<Fornecedor[]>;
    grupos$: Observable<Grupo[]>;
    departamentos$: Observable<Departamento[]>;

    constructor(
        private commonService: CommonService,
        private produtoService: ProdutoService,
        private grupoService: GrupoService,
        private departamentoService: DepartamentoService,
        private fabricanteService: FabricanteService,
        private fornecedorService: FornecedorService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.enums$ = this.commonService.buscarEnumeradores();
        this.grupos$ = this.grupoService.buscarTodos();
        this.fabricantes$ = this.fabricanteService.buscarTodos();
        this.fornecedores$ = this.fornecedorService.buscarTodos();
        this.departamentos$ = this.departamentoService.buscarTodos();

        this.activatedRoute.params.subscribe(params => {
            const id: number = params["id"];
            if (id) {
                this.editandoRegistroExistente = true;
                this.produtoService
                    .buscarPorId(id)
                    .subscribe(produto => (this.produto = produto));
            }
        });
    }

    onSubmit(formulario: NgForm): void {
        if (!formulario.valid) return;

        const httpSubscriber = this.editandoRegistroExistente
            ? this.produtoService.atualizar(this.produto.id, this.produto)
            : this.produtoService.criar(this.produto);
        httpSubscriber.subscribe(() => this.router.navigate(["/produtos/"]));
    }

    onLimpar(): void {}
}
