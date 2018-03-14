import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneDropdown } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp';
import { PropertyFieldSpinButton } from '@pnp/spfx-property-controls/lib/PropertyFieldSpinButton';
import * as strings from 'ColumnFormatterWebPartStrings';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider, ProviderProps } from 'react-redux';
import { createStore, Store } from 'redux';

import { ColumnFormatter } from './components/ColumnFormatter';
import { chooseTheme, setContext, setHeight } from './state/Actions';
import { cfReducer } from './state/Reducers';
import { IApplicationState } from './state/State';

export interface IColumnFormatterWebPartProps {
  height: number; //Controls the height of the webpart
  editorTheme: string;
}

export default class ColumnFormatterWebPart extends BaseClientSideWebPart<IColumnFormatterWebPartProps> {

  private store: Store<IApplicationState>;

  public onInit(): Promise<void> {

    //Initialize a redux store that uses our custom Reducer & state
    this.store = createStore(cfReducer);

    //Set context properties on the store
    // This lets us use pnp-js-core, determine when we're on the workbench
    // and lets us pass any webpart properties
    this.store.dispatch(
      setContext(
        Environment.type !== EnvironmentType.Local,
        this.context.pageContext.web.absoluteUrl,
        this.context.pageContext.user.displayName,
        this.context.pageContext.user.email,
        this.properties
      )
    );

    //Initializes PNP JS Core with SPFx context
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    //Wrapping our primary element in a react-redux Provider
    // this enables the injection of the store as needed
    // properties are not passed since they are contained in the store
    const element: React.ReactElement<ProviderProps > = React.createElement(
      Provider,
      {
        store: this.store,
        children: React.createElement(
          ColumnFormatter, {}
        )
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  //** Intercepts property pane value changes and dispatches them to the store */
  /*public onDispatchablePropertyChanged(propertyPath: string, oldValue: any, newValue: any): void {
    
    
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }*/

  public onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if(oldValue !== newValue) {
      switch(propertyPath) {
        case 'height':
          this.store.dispatch(setHeight(Math.max(340, newValue)));
          break;
        case 'editorTheme':
          this.store.dispatch(chooseTheme(newValue));
          break;
      }
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.PropertyBasicGroupName,
              groupFields: [
                PropertyFieldSpinButton('height', {
                  label: strings.PropertyHeightLabel,
                  initialValue: this.properties.height,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  suffix: ' px',
                  min: 340,
                  step: 10,
                  decimalPlaces: 0,
                  key: 'height'
                })
              ]
            },
            {
              groupName: strings.PropertyEditorGroupName,
              groupFields: [
                PropertyPaneDropdown('editorTheme', {
                  label: strings.PropertyEditorThemeLabel,
                  selectedKey: this.properties.editorTheme,
                  options: [
                    { key: 'vs', text: 'vs' },
                    { key: 'vs-dark', text: 'vs-dark' },
                    { key: 'hc-black', text: 'hc-black' }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
