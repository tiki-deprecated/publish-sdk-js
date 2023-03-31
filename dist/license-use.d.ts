import { LicenseUsecase } from "./license-usecase";
/**
 * LicenseUse defines explicit uses for an asset, which are extremely helpful in programmatic search
 * and enforcement of your {@link LicenseRecord}s.
 */
export interface LicenseUse {
    /**
     * Usecases explicitly define HOW an asset may be used. You can either use a list of common enumerations or
     * define your own using {@link LicenseUsecase.custom}.
     */
    usecases: Array<LicenseUsecase>;
    /**
     * Destinations explicitly define WHO can use an asset. Destinations can be a wildcard URL (*.your-co.com),
     * a string defining a category of companies, or more. You may use ECMAScript Regex to specify flexible
     * and easily enforceable rules.
     *
     * When using ECMAScript Regex make sure to *you escape your tokens**) (e.g. `'\\.mytiki\\.com'`)
     */
    destinations?: Array<string>;
}
