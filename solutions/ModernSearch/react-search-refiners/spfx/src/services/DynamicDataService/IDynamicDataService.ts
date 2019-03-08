import { DynamicProperty, DynamicDataProvider } from "@microsoft/sp-component-base";

export default interface IDynamicDataService {
    getDataSourceValue<TValue>(dynamicDataProvider: DynamicDataProvider, dynamicProperty: DynamicProperty<TValue>, sourceId: string, propertyId: string, propertyPath: string): TValue;
    getDataSourceValues<TValue>(dynamicDataProvider: DynamicDataProvider, dynamicProperty: DynamicProperty<TValue>, sourceId: string, propertyId: string, propertyPath: string): TValue[];
}