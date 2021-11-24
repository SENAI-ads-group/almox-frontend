import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "step",
    templateUrl: "./step.component.html",
    styleUrls: ["./step.component.scss"],
})
export class StepComponent implements OnInit {
    @Input() titulo: string;
    @Input() subtitulo: string;
    @Input() exibirBotaoAnterior: boolean;
    @Input() exibirBotaoProximo: boolean;

    @Output("anterior") anteriorEvent = new EventEmitter<any>();
    @Output("proximo") proximoEvent = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    onAnterior() {
        this.anteriorEvent.emit();
    }

    onProximo() {
        this.proximoEvent.emit();
    }
}
