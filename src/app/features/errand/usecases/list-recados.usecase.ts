import { StatusErrand } from "../../../models/errand";
import { Result } from "../../../shared/contracts/result.contracts";
import { UseCase } from "../../../shared/contracts/usecase.contracts";
import { RedisRepository } from "../../../shared/database/repositories/redis.repository";
import { Response } from "../../../shared/utils/response.adapter";
import { ErrandRepository } from "../repositories/errand.repository";

interface ListParams {
    userId: string,
    type: any
}

export class ListRecadosUseCase implements UseCase {
    public async execute(params: ListParams): Promise<Result>{

        const cacheRepository = new RedisRepository();
        const cachedErrands = cacheRepository.get(`recados-${params.userId}`);
      
        if(cachedErrands){
          return Response.success("Recados listado com sucesso", cachedErrands);
        }

        
        let errands = await new ErrandRepository().listErrands({
            userId: params.userId,
            type: params.type as StatusErrand,
          });

          if(!errands){
            return Response.notFound("Recados");
          }

          const errandsStringfy = JSON.stringify(errands);

          await cacheRepository.set(`recados-${params.userId}`, errandsStringfy);

          return Response.success("Recados listed was successfully", errandsStringfy);
    }
}