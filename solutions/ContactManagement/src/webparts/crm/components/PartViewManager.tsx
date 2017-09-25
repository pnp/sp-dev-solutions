// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';
import View from '../../../data/View';
import ViewSet from '../../../data/ViewSet';

import ViewEditor from './ViewEditor';

import styles from '../Crm.module.scss';
import { ICrmDataProvider } from '../../../dataProviders/ICrmDataProvider';

import { Button, IDropdownOption } from 'office-ui-fabric-react';
import { DropdownEx } from '../../../sharePointComponents/DropdownEx';

export interface IPartViewManagerProps {
  views: ViewSet;
  data: ICrmDataProvider;
}

export interface IPartViewManagerState {
  selectedView : View;
}

export default class PartViewManager extends React.Component<IPartViewManagerProps, IPartViewManagerState> {
  private _newItemAdded : boolean;

  public constructor(props?: IPartViewManagerProps, context?: any)
  {
    super(props, context);

    if (props.views.views.length > 0)
    {
      this.state = {
        selectedView: props.views.views[0]
      };
    }
    else
    {
      this.state = {
        selectedView: null
      };
    }

    this._handleAddView = this._handleAddView.bind(this);
    this._handleDropdownValueChanged = this._handleDropdownValueChanged.bind(this);
    this._viewsUpdated = this._viewsUpdated.bind(this);
  }

  private _handleAddView() : void
  {
    var view = new View();
    view.title = "New View";
    
    this._newItemAdded = true;

    this.props.views.addView(view);

    this.setState(
      {
        selectedView: view
      }
    );
  }
  
  private _viewsUpdated() : void
  {
    this.forceUpdate();
  }

  protected _handleDropdownValueChanged(option : IDropdownOption) : void
  {
    this._newItemAdded = false;

    if (option == null)
    {
      this.setState(
        {
          selectedView: null
        }
      );
    }
    else
    {      
      var newSelectedView = this.props.views.views[option.key];

      if (newSelectedView != this.state.selectedView)
      {
        this.setState(
          {
            selectedView: newSelectedView
          }
        );
      }
    }
  }

  public render(): JSX.Element 
  {
    if (this.props == null || this.state == null)
    {
      return <div></div>;
    }

    var dropdownOptions = new Array();
    var selectedIndex = 0;

    if (this._newItemAdded)
    {
      selectedIndex = this.props.views.views.length - 1;
    }

    for (var i=0; i<this.props.views.views.length; i++)
    {
      var view = this.props.views.views[i];

      if (view == this.state.selectedView)
      {
        selectedIndex = i;
      }

      dropdownOptions.push({
        key: i,
        text: view.title
      });
    }

    return (
      <div className={ styles.partViewManager }>
        <div className={ styles.selectorArea }>
            <div className={ styles.selector }> 
              <div className={ styles.selectorRow }>    
                <div className={ styles.selectorDropdown }>       
                {
                  this.props.views.views.length > 1 ?                
                   <DropdownEx
                      label=""
                      selectedKey={ selectedIndex }
                      options={ dropdownOptions }
                      onChanged = { this._handleDropdownValueChanged }
                    /> : <div>&nbsp;</div>
                  }
                </div>
                <div className= { styles.selectorAdd }>
                  <Button onClick={ this._handleAddView }>Add</Button>
                </div>       
              </div>
            </div>
        </div>
        <div className={ styles.viewArea }>
          <ViewEditor key={ "view" } data={ this.props.data } view={ this.state.selectedView } onViewChange={ this._viewsUpdated } />
        </div>
      </div>
    );
  }
}
