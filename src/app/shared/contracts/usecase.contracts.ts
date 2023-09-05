import { Result } from "./result.contracts";

export interface UseCase {
    execute: (params?: any) => Promise<Result>;
}