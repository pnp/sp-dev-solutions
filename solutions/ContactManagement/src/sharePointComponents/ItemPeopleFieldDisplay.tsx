// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';
import { ISPUser } from '../data/ISPUser';

import Utility from '../utilities/Utility';

import { Persona, IPersonaProps, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

export interface IItemPeopleFieldDisplayProps extends IFieldComponentProps {

}

export interface IItemPeopleFieldDisplayState extends IFieldComponentState {
  users : ISPUser[];
}

export default class ItemPeopleFieldDisplay extends FieldComponent<IItemPeopleFieldDisplayProps, IItemPeopleFieldDisplayState> {

  public constructor()
  {
    super();
  }

  public componentWillMount() : void {
    if (this.props == null || this.props.itemContext == null)
    {
      return;
    }

    var me = this;

    if (this.value != null && this.value > 0 || this.value < 0)
    {
      var val = Utility.getNumericArray(this.value);

      if (me.props.itemContext != null && val != null)
      {
        me.props.itemContext.readUsersByIds(val).then(
              (displayItems: ISPUser[]) => { 
              me.setState( { users: displayItems } ); 
            }
        );
      }
    }
  }

  public render(): JSX.Element 
  {
    if (this.state == null || this.state.users == null)
    {
      return <div></div>;
    }

    var localUsers : ISPUser[] = new Array();

    if (typeof this.state.users == "number")
    {
      localUsers = [this.state.users];
    }
    else
    {
      localUsers = this.state.users as ISPUser[];
    }

    var personas = new Array();

    for (var user of localUsers)
    {

      var persona : IPersonaProps = {
        primaryText : user.Title,
        imageUrl: user.EMail != null ? "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=" + user.EMail + "&amp;UA=0&amp;size=HR64x64" : null,       
        presence : null
      };      

      personas.push(persona);
    }

    return <div className={styles.sharePointComponent}>
      {
        personas.map( (personaIn, i) =>
        {
          return <Persona primaryText={ personaIn.primaryText } imageUrl={ personaIn.imageUrl } presence={ PersonaPresence.none } size= { PersonaSize.small } key={ i }/>;
        })
      }
      </div>;
  }
}
