/**
 * Defines informationa about a SharePoint search managed property 
 */
export default interface IManagedPropertyInfo {

    /**
     * The name of the search managed property
     */
    name: string;

    /**
     * Indicates if the managed property is sortable or not
     */
    sortable?: boolean;
}