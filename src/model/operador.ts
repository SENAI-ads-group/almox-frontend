import { Pessoa } from './pessoa'

export default interface OperadorModel {
    id: string,
    funcoes: string[],
    pessoa: Pessoa
}
