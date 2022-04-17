import { ItemPedido } from './item-pedido';
import OperadorModel from './operador';

import DepartamentoModel from './departamento';
import { Fornecedor } from './fornecedor';
import { ItemRequisicao } from './item-requisicao';

export interface Pedido {
    id?: number;
    dataPedido?: Date;
    dataPrevisaoEntrega?: Date;
    anotacoes?: string;
    fornecedor?: Fornecedor;
    comprador?: OperadorModel;
    status?: any;
    itens?: ItemPedido[];
}
