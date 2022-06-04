import { Component, Input } from "@angular/core";

@Component({
    selector: "submit-button",
    template: `
        <button
            type="submit"
            pButton
            pRipple
            [disabled]="disabled"
            label="Salvar"
            class="p-mb-3 p-mr-1"
            icon="pi pi-save"
        ></button>
    `,
})
export class SubmitButtonComponent {
    @Input("disabled") disabled: boolean;
    constructor() {}
}
