// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// tslint:disable-next-line:no-unused-variable
import * as React from 'react';

import styles from './sharePointComponents.module.scss';

import { FieldComponent, IFieldComponentProps, IFieldComponentState } from './FieldComponent';
import { ISPUser } from '../data/ISPUser';
import { IDropdownOption } from 'office-ui-fabric-react';

import {
  CompactPeoplePicker
} from 'office-ui-fabric-react/lib/Pickers';
import Utility  from '../utilities/Utility';

import { IPersonaProps, PersonaPresence, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

export interface IItemPeopleFieldEditorProps extends IFieldComponentProps {
  displayMe? : boolean;
}

export interface IItemPeopleFieldEditorState extends IFieldComponentState {
  selectedPersonas: IPersonaProps[];
}

export default class ItemPeopleFieldEditor extends FieldComponent<IItemPeopleFieldEditorProps, IItemPeopleFieldEditorState> {
  private _wasRetrieved : boolean = false;

  public constructor()
  {
    super();

    this._handleDropdownValueChanged = this._handleDropdownValueChanged.bind(this);
    this._onFilterChanged = this._onFilterChanged.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  public componentWillMount() : void {
    if (this.props == null || this.props.itemContext == null)
    {
      return;
    }
    
    var me = this;

    if (this.value != null)
    {
      var val = Utility.getNumericArray(this.value);

      if (val != null)
      {
        me.props.itemContext.readUsersByIds(val).then( (users: ISPUser[]) =>
        {
          var personas = new Array();

          for (var user of users)
          {
              var persona = {
                primaryText: user.Title,
                imageUrl: user.EMail != null ? "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=" + user.EMail + "&amp;UA=0&amp;size=HR64x64" : null,                       
                presence: PersonaPresence.none,
                size: PersonaSize.small,
                key: user.Id,
                tag: user          
              };

              personas.push(persona);
          }

          me.setState({
            selectedPersonas: personas
          });
          this._wasRetrieved = true;        
        });
      }
      else
      {
        me.setState( {
          selectedPersonas: null
         } );
      }      
    }
    else
    {
      me.setState( {
        selectedPersonas: null
       } );
    }
  }

  protected _handleDropdownValueChanged(option : IDropdownOption) : void
  {
    if (option == null)
    {
      this.value = null;
    }
    {
      this.value = option.key;
    }
  }

  private _onChange(currentPersonas: IPersonaProps[]) 
  {
    if (currentPersonas == null || currentPersonas.length == 0)
    {
      this.value = null;
      return;
    }
    
    for (var persona of currentPersonas)
    {
      this.value = persona["tag"].Id;
      return;
    }
  }

  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) 
  {
    if (filterText) {
      return this.props.itemContext.readUsersBySearch(filterText).then( (users: ISPUser[]) =>
        {
            var personas : IPersonaProps[] = new Array();

            var personaMe = {
              primaryText: "[me]",
              size: PersonaSize.small,
              presence: PersonaPresence.none,
              key: "Ume" 
            };

            personaMe["tag"] = { "Id": "[me]" };
            personas.push(personaMe);

            for (var user of users)
            {
              var persona = {
                primaryText: user.Title,
                imageUrl: user.EMail != null ? "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=" + user.EMail + "&amp;UA=0&amp;size=HR64x64" : null,       
                size : PersonaSize.small,
                presence: PersonaPresence.none,
                key: "U" + user.Id
              };

              persona["tag"] = user;
              personas.push(persona);
            }

            return personas;
        });
    } else {
      return [];
    }
  }

  public render(): JSX.Element 
  {
    if (this.state == null)
    {
      return <div></div>;
    }

    return (
      <div className={styles.sharePointComponent}>
        <CompactPeoplePicker
          onResolveSuggestions={ this._onFilterChanged }
          getTextFromItem={ (persona: IPersonaProps) => persona ? persona.primaryText : null }
          className={ 'ms-PeoplePicker' }
          defaultSelectedItems={ this.state != null && this.state.selectedPersonas != null ? this.state.selectedPersonas : null }
          onChange={this._onChange }
          key={ 'normal' }
      />
      </div>
    );
  }
}
