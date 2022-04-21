import { Auditavel } from './auditavel';

export default interface ProdutoModel extends Auditavel {
    id?: string;
    descricao?: string;
    codigoBarras?: string;
    fornecedores?: { id: string, pessoa: { id: string } }[];
    unidadeMedida?: string;
    detalhes?: string;
    palavrasChave?: string[];
    departamentos?: { id: string }[];
    grupo?: { id: string };
    estoqueMinimo?: number;
    estoqueAtual?: number;
    estoqueMaximo?: number;
    controlaEstoqueMinimo?: boolean;
    controlaEstoqueMaximo?: boolean;
}

export interface CriarProduto {
    descricao: string;
    codigoBarras?: string;
    idFornecedores: string[];
    unidadeMedida: string;
    detalhes?: string;
    palavrasChave?: string[];
    idDepartamentos?: string[];
    idGrupo: string;
    estoqueMinimo: number;
    estoqueMaximo: number;
    controlaEstoqueMinimo?: boolean;
    controlaEstoqueMaximo?: boolean;
}

