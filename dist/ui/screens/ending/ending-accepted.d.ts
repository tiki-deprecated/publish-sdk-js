interface Style {
    backgroundColor: string;
    fontFamily: string;
    titleColor: string;
    textColor: string;
}
export declare function create(onSettings?: () => void, style?: Style): HTMLDivElement;
export {};
