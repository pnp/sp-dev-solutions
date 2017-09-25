// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import styles from '../Crm.module.scss';

import { ICrmComponentProps } from '../ICrmComponentProps';

import { OrganizationCallback }  from '../../../data/IOrganization';
import { PersonCallback }  from '../../../data/IPerson';

import PersonDirectory from './PersonDirectory';
import OrganizationDirectory from './OrganizationDirectory';
import OrganizationQuery from './OrganizationQuery';
import { OrganizationDirectoryMode } from './OrganizationDirectory';
import View from '../../../data/View';
import ViewSet from '../../../data/ViewSet';
import SearchResults from './SearchResults';

import { Button } from 'office-ui-fabric-react/lib/Button';

import {
  PivotItem,
  Pivot
} from 'office-ui-fabric-react/lib/Pivot';

import { CrmMode } from './Crm';

export interface IHomeProps extends ICrmComponentProps {
   onPersonSelected : PersonCallback; 
   onOrganizationSelected : OrganizationCallback;
   onModeChanged?: CrmMdodeCallback;  
   views: ViewSet;
   mode: CrmMode;
   searchTerm? : string;
   searchTags? : number[];
}

export interface IHomeState {
   mode?: CrmMode;
   initialMode: CrmMode;
}


export type CrmMdodeCallback = (mode: CrmMode) => void;

export default class Home extends React.Component<IHomeProps, IHomeState> {

  public constructor(props?: IHomeProps, context?: any)
  {
    super(props, context);

    this._handlePersonSelected = this._handlePersonSelected.bind(this);
    this._handleOrganizationSelected = this._handleOrganizationSelected.bind(this);
    this._handleLinkClick = this._handleLinkClick.bind(this);
    this._handleViewChange = this._handleViewChange.bind(this);

    this.state = {
      initialMode: props.mode,
      mode: null
    };

    if (this.props != null)
    {
      if (this.props.views != null)
      {
        this.props.views.onViewSetAdded = this._handleViewChange;
      }
    }
  }

  public _handlePersonSelected(val: any)
  {
    if (this.props.onPersonSelected != null)
    {
      this.props.onPersonSelected(val);
    }
  }

  public _handleOrganizationSelected(val: any)
  {
    if (this.props.onOrganizationSelected != null)
    {
      this.props.onOrganizationSelected(val);
    }
  }

  public _handleLinkClick(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>)
  {
    var newMode  = parseInt(item.props.itemKey);

    if (newMode != null)
    {
      if (this.props.onModeChanged != null)
      {
        this.props.onModeChanged(newMode);
      }
    }
  }

  private _handleViewChange(view : View)
  {
    this.forceUpdate();
  }

	public render(): JSX.Element {
    var searchPane = <div></div>;

    if (this.state == null)
    {
      return <div></div>;
    }

    var activeMode = this.props.mode;

    if (this.state.mode != null && this.props.mode == this.state.initialMode)
    {
      activeMode = this.state.mode;
    }

    if (activeMode == CrmMode.Search)
    {
      return (
        <div className={ styles.crm } >
          <div className={ styles.formToolBar }>          
            <Button className={ styles.formButton } onClick={ () => { 
                this.setState( { initialMode: this.props.mode, mode: CrmMode.PersonDirectory });
              }
            }><i className="ms-Icon ms-Icon--Back" aria-hidden="true"></i></Button>
          </div>
          <SearchResults manager={ this.props.manager } searchTerm= { this.props.searchTerm } searchTags= { this.props.searchTags } onPersonSelected={ this._handlePersonSelected } onOrganizationSelected={ this._handleOrganizationSelected } />
        </div>
      );
    }

    var me = this;

  	return (
    	<div className={styles.crm} >
        <Pivot ref="pivot" onLinkClick={ this._handleLinkClick }  initialSelectedKey={ activeMode.toString() }>
          { searchPane } 
          <PivotItem  key={ CrmMode.PersonDirectory.toString() } itemKey={ CrmMode.PersonDirectory.toString() }  linkText="People">
              <PersonDirectory ref='personDirectory' manager={ this.props.manager } onPersonSelected={ this._handlePersonSelected } />
          </PivotItem>
          <PivotItem key={ CrmMode.OrganizationDirectory.toString() } itemKey={ CrmMode.OrganizationDirectory.toString() }  linkText='Organizations'  >
              <OrganizationDirectory ref='organizationDirectory' mode={ OrganizationDirectoryMode.All } manager={ this.props.manager } onOrganizationSelected={ this._handleOrganizationSelected } />
          </PivotItem>
            {
              this.props.views != null ?
              this.props.views.views.map( (view : View, i) =>
                {
                  view.onViewChange = me._handleViewChange;

                  return <PivotItem key={ (50 + i) + ""} itemKey= { (50 + i) + "" } linkText={view.title}>
                      <OrganizationDirectory view={ view } mode={ OrganizationDirectoryMode.View } manager={ me.props.manager }  onOrganizationSelected={ me._handleOrganizationSelected }/>
                    </PivotItem>;
                }) : ''
            } 
          <PivotItem key={ CrmMode.OrganizationQuery.toString() } itemKey={ CrmMode.OrganizationQuery.toString() }  linkText='Query'  >
              <OrganizationQuery ref='organizationQuery' manager={ this.props.manager } onOrganizationSelected={ this._handleOrganizationSelected } />
          </PivotItem>
        </Pivot>
      </div>
        );
    }
}
