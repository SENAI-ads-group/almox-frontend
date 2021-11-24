export interface PaginaBuscaCrud<T> {
    onBuscar(filtro: any): void;
    onVisualizar(registro: T): void;
    onEditar(registro: T): void;
    onExcluir(registro: T): void;
}
