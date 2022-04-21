export const FiltroStatusAuditoria = Object.freeze({
    TODOS: {
        type: "CONSIDERAR_TODOS",
        descricao: "Considerar Todos",
        valor: null,
    },
    APENAS_ATIVOS: {
        type: "APENAS_ATIVOS",
        descricao: "Considerar Apenas Ativos",
        valor: true,
    },
    APENAS_EXCLUIDOS: {
        type: "APENAS_EXCLUIDOS",
        descricao: "Considerar Apenas Excluídos",
        valor: false,
    },
    resolverSelecaoConsideracao(consideracao: any) {
        if (consideracao == null) return FiltroStatusAuditoria.TODOS;
        if (!!consideracao) return FiltroStatusAuditoria.APENAS_ATIVOS;
        if (!consideracao) return FiltroStatusAuditoria.APENAS_EXCLUIDOS;
        return undefined;
    },
});
