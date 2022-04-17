import { Component, Input } from '@angular/core';

@Component({
    selector: "limpar-button",
    template: `
        <button
            pButton
            pRipple
            [disabled]="disabled"
            type="button"
            label="Limpar"
            class="p-mb-3 p-mr-1 p-button-secondary"
        ></button>
    `,
})
export class LimparButtonComponent {
    @Input("disabled") disabled: boolean;
    constructor() { }
}
