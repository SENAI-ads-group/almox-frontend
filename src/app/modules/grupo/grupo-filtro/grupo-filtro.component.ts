import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { FiltroConsideracaoAtivos } from 'src/app/model/enums';

@Component({
  selector: 'grupo-filtro',
  templateUrl: './grupo-filtro.component.html',
})
export class GrupoFiltroComponent implements OnInit {
@Output("buscar")
buscarEvent: EventEmitter<any> = new EventEmitter();

@Input()
tiposGrupos: any[];

filtro = {
    descricao: null,
    filtroStatusAuditavel: FiltroConsideracaoAtivos.APENAS_ATIVOS,
};

  constructor() { }

  ngOnInit(): void {
  }

buscar(): void {
    this.buscarEvent.emit({filtro: this.filtro});
}

limparFiltros(): void{
    this.filtro = {
        descricao: null,
        filtroStatusAuditavel: FiltroConsideracaoAtivos.APENAS_ATIVOS,
    };
}

}
