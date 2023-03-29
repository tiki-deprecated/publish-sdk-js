import "./settings.css";
import { Offer } from "../../offer";
interface Style {
    backgroundColor: string;
    fontFamily: string;
    termsBackgroundColor: string;
    termsTextColor: string;
    accentColor: string;
}
export declare function create(offer: Offer, onBack: () => void, onLearnMore: () => void, style?: Style): HTMLDivElement;
export {};
