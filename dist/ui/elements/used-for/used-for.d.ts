import "./used-for.css";
import { Bullet } from "../../bullet";
interface Style {
    titleColor?: string;
    textColor?: string;
    fontFamily?: string;
}
export declare function create(bullets: Array<Bullet>, style?: Style): HTMLDivElement;
export {};
