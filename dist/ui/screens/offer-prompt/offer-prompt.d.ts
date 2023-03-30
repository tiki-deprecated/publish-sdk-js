import "./offer-prompt.css";
import { Offer } from "../../offer";
import { Theme } from "../../theme";
export declare function create(offer: Offer, onAccept: (offer: Offer) => void, onDecline: (offer: Offer) => void, onLearnMore: () => void, theme?: Theme): HTMLDivElement;
