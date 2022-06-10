import { ItemPedido } from './item-pedido';
import OperadorModel from './operador';
import FornecedorModel from './fornecedor';

export interface Pedido {
    id?: number;
    dataPedido?: Date;
    dataPrevisaoEntrega?: Date;
    anotacoes?: string;
    fornecedor?: FornecedorModel;
    comprador?: OperadorModel;
    status?: any;
    itens?: ItemPedido[];
}

export interface CriarPedido {
    idFornecedor: string;
    dataPrevisaoEntrega: Date;
    itens: { idProduto: string; quantidade: number; }[];
}
