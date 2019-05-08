import { ChangeType } from "./IChangeQuery";

export default interface IChangeItem {

    /**
     * The change token
     */
    ChangeToken: {
        StringValue: string;
    }

    /**
     * The change type (Add, Delete, etc.)
     */
    ChangeType: ChangeType;

    /**
     * List item ID
     */
    ItemId: number;

    /**
     * Item properties
     */
    [key: string]: any;
}