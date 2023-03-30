import "./terms.css";
import { Theme } from "../../theme";
interface Terms {
    value: string;
    isHtml?: boolean;
}
export declare function create(terms: Terms, onAccept: () => void, onBack: () => void, theme?: Theme): HTMLDivElement;
export {};
