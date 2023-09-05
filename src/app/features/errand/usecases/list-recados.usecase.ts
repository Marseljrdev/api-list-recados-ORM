import { StatusErrand } from "../../../models/errand";
import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { Response } from "../../../shared/utils/response.adapter";
import { ErrandRepository } from "../repositories/errand.repository";

interface ListParams {
    userId: string,
    type: any
}

export class ListRecadosUseCase implements UseCase {
    public async execute(params: ListParams): Promise<Result>{
        let errands = await new ErrandRepository().listErrands({
            userId: params.userId,
            type: params.type as StatusErrand,
          });

          if(!errands){
            return Response.notFound("Recados");
          }

          return Response.success("Recados listed was successfully", errands);
    }
}