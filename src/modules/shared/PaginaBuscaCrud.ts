import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
    template: "",
})
export abstract class PaginaBuscaCrud<T> implements OnInit, OnDestroy {
    registros: T[];
    registrosSubscription: Subscription;
    carregando: boolean;

    abstract ngOnInit(): void;
    abstract onBuscar(filtro: any): void;
    abstract onEditar(registro: T): void;
    abstract onExcluir(registro: T): void;
    ngOnDestroy(): void {
        if (this.registrosSubscription) this.registrosSubscription.unsubscribe();
    }
}
