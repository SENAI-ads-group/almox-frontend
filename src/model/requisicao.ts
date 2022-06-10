import OperadorModel from "./operador";
import DepartamentoModel from "./departamento";
import { ItemRequisicao } from "./item-requisicao";

export interface Requisicao {
    produto?: any;
    id?: number;
    dataRequisicao?: Date;
    requisitante?: OperadorModel;
    almoxarife?: OperadorModel;
    anotacoes?: string;
    departamento?: DepartamentoModel;
    status?: any;
    itens?: ItemRequisicao[];
}

export interface CriarRequisicao {
    idOperadorAlmoxarife: string;
    idDepartamento: string;
    itens: { idProduto: string; quantidade: number; }[];
}
