// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import styles from '../Crm.module.scss';

import { ICrmComponentProps } from '../ICrmComponentProps';
import { IOrganization } from '../../../data/IOrganization';
import SharePointUtility from '../../../data/SharePointUtility';

export interface IOrganizationTileProps extends ICrmComponentProps{
  organization : IOrganization;
}

export interface IOrganizationTileState {
  organization : IOrganization;
}

export default class OrganizationTile extends React.Component<IOrganizationTileProps, IOrganizationTileState> {

  public constructor()
  {
    super();

    this.updateItemsState = this.updateItemsState.bind(this);
  }  

  public componentWillMount() : void {

    if (this.props == null || this.props.manager == null || this.props.manager.data == null)
    {
      return;
    }

    this.props.manager.data.onOrganizationChanged.sub(this.updateItemsState, this);

    this._updateProps(this.props);
  }
  
  public componentWillReceiveProps(nextProps : IOrganizationTileProps) 
  {
    this._updateProps(nextProps);
  }

  private _updateProps(newProps : IOrganizationTileProps)  
  {
  }

  private updateItemsState(sender: any, org : IOrganization) : void {
    if (org.Id == this.props.organization.Id)
    {
      this.setState({
        organization: org
      });
    }
  }


  public render(): JSX.Element {
    let org = this.props.organization;
    
    if (this.state != null && this.state.organization != null)
    {
      org = this.state.organization;
    } 
    
    var orgLogo = SharePointUtility.getUrl(org, "Logo");

    var statusClass = styles.status;

    if (org.Status != null)
      {
        var statusLower = org.Status.toLowerCase();

        if (statusLower.indexOf("red") >= 0)
        {
          statusClass = styles.statusRed;
        }
        if (statusLower.indexOf("green") >= 0)
        {
          statusClass = styles.statusGreen;
        }
        if (statusLower.indexOf("yellow") >= 0)
        {
          statusClass = styles.statusYellow;
        }
      }

    return (
      <span className={styles.organizationTile}>
        <span className={styles.interior}>
          <span className={styles.interiorImage} style={{
             backgroundImage: orgLogo != null ? "url(" + orgLogo + ")" : ""
            }}>
            &nbsp;
          </span>
        </span>
        <span className={styles.header}>
          <div>{org.Title}</div>
          <div className={statusClass}>{org.Status}</div>             
        </span>
      </span>
    );
  }
}
