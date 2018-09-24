import HubLinksWebPart from '../HubLinks';
import { IHubLinksLayout, HubLinksLayout } from './HubLinksLayout';
import BasicGroupedListLayout from './GroupedListLayout/BasicGroupedListLayout';
import AdvancedGroupedListLayout from './GroupedListLayout/AdvancedGroupedListLayout';
import BasicRoundIconItemLayout from './RoundIconItemLayout/BasicRoundIconItemLayout';
import AdvancedRoundIconItemLayout from './RoundIconItemLayout/AdvancedRoundIconItemLayout';
import BasicListLayout from './ListLayout/BasicListLayout';
import AdvancedListLayout from './ListLayout/AdvancedListLayout';
import BasicSquareIconItemLayout from './SquareIconItemLayout/BasicSquareIconItemLayout';
import BasicTileLayout from './TileLayout/BasicTileLayout';
import AdvancedSquareIconItemLayout from './SquareIconItemLayout/AdvancedSquareIconItemLayout';
import AdvancedTileLayout from './TileLayout/AdvancedTileLayout';

export default class FeaturedContentFactory{
    public static getLayout(layout:HubLinksLayout, isAdvancedMode:boolean, webPart: HubLinksWebPart):IHubLinksLayout{
        if(!isAdvancedMode){
            switch(layout){
                case HubLinksLayout.GroupedListLayout: return new BasicGroupedListLayout(webPart);
                case HubLinksLayout.RoundIconItemLayout: return new BasicRoundIconItemLayout(webPart);
                case HubLinksLayout.SquareIconItemLayout: return new BasicSquareIconItemLayout(webPart);
                case HubLinksLayout.TileLayout: return new BasicTileLayout(webPart);
                default: return new BasicListLayout(webPart);
            }
        }
        else{
            switch(layout){
                case HubLinksLayout.GroupedListLayout: return new AdvancedGroupedListLayout(webPart);
                case HubLinksLayout.RoundIconItemLayout: return new AdvancedRoundIconItemLayout(webPart);
                case HubLinksLayout.SquareIconItemLayout: return new AdvancedSquareIconItemLayout(webPart);
                case HubLinksLayout.TileLayout: return new AdvancedTileLayout(webPart);
                default: return new AdvancedListLayout(webPart);
            }
        }
    }
}