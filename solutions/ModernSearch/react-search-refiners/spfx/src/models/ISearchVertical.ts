export interface ISearchVertical {
    /**
     * Unique key for the vertical
     */
    key: string;

    /**
     * The query template corresponding to the vertical
     */
    queryTemplate: string;

    /**
     * The result source id corresponding to the vertical
     */
    resultSourceId: string;

    /**
     * The vertical tab name
     */
    tabName: string;

    /**
     * The Office UI Fabric icon name
     */
    iconName?: string;

    /**
     * The result count for this vertical
     */
    count?: number;
}