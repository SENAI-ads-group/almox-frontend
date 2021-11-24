import { Component } from '@angular/core';

@Component({
    selector: "novo-button",
    template: `
        <button
            pButton
            pRipple
            label="Novo"
            icon="pi pi-plus"
            class="p-mr-1 p-mb-3"
            routerLink="novo"
        ></button>
    `,
})
export class NovoButtonComponent {
    constructor() {}
}
