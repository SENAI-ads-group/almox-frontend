import { SharedModule } from './../shared/shared.module';
import { PrimengModule } from './../primeng/primeng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GrupoRoutingModule } from './grupo-routing.module';
import { GrupoBuscaComponent } from './busca/grupo-busca.component';
import { GrupoFormularioComponent } from './formulario/grupo-formulario.component';


@NgModule({
    declarations: [
        GrupoBuscaComponent,
        GrupoFormularioComponent
    ],
    imports: [
        CommonModule,
        GrupoRoutingModule,
        PrimengModule,
        SharedModule
    ]
})
export class GrupoModule { }
