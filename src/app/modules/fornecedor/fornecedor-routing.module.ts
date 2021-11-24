import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorFormComponent } from './components/fornecedor-form/fornecedor-form/fornecedor-form.component';
import { FornecedorListaComponent } from './components/fornecedor-lista/fornecedor-lista/fornecedor-lista.component';
const routes: Routes = [
    { path: "", component: FornecedorListaComponent },
    { path: "novo", component: FornecedorFormComponent },
    { path: "visualizar/:id", component: FornecedorFormComponent },
    { path: "editar/:id", component: FornecedorFormComponent }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedorRoutingModule { }
