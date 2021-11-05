import { Component } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";

@Component({
    selector: "requisicao-form-section",
    templateUrl: "./requisicao-form-section.component.html",
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class RequisicaoFormSectionComponent {
    constructor(private formulario: NgForm) {}
}
