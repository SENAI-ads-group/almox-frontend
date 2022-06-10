import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HandleErrorHttpInterceptor } from '../config/handle-error-http-interceptor';
import { CoreModule } from '../modules/core/core.module';
import { PedidoStepMergeService } from 'src/modules/pedido/services/pedido-step-merge.service';
import { RequisicaoStepMergeService } from 'src/modules/requisicao/services/requisicao-step-merge.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CoreModule,
        ToastModule,
    ],
    declarations: [AppComponent],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HandleErrorHttpInterceptor,
            multi: true,
        },
        MessageService,
        ConfirmationService,
        DialogService,
        PedidoStepMergeService,
        RequisicaoStepMergeService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
