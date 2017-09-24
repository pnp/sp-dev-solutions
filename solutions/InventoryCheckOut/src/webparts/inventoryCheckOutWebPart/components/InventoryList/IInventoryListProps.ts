import { IInventoryItem } from "../../models/InventoryCheckOutModel";

interface IInventoryListProps {
    myCheckoutItems:IInventoryItem[];
    allItems:IInventoryItem[];    
    onClickEvent:any;
}

export default IInventoryListProps;