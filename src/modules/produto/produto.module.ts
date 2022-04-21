import { ModalHistoricoComponent } from './modal-historico/modal-historico-produto.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PrimengModule } from "../primeng/primeng.module";
import { SharedModule } from "../shared/shared.module";
import { FornecedorModule } from "./../fornecedor/fornecedor.module";
import { ProdutoFormularioComponent } from "./formulario/produto-formulario.component";
import { ProdutoBuscaComponent } from "./busca/produto-busca.component";
import { ProdutoModalListaComponent } from "./modal-listagem/produto-modal-lista.component";
import { ProdutoRoutingModule } from "./produto-routing.module";
import { ProdutoService } from "./produto.service";

@NgModule({
    declarations: [
        ProdutoBuscaComponent,
        ProdutoFormularioComponent,
        ProdutoModalListaComponent,
        ModalHistoricoComponent
    ],
    imports: [
        CommonModule,
        ProdutoRoutingModule,
        PrimengModule,
        SharedModule,
        FornecedorModule,
    ],
    providers: [ProdutoService],
    exports: [ProdutoModalListaComponent],
})
export class ProdutoModule { }
