import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContatoModule } from '../contato/contato.module';
import { PessoaModule } from '../pessoa/pessoa.module';
import { SharedModule } from '../shared/shared.module';
import { PrimengModule } from './../primeng/primeng.module';
import { FornecedorBuscaComponent } from './busca/fornecedor-busca.component';
import { FornecedorFormularioComponent } from './formulario/fornecedor-formulario.component';
import { FornecedorModalListaComponent } from './modal-listagem/fornecedor-modal-lista.component';
import { FornecedorRoutingModule } from './fornecedor-routing.module';

@NgModule({
    declarations: [
        FornecedorModalListaComponent,
        FornecedorFormularioComponent,
        FornecedorBuscaComponent,
    ],
    imports: [
        CommonModule,
        FornecedorRoutingModule,
        SharedModule,
        PrimengModule,
        PessoaModule,
        ContatoModule,
    ],
    exports: [FornecedorModalListaComponent],
})
export class FornecedorModule { }
