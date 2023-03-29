import { LicenseUse } from "../../license-use";
import { TitleTag } from "../../title-tag";
import { Bullet } from "./bullet";
export interface Offer {
    id: string;
    ptr?: string;
    description?: string;
    terms?: string;
    reward?: string;
    bullets?: Array<Bullet>;
    uses?: Array<LicenseUse>;
    tags?: Array<TitleTag>;
    expiry?: Date;
}
