// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import styles from '../Crm.module.scss';
import ElementUtilities from '../../../utilities/ElementUtilities';

import View from '../../../data/View';
import { IOrganization, OrganizationCallback } from '../../../data/IOrganization';
import { IOrganizationSet  } from '../../../dataProviders/IOrganizationSet';

import { ICrmComponentProps } from '../ICrmComponentProps';

import OrganizationTile from './OrganizationTile';

export enum OrganizationDirectoryMode
{
  All = 0,
  Recent = 1,
  My = 2,
  Pri1 = 3,
  Pri2 = 4,
  Pri3 = 5,
  UnPri = 30,
  View = 50
}

export interface IOrganizationDirectoryProps extends ICrmComponentProps {
  onOrganizationSelected : OrganizationCallback;
  mode? : OrganizationDirectoryMode;
  view? : View;
}

export interface IOrganizationDirectoryState {
  items: IOrganizationSet;
}

export default class OrganizationDirectory extends React.Component<IOrganizationDirectoryProps, IOrganizationDirectoryState> {

  constructor(props: IOrganizationDirectoryProps) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
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

  private updateItemsState() : void {
    if (this.props == null || this.props.manager == null || this.props.manager.data == null)
    {
      return;
    }

    if (this.props.mode == OrganizationDirectoryMode.All)
    {
      this.props.manager.data.readOrganizationItems().then(
                (orgs: IOrganizationSet) => { 
                this.setState( { items: orgs } ); 
              }
      );
    }
    else if (this.props.mode == OrganizationDirectoryMode.View && this.props.view != null)
    {
      this.props.manager.data.readOrganizationItemsByView(this.props.view).then(
                (orgs: IOrganizationSet) => { 
                this.setState( { items: orgs } ); 
              }
      );
    }
    else if (this.props.mode == OrganizationDirectoryMode.My)
    {
      this.props.manager.data.readMyOrganizationItems().then(
                (orgs: IOrganizationSet) => { 
                this.setState( { items: orgs } ); 
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
    
  public render(): JSX.Element {
    var me = this;

    return (
      <div className={styles.organizationDirectory}>
      {
        this.state ?
        this.state.items ?
          <span className={styles.size} >Items: {this.state.items.organizations.length } </span>
        : '' : ''
      } 
        <div className={ styles.tileBin } >
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
