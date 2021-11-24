import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: 'fornecedor-filtro',
  templateUrl: './fornecedor-filtro.component.html',

})
export class FornecedorFiltroComponent implements OnInit {
    @Output("buscar")
    buscarEvent: EventEmitter<any> = new EventEmitter();

    filtro = {
        cnpj: "",
        razaoSocial: "",
        email: "",
    };

  constructor() { }

  ngOnInit(): void {}
    handleLimpar() {
        this.filtro = {
            cnpj: "",
            razaoSocial: "",
            email: "",
        };
    }
    handleBuscar() {
        this.buscarEvent.emit({ filtro: this.filtro });
    }
}
