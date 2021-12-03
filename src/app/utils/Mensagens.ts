import { Message } from "primeng/api";
export class Mensagens {
    static readonly SUCESSO_REGISTRO_SALVO: Message = {
        severity: "success",
        key: "notification",
        summary: "Sucesso",
        detail: "Registro Salvo com Sucesso!",
        life: 1500,
    };

    static readonly SUCESSO_PRODUTO_ADICIONADO: Message = {
        severity: "success",
        key: "notification",
        summary: "Sucesso",
        detail: "Produto Adicionado com Sucesso!",
        life: 1500,
    };

    static readonly SUCESSO_PRODUTO_ATUALIZADO: Message = {
        severity: "success",
        key: "notification",
        summary: "Sucesso",
        detail: "Produto Atualizado com Sucesso!",
        life: 1500,
    };
}
