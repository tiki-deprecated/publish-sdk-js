import "./offer-card.css";
interface Style {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
}
interface Img {
    src: string;
    alt?: string;
}
export declare function create(img: Img, text: string, style?: Style): HTMLDivElement;
export {};
