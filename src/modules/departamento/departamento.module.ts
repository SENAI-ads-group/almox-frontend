import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuditoriaModule } from './../auditoria/auditoria.module';
import { PrimengModule } from './../primeng/primeng.module';
import { SharedModule } from './../shared/shared.module';
import { DepartamentoFormularioComponent } from './formulario/departamento-formulario.component';
import { DepartamentoBuscaComponent } from './busca/departamento-busca.component';
import { DepartamentoRoutingModule } from './departamento-routing.module';

@NgModule({
    declarations: [
        DepartamentoBuscaComponent,
        DepartamentoFormularioComponent,
    ],
    imports: [
        CommonModule,
        DepartamentoRoutingModule,
        SharedModule,
        PrimengModule,
        AuditoriaModule,
    ],
})
export class DepartamentoModule { }
