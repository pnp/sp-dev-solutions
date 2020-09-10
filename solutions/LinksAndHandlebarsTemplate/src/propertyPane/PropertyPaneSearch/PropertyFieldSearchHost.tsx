import * as React from 'react';
import { IPropertyFieldSearchPropsInternal } from './PropertyFieldSearch';
import * as strings from 'propertyFieldStrings';
import "@pnp/sp/search";
import { SortDirection, ISort } from '@pnp/sp/search';
import { TextField, Label, Dropdown, IDropdownOption, Button, ButtonType, Slider } from 'office-ui-fabric-react';

import styles from '../PropertyFields.module.scss';

export interface IPropertyFieldSearchHostProps extends IPropertyFieldSearchPropsInternal { }
export interface IPropertyFieldSearchHostState {
  query: string;
  selectProperties: string;
  sort: ISort[];
  rows?: number;
}

export default class PropertyFieldSearchHost extends React.Component<IPropertyFieldSearchHostProps, IPropertyFieldSearchHostState> {
  public directions: IDropdownOption[];
  public sortProperties: IDropdownOption[];

  public constructor(props: IPropertyFieldSearchHostProps) {
    super(props);

    this.state = this.props.properties.properties[this.props.targetProperty] ?
      JSON.parse(this.props.properties.properties[this.props.targetProperty]) :
      {
        query: '',
        selectProperties: '',
        sort: [],
        rows: 10
      };

    this.directions = [];
    this.directions.push({ key: Number(SortDirection.Ascending), text: strings.Ascending });
    this.directions.push({ key: Number(SortDirection.Descending), text: strings.Descending });

    this.sortProperties = [];
    this.sortProperties.push({ key: "LastModifiedTime", text: "Modified" });
    this.sortProperties.push({ key: "Created", text: "Created" });
    this.sortProperties.push({ key: "ViewsLifeTime", text: "Views" });
    this.sortProperties.push({ key: "ViewsRecent", text: "Recent Views" });
    this.sortProperties.push({ key: "Rank", text: "Rank" });
  }

  public onQueryChange = (value: string) => {
    const state = JSON.parse(JSON.stringify(this.state));
    state.query = value;
    this.setState({ query: value });
    this.saveSearchQuery(state);
  }

  public onSelectPropertiesChanged = (value: string) => {
    const state = JSON.parse(JSON.stringify(this.state));
    state.selectProperties = value;
    this.setState({ selectProperties: value });
    this.saveSearchQuery(state);
  }

  public addSort = () => {
    const state = JSON.parse(JSON.stringify(this.state));
    const sort = [...state.sort];
    sort.push({ Property: '', Direction: SortDirection.Ascending });
    this.setState({ sort: sort });
    this.saveSearchQuery(state);
  }

  public removeSort = (index: number) => {
    const state = JSON.parse(JSON.stringify(this.state));
    state.sort.splice(index, 1);
    this.setState({ sort: state.sort });
    this.saveSearchQuery(state);
  }

  public changeSortProperty = (option: IDropdownOption, selectedIndex: number, index: number) => {
    const state = JSON.parse(JSON.stringify(this.state));
    const sort = [...state.sort];
    sort[index].Property = option.key;
    this.setState({ sort: sort });
    this.saveSearchQuery(state);
  }

  public changeSortDirection = (option: IDropdownOption, selectedIndex: number, index: number) => {
    const state = JSON.parse(JSON.stringify(this.state));
    const sort = [...state.sort];
    sort[index].Direction = Number(option.key) as SortDirection;
    this.setState({ sort: sort });
    this.saveSearchQuery(state);
  }

  public onChangedMax = (newValue?: number) => {
    const state = JSON.parse(JSON.stringify(this.state));
    state.rows = newValue;
    this.setState({ rows: newValue });
    this.saveSearchQuery(state);
  }

  public saveSearchQuery = (state: IPropertyFieldSearchHostState) => {
    const val = this.props.properties.properties[this.props.targetProperty];
    this.props.properties.properties[this.props.targetProperty] = JSON.stringify(state);
    this.props.onPropertyChange(this.props.targetProperty, val, JSON.stringify(state));
    this.props.render();
  }

  public render(): JSX.Element {
    return (
      <div>
        <TextField label={strings.SearchQueryLabel} multiline={true} rows={5} onChange={(ev: any, newValue: string) => this.onQueryChange.call(this, newValue)} value={this.state.query} />
        <Label>{strings.SortLabel}</Label>
        {this.state.sort !== null && this.state.sort.length > 0 ? this.state.sort.map((v, i) => {
          return (
            <div>
              <Dropdown
                label={strings.SortPropertyLabel}
                disabled={false}
                options={this.sortProperties}
                selectedKey={v.Property}
                onChanged={(option: IDropdownOption, selectIndex?: number) => this.changeSortProperty(option, selectIndex, i)} />
              <Dropdown
                label={strings.SortDirectionLabel}
                disabled={false}
                options={this.directions}
                selectedKey={v.Direction}
                onChanged={(option: IDropdownOption, selectIndex?: number) => this.changeSortDirection(option, selectIndex, i)} />
              <Button buttonType={ButtonType.command} onClick={() => this.removeSort.call(this, i)} iconProps={{ iconName: "Delete" }}>
                {strings.SPListQueryRemove}
              </Button>
            </div>
          );
        }) : ''}
        <Button buttonType={ButtonType.command} onClick={this.addSort.bind(this)} iconProps={{ iconName: "Add" }}>
          {strings.SPListQueryAdd}
        </Button>
        <Slider label={strings.SPListQueryMax}
          min={1}
          className={styles["slider"]}
          max={100}
          defaultValue={this.state.rows}
          onChange={this.onChangedMax}
        />
      </div>
    );
  }
}
