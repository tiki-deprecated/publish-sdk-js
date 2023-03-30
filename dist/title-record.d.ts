import { TitleTag } from "./title-tag";
export interface TitleRecord {
    id: string;
    hashedPtr: string;
    origin?: string;
    tags: Array<TitleTag>;
    description?: string;
}
