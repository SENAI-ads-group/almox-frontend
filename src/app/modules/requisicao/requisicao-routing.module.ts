
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";





import { RequisicaoBuscaComponent } from './components/busca/requisicao-busca.component';
import { RequisicaoFormComponent } from './components/form/requisicao-form.component';
import { RequisicaoStepInformacoesComponent } from './components/step-informacoes/requisicao-step-informacoes.component';
import { RequisicaoStepItensComponent } from './components/step-itens/requisicao-step-itens.component';

const routes: Routes = [
    { path: "", component: RequisicaoBuscaComponent, pathMatch: "full" },
    {
        path: "novo",
        component: RequisicaoFormComponent,
        children: [
            { path: "", redirectTo: "informacoes", pathMatch: "full" },
            {
                path: "informacoes",
                component: RequisicaoStepInformacoesComponent,
            },
            { path: "itens", component: RequisicaoStepItensComponent },

        ]
    },
<<<<<<< HEAD
    {
        path: "editar/:id",
        component: RequisicaoFormComponent,
        children: [
            { path: "", redirectTo: "informacoes", pathMatch: "full" },
            {
                path: "informacoes",
                component: RequisicaoStepInformacoesComponent,
            },
            { path: "itens", component: RequisicaoStepItensComponent },
        ]
    }


=======
    { path: "informacoes/:id", component: InformacoesComponent},
>>>>>>> 2676bd2 (criar-acao-requisicao)
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RequisicaoRoutingModule {}
