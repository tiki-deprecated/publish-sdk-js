declare class LicenseUsecase {
    private readonly _value;
    private constructor();
    get value(): string;
    static custom(value: string): LicenseUsecase;
    static from(value: string): LicenseUsecase;
    static attribution(): LicenseUsecase;
    static retargeting(): LicenseUsecase;
    static personalization(): LicenseUsecase;
    static aiTraining(): LicenseUsecase;
    static distribution(): LicenseUsecase;
    static analytics(): LicenseUsecase;
    static support(): LicenseUsecase;
}
