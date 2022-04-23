import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Authguard } from "src/modules/autenticacao/auth.guard";
import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
    {
        path: "",
        component: MainComponent,
        children: [
            {
                path: "operadors",
                loadChildren: () =>
                    import("../operador/operador.module").then(
                        module => module.OperadorModule
                    ),
            },
            {
                path: "produtos",
                loadChildren: () =>
                    import("../produto/produto.module").then(
                        module => module.ProdutoModule
                    ),
            },
            {
                path: "departamentos",
                loadChildren: () =>
                    import("../departamento/departamento.module").then(
                        module => module.DepartamentoModule
                    ),
            },
            {
                path: "grupos",
                loadChildren: () =>
                    import("../grupo/grupo.module").then(
                        module => module.GrupoModule
                    ),
            },
            {
                path: "item-requisicao",
                loadChildren: () =>
                    import("../item-requisicao/item-requisicao.module").then(
                        module => module.ItemRequisicaoModule
                    ),
            },
            {
                path: "requisicoes",
                loadChildren: () =>
                    import("../requisicao/requisicao.module").then(
                        module => module.RequisicaoModule

                    ),
            },
            {
                path: "pedidos",
                loadChildren: () =>
                    import("../pedido/pedido.module").then(
                        module => module.PedidoModule

                    ),
            },
            {
                path: "fornecedores",
                loadChildren: () =>
                    import("../fornecedor/fornecedor.module").then(
                        module => module.FornecedorModule
                    ),
            },
            {
                path: "operadores",
                loadChildren: () =>
                    import("../operador/operador.module").then(
                        module => module.OperadorModule
                    ),
            },
        ],
        canActivate: [Authguard],
    },
    {
        path: "login",
        component: LoginComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CoreRoutingModule { }
