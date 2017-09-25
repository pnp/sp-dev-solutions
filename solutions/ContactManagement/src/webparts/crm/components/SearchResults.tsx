// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import styles from '../Crm.module.scss';
import ElementUtilities from '../../../utilities/ElementUtilities';

import { IOrganization, OrganizationCallback } from '../../../data/IOrganization';
import { IOrganizationSet  } from '../../../dataProviders/IOrganizationSet';
import { PersonCallback } from '../../../data/IPerson';

import { ICrmComponentProps } from '../ICrmComponentProps';


export interface ISearchResultsProps extends ICrmComponentProps {
  searchTerm : string;
  searchTags: number[];
  onOrganizationSelected : OrganizationCallback;
  onPersonSelected : PersonCallback;
}

export interface ISearchResultsState {
  organizationItems: IOrganizationSet;
}

export default class SearchResults extends React.Component<ISearchResultsProps, ISearchResultsState> {
  private _lastSearch : String;

  constructor(props: ISearchResultsProps) {
    super(props);

    this._handleOrganizationClick = this._handleOrganizationClick.bind(this);
  }

  public componentWillMount() : void {

    if (this.props == null || this.props.manager == null || this.props.manager.data == null)
    {
      return;
    }

    this._updateProps(this.props);
  }
 
  public componentWillReceiveProps(nextProps : ISearchResultsProps) 
  {
    this._updateProps(nextProps);
  }

  private _updateProps(newProps : ISearchResultsProps) : void {
    if (newProps == null || newProps.manager == null || newProps.manager.data == null)
    {
      return;
    }


    if  ( (
            (newProps.searchTerm != this._lastSearch && newProps.searchTerm != null && newProps.searchTerm.length >= 3) || 
            (newProps.searchTags != null && newProps.searchTags.length > 0)
        ) )
    {
      this._lastSearch = newProps.searchTerm;

      newProps.manager.data.readOrganizationItemsBySearch(newProps.searchTerm, newProps.searchTags).then(
              (orgs: IOrganizationSet) => { 
              this.setState( { organizationItems: orgs } ); 
            }
      );
    }
  }

  public _handleOrganizationClick(e : React.MouseEvent<HTMLDivElement>) {
    var val = ElementUtilities.getParentElementAttribute(e.nativeEvent.srcElement, "data-objectId");

    if (this.props.onOrganizationSelected != null)
    {
      var organization: IOrganization;
      var orgs = this.state.organizationItems.organizations;

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

    if (this.props.searchTerm != this._lastSearch)
    {
      this._updateProps(this.props);
    }
    
    if (  this.props.searchTerm.length < 3 && 
          (
            this.state == null ||
            (this.state != null && (this.state.organizationItems == null || this.state.organizationItems.organizations.length == 0))
          )
      )
    {
      return <div>Please enter a longer search keyword.</div>;
    }
    else if (this.state != null && 
          (
            this.state == null ||
            (this.state.organizationItems == null || this.state.organizationItems.organizations.length == 0)
          )
      )
    {
      return <div>No matching organizations or people for '{this.props.searchTerm}'</div>;
    }
    else 
    {
      return (
        <div className={styles.searchResults}>
          <div>Results:</div>
          <div className={styles.searchResultList}>
          {
            this.state ?
            this.state.organizationItems ?
            this.state.organizationItems.organizations.map( (object, i) =>
            {
              return <div key={"PDR" + object.Id} className={ styles.searchResultItem } onClick={me._handleOrganizationClick}>
                      <div className={ styles.searchResultItemInner }>
                        <div className={ styles.searchResultItemInnerA }>
                          <div data-objectid={object.Id}>
                          <b>{object.Title}</b>
                          </div>
                        </div>
                      </div></div>;
            }) : '' : ''
          }
          </div>
        </div>
      );
    }
  }
}
