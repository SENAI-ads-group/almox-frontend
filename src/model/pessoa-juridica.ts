import { Contato } from "./contato";

export interface PessoaJurica {
    razaoSocial?: string;
    cnpj?: string;
    nomeFantasia?: string;
    contato?: Contato;
}

export interface CriarPessoa {
    razaoSocial?: string;
    cnpj?: string;
    nomeFantasia?: string;
}
