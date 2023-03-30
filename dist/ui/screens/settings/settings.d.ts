import "./settings.css";
import { Offer } from "../../offer";
import { Theme } from "../../theme";
export declare function create(offer: Offer, isOptIn: boolean, onBack: () => void, onLearnMore: () => void, onOpt: () => void, theme?: Theme): HTMLDivElement;
