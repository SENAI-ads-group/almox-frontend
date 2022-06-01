import { PessoaFisica } from './pessoa'

export default interface OperadorModel {
    id?: string,
    funcoes: string[],
    pessoa: PessoaFisica
}

export interface SolicitacaoCadastro {
    nome: string;
    cpf: string;
    email: string;
    dataCriacao: Date;
}

export interface AprovarSolicitacaoCadastro {
    funcoes: string[];
    email: string;
    telefone: string;
    logradouro: string;
    complemento: string;
    numero: string;
    cep: string;
    cidade: string;
    uf: string;
    bairro: string;
}
