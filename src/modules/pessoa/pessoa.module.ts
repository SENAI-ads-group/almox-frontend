import { PfFormSectionComponent } from './pf-form-section/pf-form-section.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PrimengModule } from './../primeng/primeng.module';
import { PjFormSectionComponent } from './pj-form-section/pj-form-section.component';

@NgModule({
    declarations: [PjFormSectionComponent, PfFormSectionComponent],
    imports: [CommonModule, PrimengModule],
    exports: [PjFormSectionComponent, PfFormSectionComponent]
})
export class PessoaModule {

}
