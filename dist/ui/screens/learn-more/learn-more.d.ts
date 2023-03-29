import "./learn-more.css";
interface Style {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
}
export declare function create(onBack: () => void, style?: Style): HTMLDivElement;
export {};
