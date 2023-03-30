import { Config } from "../config";
export declare class Theme {
    private readonly _config;
    _fontFamily: string;
    _primaryTextColor: string;
    _secondaryTextColor: string;
    _primaryBackgroundColor: string;
    _secondaryBackgroundColor: string;
    _accentColor: string;
    constructor(config?: Config);
    fontFamily(val: string): Theme;
    primaryTextColor(color: string): Theme;
    secondaryTextColor(color: string): Theme;
    primaryBackgroundColor(color: string): Theme;
    secondaryBackgroundColor(color: string): Theme;
    accentColor(color: string): Theme;
    and(): Config;
}
