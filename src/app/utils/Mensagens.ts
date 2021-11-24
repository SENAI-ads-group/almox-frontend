import { Message } from "primeng/api";
export class Mensagens {
    static readonly SUCESSO_REGISTRO_SALVO: Message = {
        severity: "success",
        key: "notification",
        summary: "Sucesso",
        detail: "Registro Salvo com Sucesso!",
        life: 1500,
    };
}
