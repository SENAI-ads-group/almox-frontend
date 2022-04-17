import { Auditavel } from './auditavel';
import { ConfiguracaoEstoque } from './configuracao-estoque';
import DepartamentoModel from './departamento';
import { Fabricante } from './fabricante';
import { Fornecedor } from './fornecedor';
import GrupoModel from './grupo';

export interface Produto extends Auditavel {
    id?: number;
    descricao?: string;
    codigoBarras?: string;
    unidadeMedida?: any;
    palavrasChave?: string[];
    possuiLoteValidade?: boolean;
    custoMedio?: number;
    fabricante?: Fabricante;
    fornecedores?: Fornecedor[];
    detalhes?: string;
    departamentos?: DepartamentoModel[];
    grupo?: GrupoModel;
    configuracaoEstoque?: ConfiguracaoEstoque;
}
