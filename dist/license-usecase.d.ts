/**
 * A use case for a license, describing how an asset may be used.
 *
 * Use cases explicitly define how an asset may be used. Use either our list of common enumerations or define your
 * own using {@link LicenseUsecase.custom}. Custom use cases can be created by using a value that does not match
 * any of the predefined cases.
 */
export declare class LicenseUsecase {
    private readonly _value;
    private constructor();
    /**
     * The string value of the use case.
     */
    get value(): string;
    /**
     * Define a custom use case.
     *
     * The resulting {@link value} is `custom:<usecase>`
     *
     * @param value - your custom use case
     */
    static custom(value: string): LicenseUsecase;
    /**
     * Create a new LicenseUsecase from a string value
     *
     * Attempts to resolve to one of our standard enumerated values. If it does not match,
     * a custom usecase is created.
     *
     * @param value - The string value to resolve
     */
    static from(value: string): LicenseUsecase;
    /**
     * Attribution: determine the actions that led to an outcome
     */
    static attribution(): LicenseUsecase;
    /**
     * Retargeting: advertise to and reach users, often on other platforms
     */
    static retargeting(): LicenseUsecase;
    /**
     * Personalization: tailor messaging, offers, features, etc., to an individual
     */
    static personalization(): LicenseUsecase;
    /**
     * AI Training: train machine learning models with user data
     */
    static aiTraining(): LicenseUsecase;
    /**
     * Distribution: distribute/relicense data, insights, signals, etc., to 3rd-parties
     */
    static distribution(): LicenseUsecase;
    /**
     * Analytics: extract insights and signals from user data
     */
    static analytics(): LicenseUsecase;
    /**
     * Support: Add user data into customer support processes
     */
    static support(): LicenseUsecase;
}
