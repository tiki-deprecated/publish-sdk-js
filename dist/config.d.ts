import { Offer } from "./ui/offer";
import { Theme } from "./ui/theme";
import { LicenseRecord } from "./license-record";
export declare class Config {
    _isAcceptEndingDisabled: boolean;
    _isDeclineEndingDisabled: boolean;
    _onAccept: (offer: Offer, license: LicenseRecord) => void | undefined;
    _onDecline: (offer: Offer, license?: LicenseRecord) => void | undefined;
    _onSettings: () => void | undefined;
    _offers: Array<Offer>;
    _theme: Theme;
    _dark: Theme | undefined;
    get theme(): Theme;
    get dark(): Theme;
    get offer(): Offer;
    addOffer(offer: Offer): Config;
    disableAcceptEnding(isDisabled?: boolean): Config;
    disableDeclineEnding(isDisabled?: boolean): Config;
    onAccept(callback: (offer: Offer) => void): Config;
    onDecline(callback: (offer: Offer) => void): Config;
    onSettings(callback: () => void): Config;
    initialize(publishingId: string, id: string, origin?: string): Promise<void>;
    get activeTheme(): Theme;
}
