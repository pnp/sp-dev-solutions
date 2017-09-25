// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import View, { ViewCallback }from '../../../data/View';
import Query from '../../../data/Query';
import QueryEditor from '../../../sharePointComponents/QueryEditor';

import styles from '../Crm.module.scss';
import { ICrmDataProvider } from '../../../dataProviders/ICrmDataProvider';

import { TextField } from 'office-ui-fabric-react';

export interface IViewEditorProps {
  view: View;
  data: ICrmDataProvider;
  onViewChange? : ViewCallback; 
}

export interface IViewEditorState {
}

export default class ViewEditor extends React.Component<IViewEditorProps, IViewEditorState> {

  public constructor(props?: IViewEditorProps, context?: any)
  {
    super(props, context);

    this._handleChange = this._handleChange.bind(this);
  }

  private _handleChange(newValue : string) : void
  {
    if (newValue != this.props.view.title)
    {
      this.props.view.setTitle(newValue);

      if (this.props.onViewChange != null)
      {
        this.props.onViewChange(this.props.view);
      }
    }
  }

  public render(): JSX.Element 
  {
    if (this.props == null || this.props.view == null)
    {
      return <div>no view</div>;
    }

    if (this.props.view.query == null)
    {
      this.props.view.query = new Query();
    }

    return (
      <div className={ styles.organizationDirectory }>
        
        <TextField onChanged={ this._handleChange } value= { this.props.view.title}></TextField>
        <QueryEditor query={this.props.view.query} list={this.props.data.selectedOrganizationList } dataProvider={ this.props.data } displayApplyButton={ false }/>

      </div>
    );
  }
}
