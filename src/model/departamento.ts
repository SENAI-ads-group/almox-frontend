import { Auditavel } from './auditavel';
import OperadorModel from './operador';
import ProdutoModel from './produto';
export default interface DepartamentoModel {
    id?: string;
    descricao?: string;
    operadores?: OperadorModel[];
    produtos?: ProdutoModel[];
    auditoria?: Auditavel;
}

export interface CriarDepartamento {
    descricao: string;
    idOperadores: string[];
}
