import { Auditavel } from './auditavel';
import OperadorModel from './operador';
import { Produto } from './produto';
export default interface DepartamentoModel {
    id?: string;
    descricao?: string;
    operadores?: OperadorModel[];
    produtos?: Produto[];
    auditoria?: Auditavel;
}

export interface CriarDepartamento {
    descricao: string;
    idOperadores: string[];
}
