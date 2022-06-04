import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OperadorBuscaComponent } from './busca/operador-busca.component';


const routes: Routes = [
    { path: "", component: OperadorBuscaComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OperadorRoutingModule { }
