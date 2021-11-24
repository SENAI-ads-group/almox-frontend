import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PrimengModule } from "../primeng/primeng.module";
import { FiltroStatusAuditavel } from "./components/filtro-status-auditavel/filtro-status-auditavel.component";
import { LimparButtonComponent } from "./components/buttons/limpar-button.component";
import { NovoButtonComponent } from "./components/buttons/novo-button.component";
import { PesquisarButtonComponent } from "./components/buttons/pesquisar-button.component";
import { SubmitButtonComponent } from "./components/buttons/submit-button.component";
import { TabelaCrudComponent } from "./components/tabela-crud/tabela-crud.component";
import { TituloPaginaCrudComponent } from "./components/titulo-pagina-crud/titulo-pagina-crud.component";
import { CommonService } from "./services/common.service";
import { HandleErrorService } from "./services/handle-error.service";
import { StepComponent } from './components/step/step.component';
import { InputButtonComponent } from './components/input-button.component';

@NgModule({
    declarations: [
        TabelaCrudComponent,
        FiltroStatusAuditavel,
        TituloPaginaCrudComponent,
        LimparButtonComponent,
        NovoButtonComponent,
        PesquisarButtonComponent,
        SubmitButtonComponent,
        StepComponent,
        InputButtonComponent,
    ],
    imports: [CommonModule, PrimengModule],
    providers: [CommonService, HandleErrorService],
    exports: [
        TabelaCrudComponent,
        FiltroStatusAuditavel,
        TituloPaginaCrudComponent,
        LimparButtonComponent,
        NovoButtonComponent,
        PesquisarButtonComponent,
        SubmitButtonComponent,
        StepComponent,
        InputButtonComponent
    ],
})
export class SharedModule {}
