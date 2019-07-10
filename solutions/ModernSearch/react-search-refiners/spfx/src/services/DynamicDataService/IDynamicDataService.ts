import { DynamicProperty } from "@microsoft/sp-component-base";
import IDataSourceProperty from "../../models/IDataSourceProperty";

export default interface IDynamicDataService {
    getDataSourceValue<TValue>(dynamicProperty: DynamicProperty<TValue>, sourceId: string, propertyId: string, propertyPath: string): TValue;
    getDataSourceValues<TValue>(dynamicProperty: DynamicProperty<TValue>, sourceId: string, propertyId: string, propertyPath: string): TValue[];
    getAvailableDataSourcesByType(propertyId: string): IDataSourceProperty[];
}