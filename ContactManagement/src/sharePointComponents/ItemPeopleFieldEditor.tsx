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

import { IPersonaProps, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';

export interface IItemPeopleFieldEditorProps extends IFieldComponentProps {

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
                imageUrl : user.Picture != null ? user.Picture.Url : "",
                presence : PersonaPresence.none,
                key : user.Id,
                tag : user          
              };

              personas.push(persona);
          }

          me.setState({
            selectedPersonas: personas
          });
          this._wasRetrieved = true;        
        });
      }
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
    for (var persona of currentPersonas)
    {
      this.value = persona["tag"].Id;
    }
  }

  private _onFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) 
  {
    if (filterText) {

//          return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));

      return this.props.itemContext.readUsersBySearch(filterText).then( (users: ISPUser[]) =>
        {
            var personas : IPersonaProps[] = new Array();
            
            for (var user of users)
            {
              var persona = {
                primaryText: user.Title,
                imageUrl : user.Picture != null ? user.Picture.Url : "",
                key: "U" + user.Id,
                presence : PersonaPresence.none
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
    return (
      <div className={styles.sharePointComponent}>
        <CompactPeoplePicker
          onResolveSuggestions={ this._onFilterChanged }
          getTextFromItem={ (persona: IPersonaProps) => persona.primaryText }
          className={ 'ms-PeoplePicker' }
          defaultSelectedItems={ this.state != null && this.state.selectedPersonas != null ? this.state.selectedPersonas : null }
          onChange={this._onChange }
          key={ 'normal' }
      />
      </div>
    );
  }
}
