import { PrimengModule } from './../primeng/primeng.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FornecedorModalListaComponent } from './components/fornecedor-modal-lista/fornecedor-modal-lista.component';
import { FornecedorRoutingModule } from './fornecedor-routing.module';
import { SharedModule } from "../shared/shared.module";
import { PessoaJuridicaModule } from '../pessoa-juridica/pessoa-juridica.module';
import { ContatoModule } from '../contato/contato.module';
import { FornecedorFormComponent } from './components/fornecedor-form/fornecedor-form/fornecedor-form.component';
import { FornecedorFormSectionComponent } from './components/fornecedor-form-section/fornecedor-form-section/fornecedor-form-section.component';
import { FornecedorListaComponent } from './components/fornecedor-lista/fornecedor-lista/fornecedor-lista.component';
import { FornecedorFiltroComponent } from './components/fornecedor-filtro/fornecedor-filtro/fornecedor-filtro.component';
@NgModule({
    declarations: [
        FornecedorModalListaComponent,
        FornecedorFormComponent,
        FornecedorFormSectionComponent,
        FornecedorListaComponent,
        FornecedorFiltroComponent
    ]
        ,
    imports: [
        CommonModule,
        FornecedorRoutingModule,
        SharedModule,
        PrimengModule,
        PessoaJuridicaModule,
        ContatoModule,

    ],
    exports: [FornecedorModalListaComponent],
})
export class FornecedorModule {}
