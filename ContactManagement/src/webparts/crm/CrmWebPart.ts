import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'crmStrings';
import { ICrmProps } from './components/Crm';
import Crm from './components/Crm';
import CrmManager  from '../../data/CrmManager';
import ViewManagerPropertyPaneField from './ViewManagerPropertyPaneField';
import View from '../../data/View';
import ViewSet from '../../data/ViewSet';
import UserInterfaceUtility from '../../sharePointComponents/UserInterfaceUtility';

export interface ICrmWebPartProps {
  description: string;
  views: ViewSet;
}

export default class CrmWebPart extends BaseClientSideWebPart<ICrmWebPartProps> {
  private _manager : CrmManager;
  
  public constructor() {
    super();
  }

  protected onInit(): Promise<void>  {
    this._manager = new CrmManager(this.context);

    var newViews = new ViewSet();

    if (this.properties.views != null)
    {
      for (var view of this.properties.views.views)
      {
        var newView = View.fromData(view);

        newViews.views.push(newView);
      }
    }

    this.properties.views = newViews;

    UserInterfaceUtility.setOuterElement(this.domElement);
  
    UserInterfaceUtility.applyWorkarounds();
  
    return new Promise<void>( (resolve) => { resolve(); } );
}


  public render(): void {
    const element: React.ReactElement<ICrmProps> = React.createElement(
      Crm,
      {
        description: this.properties.description,
        manager: this._manager,
        views: this.properties.views
      }
    );

    ReactDom.render(element, this.domElement);

    UserInterfaceUtility.setOuterElement(this.domElement);
    UserInterfaceUtility.applyWorkarounds();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    if (this.properties.views == null)
    {
      this.properties.views = new ViewSet();
    }

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
                new ViewManagerPropertyPaneField('description', this.properties.views, this._manager.data)
              ]
            }
          ]
        }
      ]
    };
  }
}
