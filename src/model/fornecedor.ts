import { CriarPessoa, PessoaJurica } from './pessoa-juridica';

export default interface FornecedorModel {
    id?: string;
    pessoa?: PessoaJurica;
}

interface _CriarPessoaFornecedor extends CriarPessoa {
    id?: string;
}
export interface CriarFornecedor {
    pessoa: _CriarPessoaFornecedor;
}
