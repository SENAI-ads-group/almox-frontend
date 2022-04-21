import DepartamentoModel from "./departamento"
import { Auditavel } from "./auditavel";

export interface Operador extends Auditavel {
    id?: number;
    username?: string;
    email?: string;
    tipoOperador?: any;
    departamentos?: Departamento[];
}
