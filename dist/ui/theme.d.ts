import { Config } from "../config";
export declare const CSS_VAR_FONT_FAMILY = "var(--tiki-font-family)";
export declare const CSS_VAR_PRIMARY_TEXT_COLOR = "var(--tiki-primary-text-color)";
export declare const CSS_VAR_SECONDARY_TEXT_COLOR = "var(--tiki-secondary-text-color)";
export declare const CSS_VAR_PRIMARY_BACKGROUND_COLOR = "var(--tiki-primary-background-color)";
export declare const CSS_VAR_SECONDARY_BACKGROUND_COLOR = "var(--tiki-secondary-background-color)";
export declare const CSS_VAR_ACCENT_COLOR = "var(--tiki-accent-color)";
export declare class Theme {
    private readonly _config;
    private _fontFamily;
    private _primaryTextColor;
    private _secondaryTextColor;
    private _primaryBackgroundColor;
    private _secondaryBackgroundColor;
    private _accentColor;
    constructor(config: Config);
    fontFamily(val: string): Theme;
    primaryTextColor(color: string): Theme;
    secondaryTextColor(color: string): Theme;
    primaryBackgroundColor(color: string): Theme;
    secondaryBackgroundColor(color: string): Theme;
    accentColor(color: string): Theme;
    and(): Config;
}
