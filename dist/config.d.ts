import { Offer } from "./ui/offer";
import { Theme } from "./ui/theme";
export declare class Config {
    _isAcceptEndingDisabled: boolean;
    _isDeclineEndingDisabled: boolean;
    _onAccept: () => any;
    _onDecline: () => any;
    _onSettings: () => any;
    _offers: Array<Offer>;
    _theme: Theme;
    _dark: Theme | undefined;
    get theme(): Theme;
    get dark(): Theme;
    get offer(): Offer;
    addOffer(offer: Offer): Config;
    disableAcceptEnding(isDisabled?: boolean): Config;
    disableDeclineEnding(isDisabled?: boolean): Config;
    onAccept(callback: () => void): Config;
    onDecline(callback: () => void): Config;
    onSettings(callback: () => void): Config;
    initialize(publishingId: string, id: string, origin?: string): Promise<void>;
    get activeTheme(): Theme;
}
