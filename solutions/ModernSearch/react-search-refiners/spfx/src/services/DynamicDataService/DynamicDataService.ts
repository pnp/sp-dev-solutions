import IDynamicDataService from "./IDynamicDataService";
import { DynamicProperty, DynamicDataProvider } from "@microsoft/sp-component-base";
import { IDynamicDataSource } from "@microsoft/sp-dynamic-data";
import IDataSourceProperty from "../../models/IDataSourceProperty";

export class DynamicDataService implements IDynamicDataService {

    private _dynamicDataProvider: DynamicDataProvider;

    constructor(dynamicDataProvider: DynamicDataProvider) {
        this._dynamicDataProvider = dynamicDataProvider;
    }

    public getDataSourceValue<TValue>(dynamicProperty: DynamicProperty<TValue>, sourceId: string, propertyId: string, propertyPath: string): TValue {
        let dataSourceValue: TValue;
        let source = dynamicProperty.tryGetSource();

        // Try to get the source if a source ID is present
        // We need to do this check to avoid timing issues regarding data sources reconenction
        if (!source && sourceId) {
            source = this._dynamicDataProvider.tryGetSource(sourceId);

            if (source && propertyId) {
                dataSourceValue = source.getPropertyValue(propertyId)[propertyPath];
            }

        } else {
            dataSourceValue = dynamicProperty.tryGetValue();
        }

        return dataSourceValue;
    }    
    
    public getDataSourceValues<TValue>(dynamicProperty: DynamicProperty<TValue>, sourceId: string, propertyId: string, propertyPath: string): TValue[] {
        let dataSourceValue: TValue[];
        let source = dynamicProperty.tryGetSource();

        // Try to get the source if a source ID is present
        // We need to do this check to avoid timing issues regarding data sources reconenction
        if (!source && sourceId) {
            source = this._dynamicDataProvider.tryGetSource(sourceId);

            if (source && propertyId) {
                dataSourceValue = source.getPropertyValue(propertyId)[propertyPath];
            }

        } else {
            dataSourceValue = dynamicProperty.tryGetValues();
        }

        return dataSourceValue;
    }

    
    /**
     * Get available data sources on the page with specific property Id (i.e. corresponding to the underlying component type)
     */
    public getAvailableDataSourcesByType(propertyId: string): IDataSourceProperty[] {
        let propertyOptions: IDataSourceProperty[] = [];

        this._dynamicDataProvider.getAvailableSources().map((sourceInfo) => {
            const source: IDynamicDataSource = this._dynamicDataProvider.tryGetSource(sourceInfo.id);
            if (source) {
                source.getPropertyDefinitions().map(prop => {
                    if (prop.id === propertyId) {
                        propertyOptions.push({
                            key: `${source.id}:${prop.id}`,
                            text: prop.title
                        });
                    }
                });
            }
        });

        return propertyOptions;
    }
}