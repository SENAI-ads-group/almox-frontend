import ProdutoModel from 'src/model/produto';
export interface Movimento {
    id?: number,
    data?: Date,
    tipoDeMovimento?: any,
    custoLiquido?: number,
    custoBruto?: number,
    idOrigem?: number,
    tipoOrigemMovimento?: any,
    itens?: ItemMovimento[]
}

export interface ItemMovimento {
    id?: number,
    produto?: ProdutoModel,
    quantidade?: number,
    custoLiquido?: number,
    custoBruto?: number,
    movimento?: Movimento,
    tipoDeMovimento?: any,
    idOrigem?: number,
    tipoOrigemMovimento?: any,
}
