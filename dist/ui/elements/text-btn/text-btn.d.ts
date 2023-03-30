import "./text-btn.css";
interface Style {
    outlineColor?: string;
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
}
export declare function create(text: string, onClick: () => void, style?: Style): HTMLButtonElement;
export {};
