import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { PessoaFisica } from './../../../model/pessoa';

@Component({
    selector: "pf-form-section",
    templateUrl: "./pf-form-section.component.html",
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class PfFormSectionComponent implements OnInit {
    @Input("pessoa") pessoa: PessoaFisica;

    constructor(public formulario: NgForm) { }

    ngOnInit(): void { }
}
