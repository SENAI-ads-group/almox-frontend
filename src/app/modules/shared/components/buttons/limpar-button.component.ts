import { Component } from '@angular/core';

@Component({
    selector: "limpar-button",
    template: `
        <button
            pButton
            pRipple
            type="button"
            label="Limpar"
            class="p-button-outlined p-button-secondary p-mr-2 p-mb-3"
            style="color: #424242;"
        ></button>
    `,
})
export class LimparButtonComponent {
    constructor() {}
}
