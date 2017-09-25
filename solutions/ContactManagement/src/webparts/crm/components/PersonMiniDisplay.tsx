// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import styles from '../Crm.module.scss';

import { ICrmComponentProps } from '../ICrmComponentProps';
import { IPerson } from '../../../data/IPerson';

export interface IPersonMiniDisplayProps extends ICrmComponentProps{
  person: IPerson;
}

export interface IPersonMiniDisplayState {
}

export default class PersonMiniDisplay extends React.Component<IPersonMiniDisplayProps, IPersonMiniDisplayState> {

  public constructor()
  {
    super();
  }

  public render(): JSX.Element {
    var interior = null;

    interior = <div>
        { this.props.person.FirstName }&nbsp;  
        { this.props.person.Title }
      </div>;

    return (
      <div className={styles.personMiniDisplay}>
        { interior }
      </div>
    );
  }
}
