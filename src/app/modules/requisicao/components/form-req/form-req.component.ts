import { Requisicao } from 'src/app/model/requisicao';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ProdutoService } from 'src/app/modules/produto/services/produto.service';
import { Produto } from 'src/app/model/produto';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/modules/shared/services/common.service';
import { Observable } from 'rxjs';
import { RequisicaoService } from '../../services/requisicao.service';


@Component({
  selector: 'form-req',
  templateUrl: './form-req.component.html',
  styles: [`
  :host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
  }
`],
providers: [MessageService,ConfirmationService]
})
export class FormReqComponent implements OnInit {

    enums$: Observable<any>;

    produtoDialog: boolean;

    requisicao: Requisicao;

    produtos: Produto[];

    produto: Produto;

    produtosSelecionados: Produto[];

    submitted: boolean;

    statuses: any[];

  constructor(private requisicaoService: RequisicaoService,private produtoService: ProdutoService, private messageService: MessageService, private confirmationService: ConfirmationService, private commonService: CommonService,) { }

  ngOnInit(): void {
      this.requisicaoService.buscarTodos().subscribe(registros => this.produtos = registros);

      this.enums$ = this.commonService.buscarEnumeradores();
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Você tem certeza que deseja remover os produtos selecionados?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.produtos = this.produtos.filter(val => !this.produtosSelecionados.includes(val));
            this.produtosSelecionados = null;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Produtos removidos', life: 3000});
        }
    });
}

editProduct(requisicao: Requisicao) {
    this.requisicao = {...requisicao};
    this.produtoDialog = true;
}

deleteProduct(requisicao: Requisicao) {
    this.confirmationService.confirm({
        message: 'Você tem certeza que quer remover  ' + requisicao.produto.descricao + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.produtos = this.produtos.filter(val => val.id !== requisicao.produto.id);
            this.produto = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Produto removido', life: 3000});
        }
    });
}

findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.produtos.length; i++) {
        if (this.produtos[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}




}
