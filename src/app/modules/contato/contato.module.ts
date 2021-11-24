import { ContatoFormSectionComponent } from './form-section/contato-form-seciton.component';
import { PrimengModule } from './../primeng/primeng.module';

import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

@NgModule({
declarations: [ContatoFormSectionComponent],
imports:[CommonModule, PrimengModule],
exports:[ContatoFormSectionComponent]

})

export class ContatoModule {}
