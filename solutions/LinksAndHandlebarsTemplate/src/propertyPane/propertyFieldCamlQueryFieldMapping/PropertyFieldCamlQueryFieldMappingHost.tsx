/**
 * @file PropertyFieldCamlQueryHost.tsx
 * Renders the controls for PropertyFieldCamlQuery component
 *
 * @copyright 2017 Shire
 * Released under MIT licence
 *
 * Uses the PropertyFieldSPListQueryHost by Olivier Carpentier
 *
 */
import * as React from 'react';

import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import "@pnp/sp/views";
import { Logger, LogLevel } from "@pnp/logging";
import { hOP } from "@pnp/common";

import {
  IPropertyFieldCamlQueryFieldMappingPropsInternal,
  IField,
  IList,
  ISort,
  SortDirection,
  IMapping,
  SPFieldType,
  SPFieldRequiredLevel
} from './PropertyFieldCamlQueryFieldMapping';
import { Async, Dropdown, IDropdownOption, Label, Slider, TextField, Button, ButtonType, CommandButton, Spinner, SpinnerType, Dialog, DialogType } from 'office-ui-fabric-react';

import styles from "../PropertyFields.module.scss";
import * as strings from 'propertyFieldStrings';
import { Caml, CamlBuilder } from '../../utilities/caml/camljs';
import { List } from 'linqts';

/**
 * @interface
 * PropertyFieldCamlQueryHost properties interface
 *
 */
export interface IPropertyFieldCamlQueryFieldMappingHostProps extends IPropertyFieldCamlQueryFieldMappingPropsInternal {
}

export interface IFilter {
  field?: string;
  fieldKind?: number;
  operator?: string;
  value?: string;
}


export interface IPropertyFieldCamlQueryFieldMappingHostState {
  lists: IList[];
  fields: List<IField>;
  arranged: IDropdownOption[];
  selectedList?: IList;
  sort?: ISort;
  max?: number;
  operators?: IDropdownOption[];
  filters?: IFilter[];
  filterType: string;
  fieldMappings?: IMapping[];
  errorMessage?: string;
  loadedList: boolean;
  loadedFields: boolean;
  isCreateOpen: boolean;
  newListTitle: string;
}

/**
 * @class
 * Renders the controls for PropertyFieldCamlQuery component
 */
export default class PropertyFieldCamlQueryFieldMappingHost extends React.Component<IPropertyFieldCamlQueryFieldMappingHostProps, IPropertyFieldCamlQueryFieldMappingHostState> {
  private LOG_SOURCE = "PropertyFieldCamlQueryFieldMappingHost";

  private latestValidateValue: string;
  //private latestMappingValidateValue: IMapping[];
  private async: Async;
  private delayedValidate: (value: string) => void;
  //private delayedMappingValidate: (value: IMapping[]) => void;

  private _stateCopy: IPropertyFieldCamlQueryFieldMappingHostState;
  public get stateCopy() {
    return this._stateCopy;
  }
  public set stateCopy(value: IPropertyFieldCamlQueryFieldMappingHostState) {
    this._stateCopy = value;
  }

  /**
   * @function
   * Constructor
   */
  constructor(props: IPropertyFieldCamlQueryFieldMappingHostProps) {
    super(props);

    try {
      var stateObj = {
        max: 30,
        selectedList: {},
        sort: {},
        fieldMappings: [],
        filterType: "",
        filters: []
      };

      if (this.props && this.props.properties[this.props.dataPropertyPath]) {
        stateObj = JSON.parse(this.props.properties[this.props.dataPropertyPath]);

        const currMappings = [...stateObj.fieldMappings];
        stateObj.fieldMappings = [];

        this.props.fieldMappings.map((item: IMapping, index?: number) => {
          var mapping = '';
          for (const map of currMappings) {
            if (item.name === map.name)
              mapping = map.mappedTo;
          }

          stateObj.fieldMappings.push({
            name: item.name,
            type: item.type,
            requiredLevel: item.requiredLevel,
            enabled: item.requiredLevel === SPFieldRequiredLevel.Required,
            mappedTo: mapping
          });
        });

        for (const i of this.props.fieldMappings) {
          var exists = false;
          for (const j of stateObj.fieldMappings) {
            if (i.name === j.name)
              exists = true;
            continue;
          }
          if (!exists) { stateObj.fieldMappings.push(i); }
        }
      }

      this.state = this.stateCopy = {
        loadedList: false,
        loadedFields: false,
        lists: [],
        fields: new List<IField>(),
        arranged: [{ key: SortDirection.Ascending, text: 'Ascending' }, { key: SortDirection.Descending, text: 'Descending' }],
        selectedList: stateObj.selectedList ? stateObj.selectedList : {},
        sort: stateObj.sort ? stateObj.sort : {},
        operators: [
          { key: 'Eq', text: strings.SPListQueryOperatorEq },
          { key: 'Ne', text: strings.SPListQueryOperatorNe },
          { key: 'startsWith', text: strings.SPListQueryOperatorStartsWith },
          { key: 'substringof', text: strings.SPListQueryOperatorSubstringof },
          { key: 'Lt', text: strings.SPListQueryOperatorLt },
          { key: 'Le', text: strings.SPListQueryOperatorLe },
          { key: 'Gt', text: strings.SPListQueryOperatorGt },
          { key: 'Ge', text: strings.SPListQueryOperatorGe }
        ],
        filters: stateObj.filters,
        filterType: stateObj.filterType ? stateObj.filterType : strings.SPListFilterCompareAll,
        fieldMappings: stateObj.fieldMappings,
        max: stateObj.max ? stateObj.max : 100,
        errorMessage: '',
        isCreateOpen: false,
        newListTitle: ""
      };

      this.async = new Async(this);
      this.delayedValidate = this.async.debounce(this._validate, this.props.deferredValidationTime);
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (constructor)`, LogLevel.Error);
    }
  }

  public componentDidMount() {
    this._loadLists();
    this._loadFields(this.state.selectedList);
  }

  /**
   * @function
   * Loads the list from SharePoint current web site
   */
  private _loadLists = async (): Promise<void> => {
    try {
      let lists: ISPList[] = await sp.web.lists.select("Title", "Id", "BaseTemplate").filter("Hidden eq false").get();
      let stateLists = [];
      lists.map((list: ISPList) => {
        stateLists.push({
          id: list.Id,
          title: list.Title
        });
      });

      this.stateCopy.lists = stateLists;
      this.stateCopy.loadedList = true;
      this.setState(this.stateCopy);
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_loadLists)`, LogLevel.Error);
    }
  }

  private _loadFields = async (list: IList): Promise<void> => {
    try {
      if (list && list.id) {
        let response: ISPField[] = await sp.web.lists.getById(list.id).fields.select("Title", "InternalName", "TypeAsString").filter("((Hidden eq false) or (Title eq 'PromotedState'))").orderBy("Title").get();
        let fields = new List<IField>();
        response.map((field: ISPField) => {
          const option = {
            internalName: field.InternalName,
            name: `${field.Title} - ${field.InternalName}`,
            kind: this._getKindForType(field.TypeAsString)
          };
          fields.Add(option);
        });
        this.stateCopy.fields = fields;
        this.stateCopy.loadedFields = true;
        this._saveQuery();
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_loadFields)`, LogLevel.Error);
    }
  }

  private _getKindForType = (type: string): SPFieldType => {
    switch (type) {
      case "URL":
        return SPFieldType.URL;
      case "Boolean":
        return SPFieldType.Boolean;
      case "PublishingScheduleStartDateFieldType":
      case "PublishingScheduleEndDateFieldType":
      case "Date":
        return SPFieldType.Date;
      case "DateTime":
        return SPFieldType.DateTime;
      case "User":
        return SPFieldType.User;
      case "Lookup":
        return SPFieldType.Lookup;
      case "Integer":
        return SPFieldType.Integer;
      case "Number":
        return SPFieldType.Number;
      case "Counter":
        return SPFieldType.Counter;
      case "Choice":
        return SPFieldType.Choice;
      case "TaxonomyFieldType":
        return SPFieldType.Taxonomy;
      default: return SPFieldType.Text;
    }
  }

  private _getFieldList = (fieldType: SPFieldType): IDropdownOption[] => {
    let retVal = [];

    try {
      const fields = this.stateCopy.fields.Where(f => f.kind == fieldType).ToArray();
      fields.forEach(element => {
        retVal.push({ key: element.internalName, text: element.name });
      });
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_getFieldList)`, LogLevel.Error);
    }
    return retVal;
  }

  private getFieldByInternalName = (fieldTypeName: string): IField => {
    let retVal;
    try {
      const fields = this.stateCopy.fields.Where(f => f.internalName == fieldTypeName).ToArray();
      if (fields?.length > 0)
        retVal = fields[0];
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (getFieldByInternalName)`, LogLevel.Error);
    }
    return retVal;
  }

  private _saveQuery = (): void => {
    try {
      let listViewFields: string[] = [];
      if (this.stateCopy.fieldMappings.length === 0) {
        this.stateCopy.fields.ForEach(element => {
          listViewFields.push(element.internalName.trim().replace(' ', '_x0020_'));
        });
      }
      else {
        this.stateCopy.fieldMappings.map((mappedField: IMapping) => {
          if (typeof mappedField.mappedTo != 'undefined' && mappedField.enabled)
            listViewFields.push(mappedField.mappedTo.trim().replace(' ', '_x0020_'));
        });
      }
      if (listViewFields.indexOf("Title") == -1 && listViewFields.length > 0) {
        listViewFields.push("Title");
      }
      const conditions: Caml.IExpression[] = [];
      this.stateCopy.filters.forEach(element => {
        if (element.field == null || element.field == '' || element.operator == null || element.operator == '' || element.value == null)
          return;

        const field: IField = this.getFieldByInternalName(element.field as string);
        if (field === null) {
          this.stateCopy.filters.splice(this.stateCopy.filters.indexOf(element), 1);
          return;
        }

        switch (field.kind) {
          case SPFieldType.Boolean:
            const val = element.value ? element.value.toLocaleLowerCase().trim() : "false";
            if (element.operator === "Ne")
              conditions.push(CamlBuilder.Expression().BooleanField(element.field).NotEqualTo(val === "yes" || val === "true" || val === "1"));
            else
              conditions.push(CamlBuilder.Expression().BooleanField(element.field).EqualTo(val === "yes" || val === "true" || val === "1"));
            break;
          case SPFieldType.Integer:
            const integerValue = parseInt(element.value);
            switch (element.operator) {
              case "Ne":
                conditions.push(CamlBuilder.Expression().IntegerField(element.field).NotEqualTo(integerValue));
                break;
              case "Le":
                conditions.push(CamlBuilder.Expression().IntegerField(element.field).LessThanOrEqualTo(integerValue));
                break;
              case "Lt":
                conditions.push(CamlBuilder.Expression().IntegerField(element.field).LessThan(integerValue));
                break;
              case "Ge":
                conditions.push(CamlBuilder.Expression().IntegerField(element.field).GreaterThanOrEqualTo(integerValue));
                break;
              case "Gt":
                conditions.push(CamlBuilder.Expression().IntegerField(element.field).GreaterThan(integerValue));
                break;
              default:
                conditions.push(CamlBuilder.Expression().IntegerField(element.field).EqualTo(integerValue));
                break;
            }
            break;
          case SPFieldType.Counter:
            const counterValue = parseInt(element.value);
            switch (element.operator) {
              case "Ne":
                conditions.push(CamlBuilder.Expression().CounterField(element.field).NotEqualTo(counterValue));
                break;
              case "Le":
                conditions.push(CamlBuilder.Expression().CounterField(element.field).LessThanOrEqualTo(counterValue));
                break;
              case "Lt":
                conditions.push(CamlBuilder.Expression().CounterField(element.field).LessThan(counterValue));
                break;
              case "Ge":
                conditions.push(CamlBuilder.Expression().CounterField(element.field).GreaterThanOrEqualTo(counterValue));
                break;
              case "Gt":
                conditions.push(CamlBuilder.Expression().CounterField(element.field).GreaterThan(counterValue));
                break;
              default:
                conditions.push(CamlBuilder.Expression().CounterField(element.field).EqualTo(counterValue));
                break;
            }
            break;
          case SPFieldType.Date:
            switch (element.operator) {
              case "Ne":
                conditions.push(CamlBuilder.Expression().DateField(element.field).NotEqualTo(element.value));
                break;
              case "Le":
                conditions.push(CamlBuilder.Expression().DateField(element.field).LessThanOrEqualTo(element.value));
                break;
              case "Lt":
                conditions.push(CamlBuilder.Expression().DateField(element.field).LessThan(element.value));
                break;
              case "Ge":
                conditions.push(CamlBuilder.Expression().DateField(element.field).GreaterThanOrEqualTo(element.value));
                break;
              case "Gt":
                conditions.push(CamlBuilder.Expression().DateField(element.field).GreaterThan(element.value));
                break;
              default:
                conditions.push(CamlBuilder.Expression().DateField(element.field).EqualTo(element.value));
                break;
            }
            break;
          case SPFieldType.DateTime:
            switch (element.operator) {
              case "Ne":
                conditions.push(CamlBuilder.Expression().DateTimeField(element.field).NotEqualTo(element.value));
                break;
              case "Le":
                conditions.push(CamlBuilder.Expression().DateTimeField(element.field).LessThanOrEqualTo(element.value));
                break;
              case "Lt":
                conditions.push(CamlBuilder.Expression().DateTimeField(element.field).LessThan(element.value));
                break;
              case "Ge":
                conditions.push(CamlBuilder.Expression().DateTimeField(element.field).GreaterThanOrEqualTo(element.value));
                break;
              case "Gt":
                conditions.push(CamlBuilder.Expression().DateTimeField(element.field).GreaterThan(element.value));
                break;
              default:
                conditions.push(CamlBuilder.Expression().DateTimeField(element.field).EqualTo(element.value));
                break;
            }
            break;
          case SPFieldType.Lookup:
            if (!isNaN(Number(element.value)))
              conditions.push(CamlBuilder.Expression().LookupField(element.field).Id().EqualTo(Number(element.value)));
            else {
              switch (element.operator) {
                case "Ne":
                  conditions.push(CamlBuilder.Expression().LookupField(element.field).ValueAsText().NotEqualTo(element.value));
                  break;
                case "startsWith":
                  conditions.push(CamlBuilder.Expression().LookupField(element.field).ValueAsText().BeginsWith(element.value));
                  break;
                case "substringOf":
                  conditions.push(CamlBuilder.Expression().LookupField(element.field).ValueAsText().Contains(element.value));
                  break;
                default:
                  conditions.push(CamlBuilder.Expression().LookupField(element.field).ValueAsText().EqualTo(element.value));
                  break;
              }
            }
            break;
          case SPFieldType.Number:
            const numberValue = parseFloat(element.value);
            switch (element.operator) {
              case "Ne":
                conditions.push(CamlBuilder.Expression().NumberField(element.field).NotEqualTo(numberValue));
                break;
              case "Le":
                conditions.push(CamlBuilder.Expression().NumberField(element.field).LessThanOrEqualTo(numberValue));
                break;
              case "Lt":
                conditions.push(CamlBuilder.Expression().NumberField(element.field).LessThan(numberValue));
                break;
              case "Ge":
                conditions.push(CamlBuilder.Expression().NumberField(element.field).GreaterThanOrEqualTo(numberValue));
                break;
              case "Gt":
                conditions.push(CamlBuilder.Expression().NumberField(element.field).GreaterThan(numberValue));
                break;
              default:
                conditions.push(CamlBuilder.Expression().NumberField(element.field).EqualTo(numberValue));
                break;
            }
            break;
          case SPFieldType.URL:
            switch (element.operator) {
              case "Ne":
                conditions.push(CamlBuilder.Expression().UrlField(element.field).NotEqualTo(element.value));
                break;
              case "startsWith":
                conditions.push(CamlBuilder.Expression().UrlField(element.field).BeginsWith(element.value));
                break;
              case "substringOf":
                conditions.push(CamlBuilder.Expression().UrlField(element.field).Contains(element.value));
                break;
              default:
                conditions.push(CamlBuilder.Expression().UrlField(element.field).EqualTo(element.value));
                break;
            }
            break;
          case SPFieldType.Choice:
            switch (element.operator) {
              case "Ne":
                conditions.push(CamlBuilder.Expression().TextField(element.field).NotEqualTo(element.value));
                break;
              case "startsWith":
                conditions.push(CamlBuilder.Expression().TextField(element.field).BeginsWith(element.value));
                break;
              case "substringOf":
                conditions.push(CamlBuilder.Expression().TextField(element.field).Contains(element.value));
                break;
              default:
                conditions.push(CamlBuilder.Expression().TextField(element.field).EqualTo(element.value));
                break;
            }
            break;
          case SPFieldType.User:
            if (element.value === "Me") {
              conditions.push(CamlBuilder.Expression().UserField(element.field).EqualToCurrentUser());
            }
            else {
              switch (element.operator) {
                case "Ne":
                  conditions.push(CamlBuilder.Expression().UserField(element.field).ValueAsText().NotEqualTo(element.value));
                  break;
                case "startsWith":
                  conditions.push(CamlBuilder.Expression().UserField(element.field).ValueAsText().BeginsWith(element.value));
                  break;
                case "substringOf":
                  conditions.push(CamlBuilder.Expression().UserField(element.field).ValueAsText().Contains(element.value));
                  break;
                default:
                  conditions.push(CamlBuilder.Expression().UserField(element.field).ValueAsText().EqualTo(element.value));
                  break;
              }
            }
            break;
          default:
            switch (element.operator) {
              case "Ne":
                conditions.push(CamlBuilder.Expression().TextField(element.field).NotEqualTo(element.value));
                break;
              case "startsWith":
                conditions.push(CamlBuilder.Expression().TextField(element.field).BeginsWith(element.value));
                break;
              case "substringof":
                conditions.push(CamlBuilder.Expression().TextField(element.field).Contains(element.value));
                break;
              default:
                conditions.push(CamlBuilder.Expression().TextField(element.field).EqualTo(element.value));
                break;
            }
            break;
        }
      });

      let queryXml: string = '';
      if (this.stateCopy.filterType === strings.SPListFilterCompareAny) {
        if (this.stateCopy.sort && this.stateCopy.sort.title) {
          if (this.stateCopy.sort.direction === SortDirection.Descending) {
            queryXml = new CamlBuilder() //Any orderby at this
              .View(listViewFields)
              .RowLimit(this.stateCopy.max)
              .Query()
              .Where()
              .Any(conditions)
              .OrderByDesc(this.stateCopy.sort.title)
              .ToString();
          }
          else {
            queryXml = new CamlBuilder() //Any orderby at this
              .View(listViewFields)
              .RowLimit(this.stateCopy.max)
              .Query()
              .Where()
              .Any(conditions)
              .OrderBy(this.stateCopy.sort.title)
              .ToString();
          }
        }
        else {
          queryXml = new CamlBuilder() //Any orderby at this
            .View(listViewFields)
            .RowLimit(this.stateCopy.max)
            .Query()
            .Where()
            .Any(conditions)
            .ToString();
        }
      }
      else {
        if (this.stateCopy.sort != undefined && this.stateCopy.sort.title) {
          if (this.stateCopy.sort.direction === SortDirection.Descending) {
            queryXml = new CamlBuilder() //Any orderby at this
              .View(listViewFields)
              .RowLimit(this.stateCopy.max)
              .Query()
              .Where()
              .All(conditions)
              .OrderByDesc(this.stateCopy.sort.title)
              .ToString();
          }
          else {
            queryXml = new CamlBuilder() //Any orderby at this
              .View(listViewFields)
              .RowLimit(this.stateCopy.max)
              .Query()
              .Where()
              .All(conditions)
              .OrderBy(this.stateCopy.sort.title)
              .ToString();
          }
        }
        else {
          queryXml = new CamlBuilder() //Any orderby at this
            .View(listViewFields)
            .RowLimit(this.stateCopy.max)
            .Query()
            .Where()
            .All(conditions)
            .ToString();
        }
      }

      //Order
      this.props.properties[this.props.dataPropertyPath] = JSON.stringify({
        filters: this.stateCopy.filters,
        max: this.stateCopy.max,
        selectedList: this.stateCopy.selectedList,
        sort: this.stateCopy.sort,
        fieldMappings: this.stateCopy.fieldMappings
      });
      if (this.delayedValidate !== null && this.delayedValidate !== undefined) {
        this.delayedValidate(queryXml);
      }
      this.setState(this.stateCopy);
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_saveQuery)`, LogLevel.Error);
    }
  }

  /**
   * @function
   * Validates the new custom field value
   */
  private _validate = (value: string): void => {
    try {
      if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
        this._notifyAfterValidate(this.props.query, value);
        return;
      }

      if (this.latestValidateValue === value)
        return;
      this.latestValidateValue = value;

      const result: string | PromiseLike<string> = this.props.onGetErrorMessage(value || '');
      if (result !== undefined) {
        if (typeof result === 'string') {
          if (result === undefined || result === '')
            this._notifyAfterValidate(this.props.query, value);
          this.setState({ errorMessage: result });
        }
        else {
          result.then((errorMessage: string) => {
            if (errorMessage === undefined || errorMessage === '')
              this._notifyAfterValidate(this.props.query, value);
            this.setState({ errorMessage: errorMessage });
          });
        }
      }
      else {
        this._notifyAfterValidate(this.props.query, value);
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_validate)`, LogLevel.Error);
    }
  }

  /**
   * @function
   * Notifies the parent Web Part of a property value change
   */
  private _notifyAfterValidate = (oldValue: string, newValue: string): void => {
    try {
      if (this.props.onPropertyChange && newValue != null) {
        this.props.properties[this.props.targetProperty] = newValue;
        this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
        if (this.props.render)
          this.props.render();
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_notifyAfterValidate)`, LogLevel.Error);
    }
  }

  /**
   * @function
   * Called when the component will unmount
   */
  public componentWillUnmount() {
    this.async.dispose();
  }

  /**
   * @function
   * Raises when a list has been selected
   */
  private _onChangedList = (option: IDropdownOption, index?: number): void => {
    try {
      const selectedList: IList = {
        id: option.key as string,
        title: option.text as string,
      };
      this.stateCopy.selectedList = selectedList;
      this._loadFields(selectedList);
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_onChangedList)`, LogLevel.Error);
    }
  }

  private _onChangedField = (option: IDropdownOption, index?: number): void => {
    try {
      let sort = JSON.parse(JSON.stringify(this.stateCopy.sort));
      sort.title = option.key as string;
      this.stateCopy.sort = sort;
      this._saveQuery();
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_onChangedField)`, LogLevel.Error);
    }
  }

  private _onChangedArranged = (option: IDropdownOption, index?: number): void => {
    try {
      let sort = JSON.parse(JSON.stringify(this.stateCopy.sort));
      sort.direction = option.key as number;
      this.stateCopy.sort = sort;
      this._saveQuery();
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_onChangedArranged)`, LogLevel.Error);
    }
  }

  private _onChangedMax = (newValue?: number): void => {
    this.stateCopy.max = newValue;
    this._saveQuery();
  }

  private _onClickAddFilter = (elm?: any): void => {
    this.stateCopy.filters = [...this.stateCopy.filters, {}];
    this._saveQuery();
  }

  private _onClickRemoveFilter = (index: number): void => {
    if (index > -1) {
      this.stateCopy.filters = [...this.stateCopy.filters.splice(index, 1)];
      this._saveQuery();
    }
  }

  private _onChangedFilterType = (option: IDropdownOption, index?: number): void => {
    this.stateCopy.filterType = option.key.toString();
    this._saveQuery();
  }

  private _onChangedFilterField = (option: IDropdownOption, index?: number, selectedIndex?: number): void => {
    try {
      let filters = JSON.parse(JSON.stringify(this.stateCopy.filters));
      filters[selectedIndex].field = option.key as string;
      this.stateCopy.filters = filters;
      this._saveQuery();
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_onChangedFilterField)`, LogLevel.Error);
    }
  }

  private _onChangedFilterOperator = (option: IDropdownOption, index?: number, selectedIndex?: number): void => {
    try {
      let filters = JSON.parse(JSON.stringify(this.stateCopy.filters));
      filters[selectedIndex].operator = option.key as string;
      this.stateCopy.filters = filters;
      this._saveQuery();
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_onChangedFilterOperator)`, LogLevel.Error);
    }
  }

  private _onChangedFilterValue = (value?: string, index?: number): void => {
    try {
      let filters = JSON.parse(JSON.stringify(this.stateCopy.filters));
      filters[index].value = value;
      this.stateCopy.filters = filters;
      this._saveQuery();
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_onChangedFilterValue)`, LogLevel.Error);
    }
  }

  private _onChangedFieldMapping = (option: IDropdownOption, index?: number): void => {
    try {
      let fieldMappings = JSON.parse(JSON.stringify(this.stateCopy.fieldMappings));
      fieldMappings[index].mappedTo = option.key.toString();
      this.stateCopy.fieldMappings = fieldMappings;
      this._saveQuery();
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_onChangedFieldMapping)`, LogLevel.Error);
    }
  }

  // private _onChangedFieldMappingEnabled(sender: FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean, index?: number) {
  //   try {
  //     let fieldMappings = JSON.parse(JSON.stringify(this.stateCopy.fieldMappings));
  //     fieldMappings[index].enabled = checked;
  //     this.stateCopy.fieldMappings = fieldMappings;
  //     this._saveQuery();
  //   } catch (err) {
  //     Logger.write(`${err} - ${this.LOG_SOURCE} (_onChangedFieldMappingEnabled)`, LogLevel.Error);
  //   }
  // }

  private _openCreateNewListDialog = (element?: any): void => {
    this.stateCopy.isCreateOpen = true;
    this.setState(this.stateCopy);
  }

  private _changeNewListTitle = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    this.stateCopy.newListTitle = newValue;
    this.setState(this.stateCopy);
  }

  private _createNewList = async (element?: any): Promise<void> => {
    try {
      const desc = 'List created by an SPFX webpart';
      let result = await sp.web.lists.add(this.stateCopy.newListTitle, desc, 100);
      if (result.data && hOP(result.data, "Id") && hOP(result.data, "Title")) {
        this.stateCopy.selectedList.id = result.data.Id;
        this.stateCopy.selectedList.title = result.data.Title;
        this.setState(this.stateCopy);
        if (this.props.createTitleRequired)
          await result.list.fields.getByTitle('Title').update({ Required: false });

        for (let f = 0; f < this.props.createFields.length; f++) {
          let fieldResult = await result.list.fields.createFieldAsXml(this.props.createFields[f]);
          let fieldViewResult = await sp.web.lists.getById(this.stateCopy.selectedList.id).defaultView.fields.add(fieldResult.data.InternalName);
        }
        this._saveAndReloadData();
      }
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_createNewList)`, LogLevel.Error);
    }
  }

  private _saveAndReloadData = (): void => {
    try {
      this._saveQuery();

      this._loadLists();
      //Added boolean to trigger updating the default view.
      this._loadFields(this.stateCopy.selectedList);

      this.stateCopy.newListTitle = "";
      this.stateCopy.isCreateOpen = false;
      this.setState(this.stateCopy);
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_saveAndReloadData)`, LogLevel.Error);
    }
  }

  private _cancelListCreate = (element?: any): void => {
    try {
      this.stateCopy.isCreateOpen = false;
      this.stateCopy.newListTitle = "";
      this.setState(this.stateCopy);
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (_cancelListCreate)`, LogLevel.Error);
    }
  }

  private _openListInNewTab = async (): Promise<void> => {
    let data = await sp.web.lists.getById(this.stateCopy.selectedList.id).defaultView.get();
    if (data.ServerRelativeUrl && data.ServerRelativeUrl.length > 0)
      window.open(data.ServerRelativeUrl);
  }


  /**
   * @function
   * Renders the controls
   */
  public render(): JSX.Element {
    try {
      if (this.stateCopy.loadedList === false) {
        return (
          <div>
            <Label>{this.props.label}</Label>
            <Spinner type={SpinnerType.normal} />
          </div>
        );
      }

      //Renders content
      return (
        <div>
          {this.props.showCreate &&
            <div>
              <Dialog type={DialogType.close} isOpen={this.state.isCreateOpen} title={strings.SPListCreate}
                containerClassName={styles.msDialogMainCustom} onDismiss={this._cancelListCreate} isDarkOverlay={true} isBlocking={false}>
                <TextField value={this.state.newListTitle} placeholder={strings.SPListCreatePlaceholder} onChange={this._changeNewListTitle} required={true}></TextField>
                <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                  <Button buttonType={ButtonType.primary} onClick={this._createNewList}>{strings.CreateButton}</Button>
                  <Button buttonType={ButtonType.normal} onClick={this._cancelListCreate}>{strings.CancelButton}</Button>
                </div>
              </Dialog>
              <Button
                iconProps={{ iconName: "Add" }}
                disabled={this.props.disabled}
                buttonType={ButtonType.command}
                onClick={this._openCreateNewListDialog}>
                {strings.SPListCreate}
              </Button>
            </div>
          }
          <Label hidden={!this.props.label}>{this.props.label}</Label>
          <Dropdown
            label={strings.SPListQueryList}
            onChanged={this._onChangedList}
            options={this.state.lists.map(l => { return { key: l.id, text: l.title }; })}
            selectedKey={this.state.selectedList.id}
            disabled={this.props.disabled}
          />
          <CommandButton
            iconProps={{ iconName: "Edit" }}
            disabled={this.props.disabled}
            buttonType={ButtonType.command}
            onClick={() => this._openListInNewTab()}>
            {strings.SPListQueryOpenList}
          </CommandButton>

          {this.state.fieldMappings.map((mapping: IMapping, index: number) => {
            return (
              <Dropdown
                label={mapping.name}
                disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true}
                options={this._getFieldList(mapping.type)}
                selectedKey={mapping.mappedTo}
                onChanged={(option: IDropdownOption, selectIndex?: number) => this._onChangedFieldMapping(option, index)} />
            );
          })}

          {this.props.showOrderBy != false ?
            <div>
              <Dropdown
                label={strings.SPListQueryOrderBy}
                options={this.state.fields.Select<IDropdownOption>(f => { return { key: f.internalName, text: f.name }; }).ToArray()}
                selectedKey={this.state.sort.title}
                onChanged={this._onChangedField}
                disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true}
              />
              <Dropdown
                label={strings.SPListQueryArranged}
                options={this.state.arranged}
                selectedKey={this.state.sort.direction}
                onChanged={this._onChangedArranged}
                disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true}
              />
            </div>
            : ''}

          {this.props.showMax != false ?
            <Slider label={strings.SPListQueryMax}
              min={1}
              className={styles["slider"]}
              max={this.props.max == null ? 100 : this.props.max}
              defaultValue={this.state.max}
              onChange={this._onChangedMax}
              disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true}
            />
            : ''}

          {this.state.filters != null && this.state.filters.length > 1 ?
            <Dropdown
              label={strings.SPListFilterCompareType}
              disabled={this.props.disabled}
              options={[
                { key: strings.SPListFilterCompareAll, text: strings.SPListFilterCompareAll, selected: true },
                { key: strings.SPListFilterCompareAny, text: strings.SPListFilterCompareAny }
              ]}
              selectedKey={this.state.filterType}
              onChanged={this._onChangedFilterType.bind(this)}
            />
            : ''}

          {this.state.filters != null && this.state.filters.length > 0 ?
            this.state.filters.map((value: IFilter, index: number) => {
              return (
                <div>
                  <Label>Filter</Label>
                  <Dropdown
                    label=''
                    disabled={this.props.disabled}
                    options={this.state.fields.Select<IDropdownOption>(f => { return { key: f.internalName, text: f.name }; }).ToArray()}
                    selectedKey={value.field}
                    onChanged={(option: IDropdownOption, selectIndex?: number) => this._onChangedFilterField(option, selectIndex, index)}
                  />
                  <Dropdown
                    label=''
                    disabled={this.props.disabled}
                    options={this.state.operators}
                    selectedKey={value.operator}
                    onChanged={(option: IDropdownOption, selectIndex?: number) => this._onChangedFilterOperator(option, selectIndex, index)}
                  />
                  <TextField disabled={this.props.disabled} defaultValue={value.value} onChange={(ev: any, value2: string) => this._onChangedFilterValue(value2, index)} />
                  <Button disabled={this.props.disabled} buttonType={ButtonType.command} onClick={() => this._onClickRemoveFilter(index)} iconProps={{ iconName: "Delete" }}>
                    {strings.SPListQueryRemove}
                  </Button>
                </div>
              );
            })

            : ''}

          {this.props.showFilters != false ?
            <Button buttonType={ButtonType.command} onClick={this._onClickAddFilter}
              disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true} iconProps={{ iconName: "Add" }}>
              {strings.SPListQueryAdd}
            </Button>
            : ''}

          {this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
            <div style={{ paddingBottom: '8px' }}><div aria-live='assertive' className='ms-u-screenReaderOnly' data-automation-id='error-message'>{this.state.errorMessage}</div>
              <span>
                <p className='ms-TextField-errorMessage ms-u-slideDownIn20'>{this.state.errorMessage}</p>
              </span>
            </div>
            : ''}

        </div>
      );
    } catch (err) {
      Logger.write(`${err} - ${this.LOG_SOURCE} (render)`, LogLevel.Error);
    }
  }
}

/**
 * @interface
 * Defines a SharePoint list
 */
interface ISPList {
  Title: string;
  Id: string;
  BaseTemplate: number;
}

interface ISPField {
  Title: string;
  InternalName: string;
  TypeAsString: string;
}
