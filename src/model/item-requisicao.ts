import { Auditavel } from "src/model/auditavel";
import ProdutoModel from "./produto";
export interface ItemRequisicao extends Auditavel {
    id?: number;
    statusItemRequisicao?: any;
    quantidade?: number;
    produto?: ProdutoModel;
}
