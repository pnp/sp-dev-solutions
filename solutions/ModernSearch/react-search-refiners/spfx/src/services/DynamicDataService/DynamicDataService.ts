import IDynamicDataService from "./IDynamicDataService";
import { DynamicProperty, DynamicDataProvider } from "@microsoft/sp-component-base";

export class DynamicDataService implements IDynamicDataService {
    public getDataSourceValue<TValue>(dynamicDataProvider: DynamicDataProvider, dynamicProperty: DynamicProperty<TValue>, sourceId: string, propertyId: string, propertyPath: string): TValue {
        let dataSourceValue: TValue;
        let source = dynamicProperty.tryGetSource();

        // Try to get the source if a source ID is present
        // We need to do this check to avoid timing issues regarding data sources reconenction
        if (!source && sourceId) {
            source = dynamicDataProvider.tryGetSource(sourceId);

            if (source && propertyId) {
                dataSourceValue = source.getPropertyValue(propertyId)[propertyPath];
            }

        } else {
            dataSourceValue = dynamicProperty.tryGetValue();
        }

        return dataSourceValue;
    }    
    
    public getDataSourceValues<TValue>(dynamicDataProvider: DynamicDataProvider, dynamicProperty: DynamicProperty<TValue>, sourceId: string, propertyId: string, propertyPath: string): TValue[] {
        let dataSourceValue: TValue[];
        let source = dynamicProperty.tryGetSource();

        // Try to get the source if a source ID is present
        // We need to do this check to avoid timing issues regarding data sources reconenction
        if (!source && sourceId) {
            source = dynamicDataProvider.tryGetSource(sourceId);

            if (source && propertyId) {
                dataSourceValue = source.getPropertyValue(propertyId)[propertyPath];
            }

        } else {
            dataSourceValue = dynamicProperty.tryGetValues();
        }

        return dataSourceValue;
    }
}