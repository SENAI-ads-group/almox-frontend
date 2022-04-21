import { Auditavel } from './auditavel';
import { Produto } from './produto';

export default interface GrupoModel {
    id?: string;
    descricao?: string;
    auditoria?: Auditavel;
    produtos?: Produto[];
}

export interface CriarGrupo {
    descricao: string;
}
