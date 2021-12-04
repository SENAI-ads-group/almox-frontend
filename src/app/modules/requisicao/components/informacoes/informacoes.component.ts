import { ItemRequisicao } from './../../../../model/item-requisicao';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Requisicao } from 'src/app/model/requisicao';
import { RequisicaoService } from '../../services/requisicao.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'informacoes',
  templateUrl: './informacoes.component.html',
  styleUrls: ["./informacoes.component.scss"]
})
export class InformacoesComponent implements OnInit {


    NOME_PAGINA = "Informações da Requisição";
    registro: Requisicao = {};
    registroNoFormulario: any;


    constructor(
    private requisicaoService: RequisicaoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
        const id: number = params["id"];
        if (id) {
            this.requisicaoService
                .buscarPorId(id)
                .subscribe(registroEncontrado => {
                    console.log(registroEncontrado);
                    this.registro = registroEncontrado;
                });
        }
    });

  }

  onSubmit(formulario: NgForm): void {

}

onEditarItem({ rowIndex, item }){
    this.registroNoFormulario = { rowIndex, item: Object.assign({}, item) };
}

onExcluirItem({ rowIndex }){
    this.registro.itens.splice(rowIndex, 1);
}

onEditarItemSubmit(item : ItemRequisicao){
    if (this.registroNoFormulario.rowIndex !== -1) {
        this.registro.itens[this.registroNoFormulario.rowIndex] = Object.assign(
            {},
            item
        );
    } else {
        this.registro.itens.push(Object.assign({}, item));
    }
    this.registroNoFormulario = null;
}

onAtender(){
this.requisicaoService.atenderRequisicao(this.registro.id).subscribe( () => {
            this.requisicaoService
                .buscarPorId(this.registro.id)
                .subscribe(registroEncontrado => {
                    console.log(registroEncontrado);
                    this.registro = registroEncontrado;
                });;});
}

onCancelar(){
    this.requisicaoService.cancelarRequisicao(this.registro.id).subscribe( () => {
        this.requisicaoService
            .buscarPorId(this.registro.id)
            .subscribe(registroEncontrado => {
                console.log(registroEncontrado);
                this.registro = registroEncontrado;
            });;});
}

onEntregar(){
    this.requisicaoService.entregarRequisicao(this.registro.id).subscribe( () => {
        this.requisicaoService
            .buscarPorId(this.registro.id)
            .subscribe(registroEncontrado => {
                console.log(registroEncontrado);
                this.registro = registroEncontrado;
            });;});
}
}




