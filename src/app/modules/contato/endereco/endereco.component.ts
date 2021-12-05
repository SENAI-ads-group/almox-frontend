import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { Contato } from 'src/app/model/contato';


@Component({
    selector: "endereco",
    templateUrl: "./endereco.component.html",
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class EnderecoComponent implements OnInit {

    @Input() enums: any;
    @Input() contato: Contato;

    constructor(public formulario: NgForm) {}

    ngOnInit(): void {}
}
