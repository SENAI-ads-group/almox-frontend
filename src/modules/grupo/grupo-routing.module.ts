import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GrupoBuscaComponent } from './busca/grupo-busca.component';
import { GrupoFormularioComponent } from './formulario/grupo-formulario.component';

const routes: Routes = [
    { path: "", component: GrupoBuscaComponent },
    { path: "novo", component: GrupoFormularioComponent },
    { path: "editar/:id", component: GrupoFormularioComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GrupoRoutingModule { }
