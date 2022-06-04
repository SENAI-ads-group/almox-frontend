import { PessoaModule } from './../pessoa/pessoa.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DepartamentoService } from '../departamento/departamento.service';
import { PrimengModule } from '../primeng/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { AuditoriaModule } from './../auditoria/auditoria.module';
import { OperadorBuscaComponent } from './busca/operador-busca.component';
import { ModalSolicitacoesComponent } from './modal-solicitacoes/modal-solicitacoes.component';
import { OperadorRoutingModule } from './operador-routing.module';

@NgModule({
    declarations: [
        OperadorBuscaComponent,
        ModalSolicitacoesComponent,
    ],
    imports: [
        CommonModule,
        OperadorRoutingModule,
        PrimengModule,
        SharedModule,
        AuditoriaModule,
        PessoaModule
    ],
    providers: [DepartamentoService],
})
export class OperadorModule { }
