import "./offer-prompt.css";
import { Offer } from "../offer";
export declare function create(offer: Offer, onAccept: (offer: Offer) => void, onDecline: (offer: Offer) => void, onLearnMore: () => void): HTMLDivElement;
