import "./terms.css";
interface Style {
    backgroundColor: string;
    borderColor: string;
    fontFamily: string;
    textColor: string;
}
interface Terms {
    value: string;
    isHtml?: boolean;
}
export declare function create(terms: Terms, onAccept: () => void, onBack: () => void, style?: Style): HTMLDivElement;
export {};
