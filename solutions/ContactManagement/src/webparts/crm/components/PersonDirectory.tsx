// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';

import styles from '../Crm.module.scss';
import ElementUtilities from '../../../utilities/ElementUtilities';

import { IPerson, PersonCallback } from '../../../data/IPerson';

import { ICrmComponentProps } from '../ICrmComponentProps';
import PersonTile from './PersonTile';

export interface IPersonDirectoryProps extends ICrmComponentProps {
  onPersonSelected : PersonCallback;
}

export interface IPersonDirectoryState {
  items: IPerson[];
}

export default class PersonDirectory extends React.Component<IPersonDirectoryProps, IPersonDirectoryState> {

  constructor(props: IPersonDirectoryProps) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  public componentWillMount() : void {

    if (this.props == null || this.props.manager == null || this.props.manager.data == null)
    {
      return;
    }

    this.props.manager.data.onPersonAdded.sub(this.updateItemsState, this);
    this.props.manager.data.onPersonChanged.sub(this.updateItemsState, this);

    this.updateItemsState();
  }

  private updateItemsState() : void {
    if (this.props == null || this.props.manager == null || this.props.manager.data == null)
    {
      return;
    }

    this.props.manager.data.readPersonItems().then(
              (people: IPerson[]) => { 
              this.setState( { items: people } ); 
            }
      );
  }

  public _handleClick(e : React.MouseEvent<HTMLDivElement>) {
    var val = ElementUtilities.getParentElementAttribute(e.nativeEvent.srcElement, "data-objectId");

    if (this.props.onPersonSelected != null)
    {
      var person: IPerson;

      for (var i=0; i<this.state.items.length; i++)
      {
        person = this.state.items[i];

        if (person.Id + "" === val)
        {
          this.props.onPersonSelected(person);
        }
      }
    }
  }
    
  public render(): JSX.Element {
    var me = this;

    return (
      <div className={styles.personDirectory}>
      {
        this.state ?
        this.state.items ?
        this.state.items.map( (person, i) =>
        {
          return <span data-objectid={person.Id} onClick={me._handleClick} key={"PDR" + person.Id}>      
                <PersonTile manager={me.props.manager} person={person}/>
              </span>;
        }) : '' : ''
      }
      </div>
    );
  }
}
