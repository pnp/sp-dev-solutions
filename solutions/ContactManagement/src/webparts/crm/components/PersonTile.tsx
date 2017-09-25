// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import styles from '../Crm.module.scss';

import { ICrmComponentProps } from '../ICrmComponentProps';
import { IPerson } from '../../../data/IPerson';

export interface IPersonTileProps extends ICrmComponentProps{
  person: IPerson;
}

export interface IPersonTileState {
}

export default class PersonTile extends React.Component<IPersonTileProps, IPersonTileState> {

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

    this.props.manager.data.onPersonChanged.sub(this.updateItemsState, this);

  }

  private updateItemsState(sender: any, person : IPerson) : void {
    if (person == this.props.person)
    {
      this.forceUpdate();
    }
  }

  public render(): JSX.Element {
    return (
      <span className={styles.personTile}>
        <span className={styles.interior}>
          { this.props.person.FirstName }<br/>  
          { this.props.person.Title }<br/>&nbsp;<br/>
          { this.props.person.Company }
        </span>
      </span>
    );
  }
}
