import BaseTemplateService from                    './BaseTemplateService';
import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import { ISearchResultsWebPartProps } from '../../webparts/searchResults/ISearchResultsWebPartProps';
import { IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import { TemplateService } from './TemplateService';
import MockSearchService from '../SearchService/MockSearchService';
import { IPropertyPaneField } from '@microsoft/sp-property-pane';

class MockTemplateService extends BaseTemplateService {
    constructor(locale: string) {
        super();    
        this.CurrentLocale = locale;
    }

    private readonly _mockFileContent: string = require('./templates/layouts/mock.html');

    public getFileContent(fileUrl: string): Promise<string> {

        const p1 = new Promise<string>((resolve) => {
            setTimeout(() => {
                resolve(this._mockFileContent);
            }, 1000);
        });

        return p1;
    }

    public ensureFileResolves(fileUrl: string): Promise<void> {
        return Promise.resolve();
    }

    public getTemplateParameters(layout: ResultsLayoutOption, properties: ISearchResultsWebPartProps, onUpdateAvailableProperties?: (properties: IComboBoxOption[]) => void, availableProperties?: IComboBoxOption[]): IPropertyPaneField<any>[] {
        
        const templateService = new TemplateService(null, this.CurrentLocale, new MockSearchService());
        return templateService.getTemplateParameters(layout, properties, onUpdateAvailableProperties);
    }
}

export default MockTemplateService;