import HubLinksWebPart from '../HubLinks';
import { IHubLinksLayout, HubLinksLayout } from './HubLinksLayout';
import BasicGroupedListLayout from './GroupedListLayout/BasicGroupedListLayout';
import AdvancedGroupedListLayout from './GroupedListLayout/AdvancedGroupedListLayout';
import BasicItemLayout from './ItemLayout/BasicItemLayout';
import AdvancedItemLayout from './ItemLayout/AdvancedItemLayout';
import BasicListLayout from './ListLayout/BasicListLayout';
import AdvancedListLayout from './ListLayout/AdvancedListLayout';
import BasicIconLeftLayout from './IconLeftLayout/BasicIconLeftLayout';
import AdvancedIconLeftLayout from './IconLeftLayout/AdvancedIconLeftLayout';

export default class FeaturedContentFactory{
    public static getLayout(layout:HubLinksLayout, isAdvancedMode:boolean, webPart: HubLinksWebPart):IHubLinksLayout{
        if(!isAdvancedMode){
            switch(layout){
                case HubLinksLayout.GroupedListLayout: return new BasicGroupedListLayout(webPart);
                case HubLinksLayout.ItemLayout: return new BasicItemLayout(webPart);
                case HubLinksLayout.IconLeftLayout: return new BasicIconLeftLayout(webPart);
                default: return new BasicListLayout(webPart);
            }
        }
        else{
            switch(layout){
                case HubLinksLayout.GroupedListLayout: return new AdvancedGroupedListLayout(webPart);
                case HubLinksLayout.ItemLayout: return new AdvancedItemLayout(webPart);
                case HubLinksLayout.IconLeftLayout: return new AdvancedIconLeftLayout(webPart);
                default: return new AdvancedListLayout(webPart);
            }
        }
    }
}