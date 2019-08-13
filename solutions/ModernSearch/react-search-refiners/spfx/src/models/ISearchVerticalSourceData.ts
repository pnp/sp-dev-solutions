import { ISearchVertical } from "./ISearchVertical";

interface ISearchVerticalSourceData {
    /**
     * The current selected vertical
     */
    selectedVertical: ISearchVertical;

    /**
     * The serch verticals configuration. Used to determnine counts for other tabs.
     */
    verticalsConfiguration: ISearchVertical[];

    /**
     * Indicates if we should display counts for each tab
     */
    showCounts: boolean;
}

export default ISearchVerticalSourceData;