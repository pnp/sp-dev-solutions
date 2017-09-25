// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import styles from '../Crm.module.scss';
import ElementUtilities from '../../../utilities/ElementUtilities';

import { IOrganization, OrganizationCallback } from '../../../data/IOrganization';
import { IOrganizationSet  } from '../../../dataProviders/IOrganizationSet';

import { ICrmComponentProps } from '../ICrmComponentProps';

import UserInterfaceUtility from '../../../sharePointComponents/UserInterfaceUtility';

import QueryEditor from '../../../sharePointComponents/QueryEditor';
import Query from '../../../data/Query';

import OrganizationTile from './OrganizationTile';

export interface IOrganizationQueryProps extends ICrmComponentProps 
{
  onOrganizationSelected : OrganizationCallback;
}

export interface IOrganizationQueryState {
  items: IOrganizationSet;
  query: Query;
}

export default class OrganizationQuery extends React.Component<IOrganizationQueryProps, IOrganizationQueryState> {

  constructor(props: IOrganizationQueryProps) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
    this._handleApply = this._handleApply.bind(this);
    this._handleQueryChange = this._handleQueryChange.bind(this);

    var query = new Query();

    if (props.manager.data.meUser != null)
    {
      query.meUserId = props.manager.data.meUser.Id;
    }
    query.onQueryChange = this._handleQueryChange;

    this.state = {
      items: null,
      query: query
    };
  }

  public componentWillMount() : void {

    if (this.props == null || this.props.manager == null || this.props.manager.data == null)
    {
      return;
    }

    this.props.manager.data.onOrganizationAdded.sub(this.updateItemsState, this);
    this.props.manager.data.onOrganizationChanged.sub(this.updateItemsState, this);

    this.updateItemsState();
  }

  private updateItemsState() : void 
  {
    if (this.props == null || this.props.manager == null || this.props.manager.data == null)
    {
      return;
    }

    var queryString = this.state.query.getOdataQuery(this.props.manager.data.selectedOrganizationList);

    if (queryString != null && queryString.length > 0)
    {
      var view = {
        query: this.state.query,
        title: "Basic"
      };
      this.props.manager.data.readOrganizationItemsByView(view).then(
        (orgs: IOrganizationSet) => { 
          this.setState( { 
            items: orgs, 
            query: this.state != null ? this.state.query : null
           } ); 
        }
      );
   }
    else
    {
      this.props.manager.data.readOrganizationItems().then(
        (orgs: IOrganizationSet) => { 
          this.setState( { 
            items: orgs, 
            query: this.state != null ? this.state.query : null
           } ); 
        }
      );
    }
  }

  public _handleClick(e : React.MouseEvent<HTMLDivElement>) {
    var val = ElementUtilities.getParentElementAttribute(e.nativeEvent.srcElement, "data-objectId");

    if (this.props.onOrganizationSelected != null)
    {
      var organization: IOrganization;
      var orgs = this.state.items.organizations;

      for (var i=0; i<orgs.length; i++)
      {
        organization = orgs[i];

        if (organization.Id + "" === val)
        {
          this.props.onOrganizationSelected(organization);
        }
      }
    }
  }

  private _handleQueryChange(query : Query)
  {
  }

  private _handleApply()
  {
    this.updateItemsState();
  }
    
  public render(): JSX.Element {
    var me = this;

    if (this.state == null)
    {
      return <div></div>;
    }

    UserInterfaceUtility.applyWorkarounds();

    return (
      <div className={styles.organizationDirectory}>
        <QueryEditor list={ this.props.manager.data.selectedOrganizationList } dataProvider= { this.props.manager.data } query={ this.state.query } displayApplyButton={ true } onApply={ this._handleApply } />
        <div>&nbsp;</div>
      {
        this.state ?
        this.state.items ?
          <span className={styles.size} >Items: {this.state.items.organizations.length } </span>
        : '' : ''
      } 
        <div className={styles.tileBin}>
          {
            this.state ?
            this.state.items ?
            this.state.items.organizations.map( (organization, i) =>
            {
                return  <span data-objectid={organization.Id} onClick={me._handleClick} key={"PDR" + organization.Id}> 
                        <OrganizationTile manager={me.props.manager} organization={organization}/>
                      </span>;
            }) : '' : ''
          }
        </div>
      </div>
    );
  }
}
