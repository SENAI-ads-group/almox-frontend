import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PrimengModule } from "./../primeng/primeng.module";
import { SharedModule } from "./../shared/shared.module";
import { RequisicaoBuscaComponent } from "./components/busca/requisicao-busca.component";
import { RequisicaoFiltroComponent } from "./components/filtro-busca/requisicao-filtro-busca.component";
import { RequisicaoFormComponent } from "./components/form/requisicao-form.component";
import { RequisicaoRoutingModule } from "./requisicao-routing.module";
import { RequisicaoStepInformacoesComponent } from './components/step-informacoes/requisicao-step-informacoes.component';
import { RequisicaoStepItensComponent } from './components/step-itens/requisicao-step-itens.component';
import { ItemRequisicaoModule } from '../item-requisicao/item-requisicao.module';
import { FormReqComponent } from './components/form-req/form-req.component';


@NgModule({
    declarations: [
        RequisicaoBuscaComponent,
        RequisicaoFiltroComponent,
        RequisicaoFormComponent,
        RequisicaoStepInformacoesComponent,
        RequisicaoStepItensComponent,
        FormReqComponent,
    ],
    imports: [
        CommonModule,
        RequisicaoRoutingModule,
        PrimengModule,
        SharedModule,
        ItemRequisicaoModule
    ],
})
export class RequisicaoModule {}
