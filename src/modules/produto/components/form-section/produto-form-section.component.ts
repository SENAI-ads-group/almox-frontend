import { Component, Input, OnInit } from "@angular/core";
import { ControlContainer, NgForm } from "@angular/forms";
import DepartamentoModel from "src/model/departamento";
import { Produto } from "src/model/produto";

import { Fabricante } from "./../../../../model/fabricante";
import GrupoModel from "./../../../../model/grupo";

@Component({
    selector: "produto-form-section",
    templateUrl: "./produto-form-section.component.html",
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class ProdutoFormSectionComponent implements OnInit {
    @Input() produto: Produto;
    @Input() departamentos: DepartamentoModel[];
    @Input() fabricantes: Fabricante[];
    @Input() grupos: GrupoModel[];
    @Input() enums: any;

    constructor(public formulario: NgForm) {}

    ngOnInit(): void {
    }
}
