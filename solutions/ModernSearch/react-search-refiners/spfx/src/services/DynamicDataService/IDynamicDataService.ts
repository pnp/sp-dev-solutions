import { DynamicProperty } from "@microsoft/sp-component-base";

export default interface IDynamicDataService {
    getDataSourceValue<TValue>(dynamicProperty: DynamicProperty<TValue>, sourceId: string, propertyId: string, propertyPath: string): TValue;
    getDataSourceValues<TValue>(dynamicProperty: DynamicProperty<TValue>, sourceId: string, propertyId: string, propertyPath: string): TValue[];
}