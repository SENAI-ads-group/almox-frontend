import { Injectable } from "@angular/core";
import { Requisicao } from "src/app/model/requisicao";

import { StepMergeService } from "../../shared/services/step-merge.service";

@Injectable({
    providedIn: "root",
})
export class RequisicaoStepMergeService extends StepMergeService<Requisicao> {
    constructor() {
        super({
            dataRequisicao: new Date(),
            itens: [],
        });
    }
}
