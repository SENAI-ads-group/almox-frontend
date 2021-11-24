import { Injectable } from "@angular/core";
import { Requisicao } from "src/app/model/requisicao";

import { StepMergeService } from "../../shared/services/step-merge.service";

@Injectable({
    providedIn: "root",
})
export class RequisicaoStepMergeService extends StepMergeService<Requisicao> {
    constructor() {
        super({ dataRequisicao: new Date(), itens: [
            {
                id: 1,
                produto: {
                    id: 1,
                    descricao: "Escova de Dente",
                    codigoBarras: "1HHY212JEENNXXIYUY",
                    custoMedio: 130.0,
                },
                statusItemRequisicao: "Entregue",
                quantidade: 5,
            },

            {
                id: 2,
                produto: {
                    id: 2,
                    descricao: "Escova de Cabelo",
                    codigoBarras: "1HHY212JEENNXXIYUY",
                    custoMedio: 130.0,
                },
                statusItemRequisicao: "Entregue",
                quantidade: 6,
            },
        ] });
    }
}
