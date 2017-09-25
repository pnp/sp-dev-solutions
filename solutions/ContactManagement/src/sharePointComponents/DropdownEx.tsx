// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

export type DropdownExOptionCallback = (option: IDropdownExOption) => void;

export interface IDropdownExOption
{
  key: any;
  text: string;
}

export interface IDropdownExProps {
  label: string;
  selectedKey: any;
  options: IDropdownExOption[];
  onChanged: DropdownExOptionCallback;
}

export interface IDropdownExState {
}

export  class DropdownEx extends React.Component<IDropdownExProps, IDropdownExState> {

  public constructor()
  {
    super();

    this._handleSelectChanged = this._handleSelectChanged.bind(this);
  }

  private _handleSelectChanged(e : React.MouseEvent<HTMLSelectElement>)
  {
    var selElt = e.nativeEvent.srcElement as HTMLElement;

    while (selElt != null && selElt.tagName.toUpperCase() != "SELECT")
    {
      selElt = selElt.parentElement;
    }

    var elt = selElt as HTMLSelectElement;

    var selectedOption = this.props.options[elt.selectedIndex];

    if (this.props.onChanged != null)
    {
      this.props.onChanged(selectedOption);
    }
  }
  
  public render(): JSX.Element {
    if (this.props == null || this.props.options == null)
    {
      return <div></div>;
    }

    return (
      <div className={styles.dropdownEx} >
        <select onChange={ this._handleSelectChanged } className={styles.select} >
          {
            this.props.options.map( (option, i) =>
            {
              return <option value={ option.key } key={i} selected= { option.key  == this.props.selectedKey }>{ option.text } </option>;
            }) 
          }
        </select>
      </div>
    );
  }
}
