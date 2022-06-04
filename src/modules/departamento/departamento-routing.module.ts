import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartamentoFormularioComponent } from './formulario/departamento-formulario.component';
import { DepartamentoBuscaComponent } from './busca/departamento-busca.component';

const routes: Routes = [
    { path: "", component: DepartamentoBuscaComponent },
    { path: "novo", component: DepartamentoFormularioComponent },
    { path: "editar/:id", component: DepartamentoFormularioComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DepartamentoRoutingModule { }
