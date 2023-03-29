import { LicenseUse } from "../license-use";
import { TitleTag } from "../title-tag";
import { Bullet } from "./bullet";
import { Config } from "../config";
export declare class Offer {
    private readonly _id;
    private readonly _config;
    _ptr?: string;
    _description?: string;
    _terms?: string;
    _reward?: string;
    _bullets?: Array<Bullet>;
    _uses?: Array<LicenseUse>;
    _tags?: Array<TitleTag>;
    _expiry?: Date;
    constructor(config: Config);
    get id(): string;
    ptr(val: string): Offer;
    description(val: string): Offer;
    terms(val: string): Offer;
    reward(src: string): Offer;
    bullet(val: Bullet): Offer;
    use(val: LicenseUse): Offer;
    tag(val: TitleTag): Offer;
    duration(seconds: number): Offer;
    add(): Config;
}
