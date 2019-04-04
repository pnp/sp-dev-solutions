import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import { DynamicProperty } from '@microsoft/sp-component-base';
import { ISortFieldConfiguration } from '../../models/ISortFieldConfiguration';
import ISortableFieldConfiguration from '../../models/ISortableFieldConfiguration';
import { ISearchResultType } from '../../models/ISearchResultType';
import { ICustomTemplateFieldValue } from '../../services/ResultService/ResultService';
import { ISynonymFieldConfiguration} from '../../models/ISynonymFieldConfiguration';

export interface ISearchResultsWebPartProps {
    queryKeywords: DynamicProperty<string>;
    defaultSearchQuery: string;
    useDefaultSearchQuery: boolean;
    queryTemplate: string;
    resultSourceId: string;
    sortList: ISortFieldConfiguration[];
    enableQueryRules: boolean;
    maxResultsCount: number;
    selectedProperties: string;
    sortableFields: ISortableFieldConfiguration[];
    showPaging: boolean;
    showResultsCount: boolean;
    showBlank: boolean;
    selectedLayout: ResultsLayoutOption;
    externalTemplateUrl: string;
    inlineTemplateText: string;
    webPartTitle: string;
    resultTypes: ISearchResultType[];
    sourceId: string;
    propertyId: string;
    propertyPath: string;
    rendererId: string;
    customTemplateFieldValues: ICustomTemplateFieldValue[];
    enableLocalization: boolean;
    useRefiners: boolean;
    refinerDataSourceReference: string;
    paginationDataSourceReference: string;
    synonymList: ISynonymFieldConfiguration[];

}
