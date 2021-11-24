import { Component, OnInit } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import { MenuItem } from "primeng/api";

@Component({
    selector: "requisicao-form-section",
    templateUrl: "./requisicao-form-section.component.html",
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class RequisicaoFormSectionComponent implements OnInit {
    itensStep: MenuItem[];

    constructor(private formulario: NgForm) {}

    ngOnInit(): void {
        this.itensStep = [
            {
                label: "Informações",
                routerLink: "informacoes",
            },
            {
                label: "Itens",
                routerLink: "itens",
            },
        ];
    }
}
