import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: "pesquisar-button",
    template: `
        <button
            pButton
            pRipple
            label="Buscar"
            (click)="handleOnClick()"
            icon="pi pi-search"
            class="p-button-outlined p-mb-3"
        ></button>
    `,
})
export class PesquisarButtonComponent {
    @Output("click") onClick: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    handleOnClick = () => this.onClick.emit({});
}
