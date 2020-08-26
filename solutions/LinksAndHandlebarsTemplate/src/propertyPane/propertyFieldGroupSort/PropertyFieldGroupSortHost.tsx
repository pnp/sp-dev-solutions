import * as React from 'react';

import { IPropertyFieldGroupSortPropsInternal } from './PropertyFieldGroupSort';
import { Async, Label, CommandButton } from 'office-ui-fabric-react';

import styles from "../PropertyFields.module.scss";

export interface IPropertyFieldGroupSortHostProps extends IPropertyFieldGroupSortPropsInternal { }
export interface IPropertyFieldGroupSortState {
  currentValue?: string[];
  errorMessage?: string;
  selectedIndex?: number;
}

export default class PropertyFieldGroupSortHost extends React.Component<IPropertyFieldGroupSortHostProps, IPropertyFieldGroupSortState> {
  private latestValidateValue: string[];
  private async: Async;
  private delayedValidate: (value: string[]) => void;

  public constructor(props: IPropertyFieldGroupSortHostProps) {
    super(props);

    this.async = new Async(this);
    this.state = ({ errorMessage: '', currentValue: this.props.initialValue } as IPropertyFieldGroupSortState);

    this.onValueChanged = this.onValueChanged.bind(this);
    this.validate = this.validate.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

  private onValueChanged(newValue: any): void {
    this.setState({ currentValue: newValue });
    this.delayedValidate(newValue);
  }

  private validate(value: string[]): void {
    if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
      this.notifyAfterValidate(this.props.initialValue, value);
      return;
    }

    if (this.latestValidateValue === value)
      return;
    this.latestValidateValue = value;

    const result: string | PromiseLike<string> = this.props.onGetErrorMessage(value.join(',') || '');
    if (result !== undefined) {
      if (typeof result === 'string') {
        if (result === undefined || result === '')
          this.notifyAfterValidate(this.props.initialValue, value);
        this.setState({ errorMessage: result } as IPropertyFieldGroupSortState);
      }
      else {
        result.then((errorMessage: string) => {
          if (errorMessage === undefined || errorMessage === '')
            this.notifyAfterValidate(this.props.initialValue, value);
          this.setState({ errorMessage } as IPropertyFieldGroupSortState);
        });
      }
    }
    else {
      this.notifyAfterValidate(this.props.initialValue, value);
    }
  }

  private notifyAfterValidate(oldValue: string[], newValue: string[]) {
    this.props.properties[this.props.targetProperty] = newValue;
    this.props.onPropertyChange(this.props.targetProperty, oldValue, newValue);
    if (!this.props.disableReactivePropertyChanges && this.props.render != null)
      this.props.render();
  }

  public componentWillUnmount() {
    this.async.dispose();
  }

  private setSelectItem(index: number) {
    this.setState({ selectedIndex: index });
  }

  private moveUp() {
    if (this.state.selectedIndex != undefined && this.state.selectedIndex > 0) {
      const cloneValue = JSON.parse(JSON.stringify(this.state.currentValue));
      const tmp = cloneValue[this.state.selectedIndex];
      cloneValue[this.state.selectedIndex] = cloneValue[this.state.selectedIndex - 1];
      cloneValue[this.state.selectedIndex - 1] = tmp;
      this.setState({ selectedIndex: this.state.selectedIndex - 1 });
      this.onValueChanged(cloneValue);
    }
  }

  private moveDown() {
    if (this.state.selectedIndex != undefined && this.state.selectedIndex < this.state.currentValue.length - 1) {
      const cloneValue = JSON.parse(JSON.stringify(this.state.currentValue));
      const tmp = cloneValue[this.state.selectedIndex];
      cloneValue[this.state.selectedIndex] = cloneValue[this.state.selectedIndex + 1];
      cloneValue[this.state.selectedIndex + 1] = tmp;
      this.setState({ selectedIndex: this.state.selectedIndex + 1 });
      this.onValueChanged(cloneValue);
    }
  }

  public render(): JSX.Element {
    return (
      <div className={styles.groupSort}>
        <Label>{this.props.label}</Label>
        <div>
          <CommandButton className={styles.groupButton} onClick={this.moveUp.bind(this)}><i className='fa fa-caret-up'></i><span>Move Up</span></CommandButton>
          <CommandButton className={styles.groupButton} onClick={this.moveDown.bind(this)}><i className='fa fa-caret-down'></i><span>Move Down</span></CommandButton>
          {this.state.currentValue.length > 0 &&
            this.state.currentValue.map((item, index) => {
              return (
                <div className={styles.groupListItem + (this.state.selectedIndex == index ? " " + styles.highlight : "")} key={"group-" + index} onClick={this.setSelectItem.bind(this, index)}><span>{item}</span></div>
              );
            }
            )}
          {this.state.errorMessage != null && this.state.errorMessage != '' && this.state.errorMessage != undefined ?
            <div><div aria-live='assertive' className='ms-u-screenReaderOnly' data-automation-id='error-message'>{this.state.errorMessage}</div>
              <span>
                <p className='ms-TextField-errorMessage ms-u-slideDownIn20'>{this.state.errorMessage}</p>
              </span>
            </div>
            : ''}
        </div>
      </div>
    );
  }
}