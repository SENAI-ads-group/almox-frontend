import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: "limpar-button",
    template: `
        <ng-container>
            <button
                pButton
                pRipple
                [disabled]="disabled"
                (click)="onClick()"
                type="button"
                label="Limpar"
                class="p-mb-3 p-mr-1 p-button-secondary"
            ></button>
        </ng-container>
    `,
})
export class LimparButtonComponent {
    @Input("disabled") disabled: boolean;
    @Output("limpar") clickEvent = new EventEmitter<void>();

    onClick() {
        this.clickEvent.emit();
    }

    constructor() { }
}
