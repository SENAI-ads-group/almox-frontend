import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FornecedorBuscaComponent } from "./busca/fornecedor-busca.component";
import { FornecedorFormularioComponent } from "./formulario/fornecedor-formulario.component";

const routes: Routes = [
    { path: "", component: FornecedorBuscaComponent },
    { path: "novo", component: FornecedorFormularioComponent },
    { path: "editar/:id", component: FornecedorFormularioComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FornecedorRoutingModule { }
