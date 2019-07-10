import IFilterLayoutProps from "../IFilterLayoutProps";
import { IRefinementValue } from "../../../../../models/ISearchResult";

interface ILinkPanelProps extends IFilterLayoutProps {
    selectedFilterValues: IRefinementValue[];
}
  
export default ILinkPanelProps;