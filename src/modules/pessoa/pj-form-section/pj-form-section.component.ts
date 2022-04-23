import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { PessoaJurica } from '../../../model/pessoa';

@Component({
    selector: "pj-form-section",
    templateUrl: "./pj-form-section.component.html",
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class PjFormSectionComponent implements OnInit {
    @Input("pessoa") pessoa: PessoaJurica;

    constructor(public formulario: NgForm) { }

    ngOnInit(): void { }
}
