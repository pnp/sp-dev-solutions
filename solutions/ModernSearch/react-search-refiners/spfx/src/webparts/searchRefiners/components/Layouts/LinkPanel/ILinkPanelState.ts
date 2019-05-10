import { IRefinementValue } from "../../../../../models/ISearchResult";
import { IGroup } from "office-ui-fabric-react/lib/components/GroupedList";

interface ILinkPanelState {
    showPanel?: boolean;
    groups?: IGroup[];
    items?: JSX.Element[];
}

export default ILinkPanelState;