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
import { FormEvent } from 'react';
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
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Button, ButtonType, CommandButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import styles from '../PropertyFields.module.scss';
import * as strings from 'propertyFieldStrings';
import pnp from 'sp-pnp-js';
import { Caml,CamlBuilder } from '../../utilities/caml/camljs';
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
}

/**
 * @class
 * Renders the controls for PropertyFieldCamlQuery component
 */
export default class PropertyFieldCamlQueryFieldMappingHost extends React.Component<IPropertyFieldCamlQueryFieldMappingHostProps, IPropertyFieldCamlQueryFieldMappingHostState> {

  private latestValidateValue: string;
  private latestMappingValidateValue: IMapping[];
  private async: Async;
  private delayedValidate: (value: string) => void;
  private delayedMappingValidate: (value: IMapping[]) => void;
  private listElementId = "input-new-list";

  private _stateCopy: IPropertyFieldCamlQueryFieldMappingHostState;
  public get stateCopy(){
    return this._stateCopy;
  }
  public set stateCopy(value: IPropertyFieldCamlQueryFieldMappingHostState){
    this._stateCopy = value;
  }

  /**
   * @function
   * Constructor
   */
  constructor(props: IPropertyFieldCamlQueryFieldMappingHostProps) {
    super(props);
    this.onChangedList = this.onChangedList.bind(this);
    this.onChangedField = this.onChangedField.bind(this);
    this.onChangedArranged = this.onChangedArranged.bind(this);
    this.onChangedMax = this.onChangedMax.bind(this);
    this.loadFields = this.loadFields.bind(this);
    this.onClickAddFilter = this.onClickAddFilter.bind(this);
    this.onClickRemoveFilter = this.onClickRemoveFilter.bind(this);
    this.onChangedFilterField = this.onChangedFilterField.bind(this);
    this.onChangedFilterOperator = this.onChangedFilterOperator.bind(this);
    this.onChangedFilterValue = this.onChangedFilterValue.bind(this);
    this.createNewList = this.createNewList.bind(this);
    this.openCreateNewListDialog = this.openCreateNewListDialog.bind(this);
    this.cancelListCreate = this.cancelListCreate.bind(this);

    var stateObj = {
      max: 100,
      selectedList: {},
      sort: {},
      fieldMappings: [],
      filterType: "",
      filters: []
    };
    if(this.props && this.props.properties[this.props.dataPropertyPath])
    {
      stateObj = JSON.parse(this.props.properties[this.props.dataPropertyPath]);

      const currMappings = [...stateObj.fieldMappings];
      stateObj.fieldMappings = [];

      this.props.fieldMappings.map((item: IMapping, index?: number) => {
        var mapping = '';
        for(const map of currMappings){
          if(item.name===map.name)
            mapping = map.mappedTo;
        }

        stateObj.fieldMappings.push({
          name: item.name,
          type: item.type,
          requiredLevel: item.requiredLevel,
          enabled: item.requiredLevel===SPFieldRequiredLevel.Required,
          mappedTo: mapping});
      });

      for(const i of this.props.fieldMappings){
        var exists = false;
        for(const j of stateObj.fieldMappings){
          if(i.name===j.name)
            exists=true;
            continue;
        }
        if(!exists) {stateObj.fieldMappings.push(i);}
      }
    }

    this.state = this.stateCopy = {
      loadedList: false,
      loadedFields: false,
			lists: [],
      fields: new List<IField>(),
      arranged: [{key: SortDirection.Ascending, text: 'Ascending'}, {key: SortDirection.Descending, text: 'Descending'}],
      selectedList: stateObj.selectedList ? stateObj.selectedList : {},
      sort: stateObj.sort ? stateObj.sort : {},
      operators: [
        {key: 'Eq', text: strings.SPListQueryOperatorEq},
        {key: 'Ne', text: strings.SPListQueryOperatorNe},
        {key: 'startsWith', text: strings.SPListQueryOperatorStartsWith},
        {key: 'substringof', text: strings.SPListQueryOperatorSubstringof},
        {key: 'Lt', text: strings.SPListQueryOperatorLt},
        {key: 'Le', text: strings.SPListQueryOperatorLe},
        {key: 'Gt', text: strings.SPListQueryOperatorGt},
        {key: 'Ge', text: strings.SPListQueryOperatorGe}
      ],
      filters: stateObj.filters,
      filterType: stateObj.filterType ? stateObj.filterType :strings.SPListFilterCompareAll,
      fieldMappings: stateObj.fieldMappings,
      max: stateObj.max ? stateObj.max : 100,
      errorMessage: '',
      isCreateOpen: false
    };

    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

  public componentDidMount(){
    this.loadLists();
    this.loadFields(this.stateCopy.selectedList);
  }

  /**
   * @function
   * Loads the list from SharePoint current web site
   */
  private loadLists(): void {
    pnp.sp.web.lists.select("Title","Id","BaseTemplate").filter("Hidden eq false").get().then((lists: ISPList[]) => {
      const stateLists = [];
      lists.map((list: ISPList) => {
        stateLists.push({
          id: list.Id,
          title: list.Title
        });
      });
      this.stateCopy.lists = stateLists;
      this.stateCopy.loadedList = true;
      this.setState(this.stateCopy);
    });
  }

  private loadFields(list: IList): void {
    if(list && list.id){
      pnp.sp.web.lists.getById(list.id).fields.select("Title","InternalName","TypeAsString").filter("((Hidden eq false) or (Title eq 'PromotedState'))").orderBy("Title").get().then((response: ISPField[]) => {
        const fields = new List<IField>();
        response.map((field: ISPField) => {
          const option = {
            internalName: field.InternalName,
            name: field.Title,
            kind: this.getKindForType(field.TypeAsString)
          };
          fields.Add(option);
        });
        this.stateCopy.fields = fields;
        this.stateCopy.loadedFields = true;
        this.saveQuery();
      });
    }
  }

  private getKindForType(type:string):SPFieldType{
    switch(type){
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

  private getFieldList(fieldType:SPFieldType): IDropdownOption[]{
    const fields = this.stateCopy.fields.Where(f=>f.kind==fieldType).ToArray();
    const options = [];
    fields.forEach(element => {
      options.push({key:element.internalName,text:element.name});
    });
    return options;
  }

  private getFieldByInternalName(fieldTypeName:string): IField{
    const fields = this.stateCopy.fields.Where(f=>f.internalName==fieldTypeName).ToArray();
    if(fields == null || fields.length == 0)
      return null;
    return fields[0];
  }

  private saveQuery(): void {
      const listViewFields : string[] = [];
      if(this.stateCopy.fieldMappings.length===0){
        this.stateCopy.fields.ForEach(element => {
          listViewFields.push(element.internalName.trim().replace(' ','_x0020_'));
        });
      }
      else{
        this.stateCopy.fieldMappings.map((mappedField: IMapping) => {
          if(typeof mappedField.mappedTo != 'undefined' && mappedField.enabled)
            listViewFields.push(mappedField.mappedTo.trim().replace(' ','_x0020_'));
        });
      }
      if(listViewFields.indexOf("Title")==-1 && listViewFields.length > 0){
        listViewFields.push("Title");
      }
      const conditions : Caml.IExpression[] = [];
      this.stateCopy.filters.forEach(element => {
        if(element.field == null || element.field == '' || element.operator == null || element.operator == '' || element.value == null)
          return;
        console.log('operator');

        const field : IField = this.getFieldByInternalName(element.field as string);
        if(field===null){
          this.stateCopy.filters.splice(this.stateCopy.filters.indexOf(element),1);
          return;
        }

        console.log(field.kind);

        switch(field.kind){
          case SPFieldType.Boolean:
            if(element.operator==="Ne")
              conditions.push(CamlBuilder.Expression().BooleanField(element.field).NotEqualTo(!!(element.value)));
            else
              conditions.push(CamlBuilder.Expression().BooleanField(element.field).EqualTo(!!(element.value)));
            break;
          case SPFieldType.Integer:
            const integerValue = parseInt(element.value);
            switch(element.operator){
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
            switch(element.operator){
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
            switch(element.operator){
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
            switch(element.operator){
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
            if(!isNaN(Number(element.value)))
              conditions.push(CamlBuilder.Expression().LookupField(element.field).Id().EqualTo(Number(element.value)));
            else{
              switch(element.operator){
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
            switch(element.operator){
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
            switch(element.operator){
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
            switch(element.operator){
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
            if(element.value==="Me"){
              conditions.push(CamlBuilder.Expression().UserField(element.field).EqualToCurrentUser());
            }
            else{
              switch(element.operator){
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
            switch(element.operator){
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

      var queryXml:string = '';
      if(this.stateCopy.filterType===strings.SPListFilterCompareAny){
        if(this.stateCopy.sort && this.stateCopy.sort.title){
          if(this.stateCopy.sort.direction===SortDirection.Descending){
            queryXml = new CamlBuilder() //Any orderby at this
                .View(listViewFields)
                .RowLimit(this.stateCopy.max)
                .Query()
                .Where()
                .Any(conditions)
                .OrderByDesc(this.stateCopy.sort.title)
                .ToString();
          }
          else{
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
        else{
          queryXml = new CamlBuilder() //Any orderby at this
              .View(listViewFields)
              .RowLimit(this.stateCopy.max)
              .Query()
              .Where()
              .Any(conditions)
              .ToString();
        }
      }
      else{
        if(this.stateCopy.sort && this.stateCopy.sort.title){
          if(this.stateCopy.sort.direction===SortDirection.Descending){
            queryXml = new CamlBuilder() //Any orderby at this
                .View(listViewFields)
                .RowLimit(this.stateCopy.max)
                .Query()
                .Where()
                .All(conditions)
                .OrderByDesc(this.stateCopy.sort.title)
                .ToString();
          }
          else{
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
        else{
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




      console.log(queryXml);
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
  }

  /**
   * @function
   * Validates the new custom field value
   */
  private validate(value: string): void {
    if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
      this.notifyAfterValidate(this.props.query, value);
      return;
    }

    if (this.latestValidateValue === value)
      return;
    this.latestValidateValue = value;

    const result: string | PromiseLike<string> = this.props.onGetErrorMessage(value || '');
    if (result !== undefined) {
      if (typeof result === 'string') {
        if (result === undefined || result === '')
          this.notifyAfterValidate(this.props.query, value);
        this.setState({errorMessage: result});
      }
      else {
        result.then((errorMessage: string) => {
          if (errorMessage === undefined || errorMessage === '')
            this.notifyAfterValidate(this.props.query, value);
          this.setState({errorMessage: errorMessage});
        });
      }
    }
    else {
      this.notifyAfterValidate(this.props.query, value);
    }
  }

  /**
   * @function
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(oldValue: string, newValue: string) {
    if (this.props.onPropertyChange && newValue != null) {
      this.props.properties[this.props.targetProperty] = newValue;
      this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
      if (this.props.render)
        this.props.render();
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
  private onChangedList(option: IDropdownOption, index?: number): void {
    const selectedList: IList = {
        id: option.key as string,
        title: option.text as string,
    };
    this.stateCopy.selectedList=selectedList;
    //this.saveQuery();
    this.loadFields(selectedList);
  }

   private onChangedField(option: IDropdownOption, index?: number): void {
    const sort = JSON.parse(JSON.stringify(this.stateCopy.sort));
    sort.title = option.key as string;
    this.stateCopy.sort = sort;
    this.saveQuery();
  }

   private onChangedArranged(option: IDropdownOption, index?: number): void {
    const sort = JSON.parse(JSON.stringify(this.stateCopy.sort));
    sort.direction = option.key as number;
    this.stateCopy.sort = sort;
    this.saveQuery();
  }

  private onChangedMax(newValue?: number): void {
    this.stateCopy.max = newValue;
    this.saveQuery();
  }

  private onClickAddFilter(elm?: any): void {
    this.stateCopy.filters = [...this.stateCopy.filters,{}];
    this.saveQuery();
  }

  private onClickRemoveFilter(index: number): void {
    if (index > -1) {
      this.stateCopy.filters= [...this.stateCopy.filters.splice(index, 1)];
      this.saveQuery();
    }
  }

  private onChangedFilterType(option: IDropdownOption,  index?:number):void {
    this.stateCopy.filterType= option.key.toString();
    this.saveQuery();
  }

  private onChangedFilterField(option: IDropdownOption, index?: number, selectedIndex?: number): void {
    const filters = JSON.parse(JSON.stringify(this.stateCopy.filters));
    filters[selectedIndex].field = option.key as string;
    this.stateCopy.filters= filters;
    this.saveQuery();
  }

  private onChangedFilterOperator(option: IDropdownOption, index?: number, selectedIndex?: number): void {
    const filters = JSON.parse(JSON.stringify(this.stateCopy.filters));
    filters[selectedIndex].operator = option.key as string;
    this.stateCopy.filters= filters;
    this.saveQuery();
  }

  private onChangedFilterValue(value?: string, index?: number): void {
    const filters = JSON.parse(JSON.stringify(this.stateCopy.filters));
    filters[index].value = value;
    this.stateCopy.filters= filters;
    this.saveQuery();
  }

  private onChangedFieldMapping(option: IDropdownOption,  index?:number):void {
    const fieldMappings = JSON.parse(JSON.stringify(this.stateCopy.fieldMappings));
    fieldMappings[index].mappedTo = option.key.toString();
    this.stateCopy.fieldMappings= fieldMappings;
    this.saveQuery();
  }

  private onChangedFieldMappingEnabled(sender: FormEvent<HTMLElement|HTMLInputElement>,checked?: boolean, index?:number){
    const fieldMappings = JSON.parse(JSON.stringify(this.stateCopy.fieldMappings));
    fieldMappings[index].enabled = checked;
    this.stateCopy.fieldMappings= fieldMappings;
    this.saveQuery();
  }

  private openCreateNewListDialog(element?: any): void {
    this.stateCopy.isCreateOpen = true;
    this.setState(this.stateCopy);
  }

  private createNewList(element?: any): void {
    const title = document.getElementsByClassName(this.listElementId)[0]["value"];

    const desc = 'List created by an SPFX webpart';
    pnp.sp.web.lists.add(title,desc,100).then((result)=>{
      this.stateCopy.selectedList.id = result.data['Id'];
      this.stateCopy.selectedList.title = result.data['Title'];
      if(this.props.createTitleRequired)
        this.setTitleOptional(result.list);
      else
        this.createField(result.list,this.props.createFields,0);
    });

  }

  private setTitleOptional(list:any){
    list.fields.getByTitle('Title').update({
      Required:false
    }).then(result=>{
      this.createField(list,this.props.createFields,0);
    });
  }

  private createField(list:any,fieldXmls:string[],currentIndex:number){
      list.fields.createFieldAsXml(fieldXmls[currentIndex]).then(result=>{
        this.addFieldsToView(result.InternalName);
        currentIndex++;
        if(currentIndex < fieldXmls.length)
          this.createField(list,fieldXmls,currentIndex);
        else
          this.saveAndReloadData();
      });
  }

  private addFieldsToView(name){
    //Skip adding the Title, already in view by default.
    if(name!=="Title"){
      pnp.sp.web.lists.getById(this.stateCopy.selectedList.id).defaultView.fields.add(name).then(_ =>{});
    }
  }

  private saveAndReloadData(){
    this.saveQuery();

    this.loadLists();
    //Added boolean to trigger updating the default view.
    this.loadFields(this.stateCopy.selectedList);

    document.getElementsByClassName(this.listElementId)[0]["value"] = "";
    this.stateCopy.isCreateOpen = false;
    this.setState(this.stateCopy);
  }

  private cancelListCreate(element?: any): void {
    this.stateCopy.isCreateOpen = false;
    this.setState(this.stateCopy);
    document.getElementsByClassName(this.listElementId)[0]["value"] = "";
  }

  private openListInNewTab(){
    pnp.sp.web.lists.getById(this.stateCopy.selectedList.id).defaultView.get().then((data)=>{
      window.open(data.ServerRelativeUrl);
    });
  }


  /**
   * @function
   * Renders the controls
   */
  public render(): JSX.Element {

    if (this.stateCopy.loadedList === false){//} || this.state.loadedFields === false) {
      return (
        <div>
          <Label>{this.props.label}</Label>
          <Spinner type={ SpinnerType.normal } />
        </div>
      );
    }

    //Renders content
    return (
      <div>
        {this.props.showCreate &&
          <div>
            <Dialog type={DialogType.close} isOpen={this.state.isCreateOpen} title={strings.SPListCreate}
              containerClassName={styles.msDialogMainCustom} onDismiss={this.cancelListCreate} isDarkOverlay={true} isBlocking={false}>
                <TextField placeholder={strings.SPListCreatePlaceholder} inputClassName={this.listElementId} required={true}></TextField>
                <div style={{marginTop: '30px', marginBottom: '30px'}}>
                    <Button buttonType={ButtonType.primary} onClick={this.createNewList}>{strings.CreateButton}</Button>
                    <Button buttonType={ButtonType.normal} onClick={this.cancelListCreate}>{strings.CancelButton}</Button>
                  </div>
            </Dialog>
            <Button
            iconProps={{iconName:"Add"}}
            disabled={this.props.disabled}
            buttonType={ButtonType.command}
            onClick={this.openCreateNewListDialog}>
              {strings.SPListCreate}
            </Button>
          </div>
        }
        <Label hidden={!this.props.label}>{this.props.label}</Label>
        <Dropdown
          label={strings.SPListQueryList}
          onChanged={this.onChangedList}
          options={this.state.lists.map(l=>{return {key:l.id,text:l.title};})}
          selectedKey={this.state.selectedList.id}
          disabled={this.props.disabled}
        />
        <CommandButton
          iconProps={{iconName:"Edit"}}
          disabled={this.props.disabled}
          buttonType={ButtonType.command}
          onClick={()=>this.openListInNewTab()}>
          {strings.SPListQueryOpenList}
        </CommandButton>

        {this.state.fieldMappings.map((mapping: IMapping, index: number) => {
          return(
                <Dropdown
                    label={mapping.name}
                    disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true }
                    options={this.getFieldList(mapping.type)}
                    selectedKey={mapping.mappedTo}
                    onChanged={(option: IDropdownOption, selectIndex?: number) => this.onChangedFieldMapping(option, index)}/>
            );
        })}

        {this.props.showOrderBy != false ?
          <div>
            <Dropdown
              label={strings.SPListQueryOrderBy}
              options={this.state.fields.Select<IDropdownOption>(f=>{return {key:f.internalName,text:f.name};}).ToArray()}
              selectedKey={this.state.sort.title}
              onChanged={this.onChangedField}
              disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true }
            />
            <Dropdown
              label={strings.SPListQueryArranged}
              options={this.state.arranged}
              selectedKey={this.state.sort.direction}
              onChanged={this.onChangedArranged}
              disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true }
            />
           </div>
          : ''}

        {this.props.showMax != false ?
          <Slider label={strings.SPListQueryMax}
            min={0}
            className={styles["slider"]}
            max={this.props.max == null ? 500 : this.props.max}
            defaultValue={this.state.max}
            onChange={this.onChangedMax}
            disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true }
          />
          : ''}

          {this.state.filters != null && this.state.filters.length > 1 ?
            <Dropdown
              label={strings.SPListFilterCompareType}
              disabled={this.props.disabled}
              options={[
                {key: strings.SPListFilterCompareAll, text: strings.SPListFilterCompareAll, selected:true},
                {key: strings.SPListFilterCompareAny, text: strings.SPListFilterCompareAny}
              ]}
              selectedKey={this.state.filterType}
              onChanged={this.onChangedFilterType.bind(this)}
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
                  options={this.state.fields.Select<IDropdownOption>(f=>{return {key:f.internalName,text:f.name};}).ToArray()}
                  selectedKey={value.field}
                  onChanged={(option: IDropdownOption, selectIndex?: number) => this.onChangedFilterField(option, selectIndex, index)}
                />
                <Dropdown
                  label=''
                  disabled={this.props.disabled}
                  options={this.state.operators}
                  selectedKey={value.operator}
                  onChanged={(option: IDropdownOption, selectIndex?: number) => this.onChangedFilterOperator(option, selectIndex, index)}
                />
                <TextField disabled={this.props.disabled} defaultValue={value.value} onChanged={(value2: string) => this.onChangedFilterValue(value2, index)} />
                <Button disabled={this.props.disabled} buttonType={ButtonType.command} onClick={() => this.onClickRemoveFilter(index)} iconProps={{iconName:"Delete"}}>
                  {strings.SPListQueryRemove}
                </Button>
              </div>
            );
          })

        : ''}

        {this.props.showFilters != false ?
          <Button buttonType={ButtonType.command} onClick={this.onClickAddFilter}
          disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true } iconProps={{iconName:"Add"}}>
          {strings.SPListQueryAdd}
          </Button>
          : ''}

        { this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
              <div style={{paddingBottom: '8px'}}><div aria-live='assertive' className='ms-u-screenReaderOnly' data-automation-id='error-message'>{  this.state.errorMessage }</div>
              <span>
                <p className='ms-TextField-errorMessage ms-u-slideDownIn20'>{ this.state.errorMessage }</p>
              </span>
              </div>
            : ''}

      </div>
    );
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
