import { Auditavel } from './auditavel';
import ProdutoModel from './produto';

export default interface GrupoModel {
    id?: string;
    descricao?: string;
    auditoria?: Auditavel;
    produtos?: ProdutoModel[];
}

export interface CriarGrupo {
    descricao: string;
}
