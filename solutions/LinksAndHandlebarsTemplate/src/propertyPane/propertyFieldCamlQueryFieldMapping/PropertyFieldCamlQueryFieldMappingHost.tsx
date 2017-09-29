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
import 'camljs';
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
  private listIsDocLib = false;

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

    this.state = {
      loadedList: false,
      loadedFields: false,
			lists: [],
      fields: new List<IField>(),
      arranged: [{key: SortDirection.Ascending, text: 'Ascending'}, {key: SortDirection.Descending, text: 'Descending'}],
      selectedList: {},
      sort: {},
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
      filters: [],
      filterType: strings.SPListFilterCompareAny,
      fieldMappings: [],
      max: 100,
      errorMessage: '',
      isCreateOpen: false
    };

    this.props.fieldMappings.map((item: IMapping, index?: number) => {
        this.state.fieldMappings.push({
          name: item.name, 
          type: item.type, 
          requiredLevel: item.requiredLevel, 
          enabled: item.requiredLevel===SPFieldRequiredLevel.Required, 
          mappedTo: ''});
      });

    this.loadDefaultData();
    this.loadLists();
    this.loadFields();

    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

  private loadDefaultData(): void {
    if(this.props != null && this.props.properties[this.props.dataPropertyPath] != null)
    {
      var stateObj = JSON.parse(this.props.properties[this.props.dataPropertyPath]);
      this.state.max = stateObj.max;
      this.state.selectedList = stateObj.selectedList;
      this.state.sort = stateObj.sort;
      this.state.fieldMappings = stateObj.fieldMappings;
      this.state.filters = stateObj.filters;
    }
  }

  /**
   * @function
   * Loads the list from SharePoint current web site
   */
  private loadLists(): void {
    pnp.sp.web.lists.select("Title","Id","BaseTemplate").filter("Hidden eq false").get().then((lists: ISPList[]) => {
      this.state.lists = [];
      lists.map((list: ISPList) => {
        this.state.lists.push({
          id: list.Id,
          title: list.Title,
          isDocLib: [101,109,119].indexOf(list.BaseTemplate) > -1
        });
      });
      this.state.loadedList = true;
      this.saveState();
    });
  }

  private loadFields(updateView: boolean = false): void {
    if(this.state.selectedList && this.state.selectedList.id){
      pnp.sp.web.lists.getById(this.state.selectedList.id).fields.select("Title","InternalName","TypeAsString").filter("Hidden eq false and ReadOnlyField eq false").orderBy("Title").get().then((response: ISPField[]) => {
        this.state.fields = new List<IField>();
        response.map((field: ISPField) => {
          const option = {
            internalName: field.InternalName,
            name: field.Title,
            kind: this.getKindForType(field.TypeAsString)
          };
          this.state.fields.Add(option);
        });
        //If list was just created, add all fields to the default view.
        if(updateView && this.state.fields.Count() > 0)
          this.addFieldsToView(0);
        this.state.loadedFields = true;
        this.saveState();
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
    const fields = this.state.fields.Where(f=>f.kind==fieldType).ToArray();
    const options = [];
    fields.forEach(element => {
      options.push({key:element.internalName,text:element.name});
    });
    return options;
  }

  private getFieldByInternalName(fieldTypeName:string): IField{
    const fields = this.state.fields.Where(f=>f.internalName==fieldTypeName).ToArray();
    if(fields == null || fields.length == 0)
      return null;
    return fields[0];
  }

  private saveState(): void {
      this.setState(this.state);
  }

  private saveQuery(): void {
      var listViewFields : string[] = [];
      if(this.state.fieldMappings.length===0){
        this.state.fields.ForEach(element => {
          listViewFields.push(element.internalName.trim().replace(' ','_x0020_'));
        });
      }
      else{
        this.state.fieldMappings.map((mappedField: IMapping) => {
          if(typeof mappedField.mappedTo != 'undefined' && mappedField.enabled)
            listViewFields.push(mappedField.mappedTo.trim().replace(' ','_x0020_'));
        });
      }
      if(listViewFields.indexOf("Title")==-1){
        listViewFields.push("Title");
      }
      if(this.state.selectedList.isDocLib){
        listViewFields.push('EncodedAbsUrl');
      }
      const conditions : CamlBuilder.IExpression[] = [];
      this.state.filters.forEach(element => {
        if(element.field == null || element.field == '' || element.operator == null || element.operator == '' || element.value == null)
          return;
        console.log('operator');
        
        var field : IField = this.getFieldByInternalName(element.field as string);
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
      if(this.state.filterType===strings.SPListFilterCompareAny){
        if(this.state.sort && this.state.sort.title){
          if(this.state.sort.direction===SortDirection.Descending){
            queryXml = new CamlBuilder() //Any orderby at this
                .View(listViewFields)
                .RowLimit(this.state.max)
                .Query()
                .Where()
                .Any(conditions)
                .OrderByDesc(this.state.sort.title)
                .ToString();
          }
          else{
            queryXml = new CamlBuilder() //Any orderby at this
                .View(listViewFields)
                .RowLimit(this.state.max)
                .Query()
                .Where()
                .Any(conditions)
                .OrderBy(this.state.sort.title)
                .ToString();
            }
        }
        else{
          queryXml = new CamlBuilder() //Any orderby at this
              .View(listViewFields)
              .RowLimit(this.state.max)
              .Query()
              .Where()
              .Any(conditions)
              .ToString();
        }
      }
      else{
        if(this.state.sort && this.state.sort.title){
          if(this.state.sort.direction===SortDirection.Descending){
            queryXml = new CamlBuilder() //Any orderby at this
                .View(listViewFields)
                .RowLimit(this.state.max)
                .Query()
                .Where()
                .All(conditions)
                .OrderByDesc(this.state.sort.title)
                .ToString();
          }
          else{
            queryXml = new CamlBuilder() //Any orderby at this
                .View(listViewFields)
                .RowLimit(this.state.max)
                .Query()
                .Where()
                .All(conditions)
                .OrderBy(this.state.sort.title)
                .ToString();
            }
        }
        else{
          queryXml = new CamlBuilder() //Any orderby at this
              .View(listViewFields)
              .RowLimit(this.state.max)
              .Query()
              .Where()
              .All(conditions)
              .ToString();
        }
      }

      //Order

      console.log(queryXml);
      this.props.properties[this.props.dataPropertyPath] = JSON.stringify({
        filters: this.state.filters,
        max: this.state.max,
        selectedList: this.state.selectedList,
        sort: this.state.sort,
        fieldMappings: this.state.fieldMappings
      });
      if (this.delayedValidate !== null && this.delayedValidate !== undefined) {
        this.delayedValidate(queryXml);
      }
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

    var result: string | PromiseLike<string> = this.props.onGetErrorMessage(value || '');
    if (result !== undefined) {
      if (typeof result === 'string') {
        if (result === undefined || result === '')
          this.notifyAfterValidate(this.props.query, value);
        this.state.errorMessage = result;
        this.setState(this.state);
      }
      else {
        result.then((errorMessage: string) => {
          if (errorMessage === undefined || errorMessage === '')
            this.notifyAfterValidate(this.props.query, value);
          this.state.errorMessage = errorMessage;
          this.setState(this.state);
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
    this.state.selectedList.id = option.key as string;
    this.state.selectedList.title =  option.text as string;
    
    this.state.lists.forEach(value=>{
      if(value.id==option.key)
        this.state.selectedList.isDocLib = value.isDocLib;
    });
    
    this.saveQuery();
    this.saveState();
    this.loadFields();
  }

   private onChangedField(option: IDropdownOption, index?: number): void {
    this.state.sort.title =  option.key as string;
    this.saveQuery();
    this.saveState();
  }

   private onChangedArranged(option: IDropdownOption, index?: number): void {
    this.state.sort.direction =  option.key as number;
    this.saveQuery();
    this.saveState();
  }

  private onChangedMax(newValue?: number): void {
    this.state.max = newValue;
    this.saveQuery();
    this.saveState();
  }

  private onClickAddFilter(elm?: any): void {
    this.state.filters.push({});
    this.saveState();
    this.saveQuery();
  }

  private onClickRemoveFilter(index: number): void {
    if (index > -1) {
      this.state.filters.splice(index, 1);
      this.saveState();
      this.saveQuery();
    }
  }

  private onChangedFilterField(option: IDropdownOption, index?: number, selectedIndex?: number): void {
    this.state.filters[selectedIndex].field = option.key as string;
    this.saveState();
    this.saveQuery();
  }

  private onChangedFilterOperator(option: IDropdownOption, index?: number, selectedIndex?: number): void {
    this.state.filters[selectedIndex].operator = option.key as string;
    this.saveState();
    this.saveQuery();
  }

  private onChangedFilterValue(value?: string, index?: number): void {
    this.state.filters[index].value = value;
    this.saveState();
    this.saveQuery();
  }

  private onChangedFieldMapping(option: IDropdownOption,  index?:number):void {
    this.state.fieldMappings[index].mappedTo = option.key.toString();
    this.saveState();
    this.saveQuery();
  }

  private onChangedFilterType(option: IDropdownOption,  index?:number):void {
    this.state.filterType = option.key.toString();
    this.saveState();
    this.saveQuery();
  }

  private onChangedFieldMappingEnabled(sender: FormEvent<HTMLElement|HTMLInputElement>,checked?: boolean, index?:number){
    this.state.fieldMappings[index].enabled = checked;
    this.saveState();
    this.saveQuery();
  }

  private openCreateNewListDialog(element?: any): void {
    this.state.isCreateOpen = true;
    this.saveState();
  }

  private createNewList(element?: any): void {
    var title = document.getElementsByClassName(this.listElementId)[0]["value"];

    const desc = 'List created by an SPFX webpart';
    pnp.sp.web.lists.add(title,desc,100).then((result)=>{
      this.state.selectedList.id = result.data['Id'];
      this.state.selectedList.title = result.data['Title'];
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
        currentIndex++;
        if(currentIndex < fieldXmls.length)
          this.createField(list,fieldXmls,currentIndex);
        else
          this.saveAndReloadData();
      });
  }

  private addFieldsToView(idx: number){
    //Skip adding the Title, already in view by default.
    if(this.state.fields.ElementAt(idx).internalName == 'Title' && this.state.fields.Count() > idx+1) {
      this.addFieldsToView(idx+1);
    }else{
      pnp.sp.web.lists.getById(this.state.selectedList.id).views.getByTitle("All Items").fields.add(this.state.fields.ElementAt(idx).internalName).then(_ =>{
        if(this.state.fields.Count() > idx+1)
          this.addFieldsToView(idx+1);
      });
    }
  }

  private saveAndReloadData(){
    this.saveState();
    this.saveQuery();

    this.loadDefaultData();
    this.loadLists();
    //Added boolean to trigger updating the default view.
    this.loadFields(true);
    
    document.getElementsByClassName(this.listElementId)[0]["value"] = "";
    this.state.isCreateOpen = false;
  }

  private cancelListCreate(element?: any): void {
    this.state.isCreateOpen = false;
    document.getElementsByClassName(this.listElementId)[0]["value"] = "";
    this.saveState();
  }

  private openListInNewTab(){
    pnp.sp.web.lists.getById(this.state.selectedList.id).defaultView.get().then((data)=>{
      window.open(data.ServerRelativeUrl);
    });
  }


  /**
   * @function
   * Renders the controls
   */
  public render(): JSX.Element {

    if (this.state.loadedList === false){//} || this.state.loadedFields === false) {
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
            icon="Add"
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

          {this.state.filters != null && this.state.filters.length > 0 ?
            <Dropdown
              label={strings.SPListFilterCompareType}
              disabled={this.props.disabled}
              options={[
                {key: strings.SPListFilterCompareAny, text: strings.SPListFilterCompareAny},
                {key: strings.SPListFilterCompareAll, text: strings.SPListFilterCompareAll}
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
                <Button disabled={this.props.disabled} buttonType={ButtonType.command} onClick={() => this.onClickRemoveFilter(index)} icon="Delete">
                  {strings.SPListQueryRemove}
                </Button>
              </div>
            );
          })
          
        : ''}

        {this.props.showFilters != false ?
          <Button buttonType={ButtonType.command} onClick={this.onClickAddFilter}
          disabled={this.props.disabled === false && this.state.selectedList != null && this.state.selectedList != '' ? false : true } icon="Add">
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