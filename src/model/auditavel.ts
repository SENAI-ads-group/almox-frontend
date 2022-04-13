export interface Auditavel {
    dataCriacao?: Date;
    dataAlteracao?: Date;
    dataExclusao?: Date;
    excluido?: boolean;
    criadoPor?: UsuarioAutor;
    alteradoPor?: UsuarioAutor;
    excluidoPor?: UsuarioAutor;
    situacao?: any;
}

interface UsuarioAutor {
    id?: number;
    nome?: string;
}
