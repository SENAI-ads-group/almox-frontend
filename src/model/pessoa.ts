export interface Pessoa {
    id?: string;
    nome?: string;
    email?: string;
    telefone?: string;
    logradouro?: string;
    complemento?: string;
    numero?: string;
    cep?: string;
    cidade?: string;
    uf?: string;
    bairro?: string;
}

export interface PessoaJurica extends Pessoa {
    razaoSocial?: string;
    nomeFantasia?: string;
    cnpj?: string;
}

export interface CriarPessoa {
    razaoSocial?: string;
    cnpj?: string;
    nomeFantasia?: string;
}
