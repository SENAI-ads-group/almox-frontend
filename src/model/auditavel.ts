export interface Auditavel {
    dataCriacao?: Date;
    dataAlteracao?: Date;
    dataExclusao?: Date;
    excluido?: boolean;
    criadoPor?: OperadorAutor;
    alteradoPor?: OperadorAutor;
    excluidoPor?: OperadorAutor;
    situacao?: any;
}

interface OperadorAutor {
    id?: number;
    nome?: string;
}
