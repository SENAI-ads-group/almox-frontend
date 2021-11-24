import { ContatoFormSectionComponent } from '../../../contato/form-section/contato-form-section/contato-form-section.component';
import { PessoaJurica } from "./../../../../model/pessoa-juridica";
import { Component, Input, OnInit } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";

@Component({
    selector: "pj-form-section",
    templateUrl: "./pj-form-section.component.html",
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class PjFormSectionComponent implements OnInit {
    @Input() pessoa: PessoaJurica;
    @Input() modoVisualizacao: boolean;
    @Input() formulario: NgForm;
    @Input() contato: ContatoFormSectionComponent;

    constructor() {}

    ngOnInit(): void {}
}
