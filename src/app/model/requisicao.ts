import { Usuario } from "src/app/model/usuario";
import { Departamento } from "./departamento";
import { ItemRequisicao } from "./item-requisicao";
export interface Requisicao {
    id?: number;
    dataRequisicao?: Date;
    requisitante?: Usuario;
    departamento?: Departamento;
    status?: any;
    itens?: ItemRequisicao[];
}
