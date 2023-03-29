import "./offer-prompt.css";
import { Offer } from "../../offer";
interface Style {
    backgroundColor: string;
    fontFamily: string;
}
export declare function create(offer: Offer, onAccept: (offer: Offer) => void, onDecline: (offer: Offer) => void, onLearnMore: () => void, style?: Style): HTMLDivElement;
export {};
