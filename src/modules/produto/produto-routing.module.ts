import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdutoFormularioComponent } from './formulario/produto-formulario.component';
import { ProdutoBuscaComponent } from './busca/produto-busca.component';

const routes: Routes = [
    { path: "", component: ProdutoBuscaComponent },
    { path: "novo", component: ProdutoFormularioComponent },
    { path: "editar/:id", component: ProdutoFormularioComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProdutoRoutingModule {}
