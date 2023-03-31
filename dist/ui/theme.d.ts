import { Config } from "../config";
/**
 * The theme for pre-built UIs.
 *
 * The pre-built UI styles are defined by a `Theme` object. To configure a theme,
 * chain calls to the `config()` method.
 *
 * @example
 * ```ts
 * TikiSdk.config()
 *     .theme
 *         .primaryTextColor('#000000')
 *         .primaryBackgroundColor('#FFFFFF')
 *         .accentColor('blue')
 *         .fontFamily('"Space Grotesk", sans-serif')
 * ```
 */
export declare class Theme {
    private readonly _config;
    /**
     * @hidden
     */
    _fontFamily: string;
    /**
     * @hidden
     */
    _primaryTextColor: string;
    /**
     * @hidden
     */
    _secondaryTextColor: string;
    /**
     * @hidden
     */
    _primaryBackgroundColor: string;
    /**
     * @hidden
     */
    _secondaryBackgroundColor: string;
    /**
     * @hidden
     */
    _accentColor: string;
    /**
     * Create a new Theme object
     *
     * @param config - The optional {@link Config} object to attach this Theme to. Required for {@link and}.
     */
    constructor(config?: Config);
    /**
     * Set the CSS font family
     *
     * @param val - The font family to use
     */
    fontFamily(val: string): Theme;
    /**
     * Set the primary text CSS color
     *
     * @param color - The color to use
     */
    primaryTextColor(color: string): Theme;
    /**
     * Set the secondary text CSS color
     *
     * @param color - The color to use
     */
    secondaryTextColor(color: string): Theme;
    /**
     * Set the primary background CSS color
     *
     * @param color - The color to use
     */
    primaryBackgroundColor(color: string): Theme;
    /**
     * Set the secondary background CSS color
     *
     * @param color - The color to use
     */
    secondaryBackgroundColor(color: string): Theme;
    /**
     * Set the accent CSS color
     *
     * @param color - The color to use
     */
    accentColor(color: string): Theme;
    /**
     * Use to return to parent {@link Config} object for chaining
     *
     * @example
     * ```ts
     * TikiSdk.config()
     *     .theme
     *         .primaryTextColor('#000000')
     *         .primaryBackgroundColor('#FFFFFF')
     *         .accentColor('blue')
     *         .fontFamily('"Space Grotesk", sans-serif')
     *         .and()
     *     .dark
     *         .primaryTextColor('#FFFFFF')
     *         .primaryBackgroundColor('#000000')
     * ```
     */
    and(): Config;
}
