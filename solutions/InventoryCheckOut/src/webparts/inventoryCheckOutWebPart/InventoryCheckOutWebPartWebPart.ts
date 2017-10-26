// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Environment, EnvironmentType, Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'inventoryCheckOutWebPartStrings';
import { IInventoryCheckOutWebPartWebPartProps } from './IInventoryCheckOutWebPartWebPartProps';
import CheckOutContainer from './components/Container/CheckOutContainer';
import ICheckOutContainerProps from './components/Container/ICheckOutContainerProps';
import { ProvisionManager } from './provisioning/ProvisionManager';
import { IInventoryCheckOutDataProvider } from './dataProviders/IInventoryCheckOutDataProvider';
import { InventoryCheckOutDataProvider } from './dataProviders/InventoryCheckOutDataProvider';
import { MockInventoryCheckOutDataProvider } from './dataProviders/MockInventoryCheckOutDataProvider';


export default class InventoryCheckOutWebPartWebPart extends BaseClientSideWebPart<IInventoryCheckOutWebPartWebPartProps> {
  private _isInitialized: boolean = false;
  private _location: string="";
  private _standardCheckoutLength:string="";
  private _allowCheckoutIntheFuture:boolean;
  private _dataProvider: IInventoryCheckOutDataProvider;

  protected async onInit(): Promise<void> {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Loading List");
    this._location = escape(this.properties.locations);
    this._standardCheckoutLength = escape(this.properties.standardCheckoutLength);
    this._allowCheckoutIntheFuture = this.properties.allowCheckoutsIntheFuture;
    
    if (Environment.type === EnvironmentType.Local) {
      this.context.statusRenderer.clearLoadingIndicator(this.domElement);
      this._isInitialized = true;
      //mock data provider
      this._dataProvider = new MockInventoryCheckOutDataProvider(this.context);
      return super.onInit();
    } else {
      return ProvisionManager
        .checkSPlistsExist(this.context)
        .then((prop: boolean) => {
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
          this._isInitialized = prop;
          this._dataProvider = new InventoryCheckOutDataProvider(this.context);
          return super.onInit();
        }, (er: any) => {
          this.context.statusRenderer.renderError(this.domElement, "Error checking Inventory lists!");
          return super.onInit();
        });
    }
  }

  public render(): void {
    let checkOutContainerProps:ICheckOutContainerProps = {
      context: this.context,
      isInitialized: this._isInitialized,
      location: this._location,
      displayMode: this.displayMode,
      standardCheckoutLength:this._standardCheckoutLength,
      allowCheckoutIntheFuture:this._allowCheckoutIntheFuture,
      dataProvider: this._dataProvider
    };
    const element: React.ReactElement<ICheckOutContainerProps> = React.createElement(
      CheckOutContainer,
      checkOutContainerProps
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('standardCheckoutLength', {
                  label: "Standard Check-out Length (Hours)",                 
                }),
                PropertyPaneTextField('locations', {
                  label: "Locations",
                  description:"Each line in the web part property text area is one location. ", 
                  multiline:true                 
                }),

                PropertyPaneCheckbox('allowCheckoutsIntheFuture',{
                  text: "Allow Check-outs in the Future (Reservations)" ,            
                })
                
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'locations') {
     this._location = newValue;    
    }
    if (propertyPath === 'standardCheckoutLength') {
     this._standardCheckoutLength = newValue;    
    }
    if (propertyPath === 'allowCheckoutsIntheFuture') {
     this._allowCheckoutIntheFuture = newValue;    
    }
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }
}
