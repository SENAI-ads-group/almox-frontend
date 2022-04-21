import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DepartamentoService } from '../departamento/departamento.service';
import { PrimengModule } from '../primeng/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { AuditoriaModule } from './../auditoria/auditoria.module';
import { OperadorRoutingModule } from './operador-routing.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        OperadorRoutingModule,
        PrimengModule,
        SharedModule,
        AuditoriaModule,
    ],
    providers: [DepartamentoService],
})
export class OperadorModule { }
