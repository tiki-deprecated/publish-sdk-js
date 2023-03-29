import { LicenseUsecase } from "./license-usecase";
export interface LicenseUse {
    usecases: Array<LicenseUsecase>;
    destinations?: Array<string>;
}
